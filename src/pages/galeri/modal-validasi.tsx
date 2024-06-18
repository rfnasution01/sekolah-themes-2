/* eslint-disable @typescript-eslint/no-explicit-any */

import { X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { GaleriDetailType } from '@/libs/types/galeri-type'
import clsx from 'clsx'
import Loading from '@/components/Loading'
import { bgPrimary200, bgPrimary800 } from '@/libs/helpers/format-color'

export function ModalValidasi({
  isOpen,
  setIsOpen,
  data,
  loading,
  title,
  color,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  data: GaleriDetailType
  loading: boolean
  title: string
  color: string
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIndex === data?.lampiran?.length - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 5 detik

    return () => clearInterval(interval)
  }, [showIndex])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
        style={{
          width: '80%',
          height: '80%',
        }}
      >
        <div className="flex h-full flex-col gap-16 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
                Album {title}
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          {/* --- Navigasi --- */}
          {loading ? (
            <Loading />
          ) : (
            <div className={`relative col-span-6 block flex-1`}>
              <div className="flex h-full flex-1 flex-col gap-32">
                <div className="h-full w-full flex-1">
                  <img
                    src={data?.lampiran?.[showIndex]?.gambar}
                    alt={data?.lampiran?.[showIndex]?.judul}
                    className={`h-[65vh] w-full rounded-lg bg-opacity-10 object-cover filter phones:h-[30vh]`}
                    loading="lazy"
                  />
                </div>
                {/* --- Footer --- */}
                <div className="flex items-center justify-center gap-x-16">
                  {data?.lampiran?.map((_item, idx) => (
                    <div
                      className={`h-16 w-16 rounded-full ${idx === showIndex ? `h-[1.6rem] w-[4rem] ${bgPrimary800(color)}` : `${bgPrimary200(color)} h-[1.6rem] w-[2rem]`}`}
                      key={idx}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute top-0 flex h-full w-[100%]">
                <div
                  className={`relative flex h-full w-full flex-col justify-end border-white`}
                >
                  {/* --- Navigation -- */}
                  <div
                    className={`absolute bottom-0 top-0 flex w-full flex-grow items-center justify-between px-4`}
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
                        'hover:cursor-pointer':
                          showIndex < data?.lampiran?.length - 1,
                        'hover:cursor-not-allowed': !(
                          showIndex <
                          data?.lampiran?.length - 1
                        ),
                      })}
                      onClick={() => {
                        if (showIndex < data?.lampiran?.length - 1) {
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
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
