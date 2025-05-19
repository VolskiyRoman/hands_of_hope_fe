import React from 'react'
import { useRouter } from 'next/router'
import { Button } from '@roketid/windmill-react-ui'
import {helpLabels} from "../../utils/helpLabels";

type HelpCardProps = {
  type: string
  description: string
  location: string
  contactPhone: string
  userEmail: string
  created: string
  icon: JSX.Element
  viewLink?: string
}

const HelpCard: React.FC<HelpCardProps> = ({
                                             type,
                                             description,
                                             location,
                                             contactPhone,
                                             userEmail,
                                             created,
                                             icon,
                                             viewLink,
                                           }) => {
  const router = useRouter()
  const translatedType = helpLabels[type] || 'Невідомо'

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded shadow space-y-2 bg-white dark:bg-gray-700">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{translatedType}</h2>
      </div>

      <p className="text-sm text-gray-700 dark:text-white">{description}</p>
      <div className="text-sm text-gray-600 dark:text-white">📍 {location}</div>
      <div className="text-sm text-gray-600 dark:text-white">📞 {contactPhone}</div>
      <div className="text-sm text-gray-600 dark:text-white">📧 {userEmail}</div>
      <div className="text-sm text-gray-600 dark:text-white">🕒 {new Date(created).toLocaleString()}</div>

      {viewLink && (
        <div className="pt-2">
          <Button
            size="small"
            onClick={() => router.push(viewLink)}
            className="bg-purple-600 hover:bg-purple-700 text-white "
          >
            Переглянути
          </Button>
        </div>
      )}
    </div>
  )
}

export default HelpCard
