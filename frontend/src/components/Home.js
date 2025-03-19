import React from 'react'
import { NavLink } from "react-router-dom";
import Foot from '../components/Footer/Foot'
import { useAuthContext } from '../context/AuthContext';
const Home = () => {
  const {setReset}=useAuthContext();
  setReset(false);
  return (
    <>
    <div className="center">
        <img src="https://storage.googleapis.com/mchampxyz/images/quiz-home-mi.png" alt="img" />
      </div>
      <div className="bdy_area">
        <h2 className="title">Play &amp; Get Rewarded</h2>
        <p className="desc_sm">
          Be a part of our Daily Quiz and get rewarded for your knowledge
        </p>
        <p className="desc_sm">
          Engage in thrilling quizzes and win exciting prizes. QuizMaster helps
          you have fun while learning.
        </p>
        <NavLink to="/Play">
        <button className="button_light">Join the fun</button>

        </NavLink>


        <Foot></Foot>
      </div>
    </>
  )
}

export default Home
