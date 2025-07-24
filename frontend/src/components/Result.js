import React, { useEffect, useState } from 'react'
import Winner from './Quiz/Winner';
import Loss from './Quiz/Loss';
import { uri } from '../constants/api';

const Result = () => {
    const [score,setScore]=useState(0);
    useEffect(() => {
        fetch(`${uri}/que/result`,{
            credentials:'include'
        }).then((res) => res.json()).then((data) => {
            console.log(data.score)
            setScore(data.score)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <div>
            {
                score>(10/2)?<Winner score={score}/>:<Loss score={score}/>
            }
        </div>
    )
}

export default Result;