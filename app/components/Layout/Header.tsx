import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../lib/next-auth/options";
import { DefaultButton } from "../button/DefaultButton";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type UserProfileOrLoginProps = {
  user?: User | null;
};

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium group"
  >
    {children}
  </Link>
);

const UserProfileOrLogin: React.FC<UserProfileOrLoginProps> = ({ user }) => {
  return (
    <NavLink href={user ? "/api/auth/signout" : "/login"}>
      <div className="flex flex-col items-center gap-2 text-white">
        {user ? (
          <IoLogOutOutline className="text-2xl" />
        ) : (
          <IoLogInOutline className="text-2xl" />
        )}
        <span className="text-xs">{user ? "ログアウト" : "ログイン"}</span>
      </div>
    </NavLink>
  );
};

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;

  return (
    <header className="bg-gradient-to-b from-indigo-700 to-purple-400 shadow-lg">
      <nav className="flex items-center justify-between p-2">
        <Link href={"/"} className="flex items-center text-white">
          <Image
            src="/createEndineer-logo-main.png"
            alt="創造エンジニアロゴ"
            width={200}
            height={200}
          />
        </Link>
        <div className="flex items-center gap-1">
          <UserProfileOrLogin user={user} />
          <Link
            href="https://forms.gle/sqA815LLnxxoidEd6"
            target="_blank"
            className="mr-3 hidden sm:block"
          >
            <DefaultButton text="お問い合わせ" rounded={true} />
          </Link>
          {user && (
            <Link
              href={`/mypage`}
              className="rounded-full overflow-hidden border border-gray-300"
            >
              <Image
                width={40}
                height={40}
                alt="profile_icon"
                src={user?.image || "/default_icon.png"}
                className="rounded-full"
              />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
