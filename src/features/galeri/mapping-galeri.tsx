import { NoData } from '@/components/NoData'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { GaleriType } from '@/libs/types/galeri-type'
import { Dispatch, SetStateAction } from 'react'

export function MappingGaleri({
  data,
  setId,
  setShow,
  setTitle,
}: {
  data: GaleriType[]
  setId: Dispatch<SetStateAction<string>>
  setTitle: Dispatch<SetStateAction<string>>
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  const { firstPathname } = usePathname()

  return (
    <div className="px-[30rem] py-32 phones:p-32">
      <div className="flex flex-col gap-32 rounded-2xl bg-background p-32 shadow">
        <p className="font-roboto text-[5rem]">
          {convertSlugToText(firstPathname)}
        </p>

        <div className="grid grid-cols-12 gap-32 ">
          {data?.length > 0 ? (
            data?.map((item, idx) => (
              <div
                className="col-span-3 phones:col-span-6"
                key={idx}
                onClick={() => {
                  setId(item?.id)
                  setShow(true)
                  setTitle(item?.judul)
                }}
              >
                <div className="flex flex-col items-center justify-center gap-16 rounded-2xl bg-background p-32 text-center shadow">
                  <div className="h-[20rem] w-full">
                    <img
                      src={item?.gambar}
                      alt={item?.judul}
                      className="rounded-e-2xl object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p>{item?.judul}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-12">
              <NoData />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
