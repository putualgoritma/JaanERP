'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react"
import { store, list } from '@/app/[locale]/lib/dataApi';
import { InputNumberFormat } from '@react-input/number-format';
import InsertUnit from "@/app/[locale]/inventory/ui/products/insertUnit";
import InsertProduct from "@/app/[locale]/inventory/ui/products/insertProduct";
import { reFormatNumber } from '@/app/[locale]/lib/utils';

export default function Add({ messagesIntl, initData }) {

    const [listMaterial, setListMaterial] = useState([])
    const [codeMaterial, setCodeMaterial] = useState('')
    const [listMaterialSearch, setListMaterialSearch] = useState([])
    const [listP, setListP] = useState([])
    const [listM, setListM] = useState([])
    const types = [
        { id: 'regular', name: 'Regular' },
        { id: 'package', name: 'Package' },
        { id: 'manufacturing', name: 'Manufacturing' },
    ]
    const cUnitRef = useRef(null);

    const cPasswordRef = useRef(null);
    const [data, setData] = useState({
        name: '',
        unit_id: '',
        price: '',
        code: initData.productCode,
        type: '',
        unit: {
            name: '',
        }
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
            code: '',
            name: '',
            unit_id: '',
            price: '',
            type: '',
            unit: {
                name: '',
            }
        });
    }

    const [formError, setFormError] = useState(false);

    function handleChange() {
        setModal(!modal);
    }    

    async function handleSubmit(e) {
        e.preventDefault();
        if (data.unit_id == '') {
            alert("Please select unit");
            cUnitRef.current.focus();
            setFormError(true)
            return
        }
        setIsMutating(true)

        let dataRequest = {
            code: data.code,
            name: data.name,
            unit_id: data.unit_id,
            price: reFormatNumber(data.price),
            list_price: listP,
            materials: listM,
            type: data.type
        }
        //console.log("dataRequest hinii : ", dataRequest)
        const dataSupplier = await store(process.env.API_PRODUCTS_STORE, dataRequest)
        setIsMutating(false)
        resetData()
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataSupplier));
        router.push(`${pathname}?${params}`);
    }

    const [tab, setTab] = useState(1)

    // kelola product price end

    // kelola material start
    async function getListM() {
        const qry = "?keyword=" + codeMaterial + "&page=1" + "&per_page=10";
        const data = await list(process.env.API_PRODUCTS, qry)
        setListMaterialSearch(data.data)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getListM()
        }, 500)

        return () => clearTimeout(timer)
    }, [codeMaterial])

    // kelola product harga bertingkat start

    const addP = () => {

        let dat = { qty: '', price: '', priceLabel: '' }
        setListP([...listP, dat])

    }

    function updP(key, val, col) {
        let arr = listP;
        if (col == "price") {
            arr[key]["priceLabel"] = val
            arr[key]["price"] = reFormatNumber(val)
        } else {
            arr[key][col] = val
        }

        setListP([...arr])
        console.log('hini data : ', arr)
    }

    function delP(key) {
        var arr = listP;
        arr.splice(key, 1);
        setListP([...arr])
    }

    // kelola product harga bertingkat end

    //manufaktur
    const addM = () => {
        let dat = { name: '', qty: '1', unit: '', child_id: '' }
        setListM([...listM, dat])

    }

    function updAllM(setData, data, key, val) {
        let arr = listM;
        arr[key]['name'] = val.code + ' - ' + val.name
        arr[key]['unit'] = val.units.name
        arr[key]['child_id'] = val.id

        setListM([...arr])
    }

    function updM(key, val, col) {
        let arr = listM;
        arr[key][col] = val

        setListM([...arr])
    }

    function delM(key) {
        var arr = listM;
        arr.splice(key, 1);
        setListM([...arr])
    }

    const [viewM, setViewM] = useState(false);
    function handleType(e) {
        if (e == 'manufacturing') {
            setViewM(true);
        } else {
            setViewM(false);
            setListM([]);
        }
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
                <div className="modal-box w-7/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
                    {!isMutating && (
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></button>
                    )}
                    <div className="no-scrollbar overflow-hidden">
                        <div className="border-b border-stroke py-2 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {messagesIntl.input.button.create} {messagesIntl.trades.products.title}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="group">
                            {/* tab 1 start */}
                            <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                                {/* Nama dan kode */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.products.code} <span className="text-meta-1">*</span></label>
                                        <input
                                            value={data.code}
                                            onChange={(e) => setData({ ...data, code: e.target.value })}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${messagesIntl.trades.products.code}...`} required />
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Please enter a kode
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.products.name} <span className="text-meta-1">*</span></label>
                                        <input
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${messagesIntl.trades.products.name}...`} required />
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Please enter a name
                                        </span>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.units.title} <span className="text-meta-1">*</span></label>
                                    <div className="flex gap-2">
                                        <input
                                            ref={cUnitRef}
                                            value={data.unit.name}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="select unit..." required readOnly />
                                        {modal &&
                                            <InsertUnit messagesIntl={messagesIntl} setData={setData} data={data} />
                                        }
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.products.type} <span className="text-meta-1">*</span></label>
                                    <select onChange={(e) => { setData({ ...data, type: e.target.value }); handleType(e.target.value); }} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option disabled selected >{messagesIntl.trades.products.type}</option>
                                        {types.map((data, key) => {
                                            return <option key={key} value={data.id}>{data.name}</option>

                                        })
                                        }
                                    </select>
                                </div>

                                {/* Harga */}

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.products.price} <span className="text-meta-1">*</span></label>
                                    <InputNumberFormat
                                        locales="id-ID"
                                        value={data.price}
                                        onChange={(e) => setData({ ...data, price: e.target.value })}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${messagesIntl.trades.products.price}...`} required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a name
                                    </span>
                                </div>

                                {/* Harga Bertingkat */}
                                <label className="pt-5 mb-3 block text-black dark:text-white">
                                    {messagesIntl.trades.products.price_level} <span className="text-meta-1">*</span></label>
                                <div className="form-control flex-row gap-1 py-1">

                                    <input readOnly
                                        value={"Qty"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />

                                    <input readOnly
                                        value={"Price"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />
                                    <input readOnly
                                        value={"Action"}
                                        type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />
                                </div>

                                {listP.map((val, key) => {
                                    return (
                                        <div key={key} className="form-control flex-row gap-1 py-1">

                                            <input
                                                value={val.qty}
                                                onChange={(e) => updP(key, e.target.value, "qty")}
                                                type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${messagesIntl.trades.products.qty}...`} required />

                                            <InputNumberFormat
                                                locales="id-ID"
                                                value={val.priceLabel}
                                                onChange={(e) => updP(key, e.target.value, "price")}
                                                className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={`masukan ${messagesIntl.trades.products.price}...`} required />


                                            <div className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-center font-medium outline-none bg-red-500 text-white cursor-pointer" onClick={() => { delP(key) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
                                            </div>
                                        </div>)
                                })
                                }
                                {/* <div className="flex-row flex-wrap w-full items-end relative mb-8"> */}
                                <div className="w-1/3 border-[1.5px] border-current flex items-center justify-center rounded mt-2 py-2 px-2 text-sky-500 hover:bg-opacity-95 gap-2 cursor-pointer" onClick={() => { addP() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                    {messagesIntl.input.button.create} {messagesIntl.trades.products.price_level}
                                </div>


                                {viewM &&
                                    <>
                                        {/* Manufacture Section */}

                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.trades.product_materials.title} <span className="text-meta-1">*</span></label>
                                        <div className="grid grid-cols-5 gap-1 py-1">

                                            <input readOnly
                                                value={"Code - Name"}
                                                type="text" className="bg-slate-100 col-span-2 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />
                                            <input readOnly
                                                value={"Qty"}
                                                type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                            <input readOnly
                                                value={"Unit"}
                                                type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                            <input readOnly
                                                value={"Action"}
                                                type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.." required />
                                        </div>


                                        {listM.map((val, key) => {
                                            return (
                                                <div key={key} className="grid grid-cols-5 gap-1 py-1 ">

                                                    {/* Material */}
                                                    {modal &&
                                                        <InsertProduct messagesIntl={messagesIntl} initData={updAllM} setData={setData} data={data} keyco={key} valco={val} />
                                                    }
                                                    <input
                                                        value={val.qty}
                                                        onChange={(e) => updM(key, e.target.value, "qty")}
                                                        type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required />

                                                    <input
                                                        value={val.unit}
                                                        type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="" required readOnly />


                                                    <div className="w-full border-[1.5px] cursor-pointer border-stroke bg-transparent py-3 px-5 text-center font-medium outline-none bg-red-500 text-white" onClick={() => { delM(key) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </div>
                                                </div>)
                                        })
                                        }

                                        <div className="w-1/3 border-[1.5px] border-current flex items-center justify-center rounded mt-2 py-2 px-2 text-sky-500 hover:bg-opacity-95 gap-2 cursor-pointer" onClick={() => { addM() }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                            </svg>
                                            {messagesIntl.input.button.create} {messagesIntl.trades.products.title}
                                        </div>


                                        {/* End Manufacture */}
                                    </>
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
            </div >
        </div >
    );


}
