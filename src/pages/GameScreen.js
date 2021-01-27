import React , {useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import "./GameScreen";
import MountainLayer from "../assets/images/mountainLayer.png";
import Boy from "../assets/images/boy.png";
import ComingSoon1 from "../assets/images/comingSoon1.png";
import ComingSoon2 from "../assets/images/comingSoon2.png";
import ComingSoon3 from "../assets/images/comingSoon3.png";
import GamePlay from "./gamePlay"
//import logoShape from '../assets/images/logo-shape.png';

function GameScreen () {
    return (
      <>
        <GamePlay/>
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

export default GameScreen;
