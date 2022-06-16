import React, { FC, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'

import NotFoundView from 'renderer/views/NotFoundView'

import StatusAccountView from 'renderer/views/Auth/StatusAccountView'
import LoginView from 'renderer/views/Auth/LoginView'
import LogoutView from 'renderer/views/Auth/LogoutView'
import CreateAccountView from 'renderer/views/Auth/CreateAccountView'
import RegistrationView from 'renderer/views/Auth/RegistrationView'

// Anggaran
import DashboardAnggaranView from 'renderer/views/Anggaran/Dashboard/DashboardAnggaranView'
import MenyusunKertasKerjaView from 'renderer/views/Anggaran/MenyusunKertasKerjaView'
import MengulasKertasKerjaView from 'renderer/views/Anggaran/MengulasKertasKerjaView'
import CetakKertasKerjaView from 'renderer/views/Anggaran/Cetak/CetakKertasKerjaView'
import FormKertasKerjaView from 'renderer/views/Anggaran/Form/FormKertasKerjaView'
import FormPenanggungJawabView from 'renderer/views/Anggaran/Form/FormPenanggungJawabView'
import FormPaguView from 'renderer/views/Anggaran/Form/FormPaguView'
import SyncCekStatusKKView from 'renderer/views/Anggaran/CekStatus/SyncCekStatusKKView'
import SyncMengulasKertasKerjaView from 'renderer/views/Anggaran/MengulasKertasKerjaView/SyncMengulasKertasKerjaView'

// Tata Usaha
import DashboardTataUsahaView from 'renderer/views/TataUsaha/Dashboard/DashboardTataUsahaView'
import FormPenerimaanDanaView from 'renderer/views/TataUsaha/Form/FormPenerimaanDanaView'
import SyncAktivasiBKUView from 'renderer/views/TataUsaha/Aktivasi/SyncAktivasiBKUView'
import DetailTataUsahaView from 'renderer/views/TataUsaha/Detail/DetailTataUsahaView'
import FormPenarikanTunaiView from 'renderer/views/TataUsaha/Form/FormPenarikanTunaiView'
import FormTambahPembelanjaanView from 'renderer/views/TataUsaha/Form/FormTambahPembelanjaanView'
import PerbaruiAplikasi from 'renderer/views/PerbaruiAplikasi'
import { PAGE_PERBARUI_APLIKASI } from 'renderer/constants/routes'
import DialogUpdate from 'renderer/views/PerbaruiAplikasi/DialogUpdate'
import SyncPerbaruiAplikasi from 'renderer/views/PerbaruiAplikasi/SyncPerbaruiAplikasi'
import schedule from 'node-schedule'
import { TIME_CHECK_UPDATE_APP } from 'global/constants'

const ipcRenderer = window.require('electron').ipcRenderer

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.state as { backgroundLocation?: Location }

  useEffect(() => {
    const result = ipcRenderer.sendSync('user:checkLogin')

    switch (result) {
      case 1:
        navigate('/registration')
        break
      case 2:
        navigate('/login')
        break
      case 3:
        navigate('/registration')
        break
      case 4:
        navigate('/account-status')
        break
      case 5:
        // case
        navigate('/anggaran')
        break
      default:
        navigate('/registration')
    }
  }, [])

  useEffect(() => {
    schedule.scheduleJob({ hour: TIME_CHECK_UPDATE_APP.hour }, function () {
      // TODO: Hit api check latest app
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes location={state?.backgroundLocation || location}>
          <Route path="*" element={<NotFoundView />} />
          <Route path="/">
            <Route path="login" element={<LoginView />} />
            <Route path="registration" element={<RegistrationView />} />
            <Route path="account-status" element={<StatusAccountView />} />
            <Route
              path="create-account/:q_mode"
              element={<CreateAccountView />}
            />
            <Route path="anggaran">
              <Route index={true} element={<DashboardAnggaranView />} />
              <Route
                path="cetak/:q_id_anggaran"
                element={<CetakKertasKerjaView />}
              />
              <Route path="menyusun">
                <Route path=":q_mode" element={<MenyusunKertasKerjaView />}>
                  <Route
                    path=":q_id_anggaran"
                    element={<MenyusunKertasKerjaView />}
                  />
                </Route>
              </Route>
              <Route
                path="mengulas/:q_id_anggaran"
                element={<MengulasKertasKerjaView />}
              />
            </Route>
            <Route path="tata-usaha">
              <Route index={true} element={<DashboardTataUsahaView />} />
              <Route
                path="detail/:q_id_anggaran/:q_id_periode"
                element={<DetailTataUsahaView />}
              />
            </Route>
            <Route
              path={PAGE_PERBARUI_APLIKASI}
              element={<PerbaruiAplikasi />}
            />
          </Route>
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/">
              <Route path="form/kertas-kerja">
                <Route
                  path=":q_mode/:q_id_anggaran"
                  element={<FormKertasKerjaView />}
                >
                  <Route path=":q_id_rapbs" element={<FormKertasKerjaView />} />
                </Route>
              </Route>
              <Route path="form/penanggung-jawab">
                <Route path=":q_mode" element={<FormPenanggungJawabView />}>
                  <Route
                    path=":q_id_anggaran"
                    element={<FormPenanggungJawabView />}
                  />
                </Route>
              </Route>
              <Route path="form/pagu" element={<FormPaguView />} />
              <Route
                path="sync/anggaran/mengulas/:q_id_anggaran"
                element={<SyncMengulasKertasKerjaView />}
              />
              <Route
                path="sync/anggaran/cek-status/:q_id_anggaran"
                element={<SyncCekStatusKKView />}
              />
              <Route
                path="form/penerimaan-dana/:q_id_anggaran"
                element={<FormPenerimaanDanaView />}
              />
              <Route
                path="form/penarikan-tunai/:q_id_anggaran/:q_id_periode"
                element={<FormPenarikanTunaiView />}
              />
              <Route
                path="form/tambah-pembelanjaan/:q_id_anggaran/:q_id_periode"
                element={<FormTambahPembelanjaanView />}
              />
              <Route
                path="sync/tata-usaha/aktivasi/:q_sumber_dana/:q_id_anggaran"
                element={<SyncAktivasiBKUView />}
              ></Route>
              <Route path="logout" element={<LogoutView />} />
              <Route
                path="perbarui-aplikasi/dialog/:q_response"
                element={<DialogUpdate />}
              />
              <Route
                path="sync/perbarui-aplikasi"
                element={<SyncPerbaruiAplikasi />}
              />
            </Route>
          </Routes>
        )}
      </div>
    </QueryClientProvider>
  )
}

export default App
