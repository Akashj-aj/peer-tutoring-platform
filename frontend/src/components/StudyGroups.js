import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudyGroups = () => {
    const [studyGroups, setStudyGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudyGroups = async () => {
            const response = await fetch('http://localhost:5000/study_groups');
            const data = await response.json();
            setStudyGroups(data.study_groups);
        };

        fetchStudyGroups();
    }, []);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true, // Use 12-hour format
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
    };

    const handleJoinGroup = async (groupId, groupName, subject, topic) => {
        // Call API to update the user's access to "user" for this group
        const response = await fetch(`http://localhost:5000/join_group/${groupId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // After successfully joining, navigate to the GroupDetailsPage with the group data in state
            navigate('/study-group-details', { 
                state: { 
                    name: groupName, 
                    subject: subject, 
                    topic: topic 
                }
            });
        } else {
            console.error('Failed to join the group');
        }
    };

    return (
        <div>
            <h1>Study Groups</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subject</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Topic</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Scheduled Time</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {studyGroups.map(group => (
                        <tr key={group.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>{group.name}</strong></td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{group.description}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{group.subject}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{group.topic}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatDateTime(group.scheduled_time)}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button onClick={() => handleJoinGroup(group.id, group.name, group.subject, group.topic)}>
                                    Join
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/create-study-group">Create a new Study Group</Link>
        </div>
    );
};

export default StudyGroups;
