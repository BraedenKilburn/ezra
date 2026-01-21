import './style.css'
import { intervalToDuration, formatDuration, differenceInDays, differenceInWeeks, add } from 'date-fns'

const birthDate = new Date('2025-12-15T20:21:00-08:00')
const timerElement = document.querySelector('#age-timer')

let showWeeksAndDays = false

function getWeeksAndDaysString() {
  const today = new Date()
  const weeks = differenceInWeeks(today, birthDate)

  const remainingDays = add(birthDate, { weeks: weeks })
  const days = differenceInDays(today, remainingDays)

  return formatDuration({ weeks, days }, { delimiter: ' and ' })
}

function updateTimer() {
  const duration = intervalToDuration({
    start: birthDate,
    end: new Date(),
  })

  const ageString = showWeeksAndDays
    ? getWeeksAndDaysString()
    : formatDuration(duration, { delimiter: ', ' })

  timerElement.innerText = ageString
}

timerElement.addEventListener('click', () => {
  showWeeksAndDays = !showWeeksAndDays
  updateTimer()
})

updateTimer()

// Update every second
setInterval(updateTimer, 1000)
