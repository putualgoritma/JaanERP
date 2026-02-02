'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { store } from '@/app/[locale]/lib/dataApi';
import { toRupiah } from '@/app/[locale]/lib/utils';

export default function AddUnit({dataUpd}) {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const [listP, setListP] = useState(dataUpd.product.product_units)
    const router = useRouter();
    const id = dataUpd.product.id
    const [tab, setTab] = useState(1)
    const [data, setData] = useState({
        name: '',
        register : `${year}${'-'}${month<10?`0${month}`:`${month}`}${'-'}${date}`,
        price : ''
      
    });
    const searchParams = useSearchParams();

    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');


// kelola product start

const addP=()=>{

     let dat =  {id : dataUpd.product.unit_id, name: '', qty : '', price:''}
     setListP([...listP,dat])
     
 }

 function updP(key, qty, col){
    let arr =  listP;
    

            arr[key][col] = qty

        setListP([...arr])
        console.log('hini data : ',arr)
}

function deleteProduct(id){
    var arr = listP;
    arr.splice(arr.findIndex(e => e.id === id),1);
    setListP([...arr])
}


// kelola product end



    function resetData() {
        setData({
        name : '',
        register : '',
        price : ''
            
        });
    }

    function handleChange() {
        setModal(!modal);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("data dari form...: ", data)
        setIsMutating(true)

        let dataRequest = {
            id : id,
            units : JSON.stringify(listP)
        }
        console.log('hinii datah : ',dataRequest)
        console.log("dataRequest : ", dataRequest)
        const dataa = await store(process.env.API_UNITS_DETAIL_STORE, dataRequest)
        setIsMutating(false)
        resetData()
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataa));
        router.push(`${pathname}?${params}`);
    }

  

    return (
        <div>
          
                <button className="flex items-center justify-center py-2 px-6 text-sky-500 underline hover:bg-opacity-95 gap-2" onClick={handleChange}>
                    {dataUpd.messagesIntl.trades.products.list_unit}
                </button>
            
            <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />

            <div className="modal z-99999">
                <div className="modal-box w-8/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
                    {!isMutating && (
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></button>
                    )}
                    <div className="no-scrollbar overflow-hidden">
                        <div className="border-b border-stroke py-2 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {dataUpd.messagesIntl.input.button.create} {dataUpd.messagesIntl.trades.products.list_unit}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="group">
                            {/* tab 1 start */}
                            <div className={`overflow-y-scroll h-80 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                            <label className="pt-5 mb-3 block text-black dark:text-white">
                                {/* {messagesIntl.trades.products.title} */}
                                Satuan
                                 <span className="text-meta-1">*</span></label>
                            <div className="form-control flex-row">



 <input readOnly
 value={"satuan"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />

<input readOnly
 value={"Qty"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />

<input readOnly
 value={"Price"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />
<input readOnly
 value={"Action"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />
</div>


{listP.map((val,key)=>{
    return(
 <div key={key} className="form-control flex-row">

 <input
     value={val.name}
     onChange={(e) => updP(key,e.target.value,"name" )}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${dataUpd.messagesIntl.trades.units.title}...`}   required />
      <input
     value={val.qty}
     onChange={(e) => updP(key,e.target.value,"qty" )}
     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${dataUpd.messagesIntl.trades.products.qty}...`}  required />

<input
     value={val.price}
     onChange={(e) => updP(key,e.target.value,"price" )}
     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${dataUpd.messagesIntl.trades.products.price}...`}  required />


     <div className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-center font-medium outline-none bg-red-500 text-white" onClick={()=>{deleteProduct(val.id)}}>
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
     </div>


</div>)
})
}
{/* <div className="flex-row flex-wrap w-full items-end relative mb-8"> */}


<div onClick={()=>{addP()}} className="text-sky-500 underline py-2 cursor-pointer">+ Add {dataUpd.messagesIntl.trades.units.title}</div>


                               
                            </div>
                            {/* tab 1 end */}


                            <div className="modal-action">
                                {!isMutating && (
                                    <button type="button" onClick={handleChange} className="btn">
                                        {dataUpd.messagesIntl.input.button.close}
                                    </button>
                                )}
                                {!isMutating ? (
                                    <button type="submit" className="btn  btn-primary group-invalid:pointer-events-none group-invalid:opacity-30">
                                        {dataUpd.messagesIntl.input.button.save}
                                    </button>
                                ) :
                                    (
                                        <button type="button" className="btn loading">
                                            {dataUpd.messagesIntl.input.button.save} ...
                                        </button>
                                    )

                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );


}
