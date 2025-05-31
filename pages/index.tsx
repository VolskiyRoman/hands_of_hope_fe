import { useEffect } from 'react'
import Layout from 'containers/Layout'
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  useEffect(() => {
    document.title = 'HANDS OF HOPE';
  }, [])

  return (
    <Layout>
      <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 dark:text-white">
          HANDS OF HOPE — Платформа для допомоги
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg">
          <strong>HANDS OF HOPE</strong> — це онлайн-платформа, створена з метою об'єднати людей, які потребують допомоги, з тими, хто готовий її надати. Ми віримо, що турбота, підтримка та співчуття здатні змінювати життя. Наша місія — створити міст між волонтерами, організаціями та людьми у кризових ситуаціях.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg">
          За допомогою нашої системи користувачі можуть залишати запити на допомогу в таких категоріях:
        </p>

        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-1">
          <li>Притулок та евакуація</li>
          <li>Медикаменти та психологічна підтримка</li>
          <li>Їжа, одяг та транспорт</li>
          <li>Інформаційна та юридична підтримка</li>
          <li>Ремонт, волонтерство та інше</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Кожен запит можна переглянути, залишити відповідь та надати допомогу безпосередньо. Ми забезпечуємо просту навігацію, прозорість, а також гнучку систему керування користувачами та повідомленнями.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg">
          HANDS OF HOPE орієнтована як на окремих волонтерів, так і на громадські організації. Приєднуйтесь — і створюйте реальні зміни разом з нами.
        </p>
      </section>
    </Layout>
  )
}
