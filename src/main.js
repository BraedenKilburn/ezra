import './style.css'
import {
  intervalToDuration,
  formatDuration,
  differenceInDays,
  differenceInWeeks,
  add,
} from 'date-fns'

const birthDate = new Date('2025-12-15T20:21:00-08:00')

const MODES = ['FULL', 'WEEKS_AND_DAYS', 'DAYS']
let currentMode = 0

const getModeStrings = {
  FULL: () => {
    const duration = intervalToDuration({
      start: birthDate,
      end: new Date(),
    })
    return formatDuration(duration, { delimiter: ', ' })
  },

  WEEKS_AND_DAYS: () => {
    const now = new Date()
    const weeks = differenceInWeeks(now, birthDate)

    const remainingDays = add(birthDate, { weeks })
    const days = differenceInDays(now, remainingDays)

    return formatDuration({ weeks, days }, { delimiter: ' and ' })
  },

  DAYS: () => {
    const days = differenceInDays(new Date(), birthDate)
    return formatDuration({ days })
  },
}

const timerElement = document.querySelector('#age-timer')

function updateTimer() {
  const mode = MODES[currentMode]
  timerElement.textContent = getModeStrings[mode]()
}

timerElement.addEventListener('click', () => {
  currentMode = (currentMode + 1) % MODES.length
  updateTimer()
})

updateTimer()
setInterval(updateTimer, 1000)
