// GroupDetailsPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GroupDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, subject, topic } = location.state || {};

    const handleWhiteboard = () => {
        navigate('/whiteboard', { state: { groupName: name } });
    };

    const handleSendMessage = () => {
        navigate('/messages', { state: { groupName: name } });
    };

    return (
        <div>
            <h1>Study Group Details</h1>
            <div>
                <h2>Group Name: {name}</h2>
                <p>Subject: {subject}</p>
                <p>Topic: {topic}</p>
            </div>
            <div>
                <button onClick={handleSendMessage}>Send Message</button>
                <button onClick={handleWhiteboard}>Collaborative Whiteboard</button>
            </div>
        </div>
    );
};

export default GroupDetailsPage;
