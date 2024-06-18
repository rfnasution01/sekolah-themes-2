import './detail.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useEffect, useState } from 'react'
import { IconLabel } from '@/components/IconLabel'
import { Search, Timer, User } from 'lucide-react'
import TimeSinceUploaded from '@/libs/helpers/format-time'
import { debounce } from 'lodash'
import Loading from '@/components/Loading'
import { FormListDataPerPage } from '@/components/form/formListDataPerPage'
import { Pagination } from '@/components/Pagination'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { getKategoriSlice } from '@/store/reducer/stateIdKategori'
import { ListType } from '@/libs/types/list-type'
import { useGetKategoriQuery } from '@/store/slices/kategoriAPI'
import { Meta } from '@/store/api'
import { Breadcrumb } from '@/components/Breadcrumb'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { bgPrimary700 } from '@/libs/helpers/format-color'

export default function Kategori() {
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
  const { firstPathname, secondPathname } = usePathname()
  const dispatch = useDispatch()
  const stateId = useSelector(getKategoriSlice)?.id
  const statePage = useSelector(getKategoriSlice)?.page

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  useEffect(() => {
    if (statePage) {
      setPage(statePage)
    }
  }, [statePage])

  const idParams = localStorage.getItem('beritaID')
  const [id, setId] = useState<string>(idParams ?? stateId ?? '')
  const [page, setPage] = useState<string>(secondPathname ?? statePage ?? '')

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [search, setSearch] = useState<string>('')
  const [meta, setMeta] = useState<Meta>()

  // --- Berita Kategori Page ---
  const [kategori, setKategori] = useState<ListType[]>()
  const {
    data: kategoriData,
    isLoading: kategoriIsLoading,
    isFetching: kategoriIsFetching,
  } = useGetKategoriQuery({
    jenis: firstPathname,
    page_number: pageNumber,
    page_size: pageSize,
    search: search,
    seo_kategori: id,
  })

  const loadingKategori = kategoriIsLoading || kategoriIsFetching

  useEffect(() => {
    if (kategoriData) {
      setKategori(kategoriData?.data)
      setMeta(kategoriData?.meta)
    }
  }, [kategoriData, id])

  const handleSearch = debounce((searchValue: string) => {
    setPageNumber(1)
    setSearch(searchValue)
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  const handleClick = () => {
    const inputElement = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement
    handleSearch(inputElement.value)
  }

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      {loadingKategori ? (
        <Loading />
      ) : (
        <div className="px-[30rem] phones:p-32">
          <div
            className={
              'flex flex-col gap-32 border bg-background p-64 shadow-lg phones:p-32'
            }
          >
            <div className="flex items-center justify-between gap-32">
              <p className="font-roboto text-[5rem]">
                {convertSlugToText(page)}
              </p>
              <div className="flex w-1/2 justify-end">
                <input
                  type="text"
                  className="h-1/2 w-4/6 rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
                  placeholder="Search"
                  onChange={(e) => onSearch(e)}
                />
                <button
                  className={`${bgPrimary700(color)} px-12`}
                  type="button"
                  style={{
                    borderTopRightRadius: '1rem',
                    borderBottomRightRadius: '1rem',
                  }}
                  onClick={() => handleClick()}
                >
                  <Search size={20} />
                </button>
              </div>
            </div>

            {loadingKategori ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-12 gap-32">
                {kategori?.map((item, idx) => (
                  <div
                    className="col-span-4 phones:col-span-12"
                    key={idx}
                    onClick={() => {
                      handleBeritaClick(item?.id)
                      dispatch(
                        setStateHalaman({ id: item?.id, page: item?.seo }),
                      )
                    }}
                  >
                    <Link
                      to={`/${firstPathname}/page/${item?.seo}`}
                      className="flex h-full flex-col gap-24 rounded-2xl bg-white px-24 pb-32 pt-24 shadow hover:cursor-pointer hover:shadow-lg"
                    >
                      <div className="h-[25vh] w-full">
                        <img
                          src={item?.photo?.gambar}
                          alt={item?.photo?.keterangan}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="line-clamp-2 font-roboto text-[2.4rem] phones:text-[2.8rem]">
                          {item?.judul ?? '-'}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{ __html: item?.isi }}
                          className="article-content line-clamp-3"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-32 text-[1.6rem] phones:text-[2rem]">
                        <IconLabel
                          icon={<User size={12} />}
                          label={item?.penulis}
                        />
                        <IconLabel
                          icon={<Timer size={12} />}
                          label={
                            <TimeSinceUploaded uploadTime={item?.tanggal} />
                          }
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* --- Footer --- */}
            <div className="flex items-center justify-end">
              <FormListDataPerPage setDataPerPage={setPageSize} />
              {kategori?.length > 0 && (
                <Pagination
                  setPage={setPageNumber}
                  pageNow={pageNumber ?? 0}
                  lastPage={meta?.last_page ?? 0}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
