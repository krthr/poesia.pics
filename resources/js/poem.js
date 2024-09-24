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

    window.gtag && window.gtag('event', 'share')
    window.LogRocket && window.LogRocket.track('share')

    bownloadBtn.removeAttribute('disabled')
    bownloadBtn.classList.remove('loading')
  }
}
