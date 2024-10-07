import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPasswords(e.target.value, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPasswords(password, e.target.value);
    };

    const checkPasswords = (pass, rePass) => setPasswordsMatch(pass === rePass);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true); // Set loading state to true
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user info in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                email: email
            });

            // Optionally update display name
            await updateProfile(user, {
                displayName: name
            });

            // Show success alert
            toast.success('Registration successful! Redirecting to dashboard...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // Redirect after 2 seconds

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                toast.error(err.message); // Show error alert
            } else {
                setError('An unknown error occurred');
                toast.error('An unknown error occurred'); // Show error alert
            }
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    return (
        <motion.form onSubmit={handleSignup} className="bg-gray-900 px-10 pt-10 pb-6 rounded-lg shadow-lg w-96 mx-4 font-[Jost]">
            <h2 className="text-white text-2xl font-bold mb-6 text-left">Create an account</h2>

            <div className="mb-2">
                <label className="block text-gray-400 mb-1" htmlFor="fullname">Full Name</label>
                <input
                    type="text"
                    id="fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-md"
                    placeholder="Enter Full Name"
                    required
                />
            </div>

            <div className="mb-2">
                <label className="block text-gray-400 mb-1" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-md"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div className="mb-2 relative">
                <label className="block text-gray-400 mb-1" htmlFor="password">Password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full py-2 px-4 text-white bg-gray-800 border border-gray-600 rounded-md"
                    placeholder="Enter your password"
                    required
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-10 text-gray-500">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            <div className="mb-6 relative">
                <label className="block text-gray-400 mb-1" htmlFor="confirmPassword">Re-type Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full py-2 px-4 text-white bg-gray-800 border border-gray-600 rounded-md"
                    placeholder="Re-type Password"
                    required
                />
            </div>

            {!passwordsMatch && <p className="text-red-500 text-sm mb-4">Passwords do not match</p>}

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md" disabled={loading || !passwordsMatch}>
                {loading ? 'Loading...' : 'Register Now'}
            </button>
            <div className='flex flex-col justify-center items-center'>
                <p className="text-gray-400 text-sm mt-4">Already have an account? <Link to="/" className="text-blue-500">Login</Link></p>
            </div>

            {/* Toast Container for notifications */}
            <ToastContainer />
        </motion.form>
    );
};

export default SignupForm;
