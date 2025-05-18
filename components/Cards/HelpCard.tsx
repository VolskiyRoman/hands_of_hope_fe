import React from 'react'
import { useRouter } from 'next/router'
import { Button } from '@roketid/windmill-react-ui'

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

const typeLabels: Record<string, string> = {
  shelter: 'Притулок',
  evacuation: 'Евакуація',
  medicine: 'Медикаменти',
  food: 'Їжа',
  psychological: 'Психологічна допомога',
  clothes: 'Одяг',
  transport: 'Транспорт',
  info_support: 'Інформаційна підтримка',
  legal: 'Юридична допомога',
  repair: 'Ремонт',
  volunteer: 'Волонтерство',
  other: 'Інше',
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
  const translatedType = typeLabels[type] || 'Невідомо'

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded shadow space-y-2 bg-white dark:bg-purple-600">
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
            className="bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Переглянути
          </Button>
        </div>
      )}
    </div>
  )
}

export default HelpCard
