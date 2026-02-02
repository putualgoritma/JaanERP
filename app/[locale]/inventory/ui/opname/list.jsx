import Update from "@/app/[locale]/inventory/ui/opname/update";
import Delete from "@/app/[locale]/inventory/ui/opname/delete";
import Continue from "@/app/[locale]/inventory/ui/opname/continue";
import Show from "@/app/[locale]/inventory/ui/opname/show";
import { toRupiah } from '@/app/[locale]/lib/utils';

export default function List({ transactions,messagesIntl }) {  

  //console.log('transactions', transactions)  
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.transactions.code}
          </th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.products.title}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.transactions.register}
          </th>
   
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {index + 1}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {transaction.code}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              <ul class="list-disc">
  

              {transaction.products?.map((val,key)=>{
                return (<li key={key}>{val.name} {'('} {val.pivot.qty} x { toRupiah(val.pivot.price)} {')'}</li>)
              })}
               
</ul>
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">     
                {transaction.register}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">

                {/* <Show dataUpd={{transaction:transaction,messagesIntl:messagesIntl}} /> */}
                <Delete dataUpd={{transaction:transaction,messagesIntl:messagesIntl}} />
                {transaction.status == "success" &&
 <Continue dataUpd={{transaction:transaction,messagesIntl:messagesIntl,type:"pi"}} />
                }
                    <Show dataUpd={{data:transaction,messagesIntl:messagesIntl}} />
                <Update dataUpd={{data:transaction,messagesIntl:messagesIntl}} />
              </div>
            </td>
          </tr>

          // <tr className={` ${transaction.status == 'pending' ? 'bg-yellow-100 dark:bg-yellow-500' : transaction.status == 'close' ? 'bg-red-100 dark:bg-red-500' : ''} hover:bg-gray-200 dark:hover:bg-gray-500`} key={transaction.id}>


          //   <td className="text-lg p-2.5 text-black dark:text-white" >{index + 1}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{transaction.code}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{transaction.email}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{transaction.type}</td>
          //   <td>
          //     <Deletetransaction transaction={...transaction}  refresh = {refresh} setRefresh = {setRefresh}/>
          //     <Update transaction={...transaction}  refresh = {refresh} setRefresh = {setRefresh}/>
          //     <Detailtransaction {...transaction} />
          //   </td>

          // </tr>
        ))}

      </tbody>
    </table>
  );

}
