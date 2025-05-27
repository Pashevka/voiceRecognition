import React from 'react'
import { MicStartStop } from './MicStartStop'
import classNames from 'clsx'

import styles from './styles.module.scss'
import { useState } from 'react'
import { APP_STATE } from './constants'
import { TextBlock } from './TextBlock'
function App() {

  const [appState, setAppState] = useState(APP_STATE.START)
  console.log("🚀 ~ App ~ appState:", appState)

  return (
    <div className={styles.app}>
      <MicStartStop appState={appState} setAppState={setAppState} />
      <div className={classNames(styles.title, appState !== APP_STATE.START && styles.listening)}>Press to start transcribing</div>
      <TextBlock
        appState={appState}
        setAppState={setAppState}
      />
    </div>
  )
}

export default App
