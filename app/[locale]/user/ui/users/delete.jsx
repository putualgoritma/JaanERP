'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa6";
import secureLocalStorage from "react-secure-storage";


// type Member = {
//     id : string,
//     email : string,
// }

export default function Delete(props ) {

    const [title,setTitle] = useState("22");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const  router = useRouter();

    function handleChange(){
        setModal(!modal);
    }
   async function handleDelete(userId ){
setIsMutating(true)
await fetch(`http://127.0.0.1:8000/api/v1/users/${userId}/destroy`,{
    method : 'DELETE',
   
});
setIsMutating(false)
setTitle("");
// router.refresh();
props.setRefresh(!props.refresh)
setModal(false)
    }
   
    return(
    <div>   
        <button className={`btn btn-xs bg-danger text-white hover:bg-red-700 lg:tooltip" data-tip="klik untuk menghapus member`} onClick={handleChange}><FaTrash /></button>
        <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />
        
         <div className="modal">
<div className="modal-box">
    <div className="font-bold text-lg">
        Anda yakin menghapus user {props.member.email}?
            <div className="modal-action">
                <button type="button" onClick={handleChange} className="btn">
close
                </button>
                {!isMutating ?(
  <button type="button" onClick={()=>handleDelete(props.member.id)} className="btn  btn-primary">
Delete
</button>
                ):
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
