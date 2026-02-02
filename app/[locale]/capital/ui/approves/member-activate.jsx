"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { store, patch } from '@/app/[locale]/lib/dataApi';

export default function MemberActivate({ messagesIntl, rows, dataParams, mandatory, principle }) {
  const [approved, setApproved] = useState(true);

  console.log('mandatory..', mandatory)

  const router = useRouter();
  const searchParams = useSearchParams();

  //generate path
  let pathname = usePathname();
  const pathnameArr = pathname.split("/");
  const listNum = '/' + pathnameArr[3] + '/';
  const pathRandom = Math.floor(Math.random() * 101);
  pathname = pathname.replace(listNum, '/' + pathRandom + '/');
  pathname = pathname.replace('approves', 'requests');

  useEffect(() => {
    //update request read
    const readRequest = async () => {
      await patch(process.env.API_CAPITAL_REQUESTS_PATCH, { id: dataParams.id, read: 'read' })
    }
    readRequest()
  }, [])

  async function handleChange() {
    //if approved
    if (approved) {
      //update member status registered
      let requestUser = {
        id: rows.id,
        status: 'activated'
      }
      const dataPatch = await patch(process.env.API_CAPITAL_USER_ACTIVATED, requestUser)
      console.log('dataPatch activatedUser', dataPatch)
      if (dataPatch.success) {
        //update request status 
        const statusRequest = await patch(process.env.API_CAPITAL_REQUESTS_PATCH, { id: dataParams.id, status: 'close' })
        //store approvals
        let dataRequest = {
          request_id: dataParams.id,
          transaction_id: dataParams.transaction_id,
          type: dataParams.type,
          status: 'close',
          module: dataParams.module,
          memo: dataParams.memo,
          status_trs_old: 'activate',
          status_trs_new: 'activated',
        }
        //console.log("dataRequest : ", dataRequest)
        const dataApproval = await store(process.env.API_USER_APPROVAL_STORE, dataRequest)
      } else {
        alert(dataPatch.message);
      }
    }

    //redirect
    const params = new URLSearchParams(searchParams);
    router.push(`${pathname}`);
  }
  return (
    <div>
      <div class="px-4 sm:px-0">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Member Information</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">{messagesIntl.user.contacts.name}</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{rows.contact && rows.contact.name}</dd>
          </div>
          <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">{messagesIntl.user.contacts.email}</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{rows.contact && rows.contact.email}</dd>
          </div>
          <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">{messagesIntl.user.contacts.card_id}</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{rows.contact && rows.contact.card_id}</dd>
          </div>
          <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">{messagesIntl.user.contacts.birthday}</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{rows.contact && rows.contact.birthday}</dd>
          </div>
          <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">{messagesIntl.user.contacts.phone}</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{rows.contact && rows.contact.phone}</dd>
          </div>
          <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">{messagesIntl.user.contacts.sex}</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{rows.contact && rows.contact.sex}</dd>
          </div>
          <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">{messagesIntl.user.users.status}</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{rows.contact && rows.status}</dd>
          </div>
        </dl>
      </div>

      <div className="mb-5.5 flex items-center justify-between">
        <div>

          {/* principle */}
          <div className="mb-5">
            <label className="pt-5 mb-3 block text-black dark:text-white font-semibold">
              {messagesIntl.capital.capitals.amount_option.principle}</label>
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
            </div>
            {principle[0].ledger.accounts.map((val, key) => {
              return (
                <div key={key} className="form-control flex-row gap-1 py-1">

                  <select onChange={(e) => updList(key, e.target.value, "account_id")} className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" readOnly>
                    <option value="" disabled selected='selected'>{val.name}</option>
                  </select>

                  <select onChange={(e) => updList(key, e.target.value, "type")} className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" readOnly>
                    <option value="D" disabled selected={(val.pivot.type == 'D') ? 'selected' : ''}>{messagesIntl.accounting.ledger_account.type_option.D}</option>
                    <option value="C" disabled selected={(val.pivot.type == 'C') ? 'selected' : ''}>{messagesIntl.accounting.ledger_account.type_option.C}</option>
                  </select>

                  <input
                    value={val.pivot.amount}
                    onChange={(e) => updList(key, e.target.value, "amount")}
                    type="number" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={val.pivot.amount} readOnly />
                </div>)
            })
            }
          </div>

          {/* mandatory */}
          <div className="mb-5">
            <label className="pt-5 mb-3 block text-black dark:text-white font-semibold">
              {messagesIntl.capital.capitals.amount_option.mandatory}</label>
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
            </div>
            {mandatory[0].ledger.accounts.map((val, key) => {
              return (
                <div key={key} className="form-control flex-row gap-1 py-1">

                  <select onChange={(e) => updList(key, e.target.value, "account_id")} className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" readOnly>
                    <option value="" disabled selected='selected'>{val.name}</option>
                  </select>

                  <select onChange={(e) => updList(key, e.target.value, "type")} className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" readOnly>
                    <option value="D" disabled selected={(val.pivot.type == 'D') ? 'selected' : ''}>{messagesIntl.accounting.ledger_account.type_option.D}</option>
                    <option value="C" disabled selected={(val.pivot.type == 'C') ? 'selected' : ''}>{messagesIntl.accounting.ledger_account.type_option.C}</option>
                  </select>

                  <input
                    value={val.pivot.amount}
                    onChange={(e) => updList(key, e.target.value, "amount")}
                    type="number" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder={val.pivot.amount} readOnly />
                </div>)
            })
            }
          </div>

          <label
            htmlFor="toggle1"
            className="flex cursor-pointer select-none items-center"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="toggle1"
                className="sr-only"
                onChange={() => {
                  setApproved(!approved);
                }}
              />
              <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
              <div
                className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${approved && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
                  }`}
              ></div>
            </div>
            <p className="px-4">Approve/Reject Request</p>
          </label>
        </div>
      </div>

      <button onClick={handleChange} className="w-full btn btn-primary group-invalid:pointer-events-none group-invalid:opacity-30">
        Approve/Reject
      </button>

    </div>

  );

}
