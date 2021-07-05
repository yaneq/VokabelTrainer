export interface iWordPair {
  spanish: string
  german: string
}

export type tLanguage = 'german' | 'spanish'
export interface iQuestion {
  questionLanguage: tLanguage
  solutionLanguage: tLanguage
  question: string
  answers: string[]
  solutionIndex: number
}
