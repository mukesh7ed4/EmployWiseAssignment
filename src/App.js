import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        <Route path='/login' element={<LoginForm />}> </Route> 
          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;