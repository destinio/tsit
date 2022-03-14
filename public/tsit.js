const button = document.querySelector('#copy-btn')
const dataToCopy = document.querySelector('#to-copy')
const checkMark = document.querySelector('#check-mark')

button.addEventListener('click', () => {
  navigator.clipboard.writeText(dataToCopy.textContent)
  checkMark.classList.toggle('show')
})
