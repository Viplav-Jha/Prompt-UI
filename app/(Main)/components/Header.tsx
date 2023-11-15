import Link from "next/link";
import React, { useState } from "react";
import Navigation from "./Navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {FaBars} from 'react-icons/fa'
import { loadComponents } from "next/dist/server/load-components";
import path from "path";

type Props = {
  activeItem: number;
};

const Header = ({ activeItem }: Props) => {
  const [active, setactive] = useState(false);
  const [open, setOpen] =useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactive(true);
      } else {
        setactive(false);
      }
    });
  }

  return (
    <div
      className={`w-full p-5 border-b min-h-[60px] border-b-[#ffffff32] transition-opacity ${
        active && "fixed top-0 left-0 bg-[#00000] z-[9999]"
      }`}
    >
      <div className="hidden md:w-[90%] mx-auto md:flex items-center justify-between ">
        <div>
          <Link href={"/"}>
            <h1 className="font-Inter text-3xl cursor-pointer">
              <span className="text-[#64ff4c]">AI</span>Shop
            </h1>
          </Link>
        </div>
        <div className="flex">
          <Navigation activeItem={activeItem} />
        </div>
        <div className="flex items-center ml-10">
          <AiOutlineSearch className="text-[2xl] mr-5 cursor-pointer" />
          {/* Todo Authentication */}
          <Link href="/sign-in">
            <CgProfile className="text-[25px] cursor-pointer" />
          </Link>
        </div>
      </div>
      {/* Todo */}
      {/* for mobile screen */}
       <div className="w-full md:hidden flex items-center justify-between">
           <div>
           <Link href={"/"}>
            <h1 className="font-Inter text-3xl cursor-pointer">
              <span className="text-[#64ff4c]">AI</span>Shop
            </h1>
          </Link>
           </div>
           <div>
           <FaBars className='text-2xl cursor-pointer'
           onClick={()=>setOpen(!open)}
           />
           </div>
           {
            open && (
                <div className="fixed md:hidden w-full h-screen top-0 left-0 z-[9999] bg-[unset]"
                onClick={handleClose}
                id="screen"
                >

                </div>
            )
           }
       </div>
    </div>
  );
};

export default Header;


