# 🌍 Multiplayer Capital Guessing Game

A fun and interactive Vue.js multiplayer game where players guess the capitals of countries from around the world. Compete with friends in real-time and climb the leaderboard!

## 🎮 Features

### Core Gameplay
- **Multiple Difficulty Levels**: Easy (45s), Medium (30s), Hard (20s)
- **Progressive Questions**: 10-50 questions per game
- **Real-time Scoring**: Instant feedback on answers
- **Hint System**: Get helpful hints when stuck
- **Skip Option**: Skip difficult questions
- **Timer**: Race against the clock for each question

### Multiplayer Experience
- **Real-time Competition**: See other players' scores update live
- **Leaderboard**: Track your ranking against other players
- **Room System**: Join games with friends
- **Player Status**: See who's online and playing

### Educational Content
- **100+ Countries**: Comprehensive database of world capitals
- **Continental Organization**: Countries grouped by continent
- **Detailed Information**: Population and area data included
- **Multiple Choice**: Smart answer options based on difficulty

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🎯 How to Play

1. **Join a Game**: Enter your name to join the multiplayer lobby
2. **Configure Settings**: Choose difficulty and number of questions
3. **Start Playing**: Click "Start Game" to begin
4. **Answer Questions**: Select the correct capital from multiple choices
5. **Use Hints**: Click the hint button for helpful clues
6. **Track Progress**: Watch your score and timer
7. **Compete**: See how you rank against other players

## 🏗️ Technical Architecture

### Frontend Stack
- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vue Router** for navigation

### Key Components
- `EnhancedGameBoard.vue`: Main game interface
- `PlayerManager.vue`: Player registration and management
- `Leaderboard.vue`: Real-time scoring display
- `GameBoard.vue`: Original game component

### Composables (State Management)
- `useGameLogic.ts`: Game state and logic
- `useCountries.ts`: Country data management
- `useMultiplayer.ts`: Multiplayer functionality

### Features Implementation
- **Timer System**: Countdown with auto-submission
- **Score Tracking**: Real-time score updates
- **Question Generation**: Smart multiple choice creation
- **Hint System**: Progressive letter reveals
- **Multiplayer Simulation**: WebSocket-like real-time updates

## 🎨 Game Design

### User Experience
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Clean, colorful interface
- **Smooth Animations**: Hover effects and transitions
- **Clear Feedback**: Immediate answer validation
- **Progress Indication**: Visual progress bar

### Difficulty Scaling
- **Easy Mode**: 45 seconds, fewer options, generous hints
- **Medium Mode**: 30 seconds, standard options, limited hints
- **Hard Mode**: 20 seconds, more options, no hints

## 🧪 Testing

Run the TypeScript compiler check:
```bash
npm run check
```

Run the linter:
```bash
npm run lint
```

Build for production:
```bash
npm run build
```

## 🌟 Future Enhancements

### Planned Features
- **Real WebSocket Integration**: True real-time multiplayer
- **User Authentication**: Persistent player profiles
- **Achievement System**: Badges and milestones
- **Tournament Mode**: Competitive tournaments
- **More Countries**: Expand database to 200+ countries
- **Statistics**: Detailed performance analytics
- **Social Features**: Friend lists and challenges

### Technical Improvements
- **Performance Optimization**: Faster question loading
- **Offline Mode**: Play without internet connection
- **PWA Support**: Install as a progressive web app
- **Internationalization**: Multiple language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy the game and test your world geography knowledge! 🌍✈️**
