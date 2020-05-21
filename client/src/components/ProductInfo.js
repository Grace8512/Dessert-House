import React from "react";
import {Card, Button} from "react-bootstrap";
import Axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup'
import { useTranslation } from 'react-i18next';

const ProductInfo = (props) => {
    const {t} = useTranslation();
    const [quantity, setQuantity] = React.useState(0);//수량 초기값
    const onClickOrder = () => {
        Axios.post("/orders/" + props._id, {customerName: props.customerName, quantity: quantity}).then((res)=>{
            //props._id <- product.js에서 오토로 만들어준 아이디
            console.log('order res' + res);
        }); 
    };

    const onChangeTxt = (value) => {
        if(value >=0 && value <=10){
            setQuantity(value);
        }
    } 
    return (
        <Card style={{width:"23vw", height:"30rem",margin:"10px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
        <Card.Img variant="top" src={props.image} style={{paddingTop:"1rem",width: '8rem' }}/>
        
        <Card.Body style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexDirection:"column"}}>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                <ListGroup.Item>{t("price") + ": " + props.price}</ListGroup.Item>
                {/* {"Price: " + props.price} */}

                <ListGroup.Item>{t("desc") + ": " + props.desc}</ListGroup.Item>
                {/* {"Desc: " + props.desc} */}
            </Card.Text>
            <div style={{display:"flex", flexDirection: "row"}}>

            
            <input type="number" style={{width:"60px"}} value={quantity} onChange={((event)=>{onChangeTxt(event.target.value)})}></input>
            {/* 인풋박스안에 입력 안되게 하려면 온체인지 삭제 */}
            {/* <Button onClick={()=>{onClickQuan(true)}}>▲</Button>
            <Button onClick={()=>{onClickQuan(false)}}>▼</Button> */}
            <Button variant="primary" onClick={onClickOrder} style={{alignSelf:"center"}} disabled={!props.isLoggedIn}>{t("order_button")}</Button>
            </div>
        </Card.Body>
    </Card>
    );
}

export default ProductInfo;