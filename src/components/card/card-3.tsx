import { CalendarDays, Eye } from 'lucide-react'
import { IconLabel } from '../IconLabel'
import dayjs from 'dayjs'
import { PhotoType } from '@/libs/types/beranda-type'
import { bgPrimary700 } from '@/libs/helpers/format-color'

export function Card3({
  judul,
  hits,
  tanggal,
  gambar,
  kelompok,
  color,
}: {
  judul: string
  hits: string
  tanggal: string
  gambar: PhotoType
  kelompok: string
  color: string
}) {
  return (
    <div className="flex transform gap-24 border-b border-[#00000033] py-12 transition-transform hover:translate-x-12 hover:cursor-pointer phones:flex-col">
      <div className="flex h-[9rem] w-1/4 phones:h-[15rem] phones:w-full">
        <img
          src={gambar?.gambar}
          alt={gambar?.keterangan}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex w-3/4 flex-col justify-between phones:w-full phones:gap-12">
        <div className="flex items-start gap-32">
          <p className="line-clamp-2 w-2/3 uppercase phones:w-full">{judul}</p>
          <div className="flex w-1/3 justify-end text-[1.8rem] phones:hidden phones:text-[2.2rem]">
            <IconLabel icon={<Eye size={12} />} label={`${hits}`} />
          </div>
        </div>
        <div className="flex items-start gap-32 phones:items-center">
          <div className="w-2/3 text-[1.8rem] phones:flex-1 phones:text-[2.2rem]">
            <IconLabel
              icon={<CalendarDays size={12} />}
              label={dayjs(tanggal).locale('id').format('DD MMMM YYYY')}
            />
          </div>
          <div className="hidden text-[1.8rem] phones:block phones:flex-1 phones:text-[2.2rem]">
            <IconLabel icon={<Eye size={12} />} label={`${hits}`} />
          </div>
          <div className="w-1/3 phones:w-full">
            <button
              type="button"
              className={`"flex w-full items-center justify-center rounded-lg ${bgPrimary700(color)} py-8 text-[1.6rem] phones:text-[2rem]`}
            >
              Lihat {kelompok} Lainnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
