import React from 'react'
import howplay from '../../assets/images/info.png'
import { NavLink } from "react-router-dom";
const Howplay = () => {
  return (
   <>
<div className="section">
  <div className="s_left">
    <h2 className="center title">Rules</h2>
    <div className="center bdy_area">
      <h2 className="title_yellow">How to Play</h2>
      <ul className="left text_left">
        <li className="desc_sm">* Each round will consist of 10 questions.</li>
        <li className="desc_sm">* Each question will have 2,3,4 options.</li>
        <li className="desc_sm">
          * Users must choose the correct answer from the given options.
        </li>
        <li className="desc_sm">
          * To qualify, users need to answer 6 questions correctly.
        </li>
      </ul>
      {/* next button*/}
      <NavLink to="/">
      <button className="btn_blue_sm margin_20">Play Now</button>
</NavLink>
     
    </div>
    {/* <div className="right bdy_area fixed">
      <a href="#">
        <img src={howplay} alt="info" />
      </a>
    </div> */}
  </div>
  <div className="s_right" />
</div>
   </>
  )
}

export default Howplay
