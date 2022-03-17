import Analytics from 'electron-ga-uuid'

interface analyticProps {
  category: string
  action: string
  label?: string
  value?: string
  user_email?: string
  npsn?: string
  stage?: string
  return_status?: string
}

const analytics = new Analytics('UA-187846839-1')

const sendEvent = (props: analyticProps): void => {
  analytics.send('event', {
    ec: props.category,
    ea: props.action,
    el: props.label,
    ev: props.value,
    cd1: props.user_email,
    cd2: props.npsn,
    cd3: props.stage,
    cd4: props.return_status,
  })
}

export default sendEvent
