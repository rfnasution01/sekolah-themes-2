import { bgPrimary100 } from '@/libs/helpers/format-color'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import dayjs from 'dayjs'
import { Calendar, Newspaper, ThumbsUp } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function Slider4({
  height = 'h-[80vh]',
  gambar,
  judul,
  keterangan,
  hits,
  kategori,
  tanggal,
  kelompok,
  id,
  seo,
  color,
}: {
  height?: string
  gambar: string
  keterangan: string
  hits: string
  judul: string
  kategori: string
  tanggal: string
  kelompok: string
  id: string
  seo: string
  color: string
}) {
  const dispatch = useDispatch()

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

  return (
    <Link
      onClick={() => {
        handleBeritaClick(id)
        dispatch(
          setStateHalaman({
            id: id,
            page: seo,
          }),
        )
      }}
      to={`/${kelompok}/page/${seo}`}
      className={`relative col-span-6 block`}
    >
      <img
        src={gambar}
        alt={keterangan}
        className={`phones:h-[30vh] ${height} w-full rounded-lg bg-opacity-10 object-cover filter`}
        style={{}}
        loading="lazy"
      />
      <div className="absolute top-0 flex h-full w-[100%]">
        <div
          className={`relative flex h-full w-full flex-col justify-end border-white phones:hidden`}
        >
          <div className="flex flex-shrink flex-col gap-16 p-32">
            <p
              className={`truncate rounded-lg bg-opacity-70 p-16 text-[2rem] font-bold tracking-0.25 ${bgPrimary100(color)}`}
            >
              {judul}
            </p>
            <div className="flex items-center justify-between gap-32 phones:hidden">
              <div
                className={`flex items-center gap-4 rounded-lg bg-opacity-70 p-16 ${bgPrimary100(color)}`}
              >
                <Newspaper size={16} />
                <p>{kategori}</p>
              </div>
              <div
                className={`flex items-center gap-16 bg-opacity-70 p-16 ${bgPrimary100(color)}`}
              >
                <div className="flex items-center gap-x-8">
                  <ThumbsUp size={16} />
                  <p>{hits}</p>
                </div>
                <div className="flex items-center gap-x-8">
                  <Calendar size={16} />
                  <p>{dayjs(tanggal).locale('id').format('DD MMMM YYYY')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
