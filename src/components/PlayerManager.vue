<template>
  <div class="max-w-md mx-auto p-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Join Game</h2>
      
      <div v-if="!playerName" class="space-y-4">
        <div>
          <label for="playerName" class="block text-sm font-medium text-gray-700 mb-2">
            Enter your name
          </label>
          <input
            id="playerName"
            v-model="nameInput"
            @keyup.enter="joinGame"
            type="text"
            placeholder="Your name..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          @click="joinGame"
          :disabled="!nameInput.trim()"
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Join Game
        </button>
      </div>
      
      <div v-else class="text-center">
        <div class="mb-4">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span class="text-2xl">👤</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800">{{ playerName }}</h3>
          <p class="text-sm text-gray-600">Score: {{ playerScore }}</p>
        </div>
        
        <button
          @click="leaveGame"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Leave Game
        </button>
      </div>
      
      <!-- Room Info -->
      <div v-if="roomInfo" class="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 class="font-semibold text-gray-800 mb-2">Room Information</h4>
        <p class="text-sm text-gray-600">Room Code: <span class="font-mono">{{ roomInfo.code }}</span></p>
        <p class="text-sm text-gray-600">Players: {{ roomInfo.playerCount }}/{{ roomInfo.maxPlayers }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface RoomInfo {
  code: string
  playerCount: number
  maxPlayers: number
}

const props = defineProps<{
  playerScore?: number
}>()

const emit = defineEmits<{
  join: [playerName: string]
  leave: []
}>()

const playerName = ref('')
const nameInput = ref('')
const roomInfo = ref<RoomInfo>({
  code: 'GAME-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
  playerCount: 1,
  maxPlayers: 8
})

const playerScore = computed(() => props.playerScore || 0)

const joinGame = () => {
  if (!nameInput.value.trim()) return
  
  playerName.value = nameInput.value.trim()
  roomInfo.value.playerCount++
  emit('join', playerName.value)
}

const leaveGame = () => {
  playerName.value = ''
  nameInput.value = ''
  roomInfo.value.playerCount = Math.max(1, roomInfo.value.playerCount - 1)
  emit('leave')
}
</script>