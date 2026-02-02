'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { update } from '@/app/[locale]/lib/dataApi';
import { initDataTrs, SetPath } from '@/app/[locale]/payreceivable/lib/services';
import InsertUser from "@/app/[locale]/user/ui/users/insertUser";
import { InputNumberFormat } from '@react-input/number-format';
import { reFormatNumber } from '@/app/[locale]/lib/utils';

export default function Add({ dataUpd }) {
    console.log('dataUpd', dataUpd)
    const messagesIntl = dataUpd.messagesIntl;
    const cUserRef = useRef(null);
    const [data, setData] = useState(initDataTrs('C', dataUpd.payreceivable, dataUpd.row));
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = SetPath();

    function resetData() {
        setData(initDataTrs('C', dataUpd.payreceivable));
    }

    const [formError, setFormError] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        //check staff
        if (data.payreceivable_id == '') {
            alert("Please select user");
            cUserRef.current.focus();
            return
        }
        setIsMutating(true)

        //console.log("dataRequest : ", data)
        const dataUpdate = await update(process.env.API_PAYRECEIVABLES_TRANSACTION_UPDATE, data)
        setIsMutating(false)
        resetData()
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataUpdate));
        params.delete("datacontinue");
        router.push(`${pathname}?${params}`);
    }

    const [tab, setTab] = useState(1)

    return (
        <div>
            <button className="hover:text-primary" onClick={handleChange}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
            </button>
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
                                    {messagesIntl.input.button.create} {messagesIntl.payreceivable.receivabletransaction.label}
                                </h3>
                            </div>

                            <div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 p-1 dark:bg-meta-4">
                                <button onClick={() => { setTab(1) }} className={`${tab === 1 ? 'bg-white rounded-full shadow text-indigo-900' : ''} flex justify-center py-2 `}>{messagesIntl.payreceivable.receivabletransaction.label}</button>
                            </div>
{console.log('data', data)}
                            <form onSubmit={handleSubmit} className="group">
                                {/* tab 1 start */}
                                <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.payreceivable.receivabletransaction.register} <span className="text-meta-1">*</span></label>
                                        <input
                                            value={data.register}
                                            onChange={(e) => setData({ ...data, register: e.target.value })}
                                            type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.payreceivable.receivabletransaction.title} <span className="text-meta-1">*</span></label>
                                        <input
                                            value={data.title}
                                            onChange={(e) => setData({ ...data, title: e.target.value })}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.payreceivable.receivabletransaction.memo} <span className="text-meta-1">*</span></label>
                                        <textarea
                                            rows={6}
                                            placeholder=""
                                            value={data.memo}
                                            onChange={(e) => setData({ ...data, memo: e.target.value })}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required
                                        ></textarea>
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.payreceivable.receivabletransaction.payreceivable_id} <span className="text-meta-1">*</span></label>
                                        <div className="flex gap-2">
                                            <input
                                                ref={cUserRef}
                                                value={data.payreceivable.name}
                                                type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="select member..." required readOnly />
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.payreceivable.receivabletransaction.amount} <span className="text-meta-1">*</span></label>
                                        <InputNumberFormat
                                            locales="id-ID"
                                            value={data.amount_label}
                                            onChange={(e) => setData({ ...data, amount_label: e.target.value, amount: reFormatNumber(e.target.value) })}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan simpanan pokok..." required />
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Please enter a valid amount
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.payreceivable.receivabletransaction.payreceivable_account_id} <span className="text-meta-1">*</span></label>
                                        <select onChange={(e) => setData({ ...data, payreceivable_account_id: e.target.value })} className="cursor-pointer relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" readOnly>
                                            <option value="" disabled selected={(data.payreceivable_account_id == '') ? 'selected' : ''}>{messagesIntl.accounting.accounts.title}</option>
                                            {dataUpd.accounts.map((account, index) =>
                                                <option key={index} className="cursor-pointer disabled:bg-slate-200" value={account.id} disabled selected={(data.payreceivable_account_id == account.id) ? 'selected' : ''}>{account.name}</option>
                                            )}
                                        </select>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Please enter a valid account type
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.payreceivable.receivabletransaction.account_id} <span className="text-meta-1">*</span></label>
                                        <select onChange={(e) => setData({ ...data, account_id: e.target.value })} className="cursor-pointer relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" required>
                                            <option value="" disabled selected={(data.account_id == '') ? 'selected' : ''}>{messagesIntl.accounting.accounts.title}</option>
                                            {dataUpd.accountpays.map((account, index) =>
                                                <option key={index} className="cursor-pointer disabled:bg-slate-200" value={account.id} disabled={(account.postable == 'N') ? 'disabled' : ''}selected={(data.account_id == account.id) ? 'selected' : ''}>{account.name}</option>
                                            )}
                                        </select>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Please enter a valid account type
                                        </span>
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
