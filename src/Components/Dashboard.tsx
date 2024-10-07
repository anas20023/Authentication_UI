import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState<null | User>(null); // To store the authenticated user
    const auth = getAuth();  // Firebase Auth instance
    const navigate = useNavigate(); // For redirecting after logout

    // Effect to track the authentication state and retrieve user info
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // If a user is signed in, store their info in the state
                setUser(currentUser);
            } else {
                // If no user is signed in, redirect to login
                navigate('/');
            }
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, [auth, navigate]);

    // Handle sign out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to login page after sign-out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="min-h-screen h-auto w-full bg-slate-800 flex flex-col items-center justify-center">
            {user ? (
                <>
                    {/* Display user profile info */}
                    <h1 className="text-3xl text-white mb-4">Dashboard</h1>
                    <div className="text-white text-lg mb-4">
                        <p><strong>Name:</strong> {user.displayName || 'Anonymous'}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>

                    {/* Sign Out button */}
                    <button
                        onClick={handleSignOut}
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <p className="text-white">Loading...</p> // Loading state until the user is fetched
            )}
        </div>
    );
}

export default Dashboard;
