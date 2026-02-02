'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { list, store } from '@/app/[locale]/lib/dataApi';
import AddProduct from "@/app/[locale]/inventory/ui/opname/addProduct";
import { toRupiah } from '@/app/[locale]/lib/utils';

export default function Add({ dataUpd }) {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    let getD = [];
    let i = 0
    useEffect(()=>{
        // console.log('iniii dt : ',dataUpd.data.products?.length)
        for(i; i < dataUpd.data.products?.length; i++){
            getD.push({id : dataUpd.data.products[i].id, code : dataUpd.data.products[i].code, name : dataUpd.data.products[i].name, qty : dataUpd.data.products[i].pivot.qty, price : dataUpd.data.products[i].pivot.price,unit : dataUpd.data.products[i].units.name, product_qty_prices : [], base_price : dataUpd.data.products[i].pivot.price, type : 'D' })
        }
    },[])
   

    const [modal, setModal] = useState(false);
    const [codeSupp, setCodeSupp] = useState(dataUpd.data.users[0]?.contact?.name ? dataUpd.data.users[0]?.contact?.name : '' );
    const [listSupp, setListSupp] = useState([])
    const [pay, setPay] = useState('');
    const [codeSearch, setCodeSearch] = useState("");
    const [total, setTotal] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const [listP, setListP] = useState(
        getD
    )
    const [listSearch, setListSearch] = useState([])
    const router = useRouter();
    const [tab, setTab] = useState(1)
    const [data, setData] = useState({
        id : dataUpd.data.id,
        user_id : dataUpd.data.user_id,
        register : dataUpd.data.register,
        tax : dataUpd.data.tax ? dataUpd.data.tax : 0 ,
        delevery_fee : dataUpd.data.delevery_fee ? dataUpd.data.delevery_fee : 0
      
    });
    const searchParams = useSearchParams();
    const [listFocuse, setListFocuse] = useState(0)


    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');


// kelola product start
async function getListP(){
    const qry = "?keyword=" + codeSearch;
    const data = await list(process.env.API_TRANSACTIONS_GET_PRODUCT, qry)
    setListSearch(data)
}

useEffect(()=>{
    const timer = setTimeout(() => {
        getListP()
      }, 500)
  
      return () => clearTimeout(timer)
},[codeSearch])

function totT(arr){
    const sum = arr.reduce((acc, o) => acc + (parseInt(o.price)*parseInt(o.qty)), 0)
    setTotal(sum)
}

const addP=(id,code,name, price,product_qty_prices, unit)=>{
    let check = false
     let arr =  listP;
     let change = false
     let priceNew = 0
    
     for(let i=0; i < listP.length ; i++)
     {
         if(arr[i].code == code){
            if(product_qty_prices.length > 0){
                        let n = 0
               
                        
                        for(n = 0; n < product_qty_prices.length ; n++){
                            alert(Number(arr[i]['qty']) + 1 +" : "+ Number(product_qty_prices[n].qty))
               
                            if(Number(arr[i]['qty']) + 1  >= Number(product_qty_prices[n].qty)){
                            priceNew = product_qty_prices[n].price
                            change = true
                            alert(3)
                            }
                        else{
                            if(n === 0){
                                change = true
                                priceNew = price
                                }
                                // alert(4)
                                break;
                            }
                        }
                    }
                    
             // arr[i].qty = qty
             arr[i]['qty'] = Number(arr[i]['qty']) + 1 
             check = true
             if(change){
                arr[i]["price"] = priceNew
                arr[i]["rupiah"] = toRupiah(priceNew)
                }
            
         }
     }
     if(check){
         setListP([...arr])
         
         totT(arr)
     }
         else{
     let dat = {id : id, code : code, name: name,price : price,base_price : price, unit: unit, qty : 1, rupiah : toRupiah(price), type : 'D', product_qty_prices : product_qty_prices}
     setListP([...listP,dat])
     
     totT([...listP,dat])
         }
         setCodeSearch('')
 }

 function updP(code, qty, col, product_qty_prices, base_price){
 
    let priceNew = 0
    let change = false
  
    if(product_qty_prices.length > 0){

        let i = 0
        
        for(i = 0; i < product_qty_prices.length ; i++){
   
            if(qty >= Number(product_qty_prices[i].qty)){
            priceNew = product_qty_prices[i].price
            change = true

            }
        else{
            if(i === 0){
                change = true
                priceNew = base_price
                }
                break;
            }
        }
    }

    let arr =  listP;
    
    for(let i=0; i < listP.length ; i++)
        if(arr[i].code == code){
            // arr[i].qty = qty
            arr[i][col] = qty
            if(change){
            arr[i]["price"] = priceNew
            arr[i]["rupiah"] = toRupiah(priceNew)
            }
        }
        setListP([...arr])
        totT(arr)
        console.log('hini data : ',arr)
}

function deleteProduct(id){
    var arr = listP;
    arr.splice(arr.findIndex(e => e.id === id),1);
    totT(arr);
    setListP([...arr])
}

function onClickProduct(product){
//    addP(listP[key]["id"], listP[key]["code"], listP[key]["name"], listP[key]["price"], listP[key]["product_qty_prices"])
addP(product.id, product.code, product.name, product.price, product.product_qty_prices, product.units.name)
return false
}


// kelola product end

// supplier start
async function getListS(){
    const qry ="?search=" + codeSupp;
    const data = await list(process.env.API_TRANSACTIONS_GET_SUPPLIER, qry)
    setListSupp(data)
}

useEffect(()=>{
    const timer = setTimeout(() => {
        if(data.user_id == ""){
       
        getListS()
        }
      }, 500)
  
      return () => clearTimeout(timer)
},[codeSupp])

function onClickSupplier(name, id){
    setCodeSupp(name)
    setData({...data, user_id : id})
    setListSupp([])
    
    
}

// supplier end


    function resetData() {
        setData({
        id : '', 
        name : '',
        user_id : '',
        register : '',
        price : '',
        tax : 0,
        delevery_fee : 0,
            
        });
    }

    function handleChange() {
        setModal(!modal);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("data dari form...: ", data)
        setIsMutating(true)

        let dataRequest = {
            id : data.id,
            register: data.register,
            type : 'pr',
            status : 'success',
            products : JSON.stringify(listP),
            tax : data.tax,
            user_id : data.user_id,
            delevery_fee : data.delevery_fee
        }
        console.log('hinii datah : ',dataRequest)
        //console.log("dataRequest : ", dataRequest)
        const dataa = await store( process.env.API_TRANSACTIONS_UPDATE ,dataRequest)
        setIsMutating(false)
        resetData()
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataa));
        router.push(`${pathname}?${params}`);
    }

  

    return (
        <div>
            <button className="hover:text-primary" onClick={handleChange}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
            </button>
            <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />

            <div className="modal z-99999">
                <div className="modal-box w-8/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
                    {!isMutating && (
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></button>
                    )}
                    <div className="no-scrollbar overflow-hidden">
                        <div className="border-b border-stroke py-2 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {dataUpd.messagesIntl.input.button.create}
                                {dataUpd.messagesIntl.trades.transactions.title}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="group">
                            {/* tab 1 start */}
                            <div className={`overflow-y-scroll h-80 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                                
                                <div className="grid grid-cols-2 gap-2">

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{dataUpd.messagesIntl.trades.transactions.register} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.register}
                                        onChange={(e) => setData({ ...data, register: e.target.value })}
                                        type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan nama barang..."  required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a name
                                    </span>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Total <span className="text-meta-1">*</span></label>
                                  <input
                                     value={toRupiah(total)}
                                    //  onChange={(e) => }
                                     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required readOnly />
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Pajak <span className="text-meta-1">*</span></label>
                                  <input
                                     value={data.tax}
                                     onChange={(e) => setData({ ...data, tax: e.target.value })}
                                     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Ongkir <span className="text-meta-1">*</span></label>
                                  <input
                                     value={data.delevery_fee}
                                     onChange={(e) => setData({ ...data, delevery_fee: e.target.value })}
                                     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">Total setelah pajak + ongkir<span className="text-meta-1">*</span></label>
                                  <input
                                     value={toRupiah(total+Number(data.tax)+Number(data.delevery_fee))}
                                    //  onChange={(e) => }
                                     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required readOnly />
                                </div>

                                

                                </div>

{/* supllayer start view */}
                       
<div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{dataUpd.messagesIntl.trades.suppliers.title} </label>
                                    <input
                                        value={codeSupp}
                                        onChange={(e) => {setCodeSupp(e.target.value),  setData({...data, user_id : ''})}}
                                        type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan nama supplier..."  />
                                        {listSupp.length > 0 &&

                                 <div className="relative">
                                    <div className="absolute w-full border-2 border-t-0 bg-white max-h-60 z-99999 overflow-y-scroll ">
                                        <div className="flex flex-row flex-wrap w-full">
                                          
                                        {listSupp.map((val,key)=>{
                                            return(
                                                <div key={key} className="flex flex-row flex-wrap w-full hover:bg-bodydark cursor-pointer" onClick={()=>{onClickSupplier( val.name,val.id)}}>
                                                <div className="w-1/3">
                                            {val.code}
                                        </div>
                                        <div className="w-1/3">
                                            {val.name}
                                        </div>
                                        <div className="w-1/3">
                                            {val.phone}
                                        </div></div>)
                                        })}
                                            
                                            </div> 
                                    </div>
                                  
                                 </div>  
                                }
                                </div>

                                {/* supplier end view */}      

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{dataUpd.messagesIntl.trades.transactions.code} {dataUpd.messagesIntl.trades.products.title} </label>
                                    <AddProduct propsData={{messagesIntl : dataUpd.messagesIntl, addP : addP}} />
                                    <input
                                        value={codeSearch}
                                        onChange={(e) => setCodeSearch(e.target.value)}

                                        onKeyPress={event=>{
                                            if(event.key === "Enter"){
                                                event.preventDefault();
                                                // alert('tess')
                                                // console.log('innni data ', listSupp[listFocuse])
                                                let d = listSearch[listFocuse]
                                                {onClickProduct( d)}
                                                
                                                return false;

                                              }
                                        }} 
                                        onKeyUp={event=>{
                                           
                                                if(event.key === "ArrowDown"){
                                                    if(listSearch.length > (listFocuse+1)){
                                                    setListFocuse(listFocuse+1)
                                                    }
                                                    else{
                                                        setListFocuse(0)
                                                    }

                                                }

                                                if(event.key === "ArrowUp"){
                                                    if(1 <= (listFocuse)){
                                                    setListFocuse(listFocuse-1)
                                                    }
                                                    else{
                                                        setListFocuse(listSearch.length-1)
                                                    }

                                                }

                                              
                                          }}

                                        type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan harga barang..."  />
                                        {listSearch.length > 0 &&

                                 <div className="relative">
                                    <div className="absolute w-full border-2 border-t-0 bg-white max-h-60 z-99999 overflow-y-scroll ">
                                        <div className="flex flex-row flex-wrap w-full">
                                          
                                        {listSearch.map((val, key)=>{
                                            return(
                                                <div key={key} className={`flex flex-row flex-wrap py-2 text-black-2 w-full hover:bg-gray-300 hover: border-l-2 hover:border-sky-600 cursor-pointer ${key == listFocuse ? 'bg-gray-300 border-l-2 border-sky-600' : ''}`} onClick={()=>{addP(val.id, val.code, val.name, val.price, val.product_qty_prices, val.units.name)}}>
                                                <div className="w-1/3">
                                                <div className="ml-4">   
                                            {val.code}
                                        </div>
                                        </div>
                                        <div className="w-1/3">
                                            {val.name}
                                        </div>
                                        <div className="w-1/3">
                                            {val.price}
                                        </div></div>)
                                        })}
                                            
                                            </div> 
                                    </div>
                                  
                                 </div>  
                                }
                                </div>




                            <label className="pt-5 mb-3 block text-black dark:text-white">{dataUpd.messagesIntl.trades.products.title} <span className="text-meta-1">*</span></label>
                            <div className="form-control flex-row">



 <input readOnly
 value={"Code"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />
 <input readOnly
 value={"Price"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />

<input readOnly
 value={"Qty"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />

<input readOnly
 value={"Unit"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />


<input readOnly
 value={"Price"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />
<input readOnly
 value={"Action"}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />
</div>


{listP.map((val,key)=>{
    return(
 <div key={key} className="form-control flex-row">

 <input
     value={val.code}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required readOnly />
      <input
     value={val.name}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required readOnly />

<input
     value={val.qty}
     onChange={(e) => updP(val.code,e.target.value,"qty", val.product_qty_prices, val.base_price )}
     type="number" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />

<input
     value={val.unit}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required readOnly />


<input
     value={val.price}
     onChange={(e) => updP(val.code,e.target.value,"price", val.product_qty_prices, val.base_price )}
     type="text" className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan product.."  required />


     <div className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-center font-medium outline-none bg-red-500 text-white" onClick={()=>{deleteProduct(val.id)}}>
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
     </div>


</div>)
})
}

                            </div>

                            <div className="modal-action">
                                {!isMutating && (
                                    <button type="button" onClick={handleChange} className="btn">
                                        {dataUpd.messagesIntl.input.button.close}
                                    </button>
                                )}
                                {!isMutating ? (
                                    <button type="submit" className="btn  btn-primary group-invalid:pointer-events-none group-invalid:opacity-30">
                                        {dataUpd.messagesIntl.input.button.save}
                                    </button>
                                ) :
                                    (
                                        <button type="button" className="btn loading">
                                            {dataUpd.messagesIntl.input.button.save} ...
                                        </button>
                                    )

                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );


}
