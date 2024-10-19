"use client";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import WaveLine from "@/assets/waveline.svg";
import supabase from "@/config/supabase"; // Import your supabase client
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { useEffect } from "react";

export default function SignIn() {
  const router = useRouter(); // Initialize router

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/dashboard", // Redirect to dashboard after sign-in
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          // If the user is signed in, redirect to the dashboard
          router.push("/dashboard");
        }
      }
    );

    // Clean up listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <>
      <Image className="absolute -z-50 mt-40" src={WaveLine} alt="" />
      <section className="page-margins py-4">
        <div className="pt-56 flex items-center justify-center">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-center">Get Started</h2>
              <p className="text-center">Sign in with OAuth to get started!</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => signInWithGoogle()}
                className="btn-secondary gap-x-1.5 h-10"
              >
                <FontAwesomeIcon icon={faGoogle} />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
