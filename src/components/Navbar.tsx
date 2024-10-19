"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ReactNode, FC } from "react";
import LogoShort from "@/assets/CF.svg";
import LogoLong from "@/assets/ChronoFlow.svg";
import Image from "next/image";
import supabase from "@/config/supabase";
import { User } from "@supabase/supabase-js";

const Navbar: FC = () => {
  const [user, setUser] = useState<User | null>(null); // State to store user session

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
      } else if (data?.session) {
        // Set the user if session exists
        setUser(data.session.user);
      } else {
        // If no session, set user to null
        setUser(null);
      }
    };

    fetchSession(); // Call the async function to check session

    // Optional: Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null); // Update user state on auth state changes
      }
    );

    // Clean up the auth listener when component unmounts
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Set user to null after logging out
  };

  return (
    <nav className="h-[64px] rounded sticky">
      <div className="navbar-margins flex h-full justify-between items-center">
        <Link href={"/"} className="flex w-44 justify-start items-center">
          <Image className="" src={LogoLong} alt="Logo" />
        </Link>
        <div className="">
          {user ? (
            <>
              <div className="flex">
                <Link href="/dashboard" className="btn-secondary">
                  Dashboard
                </Link>
                <button
                  onClick={() => handleLogout()}
                  className="btn-primary ml-4"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link href="/sign-in" className="btn-primary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
