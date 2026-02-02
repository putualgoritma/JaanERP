import Update from "@/app/[locale]/payreceivable/ui/receivables/update";
import { toRupiah } from '@/app/[locale]/lib/utils';
import Delete from "@/app/[locale]/ui/crud/delete";
import Continue from "@/app/[locale]/payreceivable/ui/receivables/continue";

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
            {messagesIntl.payreceivable.receivables.code}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.payreceivable.receivables.register}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.payreceivable.receivables.user_id}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.payreceivable.receivables.amount}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.payreceivable.receivables.status}
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
                  {row.user.code} - {row.user.contact.name}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {toRupiah(row.payreceivableDebit-row.payreceivableCredit)}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.status}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">                  
                  <Delete dataUpd={{ row: row, messagesIntl: messagesIntl, path: process.env.API_PAYRECEIVABLES_DELETE }} />
                  <Update dataUpd={{ row: row, messagesIntl: messagesIntl, accounts: dataList.accounts, accountpays: dataList.accountpays }} />
                  <Continue id={row.id} />
                </div>
              </td>
            </tr>
          ))}

      </tbody>
    </table>
  );

}
