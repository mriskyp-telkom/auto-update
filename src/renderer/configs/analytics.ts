import Analytics from 'electron-ga-uuid'

interface analyticProps {
  category: string
  action: string
  label?: string
  value?: string
  customDimension1: string
}

const analytics = new Analytics('UA-187846839-1')

const sendEvent = (props: analyticProps): void => {
  analytics.send('event', {
    ec: props.category,
    ea: props.action,
    el: props.label,
    ev: props.value,
    cd1: props.customDimension1,
  })
}

export default sendEvent
