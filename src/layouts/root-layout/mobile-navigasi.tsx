import { enumRoute } from '@/libs/enum/enum-route'
import { bgPrimary100, bgPrimary700 } from '@/libs/helpers/format-color'
import { MenuType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import clsx from 'clsx'
import { Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function MobileNavigasi({
  menuTop,
  menuUtama,
  setIsShow,
  color,
}: {
  menuTop: MenuType[]
  menuUtama: MenuType[]
  setIsShow: Dispatch<SetStateAction<boolean>>
  color: string
}) {
  const dispatch = useDispatch()

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }
  return (
    <div className="scrollbar hidden h-full w-full overflow-y-auto phones:block">
      <div
        className={`"scrollbar flex h-full flex-col gap-48 overflow-y-auto ${bgPrimary700(color)} p-32`}
      >
        <div className="flex flex-col gap-16">
          {menuUtama.map((item, idx) => (
            <div key={idx}>
              <Link
                onClick={() => {
                  setIsShow(false)
                }}
                to={
                  item?.nama_menu === 'Home'
                    ? '/'
                    : item?.slug === 'merdeka-belajar-kampus-merdeka-mbkm'
                      ? '#'
                      : item?.jenis_menu === enumRoute.ROUTE
                        ? item?.slug
                        : item?.jenis_menu === enumRoute.HALAMAN
                          ? `/halaman/page/${item?.slug}`
                          : item?.jenis_menu === enumRoute.PROGRAM
                            ? `/program-details/page/${item?.slug}`
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
                className={clsx(
                  'px-16 py-24 text-[2rem] uppercase hover:cursor-pointer phones:text-[2.4rem]',
                )}
              >
                <ul className="">
                  {item?.children?.length > 0 ? (
                    <div className="flex flex-col gap-24">
                      <p>{item?.nama_menu}</p>
                      {item?.children?.map((list, id) => (
                        <li
                          className="pl-32"
                          key={id}
                          onClick={() => {
                            handleBeritaClick(list?.id_konten)
                            dispatch(
                              setStateHalaman({
                                id: list?.id_konten,
                                page: item?.nama_menu,
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
                                    ? `/halaman/page=${list?.slug}`
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
                                              : list?.jenis_menu ===
                                                  enumRoute.URL
                                                ? list?.id_konten
                                                : list?.slug
                            }
                            target={
                              list?.jenis_menu === enumRoute.URL
                                ? '_blank'
                                : '_self'
                            }
                          >
                            {list?.nama_menu}
                          </Link>
                        </li>
                      ))}
                    </div>
                  ) : (
                    item?.nama_menu
                  )}
                </ul>
              </Link>
            </div>
          ))}
          {menuTop.map((item, idx) => (
            <Link
              onClick={() => setIsShow(false)}
              to={
                item?.nama_menu === 'Home'
                  ? '/'
                  : item?.jenis_menu === enumRoute.ROUTE
                    ? item?.slug
                    : item?.jenis_menu === enumRoute.HALAMAN
                      ? `/halaman/page/${item?.slug}`
                      : item?.jenis_menu === enumRoute.PROGRAM
                        ? `/program-details/page/${item?.slug}`
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
              className={clsx(
                'py-24 text-[2rem] uppercase hover:cursor-pointer phones:text-[2.4rem]',
              )}
              key={idx}
            >
              {item?.nama_menu}
            </Link>
          ))}
          <div className="relative w-full text-black">
            <span className="">
              <Search
                className="absolute left-12 top-1/2 -translate-y-1/2 transform"
                size={16}
              />
            </span>
            <input
              type="text"
              className={`w-full rounded-lg border border-gray-300 ${bgPrimary100(color)} p-8 px-48 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full phones:px-48`}
              placeholder="Tulis & Tekan Enter"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
