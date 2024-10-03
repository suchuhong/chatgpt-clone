import React from 'react'
import './newPrompt.css'
import { useRef, useEffect } from 'react'
import Upload from '../upload/Upload'

export default function NewPrompt() {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      {/* ADD NEW PROMPT */}
      TEST 下午茶
      <div />
      测试
      <div className="endChat" ref={endRef}></div>
      <form className="newForm">
        <Upload />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask me anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  )
}
