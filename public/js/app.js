console.log('Hello by app.js')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data)
  })
})

const weatherForm = document.querySelector('form#search-form')
const searchInput = document.querySelector('form#search-form>input')

const messageOne = document.querySelector('p#message-1')
const messageTwo = document.querySelector('p#message-2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const location = searchInput.value;

  messageOne.textContent = 'Loading ...'
  messageTwo.textContent = ''

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        return messageOne.textContent = data.error
      }

      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    })
  })

  return false;
})