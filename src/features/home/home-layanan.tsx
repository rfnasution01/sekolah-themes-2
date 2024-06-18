import { NoData } from '@/components/NoData'
import { LayananType } from '@/libs/types/layanan-type'
import { Link } from 'react-router-dom'

export function HomeLayanan({ layanan }: { layanan: LayananType[] }) {
  return (
    <div className="scrollbar flex w-full flex-col gap-32 overflow-x-auto px-64 phones:px-32">
      <div className="flex w-full items-center">
        <hr className="flex-1 border border-primary-100" />
        <p className="rounded-2xl border border-primary-100 p-24 text-center font-roboto text-[5rem]">
          Layanan
        </p>
        <hr className="flex-1 border border-primary-100" />
      </div>
      {layanan?.length > 0 ? (
        <div className="scrollbar flex w-full gap-48 overflow-x-auto phones:gap-32">
          {layanan?.map((item, idx) => (
            <Link
              to={item?.url}
              target="_blank"
              className="flex h-full w-1/5 flex-col items-center justify-center gap-16 rounded-2xl border bg-white p-32 text-center shadow hover:shadow-xl phones:w-3/5"
              key={idx}
            >
              <div className="h-[16rem] w-[16rem] transition-transform hover:-translate-y-24 hover:cursor-pointer">
                <img
                  src={item?.icon}
                  alt={item?.nama_layanan}
                  className="h-full w-full rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-sf-pro text-[2.4rem] font-semibold">
                {item?.nama_layanan}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  )
}
