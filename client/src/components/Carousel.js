import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import {useState} from 'react'


function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
    <div style={{
        height: "auto",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        marginTop:"25px"}}>
    {/* activeIndex={1} */}
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item >
        <img style={{objectFit: "contain", width:"70vw",height:"80vh", padding:"10%"}}src="assets/images/main1.png"  />
        </Carousel.Item>
        <Carousel.Item >
            <img style={{objectFit: "contain", height:"80vh"}} src="assets/images/main2.png" />
        </Carousel.Item>
        {/* <Carousel.Item >
            <img style={{objectFit: "contain", height: "80vh"}} src="assets/images/main2-2.png"/>
        </Carousel.Item> */}
        <Carousel.Item >
            <img style={{objectFit: "contain", height: "80vh"}} src="assets/images/main3.jpg"/>
        </Carousel.Item>
      </Carousel>
      </div>
    );
  };

  export default ControlledCarousel;