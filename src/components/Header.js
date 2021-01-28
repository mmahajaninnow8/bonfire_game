import React from 'react';
import logo from '../assets/images/logo.png'

function Header (props){
  const {score,highScore} = props
    return (
      <div className="logo-bx">
        <img src={logo}/>
        <div className="score">
       <h3>
        HI <span>{score}</span> <span>{highScore}</span>
      </h3>
    </div>
      </div>
    )
 
}
export default Header;