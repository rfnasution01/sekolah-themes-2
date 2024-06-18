import { IdentitasType } from '@/libs/types/beranda-type'
import { FooterAlamat } from './footer-alamat'
import { FooterCopyright } from './footer-copyright'
import { FooterKontak } from './footer-kontak'
import { FooterPopuler } from './footer-populer'
import { bgPrimary700, textPrimary100 } from '@/libs/helpers/format-color'

export function RootFooter({
  identitas,
  color,
}: {
  identitas: IdentitasType
  color: string
}) {
  return (
    <div className={`flex flex-col ${textPrimary100(color)}`}>
      {/* --- Info --- */}
      <div
        className={`${bgPrimary700(color)} flex w-full gap-32 px-64 py-32 phones:flex-col phones:items-start phones:gap-64 phones:px-32`}
      >
        {/* --- Alamat --- */}
        <FooterAlamat identitas={identitas} />

        {/* --- Populer --- */}
        <FooterPopuler />
        {/* --- Kontak Kami --- */}
        <FooterKontak color={color} />
      </div>
      {/* --- Copyright --- */}
      <FooterCopyright identitas={identitas} color={color} />
    </div>
  )
}
