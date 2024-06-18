import { bgPrimary100 } from '@/libs/helpers/format-color'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Breadcrumb({ color }: { color: string }) {
  const { splittedPath } = usePathname()

  const pathLength4 = splittedPath.filter((_, index) => index !== 2)

  const path = splittedPath?.length === 4 ? pathLength4 : splittedPath

  return (
    <div className="px-64 phones:px-32">
      <div
        className={`flex items-center gap-12 overflow-x-hidden p-12 ${bgPrimary100(color)}`}
      >
        {path?.map((item, idx) => (
          <div className="flex items-center gap-12" key={idx}>
            <Link
              to={
                idx >= path?.length - 1
                  ? '#'
                  : item === ''
                    ? '/'
                    : item === 'halaman'
                      ? '#'
                      : item === 'program-details'
                        ? '/program'
                        : `/${item}`
              }
              className={clsx('text-nowrap hover:text-primary-400', {
                'hover:cursor-not-allowed': idx >= path?.length - 1,
              })}
            >
              {item === ''
                ? 'Dashboard'
                : item === 'hasil-ppdb'
                  ? 'Hasil PPDB'
                  : item === 'program-details'
                    ? 'Program'
                    : convertSlugToText(item)}
            </Link>
            <p className="text-nowrap">
              <ChevronRight size={16} />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
