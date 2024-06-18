import { BerandaType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { convertToSlug } from '@/libs/helpers/format-text'
import { Slider4 } from '../slider/slider-4'
import { useEffect, useState } from 'react'
import {
  bgPrimary200,
  bgPrimary700,
  bgPrimary800,
} from '@/libs/helpers/format-color'

export function Card4({
  data,
  angka,
  kelompok,
  color,
}: {
  data: BerandaType
  angka: number
  kelompok: string
  color: string
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIndex === data?.berita?.length - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 3 detik

    return () => clearInterval(interval)
  }, [showIndex])

  return (
    <div
      className={clsx('flex gap-32 phones:flex-col phones:items-start', {
        'flex-row': angka % 2 === 0,
        'flex-row-reverse': angka % 2 !== 0,
      })}
    >
      <div className="flex w-full flex-1 flex-col justify-between py-64">
        <div className="flex flex-col gap-16">
          <p className="font-roboto text-[5rem]">{data?.kategori}</p>
          <p>{data?.keterangan}</p>
        </div>
        <div>
          <Link
            to={`/${convertToSlug(data?.kelompok)}`}
            className={`rounded-lg px-32 py-12 ${bgPrimary700(color)}`}
          >
            Lihat {kelompok} Lainnya
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col gap-32 overflow-x-hidden">
        <div>
          {data?.berita?.length > 0 && (
            <div className="flex h-full w-full">
              <div className="my-32  w-2/12 phones:w-1/6">
                {showIndex > 0 && (
                  <div className="h-full w-[50rem] ">
                    <Slider4
                      gambar={data?.berita?.[showIndex - 1]?.photo?.gambar}
                      judul={data?.berita?.[showIndex - 1]?.judul}
                      hits={data?.berita?.[showIndex - 1]?.hits}
                      kategori={data?.berita?.[showIndex - 1]?.kategori}
                      keterangan={data?.berita?.[showIndex - 1]?.isi}
                      height="h-[33.6vh]"
                      tanggal={data?.berita?.[showIndex - 1]?.tanggal}
                      kelompok={convertToSlug(data?.kelompok)}
                      id={data?.berita?.[showIndex - 1]?.id}
                      seo={data?.berita?.[showIndex - 1]?.seo}
                      color={color}
                    />
                  </div>
                )}
              </div>
              <div className="w-8/12 phones:w-4/6">
                <Slider4
                  gambar={data?.berita?.[showIndex]?.photo?.gambar}
                  judul={data?.berita?.[showIndex]?.judul}
                  hits={data?.berita?.[showIndex]?.hits}
                  kategori={data?.berita?.[showIndex]?.kategori}
                  keterangan={data?.berita?.[showIndex]?.isi}
                  height="h-[40vh] phones:h-[36vh]"
                  tanggal={data?.berita?.[showIndex]?.tanggal}
                  kelompok={convertToSlug(data?.kelompok)}
                  id={data?.berita?.[showIndex]?.id}
                  seo={data?.berita?.[showIndex]?.seo}
                  color={color}
                />
              </div>
              <div className="my-32 w-2/12 phones:w-1/6">
                {showIndex < data?.berita?.length - 1 && (
                  <div className="h-full w-[50rem] ">
                    <Slider4
                      gambar={data?.berita?.[showIndex + 1]?.photo?.gambar}
                      judul={data?.berita?.[showIndex + 1]?.judul}
                      hits={data?.berita?.[showIndex + 1]?.hits}
                      kategori={data?.berita?.[showIndex + 1]?.kategori}
                      keterangan={data?.berita?.[showIndex + 1]?.isi}
                      height="h-[33.6vh]"
                      tanggal={data?.berita?.[showIndex + 1]?.tanggal}
                      kelompok={convertToSlug(data?.kelompok)}
                      id={data?.berita?.[showIndex + 1]?.id}
                      seo={data?.berita?.[showIndex + 1]?.seo}
                      color={color}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-x-16 hover:cursor-pointer">
          {data?.berita?.map((_item, idx) => (
            <div
              onClick={() => setShowIndex(idx)}
              className={`${idx === showIndex ? `h-[2rem] w-[4rem] ${bgPrimary800(color)}` : `h-[2rem] w-[2rem] ${bgPrimary200(color)}`} h-16 w-16 rounded-full`}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
