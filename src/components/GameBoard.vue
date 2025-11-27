<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Game Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Capital Guessing Game</h1>
        <p class="text-gray-600">Guess the capital of the country shown!</p>
      </div>

      <!-- Game Stats -->
      <div class="flex justify-between items-center mb-6">
        <div class="text-sm text-gray-600">
          Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}
        </div>
        <div class="text-sm text-gray-600">
          Score: {{ score }}
        </div>
      </div>

      <!-- Current Question -->
      <div v-if="currentCountry" class="text-center mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          What is the capital of {{ currentCountry.name }}?
        </h2>
        
        <!-- Answer Input -->
        <div class="mb-6">
          <input
            v-model="userAnswer"
            @keyup.enter="submitAnswer"
            type="text"
            placeholder="Enter the capital city..."
            class="w-full max-w-md px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            :disabled="hasAnswered"
          />
        </div>

        <!-- Submit Button -->
        <button
          @click="submitAnswer"
          :disabled="!userAnswer.trim() || hasAnswered"
          class="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answer
        </button>
      </div>

      <!-- Answer Feedback -->
      <div v-if="hasAnswered" class="mt-6 text-center">
        <div :class="feedbackClass" class="p-4 rounded-lg mb-4">
          <p class="text-lg font-semibold">{{ feedbackMessage }}</p>
          <p v-if="!isCorrect" class="text-sm mt-2">
            The correct answer is: <span class="font-semibold">{{ currentCountry.capital }}</span>
          </p>
        </div>
        
        <button
          @click="nextQuestion"
          class="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Next Question
        </button>
      </div>

      <!-- Game Over -->
      <div v-if="gameOver" class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Game Over!</h2>
        <p class="text-lg text-gray-600 mb-6">
          Your final score: {{ score }} out of {{ totalQuestions }}
        </p>
        <button
          @click="restartGame"
          class="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>

      <!-- Multiplayer Status -->
      <div class="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 class="font-semibold text-gray-800 mb-2">Players Online</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="player in players"
            :key="player.id"
            class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {{ player.name }} ({{ player.score }} pts)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits<{
  scoreUpdate: [score: number]
  playersUpdate: [players: any[]]
}>()

interface Country {
  name: string
  capital: string
  code: string
}

interface Player {
  id: string
  name: string
  score: number
}

// Game state
const countries = ref<Country[]>([])
const currentCountry = ref<Country | null>(null)
const currentQuestionIndex = ref(0)
const userAnswer = ref('')
const hasAnswered = ref(false)
const isCorrect = ref(false)
const score = ref(0)
const gameOver = ref(false)
const players = ref<Player[]>([])

// Game settings
const totalQuestions = 10

// Computed properties
const feedbackMessage = computed(() => {
  if (!hasAnswered.value) return ''
  return isCorrect.value ? 'Correct! Well done!' : 'Incorrect! Try again next time.'
})

const feedbackClass = computed(() => {
  return isCorrect.value 
    ? 'bg-green-100 text-green-800 border border-green-200' 
    : 'bg-red-100 text-red-800 border border-red-200'
})

// Load countries data
const loadCountries = () => {
  countries.value = [
    { name: 'France', capital: 'Paris', code: 'FR' },
    { name: 'Germany', capital: 'Berlin', code: 'DE' },
    { name: 'Italy', capital: 'Rome', code: 'IT' },
    { name: 'Spain', capital: 'Madrid', code: 'ES' },
    { name: 'United Kingdom', capital: 'London', code: 'GB' },
    { name: 'Japan', capital: 'Tokyo', code: 'JP' },
    { name: 'China', capital: 'Beijing', code: 'CN' },
    { name: 'India', capital: 'New Delhi', code: 'IN' },
    { name: 'Brazil', capital: 'Brasília', code: 'BR' },
    { name: 'Canada', capital: 'Ottawa', code: 'CA' },
    { name: 'Australia', capital: 'Canberra', code: 'AU' },
    { name: 'Russia', capital: 'Moscow', code: 'RU' },
    { name: 'Mexico', capital: 'Mexico City', code: 'MX' },
    { name: 'Argentina', capital: 'Buenos Aires', code: 'AR' },
    { name: 'Egypt', capital: 'Cairo', code: 'EG' },
    { name: 'South Africa', capital: 'Cape Town', code: 'ZA' },
    { name: 'Nigeria', capital: 'Abuja', code: 'NG' },
    { name: 'Kenya', capital: 'Nairobi', code: 'KE' },
    { name: 'Thailand', capital: 'Bangkok', code: 'TH' },
    { name: 'South Korea', capital: 'Seoul', code: 'KR' }
  ]
  
  // Shuffle and select questions
  shuffleArray(countries.value)
  nextQuestion()
}

// Shuffle array function
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// Submit answer
const submitAnswer = () => {
  if (!userAnswer.value.trim() || hasAnswered.value || !currentCountry.value) return
  
  hasAnswered.value = true
  const correct = userAnswer.value.toLowerCase().trim() === currentCountry.value.capital.toLowerCase().trim()
  isCorrect.value = correct
  
  if (correct) {
    score.value++
    emit('score-update', score.value)
  }
}

// Next question
const nextQuestion = () => {
  if (currentQuestionIndex.value >= totalQuestions - 1) {
    gameOver.value = true
    return
  }
  
  currentQuestionIndex.value++
  currentCountry.value = countries.value[currentQuestionIndex.value]
  userAnswer.value = ''
  hasAnswered.value = false
  isCorrect.value = false
}

// Restart game
const restartGame = () => {
  currentQuestionIndex.value = 0
  score.value = 0
  gameOver.value = false
  userAnswer.value = ''
  hasAnswered.value = false
  isCorrect.value = false
  loadCountries()
}

// Simulate multiplayer functionality
const simulateMultiplayer = () => {
  players.value = [
    { id: '1', name: 'You', score: score.value },
    { id: '2', name: 'Player 2', score: Math.floor(Math.random() * 8) },
    { id: '3', name: 'Player 3', score: Math.floor(Math.random() * 8) }
  ]
}

// Watch for score changes to update multiplayer
import { watch } from 'vue'
watch(score, () => {
  const player = players.value.find(p => p.id === '1')
  if (player) {
    player.score = score.value
  }
  emit('playersUpdate', players.value)
})

onMounted(() => {
  loadCountries()
  simulateMultiplayer()
  
  // Simulate real-time multiplayer updates
  setInterval(() => {
    players.value.forEach(player => {
      if (player.id !== '1' && Math.random() > 0.7) {
        player.score = Math.min(player.score + 1, totalQuestions)
      }
    })
  }, 5000)
})
</script>