import { AlertDialogProps } from 'renderer/components/Dialog/AlertDialogComponent'

export const RESPONSE_UPDATE = {
  ready: 'ready',
  success: 'success',
  already_updated: 'already_updated',
}

export const ALERT_UPDATE: Record<string, Partial<AlertDialogProps>> = {
  [RESPONSE_UPDATE.ready]: {
    type: 'success',
    icon: 'update',
    title: 'Versi terbaru sudah tersedia!',
    desc: 'Silahkan perbarui aplikasi untuk penggunaan yang lebih nyaman. Pembaruan aplikasi membutuhkan [X] dari memori perangkat.',
    btnActionText: 'Perbarui Aplikasi',
    btnCancelText: 'Kembali',
  },
  [RESPONSE_UPDATE.success]: {
    type: 'success',
    icon: 'done',
    title: 'ARKAS Anda berhasil diperbarui!',
    desc: 'Silakan buka ulang aplikasi.',
    btnActionText: 'Buka Ulang Aplikasi',
  },
  [RESPONSE_UPDATE.already_updated]: {
    type: 'failed',
    icon: 'update_disabled',
    title: 'Anda sudah menggunakan ARKAS terbaru',
    desc: 'Jika ada versi terbaru yang bisa diunduh, kami akan menginformasikannya di halaman beranda.',
    btnActionText: 'Saya Mengerti',
    hideBtnCancel: true,
  },
}
