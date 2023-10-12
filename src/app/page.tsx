import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'

export default function Home() {
  // Main page
  return (
      <main>
        <Slider/>
        <Featured/>
        <Offer/>
      </main>
  )
}
