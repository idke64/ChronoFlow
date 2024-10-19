import Image from "next/image";
import LogoLong from "@/assets/ChronoFlow.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import WaveLine from "@/assets/waveline.svg";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Image className="absolute -z-50 mt-40" src={WaveLine} alt="" />
      <section className="page-margins py-4">
        <div className="flex w-full pt-60">
          <div className="flex flex-col gap-y-6 w-full">
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-1">
                <h1 className="flex gap-x-3">Master your time with</h1>
                <Image className="w-96" src={LogoLong} alt="logo long" />
              </div>

              <h5 className="text-text-secondary w-[40%]">
                An all-in-one AI-powered to-do list and calendar for effortless
                task and schedule management
              </h5>
            </div>
            <Link href="/sign-in" className="btn-primary self-start">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
