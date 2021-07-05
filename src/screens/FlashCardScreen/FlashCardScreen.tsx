import { getRandomQuestion } from '@lib'
import { RootContainer } from '@styles'
import React, { useState } from 'react'
import { iQuestion } from '@types'
import {
  AnswerCaption,
  AnswerContainer,
  AnswersContainer,
  QuestionCaption,
  QuestionContainer,
  Score,
  ScoreCaption,
  ScoreContainer,
} from './styles'

export const FlashCardScreen = () => {
  const [question, setQuestion] = useState<iQuestion>(() => getRandomQuestion())
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState<number>(-1)
  const [score, setScore] = useState(0)
  const nextQuestion = () => {
    setSelectedSolutionIndex(-1)
    setQuestion(getRandomQuestion())
  }

  const resolve = (index: number) => {
    setSelectedSolutionIndex(index)
    index === question.solutionIndex ? setScore(score + 1) : setScore(0)
  }

  return (
    <RootContainer>
      <ScoreContainer>
        <Score>
          <ScoreCaption>{score} Punkte</ScoreCaption>
        </Score>
      </ScoreContainer>
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
    </RootContainer>
  )
}
