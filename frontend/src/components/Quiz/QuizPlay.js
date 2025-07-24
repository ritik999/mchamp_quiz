import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from '../../context/AuthContext';
import howplay from '../../assets/images/info.png';
import { AnimatePresence, motion } from 'motion/react';
import { uri } from '../../constants/api';

const QuizPlay = () => {
  const nav = useNavigate();
  const { reset } = useAuthContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const controlerRef = useRef();

  // Redirect if reset flag is true
  useEffect(() => {
    if (reset) nav('/');
  }, [reset, nav]);


  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${uri}/que/allque`, {
          headers: {
            "content-type": "application/json",
          },
          credentials: 'include'
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setQuestions(data.data);
      } catch (err) {
        setError('Failed to fetch questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);


  // Handle option click
  const handleOptionClick = async (id, index) => {
    if (isSubmitting) return; // Prevent multiple clicks

    setIsSubmitting(true); // Disable buttons during API call
    const selectedOption = String.fromCharCode(65 + index); // Convert index to 'A', 'B', 'C', 'D'

    try {
      if (controlerRef.current) controlerRef.current.abort();

      controlerRef.current = new AbortController();
      const signal = controlerRef.current.signal;

      const res = await fetch(`${uri}/que/input/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ selectedOption }),
        signal,
      });

      if (!res.ok) throw new Error('Failed to submit your answer.');

      // Navigate to next question or results page
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        nav('/result');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request aborted by user or component unmount.');
      } else {
        setError(err.message || 'An error occurred.');
      }
    } finally {
      setIsSubmitting(false); // Re-enable buttons after API call
    }
  };

  // Display loading or error states
  if (loading) {
    return (
      <div className='spinner_container'>
        <div className="spinner"></div>
      </div>
    )
  };
  if (error) return <div>{error}</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="section">
      <div className="s_left">
        <nav>
          <div className="nav-wrapper">
            <NavLink to="/" className="brand-logo">
              QuizMaster
            </NavLink>
          </div>
        </nav>
        <div className="center bdy_area">
          {currentQuestion?.image && <img style={{marginTop:'30px'}} src={currentQuestion?.image}/>}
          <h2 className="title">{currentQuestion?.question}</h2>
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(currentQuestion.id, index)}
              className="button_blue"
              disabled={isSubmitting}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="s_right" />
    </div>
  );
};

export default QuizPlay;
