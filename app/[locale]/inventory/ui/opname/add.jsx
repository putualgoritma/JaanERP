'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { get_products, get_suppliers, store } from '@/app/[locale]/lib/dataApi';
import { toRupiah } from '@/app/[locale]/lib/utils';
//import Purchase from "@/components/livesearchProducts/Purchase";
//import LiveSearch from "@/components/liveSearch";
//import AddWarehouse from "@/components/addWarehouse"


export default function Add({ messagesIntl }) {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const [modal, setModal] = useState(false);
    const [codeSupp, setCodeSupp] = useState("");
    const [codeW, setCodeW] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    const router = useRouter();
    const [tab, setTab] = useState(1)
    const [data, setData] = useState({
        name: '',
        user_id : '',
        register : `${year}${'-'}${month<10?`0${month}`:`${month}`}${'-'}${date}`,
        price : '',
        tax : 0,
        warehouse_id : '',
        delevery_fee : 0
      
    });
    const searchParams = useSearchParams();


    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');




    function resetData() {
        setData({
        name : '',
        user_id : '',
        register : '',
        price : '',
        tax : 0,
        delevery_fee : 0,
        warehouse_id : ''
            
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
            register: data.register,
            type : 'pr',
            status : 'success',
            products : JSON.stringify(list),
            tax : data.tax,
            user_id : data.user_id,
            delevery_fee : data.delevery_fee,
            warehouse_id : data.warehouse_id
        }
        console.log('hinii datah : ',dataRequest)
        //console.log("dataRequest : ", dataRequest)
        const dataa = await store( process.env.API_TRANSACTIONS_STORE ,dataRequest)
        setIsMutating(false)
        resetData()
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataa));
        router.push(`${pathname}?${params}`);
    }

  

    return (
        <div>
            {modal ?
                <button className="flex items-center justify-center rounded bg-info py-2 px-6 text-white hover:bg-opacity-95 gap-2" onClick={handleChange}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                    <span>{messagesIntl.input.button.close}</span>
                </button>
                :
                <button className="flex items-center justify-center rounded bg-info py-2 px-6 text-white hover:bg-opacity-95 gap-2" onClick={handleChange}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    {messagesIntl.input.button.create}
                </button>
            }
            <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />

            <div className="modal z-99999">
                <div className="modal-box w-8/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
                    {!isMutating && (
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></button>
                    )}
                    <div className="no-scrollbar overflow-hidden">
                        <div className="border-b border-stroke py-2 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {messagesIntl.input.button.create}
                                {messagesIntl.trades.transactions.title}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="group">
                            {/* tab 1 start */}
                            <div className={`overflow-y-scroll h-80 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                                
                                <div className="grid grid-cols-2 gap-2">
                            {/* <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.transactions.code} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.code}
                                        onChange={(e) => setData({ ...data, code: e.target.value })}
                                        type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan nama barang..."  required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a name
                                    </span>
                                </div> */}

                     

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.transactions.register} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.register}
                                        onChange={(e) => setData({ ...data, register: e.target.value })}
                                        type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan nama barang..."  required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a name
                                    </span>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Total <span className="text-meta-1">*</span></label>
                                  <input
                                     value={toRupiah(total)}
                                    //  onChange={(e) => }
                                     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required readOnly />
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Pajak <span className="text-meta-1">*</span></label>
                                  <input
                                     value={data.tax}
                                     onChange={(e) => setData({ ...data, tax: e.target.value })}
                                     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Ongkir <span className="text-meta-1">*</span></label>
                                  <input
                                     value={data.delevery_fee}
                                     onChange={(e) => setData({ ...data, delevery_fee: e.target.value })}
                                     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Total setelah pajak + ongkir<span className="text-meta-1">*</span></label>
                                  <input
                                     value={toRupiah(total+Number(data.tax)+Number(data.delevery_fee))}
                                    //  onChange={(e) => }
                                     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required readOnly />
                                </div>

                                

                                </div>

  {/* supllayer start view */}
                       
  {/* <LiveSearch dataUpt={{
                        code : codeSupp,
                        messagesIntl : messagesIntl,
                        setCode : setCodeSupp,
                        data : data,
                        setData : setData,
                    col : "user_id",
                    colType : "user_id"
                       }
                       } /> */}


                                {/* supplier end view */}     

                                 {/*warehouse  */}
                                 {/* <LiveSearch dataUpt={{
                        code : codeW,
                        messagesIntl : messagesIntl,
                        setCode : setCodeW,
                        data : data,
                        setData : setData,
                    col : "warehouse_id",
                    AddW : AddWarehouse,
                    colType : "warehouse_id"
                       }
                       } /> */}

                                {/* <Purchase dataUpd={{ setList : setList, list : list, messagesIntl : messagesIntl, setTotal : setTotal }} />     */}
{/* <div className="flex-row flex-wrap w-full items-end relative mb-8"> */}


{/* <div onClick={()=>{alert(JSON.stringify(listP))}} className="btn btn-sm bg-sky-400 text-white right-2 top-2">Add Product</div> */}
{/* </div> */}

                        

                           
{/* <div className="flex flex-row"> */}
                                {/* <div className="form-control m-5">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Total <span className="text-meta-1">*</span></label>
                                  <input
                                     value={toRupiah(total)}
                                    //  onChange={(e) => }
                                     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required readOnly />
                                </div> */}

                                {/* <div className="form-control m-5">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Pay <span className="text-meta-1">*</span></label>
                                  <input
                                     value={pay}
                                     onChange={(e) => setPay(e.target.value)}
                                     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />
                                </div>

                                <div className="form-control m-5">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Kembalian <span className="text-meta-1">*</span></label>
                                  <input
                                     value={toRupiah(Number(pay)-Number(total))}
                                     onChange={(e) => setPay(val.code,e.target.value)}
                                     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required readOnly />
                                </div> */}

                                {/* </div> */}
                            </div>
                            {/* tab 1 end */}


                            <div className="modal-action">
                                {!isMutating && (
                                    <button type="button" onClick={handleChange} className="btn">
                                        {messagesIntl.input.button.close}
                                    </button>
                                )}
                                {!isMutating ? (
                                    <button type="submit" className="btn  btn-primary group-invalid:pointer-events-none group-invalid:opacity-30">
                                        {messagesIntl.input.button.save}
                                    </button>
                                ) :
                                    (
                                        <button type="button" className="btn loading">
                                            {messagesIntl.input.button.save} ...
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
