import React, {useState} from 'react'
import Layout from 'containers/Layout'
import { useGetHelpRequestsQuery } from 'api/extendedApi'

import ClothesIcon from '../../icons/help/clothes.svg'
import EvacuationIcon from '../../icons/help/evacuation.svg'
import FoodIcon from '../../icons/help/food.svg'
import InfoIcon from '../../icons/help/info.svg'
import MedicineIcon from '../../icons/help/medicine.svg'
import OtherIcon from '../../icons/help/other.svg'
import PsychologicalIcon from '../../icons/help/psychological.svg'
import RepairIcon from '../../icons/help/repair.svg'
import ShelterIcon from '../../icons/help/shelter.svg'
import TransportIcon from '../../icons/help/transport.svg'
import VolunteerIcon from '../../icons/help/volunteer.svg'
import HelpCard from "../../components/Cards/HelpCard";
import CreateHelpRequestModal from "../../components/Modals/CreateHelpRequestModal";


const helpTypeToIcon: Record<string, JSX.Element> = {
  clothes: <ClothesIcon className="w-8 h-8 text-white" />,
  evacuation: <EvacuationIcon className="w-8 h-8 text-white" />,
  food: <FoodIcon className="w-8 h-8 text-white" />,
  info_support: <InfoIcon className="w-8 h-8 text-white" />,
  medicine: <MedicineIcon className="w-8 h-8 text-white" />,
  other: <OtherIcon className="w-8 h-8 text-white" />,
  psychological: <PsychologicalIcon className="w-8 h-8 text-white" />,
  repair: <RepairIcon className="w-8 h-8 text-white" />,
  shelter: <ShelterIcon className="w-8 h-8 text-white" />,
  transport: <TransportIcon className="w-8 h-8 text-white" />,
  volunteer: <VolunteerIcon className="w-8 h-8 text-white" />,
}


function Help() {
  const [page, setPage] = useState(1)
  const [isModalOpen, setModalOpen] = useState(false)
  const { data, isLoading, refetch } = useGetHelpRequestsQuery({ page })

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold dark:text-white">Запити на допомогу</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Створити запит
        </button>
      </div>

      <div className="space-y-4">
        {isLoading && <p>Завантаження...</p>}

        {data?.results.map((req) => (
          <HelpCard
            key={req.id}
            type={req.type}
            description={req.description}
            location={req.location}
            contactPhone={req.contact_phone}
            userEmail={req.user_email}
            created={req.created}
            icon={helpTypeToIcon[req.type] ?? helpTypeToIcon.other}
            viewLink={`/help/${req.id}`}
          />
        ))}

        {data && (
          <div className="flex gap-2 mt-4">
            <button
              disabled={!data.previous}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              ⬅️ Назад
            </button>
            <button
              disabled={!data.next}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              ➡️ Далі
            </button>
          </div>
        )}
      </div>

      <CreateHelpRequestModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false)
          refetch()
        }}
      />
    </Layout>
  )
}

export default Help