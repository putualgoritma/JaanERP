'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SyntheticEvent, useState, useEffect } from "react"
import { list } from "@/app/[locale]/lib/dataApi";

export default function Filter({ dataFilter, messagesIntl }) {
    //console.log('dataFilter lemp',dataFilter)
    const [payreceivables, setPayreceivables] = useState([]);
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

    const [form, setForm] = useState({
        register_start: dataFilter.register_start ? dataFilter.register_start : '',
        register_end: dataFilter.register_end ? dataFilter.register_end : '',
        status: dataFilter.status ? dataFilter.status : '',
        type: dataFilter.type ? dataFilter.type : '',
        order_by: dataFilter.order_by ? dataFilter.order_by : 'id',
        order_by_dir: dataFilter.order_by_dir ? dataFilter.order_by_dir : 'ASC',
        payreceivable_id: dataFilter.payreceivable_id ? dataFilter.payreceivable_id : '',
    });

    function handleModal() {
        setModal(!modal);
    }

    function handleForm(key, value) {
        setForm({
            ...form,
            [key]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsMutating(true)
        const params = new URLSearchParams(searchParams);
        params.set('datafilter', JSON.stringify(form));
        params.delete("addresponse");
        router.push(`${pathname}?${params}`);
        setIsMutating(false)
        // setTitle("");
        // router.refresh();
        setModal(false)
    }

    const getData = async () => {
        let dataQry = '';
        dataQry += "?per_page=10" + "&page=1";
        const query = '/' + dataQry
        const data = await list(process.env.API_PAYRECEIVABLES, query)
        console.log('data usrs...', data)
        setPayreceivables(data.data.data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="relative">
            <button className="flex items-center justify-center rounded bg-primary py-3 px-6 text-white hover:bg-opacity-95 gap-2" onClick={handleModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                </svg>
            </button>

            <div
                className={`absolute right-0 z-100000 mt-4 flex w-100 flex-col rounded-sm border border-stroke bg-white p-5 shadow-2xl dark:border-strokedark dark:bg-boxdark ${modal === true ? "block" : "hidden"
                    }`}
            >
                <input type="checkbox" name="" checked={modal} onChange={handleModal} className="modal-toggle" id="" />

                <div className="bg-white p-5 dark:border-strokedark dark:bg-boxdark">
                    <div className="">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModal}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></button>
                        <div className="">
                            <div className="border-b border-stroke py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    {messagesIntl.input.button.filter}
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.payreceivable.payables.status}</label>
                                    <select onChange={(e) => handleForm('status', e.target.value)} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option value='' selected={(form.status == '') ? 'selected' : ''}>{messagesIntl.payreceivable.payables.status}</option>
                                        <option value='active' selected={(form.status == 'active') ? 'selected' : ''}>Active</option>
                                        <option value='pending' selected={(form.status == 'pending') ? 'selected' : ''}>Pending</option>
                                        <option value='close' selected={(form.status == 'close') ? 'selected' : ''}>Close</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.payreceivable.payables.register}</label>
                                    <div className="flex flex-row gap-2">
                                        <input
                                            value={form.register_start}
                                            onChange={(e) => handleForm('register_start', e.target.value)}
                                            type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />

                                        <input
                                            value={form.register_end}
                                            onChange={(e) => handleForm('register_end', e.target.value)}
                                            type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                    </div>
                                </div>

                                <label className="pt-5 mb-3 block text-black dark:text-white">Order By</label>
                                <div className="flex flex-row gap-2">
                                    <select onChange={(e) => handleForm('order_by', e.target.value)} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option value='' selected={(form.order_by == '') ? 'selected' : ''}>Select Column</option>
                                        <option value='title' selected={(form.order_by == 'title') ? 'selected' : ''}>{messagesIntl.payreceivable.payables.title}</option>
                                        <option value='memo' selected={(form.order_by == 'memo') ? 'selected' : ''}>{messagesIntl.payreceivable.payables.memo}</option>
                                        <option value='status' selected={(form.order_by == 'status') ? 'selected' : ''}>{messagesIntl.payreceivable.payables.status}</option>
                                    </select>
                                    <select onChange={(e) => handleForm('order_by_dir', e.target.value)} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option value='' selected={(form.order_by_dir == '') ? 'selected' : ''}>Order by</option>
                                        <option value='ASC' selected={(form.order_by_dir == 'ASC') ? 'selected' : ''}>ASC</option>
                                        <option value='DESC' selected={(form.order_by_dir == 'DESC') ? 'selected' : ''}>DESC</option>
                                    </select>
                                </div>

                                <div className="modal-action">
                                    <button type="button" onClick={handleModal} className="btn">
                                        {messagesIntl.input.button.close}
                                    </button>
                                    {!isMutating ? (
                                        <button type="submit" className="btn  btn-primary">
                                            {messagesIntl.input.button.filter}
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
        </div>
    );


}
