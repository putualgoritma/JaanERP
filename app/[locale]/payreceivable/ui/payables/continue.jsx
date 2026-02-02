'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Continue({ id }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    //console.log('rows', rows)  

    //set path
    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    const listNumType = '/' + pathnameArr[3] + '/payabletransaction';
    pathname = pathname.replace(listNum + 'payables', listNumType);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');

    function handleChange() {
        //redirect
        const params = new URLSearchParams(searchParams);
        let form = { payreceivable_id: id }
        params.set('datafilter', JSON.stringify(form));
        router.push(`${pathname}?${params}`);
    }

    return (
        <div>

            <div className="tooltip" data-tip='continue to mutation'>
            <button className="hover:text-primary" onClick={handleChange}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  </button>
            </div>
        </div>
    );
}
