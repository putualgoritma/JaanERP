import Update from "@/app/[locale]/inventory/ui/units/update";
import Delete from "@/app/[locale]/inventory/ui/units/delete";
import Show from "@/app/[locale]/inventory/ui/units/show";

export default function List({ rows,messagesIntl }) {  

  //console.log('rows', rows)  
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.units.name}
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
                {row.name}
              </p>
            </td>
          
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">

                <Show dataUpd={{row:row,messagesIntl:messagesIntl}} />
                <Delete dataUpd={{row:row,messagesIntl:messagesIntl}} />
                <Update dataUpd={{row:row,messagesIntl:messagesIntl}} />
              </div>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );

}
