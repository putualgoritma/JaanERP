import { formatNumber, toRupiah, getRegister } from '@/app/[locale]/lib/utils';
import { usePathname } from "next/navigation";
import { useState, Component } from "react"

//set path
export const SetPath = () => {
    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');
    return pathname;
}

function updPrdInv(setData: any, data: any) {
    let arr = data.products;
    let product_inventories: any = []
    let product_inventories_unsort: any = []
    arr.map((obj: any, index: number) => {
        obj.product_materials.map((obj2: any) => {
            let addQty = 0;
            if (product_inventories_unsort[obj2.id]) {
                //alert('lol...')
                addQty = parseInt(product_inventories_unsort[obj2.id].qty);
            }
            let subTotal = (parseInt(obj2.qty) + addQty) * obj2.price;
            let dat = { name: obj2.name, qty: (parseInt(obj2.qty) + addQty), qty_init: obj2.qty_init, unit: obj2.unit, id: obj2.id, price: obj2.price, cogs: obj2.cogs, priceLabel: obj2.price, subTotal: subTotal }
            product_inventories_unsort[obj2.id] = dat
        });
    });
    //reformat
    product_inventories_unsort.map((obj: any, index: any) => {
        product_inventories.push(obj);
    });

    setData({ ...data, product_inventories_unsort: product_inventories_unsort, product_inventories: product_inventories })
}

//products production
export const addPrd = (setData: any, data: any) => {
    let dat = { name: '', qty: '1', unit: '', id: '', product_materials: [] }
    setData({ ...data, products: [...data.products, dat] })
}

export const updPrd = (setData: any, data: any, key: any, val: any, col: any, prd: any) => {
    //console.log('data.products...', data.products)
    let arr = data.products;
    let product_materials: any = []
    arr[key].product_materials.map((obj: any) => {
        let subTotal = (obj.qty_init * val) * obj.price;
        let dat = { name: obj.name, qty: (obj.qty_init * val), qty_init: obj.qty_init, unit: obj.unit, id: obj.id, price: obj.price, cogs: obj.cogs, priceLabel: obj.price, subTotal: subTotal }
        product_materials.push(dat);
    });
    arr[key][col] = val
    arr[key]['product_materials'] = product_materials
    setData({ ...data, products: [...arr] })
    //init product_inventories
    updPrdInv(setData, data)
}

export const delPrd = (setData: any, data: any, key: any) => {
    let arr = data.products;
    arr.splice(key, 1);
    setData({ ...data, products: [...arr] })
    //init product_inventories
    updPrdInv(setData, data)
}

//init data BOM
export const initPrd = (setData: any, data: any, key: any, val: any) => {
    //init products bom
    let product_materials: any = initMaterials(val.product_materials)
    //init products
    let arr = data.products;
    let subTotal = 1 * val.price;
    let dat = { name: val.code + ' - ' + val.name, qty: 1, unit: val.units.name, id: val.id, product_materials: product_materials, price: val.price, cogs: val.cogs, priceLabel: val.price, subTotal: subTotal }
    arr[key] = dat
    setData({ ...data, products: [...arr] })
    //init product_inventories
    updPrdInv(setData, data)
}

//product_materials BOM
export const addBom = (setData: any, data: any) => {
    // let arr = data.products;
    // let dat = { name: '', qty: '1', qty_init: '1', unit: '', id: '', price: 0, priceLabel: "", subTotal: 0 }
    // arr[0]['product_materials'][0] = dat
    // setData({ ...data, products: [...arr] })
}

export const initBom = (setData: any, data: any, key: any, val: any) => {
    // let arr = data.products;
    // let dat = { name: val.code + ' - ' + val.name, qty: '1', qty_init: '1', unit: val.units.name, id: val.id }
    // arr[0]['product_materials'][key] = dat
    // setData({ ...data, products: [...arr] })
}

export const updBom = (setData: any, data: any, keyp: any, key: any, val: any, col: any) => {
    let arr = data.products;
    arr[keyp]['product_materials'][key][col] = val
    setData({ ...data, products: [...arr] })
    updPrdInv(setData, data)
}

export const delBom = (setData: any, data: any, key: any) => {
    let arr = data.products[0]['product_materials'];
    arr.splice(key, 1);
    setData({ ...data, products: [...arr] })
}

//init products product_inventories
export const initInventories = (data: any) => {
    let arr = data;
    let product_inventories: any = []
    let product_inventories_unsort: any = []
    arr.map((obj: any, index: number) => {
        obj.product_materials.map((obj2: any) => {
            let addQty = 0;
            if (product_inventories_unsort[obj2.id]) {
                //alert('lol...')
                addQty = parseInt(product_inventories_unsort[obj2.id].qty);
            }
            let subTotal = (parseInt(obj2.qty) + addQty) * obj2.price;
            let dat = { name: obj2.name, qty: (parseInt(obj2.qty) + addQty), qty_init: obj2.qty_init, unit: obj2.unit, id: obj2.id, price: obj2.price, cogs: obj2.cogs, priceLabel: obj2.price, subTotal: subTotal }
            product_inventories_unsort[obj2.id] = dat
        });
    });
    //reformat
    product_inventories_unsort.map((obj: any, index: any) => {
        product_inventories.push(obj);
    });
    return { product_inventories: product_inventories, product_inventories_unsort: product_inventories_unsort }
}

