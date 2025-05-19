import React, { useState, useContext } from 'react'
import Layout from 'containers/Layout'
import { useGetHelpRequestsQuery } from 'api/extendedApi'
import { WindmillContext } from '@roketid/windmill-react-ui'

// Black icons
import ClothesIconBlack from '../../icons/help/black/clothes.svg'
import EvacuationIconBlack from '../../icons/help/black/evacuation.svg'
import FoodIconBlack from '../../icons/help/black/food.svg'
import InfoIconBlack from '../../icons/help/black/info.svg'
import MedicineIconBlack from '../../icons/help/black/medicine.svg'
import OtherIconBlack from '../../icons/help/black/other.svg'
import PsychologicalIconBlack from '../../icons/help/black/psychological.svg'
import RepairIconBlack from '../../icons/help/black/repair.svg'
import ShelterIconBlack from '../../icons/help/black/shelter.svg'
import TransportIconBlack from '../../icons/help/black/transport.svg'
import VolunteerIconBlack from '../../icons/help/black/volunteer.svg'

// White icons
import ClothesIconWhite from '../../icons/help/white/clothes_white.svg'
import EvacuationIconWhite from '../../icons/help/white/evacuation_white.svg'
import FoodIconWhite from '../../icons/help/white/food_white.svg'
import InfoIconWhite from '../../icons/help/white/info_white.svg'
import MedicineIconWhite from '../../icons/help/white/medicine_white.svg'
import OtherIconWhite from '../../icons/help/white/other_white.svg'
import PsychologicalIconWhite from '../../icons/help/white/psychological_white.svg'
import RepairIconWhite from '../../icons/help/white/repair_white.svg'
import ShelterIconWhite from '../../icons/help/white/shelter_white.svg'
import TransportIconWhite from '../../icons/help/white/transport_white.svg'
import VolunteerIconWhite from '../../icons/help/white/volunteer_white.svg'

import HelpCard from '../../components/Cards/HelpCard'
import CreateHelpRequestModal from '../../components/Modals/CreateHelpRequestModal'

function Help() {

  const [page, setPage] = useState(1)
  const [isModalOpen, setModalOpen] = useState(false)
  const { data, isLoading, refetch } = useGetHelpRequestsQuery({ page })

  const { mode } = useContext(WindmillContext)

  const isDark = mode === 'dark'

  const helpTypeToIcon = {
    clothes: isDark ? <ClothesIconWhite className="w-8 h-8" /> : <ClothesIconBlack className="w-8 h-8" />,
    evacuation: isDark ? <EvacuationIconWhite className="w-8 h-8" /> : <EvacuationIconBlack className="w-8 h-8" />,
    food: isDark ? <FoodIconWhite className="w-8 h-8" /> : <FoodIconBlack className="w-8 h-8" />,
    info_support: isDark ? <InfoIconWhite className="w-8 h-8" /> : <InfoIconBlack className="w-8 h-8" />,
    medicine: isDark ? <MedicineIconWhite className="w-8 h-8" /> : <MedicineIconBlack className="w-8 h-8" />,
    other: isDark ? <OtherIconWhite className="w-8 h-8" /> : <OtherIconBlack className="w-8 h-8" />,
    psychological: isDark ? <PsychologicalIconWhite className="w-8 h-8" /> : <PsychologicalIconBlack className="w-8 h-8" />,
    repair: isDark ? <RepairIconWhite className="w-8 h-8" /> : <RepairIconBlack className="w-8 h-8" />,
    shelter: isDark ? <ShelterIconWhite className="w-8 h-8" /> : <ShelterIconBlack className="w-8 h-8" />,
    transport: isDark ? <TransportIconWhite className="w-8 h-8" /> : <TransportIconBlack className="w-8 h-8" />,
    volunteer: isDark ? <VolunteerIconWhite className="w-8 h-8" /> : <VolunteerIconBlack className="w-8 h-8" />,
  }


  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[25px] font-semibold dark:text-white">Запити на допомогу</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Створити запит
        </button>
      </div>

      <div className="space-y-4">
        {isLoading && <p className="text-gray-500 dark:text-gray-400">Завантаження...</p>}

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
              Назад
            </button>
            <button
              disabled={!data.next}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Далі
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
