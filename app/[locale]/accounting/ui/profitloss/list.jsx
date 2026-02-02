import { toRupiah } from '@/app/[locale]/lib/utils';

export default function List({ rows, messagesIntl }) {

  let revenuesTotal = getTotal(rows.revenues, 2)
  let expensesTotal = getTotal(rows.expenses)
  let profitTotal = revenuesTotal - expensesTotal

  function getTotal(listData, type = 1) {
    let total = 0;
    listData.forEach((item) => {
      if (type == 1) {
        total += (item.amount_debit - item.amount_credit)
      }
      if (type == 2) {
        total += (item.amount_credit - item.amount_debit)
      }
    })
    return total;
  }
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
            {messagesIntl.accounting.accounts.balance}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              {messagesIntl.accounting.accounts.type_option.Revenues}
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
        </tr>
        {Array.isArray(rows.revenues) &&
          rows.revenues.map((row, index) => (
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
                  {toRupiah(row.amount_debit - row.amount_credit)}
                </p>
              </td>
            </tr>
          ))}
        <tr>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              Total {messagesIntl.accounting.accounts.type_option.Revenues}
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              {toRupiah(revenuesTotal)}
            </p>
          </td>
        </tr>

      </tbody>

      <tbody>
        <tr>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              {messagesIntl.accounting.accounts.type_option.Expenses}
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
        </tr>
        {Array.isArray(rows.expenses) &&
          rows.expenses.map((row, index) => (
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
                  {toRupiah(row.amount_debit - row.amount_credit)}
                </p>
              </td>
            </tr>
          ))}
        <tr>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              Total {messagesIntl.accounting.accounts.type_option.Expenses}
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              {toRupiah(expensesTotal)}
            </p>
          </td>
        </tr>
      </tbody>

      <tbody>
        <tr>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              {messagesIntl.accounting.accounts.profit_loss}
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
        </tr>
        <tr>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              Total {messagesIntl.accounting.accounts.profit_loss}
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              {toRupiah(profitTotal)}
            </p>
          </td>
        </tr>

      </tbody>
    </table>
  );

}
