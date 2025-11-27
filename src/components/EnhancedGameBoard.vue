<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Game Configuration -->
    <div v-if="!gameState.gameStarted" class="bg-white rounded-lg shadow-lg p-8 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Game Settings</h2>
      
      <div class="max-w-md mx-auto space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
          <select 
            v-model="gameSettings.difficulty"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">Easy (45s per question)</option>
            <option value="medium">Medium (30s per question)</option>
            <option value="hard">Hard (20s per question)</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
          <input 
            v-model.number="gameSettings.totalQuestions"
            type="number"
            min="5"
            max="50"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          @click="startGame"
          class="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Start Game
        </button>
      </div>
    </div>

    <!-- Game Progress Bar -->
    <div v-if="gameState.gameStarted && !gameState.gameEnded" class="mb-6">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700">
            Question {{ gameProgress.current }} of {{ gameProgress.total }}
          </span>
          <span class="text-sm font-medium text-gray-700">
            Score: {{ gameState.score }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-blue-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: gameProgress.percentage + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Game Board -->
    <div v-if="gameState.gameStarted && !gameState.gameEnded && currentQuestion" class="bg-white rounded-lg shadow-lg p-8">
      <!-- Timer -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-bold">⏱</span>
          </div>
          <span class="text-lg font-semibold text-gray-800">
            {{ gameState.timeRemaining }}s
          </span>
        </div>
        
        <div class="flex space-x-2">
          <button
            @click="useHint"
            :disabled="hintUsed"
            class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
          >
            💡 Hint{{ hintUsed ? ' Used' : '' }}
          </button>
          
          <button
            @click="skipQuestion"
            :disabled="hasAnswered"
            class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
          >
            ⏭ Skip
          </button>
        </div>
      </div>

      <!-- Question -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">
          What is the capital of
        </h2>
        <h3 class="text-4xl font-bold text-blue-600 mb-6">
          {{ currentQuestion.country.name }}?
        </h3>
        
        <!-- Hint Display -->
        <div v-if="hintUsed && currentHint" class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-yellow-800 font-medium">Hint: {{ currentHint }}</p>
        </div>
      </div>

      <!-- Answer Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          v-for="option in currentQuestion.options"
          :key="option"
          @click="selectAnswer(option)"
          :disabled="hasAnswered"
          :class="[
            'p-4 text-lg font-medium rounded-lg border-2 transition-all duration-200',
            'hover:scale-105 hover:shadow-lg',
            hasAnswered && option === currentQuestion.correctAnswer 
              ? 'bg-green-100 border-green-500 text-green-800'
              : hasAnswered && option === userAnswer && option !== currentQuestion.correctAnswer
              ? 'bg-red-100 border-red-500 text-red-800'
              : 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-blue-50 hover:border-blue-300'
          ]"
        >
          {{ option }}
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="showFeedback" class="text-center mb-6">
        <div :class="[
          'p-4 rounded-lg border-2',
          isCorrect 
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        ]">
          <p class="text-lg font-semibold">
            {{ isCorrect ? '🎉 Correct! Well done!' : '❌ Incorrect. The correct answer is:' }}
          </p>
          <p v-if="!isCorrect" class="text-lg font-bold mt-1">
            {{ currentQuestion.correctAnswer }}
          </p>
        </div>
      </div>

      <!-- Next Question Button -->
      <div v-if="hasAnswered" class="text-center">
        <button
          @click="goToNextQuestion"
          class="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          {{ gameProgress.current < gameProgress.total ? 'Next Question' : 'Finish Game' }}
        </button>
      </div>
    </div>

    <!-- Game Over -->
    <div v-if="gameState.gameEnded" class="bg-white rounded-lg shadow-lg p-8 text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">🎉 Game Complete!</h2>
      
      <div class="mb-6">
        <div class="text-6xl font-bold text-blue-600 mb-2">
          {{ scorePercentage }}%
        </div>
        <p class="text-lg text-gray-600">
          You scored {{ gameState.score }} out of {{ gameState.totalQuestions }}
        </p>
        
        <div class="mt-4 p-4 bg-blue-50 rounded-lg">
          <p class="text-blue-800 font-medium">
            {{ getScoreMessage(scorePercentage) }}
          </p>
        </div>
      </div>

      <div class="flex justify-center space-x-4">
        <button
          @click="restartGame"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Play Again
        </button>
        
        <button
          @click="goToSettings"
          class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
        >
          Change Settings
        </button>
      </div>
    </div>

    <!-- Multiplayer Status -->
    <div v-if="isConnected" class="mt-6 bg-white rounded-lg shadow p-4">
      <div class="flex justify-between items-center mb-3">
        <h3 class="font-semibold text-gray-800">👥 Players Online</h3>
        <span class="text-sm text-gray-600">Room: {{ roomInfo?.id }}</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div
          v-for="player in leaderboard"
          :key="player.id"
          :class="[
            'p-2 rounded-lg flex justify-between items-center',
            player.isCurrentPlayer ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50'
          ]"
        >
          <div class="flex items-center space-x-2">
            <span class="text-sm font-bold text-gray-600">#{{ player.rank }}</span>
            <span class="font-medium text-gray-800">{{ player.name }}</span>
            <span v-if="player.isCurrentPlayer" class="text-xs text-blue-600">(You)</span>
          </div>
          <span class="font-bold text-blue-600">{{ player.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useGameLogic } from '../composables/useGameLogic'
import { useMultiplayer } from '../composables/useMultiplayer'

const {
  gameState,
  currentQuestion,
  userAnswer,
  hasAnswered,
  isCorrect,
  showFeedback,
  gameProgress,
  scorePercentage,
  initializeGame,
  submitAnswer,
  nextQuestion,
  restartGame,
  getHint,
  skipQuestion
} = useGameLogic()

const {
  currentPlayer,
  isConnected,
  connect,
  disconnect,
  updateScore,
  getLeaderboard,
  getRoomInfo
} = useMultiplayer()

const gameSettings = ref({
  difficulty: 'medium' as 'easy' | 'medium' | 'hard',
  totalQuestions: 10
})

const hintUsed = ref(false)
const currentHint = ref('')

const leaderboard = computed(() => {
  const base = getLeaderboard()
  const currentId = currentPlayer.value?.id
  return base.map(p => ({
    ...p,
    isCurrentPlayer: p.id === currentId
  }))
})
const roomInfo = computed(() => getRoomInfo())

let timerInterval: number | null = null

const startGame = async () => {
  if (!currentPlayer.value) {
    await connect('Player')
  }
  
  await initializeGame(gameSettings.value.difficulty, gameSettings.value.totalQuestions)
  startTimer()
}

const startTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  
  timerInterval = setInterval(() => {
    if (gameState.value.timeRemaining > 0 && !hasAnswered.value) {
      gameState.value.timeRemaining--
    } else if (gameState.value.timeRemaining === 0 && !hasAnswered.value) {
      // Time's up, auto-submit empty answer
      selectAnswer('')
    }
  }, 1000)
}

