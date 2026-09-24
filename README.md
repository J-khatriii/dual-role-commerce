<div align="center">

  <h1>🔀 Dual Role Commerce</h1>

  <p><strong>A polished, high-performance React Native (Expo) app supporting two switchable roles — Customer and Supplier — with real-time chat and live analytics.</strong></p>

  <div>
    <img src="https://img.shields.io/badge/-Expo_SDK_57-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" alt="expo" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Convex-black?style=for-the-badge&logoColor=white&color=EE342F" alt="convex" />
    <img src="https://img.shields.io/badge/-Zustand-black?style=for-the-badge&logoColor=white&color=443E38" alt="zustand" />
    <img src="https://img.shields.io/badge/-Reanimated-black?style=for-the-badge&logoColor=white&color=61DAFB" alt="reanimated" />
  </div>

</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#-introduction)
2. ⚙️ [Tech Stack](#️-tech-stack)
3. 🔋 [Features](#-features)
4. 🏗️ [Architecture](#️-architecture)
5. 🧭 [Key Decisions & Tradeoffs](#-key-decisions--tradeoffs)
6. 🤸 [Quick Start](#-quick-start)
7. 📦 [Building the APK](#-building-the-apk)
8. 📁 [Project Structure](#-project-structure)

## 🤖 Introduction

Dual Role Commerce is a single Expo codebase that behaves like two apps in one. A supplier lists and manages inventory with live analytics; a customer browses that same catalog, builds a cart, and chats with the supplier in real time. Switching between the two roles is a single tap, and the active role is remembered across app restarts.

All product and analytics data is static/mock, as the assignment brief requires — the one genuinely live piece is the Customer ↔ Supplier support chat, backed by [Convex](https://www.convex.dev/), which keeps both sides in sync instantly with no polling or manual refresh.

## ⚙️ Tech Stack

- **[Expo (Managed Workflow)](https://expo.dev/)** — React Native tooling, dev client, and cloud builds via EAS, avoiding the need to hand-manage native Android/iOS projects.
- **[Expo Router](https://docs.expo.dev/router/introduction/)** — file-based navigation. The `(customer)` and `(supplier)` route groups isolate each role's screens and tab bar from one another without leaking into the URL structure.
- **TypeScript** — every data shape (`Product`, `CartItem`, `ChatMessage`, etc.) is typed in one place, catching shape mismatches at edit-time instead of on-device.
- **[Zustand](https://github.com/pmndrs/zustand)** + **AsyncStorage** — three independent, persisted stores (`useAuthStore`, `useCartStore`, `useInventoryStore`), each scoped to a single concern rather than one large global store.
- **[Convex](https://www.convex.dev/)** — reactive queries/mutations power the real-time chat thread; any subscribed client re-renders the instant a message is sent, no sockets to hand-roll.
- **[react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) + [Reanimated](https://docs.swmansion.com/react-native-reanimated/)** — swipe-to-delete cart gestures and the "Add to Cart" pop animation run on the UI thread for consistent 60fps.
- **[react-native-gifted-charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)** — the supplier's revenue line chart and category donut chart.
- **[@gorhom/bottom-sheet](https://ui.gorhom.dev/)** — the inventory stock-count editor.
- **[@shopify/flash-list](https://shopify.github.io/flash-list/)** — virtualized lists for the catalog, cart, and chat thread.

## 🔋 Features

👉 **Role Switcher** — single-tap Customer/Supplier selection, persisted locally, with a "Switch role" action always visible in the header.

👉 **Customer Catalog** — 2-column grid from static data, debounced search, category filter chips, graceful empty state for zero results.

👉 **Product Detail + Cart** — full spec sheet per product, animated "Added ✓" badge on add-to-cart, dedicated cart screen with quantity steppers and swipe-to-delete.

👉 **Supplier Analytics** — weekly revenue line chart and category-breakdown donut chart, both from static figures.

👉 **Live Inventory Manager** — in-stock toggles and a bottom-sheet stock editor; changes reflect immediately in the Customer catalog via a shared "effective products" hook.

👉 **Real-Time Support Chat** — one Customer ↔ Supplier thread, auto-scrolling bubbles, keyboard-safe input that never covers the conversation.

👉 **System Polish** — safe-area-aware layouts for notches/gesture bars on every screen, empty states for cart and search.

## 🏗️ Architecture

```
src/
  app/                  → Expo Router screens (file-based routing)
    auth/                 role selector
    (customer)/           catalog, product detail, cart, chat — own tab bar
    (supplier)/            dashboard, inventory, chat — own tab bar
  components/            reusable presentational components (ProductCard, CartItemRow, RoleHeader…)
  store/                  Zustand stores: auth, cart, inventory — each persisted independently
  hooks/                  useDebouncedValue, useEffectiveProducts
  data/                   static product & analytics data (single source of truth)
  types/                  shared TypeScript interfaces
convex/
  schema.ts               chat message table definition
  messages.ts              query (list) + mutation (send) for the chat thread
```

**Data flow worth calling out:** the cart never duplicates product details — it only stores `{ productId, quantity }` and joins against the static catalog at render time. Live inventory works the same way: a `useInventoryStore` holds only the *mutable* stock fields, merged on top of the static catalog by `useEffectiveProducts()`. This keeps a single source of truth for product data throughout the app, so a supplier's stock edit is visible to the customer instantly, with no duplicated or stale state.

## 🧭 Key Decisions & Tradeoffs

Two deliberate deviations from the literal brief, made for good reason and worth being upfront about:

- **Charting library:** started with `react-native-chart-kit` (spec-listed option), but it relies on React `defaultProps` on function components — removed in React 19 — which crashed on this Expo SDK 57 / React 19.2 stack. Switched to `react-native-gifted-charts`, which is actively maintained and (as a bonus) supports a true donut chart rather than a flat pie.
- **Chat keyboard handling:** the brief names `KeyboardAvoidingView` specifically. In testing, its Android resize behavior only works in a real native build — it's a no-op inside Expo Go, which made it undebuggable during development. Swapped to Reanimated's `useAnimatedKeyboard`, which achieves the same goal (keyboard never covers the conversation) reliably across Expo Go, emulator, and the final production build.

## 🤸 Quick Start

**Prerequisites:** [Node.js](https://nodejs.org/), npm, the [Expo Go](https://expo.dev/go) app on a physical device (or Android Studio for an emulator), and a free [Convex](https://www.convex.dev/) account.

```bash
git clone https://github.com/J-khatriii/dual-role-commerce.git
cd dual-role-commerce
npm install
```

**Set up Convex:**
```bash
npx convex dev
```
This logs you in, creates a cloud deployment, and writes `.env.local` with `EXPO_PUBLIC_CONVEX_URL` automatically. Leave this process running in its own terminal during development — it live-pushes `convex/schema.ts` and `convex/messages.ts` to your deployment.

**Run the app:**
```bash
npx expo start
```
Scan the QR code with Expo Go, or press `a` for an Android emulator.

## 📦 Building the APK

```bash
npm install -g eas-cli
eas login
eas build:configure
```

Register the Convex URL with EAS so it's available at cloud-build time (this is required — env vars in `.env.local` are not automatically picked up by the remote build):
```bash
eas env:create --name EXPO_PUBLIC_CONVEX_URL --value "<your-convex-cloud-url>" --environment preview
```

Confirm `eas.json`'s `preview` profile has `"android": { "buildType": "apk" }`, then:
```bash
eas build -p android --profile preview
```

The build page/terminal output a direct download link to the installable `.apk`.

## 📁 Project Structure

| Path | Purpose |
|---|---|
| `src/app/` | Screens & navigation (Expo Router) |
| `src/components/` | Reusable UI pieces |
| `src/store/` | Zustand stores (auth, cart, inventory) |
| `src/hooks/` | Custom hooks (debounce, effective products) |
| `src/data/` | Static product & analytics data |
| `src/types/` | Shared TypeScript types |
| `convex/` | Real-time chat backend (schema + functions) |
