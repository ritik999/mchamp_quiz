import React from 'react'
import cong from '../../assets/images/congratulations.png'
import howplay from '../../assets/images/info.png'
import { NavLink, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Winner = ({score}) => {
  const location = useLocation();
  const receivedData = location.state;
  // const socre=receivedData.correct==null?0:receivedData.correct
  return (
   <>
   <div className="section">
  <div className="s_left">
    <h2 className="center title">Congratulations!</h2>
    <div className="center bdy_area">
      <div className="img_bg">
        <div className="pos_down">
          <img
            src={cong}
            alt="congratulations"
            className="icon"
          />
          <h2 className="title_yellow">Awesome!</h2>
          <p class="desc_sm">All your answeres are correct!</p>
          <p class="desc_sm">Score : {score}</p>          {/* next button*/}
          <NavLink to="/" className="brand-logo">
      <button className="btn_blue_sm margin_20">Play Again</button>
</NavLink>
        </div>
      </div>
    </div>
    {/* <div className="right bdy_area fixed">
      <a href="#">
        <img src={howplay} alt="info" />
      </a>
    </div> */}
     <div class="desc_foot footernav"> <p>Copyright @ mChamp Entertainment Pvt Ltd </p>
     <p>2024 All rights reserved.</p> </div>
  </div>
  <div className="s_right" />
</div>
   </>
  )
}

export default Winner
