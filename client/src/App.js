import React, { useEffect } from "react";
import {
  BrowserRouter as Router, Route, useHistory
} from "react-router-dom";
import i18n from "./i18n";
import { useTranslation } from 'react-i18next';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Customer from "./components/Customer";
import Developer from "./components/Developer";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import MainCarousel from './components/Carousel';
import MyOrder from './components/MyOrder';

const App = (props) => {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('isLoggedIn') || false);
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || "");
  const [devName, setDevName] = React.useState(localStorage.getItem('devName') || "");
  const [language, setLanguage] = React.useState(localStorage.getItem('language') || "en");
  //localstorage = 어디서든 엑세스 할 수 있는 베리어블 중 하나 

  const moveTo = (page) => {
    window.location = page;
    //history.push(page);
  }

  const changeLng = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('language', lng);
  }

  React.useEffect(()=>{
    i18n.changeLanguage(language);
  },[language]);
  //대괄호에 들어간 스테이트가 바뀔때만 위의 41번째 줄이 불려진다. 

  const onUserLogin = (profileData) => {
    console.log("onUserLogin");
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
    setUserName(profileData.name);
    localStorage.setItem('userName', profileData.name);
  }

  const onDevLogin = (profileData) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
    setDevName(profileData.name);
    localStorage.setItem('devName', true);
  }

  const onLogout = () =>{
    console.log("onLogout");
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
    setUserName("");
    localStorage.setItem('userName', "");
    setDevName("");
    localStorage.setItem('devName', "");
  }

  return (
    <div>
    <Router>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">{t("title")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={()=>moveTo("/customer")}>{t("product")}</Nav.Link>
            <Nav.Link href="/my_order">{t("my_order")}</Nav.Link>
            <Nav.Link onClick={()=>{window.open('mailto:eunjoo@gmail.com')}}>{t("contact")}</Nav.Link>
            <NavDropdown title={t("translation")} id="basic-nav-dropdown">
              <NavDropdown.Item><Button variant="link" onClick={()=>{changeLng("en")}}>English</Button></NavDropdown.Item>
              <NavDropdown.Item><Button variant="link" onClick={()=>{changeLng("fr")}}>French</Button></NavDropdown.Item>
              <NavDropdown.Item><Button variant="link" onClick={()=>{changeLng("kr")}}>Korean</Button></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{window.open('mailto:ekcho3650@gmail.com')}}>Contact Dev</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar> 

      <div>{userName}</div>
       {!isLoggedIn && 
        <Route path="/" render={
          (props) => (
          <>
            <div className="login">Customer login: </div>
            <SignIn {...props} onLogin={onUserLogin} redirectUrl="/customer"/>
          </>
          ) 
         }/> 
        }

        {!isLoggedIn && 
          <Route path="/" render={
            (props) => (
            <>
              <div className="login"> Patissier login:  </div>
              <SignIn {...props} onLogin={onDevLogin} redirectUrl="/developer"/>
            </>
            ) 
          }/> 
        }

      {isLoggedIn && <Route path="/" render={(props) => <SignOut {...props} logout={onLogout} /> }/> }
      <div class="pages">
        <Route exact path="/" component={MainCarousel}/>
        <Route exact path="/customer" render={()=> <Customer customerName={userName} isLoggedIn={isLoggedIn}/>} id="customerPage"/>
        <Route exact path="/developer" render={()=> <Developer isLoggedIn={isLoggedIn}/>}/>
        <Route exact path="/my_order" render={()=> <MyOrder isLoggedIn={isLoggedIn} customerName={userName}/>} />
      </div>
    </Router>
    </div>
  );
}

export default App;

// props = {
//   name: 'Anna',
//   weather: 'rainy',
//   loginFunction: function() {...}
// }

// {...props}
// name = 'Anna'
// weather = 'rainy'
// loginFunction = function() {...}