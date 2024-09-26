import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const formAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
};

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [retype_Password, setRetypePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRetypePasswordVisibility = () => {
        setRetypePassword(!retype_Password);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPasswords(e.target.value, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPasswords(password, e.target.value);
    };

    const checkPasswords = (pass, rePass) => {
        setPasswordsMatch(pass === rePass);
    };

    return (
        <motion.form
            className="bg-gray-900 px-10 pt-10 pb-6 rounded-lg shadow-lg w-96 mx-4 font-[Jost]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={formAnimation}
        >
            <h2 className="text-white text-2xl font-bold mb-6 text-left">Create an account</h2>
            <div className="mb-2">
                <label className="block text-gray-400 mb-1" htmlFor="fullname">Full Name</label>
                <input
                    type="text"
                    id="fullname"
                    className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300"
                    placeholder="Enter Full Name"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-400 mb-1" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="mb-2 relative">
                <label className="block text-gray-400 mb-1" htmlFor="password">Password</label>
                <input
                    type={showPassword ? 'text' : 'password'}  // Toggle between text and password
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full py-2 px-4 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300"
                    placeholder="Enter your password"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-10 text-gray-500"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <div className="mb-6 relative">
                <label className="block text-gray-400 mb-1" htmlFor="confirmPassword">Re-type Password</label>
                <input
                    type={retype_Password ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full py-2 px-4 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300"
                    placeholder="Re-type Password"
                    required
                />
                <button
                    type="button"
                    onClick={toggleRetypePasswordVisibility}
                    className="absolute right-3 top-10 text-gray-500"
                >
                    {retype_Password ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            {!passwordsMatch && (
                <p className="text-red-500 text-sm mb-4">Passwords do not match</p>
            )}
            <button
                type="submit"
                className={`w-full bg-blue-600 text-white p-2 rounded-md transition duration-200 transform ${passwordsMatch ? 'hover:bg-blue-700 hover:scale-105' : 'cursor-not-allowed opacity-50'}`}
                disabled={!passwordsMatch}
            >
                Register Now
            </button>

            <div className="relative flex items-center justify-center my-4">
                <span className="h-px w-full bg-gray-600"></span>
                <span className="absolute bg-gray-900 px-2 text-gray-400">or</span>
            </div>

            <button
                type="button"
                className="w-full flex items-center justify-center bg-white text-gray-700 p-2 rounded-md hover:bg-gray-200 transition duration-200"
            >
                <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google Icon"
                    className="mr-2"
                />
                Continue with Google
            </button>

            <p className="text-gray-400 text-center mt-4">
                Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
            </p>
        </motion.form>
    );
};

export default SignupForm;
