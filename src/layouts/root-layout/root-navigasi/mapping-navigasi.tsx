import Tooltips from '@/components/Tooltip'
import { enumRoute } from '@/libs/enum/enum-route'
import {
  borderPrimary400,
  hoverPrimary400,
  textPrimary100,
} from '@/libs/helpers/format-color'
import { usePathname } from '@/libs/hooks/usePathname'
import { MenuType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { ChevronDown } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function MappingNavigasi({
  menuUtama,
  color,
}: {
  menuUtama: MenuType[]
  color: string
}) {
  const { firstPathname } = usePathname()

  const isActivePage = (item: string) => {
    if (
      (item.toLowerCase() === 'home' && firstPathname === '') ||
      item?.toLocaleLowerCase() === firstPathname
    ) {
      return true
    }
    return false
  }

  const sortedData = [...menuUtama].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })

  const dispatch = useDispatch()

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

  return (
    <div className="flex items-center">
      {sortedData.map((item, idx) => (
        <Link
          to={
            item?.nama_menu === 'Home'
              ? '/'
              : item?.slug === 'merdeka-belajar-kampus-merdeka-mbkm'
                ? '#'
                : item?.jenis_menu === enumRoute.ROUTE
                  ? item?.slug
                  : item?.jenis_menu === enumRoute.HALAMAN
                    ? `/halaman/page=${item?.slug}`
                    : item?.jenis_menu === enumRoute.PROGRAM
                      ? `/program-details/page=${item?.slug}`
                      : item?.jenis_menu === enumRoute.BERITA
                        ? `/berita`
                        : item?.jenis_menu === enumRoute.AGENDA
                          ? `/agenda`
                          : item?.jenis_menu === enumRoute.PENGUMUMAN
                            ? `/pengumuman`
                            : item?.jenis_menu === enumRoute.PRESTASI
                              ? `/prestasi`
                              : item?.jenis_menu === enumRoute.URL
                                ? item?.id_konten
                                : item?.slug
          }
          target={item?.jenis_menu === enumRoute.URL ? '_blank' : '_self'}
          className={`
            border-l border-r ${isActivePage(item?.slug) ? borderPrimary400(color) : hoverPrimary400(color)} px-16 py-24 text-[2rem] uppercase hover:cursor-pointer phones:text-[2.4rem]`}
          key={idx}
        >
          {item?.children?.length > 0 ? (
            <Tooltips
              color={color}
              triggerComponent={
                <div
                  className={`flex items-center gap-4 uppercase ${textPrimary100(color)}`}
                >
                  <p>{item?.nama_menu}</p>
                  <ChevronDown size={12} />
                </div>
              }
              tooltipContent={
                <div
                  className="flex flex-col gap-y-16 border-l p-12"
                  style={{
                    borderImage:
                      'linear-gradient(180deg, #FFFFFF 0%, #0D1A4B 100%)',
                    borderImageSlice: 1,
                  }}
                >
                  <div className="mx-16 flex flex-col items-start gap-y-16 text-[2rem]">
                    {item?.children.map((list, no) => (
                      <div
                        key={no}
                        onClick={() => {
                          handleBeritaClick(list?.id_konten)
                          dispatch(
                            setStateHalaman({
                              id: list?.id_konten,
                              page: list?.nama_menu,
                            }),
                          )
                        }}
                      >
                        <Link
                          to={
                            list?.nama_menu === 'Home'
                              ? '/'
                              : list?.jenis_menu === enumRoute.ROUTE
                                ? list?.slug
                                : list?.jenis_menu === enumRoute.HALAMAN
                                  ? `/halaman/page/${list?.slug}`
                                  : list?.jenis_menu === enumRoute.PROGRAM
                                    ? `/program-details/page/${list?.slug}`
                                    : list?.jenis_menu === enumRoute.BERITA
                                      ? `/berita/page/${list?.slug}`
                                      : list?.jenis_menu === enumRoute.AGENDA
                                        ? `/agenda/page/${list?.slug}`
                                        : list?.jenis_menu ===
                                            enumRoute.PENGUMUMAN
                                          ? `/pengumuman/page/${list?.slug}`
                                          : list?.jenis_menu ===
                                              enumRoute.PRESTASI
                                            ? `/prestasi/page/${list?.slug}`
                                            : list?.jenis_menu === enumRoute.URL
                                              ? list?.id_konten
                                              : list?.slug
                          }
                          target={
                            list?.jenis_menu === enumRoute.URL
                              ? '_blank'
                              : '_self'
                          }
                        >
                          <div
                            className={`${textPrimary100(color)} text-nowrap hover:cursor-pointer`}
                          >
                            {list?.nama_menu}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              }
              position="bottom"
            />
          ) : (
            item?.nama_menu
          )}
        </Link>
      ))}
    </div>
  )
}
