"use client";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import WaveLine from "@/assets/waveline.svg";
import supabase from "@/config/supabase"; // Import your supabase client

export default function SignIn() {
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google");
    }
  };

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
