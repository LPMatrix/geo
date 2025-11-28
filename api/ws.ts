export const config = { runtime: 'edge', regions: ['iad1'] }

type Player = {
  id: string
  name: string
  score: number
  status: 'online' | 'offline' | 'playing'
  joinedAt: number
  lastActive: number
}

type Room = {
  id: string
  name: string
  sockets: Set<WebSocket>
  players: Map<string, Player>
}

const rooms = new Map<string, Room>()

const getRoom = (id: string): Room => {
  let room = rooms.get(id)
  if (!room) {
    room = { id, name: 'Capital Guessing Game', sockets: new Set(), players: new Map() }
    rooms.set(id, room)
  }
  return room
}

const uid = () => Math.random().toString(36).slice(2)

const broadcast = (room: Room, data: any) => {
  const msg = JSON.stringify(data)
  for (const ws of room.sockets) {
    try { ws.send(msg) } catch {}
  }
}

const snapshot = (room: Room) => {
  const players = Array.from(room.players.values()).sort((a, b) => b.score - a.score)
  return { id: room.id, name: room.name, playerCount: players.length, players }
}

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const upgrade = req.headers.get('upgrade')
  if (upgrade !== 'websocket') return new Response('Expected websocket', { status: 400 })

  const pair = new (globalThis as any).WebSocketPair()
  const client = pair[0]
  const server = pair[1]

  const roomId = searchParams.get('room') || 'global'
  const name = searchParams.get('name') || 'Player'
  const room = getRoom(roomId)
  const playerId = uid()

  server.accept()
  room.sockets.add(server)

  const now = Date.now()
  room.players.set(playerId, {
    id: playerId,
    name,
    score: 0,
    status: 'playing',
    joinedAt: now,
    lastActive: now,
  })

  server.addEventListener('message', (event: MessageEvent) => {
    try {
      const data = JSON.parse(String(event.data || ''))
      if (data?.type === 'score_update') {
        const p = room.players.get(playerId)
        if (p && typeof data.score === 'number') {
          p.score = data.score
          p.lastActive = Date.now()
          broadcast(room, { type: 'room/state', room: snapshot(room) })
          broadcast(room, { type: 'score_update', playerId: p.id, score: p.score })
        }
      } else if (data?.type === 'sys/pong') {
        const p = room.players.get(playerId)
        if (p) p.lastActive = Date.now()
      }
    } catch {}
  })

  server.addEventListener('close', () => {
    room.sockets.delete(server)
    room.players.delete(playerId)
    broadcast(room, { type: 'room/state', room: snapshot(room) })
  })

  server.send(JSON.stringify({ type: 'room/state', room: snapshot(room) }))
  broadcast(room, { type: 'player_joined', playerId })
  broadcast(room, { type: 'room/state', room: snapshot(room) })

  return new Response(null, { status: 101, webSocket: client })
}