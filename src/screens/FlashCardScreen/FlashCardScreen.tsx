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
  Half,
} from './styles'
import Animated, {
  interpolate,
  interpolateColors,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Dimensions } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { listWordPairs } from '@graphqlQueries'
import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { ListWordPairsQuery } from '../../API'

const Screen = Dimensions.get('screen')
const DRAGGER_OFFSET = {
  X: Screen.width * 0.1,
  Y: 70,
}

interface iInvertibleWordPair extends iWordPair {
  inverted: boolean
  index: number
}

const getRandomInvertibleWordPair = (
  previous?: iInvertibleWordPair,
): iInvertibleWordPair => {
  const wordPair = getRandomWordPair()
  return {
    ...wordPair,
    inverted: Math.random() > 0.5,
    index: (previous && previous.index + 1) || 0,
  }
}

const getWordForInvertibleWordPair = ({
  wordPair,
  wordIndex,
}: {
  wordPair: iInvertibleWordPair
  wordIndex: number
}) => {
  const language =
    (!wordPair.inverted && wordIndex === 1) ||
    (wordPair.inverted && wordIndex === 0)
      ? 'german'
      : 'spanish'
  return wordPair[language]
}

export const FlashCardScreen = () => {
  const [wordPair, setWordPair] = useState<iInvertibleWordPair>(() =>
    getRandomInvertibleWordPair(),
  )
  const [nextWordPair, setNextWordPair] = useState<iInvertibleWordPair>(() =>
    getRandomInvertibleWordPair(wordPair),
  )
  // const [isRevealed, setIsRevealed] = useState(false)

  // const XEXIT = 100
  const x = useSharedValue(DRAGGER_OFFSET.X)
  const y = useSharedValue(DRAGGER_OFFSET.Y)
  const flip = useSharedValue(0)

  const nextCard = () => {
    x.value = DRAGGER_OFFSET.X
    y.value = DRAGGER_OFFSET.Y
    setWordPair(nextWordPair)
    setTimeout(() => setNextWordPair(getRandomInvertibleWordPair()), 200)
    flip.value = 0
    // setIsRevealed(false)
  }

  // const fetchWordPairs = async () => {
  //   const results = (await API.graphql(
  //     graphqlOperation(listWordPairs),
  //   )) as GraphQLResult<ListWordPairsQuery>
  //   console.log('results', { results })
  //   const items = results.data?.listWordPairs?.items
  //   return items
  // }

  // useEffect(() => {
  //   fetchWordPairs()
  //     .then(items => {
  //       console.log('response from server', { items })
  //     })
  //     .catch(() => console.log('error loading stuff from server'))
  // }, [])

  const onFlipGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {},
      onActive: event => {
        let val = (Screen.height - event.absoluteY) / Screen.height
        flip.value = val
      },
      onEnd: event => {
        let val = (Screen.height - event.absoluteY) / Screen.height
        if (val < 0.5) {
          flip.value = withTiming(0)
        }
        if (val >= 0.5) {
          flip.value = withSpring(1, {}, () => runOnJS(nextCard)())
        }
      },
    })

  // const onRevealGestureEvent =
  //   useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
  //     onStart: () => {},
  //     onActive: event => {
  //       x.value = DRAGGER_OFFSET.X + event.translationX
  //       y.value = DRAGGER_OFFSET.Y + event.translationY
  //     },
  //     onEnd: event => {
  //       if (
  //         Math.abs(event.translationX) > XEXIT ||
  //         Math.abs(event.translationY) > XEXIT
  //       ) {
  //         x.value = withSpring(DRAGGER_OFFSET.X + event.translationX * 6)
  //         y.value = withSpring(DRAGGER_OFFSET.Y + event.translationY * 6)
  //       } else {
  //         x.value = withSpring(DRAGGER_OFFSET.X)
  //         y.value = withSpring(DRAGGER_OFFSET.Y)
  //       }
  //     },
  //   })

  // const dragStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: x.value },
  //       { translateY: y.value },
  //       { rotateZ: `${-(x.value - DRAGGER_OFFSET.X) / 25}deg` },
  //     ],
  //   }
  // })

  const flipStyle = useAnimatedStyle(() => {
    const darken = (0.5 - Math.abs(flip.value - 0.5)) * 100
    const rgba = `rgb(${250 - darken},${225 - darken},${223 - darken})`
    return {
      height: '100%',
      backgroundColor: rgba,
      transform: [
        { translateY: -190 },
        { rotateX: `${flip.value * 180}deg` },
        { translateY: 190 },
        { perspective: 50000 },
      ],
    }
  })

  const currentText = useAnimatedStyle(() => {
    return {
      display: flip.value >= 0.5 ? 'none' : 'flex',
    }
  })

  const nextText = useAnimatedStyle(() => {
    return {
      display: flip.value < 0.5 ? 'none' : 'flex',
      transform: [{ rotateX: `180deg` }],
    }
  })

  return (
    <RootContainer>
      <CardTapContainer onPress={() => {}}>
        <CardsContainer>
          <Half>
            <Card index={wordPair.index}>
              <CardCaption>
                {getWordForInvertibleWordPair({ wordPair, wordIndex: 0 })}{' '}
              </CardCaption>
            </Card>
          </Half>
          <Half>
            <CardCoverContainer>
              <Card index={nextWordPair.index}>
                <CardCaption>
                  {getWordForInvertibleWordPair({
                    wordPair: nextWordPair,
                    wordIndex: 1,
                  })}{' '}
                </CardCaption>
              </Card>
            </CardCoverContainer>
            <PanGestureHandler onGestureEvent={onFlipGestureEvent}>
              <Card style={[flipStyle]}>
                <CardCaption style={currentText}>
                  {getWordForInvertibleWordPair({ wordPair, wordIndex: 1 })}{' '}
                </CardCaption>
                <CardCaption style={nextText}>
                  {getWordForInvertibleWordPair({
                    wordPair: nextWordPair,
                    wordIndex: 0,
                  })}{' '}
                </CardCaption>
              </Card>
            </PanGestureHandler>
          </Half>
          {/* {!isRevealed && (
            <CardCoverContainer>
              <PanGestureHandler onGestureEvent={onRevealGestureEvent}>
                <Animated.View style={dragStyle}>
                  <CardCover>
                    <MCIcon name="drag-variant" color="#b2ad5f" size={90} />
                  </CardCover>
                </Animated.View>
              </PanGestureHandler>
            </CardCoverContainer>
          )} */}
        </CardsContainer>
      </CardTapContainer>
    </RootContainer>
  )
}
