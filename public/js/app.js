console.log('Client side javascript')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecast = document.querySelector('#forecast')
const locate = document.querySelector('#location')
const forecastInfo = document.querySelector('.forecast-info')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    forecast.textContent = 'Loading...'
    locate.textContent = ''
    if(forecast.textContent === 'Loading...') {
        forecastInfo.classList.remove('error')
        forecastInfo.classList.remove('forecast')
    }
    
    fetch(`http://localhost:3000/api/weather/endpoint?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            forecastInfo.classList.add('error')
            return forecast.textContent = data.error
        }
        forecast.textContent = data.forecast
        locate.textContent = data.place_name
        forecastInfo.classList.add('forecast')
    })
})
})