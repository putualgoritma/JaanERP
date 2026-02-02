'use client'

import { useEffect, useState, useRef } from "react"

import { toRupiah } from '@/app/[locale]/lib/utils';

export default function Show({dataUpd}) {
    const [intl, setIntl] = useState(dataUpd.messagesIntl)
    const data = dataUpd.data
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
  


    function handleChange() {
        setModal(!modal);
    }

    const [tab, setTab] = useState(1)

    useEffect(() => {
        
    }, [])

    return (
        <div className="flex items-center space-x-3.5">
            <button className="hover:text-primary" onClick={handleChange}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
            </button>
            <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />

            <div className="modal z-99999">
                <div className="modal-box w-7/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
                    {!isMutating && (
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></button>
                    )}
                    <div className="">
                        <div className="border-b border-stroke py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                            {intl.input.button.view} {intl.trades.transactions.title}
                            </h3>
                        </div>


                            {/* tab 1 start */}
                            <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                            <div className="grid grid-cols-2">
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.transactions.code} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.code}</p> 
                                </div>
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.transactions.register} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.register}</p> 
                                </div>
                                </div>

                                <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.suppliers.title} </label>

                                <div className="grid grid-cols-2">
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.suppliers.name} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.users[0]?.contact?.name}</p> 
                                </div>
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.suppliers.phone} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.users[0]?.contact?.phone}</p> 
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.suppliers.address} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.users[0]?.contact?.address}</p> 
                                </div>
                                </div>
                              
                           
                                {data.products.length > 0 &&
  <div className="form-control">
  <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.title} </label>
  <div className="grid grid-cols-5 gap-0">
    <label className="border-[1.5px] p-2 font-semibold">{intl.trades.products.code}</label>
    <label className="border-[1.5px] p-2 font-semibold">{intl.trades.products.name}</label>
    <label className="border-[1.5px] p-2 font-semibold">{intl.trades.products.qty}</label>
    <label className="border-[1.5px] p-2 font-semibold">{intl.trades.products.price}</label>
    <label className="border-[1.5px] p-2 font-semibold">{intl.trades.products.unit}</label>
    
 </div>
 {data.products.map((product,key)=>{
  return <div key={key} className="grid grid-cols-5 gap-0"> 
  <p className="text-black dark:text-white border-[1.5px] p-2">{product.code}</p>
  <p className="text-black dark:text-white border-[1.5px] p-2">{product.name}</p>
  <p className="text-black dark:text-white border-[1.5px] p-2">{product.pivot.qty}</p>
  <p className="text-black dark:text-white border-[1.5px] p-2">{toRupiah(product.pivot.price)}</p>
  <p className="text-black dark:text-white border-[1.5px] p-2">{product.units.name}</p>
  </div>
 })

 }
 </div>
}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
