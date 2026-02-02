'use client'

import { useEffect, useState } from "react"
import { list } from '@/app/[locale]/lib/dataApi';

export default function InsertUnit({ setData, data, messagesIntl }) {
    const [modal, setModal] = useState(false);
    const [inserts, setInserts] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [search, setSearch] = useState({
        keyword: ''
    });

    function handleChange() {
        setModal(!modal);
    }
    async function fetchdashboard() {
        setLoading(true)
        let dataQry = '';
        dataQry += '?name=' + search.keyword + "&per_page=10" + "&page=1";
        const query = '/' + dataQry
        const data = await list(process.env.API_UNITS, query)
        console.log('list unit', data)
        setInserts(data.data.data)
        setLoading(false)
    }
    function initClick() {
        fetchdashboard()
        setModal(!modal);
    }
    useEffect(() => {
        
    }, [])

    return (
        <>
            <div className="cursor-pointer flex items-center justify-center rounded bg-primary py-3 px-6 text-white hover:bg-opacity-95 gap-2" onClick={initClick} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
            <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />
            <div className="modal z-99999">
                {isLoading ?
                    <p>Loading...</p>
                    :
                    <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark no-scrollbar overflow-hidden">
                        <div className="cursor-pointer btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></div>

                        <div className="border-b border-stroke py-2 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {messagesIntl ? messagesIntl.input.button.list : ''} {messagesIntl ? messagesIntl.trades.units.title : ''}
                            </h3>
                        </div>

                        <div className="form-control">
                            <label className="pt-5 mb-3 block text-black dark:text-white">Cari</label>
                            <div className="flex gap-2">
                                <input
                                    value={search.keyword}
                                    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                    onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
                                    type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="masukan keyword..." />
                                <div className="cursor-pointer flex items-center justify-center rounded bg-primary py-3 px-6 text-white hover:bg-opacity-95 gap-2" onClick={fetchdashboard} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className={`overflow-y-scroll h-75 mt-4 custom-scrollbar`}>
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="py-4 px-2 font-medium text-black dark:text-white">
                                            No.
                                        </th>
                                        <th className="py-4 px-2 font-medium text-black dark:text-white">
                                            Action
                                        </th>
                                        <th className="py-4 px-2 font-medium text-black dark:text-white">
                                            {messagesIntl ? messagesIntl.trades.units.title : ''}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inserts.map((insert, index) => (
                                        <tr onClick={() => {
                                            setData({
                                                ...data,
                                                unit_id: insert.id,
                                                unit: {
                                                    ...data.unit,
                                                    name: insert.name,
                                                }
                                            });
                                            setModal(false);
                                        }} key={index} className="cursor-pointer hover:bg-slate-200">
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {index + 1}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <div className="flex items-center space-x-3.5">
                                                    <button onClick={() => {
                                                        setData({
                                                            ...data,
                                                            unit_id: insert.id,
                                                            unit: {
                                                                ...data.unit,
                                                                name: insert.name,
                                                            }
                                                        });
                                                        setModal(false);
                                                    }} className="hover:text-primary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-cloud-download" viewBox="0 0 16 16">
                                                            <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
                                                            <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {insert.name}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </>
    );


}
