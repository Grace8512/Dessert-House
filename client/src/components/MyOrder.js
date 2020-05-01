import React, { useEffect } from "react";
import Axios from "axios";
import OrderInfo from "./OrderInfo";
const MyOrder = (props) => {
    
    const [orders, setOrders] = React.useState([]);
    const getMyOrders = () => {
       Axios.get("/orders")
       .then((res)=>{
           console.log(res.data);
           setOrders(res.data.filter((item)=>(item.customerName === props.customerName)));
       });
   }

   const getProducts = async() => {
    //async를 쓰면 순차적처리가 아니라 동시처리로 바뀌고 await을 쓰면 동시처리 하지말고 await사용한 줄은 기다리고 그 다음줄부터 사용
    return await Axios.get("/products").then((res)=>{
            console.log('res.body', res.data);
            const products = {};
            res.data.forEach(item=>{
                products[item._id] = item.name;
            });
            return products;
        });     
    };

    const getOrders = async() => {
        const products = await getProducts();

        Axios.get("/orders").then((res)=>{
            console.log('res.body orders', res.data);
            const customers = {};
            
            res.data.forEach(item=>{
                item.productName = products[item.productId];       
            })
            console.log('original orders', res.data)
            console.log('customer name', props.customerName);
            console.log('this customers orders are', res.data.filter((item)=>(item.customerName === props.customerName)))
            // setOrders(res.data.filter((item)=>(item.customerName === props.customerName)));
            setOrders(res.data);

        }); 
    }; 

    const onClickDelete = (orderId) => {
        Axios.delete("/orders/"+orderId).then((res)=>{
            getOrders();
        }) 
    }

    useEffect(()=>{
        getOrders();
    }, []);
    //UI가 보여지고 나서 바로 업데이트 
    return(
       <OrderInfo customerName={props.customerName} orders={orders} isMyOrder={true} onClickDelete={onClickDelete}/>
    )
}

export default MyOrder;