import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample data for created and joined groups (Replace this with actual API calls)
const mockCreatedGroups = [
    { id: 1, name: 'Math Study Group', subject: 'Math', topic: 'Calculus' },
    { id: 2, name: 'History Study Group', subject: 'History', topic: 'World War II' },
];

const mockJoinedGroups = [
    { id: 3, name: 'Physics Study Group', subject: 'Physics', topic: 'Quantum Mechanics' },
    { id: 4, name: 'Literature Study Group', subject: 'Literature', topic: 'Shakespeare' },
];

const ViewYourGroups = () => {
    const navigate = useNavigate();
    const [createdGroups, setCreatedGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);

    // Fetch user groups (Replace this with API calls)
    useEffect(() => {
        // In real-world, use an API to fetch created and joined groups
        setCreatedGroups(mockCreatedGroups);
        setJoinedGroups(mockJoinedGroups);
    }, []);

    const handleGroupClick = (group) => {
        navigate('/study-group-details', {
            state: {
                name: group.name,
                subject: group.subject,
                topic: group.topic
            }
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Your Groups</h1>

            <div style={{ marginBottom: '30px' }}>
                <h2>Groups You Created</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#f4f4f4', color: '#333', padding: '12px 15px', textAlign: 'left', fontSize: '16px', borderBottom: '2px solid #ddd' }}>Group Name</th>
                            <th style={{ backgroundColor: '#f4f4f4', color: '#333', padding: '12px 15px', textAlign: 'left', fontSize: '16px', borderBottom: '2px solid #ddd' }}>Subject</th>
                            <th style={{ backgroundColor: '#f4f4f4', color: '#333', padding: '12px 15px', textAlign: 'left', fontSize: '16px', borderBottom: '2px solid #ddd' }}>Topic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createdGroups.map(group => (
                            <tr key={group.id} onClick={() => handleGroupClick(group)} style={{ cursor: 'pointer', transition: 'background-color 0.3s ease', backgroundColor: '#fff' }}>
                                <td style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px', borderBottom: '1px solid #ddd' }}>{group.name}</td>
                                <td style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px', borderBottom: '1px solid #ddd' }}>{group.subject}</td>
                                <td style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px', borderBottom: '1px solid #ddd' }}>{group.topic}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>Groups You Joined</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#f4f4f4', color: '#333', padding: '12px 15px', textAlign: 'left', fontSize: '16px', borderBottom: '2px solid #ddd' }}>Group Name</th>
                            <th style={{ backgroundColor: '#f4f4f4', color: '#333', padding: '12px 15px', textAlign: 'left', fontSize: '16px', borderBottom: '2px solid #ddd' }}>Subject</th>
                            <th style={{ backgroundColor: '#f4f4f4', color: '#333', padding: '12px 15px', textAlign: 'left', fontSize: '16px', borderBottom: '2px solid #ddd' }}>Topic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {joinedGroups.map(group => (
                            <tr key={group.id} onClick={() => handleGroupClick(group)} style={{ cursor: 'pointer', transition: 'background-color 0.3s ease', backgroundColor: '#fff' }}>
                                <td style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px', borderBottom: '1px solid #ddd' }}>{group.name}</td>
                                <td style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px', borderBottom: '1px solid #ddd' }}>{group.subject}</td>
                                <td style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px', borderBottom: '1px solid #ddd' }}>{group.topic}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewYourGroups;
