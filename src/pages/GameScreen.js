import React , {useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import "./GameScreen";
import MountainLayer from "../assets/images/mountainLayer.png";
import Boy from "../assets/images/boy.png";
import Header from "../components/Header";
import cartoon from "../assets/images/cartoon1.png";
import cartoon2 from "../assets/images/cartoon2.png";
import bird from "../assets/images/bird.png";
import mountain from "../assets/images/mountain.png";
import ComingSoon1 from "../assets/images/comingSoon1.png";
import ComingSoon2 from "../assets/images/comingSoon2.png";
import ComingSoon3 from "../assets/images/comingSoon3.png";
//import logoShape from '../assets/images/logo-shape.png';

function GameScreen () {
  useEffect(()=>{
    const image = document.querySelector(".superman")
    console.log("imageimageimage=",image)
    window.addEventListener('keydown', (e) => {
      e.preventDefault()
     var key_code=e.keyCode
     console.log("key_codekey_code=",key_code)
            switch(key_code){
              case 37: //left arrow key
                moveLeft(image);
                break;
              case 38: //Up arrow keynpm start
                moveUp(image);
                break;
              case 39: //right arrow key
                moveRight(image);
                break;
              case 40: //down arrow key
                moveDown(image);
                break;						
            }
    
    });
  },[])


  const moveLeft =(objImage)=>{
    const oldValue = objImage.style.left
    objImage.style.left=parseInt(oldValue) -5 +'px';
  }
  
  const moveUp =(objImage)=>{
    const oldValue = objImage.style.bottom
    if(parseInt(oldValue) < 500){
      objImage.style.bottom=parseInt(oldValue)+5 +'px';
    }
  }
  
  const moveRight =(objImage)=>{
    const oldValue = objImage.style.left

    objImage.style.left=parseInt(oldValue)+5 +'px';
  }
  
  const  moveDown =(objImage)=> {
    const oldValue = objImage.style.bottom
    if(parseInt(oldValue) > 25){
      objImage.style.bottom=parseInt(oldValue)-5 +'px';
    }
  }

    return (
      <>
        <div className="GameScreen">
          <div className="slide-view">
            <span />
          </div>
          <div className="GameScreen-bg">
            <Header />
            <div className="score">
              <h3>
                HI <span>001256</span> <span>00047</span>
              </h3>
            </div>
            <div className="games-objecs">
              <div>
                <img className="superman"
                  style={{ left: "200px", position: "absolute", bottom: "300px" }}
                  src={cartoon}
                />
              </div>
              <div>
                <img className="aeroplane obstacle-move"
                  style={{
                    right: "40%",
                    top: "40%",
                    bottom: "10%",
                  }}
                  src={cartoon2}
                />
              </div>
              <div>
                <img className="bird obstacle-move"
                  style={{ right: "10%", bottom: "20%" }}
                  src={bird}
                />
              </div>
              <img className="obstacle-move mountain"
                style={{
                  right: "24%",
               
                  bottom: "0",
                  width: "20%",
                }}
                src={mountain}
              />
            </div>
          </div>
        </div>

        <div className=" character-list ">
          <div className="cartoon-list">
            <Container>
              <Row>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img cartoon-active">
                      <img src={Boy} />
                    </div>
                    <h3 className="cartoon-txt">
                      The Amazing Seb{" "}
                      <a href="https://www.amazon.com/">Kindle eBook</a>{" "}
                    </h3>
                  </div>
                </Col>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img">
                      <img src={ComingSoon1} />
                    </div>
                    <h3 className="cartoon-txt"> Coming Soon !</h3>
                  </div>
                </Col>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img">
                      <img src={ComingSoon2} />
                    </div>
                    <h3 className="cartoon-txt">Coming Soon !</h3>
                  </div>
                </Col>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img">
                      <img src={ComingSoon3} />
                    </div>
                    <h3 className="cartoon-txt">Coming Soon !</h3>
                  </div>
                </Col>
                <Col xs="6" md="3" xl>
                  <div className="cartoon-list-bx">
                    <div className="cartoon-list-img">
                      <img src={ComingSoon1} />
                    </div>
                    <h3 className="cartoon-txt">Coming Soon !</h3>
                  </div>
                </Col>
              </Row>c
            </Container>
          </div>
          <h4 className="contact-txt">
            Who do you think should be the next super her?{" "}
            <a href="">Contact us</a>
          </h4>
        </div>
      </>
    );
  }

export default GameScreen;
