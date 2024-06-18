import './program.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useEffect, useState } from 'react'
import { ProgramDetailType } from '@/libs/types/beranda-type'
import { useGetProgramQuery } from '@/store/slices/berandaAPI'
import Loading from '@/components/Loading'
import { Breadcrumb } from '@/components/Breadcrumb'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { bgPrimary100 } from '@/libs/helpers/format-color'

export default function Program() {
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

  const dispatch = useDispatch()

  // --- Program Page ---
  const [program, setProgram] = useState<ProgramDetailType[]>()
  const {
    data: programData,
    isLoading: programIsLoading,
    isFetching: programIsFethcing,
  } = useGetProgramQuery()

  const loadingProgram = programIsLoading || programIsFethcing

  useEffect(() => {
    if (programData?.data) {
      setProgram(programData?.data)
    }
  }, [programData?.data])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      {loadingProgram ? (
        <Loading />
      ) : (
        <div className="px-[30rem] phones:p-32">
          <div
            className={
              'flex flex-col gap-32 border bg-background p-64 shadow-lg phones:p-32'
            }
          >
            <p className="font-roboto text-[5rem]">Program</p>
            <div className="phones:gapx-32 mt-96 grid grid-cols-3 gap-x-48 gap-y-96 phones:gap-y-96">
              {program?.map((item, idx) => (
                <div
                  className="col-span-1 phones:col-span-3"
                  key={idx}
                  onClick={() => {
                    dispatch(setStateHalaman({ id: item?.id, page: item?.seo }))
                  }}
                >
                  <Link
                    to={`/program-details/page/${item?.seo}`}
                    className={`flex flex-col gap-24 rounded-2xl ${bgPrimary100(color)} px-24 pb-32 pt-24 shadow hover:cursor-pointer hover:shadow-lg`}
                  >
                    <div className="relative -top-96">
                      <img
                        src={item?.photo}
                        alt={item?.judul}
                        className="h-[16rem] w-[16rem]  object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="relative -top-96 flex flex-col gap-4">
                      <p className="font-roboto text-[3rem] phones:text-[3.2rem]">
                        {item?.judul ?? '-'}
                      </p>
                      <p className="line-clamp-3 text-[2.4rem] tracking-1.25 phones:text-[2.8rem]">
                        {item?.isi_singkat ?? '-'}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
