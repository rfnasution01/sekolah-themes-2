import { IdentitasType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'

export function LogoNavigasi({ identitas }: { identitas: IdentitasType }) {
  return (
    <Link to="/" className="flex items-center gap-12">
      <img
        src={identitas?.logo ?? '/img/logo.png'}
        alt="logo"
        className="h-[5rem] w-[5rem]"
        loading="lazy"
      />

      <p className="font-sf-pro uppercase">{identitas?.nama_website ?? '-'}</p>
    </Link>
  )
}
