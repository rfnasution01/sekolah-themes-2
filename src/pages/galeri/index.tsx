import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { MappingGaleri } from '@/features/galeri'
import { GaleriDetailType, GaleriType } from '@/libs/types/galeri-type'
import {
  useGetGaleriDetailQuery,
  useGetGaleriQuery,
} from '@/store/slices/galeriAPI'
import { useEffect, useState } from 'react'
import { ModalValidasi } from './modal-validasi'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'

export default function GaleriPage() {
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

  const [id, setId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)

  const [galeri, setGaleri] = useState<GaleriType[]>()
  const {
    data: galeryData,
    isLoading: galeryLoading,
    isFetching: galeryFetching,
  } = useGetGaleriQuery({
    page_number: 1,
    page_size: 100,
  })

  const loadingDetail = galeryFetching || galeryLoading

  useEffect(() => {
    if (galeryData?.data) {
      setGaleri(galeryData?.data)
    }
  }, [galeryData?.data, id])

  // --- Galeri Page ---
  const [galeriDetail, setGaleriDetail] = useState<GaleriDetailType>()
  const {
    data: galeryDetailData,
    isLoading: galeryDetailLoading,
    isFetching: galeryDetailFetching,
  } = useGetGaleriDetailQuery(
    {
      id: id,
    },
    { skip: id === '' },
  )

  const loadingGaleriDetail = galeryDetailFetching || galeryDetailLoading

  useEffect(() => {
    if (galeryDetailData?.data) {
      setGaleriDetail(galeryDetailData?.data)
    }
  }, [galeryDetailData?.data, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />
      {loadingDetail ? (
        <Loading />
      ) : (
        <MappingGaleri
          data={galeri}
          setId={setId}
          setShow={setShow}
          setTitle={setTitle}
        />
      )}
      <ModalValidasi
        isOpen={show}
        setIsOpen={setShow}
        data={galeriDetail}
        loading={loadingGaleriDetail}
        title={convertSlugToText(title)}
        color={color}
      />
    </div>
  )
}
