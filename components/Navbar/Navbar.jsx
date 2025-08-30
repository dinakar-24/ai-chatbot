import React from "react";
import "remixicon/fonts/remixicon.css";
import { RainbowButton } from "../ui/rainbow-button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center mx-4 md:mx-16 lg:mx-32 3xl:mx-36 py-6">
      <div className="text-xl flex justify-center space-x-12 font-inter items-center">
        <div className="flex items-center space-x-2.5 font-bold">
          <img
            src="/unchained.png"
            alt="Zenos AI Logo"
            className="sm:w-9 sm:h-9 xss:w-7 xss:h-7"
          />
          <h2 className="sm:text-[1rem] xss:text-[0.95rem] font-inter leading-5 font-medium">
            UnchainedGPT
          </h2>
        </div>
        {/* <h3 className='text-[0.9rem] leading-5 text-[#dadada]'>Features</h3>
        <h3 className='text-[0.9rem] leading-5 text-[#dadada]'>Contact</h3>
        <h3 className='text-[0.9rem] leading-5 text-[#dadada]'>Features</h3> */}
      </div>
      <div className="space-x-5 font-inter font-medium">
        <Link
          href="/login"
          className="md:px-6 md:py-2 xs:px-3.5 xs:py-1.5 xss:px-3 xss:py-1.5 hover:scale-105 xss:text-[1rem] hover:bg-[#161616] rounded-md transition-all ease-in-out"
        >
          Login
        </Link>
        {/* <button className='md:px-4 md:py-[0.37rem] xs:px-3.5 xs:py-1.5 xss:px-3 hover:scale-[1.025] xss:py-1.5 items-center text-black xss:text-[1rem] bg-[#efefef] hover:bg-[#fdfdfd] transition-all ease-in-out rounded-md '>Get Started</button> */}
        <Link target="_blank" href="https://x.com/UnchainedGPT">
          <RainbowButton>Twitter</RainbowButton>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
