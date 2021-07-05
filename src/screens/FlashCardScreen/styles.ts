import { ScribbleText } from '@styles'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const CardTapContainer = styled.TouchableWithoutFeedback`
  flex: 1;
`

export const CardsContainer = styled.View`
  flex: 1;
`
// '#fae1df'
export const Card = styled(Animated.View)`
  flex: 1;
  background-color: #afe2f3;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const Half = styled.View`
  width: 100%;
  height: 50%;
`

export const LowerCardContainer = styled.View`
  position: relative;
  background-color: red;
`

export const CardCoverContainer = styled.View`
  flex: 1;
  position: absolute;
  height: 50%;
  width: 100%;
  bottom: 0px;
  left: 0px;
  background-color: orange;
`

export const CardCover = styled.View`
  background-color: #f2ed9f;
  width: 80%;
  height: 80%;
  border-radius: 20px;
  box-shadow: 2px 2px 8px #000;
  shadow-opacity: 0.3;
  justify-content: center;
  align-items: center;
`

export const CardCaption = styled(Animated.Text)`
  font-size: 46px;
  color: #007;
  font-family: 'Caveat';
`
