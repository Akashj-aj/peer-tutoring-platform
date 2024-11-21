import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateStudyGroup = () => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate input fields
        if (!name || !subject || !topic) {
            alert('Please fill in all the required fields');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/study_groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    subject,
                    topic,
                    description,
                    scheduled_time: scheduledTime,
                }),
            });
    
            if (response.ok) { // Check if the response is successful
                const data = await response.json(); // Parse JSON
                navigate('/study-group-details', { 
                    state: { name, subject, topic } 
                });
            } else {
                // Handle non-201 errors
                const data = await response.json();
                alert(data.message || 'Failed to create study group');
            }
        } catch (error) {
            // Handle network or other unexpected errors
            alert('Network error: Unable to create study group');
        }
    };

    return (
        <div>
            <h1>Create a Study Group</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Study Group Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div>
                    <label>Topic:</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Scheduled Time:</label>
                    <input
                        type="datetime-local"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                    />
                </div>
                <button type="submit">Create Study Group</button>
            </form>
        </div>
    );
};

export default CreateStudyGroup;
