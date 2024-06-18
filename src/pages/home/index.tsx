import Loading from '@/components/Loading'
import { Slider1 } from '@/components/slider/slider-1'
import { HomeCard, HomeLayanan, HomeTestimoni } from '@/features/home'
import { BerandaType, SliderType } from '@/libs/types/beranda-type'
import { LayananType } from '@/libs/types/layanan-type'
import { TestimoniType } from '@/libs/types/testimoni-type'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import {
  useGetBerandaQuery,
  useGetSliderQuery,
} from '@/store/slices/berandaAPI'
import { useGetLayananQuery } from '@/store/slices/layananAPI'
import { useGetTestimoniQuery } from '@/store/slices/testimoniAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function HomePage() {
  const stateColor = useSelector(getThemeSlice)?.color

  useEffect(() => {
    if (stateColor) {
      setColor(stateColor)
    }
  }, [stateColor])

  const colorParams = localStorage.getItem('themeColor')

  const baseColor = import.meta.env.VITE_BASE_THEME
  const [color, setColor] = useState<string>(
    colorParams ?? stateColor ?? baseColor,
  )

  // --- Slider ---
  const [slider, setSlider] = useState<SliderType[]>([])
  const {
    data: dataSlider,
    isFetching: isFetchingSlider,
    isLoading: isLoadingSlider,
  } = useGetSliderQuery()

  const loadingSlider = isFetchingSlider || isLoadingSlider

  useEffect(() => {
    if (dataSlider?.data) {
      setSlider(dataSlider?.data)
    }
  }, [dataSlider?.data])

  //   --- Beranda ---
  const [beranda, setBeranda] = useState<BerandaType[]>([])
  const {
    data: dataBeranda,
    isFetching: isFetchingBeranda,
    isLoading: isLoadingBeranda,
  } = useGetBerandaQuery()

  const loadingBeranda = isFetchingBeranda || isLoadingBeranda

  useEffect(() => {
    if (dataBeranda?.data) {
      setBeranda(dataBeranda?.data)
    }
  }, [dataBeranda?.data])

  // --- Testimoni ---
  const [testimoni, setTestimoni] = useState<TestimoniType[]>([])
  const {
    data: dataTestimoni,
    isFetching: isFetchingTestimoni,
    isLoading: isLoadingTestimoni,
  } = useGetTestimoniQuery({
    page_number: 1,
    page_size: 100,
  })

  const loadingTestimoni = isFetchingTestimoni || isLoadingTestimoni

  useEffect(() => {
    if (dataTestimoni?.data) {
      setTestimoni(dataTestimoni?.data)
    }
  }, [dataTestimoni?.data])

  //   --- layanan ---
  const [layanan, setLayanan] = useState<LayananType[]>([])
  const {
    data: dataLayanan,
    isFetching: isFetchingLayanan,
    isLoading: isLoadingLayanan,
  } = useGetLayananQuery()

  const loadingLayanan = isFetchingLayanan || isLoadingLayanan

  useEffect(() => {
    if (dataLayanan?.data) {
      setLayanan(dataLayanan?.data)
    }
  }, [dataLayanan?.data])

  const loading =
    loadingSlider || loadingBeranda || loadingLayanan || loadingTestimoni

  return (
    <div className="mb-80 flex flex-col gap-32">
      {loading ? (
        <div className="h-[30vh]">
          <Loading />
        </div>
      ) : (
        <>
          {/* --- Banner --- */}
          <Slider1 listImage={slider} isShadow color={color} />
          <HomeCard beranda={beranda} color={color} />

          <HomeLayanan layanan={layanan} />
          <HomeTestimoni testimoni={testimoni} />
        </>
      )}
    </div>
  )
}
