import './widgets.css';
import { useState } from 'react';

export const Widgets = () => {

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const time = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`

    const [getTime, setTime] = useState(0);
    const sec = current.getSeconds;


    return(
        <>
            <div className="dashboard-container">
                <div className='left'>
                    <div className='left-top'></div>
                    <div className='left-mid1'><h1 className='glow'>{date}</h1><h2 className='glow'>{time}</h2></div>
                    <div className='left-mid2'></div>
                    <div className='left-bottom'></div>
                </div>
                <div className='right'></div>
            </div>
        </>
    )
}