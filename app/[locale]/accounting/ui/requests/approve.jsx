'use client'

import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Approve({ dataUpd }) {
    const [messagesIntl, setIntl] = useState(dataUpd.messagesIntl)
    const [data, setData] = useState(dataUpd.row)
    console.log('dataAppro.member', data)

    const router = useRouter();
    const searchParams = useSearchParams();

    //generate path
    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');
    pathname = pathname.replace('requests', 'approves');

    async function handleChange() { 
        const params = new URLSearchParams(searchParams);
        params.set('dataParams', JSON.stringify(data));
        router.push(`${pathname}?${params}`);
    }

    return (
        <div className="flex items-center space-x-3.5">
            <button className="hover:text-primary" onClick={handleChange}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" /></svg>
            </button>
        </div>
    );
}
