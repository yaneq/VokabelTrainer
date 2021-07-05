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

export const ScoreBackground = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #aca;
  border-radius: 20px;
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

export const ScoreTime = styled(Text)`
  font-size: 12px;
  color: red;
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
  padding: 10px;
`

interface iAnswerContainer {
  revealed: boolean
  correct: boolean
  wrong: boolean
}

const getAnswerColor = ({ revealed, correct, wrong }: iAnswerContainer) => {
  let color = '#fae1df'
  if (revealed && correct) {
    color = '#8c8'
  }
  if (revealed && wrong) {
    color = '#faa'
  }
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

export const StartGameContainer = styled.View`
  background-color: #fae1df;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const StartGameButton = styled.TouchableHighlight`
  background-color: white;
  padding: 40px 60px;
  border-radius: 20px;
`

export const StartGameButtonCaption = styled(Text)`
  font-size: 36px;
  color: #007;
  font-family: 'Caveat';
`
