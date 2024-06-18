import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NoData } from '@/components/NoData'
import { TestimoniType } from '@/libs/types/testimoni-type'
import './detail.css'
import Card from './home-testimoni-card'

export function HomeTestimoni({ testimoni }: { testimoni: TestimoniType[] }) {
  const settings = {
    dots: true,
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: () => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  }

  return (
    <div className="flex w-full flex-col gap-32 px-64 phones:px-32">
      {/* --- Title --- */}
      <div className="flex w-full items-center">
        <hr className="flex-1 border border-primary-100" />
        <p className="rounded-2xl border border-primary-100 p-24 text-center font-roboto text-[5rem]">
          Apa kata mereka?
        </p>
        <hr className="flex-1 border border-primary-100" />
      </div>
      {testimoni?.length > 0 ? (
        <Slider {...settings}>{testimoni?.map(Card)}</Slider>
      ) : (
        <NoData />
      )}
    </div>
  )
}
