import { useEffect, useState } from 'react'
import { RootHeader } from './root-header'
import { RootNavigasi } from './root-navigasi'
import { MobileNavigasi } from './mobile-navigasi'
import {
  BeritaTerbaruType,
  IdentitasType,
  MenuType,
} from '@/libs/types/beranda-type'
import {
  useGetIdentitasQuery,
  useGetMenuTopQuery,
  useGetMenuUtamaQuery,
} from '@/store/slices/berandaAPI'
import { RootFooter } from './footer'
import { Link, Outlet } from 'react-router-dom'
import Loading from '@/components/Loading'
import { MenubarColor } from './root-header/menubar-color'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { bgPrimary500 } from '@/libs/helpers/format-color'

export default function RootLayout() {
  const [isShow, setIsShow] = useState<boolean>(false)

  // --- Menu Top ---
  const [menuTop, setMenuTop] = useState<MenuType[]>([])
  const [beritaTerbaru, setBeritaTerbaru] = useState<BeritaTerbaruType[]>([])
  const {
    data: menuTopData,
    isLoading: isLoadingMenuTop,
    isFetching: isFetchingMenuTop,
  } = useGetMenuTopQuery()

  const loadingMenuTop = isLoadingMenuTop || isFetchingMenuTop

  useEffect(() => {
    if (menuTopData) {
      setMenuTop(menuTopData?.data)
      setBeritaTerbaru(menuTopData?.berita_terbaru)
    }
  }, [menuTopData])

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

  const sortedDataTop = [...menuTop].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })

  const sortedDataUtama = [...menuUtama].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })

  // --- Identitas ---
  const [identitas, setIdentitas] = useState<IdentitasType>()
  const {
    data: identitasData,
    isLoading: isLoadingIdentitas,
    isFetching: isFetchingIdentitas,
  } = useGetIdentitasQuery()

  useEffect(() => {
    if (identitasData?.data) {
      setIdentitas(identitasData?.data)
    }
  }, [identitasData?.data])

  const loadingIdentitas =
    isLoadingIdentitas ||
    isFetchingIdentitas ||
    loadingMenuTop ||
    loadingMenuUtama

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

  return (
    <div className="flex h-screen flex-col bg-background text-[2rem] phones:text-[2.4rem]">
      {loadingIdentitas ? (
        <Loading />
      ) : (
        <>
          <div className={`${bgPrimary500(color)} p-24`}>
            <RootHeader
              setIsShow={setIsShow}
              isShow={isShow}
              beritaTerbaru={beritaTerbaru}
              menuTop={sortedDataTop}
              color={color}
            />
          </div>
          <div className="phones:hidden">
            <RootNavigasi
              menuUtama={sortedDataUtama}
              identitas={identitas}
              color={color}
            />
          </div>
          {isShow ? (
            <div className="flex-1">
              <MobileNavigasi
                menuTop={sortedDataTop}
                menuUtama={sortedDataUtama}
                setIsShow={setIsShow}
                color={color}
              />
            </div>
          ) : (
            <div className="scrollbar h-full overflow-y-auto">
              <Outlet />
              <RootFooter identitas={identitas} color={color} />
            </div>
          )}
          <div
            className={`fixed bottom-0 right-32 z-30 flex h-5/6 flex-col items-center justify-center gap-32 `}
          >
            <div className="flex flex-col items-center justify-center gap-32">
              <MenubarColor color={color} />
              <Link
                to={`https://www.facebook.com/${identitas?.fb}`}
                target="_blank"
                className="opacity-20 hover:cursor-pointer hover:opacity-90"
              >
                <img src="/icon/facebook-link.svg" alt="facebook" />
              </Link>
              <Link
                to={`https://www.twitter.com/${identitas?.tw}`}
                target="_blank"
                className="opacity-20 hover:cursor-pointer hover:opacity-90"
              >
                <img
                  src="/icon/twitter-link.svg"
                  alt="twitter"
                  loading="lazy"
                />
              </Link>
              <Link
                to={`https://www.instagram.com/${identitas?.ig}`}
                target="_blank"
                className="opacity-20 hover:cursor-pointer hover:opacity-90"
              >
                <img
                  src="/icon/instagram-link.svg"
                  alt="instagram"
                  loading="lazy"
                />
              </Link>
              <Link
                to={`https://api.whatsapp.com/send?phone=${identitas?.wa}`}
                target="_blank"
                className="opacity-20 hover:cursor-pointer hover:opacity-90"
              >
                <img src="/icon/wa-link.svg" alt="whatsapp" loading="lazy" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
