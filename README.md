# Book Library System (Vue 3)

A responsive front-end library dashboard inspired by the supplied reference. This is a classroom-ready demo using localStorage, sample data, and browser-only persistence. It does not require a database or API.

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm

## Run the project
```bash
# 1. Extract the ZIP, then open a terminal inside Book-Library-System
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Included features
- Dashboard metrics: total books, borrowing users, borrowed books, overdue books
- Physical Books / Online Books tabs
- Search and status/category filters
- Add, view, edit, and delete books
- Borrow and return actions with due dates
- Form validation and confirmation messages
- Responsive sidebar and book-card layout
- localStorage persistence (refreshing the page keeps your changes)
- Component events (`defineEmits`) and parent/child communication (`props`, emitted events, `v-model`)
- Vue 3 Composition API in the app and Options API example component
- Reusable composables and a small legacy-style mixin example

## Where to look
- `src/App.vue`: application shell and parent-level state
- `src/components/BookCard.vue`: child component using props and emitted events
- `src/components/BookFormModal.vue`: add/edit form and validation
- `src/components/BookDetailsModal.vue`: details and borrow/return actions
- `src/components/SidebarNav.vue`: emits navigation changes
- `src/composables/useLibrary.js`: library state and localStorage persistence
- `src/composables/useToast.js`: reusable toast state
- `src/mixins/auditMixin.js`: small Options API mixin example
- `src/components/OptionsApiExample.vue`: demonstrates Options API alongside Composition API

## Notes
- Sample books are seeded automatically only when no saved library data exists.
- Use **Reset demo data** in the sidebar to restore the initial sample data.
- Data is stored in this browser on this device. Clearing browser storage clears saved changes.
- This is a front-end learning project, not a secure multi-user production system. Real authentication, server-side validation, database transactions, and role permissions would need a backend.
