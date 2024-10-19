import Image from "next/image";
import LogoLong from "@/assets/ChronoFlow.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Home() {
  return (
    <section className="page-margins py-4">
      <div className="flex w-full pt-60">
        <div className="flex flex-col gap-y-6 w-full">
          <div className="flex flex-col gap-y-6 w-1/2">
            <Image className="" src={LogoLong} alt="logo long" />
            <h5 className="text-text-secondary">
              An all-in-one AI-powered to-do list and calendar for effortless
              task and schedule management
            </h5>
          </div>
          <button className="btn-primary self-start">Get Started</button>
        </div>
      </div>
    </section>
  );
}
