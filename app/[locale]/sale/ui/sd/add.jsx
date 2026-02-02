'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react"
import { store, list, show } from '@/app/[locale]/lib/dataApi';
import { formatNumber, toRupiah, getRegister } from '@/app/[locale]/lib/utils';
import InsertUser from "@/app/[locale]/user/ui/users/insertUser";
import InsertProduct from "@/app/[locale]/inventory/ui/products/insertProduct";
import { InputNumberFormat } from '@react-input/number-format';
import { addCart, initCart, updCart, delCart, initDataTrs, SetPath, updRelTrans } from '@/app/[locale]/inventory/lib/services';
import InsertTransaction from "@/app/[locale]/inventory/ui/products/insertTransaction";

export default function Add({ messagesIntl, modalState, parent_id }) {
    const cUserRef = useRef(null);
    const [modal, setModal] = useState(modalState);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const [tab, setTab] = useState(1)
    const [data, setData] = useState(initDataTrs('sd'));
    const searchParams = useSearchParams();
    const pathname = SetPath();

    function resetData() {
        setData(initDataTrs('sd'));
    }

    function handleChange() {
        setModal(!modal);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        //check supplier
        if (data.user_id == '') {
            alert("Please select user");
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
        const dataStore = await store(process.env.API_TRANSACTIONS_STORE, data)
        setIsMutating(false)
        resetData()
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataStore));
        params.delete("datacontinue");
        router.push(`${pathname}?${params}`);
    }

    const [warehouses, setWarehouses] = useState([]);
    const getData = async () => {
        let dataQry = '';
        dataQry += "?per_page=10" + "&page=1";
        const query = '/' + dataQry
        const data = await list(process.env.API_WAREHOUSES, query)
        console.log('data API_WAREHOUSES...', data)
        setWarehouses(data.data.data)
    }
    
    const getParent = async () => {
        const row = await show(process.env.API_TRANSACTIONS_SHOW, parent_id);
        updRelTrans(setData, data, row.data) 
    }

    useEffect(() => {
        if (parent_id > 0) {
            getParent()
        }
        getData()
    }, [])

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
                                            <InsertTransaction messagesIntl={messagesIntl} setData={setData} updRelTrans={updRelTrans} data={data} type='so' />
                                        }
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.users.title} <span className="text-meta-1">*</span></label>
                                    <div className="flex gap-2">
                                        <input
                                            ref={cUserRef}
                                            value={data.supplier.name}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="select user..." required readOnly />
                                        {modal &&
                                            <InsertUser messagesIntl={messagesIntl} setData={setData} data={data} type='member' />
                                        }
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.warehouses.title} <span className="text-meta-1">*</span></label>
                                    <select onChange={(e) => setData({ ...data, warehouse_id: e.target.value })} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" required>
                                        <option value='' selected={(data.warehouse_id == '') ? 'selected' : ''}>Select Column</option>
                                        {warehouses?.map((val,index) => {
                                            return <option key={index} value={val.id} selected={(data.warehouse_id == val.id) ? 'selected' : ''}>{val.name}</option>
                                        })
                                        }
                                    </select>
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
                                                <InsertProduct messagesIntl={messagesIntl} setData={setData} data={data} initData={initCart} keyco={key} valco={val} type='manufacturing' />
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

                                {/* product refill container Section */}

                                <label className="pt-5 mb-3 block text-black dark:text-white">Container in/out <span className="text-meta-1">*</span></label>
                                <div className="grid grid-cols-5 gap-1 py-1">

                                    <input readOnly
                                        value={"Code - Name"}
                                        type="text" className="bg-slate-100 col-span-2 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />
                                    <input readOnly
                                        value={"Out"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                    <input readOnly
                                        value={"In"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                    <input readOnly
                                        value={"Reject"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />
                                </div>


                                {console.log(data.products)}
                                {data.products.map((val, key) => {
                                    return (
                                        <div key={key} className={`grid grid-cols-5 gap-1 py-1 ${val.show === true ? "block" : "hidden"}`}>

                                            {/* Material */}
                                            <select className="cursor-pointer col-span-2 border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" required>
                                                <option value={val.name}>{val.name != '' ? val.name : '...'}</option>
                                            </select>
                                            <input
                                                value={val.out}
                                                type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required readonly />

                                            <input
                                                value={val.in}
                                                onChange={(e) => updCart(setData, data, key, e.target.value, "in")}
                                                type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                            <input
                                                value={val.reject}
                                                onChange={(e) => updCart(setData, data, key, e.target.value, "reject")}
                                                type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />
                                        </div>)
                                })
                                }

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
