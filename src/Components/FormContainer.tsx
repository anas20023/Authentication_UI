// Container.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import Dashboard from './Dashboard';
import { auth } from './firebaseConfig'; // Adjust the path as necessary
import { onAuthStateChanged } from 'firebase/auth';
import { ClipLoader } from 'react-spinners';

const Container = () => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setLoading(false);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <ClipLoader color="#ffffff" loading={loading} size={50} /> {/* Spinner */}
        </div>;
    }

    return (
        <Router>
            <div className="min-h-screen h-auto w-full bg-slate-800 flex items-center justify-center">
                <Routes>
                    <Route path="/signup" element={!isLoggedIn ? <SignupForm /> : <Navigate to="/dashboard" />} />
                    <Route path="/" element={!isLoggedIn ? <LoginForm /> : <Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Container;
