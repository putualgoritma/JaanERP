'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { update } from '@/app/[locale]/lib/dataApi';

export default function Update({ dataUpd, dataPermissions }) {
    //console.log('dataPermissions', dataPermissions)
    const cPasswordRef = useRef(null);
    const [messagesIntl, setMessagesIntl] = useState(dataUpd.messagesIntl)

    const permissionsChecked = dataPermissions
    //console.log('permissionsChecked', permissionsChecked)

    dataUpd.permissions.map((data, i) => {
        let statusPermission = false
        permissionsChecked.map(obj => {
            if (obj.id === data.id) {
                statusPermission = true;
            }
        })
        dataUpd.permissions[i].status = statusPermission;
    });

    const [checkboxs, setCheckboxs] = useState(dataUpd.permissions);

    function handleChecked(id) {
        const newState = checkboxs.map(obj => {
            if (obj.id === parseInt(id)) {
                return { ...obj, status: !obj.status };
            }
            return obj;
        });
        setCheckboxs(newState);
    }

    const [data, setData] = useState({
        id: dataUpd.row.id,
        title: dataUpd.row.title
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
            title: ''
        });
    }

    const [formError, setFormError] = useState(false);

    function handleChange() {
        setModal(!modal);
    }
    async function handleSubmit(e) {
        e.preventDefault();

        //set permissions
        let permissions = []
        const newState = checkboxs.map(obj => {
            if (obj.status === true) {
                permissions.push(obj.id);
            }
        });

        setIsMutating(true)

        let dataRequest = {
            id: data.id,
            title: data.title,
            permissions: permissions
        }
        const dataUser = await update(process.env.API_USER_ROLE_UPDATE, dataRequest)
        setIsMutating(false)
        resetData()
        // router.refresh();
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataUser));
        router.push(`${pathname}?${params}`);
    }

    const [tab, setTab] = useState(1)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {

    }, [])

    const [isPostable, setIsPostable] = useState(dataUpd.row.postable=='Y'?true:false);

    return (
        <div className="flex items-center space-x-3.5">
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
                        <div className="">
                            <div className="border-b border-stroke py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    {messagesIntl.input.button.update} {messagesIntl.user.roles.title}
                                </h3>
                            </div>

                            <div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 p-1 dark:bg-meta-4">
                                <button onClick={() => { setTab(1) }} className={`${tab === 1 ? 'bg-white rounded-full shadow text-indigo-900' : ''} flex justify-center py-2 `}>Role</button>
                            </div>

                            <form onSubmit={handleSubmit} className="group">
                                {/* tab 1 start */}
                                <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                                <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.roles.title} <span className="text-meta-1">*</span></label>
                                        <input
                                            value={data.title}
                                            onChange={(e) => setData({ ...data, title: e.target.value })}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan title..." required />
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Please enter a valid title
                                        </span>
                                    </div>

                                    <div className="form-control">
                                        <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.roles.permissions} <span className="text-meta-1">*</span></label>
                                        {/* {console.log('cjhh',checkboxs)} */}
                                        {Array.isArray(checkboxs) &&
                                            checkboxs.map((data, index) => (
                                                <div key={index} class="flex items-center mb-4">
                                                    <input onChange={(e) => handleChecked(e.target.value)} id={data.id} type="checkbox" value={data.id} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"         
                                                    checked={(data.status == true) ? 'checked' : ''}
                                                    />
                                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >{data.title}</label>
                                                </div>
                                            ))}
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
