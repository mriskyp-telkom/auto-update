import React, { FC, useState } from 'react'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

const SyncPerbaruiAplikasi: FC = () => {
  const [loading, setLoading] = useState(true)

  return (
    <SyncDialogComponent
      title="Memperbarui Aplikasi..."
      subtitle="Jangan menutup aplikasi ARKAS sampai proses selesai. Pastikan Anda terkoneksi ke internet yang lancar."
      percentage={50}
      isOpen={loading}
      setIsOpen={() => setLoading(true)}
    />
  )
}

export default SyncPerbaruiAplikasi
