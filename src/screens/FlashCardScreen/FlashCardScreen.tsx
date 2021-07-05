import { getRandomWordPair } from '@lib'
import { RootContainer } from '@styles'
import React, {
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react'
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
}

const getRandomInvertibleWordPair = (): iInvertibleWordPair => {
  const wordPair = getRandomWordPair()
  return {
    ...wordPair,
    inverted: Math.random() > 0.5,
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

interface iState {
  currentWordPair: iInvertibleWordPair
  nextWordPair: iInvertibleWordPair
}

interface iAction {
  type: string
  payload?: any
}

const initialState: iState = {
  currentWordPair: getRandomInvertibleWordPair(),
  nextWordPair: getRandomInvertibleWordPair(),
}

const reducer = (state: iState, action: iAction): iState => {
  switch (action.type) {
    case 'nextCard':
      return {
        currentWordPair: state.nextWordPair,
        nextWordPair: getRandomInvertibleWordPair(),
      }
    default:
      return {
        ...state,
      }
  }
}

export const FlashCardScreen = () => {
  // const [wordPair, setWordPair] = useState<iInvertibleWordPair>(() =>
  //   getRandomInvertibleWordPair(),
  // )
  // const [nextWordPair, setNextWordPair] = useState<iInvertibleWordPair>(() =>
  //   getRandomInvertibleWordPair(),
  // )
  const [state, dispatch] = useReducer<Reducer<iState, iAction>>(
    reducer,
    initialState,
  )

  // const XEXIT = 100
  const x = useSharedValue(DRAGGER_OFFSET.X)
  const y = useSharedValue(DRAGGER_OFFSET.Y)
  const flip = useSharedValue(0)

  const nextCard = () => {
    x.value = DRAGGER_OFFSET.X
    y.value = DRAGGER_OFFSET.Y
    dispatch({ type: 'nextCard' })
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
          flip.value = withSpring(0)
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
  //         timer.value = 0
  //         timer.value = withTiming(100, { duration: 2400 }, () => {
  //           runOnJS(setIsRevealed)(true)
  //           runOnJS(nextCard)()
  //         })
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

  // const backgroundStyle = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor:
  //   }
  // })

  // const bgc = interpolateColors(flip.value, {
  //   inputRange: [0, 1],
  //   outputColorRange: ['rgba(0, 255, 0, 1)', 'rgba(0, 255, 255, 1)'],
  // })
  // console.log(bgc.value)

  const flipStyle = useAnimatedStyle(() => {
    return {
      height: '100%',
      transform: [
        { translateY: -190 },
        { rotateX: `${flip.value * 180}deg` },
        { translateY: 190 },
        { perspective: 50000 },
      ],
    }
  })

  const currentText = useAnimatedStyle(() => {
    const display = flip.value >= 0.5 ? 'none' : 'flex'
    return { display }
  })

  const nextText = useAnimatedStyle(() => {
    const display = flip.value < 0.5 ? 'none' : 'flex'
    console.log('next', display)
    return {
      display,
      transform: [{ rotateX: `180deg` }],
    }
  })

  return (
    <RootContainer>
      <CardTapContainer onPress={() => {}}>
        <CardsContainer>
          <Half>
            <Card>
              <CardCaption>
                {getWordForInvertibleWordPair({
                  wordPair: state.currentWordPair,
                  wordIndex: 0,
                })}{' '}
              </CardCaption>
            </Card>
          </Half>
          <Half>
            <PanGestureHandler onGestureEvent={onFlipGestureEvent}>
              <Card style={[flipStyle]}>
                <CardCaption style={[currentText, { backgroundColor: 'red' }]}>
                  {getWordForInvertibleWordPair({
                    wordPair: state.currentWordPair,
                    wordIndex: 1,
                  })}{' '}
                </CardCaption>
                <CardCaption style={nextText}>
                  {getWordForInvertibleWordPair({
                    wordPair: state.nextWordPair,
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
