'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { store } from "@/app/[locale]/lib/dataApi";

export default function Show({dataUpd}) {
    console.log('dataUpd.product',dataUpd.product)
    const cPasswordRef = useRef(null);
    const [intl, setIntl] = useState(dataUpd.messagesIntl)
    const data = dataUpd.product
    // const [data, setData] = useState({
    //     id : dataUpd.product.id,
    //     name: dataUpd.product.name,
    //     unit : dataUpd.product.unit,
    //     price : dataUpd.product.price
    // });
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    //generate path
    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');



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
                            {intl.input.button.view} {intl.trades.products.title}
                            </h3>
                        </div>


                            {/* tab 1 start */}
                            <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

<div className="grid grid-cols-2">
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.code} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.code}</p> 
                                </div>
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.name} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.name}</p> 
                                </div>
                              

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.cogs} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.cogs}</p> 
                                </div>
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.price} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.price}</p> 
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.qty} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.inProudct - data.outProudct} </p> 
                                </div>
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.name} </label>
                                    <p className="ml-3 block text-black dark:text-white">{data.units?.name}</p> 
                                </div>
</div>
                           

                           
{data.product_materials.length > 0 &&
  <div className="form-control">
  <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.materials} </label>
  <div className="grid grid-cols-4 gap-0">
    <label className="border-[1.5px] p-2 font-semibold">{intl.trades.products.code}</label>
    <label className="border-[1.5px] p-2 font-semibold">{intl.trades.products.name}</label>
    <label className="border-[1.5px] p-2 font-semibold">{intl.trades.products.qty}</label>
    <label className="border-[1.5px] p-2 font-semibold">{intl.trades.products.unit}</label>
    
 </div>
 {data.product_materials.map((material,index)=>{
  return <div key={index} className="grid grid-cols-4 gap-0"> 
  <p className="text-black dark:text-white border-[1.5px] p-2">{material.code}</p>
  <p className="text-black dark:text-white border-[1.5px] p-2">{material.name}</p>
  <p className="text-black dark:text-white border-[1.5px] p-2">{material.pivot.qty}</p>
  <p className="text-black dark:text-white border-[1.5px] p-2">{material.units.name}</p>
  </div>
 })

 }
 </div>
}

{data.product_units.length > 0 &&
  <div className="form-control">
  <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.price_level} </label>
  <div className="grid grid-cols-3 gap-0">
    <label className="border-[0.75px] p-2 font-semibold">Name</label>
    <label className="border-[0.75px] p-2 font-semibold">qty</label>
    <label className="border-[0.75px] p-2 font-semibold">price</label>
    
 </div>
 {data.product_units?.map((unitDetail,index)=>{
  return <div key={index} className="grid grid-cols-3 gap-0"> 
  <p className="text-black dark:text-white border-[0.75px] p-2 font-semibold">{unitDetail.name}</p>
  <p className="text-black dark:text-white border-[0.75px] p-2 font-semibold">{unitDetail.qty}</p>
  <p className="text-black dark:text-white border-[0.75px] p-2 font-semibold">{unitDetail.price}</p>
  </div>
 })

 }
 </div>
}

{data.product_qty_prices.length > 0 &&
  <div className="form-control">
  <label className="pt-5 mb-3 block text-black dark:text-white font-semibold ">{intl.trades.products.price_level} </label>
  <div className="grid grid-cols-2 gap-0">
    <label className="border-[0.75px] p-2 font-semibold">qty</label>
    <label className="border-[0.75px] p-2 font-semibold">price</label>
    
 </div>
 {data.product_qty_prices?.map((price_detail,index)=>{
  return <div key={index} className="grid grid-cols-2 gap-0"> 
  <p className="text-black dark:text-white border-[0.75px] p-2 font-semibold">{price_detail.qty}</p>
  <p className="text-black dark:text-white border-[0.75px] p-2 font-semibold">{price_detail.price}</p>
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
