import { copyToClipboard } from '@/libs/helpers/copy-to-clipboard'
import { URLEncode } from '@/libs/helpers/format-text'
import { Link } from 'react-router-dom'

export function DetailShare({
  page,
  kelompok,
  slug,
  isi,
  photo,
}: {
  page: string
  kelompok: string
  slug: string
  isi: string
  photo: string
}) {
  const halamanKonten = `${import.meta.env.VITE_BASE_WEB}/${kelompok}/page/${slug}`
  ;('https://dribbble.com/shots/23588180-client-testimonial-design')

  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${URLEncode(halamanKonten)}&title=${URLEncode(page)}&description=${URLEncode(isi)}&picture=${URLEncode(photo)}
`
  const twLink = `https://twitter.com/intent/tweet?url=${URLEncode(halamanKonten)}&text=${URLEncode(page)}
`

  const waLink = `https://api.whatsapp.com/send?text=${URLEncode(page)}%20%0A%0A${URLEncode(isi)}%20%0A%0A${halamanKonten}
`
  return (
    <div className="flex flex-col gap-12">
      <div className="flex">
        <div className="border-b-4 border-danger-700 pb-8">
          <p className="border-l-4 border-danger-700 px-12 py-8 font-nunito text-[3rem] uppercase">
            Share Via
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-24">
        <Link to={fbLink} target="_blank">
          <img
            src="/icon/facebook-share.svg"
            alt="Facebook"
            loading="lazy"
            className="transform transition-transform hover:translate-y-12 hover:cursor-pointer"
          />
        </Link>
        <Link to={twLink} target="_blank">
          <img
            src="/icon/twitter-share.svg"
            alt="Twitter"
            loading="lazy"
            className="transform transition-transform hover:translate-y-12 hover:cursor-pointer"
          />
        </Link>
        <Link to={waLink} target="_blank">
          <img
            src="/icon/wa-share.svg"
            alt="Whatsapp"
            loading="lazy"
            className="transform transition-transform hover:translate-y-12 hover:cursor-pointer"
          />
        </Link>
        <button type="button" onClick={() => copyToClipboard(halamanKonten)}>
          <img
            src="/icon/link-share.svg"
            alt="Link"
            loading="lazy"
            className="transform transition-transform hover:translate-y-12 hover:cursor-pointer"
          />
        </button>
      </div>
    </div>
  )
}
