import Update from "@/app/[locale]/inventory/ui/warehouses/update";
import Delete from "@/app/[locale]/inventory/ui/warehouses/delete";
import Show from "@/app/[locale]/inventory/ui/warehouses/show";
import Link from "next/link";


export default function List({ rows, messagesIntl }) {


  //console.log('rows', rows)  
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.warehouses.name}
          </th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.warehouses.address}
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
              <p className="text-black dark:text-white">
                {row.address}
              </p>
            </td>

            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">

                <Show dataUpd={{ row: row, messagesIntl: messagesIntl }} />
                <Delete dataUpd={{ row: row, messagesIntl: messagesIntl }} />
                <Update dataUpd={{ row: row, messagesIntl: messagesIntl }} />
                <Link
                  href={`/inventory/1/products?page=1&per_page=50&price_start=&price_end=&type=&order_by=&order_by_dir=&warehouse_id=1&datafilter=%7B"price_start"%3A""%2C"price_end"%3A""%2C"order_by"%3A"id"%2C"order_by_dir"%3A"ASC"%2C"warehouse_id"%3A"${row.id}"%7D`}
                  className="text-sky-400"
                >
                  List Product
                </Link>
              </div>
            </td>
          </tr>

          // <tr className={` ${warehouse.status == 'pending' ? 'bg-yellow-100 dark:bg-yellow-500' : warehouse.status == 'close' ? 'bg-red-100 dark:bg-red-500' : ''} hover:bg-gray-200 dark:hover:bg-gray-500`} key={warehouse.id}>


          //   <td className="text-lg p-2.5 text-black dark:text-white" >{index + 1}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{warehouse.code}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{warehouse.email}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{warehouse.type}</td>
          //   <td>
          //     <Deletewarehouse warehouse={...warehouse}  refresh = {refresh} setRefresh = {setRefresh}/>
          //     <Update warehouse={...warehouse}  refresh = {refresh} setRefresh = {setRefresh}/>
          //     <Detailwarehouse {...warehouse} />
          //   </td>

          // </tr>
        ))}

      </tbody>
    </table>
  );

}
