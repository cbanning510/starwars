# Star Wars Database - React Native App

A production-quality React Native application built with Expo that showcases data from the Star Wars API (SWAPI). This project demonstrates modern mobile development best practices, clean architecture, and comprehensive implementation suitable for a senior/lead engineering position.

## 🌟 Features

- **Multiple Resource Views**: Browse Characters, Films, Planets, and Starships
- **Search Functionality**: Real-time search with debouncing
- **Infinite Scrolling**: Efficient pagination for large datasets
- **Detail Views**: Comprehensive information with related resources
- **Optimized Performance**: React Query caching and request deduplication
- **Error Handling**: Graceful error states with retry functionality
- **Loading States**: Professional loading indicators
- **Responsive Design**: Clean, Star Wars-themed UI

## 🏗️ Architecture

### Project Structure

```
src/
├── api/
│   ├── client.ts          # Axios instance with interceptors
│   ├── endpoints.ts       # API endpoint constants and utilities
│   └── swapi.ts          # API service functions
├── hooks/
│   ├── usePeople.ts      # React Query hooks for people
│   ├── useFilms.ts       # React Query hooks for films
│   ├── usePlanets.ts     # React Query hooks for planets
│   └── useStarships.ts   # React Query hooks for starships
├── types/
│   └── swapi.ts          # TypeScript interfaces and types
├── screens/
│   ├── HomeScreen.tsx
│   ├── PeopleListScreen.tsx
│   ├── PersonDetailScreen.tsx
│   ├── FilmsListScreen.tsx
│   ├── FilmDetailScreen.tsx
│   ├── PlanetsListScreen.tsx
│   ├── PlanetDetailScreen.tsx
│   ├── StarshipsListScreen.tsx
│   └── StarshipDetailScreen.tsx
├── components/
│   ├── PersonCard.tsx
│   ├── LoadingState.tsx
│   ├── ErrorState.tsx
│   ├── EmptyState.tsx
│   └── SearchBar.tsx
├── navigation/
│   └── AppNavigator.tsx
└── utils/
    └── helpers.ts        # Utility functions
```

### Technology Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript (strict mode)
- **Navigation**: React Navigation (Native Stack)
- **Data Fetching**: React Query (@tanstack/react-query)
- **HTTP Client**: Axios
- **API**: SWAPI (https://swapi.dev)

### Design Decisions

#### 1. React Query over Redux

- **Reason**: Better suited for server state management
- **Benefits**:
  - Built-in caching and request deduplication
  - Automatic background refetching
  - Optimistic updates support
  - Less boilerplate than Redux

#### 2. Axios over Fetch

- **Reason**: More features out of the box
- **Benefits**:
  - Request/response interceptors
  - Automatic JSON transformation
  - Better error handling
  - Request timeout support

#### 3. TypeScript Strict Mode

- **Reason**: Type safety and better DX
- **Benefits**:
  - Catch errors at compile time
  - Better IDE autocomplete
  - Self-documenting code
  - Easier refactoring

#### 4. Native Stack Navigator

- **Reason**: Performance and native feel
- **Benefits**:
  - Native navigation performance
  - Platform-specific animations
  - Memory efficiency

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app (for testing on physical device)
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository

```bash
git clone git@github.com:cbanning510/starwars.git
cd starwars
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npx expo start
```

4. Run on your preferred platform

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go for physical device

## 📱 App Flow

### Home Screen

- Landing page with four category cards
- Navigate to Characters, Films, Planets, or Starships

### List Screens

- Display paginated lists of resources
- Search functionality with debouncing
- Infinite scroll for seamless browsing
- Pull-to-refresh support
- Empty and error states

### Detail Screens

- Comprehensive resource information
- Related data (homeworld, films, etc.)
- Statistics and metrics
- Clean, readable layout

## 🎨 Design System

### Color Palette

- **Primary**: `colors.primary` (Star Wars Yellow)
- **Background**: `colors.background` (Black)
- **Cards**: `#1a1a1a` (Dark Gray)
- **Borders**: `#333` (Medium Gray)
- **Text Primary**: `#FFF` (White)
- **Text Secondary**: `#AAA` (Light Gray)
- **Text Tertiary**: `#666` (Medium Gray)

### Typography

- **Titles**: 900 weight, Star Wars Yellow
- **Body**: 400-600 weight, White/Gray
- **Labels**: 700 weight, uppercase, 0.5 letter spacing

## 🔧 Key Implementation Details

### Caching Strategy

```typescript
queryClient.defaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  },
};
```

### Search Debouncing

```typescript
const debouncedSearch = debounce((text: string) => {
  onSearch(text);
}, 500);
```

### Infinite Scroll

```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryFn: ({ pageParam = 1 }) => fetchPeople(pageParam),
  getNextPageParam: (lastPage) => {
    // Parse next page from API response
  },
});
```

### Error Handling

- Request interceptors for logging
- Response interceptors for error transformation
- Try-catch in async functions
- User-friendly error messages
- Retry functionality

## 🧪 Testing Considerations

### Unit Tests

- API service functions
- Utility helpers
- Custom hooks (with React Query testing utils)

### Integration Tests

- Screen navigation flows
- Search functionality
- Pagination behavior

### E2E Tests

- Critical user journeys
- Search and navigation
- Error recovery

## 📈 Performance Optimizations

1. **React Query Caching**: Prevents unnecessary network requests
2. **Debounced Search**: Reduces API calls during typing
3. **FlatList**: Virtualized lists for smooth scrolling
4. **Image Placeholders**: Avatar colors generated from names
5. **Request Deduplication**: React Query prevents duplicate requests

## 🔐 API Rate Limiting

SWAPI has a rate limit of 10,000 requests per day per IP. The app implements:

- Aggressive caching (5-30 minute stale times)
- Request deduplication
- Efficient pagination

## 🎯 Future Enhancements

### High Priority

- [ ] Offline support with AsyncStorage
- [ ] Favorites/bookmarks functionality
- [ ] Unit and integration tests
- [ ] Error boundary implementation
- [ ] Deep linking support

### Medium Priority

- [ ] Dark/light theme toggle
- [ ] Advanced filtering
- [ ] Sort options
- [ ] Share functionality
- [ ] Performance monitoring (Sentry/Datadog)

### Nice to Have

- [ ] Character comparison tool
- [ ] Film timeline visualization
- [ ] Galaxy map for planets
- [ ] Animations and transitions
- [ ] Sound effects

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

### Formatting

```bash
npm run format
```

## 🤝 Contributing

This is a technical assessment project, but feedback is welcome!

## 📄 License

MIT

## 👤 Author

Christopher - Senior React Native Engineer

## 🙏 Acknowledgments

- SWAPI (https://swapi.dev) for the amazing API
- Star Wars for the epic universe
- React Navigation team
- TanStack Query team

---

**May the Force be with you!** ⭐
