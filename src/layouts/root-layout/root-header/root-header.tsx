import { Dispatch, SetStateAction } from 'react'
import { SearchHeader } from './search'
import { BeritaTerbaruType, MenuType } from '@/libs/types/beranda-type'
import { NavigasiHeader } from './mapping-navigasi'
import { BeritaTerbaru } from './berita-terbaru'
import { LayoutDashboard, X } from 'lucide-react'

export function RootHeader({
  setIsShow,
  isShow,
  beritaTerbaru,
  menuTop,
  color,
}: {
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  beritaTerbaru: BeritaTerbaruType[]
  menuTop: MenuType[]
  color: string
}) {
  return (
    <div className="flex w-full items-center gap-32 phones:flex-row-reverse">
      <div className="flex w-3/5 items-center gap-32 phones:flex-1">
        <BeritaTerbaru runningText={beritaTerbaru} color={color} />
      </div>
      <div className="flex w-2/5 items-center gap-32 phones:hidden">
        <div className="flex-1">
          <NavigasiHeader menu={menuTop} color={color} />
        </div>
        <div>
          <SearchHeader color={color} />
        </div>
      </div>
      <div className="hidden phones:block">
        <span
          onClick={() => {
            setIsShow(!isShow)
          }}
        >
          {!isShow ? <LayoutDashboard size={20} /> : <X size={20} />}
        </span>
      </div>
    </div>
  )
}
