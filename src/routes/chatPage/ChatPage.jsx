import React from 'react'
import './chatPage.css'

import NewPrompt from '../../components/newPrompt/NewPrompt'

const ChatPage = () => {
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message user">Hello</div>
          <div className="message">Hello</div>
          <div className="message user">Hello</div>
          <div className="message">Hello</div>
          <div className="message user">Hello</div>
          <div className="message">Hello</div>
          <div className="message user">Hello</div>
          <div className="message">Hello</div>
          <div className="message user">Hello</div>
          <div className="message">Hello</div>
          <div className="message user">Hello</div>
          <div className="message">Hello</div>
          <div className="message user">Hello</div>
          <div className="message">Hello</div>
          <div className="message user">Hello</div>
          <div className="message">Hello</div>
          <div className="message user">Hello</div>
          <NewPrompt />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
