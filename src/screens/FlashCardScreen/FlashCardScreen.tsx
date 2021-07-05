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
  Score,
  ScoreBackground,
  ScoreCaption,
  ScoreContainer,
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

const LEVEL_LENGTH = 3

export const FlashCardScreen = () => {
  const [question, setQuestion] = useState<iQuestion>(() => getRandomQuestion())
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState<number>(-1)
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [timerStartedAt, setTimerStartedAt] = useState<any>(null)
  const [completedCount, setCompletedCount] = useState(0)
  const [secondsPassed, setSecondsPassed] = useState(0)
  const sharedCompletedCount = useSharedValue(0)
  const timer = useRef()

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
        finishGame()
      } else {
        SoundPlayer.playSoundFile('correct', 'wav')
      }
    } else {
      finishGame()
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

  const finishGame = useCallback(() => {
    setIsGameRunning(false)
    const _completionTime =
      Math.floor((new Date().getTime() - timerStartedAt.getTime()) / 100) / 10
    setSecondsPassed(_completionTime)
  }, [timerStartedAt])

  const resetGame = useCallback(() => {
    setIsGameRunning(false)
    setTimerStartedAt(null)
    setCompletedCount(0)
    setSelectedSolutionIndex(-1)
  }, [])

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
          <ScoreCaption>{secondsPassed}</ScoreCaption>

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
