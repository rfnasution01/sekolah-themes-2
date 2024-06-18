import { bgPrimary200, bgPrimary800 } from '@/libs/helpers/format-color'
import { SliderType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export function Slider1({
  listImage,
  height = 'h-[77vh]',
  isShadow,
  color,
}: {
  listImage: SliderType[]
  height?: string
  isShadow?: boolean
  color: string
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIndex === listImage?.length - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 3 detik

    return () => clearInterval(interval)
  }, [showIndex])

  return (
    <div className="flex flex-col gap-y-32">
      <div className={`relative col-span-6 block`}>
        <img
          src={listImage?.[showIndex]?.gambar}
          alt={listImage?.[showIndex]?.judul}
          className={`${height} phones:h-[30vh]" w-full rounded-lg bg-opacity-10 object-cover filter`}
          style={{}}
          loading="lazy"
        />
        <div className="absolute top-0 flex h-full w-[100%]">
          {isShadow && (
            <div className="h-full w-[10%] bg-black bg-opacity-60" />
          )}
          <div
            className={`"relative flex h-full ${isShadow ? 'w-[80%]' : 'w-full'} flex-col justify-end border-white`}
          >
            {/* --- Navigation -- */}
            <div
              className={`absolute bottom-0 top-0 flex ${isShadow ? 'w-[80%]' : 'w-full'} flex-grow items-center justify-between px-4`}
            >
              <span
                className={clsx('', {
                  'hover:cursor-pointer': showIndex > 0,
                  'hover:cursor-not-allowed': !(showIndex > 0),
                })}
                onClick={() => {
                  if (showIndex > 0) {
                    setShowIndex(showIndex - 1)
                  }
                }}
              >
                <img
                  src="/icon/IconLeft.svg"
                  alt="Icon Left"
                  className="block phones:hidden"
                  loading="lazy"
                />
                <img
                  src="/icon/CircleLeft.svg"
                  alt="Icon Left"
                  className="hidden phones:block"
                  loading="lazy"
                />
              </span>
              <span
                className={clsx('', {
                  'hover:cursor-pointer': showIndex < listImage?.length - 1,
                  'hover:cursor-not-allowed': !(
                    showIndex <
                    listImage?.length - 1
                  ),
                })}
                onClick={() => {
                  if (showIndex < listImage?.length - 1) {
                    setShowIndex(showIndex + 1)
                  }
                }}
              >
                <img
                  src="/icon/IconRight.svg"
                  alt="Icon Right"
                  className="block phones:hidden"
                  loading="lazy"
                />
                <img
                  src="/icon/CircleRight.svg"
                  alt="Icon Right"
                  className="hidden phones:block"
                  loading="lazy"
                />
              </span>
            </div>
          </div>

          {isShadow && (
            <div className="h-full w-[10%] bg-black bg-opacity-60" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-16">
        {listImage?.map((_item, idx) => (
          <div
            className={`h-16 w-16 rounded-full ${idx === showIndex ? bgPrimary800(color) : bgPrimary200(color)}`}
            key={idx}
          />
        ))}
      </div>
    </div>
  )
}
