import React, { useState, useRef, useEffect, useContext } from 'react'
import { Input, Button, Card } from '@roketid/windmill-react-ui'
import { useSendChatMessageMutation } from 'api/extendedApi'
import { WindmillContext } from '@roketid/windmill-react-ui'

type Message = {
  sender: 'user' | 'ai'
  content: string
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sendChatMessage, { isLoading }] = useSendChatMessageMutation()
  const { mode } = useContext(WindmillContext)
  const isDark = mode === 'dark'
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const messageToSend = input
    const userMessage: Message = { sender: 'user', content: messageToSend }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const response = await sendChatMessage({ content: messageToSend }).unwrap()
      const aiMessage: Message = { sender: 'ai', content: response.reply }
      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error('❌ Помилка при надсиланні повідомлення:', err)
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={`flex flex-col h-full w-full ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Title */}
      <div className="px-6 pt-6">
        <h1 className="text-xl font-semibold text-white">Чат з AI</h1>
      </div>

      {/* Messages area */}
      <div className="flex-1 min-h-[700px] overflow-y-auto px-6 pt-4 space-y-3">
      {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-20">
            Надішліть своє перше повідомлення, щоб розпочати діалог.
          </p>
        )}
        {messages.map((msg, index) => (
          <Card
            key={index}
            className={`p-4 w-fit max-w-[75%] text-sm whitespace-pre-wrap ${
              msg.sender === 'user'
                ? isDark
                  ? 'ml-auto bg-purple-700 text-white'
                  : 'ml-auto bg-purple-100 text-right'
                : isDark
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100'
            }`}
          >
            {msg.content}
          </Card>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введіть ваше повідомлення..."
            className={`flex-1 ${isDark ? 'bg-gray-700 text-white border-gray-600' : ''}`}
          />
          <Button type="submit" disabled={isLoading}>
            Надіслати
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Chat
