import { TestimoniType } from '@/libs/types/testimoni-type'
import { Star } from 'lucide-react'

function Card(props: TestimoniType) {
  return (
    <div className="flex items-center justify-center text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-1/4 flex-col items-center phones:w-5/6">
          <div className="z-10">
            <img
              loading="lazy"
              className="h-[20rem] w-[20rem] rounded-full object-cover"
              src={props.photo}
              alt={props?.nama}
            />
          </div>
          <div
            className="relative -top-64 z-0 flex flex-col gap-16 border px-32 py-64 shadow-md"
            style={{ borderRadius: '3rem' }}
          >
            <p className="text-left font-nunito text-[3rem]">
              <span className="">{props.nama}</span>
            </p>
            <div className="flex items-center justify-end gap-12">
              <Star size={16} color="orange" />
              <Star size={16} color="orange" />
              <Star size={16} color="orange" />
              <Star size={16} color="orange" />
              <Star size={16} color="orange" />
            </div>
            <p
              className="text-justify font-sf-pro tracking-1.25"
              style={{ lineHeight: '130%' }}
            >
              {props.keterangan_singkat}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
