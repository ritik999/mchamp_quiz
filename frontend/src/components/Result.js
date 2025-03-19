import React, { useEffect, useState } from 'react'
import Winner from './Quiz/Winner';
import Loss from './Quiz/Loss';

const Result = () => {
    const [score,setScore]=useState(0);
    useEffect(() => {
        fetch('http://192.168.4.53:2000/api/que/result',{
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