import React, { useEffect, useRef } from 'react'
import classNames from 'clsx'
import styles from './styles.module.scss'
import { APP_STATE } from '../constants'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


export interface ITextBlockProps {
    appState: APP_STATE
    setAppState: (state: APP_STATE) => void
}

export const TextBlock: React.FC<ITextBlockProps> = ({ appState, setAppState }) => {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    console.log("🚀 ~ transcript:", transcript)


    useEffect(() => {
        if (appState === APP_STATE.LISTENING) {

            SpeechRecognition.startListening({
                continuous: true,
                language: 'en-EN'
            });
        } else if (appState === APP_STATE.PAUSE_LISTENING) {
            SpeechRecognition.stopListening();
        }
    }, [appState])

    if (appState === APP_STATE.START) {
        return null
    }
    if (!browserSupportsSpeechRecognition) {
        return <span className={classNames(styles.textarea)}>Browser doesn't support speech recognition.</span>;
    }
    return <div className={classNames(styles.container)}>
        <div className={classNames(styles.title)}>{listening ? "Listening..." : 'Paused'}</div>
        <div className={classNames(styles.textarea)}>
            {transcript === '' ? "Say something..." : transcript}
        </div>
    </div>
}