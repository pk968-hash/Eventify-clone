import React from 'react'
import EmployerHero from './Components/EmployerHero';
import EmployeeCommunity from './Components/EmployeeCommunity';
import MethodsSolve from './Components/MethodsSolve';
import Problems from './Components/Problems';
import Productive from './Components/Productive';
import PostJob from './Components/PostJob';
import StartShift from './Components/StartShift';

const ForEmployers = () => {
    return (
        <div className="px-64">
            <EmployerHero />
            <EmployeeCommunity />
            <MethodsSolve />
            <Problems />
            <Productive />
            <PostJob />
            <StartShift />
        </div>
    );
}

export default ForEmployers