
'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ChangeFlags = ({lang}) => {
const pathName = usePathname()
  const [change, setchange] = useState(false);

  const redirectedPathName = (locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <li className="relative">
        <div className="shadow-lg rounded-full">
            {/* ini lang : {lang} */}
         <Image
                onClick={()=>{setchange(!change)}}
                  width={30}
                  height={30}
                  src={`${lang == "id" ? "/flags/id.svg" : "/flags/gb.svg"}`}
                  alt="Logo"
                  className="cursor-pointer rounded-full"
                />
                </div>

                <div className={`${change ? "" : "hidden "}absolute left-0 mt-4 border border-gray-200 bg-white shadow-lg`}>
                    <div className="flex flex-row flex-wrap w-26 py-4">
                    <Link
              href={redirectedPathName("id")}
              className="m-auto shadow-md"
            >
                <Image
                onClick={()=>{setchange(false)}}
                  width={40}
                  height={40}
                  src="/flags/id.svg"
                  alt="Logo"
                 
                />
                </Link>
                <Link
              href={redirectedPathName("en")}
              className="m-auto shadow-md"
            >
                <Image
                onClick={()=>{setchange(false)}}
                  width={40}
                  height={40}
                  src="/flags/gb.svg"
                  alt="Logo"
                />
                </Link>
                </div>
                </div>
    </li>
  );
};

export default ChangeFlags;
