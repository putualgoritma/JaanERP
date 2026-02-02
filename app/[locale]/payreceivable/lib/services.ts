import { formatNumber, toRupiah, getRegister } from '@/app/[locale]/lib/utils';
import { usePathname } from "next/navigation";
import { useState, Component } from "react"

//set path
export const SetPath = () => {
    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');
    return pathname;
}

//init data
export const initData = (type: string, init: any) => {
    let data: any = {
        id: init ? init.id : 0,
        title: '',
        memo: '',
        register: init ? init.register : getRegister(),
        amount: 0,
        amount_label: 0,
        type: init ? init.type : type,
        status: init ? init.status : 'pending',
        user_id: init ? init.user_id : 0,
        account_id: init ? init.account_id : 0,
        account_pay: 0,
        user: {
            name: init && init.user ? init.user.contact.name : '',
        },
    }
    return data
}

//init data
export const initDataTrs = (type: string, payreceivable: any, init: any) => {
    let data: any = {
        id: init ? init.id : 0,
        title: init ? init.title :'',
        memo: init ? init.memo :'',
        register: init ? init.register : getRegister(),
        amount: init ? init.amount :0,
        amount_label: init ? init.amount :0,
        type: init ? init.type : type,
        ledger_id: init ? init.ledger_id : 0,
        status: init ? init.status : 'pending',
        payreceivable_id: init ? init.payreceivable_id : payreceivable.id,
        account_id: init ? init.account_id : 0,
        payreceivable_account_id: init && init.payreceivable ? init.payreceivable.account_id : payreceivable.account_id,
        payreceivable: {
            name: init && init.payreceivable ? init.payreceivable.code +' - '+ init.payreceivable.user.contact.name : payreceivable.code +' - '+ payreceivable.user.contact.name,
        },
    }
    return data
}