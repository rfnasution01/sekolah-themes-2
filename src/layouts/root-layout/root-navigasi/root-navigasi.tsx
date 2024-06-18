import { IdentitasType, MenuType } from '@/libs/types/beranda-type'
import { LogoNavigasi } from './logo'
import { MappingNavigasi } from './mapping-navigasi'
import { bgPrimary700 } from '@/libs/helpers/format-color'

export function RootNavigasi({
  menuUtama,
  identitas,
  color,
}: {
  menuUtama: MenuType[]
  identitas: IdentitasType
  color: string
}) {
  return (
    <div
      className={`flex items-center justify-between gap-32 pl-64 ${bgPrimary700(color)}`}
    >
      <LogoNavigasi identitas={identitas} />
      <MappingNavigasi menuUtama={menuUtama} color={color} />
    </div>
  )
}