//init products product_materials
export const initMaterials = (data: any) => {
    //console.log('initMaterials...', data)
    let product_materials: any = []
    data.map((obj: any) => {
        let dat = { name: obj.code + ' - ' + obj.name, qty: obj.pivot.qty, qty_init: obj.pivot.qty_init ? obj.pivot.qty_init:obj.pivot.qty, unit: obj.units.name, id: obj.id, price: obj.price, cogs: obj.cogs, priceLabel: obj.price, subTotal: 0 }
        product_materials.push(dat);
    });
    return product_materials
}

//init data
export const initDataPrd = (type: string, init: any) => {
    let total = init && init.transaction_product ? totalCart(init.transaction_product) : 0
    let products = init && init.transaction_product ? initProducts(init.transaction_product) : [{ name: '' + ' - ' + '', qty: 1, unit: '', id: '', product_materials: [], price: 0, cogs: 0, priceLabel: "", subTotal: 0 }]
    let init_inventories: any = init && init.product_inventories ? initInventories(products) : {}
    let data: any = {
        id: init ? init.id : 0,
        user_id: init ? init.user_id : '',
        register: init ? init.register : getRegister(),
        price: init ? init.price : '',
        tax: 0,
        products: products,
        product_inventories: init_inventories.product_inventories ? init_inventories.product_inventories : [],
        product_inventories_unsort: init_inventories.product_inventories_unsort ? init_inventories.product_inventories_unsort : [],
        total: total,
        type: init ? init.type : type,
        status: init ? init.status : 'success',
        warehouse_id: init ? init.warehouse_id : '',
        supplier: {
            name: init && init.users ? init.users[0].contact.name : '',
        },
        parent_id: init ? init.parent_id : '',
        transaction: {
            code: init && init.parents[0] ? init.parents[0].code : '',
        }
    }
    //console.log('initDataPrd...', data)
    return data
}

//update related transaction
export const updRelTrans = (setData: any, data: any, val: any) => {
    //init products cart
    let product_cart: any = []
    let totalCart = 0
    let totalcogsCart = 0
    let refillcontainers: any = []
    val.transaction_product.map((obj: any) => {
        //console.log('obj..', obj)
        let subTotal = obj.pivot.qty * obj.pivot.price;
        totalCart = totalCart + subTotal
        let subcogsTotal = obj.pivot.qty * obj.pivot.cogs;
        totalcogsCart = totalcogsCart + subcogsTotal
        let dat = { name: obj.code + ' - ' + obj.name, qty: obj.pivot.qty, unit: obj.units.name, id: obj.id, price: obj.pivot.price, cogs: obj.pivot.cogs, priceLabel: formatNumber(obj.pivot.price), subTotal: formatNumber(subTotal), type: obj.type }
        product_cart.push(dat);
        //refillcontainers
        if(obj.pivot.refill=='Y'){
            let dat = { name: obj.code + ' - ' + obj.name, out: obj.pivot.qty, in: 0, reject: 0, description: '', show: true, id: obj.id  }
            refillcontainers.push(dat);
        }else{
            let dat = { name: obj.code + ' - ' + obj.name, out: obj.pivot.qty, in: 0, reject: 0, description: '', show: false, id: obj.id  }
            refillcontainers.push(dat);
        }
    });
    //init data
    setData({
        ...data,
        parent_id: val.id,
        user_id: val.user_id,
        products: product_cart,
        refillcontainers: refillcontainers,
        total: totalCart,
        totalcogs: totalcogsCart,
        warehouse_id: val.warehouse_id,
        transaction: {
            ...data.transaction,
            code: val.code,
        },
        supplier: {
            ...data.supplier,
            name: val.users[0].contact.name,
        }
    });
}

//init data
export const initDataTrs = (type: string, init: any) => {
    let total = init && init.transaction_product ? totalCart(init.transaction_product) : 0
    let totalcogs = init && init.transaction_product ? totalcogsCart(init.transaction_product) : 0
    let products = init && init.transaction_product ? initProducts(init.transaction_product) : []
    let refillcontainers = init && init.transaction_product ? initRefillcontainers(init.transaction_product) : []
    let data: any = {
        id: init ? init.id : 0,
        user_id: init ? init.user_id : '',
        register: init ? init.register : getRegister(),
        price: init ? init.price : '',
        tax: 0,
        products: products,
        refillcontainers: refillcontainers,
        total: total,
        totalcogs: totalcogs,
        type: init ? init.type : type,
        status: init ? init.status : 'success',
        warehouse_id: init ? init.warehouse_id : '',
        supplier: {
            name: init && init.users ? init.users[0].contact.name : '',
        },
        parent_id: init ? init.parent_id : '',
        transaction: {
            code: init && init.parents[0] ? init.parents[0].code : '',
        },
        payment: init ? init.payment : 'cash'
    }
    return data
}