const selectAnswer = (answer: string) => {
  const correct = submitAnswer(answer)
  
  if (currentPlayer.value) {
    updateScore(currentPlayer.value.id, gameState.value.score)
  }
  
  // Stop timer when answer is submitted
  if (timerInterval) {
    clearInterval(timerInterval)
  }
}

const goToNextQuestion = () => {
  const hasMoreQuestions = nextQuestion()
  if (hasMoreQuestions) {
    hintUsed.value = false
    currentHint.value = ''
    startTimer()
  }
}

const useHint = () => {
  if (hintUsed.value || !currentQuestion.value) return
  
  hintUsed.value = true
  currentHint.value = getHint()
}

const getScoreMessage = (percentage: number): string => {
  if (percentage >= 90) return '🏆 Excellent! You\'re a geography expert!'
  if (percentage >= 80) return '🥇 Great job! You know your capitals well!'
  if (percentage >= 70) return '🥈 Good work! Keep practicing!'
  if (percentage >= 60) return '🥉 Not bad! There\'s room for improvement.'
  return '📚 Keep studying! You\'ll get better with practice.'
}

const goToSettings = () => {
  gameState.value.gameStarted = false
  gameState.value.gameEnded = false
  if (timerInterval) {
    clearInterval(timerInterval)
  }
}

onMounted(() => {
  // Auto-connect if player name exists
  const savedPlayerName = localStorage.getItem('playerName')
  if (savedPlayerName) {
    connect(savedPlayerName)
  }
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  disconnect()
})
</script>