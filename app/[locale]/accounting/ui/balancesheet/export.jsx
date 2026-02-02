'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import Pdf from "@/app/[locale]/accounting/report/balancesheet/pdf/list";
import Doc from "@/app/[locale]/accounting/report/balancesheet/doc/list";
import Csv from "@/app/[locale]/accounting/report/balancesheet/csv/list";

export default function Export(data) {
    console.log('data di export', data)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (
                !dropdownOpen
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    return (
        <div className="relative">
            <button className="flex items-center justify-center rounded bg-warning py-2 px-6 text-white hover:bg-opacity-95 gap-2" onClick={() => setDropdownOpen(!dropdownOpen)}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
                    <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
                    <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
                </svg>


                <span>Export</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
            </button>
            <div
                className={`absolute z-999999999999999 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"
                    }`}
            >
                {Array.isArray(data.assets) &&
                <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                
                    <li>
                        <Doc datas={data.assets} />
                    </li>
                    <li>
                        <Pdf datas={data.assets} />
                    </li>
                    <li>
                        <Csv datas={data.assets} />
                    </li>
                </ul>
                }
            </div>
        </div>
    );


}
