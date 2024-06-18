import { NoData } from '@/components/NoData'
import { BerandaType } from '@/libs/types/beranda-type'
import { HomeShowCard } from './home-show-card'

export function HomeCard({
  beranda,
  color,
}: {
  beranda: BerandaType[]
  color: string
}) {
  return (
    <div className="flex flex-col gap-32 px-64 phones:px-32">
      <div className="flex flex-col gap-32">
        {beranda?.length > 0 ? (
          beranda?.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-32">
              <HomeShowCard
                angka={idx}
                data={item}
                kelompok={item?.kelompok}
                color={color}
              />
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>
    </div>
  )
}
