from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import re 
from sqlalchemy.exc import IntegrityError

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # SQLite Database
app.config['SECRET_KEY'] = 'your_secret_key'  # Use a secret key in production
db = SQLAlchemy(app)

# Initialize LoginManager
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    @property
    def is_active(self):
        return True  # All users are active in this case, change this logic as needed

    def get_id(self):
        return str(self.id)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

# StudyGroup model
class StudyGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    topic = db.Column(db.String(300), nullable=False)
    # max_students = db.Column(db.Integer, nullable=False)
    scheduled_time = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(300), nullable=False)

    def __repr__(self):
        return f"StudyGroup('{self.name}', '{self.subject}', '{self.topic}', '{self.scheduled_time}')"

# Create database tables
with app.app_context():
    db.create_all()

# Home route
@app.route('/')
def home():
    return "Welcome to the Peer Tutoring & Study Group Platform!"

# Register route (POST)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Get data from the request body

    # Check if all required fields are present
    if not data or not all(key in data for key in ('username', 'email', 'password')):
        return jsonify({'error': 'All fields (username, email, password) are required.'}), 400

    username = data['username'].strip()
    email = data['email'].strip()
    password = data['password']

    # Validate username
    if not username:
        return jsonify({'error': 'Username cannot be empty.'}), 400
    if len(username) < 3:
        return jsonify({'error': 'Username must be at least 3 characters long.'}), 400

    # Validate email
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(email_regex, email):
        return jsonify({'error': 'Invalid email format.'}), 400

    # Validate password
    if not password or len(password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters long.'}), 400

    # Hash the password before storing
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    # Check for existing username or email conflicts
    existing_username = User.query.filter_by(username=username).first()
    if existing_username:
        return jsonify({'error': 'Username already exists. Please use a different username.'}), 400

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({'error': 'Email already exists. Please use a different email address.'}), 400

    # Create a new user and add to the database
    try:
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()  # Rollback the transaction if there's a database error
        return jsonify({'error': 'A database error occurred. Please try again later.'}), 500

    return jsonify({'message': 'User registered successfully!'}), 201


# Login route (POST)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    # Fetch user from the database by email
    user = User.query.filter_by(email=email).first()
    
    # Check if user exists and password matches
    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'message': 'Logged in successfully!'}), 200
    return jsonify({'message': 'Invalid credentials!'}), 401

# Get all study groups route (GET)
@app.route('/study_groups', methods=['GET'])
def get_study_groups():
    now = datetime.utcnow()  # Get the current time
    study_groups = StudyGroup.query.filter(StudyGroup.scheduled_time > now).all()  # Only fetch groups with future scheduled times
    study_groups_list = [{
        "id": group.id,
        "name": group.name,
        "subject": group.subject,
        "topic": group.topic,
        # "max_students": group.max_students,
        "scheduled_time": group.scheduled_time.strftime('%Y-%m-%dT%H:%M'),
        "description": group.description
    } for group in study_groups]
    
    return jsonify({'study_groups': study_groups_list}), 200


# Create a new study group route (POST)
@app.route('/study_groups', methods=['POST'])
def add_study_group():
    data = request.get_json()
    name = data['name']
    subject = data['subject']
    topic = data['topic']
    # max_students = data['max_students']
    scheduled_time = datetime.strptime(data['scheduled_time'], "%Y-%m-%dT%H:%M")  # Convert string to datetime
    
    # Check if the group name already exists
    existing_group = StudyGroup.query.filter_by(name=name).first()
    if existing_group:
        return jsonify({'message': 'Group name already exists!'}), 400
    
    new_group = StudyGroup(
        name=name, 
        subject=subject, 
        topic=topic, 
        # max_students=max_students, 
        scheduled_time=scheduled_time,
        description=data['description']
    )
    
    db.session.add(new_group)
    db.session.commit()
    
    return jsonify({'message': 'Study group created successfully!'}), 201

# Home route after login
@app.route('/home')
def homepage():
    return jsonify({
        "message": "Welcome to the home page!",
        "features": [
            "Find Study Group",
            "Create Study Group",
            "Find Tutor",
            "Become a Tutor"
        ]
    }), 200


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

# print("hello")
