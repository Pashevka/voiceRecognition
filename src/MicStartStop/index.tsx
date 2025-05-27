import React from 'react'
import micIcon from './assets/mic.svg'
import classNames from 'clsx'
import styles from './styles.module.scss'
import { APP_STATE } from '../constants'
export interface IMicStartStopProps {
    appState: APP_STATE
    setAppState: (state: APP_STATE) => void
}

export const MicStartStop: React.FC<IMicStartStopProps> = ({ appState, setAppState }) => {
    const onClick = () => {
        if (appState === APP_STATE.LISTENING) {
            setAppState(APP_STATE.PAUSE_LISTENING)
        } else if (appState === APP_STATE.PAUSE_LISTENING) {
            setAppState(APP_STATE.LISTENING)
        } else {
            setAppState(APP_STATE.LISTENING)
        }
    }
    return <div
        className={classNames(
            styles.container,
            appState === APP_STATE.LISTENING && styles.listening,
            appState === APP_STATE.PAUSE_LISTENING && classNames(styles.listening, styles.paused)
        )}
        onClick={onClick}>
        <div className={styles.border} />
        <img src={micIcon} className={styles.icon} />
        <div className={styles.stopIcon} />
    </div>
}