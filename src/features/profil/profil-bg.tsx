import { ProfilType } from '@/libs/types/profil-type'
import { TextComponent } from './text-component'

export function ProfilBg({
  profil,
  height = 'h-[77vh]',
  gambar,
}: {
  profil: ProfilType
  height?: string
  gambar: string
}) {
  return (
    <div className="flex flex-col gap-y-32">
      <div className={`relative col-span-6 block`}>
        <img
          src={gambar}
          alt="Profil"
          className={`${height} phones:h-[30vh]" w-full rounded-lg bg-opacity-10 object-cover filter`}
          style={{}}
          loading="lazy"
        />
        <div className="absolute top-0 flex h-full w-[100%]">
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <div className="flex w-2/6 flex-col items-center gap-64 phones:w-4/5">
              <div className="h-[20rem] w-[20rem]">
                <img
                  src="/img/SMA.png"
                  alt="tutwuri"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex w-full flex-col gap-12 text-[2.4rem] text-primary-100 phones:text-[2.8rem]">
                <TextComponent
                  label="Nama Sekolah"
                  value={profil?.nama ?? '-'}
                />
                <TextComponent
                  label="Tahun Operasional Sekolah"
                  value={profil?.tahun_operasional ?? '-'}
                />
                <TextComponent
                  label="Akreditasi BAN"
                  value={profil?.akreditasi ?? '-'}
                />
                <TextComponent
                  label="Penyelenggaraan Sekolah"
                  value={profil?.penyelenggaraan ?? '-'}
                />
                <TextComponent label="NIS" value="" />
                <TextComponent label="NSS" value="" />
                <TextComponent
                  label="Alamat Sekolah"
                  value={profil?.alamat ?? '-'}
                />
                <TextComponent
                  label="Telepon/Fax"
                  value={profil?.telepon ?? '-'}
                />
                <TextComponent label="Kab/Kota" value={profil?.kota ?? '-'} />
                <TextComponent
                  label="Provinsi"
                  value={profil?.provinsi ?? '-'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
