<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Player Management -->
        <div class="lg:col-span-1">
          <PlayerManager />
          
          <!-- Leaderboard -->
          <div class="mt-6">
            <Leaderboard 
              :players="players"
              current-player-id="1"
            />
          </div>
        </div>
        
        <!-- Game Board -->
        <div class="lg:col-span-3">
          <EnhancedGameBoard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EnhancedGameBoard from './components/EnhancedGameBoard.vue'
import PlayerManager from './components/PlayerManager.vue'
import Leaderboard from './components/Leaderboard.vue'

const players = ref([
  { id: '1', name: 'You', score: 0, status: 'Playing' },
  { id: '2', name: 'Player 2', score: 0, status: 'Playing' },
  { id: '3', name: 'Player 3', score: 0, status: 'Playing' }
])
</script>