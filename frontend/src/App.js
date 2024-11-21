import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import StudyGroups from './components/StudyGroups';
import HomePage from './components/HomePage';
import CreateStudyGroup from './components/CreateStudyGroup';  // You need to create this component
import FindTutor from './components/FindTutor';  // You need to create this component
import BecomeTutor from './components/BecomeTutor';  // You need to create this component
import Whiteboard from './components/Whiteboard';
import Messages from './components/Messages';
import GroupDetailsPage from './components/GroupDetailsPage';
import ViewYourGroups from './components/ViewYourGroups'; 

const App = () => (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/study-groups" element={<StudyGroups />} />
                <Route path="/create-study-group" element={<CreateStudyGroup />} />
                <Route path="/find-tutor" element={<FindTutor />} />
                <Route path="/become-tutor" element={<BecomeTutor />} />
                <Route path="/" element={<CreateStudyGroup />} />
                <Route path="/study-group-details" element={<GroupDetailsPage />} />
                <Route path="/whiteboard" element={<Whiteboard />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/view-your-groups" element={<ViewYourGroups />} />  {/* New route */}
            </Routes>
        </div>
    </Router>
);

export default App;
