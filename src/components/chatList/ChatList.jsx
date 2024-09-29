import React from 'react'
import { Link } from 'react-router-dom'
import './chatList.css'

export default function ChatList() {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore SUSU AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        <Link to="/dashboard/chats/1">Chat test1</Link>
        <Link to="/dashboard/chats/2">Chat test2</Link>
        <Link to="/dashboard/chats/3">Chat test3</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to SUSU AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  )
}
