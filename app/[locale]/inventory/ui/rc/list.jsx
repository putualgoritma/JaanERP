import { toRupiah } from '@/app/[locale]/lib/utils';

export default function List({ rows, messagesIntl }) {

  let balance = getBalance(rows)
  function getBalance(rows) {
    let totalEmptyin = 0;
    let totalEmptyout = 0;
    let totalFilledin = 0;
    let totalFilledout = 0;
    let totalRejectin = 0;
    let totalRejectout = 0;
    rows.forEach((row) => {
      totalEmptyin += row.model == 'empty' && row.type == 'D' ? row.amount:0
      totalEmptyout += row.model == 'empty' && row.type == 'C' ? row.amount:0
      totalFilledin += row.model == 'filled' && row.type == 'D' ? row.amount:0
      totalFilledout += row.model == 'filled' && row.type == 'C' ? row.amount:0
      totalRejectin += row.model == 'reject' && row.type == 'D' ? row.amount:0
      totalRejectout += row.model == 'reject' && row.type == 'C' ? row.amount:0
    })
    let balance = (totalEmptyin+totalFilledin+totalRejectin) - ((totalEmptyout+totalFilledout+totalRejectout))
    let outarr=[];
    outarr['totalEmptyin']=totalEmptyin;
    outarr['totalEmptyout']=totalEmptyout;
    outarr['totalFilledin']=totalFilledin;
    outarr['totalFilledout']=totalFilledout;
    outarr['totalRejectin']=totalRejectin;
    outarr['totalRejectout']=totalRejectout;
    outarr['balance']=balance;
    return outarr;
  }
  
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.transactions.register}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.products.title}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Customer Name
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
          Empty In
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
          Empty Out
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
          Filled In
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
          Filled Out
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
          Reject In
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
          Reject Out
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {index + 1}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {row.register}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {row.products[0].code} - {row.products[0].name}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {row.users[0].code} - {row.users[0].contact.name}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {row.model == 'empty' && row.type == 'D' ? row.amount:0}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {row.model == 'empty' && row.type == 'C' ? row.amount:0}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {row.model == 'filled' && row.type == 'D' ? row.amount:0}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {row.model == 'filled' && row.type == 'C' ? row.amount:0}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {row.model == 'reject' && row.type == 'D' ? row.amount:0}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {row.model == 'reject' && row.type == 'C' ? row.amount:0}
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
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            Sub Balance Empty
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            {balance['totalEmptyin']-balance['totalEmptyout']}
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            Sub Balance Filled
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            {balance['totalFilledin']-balance['totalFilledout']}
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            Sub Balance Reject
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            {balance['totalRejectin']-balance['totalRejectout']}
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
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              Total Balance:
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white font-bold underline">
              {balance['balance']}
            </p>
          </td>
        </tr>

      </tbody>
    </table>
  );

}
