import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Login';
import SignupForm from './Signup';
const Container = () => {
    return (
        <Router>
            <div className="min-h-screen h-auto w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <Routes>
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/" element={<LoginForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Container;