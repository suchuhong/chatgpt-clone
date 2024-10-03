import { IKContext, IKImage, IKUpload } from 'imagekitio-react'
import { useRef } from 'react'

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY

const authenticator = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_IMAGE_UPLOAD)
    // const response = await fetch('http://localhost:3200/api/upload')
    console.log('response ++++++++++', response)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      )
    }
    // {"token":"3da368b9-d84b-45b8-a34e-8beb2c771965","expire":1727984301,"signature":"1894706d015fcbbef16178ad9181038c5c6c60de"}
    const data = await response.json()
    console.log('data ++++++++++', data)
    const { signature, expire, token } = data
    return { signature, expire, token }
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`)
  }
}

const Upload = () => {
  const ikUploadRef = useRef(null)
  const onError = (err) => {
    console.log('Error', err)
  }

  const onSuccess = (res) => {
    console.log('Success', res)
    // setImg((prev) => ({ ...prev, isLoading: false, dbData: res }))
  }

  const onUploadProgress = (progress) => {
    console.log('Progress', progress)
  }

  const onUploadStart = (evt) => {
    const file = evt.target.files[0]

    // const reader = new FileReader()
    // reader.onloadend = () => {
    //   setImg((prev) => ({
    //     ...prev,
    //     isLoading: true,
    //     aiData: {
    //       inlineData: {
    //         data: reader.result.split(',')[1],
    //         mimeType: file.type,
    //       },
    //     },
    //   }))
    // }
    // reader.readAsDataURL(file)
  }

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        // 隐藏原始样式
        style={{ display: 'none' }}
        ref={ikUploadRef}
      />
      {
        <label onClick={() => ikUploadRef.current.click()}>
          <img src="/attachment.png" alt="" />
        </label>
      }
    </IKContext>
  )
}

export default Upload
