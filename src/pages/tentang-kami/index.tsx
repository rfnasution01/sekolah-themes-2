import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { HalamanDetail } from '@/features/halaman'
import { TentangKamiTab } from '@/features/tentang-kami'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { HalamanDetailType, MenuType } from '@/libs/types/beranda-type'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import {
  useGetHalamanDetailQuery,
  useGetMenuUtamaQuery,
} from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function TentangKamiPage() {
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

  const stateId = useSelector(getHalamanSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')

  // --- Menu Utama ---
  const [menuUtama, setMenuUtama] = useState<MenuType[]>([])
  const {
    data: menuUtamaData,
    isLoading: isLoadingMenuUtama,
    isFetching: isFetchingMenuUtama,
  } = useGetMenuUtamaQuery()

  const loadingMenuUtama = isLoadingMenuUtama || isFetchingMenuUtama

  useEffect(() => {
    if (menuUtamaData?.data) {
      setMenuUtama(menuUtamaData?.data)
    }
  }, [menuUtamaData?.data])

  const { firstPathname } = usePathname()

  const firstPathnameChildren = menuUtama?.find(
    (item) => convertToSlug(item?.nama_menu) === firstPathname,
  )

  const [tab, setTab] = useState<string>(null)

  useEffect(() => {
    if (firstPathnameChildren?.children) {
      setTab(firstPathnameChildren?.children?.[0]?.id_konten)
    }
  }, [firstPathnameChildren?.children])

  // --- Halaman Page ---
  const [halamanDetail, setHalamanDetail] = useState<HalamanDetailType>()

  const {
    data: halamanDetailData,
    isLoading,
    isFetching,
  } = useGetHalamanDetailQuery(
    {
      id: tab,
    },
    { skip: id === null },
  )

  const loadingHalamanDetail = isLoading || isFetching

  useEffect(() => {
    if (halamanDetailData?.data) {
      setHalamanDetail(halamanDetailData?.data)
    }
  }, [halamanDetailData?.data, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />
      {loadingHalamanDetail ? (
        <Loading />
      ) : (
        <div className="h-[75vh] w-full px-[30rem] phones:p-32">
          <div className="flex h-full border bg-background shadow-lg phones:flex-col">
            {loadingMenuUtama ? (
              <Loading />
            ) : (
              <TentangKamiTab
                menu={firstPathnameChildren}
                firstPathname={firstPathname}
                setTab={setTab}
                tab={tab}
                color={color}
              />
            )}
            <div className="scrollbar h-full flex-1 overflow-y-auto">
              <HalamanDetail data={halamanDetail} isDetail />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
