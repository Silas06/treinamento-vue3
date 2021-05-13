function init (apiKey) {
  async function handleLoadWidget () {
    const page = `${window.location.origin}${window.location.pathname}`
    // const fp = await window.FingerprintJS.load()
    // const fingerprint = await fp.get()

    const WIDGET_URL = `https://silas06-feedbecker-widget.netlify.app?api_key=${apiKey}&page=${page}&fingerprint=3232323232`
    const config = { method: 'HEAD' }
    const res = await fetch(
      `https://backend-treinamento-vue3.vercel.app/apikey/exists?apikey=${apiKey}`,
      config
    )

    console.log(WIDGET_URL)

    if (res.status === 200) {
      const iframe = document.createElement('iframe')
      iframe.src = WIDGET_URL
      iframe.id = 'feedbacker-iframe'
      iframe.style.position = 'fixed'
      iframe.style.bottom = '0px'
      iframe.style.right = '0px'
      iframe.style.overflow = 'hidden'
      iframe.style.border = '0px'
      iframe.style.zIndex = '99999'
      document.body.appendChild(iframe)

      window.addEventListener('message', event => {
        if (!event.data.isWidget) return

        if (event.data.isOpen) {
          iframe.width = '100%'
          iframe.height = '100%'
        } else {
          iframe.width = '300px'
          iframe.height = '150px'
        }
      })
      return
    }

    console.log('* [feedbacker] nao foi possivrl varregar o widget porque a chave API nao existe.')
  }

  const script = document.createElement('script')
  script.src =
    'https://jsonplaceholder.typicode.com/users'
  script.async = 'async'
  script.addEventListener('load', handleLoadWidget)

  document.body.appendChild(script)
}

window.init = init
