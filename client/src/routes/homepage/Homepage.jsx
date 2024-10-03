import React from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'
import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'

export default function Homepage() {
  const [typingStatus, setTypingStatus] = useState('human1')

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>SUSU AI</h1>
        <h2>提升你的创造力和生产力</h2>
        <h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat sint
          dolorem doloribus, architecto dolor.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === 'human1'
                  ? '/human1.jpeg'
                  : typingStatus === 'human2'
                  ? '/human2.jpeg'
                  : 'bot.png'
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Human:我们生产猫咪食品。',
                2000,
                () => {
                  setTypingStatus('bot')
                },
                'Bot:我们生成猫咪食品',
                2000,
                () => {
                  setTypingStatus('human2')
                },
                'Human2:我们生产狗狗食品。',
                2000,
                () => {
                  setTypingStatus('bot')
                },
                'Bot:我们生产狗狗食品。',
                2000,
                () => {
                  setTypingStatus('human1')
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}
