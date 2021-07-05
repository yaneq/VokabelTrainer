import { Text } from '@styles'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const ScoreContainer = styled.View`
  height: 80px;
  background-color: #fae1df;
`

export const Score = styled.View`
  flex: 1;
  background-color: white;
  margin: 10px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`
export const ScoreCaption = styled(Text)`
  font-weight: bold;
  font-size: 25px;
`

export const QuestionContainer = styled.View`
  flex: 1;
  background-color: #fae1df;
  justify-content: center;
  align-items: center;
`

export const QuestionCaption = styled(Animated.Text)`
  font-size: 46px;
  color: #007;
  font-family: 'Caveat';
`

export const AnswersContainer = styled.View`
  flex: 1;
  background-color: white;
  margin: 10px;
`

interface iAnswerContainer {
  revealed: boolean
  correct: boolean
  wrong: boolean
}

const getAnswerColor = ({ revealed, correct, wrong }: iAnswerContainer) => {
  let color = '#fae1df'
  if (revealed && correct) color = '#efd'
  if (revealed && wrong) color = '#faa'
  return color
}

export const AnswerContainer = styled.TouchableOpacity<iAnswerContainer>`
  flex: 1;
  background-color: ${getAnswerColor};
  justify-content: center;
  padding-left: 30px;
  border-radius: 10px;
  margin: 10px;
`

export const AnswerCaption = styled(Animated.Text)`
  font-size: 18px;
  font-weight: bold;
`

// '#afe2f3'
export const Card = styled(Animated.View)<{ index?: number }>`
  flex: 1;
  background-color: #fae1df;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 100%;
`
