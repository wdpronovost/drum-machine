import './App.css'
import { useState, useEffect, useRef } from 'react'

const padArray = [
  {
    key: 'Q',
    label: 'GAME OVER',
    audio: '/media/mixkit-arcade-fast-game-over-233.wav'
  },
  {
    key: 'W',
    label: 'BOOST',
    audio: '/media/mixkit-arcade-game-opener-222.wav'
  },
  {
    key: 'E',
    label: 'JUMP',
    audio: '/media/mixkit-arcade-retro-jump-223.wav'
  },
  {
    key: 'A',
    label: 'SCORE',
    audio: '/media/mixkit-arcade-score-interface-217.wav'
  },
  {
    key: 'S',
    label: 'FIGHT',
    audio: '/media/mixkit-boss-fight-arcade-232.wav'
  },
  {
    key: 'D',
    label: 'WHOOPS',
    audio: '/media/mixkit-retro-game-notification-212.wav'
  },
  {
    key: 'Z',
    label: 'UNLOCK',
    audio: '/media/mixkit-unlock-game-notification-253.wav'
  },
  {
    key: 'X',
    label: 'CLICK',
    audio: '/media/mixkit-video-game-retro-click-237.wav'
  },
  {
    key: 'C',
    label: 'MYSTERY',
    audio: '/media/mixkit-video-game-mystery-alert-234.wav'
  }
]

export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [display, setDisplay] = useState('Turn On')
  const audioRefs = useRef([])
  audioRefs.current = []

  const handleAudio = (e) => {
    audioRefs.current.forEach((element, index) => {
      if (e === element.outerText) {
        element.firstElementChild.play()
        setDisplay(padArray[index].label)
      }
    })
  }

  const handleToggle = () => {
    setIsActive((prevState) => {
      prevState = !prevState
      prevState ? setDisplay('PLAY') : setDisplay('TURN ON')
      return prevState
    })
  }

  const addToRefs = (el) => {
    if (el && !audioRefs.current.includes(el)) {
      audioRefs.current.push(el)
    }
  }

  return (
    <main className={isActive ? '' : 'vignette-radial'} onKeyPress={(e) => handleAudio(e.key.toUpperCase())}>
      <div id={'drum-machine'} >
        <div id={'display'}>{display}</div>
        <div id={'power'}>
          <button id={'powerbutton'} className={isActive ? 'on' : null} onClick={handleToggle}></button>
        </div>
        <div id={'drum-pad'}>
          {isActive ? padArray.map((instance) => {
            return (
              <button
                className={'drum-pad arcade-button'}
                key={instance.key}
                id={instance.key + '-btn'}
                ref={addToRefs}
                onClick={(e) => handleAudio(e.target.innerText.toUpperCase())}
              >
                {instance.key}
                <audio id={instance.key} className={'clip'} key={instance.key} src={instance.audio} preload={'auto'} />
              </button>
            )
          }) : ''}
        </div>
      </div>
      <p className={"copyright"}>Designed and Coded by<br />WDPronovost</p>
    </main>
  )
}

