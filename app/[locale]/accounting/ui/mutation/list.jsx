import { toRupiah } from '@/app/[locale]/lib/utils';
export default function List({ rows, messagesIntl, listInc }) {

  //console.log('rows', rows)
  let debitTotal = 0
  let creditTotal = 0
  let balanceTotal = 0
  rows.forEach((item) => {
    if (item.type == 'D') {
      debitTotal += parseFloat(item.amount);
    }
    if (item.type == 'C') {
      creditTotal += parseFloat(item.amount);
    }
  })
  balanceTotal = debitTotal - creditTotal
  console.log('debitTotal', debitTotal)
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.ledgers.register}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.accounts.name}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.ledgers.memo}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.ledger_account.type_option.D}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.ledger_account.type_option.C}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.accounting.accounts.balance}
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(rows) &&
          rows.map((row, index) => (
            <tr key={index}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {index + 1 + listInc}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.register}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.name}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.memo}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.type == 'D' ? toRupiah(row.amount) : '-'}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.type == 'C' ? toRupiah(row.amount) : '-'}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">-</p>
              </td>
            </tr>
          ))}

      </tbody>
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="py-4 px-4 font-medium text-black dark:text-white">

          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">

          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">

          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">

          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {toRupiah(debitTotal)}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {toRupiah(creditTotal)}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {toRupiah(balanceTotal)}
          </th>
        </tr>
      </thead>
    </table>
  );

}
