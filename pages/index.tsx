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

function Dashboard() {
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

  return (
    <Layout>
      <section className="bg-white dark:bg-gray-800 p-8 rounded shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-white">
          HANDS OF HOPE — Платформа для допомоги
        </h1>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong>HANDS OF HOPE</strong> — це онлайн-платформа, створена з метою об'єднати людей, які потребують допомоги, з тими, хто готовий її надати. Ми віримо, що турбота, підтримка та співчуття здатні змінювати життя. Наша місія — створити міст між волонтерами, організаціями та людьми у кризових ситуаціях.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          За допомогою нашої системи користувачі можуть залишати запити на допомогу в таких категоріях як:
        </p>

        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Притулок та евакуація</li>
          <li>Медикаменти та психологічна підтримка</li>
          <li>Їжа, одяг та транспорт</li>
          <li>Інформаційна та юридична підтримка</li>
          <li>Ремонт, волонтерство та інше</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Кожен запит можна переглянути, залишити відповідь, та надати допомогу безпосередньо. Ми забезпечуємо просту навігацію, прозорість, а також гнучку систему керування користувачами та повідомленнями.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Автор прагне зробити цей світ кращим — крок за кроком, допомагаючи тим, хто цього найбільше потребує. Долучайтеся до HANDS OF HOPE, щоб створити реальні зміни разом.
        </p>
      </section>
    </Layout>
  )
}

export default Dashboard
