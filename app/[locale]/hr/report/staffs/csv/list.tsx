'use client';
import { CSVLink, CSVDownload } from "react-csv";
import Link from "next/link";
import { useState, useEffect } from 'react';

const UserCsv = (users: any) => {
    const [data, setData] = useState([])

    useEffect(() => {
        let dataCsv: any = []
        users.users.data.forEach((item: any) => {
            let obj = {
                ID: item.id,
                Code: item.code,
                Email: item.email
            }
            dataCsv.push(obj)
        })
        setData(dataCsv)
    }, [])
    return (
        <>
            <div className="flex gap-3.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5zM3 12v-2h2v2zm0 1h2v2H4a1 1 0 0 1-1-1zm3 2v-2h3v2zm4 0v-2h3v1a1 1 0 0 1-1 1zm3-3h-3v-2h3zm-7 0v-2h3v2z" />
            </svg><CSVLink data={data} filename={"users.csv"}>Export CSV</CSVLink></div>
        </>
    )
}
export default UserCsv