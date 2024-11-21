import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleFeatureClick = (feature) => {
        switch(feature) {
            case 'Find Study Group':
                navigate('/study-groups');
                break;
            case 'Create Study Group':
                navigate('/create-study-group');
                break;
            case 'Find Tutor':
                navigate('/find-tutor');
                break;
            case 'Become a Tutor':
                navigate('/become-tutor');
                break;
            case 'View Your Group': // New case for viewing the user's groups
                navigate('/view-your-groups'); // This will route to the MyGroupsPage
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h1>Welcome to the Peer Tutoring & Study Group Platform!</h1>
            <ul>
                <li><button onClick={() => handleFeatureClick('Find Study Group')}>Find Study Group</button></li>
                <li><button onClick={() => handleFeatureClick('Create Study Group')}>Create Study Group</button></li>
                <li><button onClick={() => handleFeatureClick('View Your Group')}>View Your Group</button></li> {/* New button */}
                <li><button onClick={() => handleFeatureClick('Find Tutor')}>Find Tutor</button></li>
                <li><button onClick={() => handleFeatureClick('Become a Tutor')}>Become a Tutor</button></li>
            </ul>
        </div>
    );
};

export default HomePage;
