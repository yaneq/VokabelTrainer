import { getRandomQuestion } from '@lib'
import { RootContainer } from '@styles'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { iQuestion } from '@types'
import {
  AnswerCaption,
  AnswerContainer,
  AnswersContainer,
  QuestionCaption,
  QuestionContainer,
  RecordTimeListCaption,
  RecordTimeListEntry,
  RecordTimesContainer,
  Score,
  ScoreBackground,
  ScoreCaption,
  ScoreContainer,
  ScoreSideCaption,
  ScoreSideCaptionContainer,
  StartGameButton,
  StartGameButtonCaption,
  StartGameContainer,
} from './styles'
import SoundPlayer from 'react-native-sound-player'
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import {
  ActivityIndicator,
  Alert,
  AppState,
  AppStateStatus,
  View,
} from 'react-native'
import { RecordTime } from '../../API'

const LEVEL_LENGTH = 6

export const FlashCardScreen = () => {
  const [question, setQuestion] = useState<iQuestion>(() => getRandomQuestion())
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState<number>(-1)
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [timerStartedAt, setTimerStartedAt] = useState<any>(null)
  const [completedCount, setCompletedCount] = useState(0)
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [recordTimes, setRecordTimes] = useState<RecordTime[] | null>(null)
  const sharedCompletedCount = useSharedValue(0)
  const timer = useRef<any>()

  useEffect(() => {
    sharedCompletedCount.value = completedCount
  }, [sharedCompletedCount, completedCount])

  useEffect(() => {
    const subscription = SoundPlayer.addEventListener(
      'FinishedLoading',
      () => {},
    )
    return () => {
      subscription.remove()
    }
  }, [])

  const updateRecordTimes = async () => {
    const _recordTimes = await fetchRecordTimes()
    setRecordTimes(_recordTimes || null)
  }

  const nextQuestion = () => {
    if (
      (selectedSolutionIndex >= 0 &&
        selectedSolutionIndex !== question.solutionIndex) ||
      completedCount >= LEVEL_LENGTH
    ) {
      resetGame()
    } else {
      setSelectedSolutionIndex(-1)
      setQuestion(getRandomQuestion())
    }
  }

  const resolve = (index: number) => {
    setSelectedSolutionIndex(index)
    if (index === question.solutionIndex) {
      setCompletedCount(completedCount + 1)
      if (completedCount + 1 >= LEVEL_LENGTH) {
        SoundPlayer.playSoundFile('levelUp', 'wav')
        finishGame({ success: true })
      } else {
        SoundPlayer.playSoundFile('correct', 'wav')
      }
    } else {
      finishGame({ success: false })
      SoundPlayer.playSoundFile('fail', 'wav')
    }
  }

  useEffect(() => {
    SoundPlayer.loadSoundFile('fail', 'wav')
    SoundPlayer.loadSoundFile('correct', 'wav')
    SoundPlayer.loadSoundFile('levelUp', 'wav')
    return () => {}
  }, [])

  const scoreBackgroundStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${(sharedCompletedCount.value / LEVEL_LENGTH) * 100}%`,
      ),
      backgroundColor:
        sharedCompletedCount.value >= LEVEL_LENGTH ? '#aca' : '#fb0',
    }
  })

  const startGame = useCallback(() => {
    setIsGameRunning(true)
    setTimerStartedAt(new Date())
    setCompletedCount(0)
    setSecondsPassed(0)
  }, [])

  const resetGame = useCallback(() => {
    setIsGameRunning(false)
    setTimerStartedAt(null)
    setCompletedCount(0)
    setSelectedSolutionIndex(-1)
  }, [])

  const finishGame = useCallback(
    ({ success }: { success: boolean }) => {
      setIsGameRunning(false)
      const _completionTime =
        Math.floor((new Date().getTime() - timerStartedAt.getTime()) / 10) / 100
      setSecondsPassed(_completionTime)
      if (success) {
        let longestTimeInRecords: Number | null = null
        if (recordTimes && recordTimes.length > 0) {
          longestTimeInRecords = recordTimes[recordTimes.length - 1].time
        }
        if (
          !longestTimeInRecords ||
          (longestTimeInRecords && _completionTime < longestTimeInRecords)
        ) {
          Alert.prompt(
            'Glückwunsch!',
            'Das ist ein neuer Rekord. Wie ist dein Name?',
            async name => {
              resetGame()
              setRecordTimes(null)
              await saveRecordTime({ name, time: _completionTime })
              updateRecordTimes()
            },
          )
        }
      } else {
        updateRecordTimes()
      }
    },
    [timerStartedAt, resetGame, recordTimes],
  )

  useEffect(() => {
    if (isGameRunning) {
      timer.current = setInterval(() => {
        const now = new Date()
        const _secondsPassed = Math.floor(
          (now.getTime() - timerStartedAt.getTime()) / 1000,
        )
        setSecondsPassed(_secondsPassed)
      }, 1000)
    } else {
      if (timer.current) {
        clearInterval(timer.current)
        timer.current = null
      }
    }
  }, [isGameRunning, timerStartedAt])

  return (
    <RootContainer style={{ backgroundColor: '#fae1df' }}>
      <ScoreContainer>
        <Score>
          <ScoreBackground style={scoreBackgroundStyle} />
          <View style={{ flexDirection: 'row' }}>
            <ScoreCaption>{secondsPassed}</ScoreCaption>
            <ScoreSideCaptionContainer>
              <ScoreSideCaption>Sekunden</ScoreSideCaption>
            </ScoreSideCaptionContainer>
          </View>
          {/* {lastLevelTime && (
            <ScoreTime>Last level: {lastLevelTime} seconds</ScoreTime>
          )} */}
        </Score>
      </ScoreContainer>
      {!!timerStartedAt && (
        <>
          <QuestionContainer>
            <QuestionCaption>{question.question} </QuestionCaption>
          </QuestionContainer>
          <AnswersContainer>
            {question.answers.map((answer, index) => (
              <AnswerContainer
                key={index}
                revealed={selectedSolutionIndex >= 0}
                correct={question.solutionIndex === index}
                wrong={
                  selectedSolutionIndex === index &&
                  index !== question.solutionIndex
                }
                onPress={() => {
                  selectedSolutionIndex >= 0 ? nextQuestion() : resolve(index)
                }}>
                <AnswerCaption>{answer}</AnswerCaption>
              </AnswerContainer>
            ))}
          </AnswersContainer>
        </>
      )}
      {!timerStartedAt && (
        <StartGameContainer>
          <RecordTimesContainer>
            {!recordTimes && <ActivityIndicator color="black" size={'large'} />}
            {recordTimes &&
              recordTimes.map((recordTime: RecordTime, index: number) => (
                <RecordTimeListEntry key={index}>
                  <RecordTimeListCaption>
                    {index + 1}. {recordTime.name}
                  </RecordTimeListCaption>
                  <RecordTimeListCaption>
                    {recordTime.time}
                  </RecordTimeListCaption>
                </RecordTimeListEntry>
              ))}
          </RecordTimesContainer>
          <StartGameButton
            onPress={() => {
              startGame()
            }}>
            <StartGameButtonCaption>Start </StartGameButtonCaption>
          </StartGameButton>
        </StartGameContainer>
      )}
    </RootContainer>
  )
}
