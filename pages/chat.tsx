import React from 'react'
import Layout from 'containers/Layout'
import Chat from 'components/Chat/Chat'

const ChatPage = () => {
  return (
    <Layout>
      <div className="flex flex-col h-full w-full">
        <Chat />
      </div>
    </Layout>
  )
}

export default ChatPage
