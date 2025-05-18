import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from 'containers/Layout'
import { useGetHelpRequestByIdQuery } from 'api/extendedApi'
import CreateHelpReplyModal from 'components/Modals/CreateHelpReplyModal'

export default function HelpRequestDetailPage() {
  const { query } = useRouter()
  const id = Number(query.id)

  const [isReplyModalOpen, setReplyModalOpen] = useState(false)

  const { data, isLoading, error, refetch } = useGetHelpRequestByIdQuery(id, {
    skip: !id,
  })

  if (isLoading) return <Layout><p>Завантаження...</p></Layout>
  if (error || !data) return <Layout><p>Помилка при завантаженні.</p></Layout>

  const {
    type,
    description,
    location,
    contact_phone,
    user_email,
    created,
    replies,
  } = data

  return (
    <Layout>
      {/* Request Info */}
      <section className="bg-white dark:bg-gray-800 rounded shadow p-6 mb-6 border dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Деталі запиту
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Тип допомоги</h4>
            <p className="text-gray-800 dark:text-gray-200 capitalize">{type}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Дата створення</h4>
            <p className="text-gray-800 dark:text-gray-200">{new Date(created).toLocaleString()}</p>
          </div>

          <div className="sm:col-span-2">
            <h4 className="text-sm font-medium text-gray-500">Опис</h4>
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Місцезнаходження</h4>
            <p className="text-gray-800 dark:text-gray-200">{location}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Контактний телефон</h4>
            <p className="text-gray-800 dark:text-gray-200">{contact_phone}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Email користувача</h4>
            <p className="text-gray-800 dark:text-gray-200">{user_email}</p>
          </div>
        </div>
      </section>

      {/* Replies */}
      <section className="bg-white dark:bg-gray-800 rounded shadow p-6 border dark:border-gray-700 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Відповіді
        </h2>

        {replies.length === 0 ? (
          <p className="text-gray-500">Наразі відповідей немає.</p>
        ) : (
          <ul className="space-y-4">
            {replies.map(reply => (
              <li
                key={reply.id}
                className="border border-gray-300 dark:border-gray-600 rounded p-4 bg-gray-50 dark:bg-gray-900"
              >
                <p className="text-sm text-gray-800 dark:text-gray-200">{reply.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  👤 {reply.responder_email} • 🕒 {new Date(reply.created).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Reply Button */}
      <div className="text-right">
        <button
          onClick={() => setReplyModalOpen(true)}
          className="px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Відповісти
        </button>
      </div>

      {/* Modal */}
      <CreateHelpReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => {
          setReplyModalOpen(false)
          refetch()
        }}
        requestId={id}
      />
    </Layout>
  )
}
