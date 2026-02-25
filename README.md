# Timz Trimz Mobile

React Native (Expo) booking app for **Timz Trimz** barbershop. Customers use this mobile app to browse services, book appointments, view gallery, track loyalty stamps, and manage their bookings.

The app consumes the [Timz Trimz web API](https://github.com/KunalGT/timztrimz) — Tim administers everything via the web admin dashboard.

## Screenshots

| Home | Book | Gallery | My Bookings |
|------|------|---------|-------------|
| Hero, quick book, reviews, loyalty | 5-step wizard | Filterable grid | Phone lookup, loyalty stamps |

## Tech Stack

- **Framework:** React Native with [Expo](https://expo.dev) (SDK 54)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (file-based)
- **Styling:** [NativeWind](https://www.nativewind.dev/) v4 (Tailwind CSS for React Native)
- **Fonts:** Inter + Playfair Display via `@expo-google-fonts`
- **State:** React hooks + AsyncStorage for persistence
- **Images:** `expo-image` for performant image loading
- **Haptics:** `expo-haptics` for booking confirmation feedback
- **Calendar:** `expo-calendar` for "Add to Calendar" feature

## Features

### Home Tab
- Hero card with quick "Book Now" CTA
- Next appointment display (auto-fetched from saved phone)
- Quick book carousel of popular services
- Recent reviews horizontal scroll
- Loyalty stamp progress tracker
- Location card with "Get Directions" (opens Maps)

### Book Tab — 5-Step Wizard
1. **Choose Service** — Category filters (Cuts, Beard, Kids, Specials, Add-ons) + service cards
2. **Pick Date & Time** — Horizontal date picker (30 days, skip Sundays) + time slot grid
3. **Your Details** — Name, phone, email, notes (auto-fills from saved data)
4. **Confirm** — Full booking summary with price
5. **Success** — Booking reference, "Add to Calendar", haptic feedback, save user data

### Gallery Tab
- Category filter chips (All, Fades, Beards, Lineups, Kids)
- 2-column image grid with `expo-image`
- Full-screen image viewer (modal)
- Pull-to-refresh

### My Bookings Tab
- Phone number lookup (saves for future visits)
- Upcoming & past bookings (SectionList)
- Loyalty stamp card (2x5 grid, matching web design)
- Booking detail screen with cancel + review options
- Cancel confirmation modal
- Star rating review modal

## Project Structure

```
timztrimz-mobile/
├── app/                          # Screens (Expo Router)
│   ├── _layout.tsx               # Root layout (fonts, splash)
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab bar (black bg, gold active)
│   │   ├── index.tsx             # Home
│   │   ├── book.tsx              # Booking wizard
│   │   ├── gallery.tsx           # Gallery
│   │   └── bookings.tsx          # My Bookings
│   ├── gallery/[id].tsx          # Full-screen image viewer
│   └── booking/[id].tsx          # Booking detail + cancel/review
├── components/
│   ├── ui/                       # Button, Card, Badge, LoadingSpinner, EmptyState
│   ├── home/                     # HeroCard, NextAppointment, QuickBookServices, etc.
│   ├── booking/                  # StepIndicator, ServicePicker, DatePicker, TimeSlotGrid, etc.
│   ├── gallery/                  # CategoryFilterChips, GalleryGrid
│   └── bookings/                 # PhoneLookup, BookingCard, BookingList, LoyaltyStampCard, etc.
├── hooks/                        # useServices, useAvailability, useBookings, useLoyalty, etc.
├── lib/                          # types, constants, api, storage, utils
├── tailwind.config.js            # NativeWind theme (gold/black palette)
├── babel.config.js               # Expo + NativeWind presets
└── metro.config.js               # NativeWind metro integration
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `gold` | `#C9A84C` | Primary accent, buttons, active states |
| `gold-light` | `#D4B85E` | Hover states |
| `gold-dark` | `#B8973F` | Pressed states |
| `warm-grey` | `#6B7280` | Secondary text |
| `off-white` | `#F9FAFB` | Light backgrounds |
| `success` | `#10B981` | Confirmed status, success states |
| `danger` | `#EF4444` | Cancel, error states |

**Fonts:** Inter (body) + Playfair Display (headings)

## Getting Started

### Prerequisites

- Node.js 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (Xcode) or Android Emulator, or Expo Go on a physical device
- The [Timz Trimz web API](https://github.com/KunalGT/timztrimz) running on `localhost:3009`

### Install & Run

```bash
# Clone the repo
git clone https://github.com/KunalGT/timztrimz-mobile.git
cd timztrimz-mobile

# Install dependencies
npm install

# Start Expo dev server
npx expo start

# Press 'i' for iOS Simulator, 'a' for Android Emulator
# Or scan the QR code with Expo Go on your phone
```

### API Configuration

By default the app connects to `http://localhost:3009`. To change this, set the environment variable:

```bash
EXPO_PUBLIC_API_URL=http://your-api-host:3009 npx expo start
```

For physical device testing, use your machine's local IP:

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.x:3009 npx expo start
```

## API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/services?category=` | List active services |
| `GET` | `/api/availability?date=&duration=` | Available time slots |
| `POST` | `/api/bookings` | Create a booking |
| `GET` | `/api/bookings?phone=` | Get bookings by phone |
| `PATCH` | `/api/bookings/:id` | Cancel a booking |
| `GET` | `/api/gallery?category=` | Gallery images |
| `GET` | `/api/loyalty?phone=` | Loyalty stamp data |
| `GET` | `/api/reviews?limit=` | Recent reviews |
| `POST` | `/api/reviews` | Submit a review |
