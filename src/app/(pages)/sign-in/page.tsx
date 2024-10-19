import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function SignIn() {
  return (
    <section className="page-margins py-4">
      <div className="pt-56 flex items-center justify-center">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-center">Get Started</h2>
            <p className="text-center">Sign in with OAuth to get started!</p>
          </div>

          <div className="flex flex-col gap-3">
            <button className="btn-secondary gap-x-1.5 h-10">
              <FontAwesomeIcon icon={faGoogle} />
              Sign in with Google
            </button>
            <button className="btn-secondary gap-x-1.5 h-10">
              <FontAwesomeIcon icon={faGithub} />
              Sign in with Github
            </button>
            <button className="btn-secondary gap-x-1.5 h-10">
              <FontAwesomeIcon icon={faEnvelope} />
              Sign in with Email
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
