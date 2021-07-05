import 'react-native-gesture-handler' // needs to be first import acc to docs
import { FlashCardScreen } from '@screens'
import React from 'react'

import Amplify from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config)

const App = () => {
  return <FlashCardScreen />
}

export default App
