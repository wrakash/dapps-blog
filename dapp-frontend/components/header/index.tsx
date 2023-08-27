"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu } from "components/menu";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="fixed top-0 z-40  w-full h-[40px] bg-[#234E70] text-white flex justify-between items-center px-[1rem] md:px-[5rem] lg:px-[6rem]">
      {/* LogoName container */}
      <Link href="/" className="font-bold text-[1.5rem]">The Dapp List</Link>

      {/*Login container*/}

      <div className="space-x-[1rem] sm:space-x-[3rem]  flex justify-between items-center">
        <Menu />
      </div>
    </div>
  );
};
