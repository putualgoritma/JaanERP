import Approve from "@/app/[locale]/capital/ui/requests/approve";

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
            {messagesIntl.user.requests.created_at}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.user.requests.type}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.user.requests.memo}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.user.requests.status}
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
                  {row.created_at}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.type}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.memo}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {row.status}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">                  
                  <Approve dataUpd={{ row: row, messagesIntl: messagesIntl }} />
                </div>
              </td>
            </tr>
          ))}

      </tbody>
    </table>
  );

}
