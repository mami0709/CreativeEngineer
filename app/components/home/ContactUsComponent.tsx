"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ContactUsComponent: React.FC = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("https://forms.gle/sqA815LLnxxoidEd6");
  };
  return (
    <div className="w-10/12 mx-auto p-10 bg-yellow-50 rounded-lg shadow-md flex mb-44">
      <div>
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
          <p className="mt-4 text-gray-600 py-6">
            ご質問やご意見などは下記ボタンよりお問い合わせください。
            <br />
            上記以外にもご要望などございましたら、お気軽にお願い致します。
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://forms.gle/sqA815LLnxxoidEd6"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 text-white font-bold py-2 px-8 rounded hover:bg-red-600 transition duration-300 ease-in-out"
            style={{ color: "white !important" }}
          >
            問い合わせる →
          </a>
        </div>
      </div>

      <div className="relative h-200 w-full hidden sm:block">
        <Image
          className="rounded-lg px-24"
          src="/contact_us.jpg"
          alt="contact_us"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default ContactUsComponent;
