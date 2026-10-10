<<<<<<< HEAD
# PageTurn — Book Management System

A responsive Vue 3 library management project for learning form handling, events, parent-child communication, Vue Router, Composition API, Options API, mixins, composables, localStorage, and CRUD.

## Requirements
- Node.js 18+ (recommended)
- npm
- Visual Studio Code (recommended)

## Run the project
1. Extract `book-management-system.zip`.
2. Open the extracted `book-management-system` folder in VS Code.
3. Open Terminal → New Terminal.
4. Install packages:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open the local URL printed in the terminal (usually `http://localhost:5173`).

For a production build:
=======
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
>>>>>>> d15ca21e626a7f3b9fe7d08e50982ced96e46128
```bash
npm run build
npm run preview
```

<<<<<<< HEAD
## Demo accounts
- Admin: `admin@pageturn.local` / `admin123`
- Member: `member@pageturn.local` / `member123`

You can register a new member from the login screen.

## Main features
### Admin
- Dashboard with library statistics
- Create, edit, search, and delete books
- Review borrow requests and approve/reject them
- See borrowing status and mark approved loans as returned
- View member accounts

### Member
- Browse and search the catalog
- Filter by category and availability
- Request to borrow available books
- View own requests and borrowing history
- Cancel pending requests and return approved books

## Project structure
```text
src/
  assets/
    main.css
  components/
    AppHeader.vue
    AppSidebar.vue
    BookCard.vue
    BookForm.vue
    EmptyState.vue
    StatCard.vue
    StatusBadge.vue
  composables/
    useAuth.js
    useLibrary.js
    useLocalStorage.js
  data/
    seed.js
  mixins/
    timestampMixin.js
  router/
    index.js
  views/
    LoginView.vue
    RegisterView.vue
    DashboardView.vue
    CatalogView.vue
    BookManagementView.vue
    BorrowingsView.vue
    MembersView.vue
    NotFoundView.vue
  App.vue
  main.js
```

## Vue class requirements: where to find them
- **Form handling:** `LoginView.vue`, `RegisterView.vue`, `BookForm.vue`
- **Emitting events:** `BookCard.vue` emits `borrow`; `BookForm.vue` emits `save` and `cancel`; `StatusBadge.vue` is a presentational child.
- **Parent-child state communication:** `CatalogView.vue` passes book props to `BookCard.vue` and handles its emitted `borrow` event.
- **Route configuration:** `src/router/index.js` includes auth and admin route guards.
- **Composition API:** most views and composables use `<script setup>`, `ref`, `computed`, and lifecycle hooks.
- **Options API:** `components/StatusBadge.vue` uses the Options API.
- **Mixin:** `mixins/timestampMixin.js` demonstrates shared Options API behavior and is used in `BorrowingsView.vue`.
- **Composables:** `useAuth.js`, `useLibrary.js`, and `useLocalStorage.js`.
- **Local storage:** `useLocalStorage.js` stores data in the current browser.
- **CRUD:** `BookManagementView.vue` and `BookForm.vue`.

## Notes about this classroom version
This is a frontend-only learning project. Passwords and roles are stored in browser localStorage, so this is **not secure enough for real public deployment**. For a real library, use a backend API, database, server-side authorization, and hashed passwords. LocalStorage is specific to one browser/device and can be edited by its user.

If you want to reset the demo data, open browser DevTools → Application/Storage → Local Storage, select the local site, and delete keys beginning with `pageturn_`. Refresh the page afterward.


## Recent updates

- Signing out clears the saved session and redirects straight to the login page.
- Added four Ethics books and four Avengers / superhero comic titles to the demo catalog.
- Newly added seed titles are merged into existing local storage without replacing books the user has already edited or added.
=======
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
>>>>>>> d15ca21e626a7f3b9fe7d08e50982ced96e46128
