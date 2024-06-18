export const BeritaUtama = ({ color }: { color: string }) => {
  return (
    <div
      className={`z-10 flex items-center gap-16 ${color === 'SD' ? 'bg-sd-100 text-sd-700' : color === 'SMP' ? 'bg-smp-100 text-smp-700' : color === 'SMA' ? 'bg-sma-100 text-sma-700' : color === 'ISLAMIC' ? 'bg-islamic-100 text-islamic-700' : 'bg-sd-100 text-sd-700'} px-16 py-8 font-bold`}
    >
      <span className="text-nowrap text-[2rem] font-bold uppercase phones:text-[2.4rem]">
        Berita terbaru
      </span>
    </div>
  )
}
