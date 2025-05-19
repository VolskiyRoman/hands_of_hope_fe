import React, { useState } from 'react'
import Layout from 'containers/Layout'
import { useGetCurrentUserQuery, useGetMyHelpActivityQuery } from 'api/extendedApi'
import MiniHelpCard from 'components/Cards/MiniHelpCard'
import ChangeUserNameModal from 'components/Modals/ChangeUserNameModal'

const UserProfilePage = () => {
  const { data: user } = useGetCurrentUserQuery({})
  const { data, isLoading } = useGetMyHelpActivityQuery()

  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <Layout>
      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-6 border dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Профіль користувача</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
            <p>👤 {user?.first_name} {user?.last_name}</p>
            <p>📧 {user?.email}</p>
          </div>

          <div className="mt-4 sm:mt-0 flex gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
            >
              Змінити імʼя
            </button>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Моя активність</h2>

        {isLoading && <p className="text-gray-500 dark:text-gray-400">Завантаження...</p>}

        {data?.results?.map((item) => (
          <MiniHelpCard
            key={item.id}
            id={item.id}
            type={item.type}
            location={item.location}
            created={item.created}
            viewLink={`/help/${item.id}`}
          />
        ))}

        {data?.results?.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Активність відсутня.</p>
        )}
      </div>

      {/* Modal to update name */}
      <ChangeUserNameModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </Layout>
  )
}

export default UserProfilePage
