import React from "react";
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

class GameScreen extends React.Component {
  render() {
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
                <img className=""
                  style={{ left: "24%", position: "absolute", bottom: "10%" }}
                  src={cartoon}
                />
              </div>
              <div>
                <img className="aeroplane"
                  style={{
                    right: "40%",
                    top: "40%",
                    position: "absolute",
                    bottom: "10%",
                  }}
                  src={cartoon2}
                />
              </div>
              <div>
                <img className=""
                  style={{ right: "10%", position: "absolute", bottom: "32%" }}
                  src={bird}
                />
              </div>
              <img
                style={{
                  right: "24%",
                  position: "absolute",
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
              </Row>
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
}
export default GameScreen;
