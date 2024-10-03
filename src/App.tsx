import { SignedIn, SignedOut, SignIn, SignUp, UserButton } from "@clerk/clerk-react";
import Navbar from './Components/navigationbar';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
        <SignedOut>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <SignedOut>
          {/* Check if this component is loading */}
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </SignedOut>

        <SignedIn>
          <h1 className="text-2xl">Welcome to the Dashboard!</h1>
        </SignedIn>
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
