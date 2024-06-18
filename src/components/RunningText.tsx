import { textPrimary100 } from '@/libs/helpers/format-color'
import { ReactNode, useState } from 'react'

export const RunningText = ({
  children,
  color,
}: {
  children: ReactNode
  color: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className="relative flex overflow-hidden">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          animationPlayState: isHovered ? 'paused' : 'running',
          animationDuration: '50s',
        }}
        className={`animate-marquee whitespace-nowrap text-[2rem] font-bold  uppercase tracking-1.5 ${textPrimary100(color)} hover:cursor-pointer phones:text-[2.4rem]`}
      >
        {children}
      </div>
    </div>
  )
}
