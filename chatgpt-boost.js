/**
 * Ask a question to ChatGPT directly from Arc's Command Bar (⌘T).
 * 
 * Author  : 𝘾𝙖𝙫𝙚𝒏͜͜
 * Github  : https://github.com/keyding/ChatGPT-In-Arc-Site-Search
 * Twitter : https://twitter.com/cavenasdev
 * 
 * Reference : https://gist.github.com/b-nnett/2749adb44566239e4c85ad1a8937c2bc
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function parseQuestionFromUrl() {
  return new URLSearchParams(window.location.search).get('q')
}

function findElementUntilAppears(loopLimit = 100) {
  let timer, loopCount = 0

  return new Promise(resolve => {
    timer = setInterval(() => {
      const textareaElement = window.location.pathname.startsWith('/c')
        ? document.querySelector('textarea[data-id]:not([data-id="root"])')
        : document.querySelector('textarea[data-id="root"]')

      if (textareaElement || loopCount++ > loopLimit) {
        clearInterval(timer)
        resolve(textareaElement)
      }
    }, 100)
  })
}

; (async function () {
  const question = parseQuestionFromUrl()

  if (!question) return;

  const questionInputElement = await findElementUntilAppears()
  const submitElement = questionInputElement.nextSibling

  await sleep(1000)

  questionInputElement.textContent = question
  submitElement.disabled = false
  submitElement.click()
})()


