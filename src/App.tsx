import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from './Components/navigationbar'; // Adjust the import path as needed

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main className="flex-grow">

      </main>

    </div>
  );
}
