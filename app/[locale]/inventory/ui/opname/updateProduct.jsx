'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { store, list } from '@/app/[locale]/lib/dataApi';
import AddUnt from "@/app/[locale]/inventory/ui/products/addUnt";


export default function AddProduct({ propsData }) {

    const [listSupp, setListSupp] = useState([])
    const [codeSupp, setCodeSupp] = useState("");
    const [listFocuse, setListFocuse] = useState(0)
    const [listP, setListP] = useState([])

    const cPasswordRef = useRef(null);
    const [data, setData] = useState({
        name: '',
        unit_id : '',
        price : '',
        code : '',
        cogs : '',
      
    });
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

    function resetData() {
        setData({
            code : '',
            name: '',
            unit_id : '',
            price : '',
            cogs : ''
            
        });
    }

    const [formError, setFormError] = useState(false);

    function handleChange() {
        setModal(!modal);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("data dari form...: ", data)
        setIsMutating(true)

        let dataRequest = {
            code : data.code,
            name: data.name,
            unit_id : data.unit_id,
            price : data.price,
            cogs : data.cogs,
            list_price : JSON.stringify(listP)
        }
        //console.log("dataRequest : ", dataRequest)
        const dataSupplier = await store( process.env.API_PRODUCTS_STORE ,dataRequest)
        setIsMutating(false)
        propsData.addP(dataSupplier.data.id, dataSupplier.data.code, dataSupplier.data.name, dataSupplier.data.price, listP, codeSupp)
        // alert('berhasil')
        resetData()
        setModal(false)

        
        // propsData.setListP([... propsData.listP, {id: dataSupplier.data.id}])
        // const params = new URLSearchParams(searchParams);
        // params.set('addresponse', JSON.stringify(dataSupplier));
        // router.push(`${pathname}?${params}`);
    }

    const [tab, setTab] = useState(1)


    // supplier start
async function getListS(){
    const qry = "?name=" + codeSupp;
    const data = await list(process.env.API_PRODUCTS_GET_UNIT, qry)
    setListSupp(data)
}

useEffect(()=>{
    const timer = setTimeout(() => {
        if(data.unit_id == ""){
       
        getListS()
        }
      }, 500)
  
      return () => clearTimeout(timer)
},[codeSupp])

function onClickSupplier(name, id){
    setCodeSupp(name)
    setData({...data, unit_id : id})
    setListSupp([])
    setListFocuse(0)
    
}

// kelola product start

const addP=()=>{

    let dat =  {qty : '', price:''}
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



    return (
        <div>
            <div className="flex pb-2 text-sky-500 underline hover:bg-opacity-95 gap-2 cursor-pointer" onClick={handleChange}>
                    + {propsData.messagesIntl.input.button.create} {propsData.messagesIntl.trades.products.title}
                </div>
            <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />

            <div className="modal z-99999">
                <div className="modal-box w-7/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
                    {!isMutating && (
                        <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></div>
                    )}
                    <div className="no-scrollbar overflow-hidden">
                        <div className="border-b border-stroke py-2 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {propsData.messagesIntl.input.button.create} {propsData.messagesIntl.trades.products.title}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="group">
                            {/* tab 1 start */}
                            <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                                
                          

                    {/* Nama dan kode */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{propsData.messagesIntl.trades.products.code} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.code}
                                        onChange={(e) => setData({ ...data, code: e.target.value })}
                                        type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${propsData.messagesIntl.trades.products.code}...`}   required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a kode
                                    </span>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{propsData.messagesIntl.trades.products.name} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"  placeholder={`masukan ${propsData.messagesIntl.trades.products.name}...`}  required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a name
                                    </span>
                                </div>
                                </div>

                                {/* Satuan */}
                                <div className="form-control">
                                    <label className="pt-5 mb-3 items-center text-black dark:text-white flex flex-row">
                                        {propsData.messagesIntl.trades.units.title} <span className="text-meta-1">*</span></label>
                                        <AddUnt propsData={{messagesIntl: propsData.messagesIntl, data : data, setData : setData, setCodeSupp : setCodeSupp, onClickSupplier : onClickSupplier, setListSupp : setListSupp, setListFocuse : setListFocuse}} />

                                    <input
                                        value={codeSupp}
                                        onChange={(e) => {setCodeSupp(e.target.value),  setData({...data, unit_id : ''})}}
                                        onKeyPress={event=>{
                                            if(event.key === "Enter"){
                                                // alert('tess')
                                                // console.log('innni data ', listSupp[listFocuse])
                                                let d = listSupp[listFocuse]
                                                {onClickSupplier( d.name,d.id)}

                                              }
                                        }} 
                                        onKeyUp={event=>{
                                                if(event.key === "ArrowDown"){
                                                    if(listSupp.length > (listFocuse+1)){
                                                    setListFocuse(listFocuse+1)
                                                    }
                                                    else{
                                                        setListFocuse(0)
                                                    }

                                                }

                                                if(event.key === "ArrowUp"){
                                                    if(1 <= (listFocuse)){
                                                    setListFocuse(listFocuse-1)
                                                    }
                                                    else{
                                                        setListFocuse(listSupp.length-1)
                                                    }

                                                }

                                              
                                          }}
                                        //   onFocus={()=>{alert('jjj')}}
                                        type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"  placeholder={`masukan ${propsData.messagesIntl.trades.units.title}...`}  />



                                        {listSupp.length > 0 &&

                                 <div className="relative">
                                    <div className="absolute w-full border border-t-0 bg-white max-h-60 z-99999 overflow-y-scroll ">
                                        <div className="flex flex-row flex-wrap w-full">
                                          
                                        {listSupp.map((val, key)=>{
                                            return(
                                                <div key={key} className={`flex flex-row flex-wrap w-full hover:bg-bodydark hover: border-l-2 hover:border-sky-600 cursor-pointer ${key == listFocuse ? 'bg-bodydark border-l-2 border-sky-600' : ''}`} onClick={()=>{onClickSupplier( val.name,val.id)}}>
                                        <div className="pl-4 py-2">
                                            {val.name}
                                        </div></div>)
                                        })}

                                            
                                            </div> 
                                    </div>
                                  
                                 </div>  
                                }
                                </div>


{/* Harga */}
                                <div className="grid grid-cols-2 gap-2">

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{propsData.messagesIntl.trades.products.cogs} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.cogs}
                                        onChange={(e) => setData({ ...data, cogs: e.target.value })}
                                        type="number" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"  placeholder={`masukan ${propsData.messagesIntl.trades.products.cogs}...`}  required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a name
                                    </span>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{propsData.messagesIntl.trades.products.price} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.price}
                                        onChange={(e) => setData({ ...data, price: e.target.value })}
                                        type="number" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${propsData.messagesIntl.trades.products.price}...`}  required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a name
                                    </span>
                                </div>
                                </div>

                           
{/* Harga Bertingkat */}
                                <label className="pt-5 mb-3 block text-black dark:text-white">
                                {propsData.messagesIntl.trades.products.price_level} <span className="text-meta-1">*</span></label>
                            <div className="form-control flex-row">




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
     value={val.qty}
     onChange={(e) => updP(key,e.target.value,"qty" )}
     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"  placeholder={`masukan ${propsData.messagesIntl.trades.products.qty}...`}  required />

<input
     value={val.price}
     onChange={(e) => updP(key,e.target.value,"price" )}
     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"  placeholder={`masukan ${propsData.messagesIntl.trades.products.price}...`}  required />


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


<div onClick={()=>{addP()}} className=" text-sky-500 underline right-2 top-2 cursor-pointer py-2">+ {propsData.messagesIntl.input.button.create} {propsData.messagesIntl.trades.products.price_level}</div>

                            </div>
                            {/* tab 1 end */}
                            <div className="modal-action">
                                {!isMutating && (
                                    <button type="button" onClick={handleChange} className="btn">
                                        {propsData.messagesIntl.input.button.close}
                                    </button>
                                )}
                                {!isMutating ? (
                                    <div type="submit" className="btn  btn-primary" onClick={handleSubmit}>
                                        {propsData.messagesIntl.input.button.save}
                                    </div>
                                ) :
                                    (
                                        <button type="button" className="btn loading">
                                            {propsData.messagesIntl.input.button.save} ...
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
