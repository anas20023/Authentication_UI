import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="w-full bg-slate-900 py-4 font-[Jost] shadow-md sticky top-0">
                <div className="max-w-[80rem] w-full mx-auto flex justify-between items-center px-4">
                    <h1 className="text-white font-semibold text-2xl sm:text-3xl">FutureAce.</h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex">
                        <ul className="flex flex-row">
                            <li className="text-white mx-4 font-medium text-lg cursor-pointer hover:text-gray-300 transition duration-200">Home</li>
                            <li className="text-white mx-4 font-medium text-lg cursor-pointer hover:text-gray-300 transition duration-200">About</li>
                            <li className="text-white mx-4 font-medium text-lg cursor-pointer hover:text-gray-300 transition duration-200">Services</li>
                            <li className="text-white mx-4 font-medium text-lg cursor-pointer hover:text-gray-300 transition duration-200">Contact</li>
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
                            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-slate-900 py-4">
                        <ul className="flex flex-col p-2 items-center space-y-4">
                            <li className="text-white font-medium text-lg py-2 cursor-pointer hover:text-blue-400 transition duration-200">Home</li>
                            <li className="text-white font-medium text-lg py-2 cursor-pointer hover:text-blue-400 transition duration-200">About</li>
                            <li className="text-white font-medium text-lg py-2 cursor-pointer hover:text-blue-400 transition duration-200">Services</li>
                            <li className="text-white font-medium text-lg py-2 cursor-pointer hover:text-blue-400 transition duration-200">Contact</li>
                        </ul>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
