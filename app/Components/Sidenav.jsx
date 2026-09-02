"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { signOut } from "next-auth/react";

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


  async function handleLogout(){
     await signOut({
      callbackUrl: "/signin",
    });
  }

  return (
    <div className="max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-999 bg-gray-200 w-fit h-screen border-r-2 border-r-gray-100 p-5 flex flex-col justify-between gap-3">
      <div>
        <Link href="/" className="text-xl ml-3 text-zinc-800">MyTask</Link>

      <div className="links w-full flex flex-col pt-5">
        {linkData.map((link,idx) => {
          return (
            <Link
              key={idx}
              href={link.link}
              className={`w-full text-md  px-5 py-2 rounded hover:bg-gray-300 flex items-center gap-2  ${
                pathname === link.link ? " bg-gray-300" : "text-zinc-800"
              }`}
            >
              {link.icon}{link.text}
            </Link>
          );
        })}
      </div>
      </div>

    
    <button onClick={handleLogout} className="w-full text-md text-red-500  px-5 py-2 rounded hover:bg-gray-300 flex items-center gap-2 cursor-pointer"><MdOutlineLogout /> Logout</button>
    
    </div>
  );
};

export default Sidenav;
