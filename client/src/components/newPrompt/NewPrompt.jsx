import React from 'react'
import './newPrompt.css'
import { useEffect, useRef, useState } from 'react'
import { IKImage } from 'imagekitio-react'
import Upload from '../upload/Upload'
import model from '../../lib/gemini'
import Markdown from 'react-markdown'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function NewPrompt({ data }) {
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

  // 二次作用，[]里的数据变化触发
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [data, question, answer, img.dbData])

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json())
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ['chat', data._id] })
        .then(() => {
          formRef.current.reset()
          setQuestion('')
          setAnswer('')
          setImg({
            isLoading: false,
            error: '',
            dbData: {},
            aiData: {},
          })
        })
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const chat = model.startChat({
    // history: [
    //   {
    //     role: 'user',
    //     parts: [{ text: 'hello' }],
    //   },
    //   {
    //     role: 'model',
    //     parts: [{ text: 'hello' }],
    //   },
    // ],
    history: data?.history.map(({ role, parts }) => {
      console.log('role +++++++++++++', role, typeof role)
      return {
        role: role,
        parts: [{ text: parts[0].text }],
      }
    }),
    generationConfig: {
      // maxOutputTokens: 100,
    },
  })

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text)

    try {
      // const prompt = 'Write a story about a magic backpack.'
      //图片或文字
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      )
      let accumulatedText = ''
      for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        console.log(chunkText)
        accumulatedText += chunkText
        setAnswer(accumulatedText)
      }

      mutation.mutate()
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const text = e.target.text.value
    if (!text) return

    add(text, false)
  }

  // IN PRODUCTION WE DON'T NEED IT
  const hasRun = useRef(false)

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true)
      }
    }
    hasRun.current = true
  }, [])

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
