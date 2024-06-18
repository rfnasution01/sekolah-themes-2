import {
  bgPrimary100,
  bgPrimary200,
  bgPrimary800,
} from '@/libs/helpers/format-color'
import { BeritaType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { Calendar, Newspaper, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function Slider2({
  listImage,
  height = 'h-[80vh]',
  isShadow,
  kelompok,
  color,
}: {
  listImage: BeritaType[]
  height?: string
  isShadow?: boolean
  kelompok: string
  color: string
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIndex === listImage?.length - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 5 detik

    return () => clearInterval(interval)
  }, [showIndex])

  const dispatch = useDispatch()

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

  return (
    <div className="flex flex-col gap-y-32">
      <div className={`relative col-span-6 block`}>
        <img
          src={listImage?.[showIndex]?.photo?.gambar}
          alt={listImage?.[showIndex]?.photo?.keterangan}
          className={`phones:h-[30vh] ${height} w-full rounded-lg bg-opacity-10 object-cover filter`}
          style={{}}
          loading="lazy"
        />
        <div className="absolute top-0 flex h-full w-[100%]">
          {isShadow && (
            <div className="h-full w-[10%] bg-black bg-opacity-60" />
          )}
          <Link
            to={`/${kelompok}/page/${listImage?.[showIndex]?.seo}`}
            onClick={() => {
              handleBeritaClick(listImage?.[showIndex]?.id)
              dispatch(
                setStateHalaman({
                  id: listImage?.[showIndex]?.id,
                  page: listImage?.[showIndex]?.seo,
                }),
              )
            }}
            className={`"relative flex h-full phones:hidden ${isShadow ? 'w-[80%]' : 'w-full'} flex-col justify-end border-white`}
          >
            {/* --- Navigation -- */}
            <div
              className={`absolute bottom-0 top-0 flex ${isShadow ? 'w-[80%]' : 'w-full'} flex-grow items-center justify-between px-4`}
            >
              <span
                className={clsx('', {
                  'hover:cursor-pointer': showIndex > 0,
                  'hover:cursor-not-allowed': !(showIndex > 0),
                })}
                onClick={() => {
                  if (showIndex > 0) {
                    setShowIndex(showIndex - 1)
                  }
                }}
              >
                <img
                  src="/icon/IconLeft.svg"
                  alt="Icon Left"
                  className="block phones:hidden"
                  loading="lazy"
                />
                <img
                  src="/icon/CircleLeft.svg"
                  alt="Icon Left"
                  className="hidden phones:block"
                  loading="lazy"
                />
              </span>
              <span
                className={clsx('', {
                  'hover:cursor-pointer': showIndex < listImage?.length - 1,
                  'hover:cursor-not-allowed': !(
                    showIndex <
                    listImage?.length - 1
                  ),
                })}
                onClick={() => {
                  if (showIndex < listImage?.length - 1) {
                    setShowIndex(showIndex + 1)
                  }
                }}
              >
                <img
                  src="/icon/IconRight.svg"
                  alt="Icon Right"
                  className="block phones:hidden"
                  loading="lazy"
                />
                <img
                  src="/icon/CircleRight.svg"
                  alt="Icon Right"
                  className="hidden phones:block"
                  loading="lazy"
                />
              </span>
            </div>

            <div className="flex flex-shrink flex-col gap-16 p-32">
              <p
                className={`${bgPrimary100(color)} line-clamp-1 rounded-lg bg-opacity-70 p-16 text-[2rem] font-bold tracking-0.25`}
              >
                {listImage?.[showIndex]?.judul}
              </p>
              <div className="flex items-center justify-between gap-32 phones:hidden">
                <div
                  className={`flex ${bgPrimary100(color)} items-center gap-4 rounded-lg bg-opacity-70 p-16`}
                >
                  <Newspaper size={16} />
                  <p>{listImage?.[showIndex]?.kategori}</p>
                </div>
                <div
                  className={`${bgPrimary100(color)} flex items-center gap-16 bg-opacity-70 p-16`}
                >
                  <div className="flex items-center gap-x-8">
                    <ThumbsUp size={16} />
                    <p>{listImage?.[showIndex]?.hits}</p>
                  </div>
                  <div className="flex items-center gap-x-8">
                    <Calendar size={16} />
                    <p>
                      {dayjs(listImage?.[showIndex]?.tanggal)
                        .locale('id')
                        .format('DD MMMM YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {isShadow && (
            <div className="h-full w-[10%] bg-black bg-opacity-60" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-16">
        {listImage?.map((_item, idx) => (
          <div
            className={`rounded-full ${idx === showIndex ? `${bgPrimary800(color)} h-[2rem] w-[4rem]` : `${bgPrimary200(color)} h-[2rem] w-[2rem]`}`}
            key={idx}
          />
        ))}
      </div>
    </div>
  )
}
