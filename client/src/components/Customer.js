import React from "react";
import Axios from "axios";
import ProductInfo from "./ProductInfo";
import {Container, Row, Col} from "react-bootstrap";
import CardDeck from 'react-bootstrap/CardDeck';
import { useTranslation } from 'react-i18next';
import "../i18n";

const Customer = (props) => {
    const [productList, setProductList] = React.useState([]);
    const { t } = useTranslation();
    const getProducts = () => {
        Axios.get("/products").then((res)=>{
            console.log(res.data);
            if(productList.length !== res.data.length){
                setProductList(res.data);
            }
        }); 
    };

    getProducts();

    return (
        <Container>
            <Row> 
                <CardDeck>
                {productList.map((item)=>{
                    return(
                        <Col> 
                        <ProductInfo
                            isLoggedIn = {props.isLoggedIn}
                            _id = {item._id} //productId
                            image = {item.image}
                            name = {t(`${item._id}_name`)}
                            desc = {t(`${item._id}_desc`)}
                            price = {item.price}
                            customerName = {props.customerName}
                        />
                        </Col>
                    );
                })}
                </CardDeck>
            </Row>
        </Container>
    );
}

export default Customer;

