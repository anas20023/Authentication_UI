/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Import Firebase auth config
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
};

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true
        setError(''); // Clear any previous error messages

        try {
            // Sign in with Firebase Auth
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login successful! Redirecting to dashboard...'); // Success toast

            // Redirect to the dashboard after a short delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // Redirect after 2 seconds
        } catch (err) {
            setLoading(false); // Set loading state to false
            setError('Failed to login. Please check your credentials.'); // Set error message
            toast.error('Failed to login. Please check your credentials.'); // Error toast
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true); // Set loading state to true
        setError(''); // Clear any previous error messages

        try {
            await signInWithPopup(auth, provider);
            toast.success('Login successful! Redirecting to dashboard...'); // Success toast

            // Redirect to the dashboard after a short delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // Redirect after 2 seconds
        } catch (err) {
            setLoading(false); // Set loading state to false
            setError('Failed to login with Google.'); // Set error message
            toast.error('Failed to login with Google.'); // Error toast
        }
    };

    return (
        <motion.form
            className="bg-gray-900 p-10 rounded-lg shadow-lg w-96 mx-4 font-[Jost]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={formAnimation}
            onSubmit={handleLogin} // Handle login on form submit
        >
            <h2 className="text-[#828282] text-base text-left">Welcome Back</h2>
            <h2 className="text-white text-2xl font-bold mb-6 text-left">Login to your account</h2>

            <div className="mb-4">
                <label className="block text-gray-400 mb-1" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-4 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-300"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div className="mb-6 relative">
                <label className="block text-gray-400 mb-1" htmlFor="password">Password</label>
                <input
                    type={showPassword ? 'text' : 'password'} // Toggle between text and password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error if login fails */}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                disabled={loading} // Disable button while loading
            >
                {loading ? 'Loading...' : 'Login Now'} {/* Change button text based on loading state */}
            </button>

            <div className="relative flex items-center justify-center my-4">
                <span className="h-px w-full bg-gray-600"></span>
                <span className="absolute bg-gray-900 px-2 text-gray-400">or</span>
            </div>

            <button
                type="button"
                onClick={handleGoogleLogin} // Handle Google login
                className="w-full flex items-center justify-center bg-white text-gray-700 p-2 rounded-md hover:bg-gray-200 transition duration-200"
                disabled={loading} // Disable button while loading
            >
                <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google Icon"
                    className="mr-2"
                />
                Continue with Google
            </button>

            <p className="text-gray-400 text-center mt-4">
                Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            </p>

            {/* Toast Container for notifications */}
            <ToastContainer />
        </motion.form>
    );
};

export default LoginForm;
