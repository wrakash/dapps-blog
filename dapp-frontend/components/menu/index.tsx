"use client";
import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  signOut as nextSignOut,
  signIn as nextSignin,
  useSession,
} from "next-auth/react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export const Menu = () => {
  const session = useSession();
  const pathname = usePathname();

    // State to track whether the dropdown menu is open
    const [menuOpen, setMenuOpen] = useState(false)

  const signIn = () => {
    nextSignin();
  };

  const signOut = () => {
    let token = session.data?.user?.accessToken;

    let config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then(async (response) => {
        nextSignOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` });
      })
      .catch((error) => {
        nextSignOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` });
      });
  };

   // Function to close the dropdown menu
   const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {session.data?.user ? (
        <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenu.Trigger asChild>
            <button
              className="focus:outline-none"
              aria-label="Customise options"
            >
              {session.data?.user?.email}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              {pathname?.includes("/manage") ? (
                <DropdownMenu.Item>
                  <Link
                    href="/"
                    className="focus:outline-none group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    onClick={closeMenu}
                  >
                    Blogs
                    <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                      ⌘+B
                    </div>
                  </Link>
                </DropdownMenu.Item>
              ) : (
                <DropdownMenu.Item>
                  <Link
                    href="/manage"
                    className="focus:outline-none group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    onClick={closeMenu}
                  >
                    Manage
                    <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                      ⌘+M
                    </div>
                  </Link>
                </DropdownMenu.Item>
              )}

              <DropdownMenu.Item onClick={signOut}>
                <div className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  Sign Out
                  <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    ⌘+S
                  </div>
                </div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <button className="text-green-600" onClick={() => signIn()}>
          Manage
        </button>
      )}
    </>
  );
};
