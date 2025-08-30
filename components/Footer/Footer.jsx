import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col xss:items-center sm:flex-row sm:justify-between mt-[10rem] border-t py-10">
      <div className="xss:mb-8 sm:mb-0 xss:text-center sm:text-left">
        <div className="flex xss:justify-center sm:justify-start items-center space-x-3 font-bold">
          <img
            src="/unchained.png"
            alt="Zenos AI Logo"
            className="sm:w-8 sm:h-8 xss:w-7 xss:h-7"
          />
          <h2 className="text-[1.5rem] text-[#FFFFFF] leading-5 font-bold">
            UnchainedGPT
          </h2>
        </div>
        <p className="text-sm mt-4 font-inter text-[#e9e9e9]">
          Made by{" "}
          <a
            target="_blank"
            href="https://x.com/epicsidd"
            className="font-medium underline decoration-[#a9a9a9] transition-all hover:decoration-white"
          >
            Dinakar Reddy
          </a>{" "}
          ❤️
        </p>
      </div>
      <div className="flex xss:justify-center sm:justify-start items-center space-x-3 text-sm">
        <a
          target="_blank"
          href="mailto:dinakarreddii@gmail.com"
          className="ri-at-line sm:text-[2.2rem] xss:text-[2rem] text-black dark:text-white transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
        ></a>
        <a
          target="_blank"
          href="https://x.com/UnchainedGPT"
          className="ri-twitter-x-fill sm:text-[2.2rem] xss:text-[2rem] text-black dark:text-white transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
        ></a>
        {/* <a
          target="_blank"
          href="https://github.com/SiddDevZ"
          className="ri-github-fill sm:text-[2.2rem] xss:text-[2rem] text-black dark:text-white transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
        ></a> */}
      </div>
    </div>
  );
};

export default Footer;
