import Update from "@/app/[locale]/purchase/ui/po/update";
import Delete from "@/app/[locale]/ui/crud/delete";
import Continue from "@/app/[locale]/purchase/ui/po/continue";
import Show from "@/app/[locale]/purchase/ui/po/show";
import { toRupiah } from '@/app/[locale]/lib/utils';

export default function List({ rows, messagesIntl }) {

  //console.log('rows', rows)  
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.transactions.code}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.transactions.register}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.products.title}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Action
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
                <ul class="list-disc">


                  {row.transaction_product?.map((val,index) => {
                    return (<li key={index}>{val.name} {'('} {val.pivot.qty} x {toRupiah(val.pivot.price)} {')'}</li>)
                  })}

                </ul>
              </p>
            </td>            
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">

                {/* <Show dataUpd={{row:row,messagesIntl:messagesIntl}} /> */}
                <Delete dataUpd={{ row: row, messagesIntl: messagesIntl, path:process.env.API_TRANSACTIONS_DELETE }} />
                <Continue dataUpd={{ row: row, messagesIntl: messagesIntl, type: "pr" }} />
                <Continue dataUpd={{ row: row, messagesIntl: messagesIntl, type: "pi" }} />
                <Show dataUpd={{ data: row, messagesIntl: messagesIntl }} />
                <Update dataUpd={{row:row, messagesIntl:messagesIntl}} />
              </div>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );

}
