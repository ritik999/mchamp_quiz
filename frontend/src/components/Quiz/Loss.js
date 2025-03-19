import React from 'react'
import cong from '../../assets/images/congratulations.png'
import howplay from '../../assets/images/info.png'
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Foot from '../Footer/Foot';
const Loss = ({score}) => {
    const location = useLocation();
  return (
    <>
        <div className="section">
  <div className="s_left">
    {/* <h2 className="center title">You Lose!</h2> */}
    <h2 class="center title">&nbsp;</h2>
    <div className="center bdy_area">
  <br />
  <img
    src="https://storage.googleapis.com/mchampxyz/images/y_looser.png"
    alt="congratulations"
    className="icon"
  />
  <h2 className="title_yellow">Nice Try!</h2>
  <p className="desc_sm">Right : {score} Wrong :{10-score}</p>
  <p className="desc_sm">You've got {score} questions right.</p>
  {/* next button*/}
  <NavLink to="/" className="brand-logo">
      <button className="btn_blue_sm margin_20">Play Again</button>
</NavLink>
</div>
    {/* <div className="right bdy_area fixed">
      <a href="#">
        <img src={howplay} alt="info" />
      </a>
    </div> */}
     <div className="desc_foot footernav"> <p>Copyright @ mChamp Entertainment Pvt Ltd </p>
     <p>2024 All rights reserved.</p> </div>
  </div>
  <div className="s_right" />
</div>
    </>
  )
}

export default Loss
