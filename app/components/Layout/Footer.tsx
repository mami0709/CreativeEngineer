import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-indigo-700 to-purple-400 shadow-lg">
      <div className="container flex flex-col pt-5 pb-5 text-center text-white">
        <Link
          href="https://forms.gle/sqA815LLnxxoidEd6"
          target="_blank"
          className="underline font-thin mb-10 mt-3"
        >
          お問い合わせ
        </Link>
        <span className="font-light">
          ©2024 創造エンジニア All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
