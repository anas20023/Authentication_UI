import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Login';
import SignupForm from './Signup';
const Container = () => {
    return (
        <Router>
            <div className="h-[91vh] w-full bg-gradient-to-r from-slate-900 to-gray-800 flex items-center justify-center">
                <Routes>
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/" element={<LoginForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Container;