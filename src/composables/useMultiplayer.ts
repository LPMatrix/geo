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

  let ws: WebSocket | null = null
  let connectionInterval: number | null = null

  const connect = async (playerName: string): Promise<boolean> => {
    try {
      connectionStatus.value = 'connecting'
      const origin = typeof location !== 'undefined' ? location.origin : ''
      const base = origin.replace(/^http/, 'ws')
      const url = `${base}/api/ws?room=global&name=${encodeURIComponent(playerName)}`
      ws = new WebSocket(url)

      await new Promise<boolean>((resolve) => {
        if (!ws) return resolve(false)
        ws.onopen = () => {
          isConnected.value = true
          connectionStatus.value = 'connected'
          startConnectionHeartbeat()
          resolve(true)
        }
        ws.onmessage = (evt) => {
          try {
            const msg = JSON.parse(String(evt.data || ''))
            if (msg?.type === 'room/state') {
              const room = msg.room
              currentRoom.value = {
                id: room.id,
                name: 'Capital Guessing Game',
                players: [],
                maxPlayers: 8,
                isActive: true,
                createdAt: new Date()
              }
              players.value = room.players.map((p: any) => ({
                id: p.id,
                name: p.name,
                score: p.score,
                status: 'playing',
                joinedAt: new Date(p.joinedAt),
                lastActive: new Date(p.lastActive)
              }))
              if (!currentPlayer.value && players.value.length > 0) {
                currentPlayer.value = players.value.find(p => p.name === playerName) || players.value[0]
              }
            } else if (msg?.type === 'score_update') {
              const p = players.value.find(pl => pl.id === msg.playerId)
              if (p) p.score = msg.score
            }
          } catch {}
        }
        ws.onclose = () => {
          isConnected.value = false
          connectionStatus.value = 'disconnected'
          ws = null
        }
        ws.onerror = () => {
          connectionStatus.value = 'disconnected'
          resolve(false)
        }
      })

      return isConnected.value
    } catch {
      connectionStatus.value = 'disconnected'
      return false
    }
  }

  const disconnect = (): void => {
    if (ws) {
      try { ws.close() } catch {}
      ws = null
    }

    isConnected.value = false
    connectionStatus.value = 'disconnected'
    currentPlayer.value = null
    currentRoom.value = null
    players.value = []
    
    if (connectionInterval) {
      clearInterval(connectionInterval)
      connectionInterval = null
    }
  }

  const updateScore = (playerId: string, newScore: number): void => {
    const player = players.value.find(p => p.id === playerId)
    if (player) {
      player.score = newScore
      player.lastActive = new Date()
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'score_update', score: newScore }))
      }
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

  const startSimulatedEvents = (): void => {}

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