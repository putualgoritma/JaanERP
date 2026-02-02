import Update from "@/app/[locale]/inventory/ui/products/update";
import Delete from "@/app/[locale]/inventory/ui/products/delete";
import Show from "@/app/[locale]/inventory/ui/products/show";
import AddUnit from "@/app/[locale]/inventory/ui/products/addUnit";


export default function List({ products,messagesIntl }) {  

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.products.name}
          </th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.products.unit}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.products.price}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.trades.products.materials}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {index + 1}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark relative">
              <p className="absolute top-0 right-10 cursor-grab ">
                <p className={`${(product.inProudct - product.outProudct) < 0 ?"bg-[#f43f5e]" : "bg-[#4ade80]" } p-2 text-sm rounded-md text-white `}>
              {product.inProudct - product.outProudct}
              </p>
              </p>
              <p className="text-black dark:text-white">
                {product.name}
              </p>
            </td>
            
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {product.units.name}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">     
                {product.price}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
              {product.product_materials.map((value,index)=>{
                  return (<div key={index}>
                  - {value.name}{"("}{value.pivot.qty}{")"}
                  </div>)
                })}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">

                <Show dataUpd={{product:product,messagesIntl:messagesIntl}} />
                <AddUnit dataUpd={{product:product,messagesIntl:messagesIntl}} />
                <Delete dataUpd={{product:product,messagesIntl:messagesIntl}} />
                <Update dataUpd={{product:product,messagesIntl:messagesIntl}} />
              </div>
            </td>
          </tr>

          // <tr className={` ${product.status == 'pending' ? 'bg-yellow-100 dark:bg-yellow-500' : product.status == 'close' ? 'bg-red-100 dark:bg-red-500' : ''} hover:bg-gray-200 dark:hover:bg-gray-500`} key={product.id}>


          //   <td className="text-lg p-2.5 text-black dark:text-white" >{index + 1}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{product.code}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{product.email}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{product.type}</td>
          //   <td>
          //     <Deleteproduct product={...product}  refresh = {refresh} setRefresh = {setRefresh}/>
          //     <Update product={...product}  refresh = {refresh} setRefresh = {setRefresh}/>
          //     <Detailproduct {...product} />
          //   </td>

          // </tr>
        ))}

      </tbody>
    </table>
  );

}
