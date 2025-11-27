import { ref, reactive, onMounted, onUnmounted } from 'vue'

export interface Player {
  id: string
  name: string
  score: number
  status: 'online' | 'offline' | 'playing'
  joinedAt: Date
  lastActive: Date
}

export interface GameRoom {
  id: string
  name: string
  players: Player[]
  maxPlayers: number
  isActive: boolean
  createdAt: Date
}

export interface GameEvent {
  type: 'player_joined' | 'player_left' | 'score_update' | 'game_started' | 'game_ended'
  playerId: string
  data: any
  timestamp: Date
}

export const useMultiplayer = () => {
  const currentPlayer = ref<Player | null>(null)
  const currentRoom = ref<GameRoom | null>(null)
  const players = ref<Player[]>([])
  const gameEvents = ref<GameEvent[]>([])
  const isConnected = ref(false)
  const connectionStatus = ref<'connecting' | 'connected' | 'disconnected'>('disconnected')

  // Simulate WebSocket connection
  let connectionInterval: number | null = null
  let eventInterval: number | null = null

  const connect = async (playerName: string): Promise<boolean> => {
    try {
      connectionStatus.value = 'connecting'
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create current player
      currentPlayer.value = {
        id: `player_${Date.now()}`,
        name: playerName,
        score: 0,
        status: 'online',
        joinedAt: new Date(),
        lastActive: new Date()
      }

      // Create or join a room
      currentRoom.value = {
        id: `room_${Math.random().toString(36).substr(2, 9)}`,
        name: 'Capital Guessing Game',
        players: [currentPlayer.value],
        maxPlayers: 8,
        isActive: true,
        createdAt: new Date()
      }

      // Add some simulated players
      players.value = [
        currentPlayer.value,
        ...generateSimulatedPlayers(3)
      ]

      isConnected.value = true
      connectionStatus.value = 'connected'
      
      // Start connection heartbeat
      startConnectionHeartbeat()
      
      // Start simulated events
      startSimulatedEvents()
      
      return true
    } catch (error) {
      connectionStatus.value = 'disconnected'
      return false
    }
  }

  const disconnect = (): void => {
    if (currentPlayer.value) {
      broadcastEvent('player_left', currentPlayer.value.id, {
        playerName: currentPlayer.value.name
      })
    }

    isConnected.value = false
    connectionStatus.value = 'disconnected'
    currentPlayer.value = null
    currentRoom.value = null
    players.value = []
    
    // Clear intervals
    if (connectionInterval) {
      clearInterval(connectionInterval)
      connectionInterval = null
    }
    if (eventInterval) {
      clearInterval(eventInterval)
      eventInterval = null
    }
  }

  const updateScore = (playerId: string, newScore: number): void => {
    const player = players.value.find(p => p.id === playerId)
    if (player) {
      player.score = newScore
      player.lastActive = new Date()
      broadcastEvent('score_update', playerId, { score: newScore })
    }
  }

  const broadcastEvent = (type: GameEvent['type'], playerId: string, data: any): void => {
    const event: GameEvent = {
      type,
      playerId,
      data,
      timestamp: new Date()
    }
    
    gameEvents.value.unshift(event)
    
    // Keep only last 50 events
    if (gameEvents.value.length > 50) {
      gameEvents.value = gameEvents.value.slice(0, 50)
    }
  }

  const generateSimulatedPlayers = (count: number): Player[] => {
    const names = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn']
    const simulatedPlayers: Player[] = []
    
    for (let i = 0; i < count; i++) {
      simulatedPlayers.push({
        id: `simulated_${i + 1}`,
        name: names[i % names.length] + (i + 1),
        score: Math.floor(Math.random() * 15),
        status: 'playing',
        joinedAt: new Date(Date.now() - Math.random() * 3600000),
        lastActive: new Date()
      })
    }
    
    return simulatedPlayers
  }

  const startConnectionHeartbeat = (): void => {
    connectionInterval = setInterval(() => {
      if (currentPlayer.value) {
        currentPlayer.value.lastActive = new Date()
      }
    }, 30000) // Update every 30 seconds
  }

  const startSimulatedEvents = (): void => {
    eventInterval = setInterval(() => {
      if (!isConnected.value || players.value.length <= 1) return
      
      // Simulate other players' score updates
      const simulatedPlayers = players.value.filter(p => p.id.startsWith('simulated_'))
      if (simulatedPlayers.length > 0 && Math.random() > 0.7) {
        const randomPlayer = simulatedPlayers[Math.floor(Math.random() * simulatedPlayers.length)]
        if (Math.random() > 0.5) {
          randomPlayer.score = Math.min(randomPlayer.score + 1, 20)
          broadcastEvent('score_update', randomPlayer.id, { score: randomPlayer.score })
        }
      }
      
      // Simulate player status changes
      if (Math.random() > 0.9) {
        const randomPlayer = players.value[Math.floor(Math.random() * players.value.length)]
        if (randomPlayer.id !== currentPlayer.value?.id) {
          randomPlayer.status = randomPlayer.status === 'playing' ? 'online' : 'playing'
        }
      }
    }, 3000) // Check every 3 seconds
  }

  const getLeaderboard = () => {
    return [...players.value]
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({
        ...player,
        rank: index + 1
      }))
  }

  const getRoomInfo = () => {
    return currentRoom.value ? {
      ...currentRoom.value,
      playerCount: players.value.length
    } : null
  }

  // Lifecycle
  onUnmounted(() => {
    disconnect()
  })

  return {
    currentPlayer,
    currentRoom,
    players,
    gameEvents,
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    updateScore,
    getLeaderboard,
    getRoomInfo,
    broadcastEvent
  }
}