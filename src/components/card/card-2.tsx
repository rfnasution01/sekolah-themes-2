import { BerandaType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { NoData } from '../NoData'
import { Link } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { bgPrimary700 } from '@/libs/helpers/format-color'

export function Card2({
  data,
  kelompok,
  color,
}: {
  data: BerandaType
  kelompok: string
  color: string
}) {
  const dispatch = useDispatch()

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }
  return (
    <div
      className={clsx(
        'flex flex-col gap-32 phones:flex-col phones:items-start',
        {},
      )}
    >
      <div className="flex flex-col items-center justify-center gap-12">
        <p className="font-roboto text-[5rem]">{data?.kategori}</p>
        <p className="text-center">{data?.keterangan}</p>
      </div>
      <div className="grid grid-cols-5 gap-12">
        {data?.berita?.length > 0 ? (
          data?.berita?.map((item, idx) => (
            <Link
              to={`/${convertToSlug(item?.kelompok)}/page/${item?.seo}`}
              className="col-span-1 phones:col-span-5"
              key={idx}
              onClick={() => {
                handleBeritaClick(item?.id)
                dispatch(
                  setStateHalaman({
                    page: item?.seo,
                    id: item?.id,
                  }),
                )
              }}
            >
              <div className="flex flex-col gap-12 border bg-background px-12 pb-24 pt-12 shadow hover:cursor-pointer hover:shadow-lg">
                <img
                  src={item?.photo?.gambar}
                  alt={item?.photo?.keterangan}
                  className="h-[35vh] w-full"
                  loading="lazy"
                />
                <div className="flex flex-col gap-4">
                  <p className="text-center">{item?.judul}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-5">
            <NoData />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <Link
          to={`/${convertToSlug(data?.kelompok)}`}
          className={`rounded-lg px-32 py-12 ${bgPrimary700(color)}`}
        >
          Lihat {kelompok} Lainnya
        </Link>
      </div>
    </div>
  )
}
