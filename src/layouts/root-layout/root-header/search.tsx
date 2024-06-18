import { bgPrimary100 } from '@/libs/helpers/format-color'
import { Search } from 'lucide-react'

export function SearchHeader({ color }: { color: string }) {
  return (
    <div className="relative text-black phones:hidden">
      <span className="block phones:hidden">
        <Search
          className="absolute left-12 top-1/2 -translate-y-1/2 transform"
          size={16}
        />
      </span>
      <span className="hidden phones:block">
        <Search
          className="absolute left-8 top-1/2 -translate-y-1/2 transform phones:left-16"
          size={14}
        />
      </span>
      <input
        type="text"
        className={`w-full rounded-lg border border-gray-300 ${bgPrimary100(color)} p-8 px-48 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full phones:px-48`}
        placeholder="Tulis & Tekan Enter"
      />
    </div>
  )
}
