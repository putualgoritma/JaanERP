'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react"
import { store, list } from '@/app/[locale]/lib/dataApi';
import { formatNumber, toRupiah, getRegister } from '@/app/[locale]/lib/utils';
import InsertUser from "@/app/[locale]/user/ui/users/insertUser";
import InsertProduct from "@/app/[locale]/inventory/ui/products/insertProduct";
import { InputNumberFormat } from '@react-input/number-format';
import { addCart, initCart, updCart, delCart, initDataTrs, SetPath, updRelTrans } from '@/app/[locale]/inventory/lib/services';
import InsertTransaction from "@/app/[locale]/inventory/ui/products/insertTransaction";

export default function Update({ dataUpd }) {
    const messagesIntl = dataUpd.messagesIntl;
    const transaction = dataUpd.row
    const cUserRef = useRef(null);
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const [tab, setTab] = useState(1)
    const [data, setData] = useState(initDataTrs('pi', dataUpd.row));
    const searchParams = useSearchParams();
    const pathname = SetPath();

    function resetData() {
        setData(initDataTrs('pi'));
    }

    function handleChange() {
        setModal(!modal);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        //check supplier
        if (data.user_id == '') {
            alert("Please select supplier");
            cUserRef.current.focus();
            return
        }
        //check data.products
        if (data.products.length < 1) {
            alert("Cart is empty");
            return
        }
        setIsMutating(true)

        //console.log("dataRequest : ", data)
        const dataUpdate = await store(process.env.API_TRANSACTIONS_UPDATE, data)
        setIsMutating(false)
        resetData()
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataUpdate));
        router.push(`${pathname}?${params}`);
    }

    return (
        <div>
            <button className="hover:text-primary" onClick={handleChange}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
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
                                {messagesIntl.input.button.create} {messagesIntl.trades.transactions.title}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="group">
                            {/* tab 1 start */}
                            <div className={`overflow-y-scroll h-80 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>


                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.transactions.register} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.register}
                                        onChange={(e) => setData({ ...data, register: e.target.value })}
                                        type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan nama barang..." required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a name
                                    </span>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.transactions.title} <span className="text-meta-1">*</span></label>
                                    <div className="flex gap-2">
                                        <input
                                            ref={cUserRef}
                                            value={data.transaction.code}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="select transaction..." required readOnly />
                                        {modal &&
                                            <InsertTransaction messagesIntl={messagesIntl} setData={setData} updRelTrans={updRelTrans} data={data} type='po' />
                                        }
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.suppliers.title} <span className="text-meta-1">*</span></label>
                                    <div className="flex gap-2">
                                        <input
                                            ref={cUserRef}
                                            value={data.supplier.name}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="select supplier..." required readOnly />
                                        {modal &&
                                            <InsertUser messagesIntl={messagesIntl} setData={setData} data={data} type='supplier' />
                                        }
                                    </div>
                                </div>

                                {/* Cart Section */}

                                <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.transaction_product.title} <span className="text-meta-1">*</span></label>
                                <div className="grid grid-cols-6 gap-1 py-1">

                                    <input readOnly
                                        value={"Code - Name"}
                                        type="text" className="bg-slate-100 col-span-2 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />
                                    <input readOnly
                                        value={"Qty"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                    <input readOnly
                                        value={"Price"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                    <input readOnly
                                        value={"Sub Total"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                    <input readOnly
                                        value={"Action"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.." required />
                                </div>


                                {data.products.map((val, key) => {
                                    return (
                                        <div key={key} className="grid grid-cols-6 gap-1 py-1 ">

                                            {/* Material */}
                                            {modal &&
                                                <InsertProduct messagesIntl={messagesIntl} setData={setData} data={data} initData={initCart} keyco={key} valco={val} type='regular' />
                                            }
                                            <input
                                                value={val.qty}
                                                onChange={(e) => updCart(setData, data, key, e.target.value, "qty")}
                                                type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                            <InputNumberFormat
                                                locales="id-ID"
                                                value={val.priceLabel}
                                                className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required readOnly />

                                            <InputNumberFormat
                                                locales="id-ID"
                                                value={val.subTotal}
                                                className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required readOnly />


                                            <div className="w-full border-[1.5px] cursor-pointer border-stroke bg-transparent py-3 px-5 text-center font-medium outline-none bg-red-500 text-white" onClick={() => { delCart(setData, data, key) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
                                            </div>
                                        </div>)
                                })
                                }

                                <div className="grid grid-cols-2 gap-1 py-1 ">
                                    <div className="text-right"><label className="pt-5 mb-3 block text-black dark:text-white">Total <span className="text-meta-1">*</span></label></div>
                                    <div><input
                                        value={toRupiah(data.total)}
                                        //  onChange={(e) => }
                                        type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.." required readOnly /></div>
                                </div>

                                <div className="w-1/3 border-[1.5px] border-current flex items-center justify-center rounded mt-2 py-2 px-2 text-sky-500 hover:bg-opacity-95 gap-2 cursor-pointer" onClick={() => { addCart(setData, data) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                    {messagesIntl.input.button.create} {messagesIntl.trades.products.title}
                                </div>


                                {/* End Cart */}

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
