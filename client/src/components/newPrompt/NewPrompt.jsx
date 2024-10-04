import React from 'react'
import './newPrompt.css'
import { useEffect, useRef, useState } from 'react'
import { IKImage } from 'imagekitio-react'
import Upload from '../upload/Upload'
import model from '../../lib/gemini'
import Markdown from 'react-markdown'

export default function NewPrompt() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [img, setImg] = useState({
    isLoading: false,
    error: '',
    dbData: {},
    aiData: {},
  })

  const endRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [question, answer, img.dbData])

  const add = async (text) => {
    setQuestion(text)

    try {
      // const prompt = 'Write a story about a magic backpack.'
      const result = await model.generateContent(text)
      console.log(result.response.text())
      setAnswer(result.response.text())
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const text = e.target.text.value
    if (!text) return

    add(text)
  }

  return (
    <>
      {/* ADD NEW PROMPT */}
      {/* 显示图片 */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {/* 问题 */}
      {question && <div className="message user">{question}</div>}
      {/* 答案 */}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      {/* <button onClick={() => add()}>TEST AI</button> */}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask me anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  )
}
