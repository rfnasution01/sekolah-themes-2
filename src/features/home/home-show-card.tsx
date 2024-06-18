import { Card1, Card2, Card4 } from '@/components/card'
import { BerandaType } from '@/libs/types/beranda-type'

export function HomeShowCard({
  angka,
  data,
  kelompok,
  color,
}: {
  angka: number
  data: BerandaType
  kelompok: string
  color: string
}) {
  const index = angka % 4

  switch (index) {
    case 1:
      return (
        <Card1 data={data} angka={angka} kelompok={kelompok} color={color} />
      )
    case 2:
      return <Card2 data={data} kelompok={kelompok} color={color} />
    case 3:
      return (
        <Card4
          data={data}
          angka={angka + 1}
          kelompok={kelompok}
          color={color}
        />
      )
    case 0:
      return (
        <Card1 data={data} angka={angka} kelompok={kelompok} color={color} />
      )
    default:
      return 'Index tidak ditemukan'
  }
}
