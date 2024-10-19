import Link from "next/link";
import { useState } from "react";
import { ReactNode, FC } from "react";
import LogoShort from "@/assets/CF.svg";
import LogoLong from "@/assets/ChronoFlow.svg";
import Image from "next/image";

const Navbar: FC = () => {
  return (
    <nav className="h-[64px] rounded sticky">
      <div className="navbar-margins flex h-full justify-between items-center">
        <Link href={"/"} className="flex w-44 justify-start items-center">
          <Image className="" src={LogoLong} alt={""} />
        </Link>
        <div className="">
          <Link href={"/sign-in"} className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
