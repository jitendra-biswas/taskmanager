"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

const Sidenav = () => {
  const pathname = usePathname();

  const linkData = [
    {
      text: "Dashboard",
      icon: <RxDashboard />,
      link: "/"
    },
    {
      text: "Add Task",
      icon: <IoDocumentTextOutline />,
      link:"/addtask"
    },
    { 
        text: "All Tasks", 
        icon: <HiOutlineClipboardDocumentList /> ,
        link: "/alltasks"

    },
  ];

  return (
    <div className="max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-999 bg-white w-fit h-screen border-r-2 border-r-gray-100 p-5 flex flex-col gap-3">
      <Link href="/" className="text-xl ml-3 text-zinc-800">MyTask</Link>

      <div className="links w-full flex flex-col">
        {linkData.map((link,idx) => {
          return (
            <Link
              key={idx}
              href={link.link}
              className={`w-full text-md  px-5 py-2 rounded hover:bg-zinc-100 flex items-center gap-2  ${
                pathname === link.link ? "bg-zinc-100 text-blue-500" : "text-zinc-800"
              }`}
            >
              {link.icon}{link.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidenav;
