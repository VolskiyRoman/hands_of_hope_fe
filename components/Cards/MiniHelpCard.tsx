import React from 'react'
import { useRouter } from 'next/router'
import { helpLabels } from 'utils/helpLabels'
import {Button} from "@roketid/windmill-react-ui";

type MiniHelpCardProps = {
  id: number
  type: string
  location: string
  created: string
  viewLink?: string
}

const MiniHelpCard: React.FC<MiniHelpCardProps> = ({ type, location, created, viewLink }) => {
  const router = useRouter()

  const handleClick = () => {
    if (viewLink) {
      router.push(viewLink)
    }
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          {helpLabels[type] || type}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(created).toLocaleDateString()}
        </p>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">📍 {location}</p>

      {viewLink && (
        <Button
          size={"small"}
          onClick={handleClick}
          className="text-sm text-purple-600 dark:text-white"
        >
          Переглянути
        </Button>
      )}
    </div>
  )
}

export default MiniHelpCard
