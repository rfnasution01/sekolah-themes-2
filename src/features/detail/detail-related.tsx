import Loading from '@/components/Loading'
import { Card3 } from '@/components/card/card-3'
import { usePathname } from '@/libs/hooks/usePathname'
import { DetailRelatedType } from '@/libs/types/detail-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useGetDetailRelatedQuery } from '@/store/slices/detailAPI'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function DetailRelated({ id, color }: { id: string; color: string }) {
  const { firstPathname } = usePathname()
  // --- Berita Detail Page ---
  const [detailRelated, setDetailRelated] = useState<DetailRelatedType[]>()
  const {
    data: detailData,
    isLoading: detailIsLoading,
    isFetching: detailIsFetching,
  } = useGetDetailRelatedQuery({
    id: id,
    jenis: firstPathname,
  })

  const loadingBeritaDetail = detailIsLoading || detailIsFetching

  useEffect(() => {
    if (detailData?.related) {
      setDetailRelated(detailData?.related)
    }
  }, [detailData?.related, id])

  const dispatch = useDispatch()

  return (
    <div className="flex w-3/5 flex-col gap-12 phones:w-full">
      <div className="flex border-b-4 border-danger-700 pb-8">
        <p className="border-l-4 border-danger-700 px-12 py-8 font-nunito text-[3rem] uppercase">
          berita lainnya
        </p>
      </div>

      {loadingBeritaDetail ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          {detailRelated?.map((item, idx) => (
            <Link
              to={`/${firstPathname}/page/${item?.seo}`}
              onClick={() => {
                dispatch(setStateHalaman({ id: item?.id, page: item?.seo }))
              }}
              key={idx}
            >
              <Card3
                judul={item?.judul}
                hits={item?.hits}
                tanggal={item?.tanggal}
                gambar={item?.photo}
                kelompok={item?.kelompok}
                color={color}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
