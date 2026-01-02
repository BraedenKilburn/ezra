import './style.css'
import { intervalToDuration, formatDuration } from 'date-fns'

const birthDate = new Date('2025-12-15T20:21:00-08:00')
const timerElement = document.querySelector('#age-timer')

function updateTimer() {
  const duration = intervalToDuration({
    start: birthDate,
    end: new Date(),
  })

  const ageString = formatDuration(duration, { delimiter: ', ' })
  timerElement.innerText = ageString
}
updateTimer()

// Update every second
setInterval(updateTimer, 1000)
