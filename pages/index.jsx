import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { Button } from '../components/form/button'
import { InputText } from '../components/form/input-text'
import { InputTextarea } from '../components/form/input-textarea'
import { composeValidators, email, required } from '../components/form/validate'

const RATE_LIMIT_TIMEOUT = 10_000 //ms

const Index = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false)
  const [hasSentQuestion, setHasSentQuestion] = useState(false)

  const [timeLeft, setTimeLeft] = useState()

  const onSubmit = (data, form) => {
    setIsFormDisabled(true)

    // TODO: Submit Data
    console.log(data)

    setTimeout(() => {
      setIsFormDisabled(false)
      setHasSentQuestion(true)
      form.restart()
    }, [1000])

    const nextSendTimeValue = Date.now() + RATE_LIMIT_TIMEOUT
    awaitNextSend(nextSendTimeValue)
  }

  useEffect(() => {
    if(timeLeft < 0) {
      setHasSentQuestion(false)
    }
  }, [timeLeft, hasSentQuestion])


  useEffect(() => {
    const storedNextSendTime = sessionStorage.getItem('nextSendTime')
    if(storedNextSendTime && storedNextSendTime > Date.now()) {
      setHasSentQuestion(true)
      awaitNextSend(storedNextSendTime)
    }
  }, [])

  const awaitNextSend = (nextSendTimeValue) => {
    sessionStorage.setItem('nextSendTime', nextSendTimeValue)
    const timerInterval = setInterval(() => {
      setTimeLeft(Math.floor((nextSendTimeValue - Date.now()) / 1000))
    }, 500)

    setTimeout(() => {
      clearInterval(timerInterval)
    }, RATE_LIMIT_TIMEOUT)
  }
  
  return (
    <>
      <Head>
        <title>Flooq | QnA</title>
      </Head>
      <main>
        <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 truncate">Ask us anything</h1>
            <p className="text-md font-light text-gray-500">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            {!hasSentQuestion &&
              <Form
                disabled={isFormDisabled}
                onSubmit={onSubmit}
                render={({ handleSubmit, hasValidationErrors }) => (
                  <form onSubmit={handleSubmit}>
                    <InputText
                      label="E-Mail"
                      id="email"
                      placeholder="name@students.zhaw.ch"
                      disabled={isFormDisabled}
                      validate={composeValidators(required, email)}
                    />
                    <InputTextarea
                      label="Question"
                      name="question"
                      id="question"
                      placeholder="Enter your question here"
                      disabled={isFormDisabled}
                      validate={required}
                    />
                    <div className="mt-2 flex justify-end">
                      <Button
                        primary
                        disabled={hasValidationErrors || isFormDisabled}
                      >
                        Send Question
                      </Button>
                    </div>
                  </form>
                )}
              />
            }

            {hasSentQuestion &&
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-blue-500 dark:text-gray-100 truncate">Thank you for submitting your question.</h2>
                <p className="text-md font-light text-gray-500">To send another question wait {timeLeft ? timeLeft : 'a few'} seconds.</p>
              </div>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default Index