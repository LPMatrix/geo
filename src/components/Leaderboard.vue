<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">🏆 Leaderboard</h3>
    
    <div class="space-y-3">
      <div
        v-for="(player, index) in sortedPlayers"
        :key="player.id"
        :class="[
          'flex items-center justify-between p-3 rounded-lg',
          player.isCurrentPlayer ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-50'
        ]"
      >
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
               :class="getRankClass(index)">
            {{ index + 1 }}
          </div>
          <div>
            <p class="font-semibold text-gray-800">{{ player.name }}</p>
            <p class="text-xs text-gray-600">{{ player.status || 'Playing' }}</p>
          </div>
        </div>
        
        <div class="text-right">
          <p class="text-lg font-bold text-gray-800">{{ player.score }}</p>
          <p class="text-xs text-gray-600">points</p>
        </div>
      </div>
    </div>
    
    <div v-if="sortedPlayers.length === 0" class="text-center text-gray-500 py-8">
      <p>No players online</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Player {
  id: string
  name: string
  score: number
  status?: string
  isCurrentPlayer?: boolean
}

const props = defineProps<{
  players: Player[]
  currentPlayerId?: string
}>()

const sortedPlayers = computed(() => {
  const playersWithCurrent = props.players.map(player => ({
    ...player,
    isCurrentPlayer: player.id === props.currentPlayerId
  }))
  
  return playersWithCurrent.sort((a, b) => b.score - a.score)
})

const getRankClass = (index: number) => {
  switch (index) {
    case 0:
      return 'bg-yellow-400 text-yellow-900' // Gold
    case 1:
      return 'bg-gray-300 text-gray-800' // Silver
    case 2:
      return 'bg-orange-400 text-orange-900' // Bronze
    default:
      return 'bg-gray-200 text-gray-700'
  }
}
</script>