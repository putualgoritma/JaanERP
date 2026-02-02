'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { store } from '@/app/[locale]/lib/dataApi';
import { InputNumberFormat } from '@react-input/number-format';
import { reFormatNumber } from '@/app/[locale]/lib/utils';

export default function Add({ messagesIntl, accounts }) {
    const cPasswordRef = useRef(null);
    const [data, setData] = useState({
        title: '',
        register: '',
        memo: '',
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
            title: '',
            register: '',
            memo: '',
        });
    }

    const [formError, setFormError] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        //check listAccounts balance
        let balanceStatus = true;
        let amountDebit = 0;
        let amountCredit = 0;
        if (listAccounts.length > 1) {
            listAccounts.forEach((account, index) => {
                if (account.type == 'D') {
                    amountDebit += parseInt(account.amount);
                } else {
                    amountCredit += parseInt(account.amount);
                }
            })
            if (amountDebit != amountCredit) {
                balanceStatus = false;
            }
        }

        if (!balanceStatus) {
            alert("Accounts is not balance!" + ' ' + amountDebit + ' ' + amountCredit);
            setFormError(true)
            return
        }


        //console.log("data dari form...: ", data)
        setIsMutating(true)

        let dataRequest = {
            title: data.title,
            register: data.register,
            memo: data.memo,
            accounts: listAccounts,
            status: 'active'
        }

        //console.log("dataRequest : ", dataRequest)
        const dataStore = await store(process.env.API_ACCOUNTING_LEDGER_STORE, dataRequest)
        //console.log("iniiiii dataStore : ", dataStore);
        setIsMutating(false)
        resetData()
        // router.refresh();
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataStore));
        //console.log('uriiii...', `${pathname}?${params.toString()}`)
        router.push(`${pathname}?${params}`);
    }

    const [tab, setTab] = useState(1)

    const [file, setFile] = useState()
    const [imglabel, setImglabel] = useState({
        label1: 'Click to upload',
        label2: 'or drag and drop',
        label3: 'SVG, PNG, JPG or GIF (MAX. 800x400px'
    });

    const [isPostable, setIsPostable] = useState(false);

    const [listAccounts, setListAccounts] = useState([])
    const addList = () => {
        let dat = { account_id: '', type: 'D', amount: '0', amountLabel: '0' }
        setListAccounts([...listAccounts, dat])
    }

    function updList(key, val, col) {
        let arr = listAccounts;
        if (col == "amount") {
            arr[key]["amountLabel"] = val
            arr[key]["amount"] = reFormatNumber(val)
        } else {
            arr[key][col] = val
        }

        setListAccounts([...arr])
        //console.log('listAccounts', listAccounts)
    }

    function delList(id) {
        //console.log('listAccounts', listAccounts)
        let index = id
        var arr = listAccounts;
        arr.splice(index, 1);
        setListAccounts([...arr])
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
            {modal &&
                <div className="modal z-99999">
                    <div className="modal-box w-7/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
                        {!isMutating && (
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></button>
                        )}
                        <div className="no-scrollbar overflow-hidden">
                            <div className="border-b border-stroke py-2 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    {messagesIntl.input.button.create} {messagesIntl.accounting.ledgers.label}
                                </h3>
                            </div>

                            <div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 p-1 dark:bg-meta-4">
                                <button onClick={() => { setTab(1) }} className={`${tab === 1 ? 'bg-white rounded-full shadow text-indigo-900' : ''} flex justify-center py-2 `}>Ledger</button>
                            </div>

                            <form onSubmit={handleSubmit} className="group">
                                {/* tab 1 start */}
                                <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.accounting.ledgers.register} <span className="text-meta-1">*</span></label>
                                        <input
                                            value={data.register}
                                            onChange={(e) => setData({ ...data, register: e.target.value })}
                                            type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.accounting.ledgers.title} <span className="text-meta-1">*</span></label>
                                        <input
                                            value={data.title}
                                            onChange={(e) => setData({ ...data, title: e.target.value })}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.accounting.ledgers.memo}</label>
                                        <textarea
                                            rows={6}
                                            placeholder=""
                                            value={data.memo}
                                            onChange={(e) => setData({ ...data, memo: e.target.value })}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        ></textarea>
                                    </div>

                                    {/* ledger details */}
                                    <label className="pt-5 mb-3 block text-black dark:text-white">
                                        {messagesIntl.accounting.ledger_account.title} <span className="text-meta-1">*</span></label>
                                    <div className="form-control flex-row gap-1">
                                        <input readOnly
                                            value={messagesIntl.accounting.accounts.title}
                                            type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />

                                        <input readOnly
                                            value={messagesIntl.accounting.ledger_account.type}
                                            type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />
                                        <input readOnly
                                            value={messagesIntl.accounting.ledger_account.amount}
                                            type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />
                                        <input readOnly
                                            value={"Action"}
                                            type="text" className="bg-slate-100 w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" />
                                    </div>


                                    {listAccounts.map((val, key) => {
                                        return (
                                            <div key={key} className="form-control flex-row gap-1 py-1">

                                                <select onChange={(e) => updList(key, e.target.value, "account_id")} className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" required>
                                                    <option value="" disabled selected={(val.account_id == '') ? 'selected' : ''}>{messagesIntl.accounting.accounts.title}</option>
                                                    {accounts.map((account, index) =>
                                                        <option key={index} value={account.id} selected={(val.account_id == account.id) ? 'selected' : ''}>{account.code} - {account.name}</option>
                                                    )}
                                                </select>

                                                <select onChange={(e) => updList(key, e.target.value, "type")} className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" required>
                                                    <option value="D" selected={(val.type == 'D') ? 'selected' : ''}>{messagesIntl.accounting.ledger_account.type_option.D}</option>
                                                    <option value="C" selected={(val.type == 'C') ? 'selected' : ''}>{messagesIntl.accounting.ledger_account.type_option.C}</option>
                                                </select>

                                                <InputNumberFormat
                                                    locales="id-ID"
                                                    value={val.amountLabel}
                                                    onChange={(e) => updList(key, e.target.value, "amount")}
                                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={val.amount} required />


                                                <div className="rounded-lg w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-center font-medium outline-none text-white cursor-pointer" onClick={() => { delList(key) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                    </svg>
                                                </div>


                                            </div>)
                                    })
                                    }

                                    <div className="w-1/3 cursor-pointer border-[1.5px] border-current flex items-center justify-center rounded mt-2 py-2 px-6 text-sky-500 hover:bg-opacity-95 gap-2" onClick={() => { addList() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                        </svg>
                                        {messagesIntl.input.button.create} {messagesIntl.accounting.ledgers.title}
                                    </div>

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
            }
        </div>
    );


}
