import { setApikey, setCurrentPage, setFingerprint } from '../store'

interface IframeControl {
  updateCoreValueOnStore(): void
  notifyOpen(): void
  notifyClose(): void
}

export default function useIframeControl (): IframeControl {
  function updateCoreValueOnStore (): void {
    if (process.env.NODE_ENV === 'production') {
      const query = new URLSearchParams(window.location.search)
      const apikey = query.get('apikey') || ''
      const page = query.get('page') || ''
      const fingerprint = query.get('fingerprint') || ''

      setApikey(apikey)
      setCurrentPage(page)
      setFingerprint(fingerprint)
      return
    }

    setApikey('fcd5015c-10d3-4e9c-b395-ec7ed8850165')
    setCurrentPage('https://playground.com.br')
    setFingerprint('131322315313')
  }

  function notifyOpen (): void {
    window.parent.postMessage(
      {
        isWidget: true,
        isOpen: true
      },
      '*'
    )
  }

  function notifyClose (): void {
    window.parent.postMessage(
      {
        isWidget: true,
        isOpen: false
      },
      '*'
    )
  }

  return {
    updateCoreValueOnStore,
    notifyClose,
    notifyOpen
  }
}
