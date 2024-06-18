import { FaqDetailType } from '@/libs/types/faq-type'
import { Accordion } from './accordion-faq'

export function FaqDetail({ data }: { data: FaqDetailType[] }) {
  return (
    <div className={'flex flex-col gap-12 p-32'}>
      {data?.map((item, idx) => (
        <div key={idx}>
          <Accordion
            title={item?.pertanyaan}
            content={item?.jawaban}
            idx={idx}
          />
        </div>
      ))}
    </div>
  )
}
