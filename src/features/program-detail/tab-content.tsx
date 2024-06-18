import { bgPrimary500 } from '@/libs/helpers/format-color'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { ProgramDetailType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'

export function ProgramDetailTab({
  menu,
  firstPathname,
  tab,
  setTab,
  color,
}: {
  menu: ProgramDetailType[]
  firstPathname: string
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  color: string
}) {
  const dispatch = useDispatch()

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

  return (
    <div
      className={`${bgPrimary500(color)} flex flex-col gap-32 p-64 phones:p-32`}
    >
      <p className="font-roboto text-[3rem]">
        {convertSlugToText(firstPathname)}
      </p>
      <div className="flex flex-col gap-16">
        {menu?.map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              'flex items-center gap-12 border-l-4 p-8 hover:cursor-pointer',
              {
                'border-primary-100 bg-primary-100 bg-opacity-10':
                  item?.id === tab || (tab === undefined && idx === 0),
                'border-transparent': item?.id !== tab,
              },
            )}
            onClick={() => {
              handleBeritaClick(item?.id)
              dispatch(setStateHalaman({ id: item?.id, page: item?.seo }))
              setTab(item?.id)
            }}
          >
            <img src={item?.photo} alt={item?.judul} className="w-[3rem]" />
            {item?.judul}
          </div>
        ))}
      </div>
    </div>
  )
}
