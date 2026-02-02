'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { store, patch } from '@/app/[locale]/lib/dataApi';
import { InputNumberFormat } from '@react-input/number-format';
import { reFormatNumber } from '@/app/[locale]/lib/utils';

export default function Activate({ dataUpd }) {
    //console.log('dataUpd.row',dataUpd.row)
    const cPasswordRef = useRef(null);
    const [messagesIntl, setIntl] = useState(dataUpd.messagesIntl)
    const [data, setData] = useState({
        amount_principle: 0,
        amount_mandatory: 0,
        payment_type: '',
        memo: 'Member Activation ' + dataUpd.row.code + ' - ' + dataUpd.row.contact.name,
        register: ''
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
            amount_principle: 0,
            amount_mandatory: 0,
            payment_type: '',
            memo: '',
            register: ''
        });
    }

    const [formError, setFormError] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (data.password != data.c_password) {
            alert("Please confirm password");
            cPasswordRef.current.focus();
            setFormError(true)
            return
        }
        setIsMutating(true)
        //activate user
        let dataUser = {
            id: dataUpd.row.id,
            status: 'activate'
        }
        const responseUser = await patch(process.env.API_CAPITAL_USER_ACTIVATE, dataUser)
        //store principle
        let dataPrinciple = {
            account_debit_id: data.payment_type,
            user_id: dataUpd.row.id,
            memo: data.memo,
            type: 'D',
            amount: reFormatNumber(data.amount_principle),
            register: data.register,
            model: 'principle',
        }
        const storePrinciple = await store(process.env.API_CAPITAL_STORE, dataPrinciple)

        //get period
        const d = new Date(data.register);
        let month = d.getMonth() + 1;
        month = month.toString().padStart(2, '0');
        let year = d.getFullYear();
        //store mandatory
        let dataMandatory = {
            account_debit_id: data.payment_type,
            user_id: dataUpd.row.id,
            memo: data.memo,
            type: 'D',
            amount: reFormatNumber(data.amount_mandatory),
            register: data.register,
            model: 'mandatory',
            period: year + "-" + month
        }
        const storeMandatory = await store(process.env.API_CAPITAL_STORE, dataMandatory)
        setIsMutating(false)
        // console.log('dataPrinciple', dataPrinciple)
        // console.log('dataMandatory', dataMandatory)
        resetData()
        // router.refresh();
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(storeMandatory));
        router.push(`${pathname}?${params}`);
    }

    const [tab, setTab] = useState(1)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <div className="flex items-center space-x-3.5">
            <div class="tooltip" data-tip="activate!">
                <button className="hover:text-primary" onClick={handleChange}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 448 512"><path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
                </button>
            </div>
            <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />
            {modal &&
                <div className="modal z-99999">
                    <div className="modal-box w-7/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
                        {!isMutating && (
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></button>
                        )}
                        <div className="">
                            <div className="border-b border-stroke py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    {messagesIntl.input.button.activate} {messagesIntl.user.users.type_option.member}
                                </h3>
                            </div>

                            <div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 p-1 dark:bg-meta-4">
                                <button onClick={() => { setTab(1) }} className={`${tab === 1 ? 'bg-white rounded-full shadow text-indigo-900' : ''} flex justify-center py-2 `}>Activation</button>
                            </div>

                            <form onSubmit={handleSubmit} className="group">
                                {/* tab 1 start */}
                                <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>


                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.capital.capitals.register} <span className="text-meta-1">*</span></label>
                                        <input
                                            value={data.register}
                                            onChange={(e) => setData({ ...data, register: e.target.value })}
                                            type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.capital.capitals.amount_option.principle} <span className="text-meta-1">*</span></label>
                                        <InputNumberFormat
                                            locales="id-ID"
                                            value={data.amount_principle}
                                            onChange={(e) => setData({ ...data, amount_principle: e.target.value })}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan simpanan pokok..." required />
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Please enter a valid principle amount
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.capital.capitals.amount_option.mandatory} <span className="text-meta-1">*</span></label>
                                        <InputNumberFormat
                                            locales="id-ID"
                                            value={data.amount_mandatory}
                                            onChange={(e) => setData({ ...data, amount_mandatory: e.target.value })}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan simpanan pokok..." required />
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Please enter a valid mandatory amount
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.capital.capitals.payment_type} <span className="text-meta-1">*</span></label>
                                        <select onChange={(e) => setData({ ...data, payment_type: e.target.value })} className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" required>
                                            <option value="" disabled selected='selected'>{messagesIntl.accounting.accounts.title}</option>
                                            {dataUpd.accounts.map((account, index) =>
                                                <option key={index} value={account.id}>{account.code} - {account.name}</option>
                                            )}
                                        </select>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Please enter a valid payment type
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.capital.capitals.memo}</label>
                                        <textarea
                                            rows={6}
                                            placeholder=""
                                            value={data.memo}
                                            onChange={(e) => setData({ ...data, memo: e.target.value })}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        ></textarea>
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
