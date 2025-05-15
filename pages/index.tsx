import PageTitle from 'components/Typography/PageTitle'
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
        <PageTitle>Dashboard</PageTitle>
      </Layout>
  )
}

export default Dashboard