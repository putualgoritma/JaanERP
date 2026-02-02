'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Page({ perPage }) {
    const router = useRouter()
    //generate path
    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');
    const searchParams = useSearchParams();
    function SetPage(n) {
        const params = new URLSearchParams(searchParams);
        params.set('perpage', n);
        params.delete("addresponse");
        router.push(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="flex items-center gap-2">
            <div className="form-control">Show</div>
            <div className="form-control">
                <select onChange={(e) => { SetPage(e.target.value) }} className="relative z-20 w-20 appearance-none rounded border border-stroke bg-transparent py-1 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    {perPage == 10 ?
                        <option value={"10"} disabled selected>10</option>
                        :
                        <option value={"10"}>10</option>
                    }
                    {perPage == 30 ?
                        <option value={"30"} disabled selected>30</option>
                        :
                        <option value={"30"}>30</option>
                    }
                    {perPage == 50 ?
                        <option value={"50"} disabled selected>50</option>
                        :
                        <option value={"50"}>50</option>
                    }
                </select>
            </div>
            <div className="form-control">entries</div>
        </div>
    );

}
