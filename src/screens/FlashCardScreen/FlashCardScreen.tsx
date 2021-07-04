import { getRandomWordPair } from '@lib'
import { RootContainer } from '@styles'
import React, { useCallback, useEffect, useState } from 'react'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { iWordPair } from '@types'
import {
  Card,
  CardCaption,
  CardCover,
  CardCoverContainer,
  CardsContainer,
  CardTapContainer,
} from './styles'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Dimensions } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const Screen = Dimensions.get('screen')
const DRAGGER_OFFSET = {
  X: Screen.width * 0.1,
  Y: 70,
}

export const FlashCardScreen = () => {
  const [wordPair, setWordPair] = useState<iWordPair>()
  const [isInverted, setIsInverted] = useState<boolean>(false)

  const XEXIT = 100
  const x = useSharedValue(DRAGGER_OFFSET.X)
  const y = useSharedValue(DRAGGER_OFFSET.Y)
  const timer = useSharedValue(0)

  const nextCard = useCallback(() => {
    x.value = DRAGGER_OFFSET.X
    y.value = DRAGGER_OFFSET.Y
    setIsInverted(Math.random() > 0.5)
    setWordPair(getRandomWordPair())
  }, [x, y])

  useEffect(() => {
    nextCard()
  }, [nextCard])

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {},
      onActive: event => {
        x.value = DRAGGER_OFFSET.X + event.translationX
        y.value = DRAGGER_OFFSET.Y + event.translationY
      },
      onEnd: event => {
        if (
          Math.abs(event.translationX) > XEXIT ||
          Math.abs(event.translationY) > XEXIT
        ) {
          x.value = withSpring(DRAGGER_OFFSET.X + event.translationX * 4)
          y.value = withSpring(DRAGGER_OFFSET.Y + event.translationY * 4)
          timer.value = 0
          timer.value = withTiming(100, { duration: 2400 }, () => {
            runOnJS(nextCard)()
          })
        } else {
          x.value = withSpring(DRAGGER_OFFSET.X)
          y.value = withSpring(DRAGGER_OFFSET.Y)
        }
      },
    })

  const dragStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { rotateZ: `${-(x.value - DRAGGER_OFFSET.X) / 25}deg` },
      ],
    }
  })

  return (
    <RootContainer>
      <CardTapContainer onPress={() => {}}>
        <CardsContainer>
          <Card inverse={!isInverted}>
            <CardCaption>
              {isInverted ? wordPair?.german : wordPair?.spanish}{' '}
            </CardCaption>
          </Card>

          <Card inverse={isInverted}>
            <CardCaption>
              {!isInverted ? wordPair?.german : wordPair?.spanish}{' '}
            </CardCaption>
          </Card>
          <CardCoverContainer>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={dragStyle}>
                <CardCover>
                  <MCIcon name="drag-variant" color="#b2ad5f" size={90} />
                </CardCover>
              </Animated.View>
            </PanGestureHandler>
          </CardCoverContainer>
        </CardsContainer>
      </CardTapContainer>
    </RootContainer>
  )
}
