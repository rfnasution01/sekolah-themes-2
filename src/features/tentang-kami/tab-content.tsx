import { bgPrimary500 } from '@/libs/helpers/format-color'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { MenuType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export function TentangKamiTab({
  menu,
  firstPathname,
  tab,
  setTab,
  color,
}: {
  menu: MenuType
  firstPathname: string
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  color: string
}) {
  return (
    <div
      className={`flex flex-col gap-32 ${bgPrimary500(color)} p-64 phones:p-32`}
    >
      <p className="font-roboto text-[3rem]">
        {convertSlugToText(firstPathname)}
      </p>
      <div className="flex flex-col gap-16">
        {menu?.children?.map((item, idx) => (
          <div
            key={idx}
            className={clsx('border-l-4 p-8 hover:cursor-pointer', {
              'border-primary-100 bg-primary-100 bg-opacity-10':
                item?.id_konten === tab || (tab === undefined && idx === 0),
              'border-transparent': item?.id_konten !== tab,
            })}
            onClick={() => setTab(item?.id_konten)}
          >
            {item?.nama_menu}
          </div>
        ))}
      </div>
    </div>
  )
}
