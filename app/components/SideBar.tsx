"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaCrown } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { TbLanguageHiragana } from "react-icons/tb";
import { FaRoad } from "react-icons/fa";
import { IconType } from "react-icons";
import { FaSchool } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { HiOfficeBuilding } from "react-icons/hi";
import { RiComputerLine } from "react-icons/ri";

type SidebarLinkProps = {
  href: string;
  icon: IconType;
  children: ReactNode;
  selectedOption: string;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  children,
  selectedOption,
}) => (
  <Link href={href}>
    <li
      className={`text-slate-800 px-7 py-2 flex items-center ${
        selectedOption === href ? "bg-yellow-400" : ""
      }`}
    >
      <Icon className="mr-1" />
      {children}
    </li>
  </Link>
);

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedOption(pathname);
  }, [pathname]);

  return (
    <div className="bg-white w-70 h-screen shadow-lg pt-5 hidden sm:block">
      <span className="px-4 py-2 font-bold text-slate-800">人気</span>
      <ul>
        <SidebarLink
          href="/ranking"
          icon={FaCrown}
          selectedOption={selectedOption}
        >
          閲覧ランキング
        </SidebarLink>
        <SidebarLink
          href="/column"
          icon={FaStar}
          selectedOption={selectedOption}
        >
          コラム
        </SidebarLink>
      </ul>
      <div className="border-t border-gray-300 mx-4 my-2"></div>

      <span className="px-4 py-2 font-bold text-slate-800">勉強</span>
      <ul>
        <SidebarLink
          href="/a"
          icon={TbLanguageHiragana}
          selectedOption={selectedOption}
        >
          言語別おすすめ記事
        </SidebarLink>
        <SidebarLink href="/a" icon={FaRoad} selectedOption={selectedOption}>
          必見ロードマップ
        </SidebarLink>
        <SidebarLink href="/a" icon={FaSchool} selectedOption={selectedOption}>
          スクールおすすめランキング
        </SidebarLink>
        <SidebarLink href="/a" icon={FaBook} selectedOption={selectedOption}>
          おすすめ書籍
        </SidebarLink>
        <SidebarLink
          href="/a"
          icon={FaHandPaper}
          selectedOption={selectedOption}
        >
          おすすめ質問サイト
        </SidebarLink>
        <SidebarLink
          href="/a"
          icon={FaPencilAlt}
          selectedOption={selectedOption}
        >
          独学おすすめサイト
        </SidebarLink>
        <SidebarLink href="/a" icon={FaYoutube} selectedOption={selectedOption}>
          おすすめYouTube
        </SidebarLink>
      </ul>
      <div className="border-t border-gray-300 mx-4 my-2"></div>

      <span className="px-4 py-2 font-bold text-slate-800">転職</span>
      <ul>
        <SidebarLink href="/a" icon={MdWork} selectedOption={selectedOption}>
          求人サイト
        </SidebarLink>
        <SidebarLink
          href="/a"
          icon={HiOfficeBuilding}
          selectedOption={selectedOption}
        >
          転職対策
        </SidebarLink>
        <SidebarLink
          href="/a"
          icon={RiComputerLine}
          selectedOption={selectedOption}
        >
          ポートフォリオ
        </SidebarLink>
      </ul>
    </div>
  );
}
