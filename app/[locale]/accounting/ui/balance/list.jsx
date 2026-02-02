import { toRupiah } from '@/app/[locale]/lib/utils';
import Continue from "@/app/[locale]/accounting/ui/balance/continue";

export default function List({ rows, messagesIntl }) {
  

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.accounts.code}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.accounts.name}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.accounts.balance} {messagesIntl.accounting.ledger_account.type_option.D}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.accounts.balance} {messagesIntl.accounting.ledger_account.type_option.C}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.accounts.balance}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(rows) &&
          rows.map((row, index) => (
            <tr key={index}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {index + 1}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.code}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.name}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {toRupiah(row.amount_debit)}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {toRupiah(row.amount_credit)}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {toRupiah(row.amount_debit - row.amount_credit)}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                <Continue id={row.id} />
                </div>
              </td>
            </tr>
          ))}

      </tbody>
    </table>
  );

}
