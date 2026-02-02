import Update from "@/app/[locale]/payreceivable/ui/payabletransaction/update";
import { toRupiah } from '@/app/[locale]/lib/utils';
import Delete from "@/app/[locale]/ui/crud/delete";

export default function List({ dataList }) {
  const messagesIntl = dataList.messagesIntl;
  //console.log('rows', rows)  
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.payreceivable.payables.code}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.payreceivable.payables.register}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.payreceivable.payables.user_id}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.payreceivable.payables.amount}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.payreceivable.payables.type}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(dataList.rows) &&
          dataList.rows.map((row, index) => (
            <tr key={index}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {index + 1 + dataList.listInc}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.code}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.register}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.payreceivable.user.code} - {row.payreceivable.user.contact.name}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {toRupiah(row.amount)}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.type}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button className="hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  </button>
                  <Delete dataUpd={{ row: row, messagesIntl: messagesIntl, path:process.env.API_PAYRECEIVABLES_DELETE }} />
                  <Update dataUpd={{ row: row, messagesIntl: messagesIntl, accounts: dataList.accounts, accountpays: dataList.accountpays, payreceivable: dataList.payreceivable }} />
                </div>
              </td>
            </tr>
          ))}

      </tbody>
    </table>
  );

}
