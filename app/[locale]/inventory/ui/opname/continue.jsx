'use client'

import { destroy, store } from "@/app/[locale]/lib/dataApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa6";
import secureLocalStorage from "react-secure-storage";


// type Member = {
//     id : string,
//     email : string,
// }

export default function Continue({dataUpd}) {

    const [title,setTitle] = useState("22");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const  router = useRouter();

    const searchParams = useSearchParams();
    //generate path
    let pathname = usePathname();
    if(dataUpd.type == "pr"){
        pathname = "/id/inventory/1/pr"
    }
    else{
        pathname = "/id/inventory/1/pi"
    }
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');

    function handleChange(){
        setModal(!modal);
    }
   async function handleContinue(transaction){
//    alert(pathname)
    let data = {
        data : JSON.stringify(transaction),
        type : dataUpd.type
    }

    console.log('hinii datah : ', data)
setIsMutating(true)
await store(process.env.API_TRANSACTIONS_CONTINUE,data)
setIsMutating(false)
setTitle("");
setModal(false)

const params = new URLSearchParams(searchParams);
router.push(`${pathname}?${params}`);
    }
   
    return(
    <div>   

<button className="hover:text-primary" onClick={handleChange}>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg> */}
                  {dataUpd.type == "pr" ?
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 640 512"><path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
 :  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
                  }
                 

                 
                </button>
        <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />
        
         <div className="modal">
<div className="modal-box">
    <div className="font-bold text-lg">
        {dataUpd.type == "pr" ? dataUpd.messagesIntl.trades.transactions.confirmSend : dataUpd.messagesIntl.trades.transactions.confirmInvoice}?
            <div className="modal-action">
                <button type="button" onClick={handleChange} className="btn">
                {dataUpd.messagesIntl.Index.cencel}

                </button>
                {!isMutating ?(
  <button type="button" onClick={()=>handleContinue(dataUpd.transaction)} className="btn  btn-primary">
{dataUpd.messagesIntl.Index.yes}
</button>
                ):
                (
<button type="button" className="btn loading">
                    Process...
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
