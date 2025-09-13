## Product Requirements Document — Warlok TCCG (Trading Card Chess Game)

### 1. Summary

Warlok is a Yu‑Gi‑Oh–inspired trading card chess game where players build decks, play cards onto an 8×8 chessboard, and control resulting pieces using standard chess movement. The application runs as a web app with an XR mode using the WebSpatial SDK to project the board and pieces into a player’s environment.

### 2. Goals

- Recreate a card-driven battle experience with chess mechanics.
- Support 2D web and XR experiences seamlessly.
- Provide deck management: create, edit, save, and view decks and cards.
- Ensure core rules are deterministic, testable, and decoupled from the UI.

### 3. Non-Goals

- Online matchmaking and ranked ladders.
- Complex economy/monetization or blockchain features.
- Advanced visual effects beyond essential clarity.

### 4. Target Platforms

- Desktop and mobile browsers.
- XR-capable devices/browsers supported by WebSpatial.

### 5. Users & Personas

- Casual Strategy Player: wants quick matches and intuitive rules.
- TCG Enthusiast: cares about deck building, synergies, and card variety.
- XR Explorer: wants to place and interact with the board in their space.

### 6. Core Gameplay

6.1 Match Overview

- Singplayer (AI): Play against a bot in inceasing difficulties. (Balatro)
- Two players; each brings a deck (e.g., 30–40 cards, MVP to confirm).
- Objective: checkmate opponent’s king or equivalent core piece.
- Turn-based: players alternate turns consisting of phases.

  6.2 Phases (MVP)

- Draw Phase: draw 1 card (if deck not empty).
- Main Phase: play cards (summon pieces/effects), move one piece using legal chess movement, resolve effects.
- End Phase: clean up turn, resolve end-of-turn effects.

  6.3 Card Types (MVP)

- Unit Cards: summon a piece onto a legal square; piece has movement equal to a chess role (e.g., Knight, Bishop), stats (HP/attack optional in MVP), and traits.
- Spell Cards: one-time effects (buffs, movement modifiers, captures, placement changes).
- Field/Artifact Cards (Optional MVP): persistent modifiers placed on board squares.

  6.4 Board & Movement

- Standard 8×8 board. Legal moves follow chess rules for the piece role.
- Captures remove opposing units from the board.
- Summoning rules: Units may be placed on empty legal squares per card text; default restrictions (e.g., own half of the board) can be applied for balance.

  6.5 Win/Loss Conditions

- Primary: checkmate the opponent’s King equivalent.
- Secondary (optional MVP): deck-out loss if a player cannot draw.

### 7. Deck Management

- Create Deck: start empty, add cards from collection.
- Edit Deck: add/remove cards, rename deck.
- View Cards: browse all cards with filters/search.
- Persistence: MVP local-only (LocalStorage/IndexedDB). Future server sync via API.
- Deck Constraints (MVP): deck size range, per-card copy limit.

### 8. Cards & Data Model (MVP)

- Card: id, name, type (unit/spell), cost (optional), tags, description, art, rules text.
- UnitCard: role (King, Queen, Rook, Bishop, Knight, Pawn), optional stats, summon constraints.
- SpellCard: effect type, target rules, duration (instant/turn-limited).
- Deck: id, name, list of card ids.
- Match: players, board state, hands, discard, turn, phase.

### 9. XR Requirements (WebSpatial)

- XR Mode Entry: user toggles XR from UI; session initializes via WebSpatial.
- Board Placement: detect surfaces/planes; user taps to place board anchor.
- Interaction: tap/select squares and pieces; drag-to-move if supported; gestures for scale/rotate.
- Persistence: board keeps position relative to anchor during session.
- Fallback: if XR not available, run full 2D web experience.

### 10. UI/UX Requirements

- Responsive layout across desktop/mobile.
- Clear card and board visuals; readable in both 2D and XR.
- Deck Builder: grid of cards with add/remove controls; deck list sidebar; card detail modal.
- Match UI: hand area, turn/phase indicator, action log, confirm/cancel for moves.
- Accessibility: color contrast, keyboard navigation for 2D mode where feasible.

### 11. Technical Requirements

- Framework: Next.js (App Router) + TypeScript.
- Rendering: three.js for board/pieces; canvas overlays as needed.
- Styling: styled-components with theming.
- XR: WebSpatial SDK wrapper with React providers.
- State: React state + reducers for match engine; persist decks locally.
- Testing: unit tests for rules engine; integration tests for deck builder.

### 12. Project Structure (Reference)

Aligns with `README.md` structure: `app/`, `components/`, `domains/game/`, `domains/xr/`, `hooks/`, `lib/three/`, `styles/`, `public/`, `tests/`.

### 13. Success Metrics (MVP)

- User can: build a deck, start a match, summon units, move pieces legally, and finish a game.
- XR mode: user can place the board, interact with pieces, and complete a turn.
- Stability: no fatal errors during a complete game on a modern device.

### 14. Risks & Mitigations

- XR device variability → provide robust fallback and clear gating for features.
- Performance of three.js in mobile XR → optimize models, use low-poly assets, throttle effects.
- Rules complexity → keep MVP to standard chess movement + simple card effects.

### 15. Roadmap (MVP → Next)

- MVP: local play vs. hot-seat; local persistence for decks; basic unit/spell cards; XR placement.
- Next: AI opponent, online play, richer effects, progression, cosmetics.
