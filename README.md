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
```bash
npm run build
npm run preview
```

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
