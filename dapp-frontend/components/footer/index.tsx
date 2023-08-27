import React from "react";


export const Footer = () => {
  return (
    <footer className="bg-[#234E70] text-white h-[40px] fixed bottom-0 w-full">
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center">© {new Date().getFullYear()} The Dapp List. All rights reserved.</p>
      </div>
    </footer>
  );
};
