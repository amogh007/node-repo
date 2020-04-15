const button=document.querySelector('#button')
const input=document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
button.addEventListener('click',(e)=>{
    e.preventDefault()
    const location=input.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/search?country=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})