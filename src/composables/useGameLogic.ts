import { ref, computed } from 'vue'
import { 
  countriesData,
  getRandomCountries,
  preloadCountries,
  getCountriesCount,
  type Country
} from './useCountries'

export interface GameState {
  currentQuestion: number
  score: number
  totalQuestions: number
  gameStarted: boolean
  gameEnded: boolean
  timeRemaining: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Question {
  country: Country
  options: string[]
  correctAnswer: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export const useGameLogic = () => {
  const gameState = ref<GameState>({
    currentQuestion: 0,
    score: 0,
    totalQuestions: 10,
    gameStarted: false,
    gameEnded: false,
    timeRemaining: 30,
    difficulty: 'medium'
  })

  const currentQuestion = ref<Question | null>(null)
  const questions = ref<Question[]>([])
  const userAnswer = ref('')
  const hasAnswered = ref(false)
  const isCorrect = ref(false)
  const showFeedback = ref(false)

  const gameProgress = computed(() => ({
    current: gameState.value.currentQuestion + 1,
    total: gameState.value.totalQuestions,
    percentage: ((gameState.value.currentQuestion + 1) / gameState.value.totalQuestions) * 100
  }))

  const scorePercentage = computed(() => 
    Math.round((gameState.value.score / gameState.value.totalQuestions) * 100)
  )

  const generateQuestion = (country: Country, difficulty: 'easy' | 'medium' | 'hard'): Question => {
    const allCapitals = countriesData.map(c => c.capital)
    const wrongAnswers = allCapitals
      .filter(capital => capital !== country.capital)
      .sort(() => 0.5 - Math.random())
      .slice(0, difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4)

    const options = [country.capital, ...wrongAnswers].sort(() => 0.5 - Math.random())

    return {
      country,
      options,
      correctAnswer: country.capital,
      difficulty
    }
  }

  const initializeGame = async (difficulty: 'easy' | 'medium' | 'hard' = 'medium', totalQuestions: number = 10) => {
    await preloadCountries()
    const maxQuestions = Math.min(totalQuestions, getCountriesCount())
    gameState.value = {
      currentQuestion: 0,
      score: 0,
      totalQuestions: maxQuestions,
      gameStarted: true,
      gameEnded: false,
      timeRemaining: difficulty === 'easy' ? 45 : difficulty === 'medium' ? 30 : 20,
      difficulty
    }

    // Generate questions
    const selectedCountries = getRandomCountries(maxQuestions)
    questions.value = selectedCountries.map(country => 
      generateQuestion(country, difficulty)
    )

    currentQuestion.value = questions.value[0]
    userAnswer.value = ''
    hasAnswered.value = false
    isCorrect.value = false
    showFeedback.value = false
  }

  const submitAnswer = (answer: string): boolean => {
    if (!currentQuestion.value || hasAnswered.value) return false

    userAnswer.value = answer
    hasAnswered.value = true
    showFeedback.value = true

    const correct = answer.toLowerCase().trim() === currentQuestion.value.correctAnswer.toLowerCase().trim()
    isCorrect.value = correct

    if (correct) {
      gameState.value.score++
    }

    return correct
  }

  const nextQuestion = (): boolean => {
    if (gameState.value.currentQuestion >= gameState.value.totalQuestions - 1) {
      endGame()
      return false
    }

    gameState.value.currentQuestion++
    currentQuestion.value = questions.value[gameState.value.currentQuestion]
    userAnswer.value = ''
    hasAnswered.value = false
    isCorrect.value = false
    showFeedback.value = false
    gameState.value.timeRemaining = gameState.value.difficulty === 'easy' ? 45 : 
                                   gameState.value.difficulty === 'medium' ? 30 : 20

    return true
  }

  const endGame = () => {
    gameState.value.gameEnded = true
    gameState.value.gameStarted = false
  }

  const restartGame = async () => {
    await initializeGame(gameState.value.difficulty, gameState.value.totalQuestions)
  }

  const getHint = (): string => {
    if (!currentQuestion.value) return ''
    
    const capital = currentQuestion.value.correctAnswer
    const hintLength = Math.ceil(capital.length * 0.3) // Show 30% of letters
    
    let hint = ''
    for (let i = 0; i < capital.length; i++) {
      if (i < hintLength) {
        hint += capital[i]
      } else if (capital[i] === ' ') {
        hint += ' '
      } else {
        hint += '_'
      }
    }
    
    return hint
  }

  const skipQuestion = (): void => {
    if (hasAnswered.value) return
    
    hasAnswered.value = true
    showFeedback.value = true
    isCorrect.value = false
  }

  return {
    gameState,
    currentQuestion,
    questions,
    userAnswer,
    hasAnswered,
    isCorrect,
    showFeedback,
    gameProgress,
    scorePercentage,
    initializeGame,
    submitAnswer,
    nextQuestion,
    endGame,
    restartGame,
    getHint,
    skipQuestion
  }
}