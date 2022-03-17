import { ANALYTIC_PARAMS } from 'renderer/constants/analytic'

import sendEvent from 'renderer/configs/analytics'

export const sendEventLogin = (user_email: string, status: string) => {
  const analyticParams = ANALYTIC_PARAMS.login
  sendEvent({
    category: analyticParams.category,
    action: analyticParams.action,
    user_email: user_email,
    return_status: status,
    stage: analyticParams.stage,
  })
}

export const sendEventLogout = (user_email: string, status: string) => {
  const analyticParams = ANALYTIC_PARAMS.logout
  sendEvent({
    category: analyticParams.category,
    action: analyticParams.action,
    user_email: user_email,
    return_status: status,
    stage: analyticParams.stage,
  })
}

export const sendEventRegistrasi1 = (npsn: string, status: string) => {
  const analyticParams = ANALYTIC_PARAMS.registrasi_1
  sendEvent({
    category: analyticParams.category,
    action: analyticParams.action,
    npsn: npsn,
    return_status: status,
    stage: analyticParams.stage,
  })
}

export const sendEventRegistrasi2 = (user_email: string, status: string) => {
  const analyticParams = ANALYTIC_PARAMS.registrasi_2
  sendEvent({
    category: analyticParams.category,
    action: analyticParams.action,
    user_email: user_email,
    return_status: status,
    stage: analyticParams.stage,
  })
}
