import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import landing from '../../assets/images/landing.svg'
import study from '../../assets/images/icons/study.svg'
import giveClasses from '../../assets/images/icons/give-classes.svg'
import purpleHeart from '../../assets/images/icons/purple-heart.svg'
import './styles.css'
import api from '../../services/api'

function Landing(){
    
    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(()=>{ 
        api.get('connections').then(response => {
            const {total} = response.data;
            setTotalConnections(total);
        })
    }, []);
    return (
    <div id="page-landing">
        <div id="page-landing-content" className="container">
            <div className="logo-container">
                <img src={logo} alt="logo"/>
                <h2>Sua plataforma de estudos online</h2>
            </div>

            <img src={landing} alt="landing" className="hero-image"/>
            
            <div className="buttons-container">
                <Link to="/study" className="study">
                    <img src={study} alt="study-button"/>
                    Estudar
                </Link>
                <Link to="/give-classes" className="give-classes">
                    <img src={giveClasses} alt="give-classes-button"/>
                    Dar Aulas
                </Link>
            </div>
            <span className="total-connections">
                Total de {totalConnections} conexoes 
                <img src={purpleHeart} alt="purple-heart"/>

            </span>
        </div>
    </div>

    )
}

export default Landing;