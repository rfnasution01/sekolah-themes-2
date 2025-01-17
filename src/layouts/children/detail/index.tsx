import './detail.css'
import 'dayjs/locale/id'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { IconLabel } from '@/components/IconLabel'
import { CalendarDays, Eye, User } from 'lucide-react'
import dayjs from 'dayjs'
import { Slider3 } from '@/components/slider/slider-3'
import Loading from '@/components/Loading'
import { Breadcrumb } from '@/components/Breadcrumb'
import { DetailType } from '@/libs/types/detail-type'
import { usePathname } from '@/libs/hooks/usePathname'
import { useGetDetailQuery } from '@/store/slices/detailAPI'
import { DetailRelated, DetailShare, DetailTag } from '@/features/detail'
import { getThemeSlice } from '@/store/reducer/stateTheme'

export default function Detail() {
  const stateColor = useSelector(getThemeSlice)?.color

  useEffect(() => {
    if (stateColor) {
      setColor(stateColor)
    }
  }, [stateColor])

  const colorParams = localStorage.getItem('themeColor')

  const baseColor = import.meta.env.VITE_BASE_THEME
  const [color, setColor] = useState<string>(
    colorParams ?? stateColor ?? baseColor,
  )

  const { firstPathname } = usePathname()
  const stateId = useSelector(getHalamanSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')

  // --- Berita Detail Page ---
  const [detail, setDetail] = useState<DetailType>()
  const {
    data: detailData,
    isLoading: detailIsLoading,
    isFetching: detailIsFetching,
  } = useGetDetailQuery({
    id: id,
    jenis: firstPathname,
  })

  const loadingDetail = detailIsLoading || detailIsFetching

  useEffect(() => {
    if (detailData?.data) {
      setDetail(detailData?.data)
    }
  }, [detailData?.data, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      {loadingDetail ? (
        <Loading />
      ) : (
        <div className="px-[30rem] phones:p-32">
          <div
            className={
              'flex flex-col gap-32 border bg-background p-64 shadow-lg phones:p-32'
            }
          >
            <div className="flex flex-col gap-16">
              <p className="font-roboto text-[5rem]">{detail?.judul}</p>
              <div className="flex flex-wrap items-center gap-24">
                <IconLabel
                  icon={<CalendarDays size={16} />}
                  label={dayjs(detail?.tanggal)
                    .locale('id')
                    .format('DD MMMM YYYY HH:mm')}
                />
                <IconLabel icon={<User size={16} />} label={detail?.penulis} />
                <IconLabel
                  icon={<Eye size={16} />}
                  label={`${detail?.hits} Views`}
                />
              </div>
            </div>
            <div className="h-[50vh] w-full">
              <Slider3
                listImage={detail?.photo}
                height="h-[50vh]"
                kategori={detail?.kategori}
                seo_kategori={detail?.seo_kategori}
                kelompok={firstPathname}
                jumlahPhoto={detail?.jumlah_photo}
                color={color}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: detail?.isi }}
              className="article-content"
            />
            <DetailTag data={detail} color={color} />
            <DetailShare
              slug={detail?.seo}
              page={detail?.judul}
              kelompok={firstPathname}
              isi={detail?.isi}
              photo={detail?.photo?.[0]?.gambar}
            />
            <DetailRelated id={id} color={color} />
          </div>
        </div>
      )}
    </div>
  )
}
