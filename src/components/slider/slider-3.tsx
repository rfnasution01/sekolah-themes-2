import {
  bgPrimary200,
  bgPrimary500,
  bgPrimary800,
} from '@/libs/helpers/format-color'
import { PhotoType } from '@/libs/types/beranda-type'
import { setStateKategori } from '@/store/reducer/stateIdKategori'
import clsx from 'clsx'
import { Folder } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function Slider3({
  listImage,
  height = 'h-[75vh]',
  isShadow,
  kategori,
  seo_kategori,
  kelompok,
  jumlahPhoto,
  color,
}: {
  listImage: PhotoType[]
  height?: string
  isShadow?: boolean
  kategori: string
  seo_kategori: string
  kelompok: string
  jumlahPhoto: number
  color: string
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Jika hanya ada satu gambar, tidak perlu dilakukan perubahan showIndex
      if (jumlahPhoto <= 1) {
        return
      }

      // Jika showIndex mencapai batas jumlahPhoto - 1, kembali ke gambar pertama
      if (showIndex >= jumlahPhoto - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 3 detik

    return () => clearInterval(interval)
  }, [showIndex, jumlahPhoto])

  const dispatch = useDispatch()

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

  return (
    <div className="flex flex-col gap-y-32">
      <div className={`relative col-span-6 block`}>
        <img
          src={listImage?.[showIndex]?.gambar}
          alt={listImage?.[showIndex]?.keterangan}
          className={`${height} phones:h-[30vh]" w-full rounded-lg bg-opacity-10 object-cover filter`}
          style={{}}
          loading="lazy"
        />
        <div className="absolute top-0 flex h-full w-[100%]">
          {isShadow && (
            <div className="h-full w-[10%] bg-black bg-opacity-60" />
          )}
          <div
            className={`"relative flex h-full ${isShadow ? 'w-[80%]' : 'w-full'} flex-col justify-start border-white`}
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

            {/* --- Kategori --- */}
            <div
              className={`absolute top-0 flex ${isShadow ? 'w-[80%]' : 'w-full'} flex-grow items-center justify-between px-4`}
            >
              <div className="flex flex-shrink flex-col gap-16 p-32">
                <div className="flex hover:cursor-pointer">
                  <Link
                    to={`/${kelompok}/${seo_kategori}`}
                    onClick={() => {
                      handleBeritaClick(seo_kategori)
                      dispatch(
                        setStateKategori({
                          id: seo_kategori,
                          page: kategori,
                        }),
                      )
                    }}
                    className={`flex items-center gap-12 rounded-2xl ${bgPrimary500(color)} p-16 text-[2rem] font-bold tracking-0.25`}
                  >
                    <Folder size={16} />
                    <p>{kategori}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

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
