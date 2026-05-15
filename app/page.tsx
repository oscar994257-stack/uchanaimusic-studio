import HomePage from '@/components/HomePage'
import { getHomeData } from '@/lib/sanity'

export const revalidate = 60

export default async function Page() {
  const data = await getHomeData()
  return <HomePage data={data} />
}
