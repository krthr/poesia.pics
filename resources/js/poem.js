import 'lazysizes'

const IOS = /iPad|iPhone|iPod/
const MACOS = /Mac OS X/
const SAFARI = /safari|applewebkit/i

/**
 *
 * @param {HTMLElement} node
 * @param {HTMLElement} title
 * @returns
 */
export async function generateAndDownloadImage(node, title) {
  console.log({ title }, 'generateAndDownloadImage')

  const userAgent = navigator.userAgent

  const { toBlob } = await import('html-to-image')

  node.style.padding = '2rem'

  if (SAFARI.test(userAgent) || IOS.test(userAgent) || MACOS.test(userAgent)) {
    // https://github.com/bubkoo/html-to-image/issues/361#issuecomment-1402537176
    await toBlob(node)
    await toBlob(node)
    await toBlob(node)
  }

  const blob = await toBlob(node, {
    type: 'image/jpeg',
    backgroundColor: 'white',
    pixelRatio: 2,
  })

  node.style.padding = '0rem'

  if (!blob) {
    return
  }

  const dataUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = `${title.textContent.toLowerCase().trim()}-${Date.now()}.jpg`
  a.href = dataUrl
  a.click()

  URL.revokeObjectURL(dataUrl)
}

window.onload = () => {
  const poem = document.querySelector('#poem')
  const title = document.querySelector('#title')
  const bownloadBtn = document.querySelector('#download-poem')

  bownloadBtn.onclick = async () => {
    bownloadBtn.setAttribute('disabled', true)
    bownloadBtn.classList.add('loading')

    await generateAndDownloadImage(poem, title)

    window.gtag && window.gtag('event', 'download_image')
    window.LogRocket && window.LogRocket.track('download_image')

    bownloadBtn.removeAttribute('disabled')
    bownloadBtn.classList.remove('loading')
  }

  const shareBtn = document.querySelector('#share-btn')

  if ('share' in navigator) {
    console.log('Can share!')

    shareBtn.onclick = async () => {
      const payload = {
        title: window.poem.title,
        text: window.poem.poem,
        url: window.poem.url,
      }

      console.log('Sharing', payload)
      await navigator.share(payload)

      window.gtag && window.gtag('event', 'share_native')
      window.LogRocket && window.LogRocket.track('share_native')
    }

    shareBtn.classList.remove('hidden')
  }
}