//init products cart
function initProducts(data: any) {
    let product_cart: any = []
    let materials: any = []
    let totalCart = 0;
    data.map((obj: any) => {
        let subTotal = obj.pivot.qty * obj.price;
        totalCart = totalCart + subTotal
        //set materials
        materials = initMaterials(obj.transaction_product_material.materials)
        let dat = { name: obj.code + ' - ' + obj.name, qty: obj.pivot.qty, unit: obj.units.name, id: obj.id, price: obj.price, cogs: obj.cogs, priceLabel: formatNumber(obj.price), subTotal: formatNumber(subTotal), type: obj.type, product_materials: materials }
        product_cart.push(dat);
    });
    return product_cart
}

//init refillcontainers cart
function initRefillcontainers(data: any) {
    let product_cart: any = []
    let materials: any = []
    let totalCart = 0;
    data.map((obj: any) => {
        let subTotal = obj.pivot.qty * obj.price;
        totalCart = totalCart + subTotal
        let dat = { name: obj.code + ' - ' + obj.name, out: obj.pivot.qty, in: 0, reject: 0, description: '', show: false, id: obj.id  }
        product_cart.push(dat);
    });
    return product_cart
}

//products cart
export const addCart = (setData: any, data: any) => {
    let dat = { name: '', qty: '1', unit: '', id: '', price: '', cogs: '', priceLabel: '', subTotal: '', type: '' }
    //container
    let datcontainer = { name: '' , out: 0, in: 0, reject: 0, description: '', show: false, id: ''  }
    setData({ ...data, products: [...data.products, dat], refillcontainers: [...data.refillcontainers, datcontainer] })
}

//get total
export const totalCart = (data: any) => {
    let total = 0
    data.forEach((item: any) => {
        let qty = item.qty ? item.qty : item.pivot.qty
        total = total + (qty * item.price)
    })
    return total;
}
export const totalcogsCart = (data: any) => {
    let total = 0
    data.forEach((item: any) => {
        let qty = item.qty ? item.qty : item.pivot.qty
        total = total + (qty * item.cogs)
    })
    return total;
}

//set total
function setTotalCart(setData: any, data: any) {
    let total = totalCart(data.products)
    let totalcogs = totalcogsCart(data.products)
    setData({ ...data, total: total, totalcogs: totalcogs })
}

export const initCart = (setData: any, data: any, key: any, val: any) => {
    let arr = data.products;
    arr[key]['qty'] = 1
    arr[key]['name'] = val.code + ' - ' + val.name
    arr[key]['unit'] = val.units.name
    arr[key]['id'] = val.id
    arr[key]['price'] = val.price
    arr[key]['cogs'] = val.cogs
    arr[key]['priceLabel'] = formatNumber(val.price)
    arr[key]["subTotal"] = formatNumber(val.price)
    arr[key]['type'] = val.type

    let arrcontainer = data.refillcontainers;
    if(val.refill == 'Y'){
    arrcontainer[key]['id'] = val.id
    arrcontainer[key]['out'] = 1
    arrcontainer[key]['name'] = val.code + ' - ' + val.name
    arrcontainer[key]['in'] = 0
    arrcontainer[key]['reject'] = 0
    arrcontainer[key]['description'] = ''
    arrcontainer[key]['show'] =  true
    }else{
    arrcontainer[key]['id'] = val.id
    arrcontainer[key]['out'] = 0
    arrcontainer[key]['name'] = val.code + ' - ' + val.name
    arrcontainer[key]['in'] = 0
    arrcontainer[key]['reject'] = 0
    arrcontainer[key]['description'] = ''
    arrcontainer[key]['show'] =  false
    }

    setData({ ...data, products: [...arr], refillcontainers: [...arrcontainer] })
    setTotalCart(setData, data)
}

export const updCart = (setData: any, data: any, key: any, val: any, col: any) => {
    let arr = data.products;
    let arrcontainer = data.refillcontainers;
    if (col == "qty") {
        arr[key][col] = val
        arrcontainer[key]["out"] = val
        arr[key]["subTotal"] = formatNumber(arr[key]["price"] * val)
    } else {
        arr[key][col] = val
    }

    setData({ ...data, products: [...arr], refillcontainers: [...arrcontainer] })
    setTotalCart(setData, data)
}

export const updCartcontainer = (setData: any, data: any, key: any, val: any, col: any) => {
    let arrcontainer = data.refillcontainers;
    arrcontainer[key][col] = val

    setData({ ...data, refillcontainers: [...arrcontainer] })
}

export const delCart = (setData: any, data: any, key: any) => {
    var arr = data.products;
    let arrcontainer = data.refillcontainers;
    arr.splice(key, 1);
    arrcontainer.splice(key, 1);
    setData({ ...data, products: [...arr], refillcontainers: [...arrcontainer] })
    setTotalCart(setData, data)
}