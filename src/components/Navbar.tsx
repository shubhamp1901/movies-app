import { LogIn, Search } from "lucide-react";
import reactLogo from "../assets/react.svg";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => setShowSearch((prev) => !prev);

  useEffect(() => {
    const createUserInFirestore = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.id);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: user.id,
          name: user.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          createdAt: new Date().toISOString(),
          watch_later: [],
          movies_liked: [],
        });
      }
    };

    if (isSignedIn) {
      createUserInFirestore();
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSearch &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <div className="navbar grid grid-cols-12 items-center p-2 bg-gray-800 shadow-sm text-white">
      {/* Left Section: Logo + Title */}
      <div className="col-span-2 flex gap-2 items-center">
        <img src={reactLogo} alt="logo" className="w-8 h-8" />
        <a className="btn btn-ghost text-xl text-yellow-300">C I N E M A</a>
      </div>

      {/* Middle Section: Nav Links + Search */}
      <div className="col-span-9 flex gap-8 items-center justify-center">
        <NavLink
          to="/bollywood-movies"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 border-b-2 border-yellow-300" : ""
          }
        >
          Bollywood
        </NavLink>
        <NavLink
          to="/hollywood-movies"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 border-b-2 border-yellow-300" : ""
          }
        >
          Hollywood
        </NavLink>
        <NavLink
          to="/tv-shows"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 border-b-2 border-yellow-300" : ""
          }
        >
          TV Shows
        </NavLink>

        {user && (
          <div className="relative w-64" ref={searchRef}>
            {showSearch ? (
              <>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full text-black rounded-lg bg-white p-2 outline-none pr-8"
                />
                <Search
                  color="#000"
                  className="absolute right-2 top-2 cursor-pointer"
                />
              </>
            ) : (
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={toggleSearch}
              >
                <Search />
                <span>Search</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section: Auth Buttons */}
      <div className="col-span-1 flex items-center justify-end gap-4 pr-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-primary flex items-center gap-2">
              <LogIn />
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
