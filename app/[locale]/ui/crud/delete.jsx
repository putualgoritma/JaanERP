'use client'

import { destroy } from "@/app/[locale]/lib/dataApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Delete({ dataUpd }) {
    const [title, setTitle] = useState("22");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    //generate path
    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');

    function handleChange() {
        setModal(!modal);
    }
    async function handleDelete(id) {
        setIsMutating(true)
        await destroy(dataUpd.path, id)
        setIsMutating(false)
        setTitle("");
        setModal(false)

        const params = new URLSearchParams(searchParams);
        router.push(`${pathname}?${params}`);
    }

    return (
        <div>

            <button className="hover:text-primary" onClick={handleChange}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
            </button>
            <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />

            <div className="modal">
                <div className="modal-box">
                    <div className="font-bold text-lg">
                        {dataUpd.messagesIntl.confirm.delete} {dataUpd.row.name}?
                        <div className="modal-action">
                            <button type="button" onClick={handleChange} className="btn">
                                close
                            </button>
                            {!isMutating ? (
                                <button type="button" onClick={() => handleDelete(dataUpd.row.id)} className="btn  btn-primary">
                                    {dataUpd.messagesIntl.input.button.delete}
                                </button>
                            ) :
                                (
                                    <button type="button" className="btn loading">
                                        Deleting ...
                                    </button>
                                )

                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}
