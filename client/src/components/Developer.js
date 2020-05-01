import React from "react";
import Axios from "axios";
import OrderInfo from "./OrderInfo";

const Developer = (props) => {
    const [orderList, setorderList] = React.useState({});

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
            console.log('res.body', res.data);
            const customers = {};
            res.data.forEach(item=>{
                item.productName = products[item.productId];
                if(customers[item.customerName]!== undefined){
                    customers[item.customerName].push(item);
                }else{
                    customers[item.customerName] = [];
                    customers[item.customerName].push(item);
                    //코스토머 네임안에 아이템이 들어가도록 함. 
                }
            })
            console.log(customers);
            setorderList(customers);

        }); 
    };

    const onClickFinish = (customerName, orderIds) => {
        Axios.put("/checked_orders", {customerName:customerName, orderIds:orderIds})
        .then(
            (res)=>{
                console.log("onClickFinish" + res);
                // setOrderDone(true);
                //이 값이 트루일때 새로 로드가 되면서 카드 백그라운드가 업데이트 됨.       
            }
        );
        getOrders();
    };
    //유즈이펙트를 사용하면 한번만 로드가 되어 중복 로드가 되는걸 막는다. 
    React.useEffect(() => {
        getOrders();
      }, []);
    
    console.log(Object.keys(orderList));
    const renderObj = () => 
         {
            return (
                Object.keys(orderList).map(customerName => {
                    // 각각의 코스토머이름이 오더리스트에 키로 들어가 있음 
                    //딕셔너리안의 키들만 다 모아서 코스토머 네임만 가져옴. 
                    return (
                        
                                    <div>
                                        Customer Name: <b>{customerName}</b>
                                        <OrderInfo
                                            isMyOrder={false}
                                            customerName={customerName}
                                            orders={orderList[customerName]}
                                            onClickFinish={onClickFinish}
                                            isButtonDisabled={!props.isLoggedIn}
                                        />
                                        {/* orderInfo.js에서 사용되는 props이름 그 다음은 밸류 */}
                                    </div>
                    );
                })
            );
        }  
    return (
        <div>
            {renderObj()}
        </div>
    );
}

export default Developer;
