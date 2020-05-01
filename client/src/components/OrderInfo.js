import React from "react";
import {Card, Button} from "react-bootstrap";
import i18n from "../i18n";
import { useTranslation } from 'react-i18next';
import Axios from "axios";

const OrderInfo = (props) => {
    const {t} = useTranslation();
    //setOrderDone을 통해 업데이트를 할 수 있다. 초기값이 props.isChecked로 설정. 
    const [checked, setChecked] = React.useState([]);
    const { orders, customerName, onClickFinish, isMyOrder, onClickDelete } = props;
    const onClickComplete = () => {
       onClickFinish(customerName, checked); 
    }
    const onChangeCheck = (event, id) => {
        console.log(event.target.checked);
        if(event.target.checked === true){
            setChecked([...checked, id]);
        }else{
            const temp = checked.filter((item)=>(item !== id));
            setChecked(temp);
        }//아이디가 체크되지 않았을때 체크되지 않았던 아이디는 체크 베리어블에서 뺀다. 
    }

    return (
        
        <Card
            
            bg="light"
            style={{ width: '18rem'}}
        >
            <Card.Body>
                <Card.Title>{customerName}</Card.Title>
                <Card.Text>
                {orders.map(item => <div style={{color: item.isChecked && !isMyOrder ? 'red' : 'black' }}>
                    {t(item.productId+"_name") + ", " + item.quantity + " "}
                    {isMyOrder?(<Button variant="info" disabled={item.isChecked} onClick={()=>onClickDelete(item._id)}>Delete</Button>):null}
                    {!item.isChecked && !isMyOrder ? <input type="checkbox" onChange={(event)=>onChangeCheck(event,item._id)}/>:null}
                    </div> )}
                </Card.Text>
                {!isMyOrder?(<Button variant="primary" onClick={onClickComplete} disabled={props.isButtonDisabled}>Finish Order</Button>):null}
                {/* 온클릭피니쉬가 위의 콘스트안의 코스토머네임을 받아서 디벨로퍼에  */}
            </Card.Body>
        </Card>
    )
}

export default OrderInfo;