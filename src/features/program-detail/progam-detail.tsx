import { ProgramDetailType } from '@/libs/types/beranda-type'
import './program-detail.css'
import clsx from 'clsx'

export function ProgramDetail({
  data,
  isDetail,
}: {
  data: ProgramDetailType
  isDetail?: boolean
}) {
  return (
    <div className={clsx('', { 'px-[30rem] phones:p-32': !isDetail })}>
      <div
        className={
          'flex flex-col gap-32 border bg-background p-64 shadow-lg phones:p-32'
        }
      >
        <p className="font-roboto text-[5rem]">{data?.judul}</p>
        <div className="h-[50vh] w-full">
          <img
            src={data?.photo}
            alt={data?.judul}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data?.isi_lengkap }}
          className="article-content"
        />
      </div>
    </div>
  )
}
