import { BeritaTerbaruType } from '@/libs/types/beranda-type'
import { BeritaUtama } from './berita-utama'
import { RunningText } from '@/components/RunningText'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'

export function BeritaTerbaru({
  runningText,
  color,
}: {
  runningText: BeritaTerbaruType[]
  color: string
}) {
  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }
  const dispatch = useDispatch()

  return (
    <div className="flex w-full items-center gap-32">
      <BeritaUtama color={color} />
      <RunningText color={color}>
        <div className="flex gap-32 text-nowrap">
          {runningText?.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                handleBeritaClick(item?.id)
                dispatch(
                  setStateHalaman({
                    id: item?.id,
                    page: item?.judul,
                  }),
                )
              }}
            >
              <Link to={`/berita/page/${item?.seo}`} className="flex">
                • {item?.judul}
              </Link>
            </div>
          ))}
        </div>
      </RunningText>
    </div>
  )
}
