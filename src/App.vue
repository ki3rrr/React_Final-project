<script setup>
<<<<<<< HEAD
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import { useAuth } from './composables/useAuth'

const route = useRoute()
const router = useRouter()
const { currentUser, isAdmin, logout } = useAuth()
const isAuthPage = computed(() => ['login', 'register'].includes(route.name))

function handleLogout() {
  logout()
  router.replace({ name: 'login' })
=======
import { computed, ref } from 'vue'
import { Search, Plus, CalendarDays, Bell, MessageSquare, ChevronDown, SlidersHorizontal, BookOpen, Users, BookMarked, AlertTriangle, X, CheckCircle2, CircleAlert, LibraryBig, ArrowUpRight, FilterX } from 'lucide-vue-next'
import SidebarNav from './components/SidebarNav.vue'
import MetricCard from './components/MetricCard.vue'
import BookCard from './components/BookCard.vue'
import BookFormModal from './components/BookFormModal.vue'
import BookDetailsModal from './components/BookDetailsModal.vue'
import OptionsApiExample from './components/OptionsApiExample.vue'
import { useLibrary } from './composables/useLibrary'
import { useToast } from './composables/useToast'

const { books, borrowers, totalBooks, borrowedBooks, overdueBooks, borrowingUsers, isOverdue, addBook, updateBook, deleteBook, borrowBook, returnBook, resetDemoData } = useLibrary()
const { message, kind, showToast, clearToast } = useToast()
const activePage = ref('inventory')
const activeType = ref('Physical')
const searchQuery = ref('')
const statusFilter = ref('All status')
const categoryFilter = ref('All categories')
const filterOpen = ref(false)
const mobileOpen = ref(false)
const formOpen = ref(false)
const editingBook = ref(null)
const selectedBook = ref(null)
const detailsOpen = ref(false)
const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const filteredBooks = computed(() => books.value.filter(book => {
  const query = searchQuery.value.trim().toLowerCase()
  const matchesQuery = !query || [book.title, book.author, book.category, book.isbn, book.borrower].some(value => String(value || '').toLowerCase().includes(query))
  const matchesType = activeType.value === 'All' || book.type === activeType.value
  const matchesStatus = statusFilter.value === 'All status' || (statusFilter.value === 'Overdue' ? isOverdue(book) : book.status === statusFilter.value)
  const matchesCategory = categoryFilter.value === 'All categories' || book.category === categoryFilter.value
  return matchesQuery && matchesType && matchesStatus && matchesCategory
}))
const categories = computed(() => [...new Set(books.value.map(book => book.category).filter(Boolean))].sort())
const pageTitle = computed(() => ({ dashboard: 'Dashboard', inventory: 'Book Inventory', borrow: 'Borrow / Return Books', users: 'Borrowing Users' })[activePage.value] || 'Book Inventory')
const borrowedList = computed(() => books.value.filter(book => book.status === 'Borrowed'))
const activeBorrowers = computed(() => [...new Set(borrowedList.value.map(book => book.borrower).filter(Boolean))].map(name => ({ name, books: borrowedList.value.filter(book => book.borrower === name), overdue: borrowedList.value.filter(book => book.borrower === name && isOverdue(book)).length })))
function navigate(page) { activePage.value = page; mobileOpen.value = false }
function openAdd() { editingBook.value = null; formOpen.value = true }
function openEdit(book) { editingBook.value = { ...book }; formOpen.value = true }
function saveBook(data) {
  if (editingBook.value) { updateBook(editingBook.value.id, data); showToast('Book details updated successfully.') }
  else { addBook(data); showToast('New book added to your catalog.') }
  formOpen.value = false; editingBook.value = null
}
function viewBook(book) { selectedBook.value = book; detailsOpen.value = true }
function askDelete(book) {
  if (window.confirm(`Delete "${book.title}" from the library? This cannot be undone.`)) {
    deleteBook(book.id); showToast('Book removed from the catalog.', 'info')
    if (selectedBook.value?.id === book.id) detailsOpen.value = false
  }
}
function borrowSelected({ id, borrower, dueDate }) {
  if (borrowBook(id, borrower, dueDate)) { showToast(`Book borrowed by ${borrower}.`); detailsOpen.value = false }
  else showToast('This book is no longer available.', 'error')
}
function returnSelected(id) { returnBook(id); showToast('Book marked as returned.'); detailsOpen.value = false }
function resetAll() {
  if (window.confirm('Reset the library to the original demo books? Your saved changes will be lost.')) {
    resetDemoData(); searchQuery.value = ''; statusFilter.value = 'All status'; categoryFilter.value = 'All categories'; showToast('Demo data restored.')
  }
>>>>>>> d15ca21e626a7f3b9fe7d08e50982ced96e46128
}
</script>

<template>
  <div class="app-shell">
<<<<<<< HEAD
    <template v-if="!isAuthPage && currentUser">
      <AppSidebar :user="currentUser" :is-admin="isAdmin" @logout="handleLogout" />
      <div class="main-column">
        <AppHeader :user="currentUser" :is-admin="isAdmin" @logout="handleLogout" />
        <main class="page-content">
          <RouterView />
        </main>
      </div>
    </template>
    <RouterView v-else />
=======
    <SidebarNav :active-page="activePage" :mobile-open="mobileOpen" @navigate="navigate" @toggle-mobile="mobileOpen = !mobileOpen" @reset="resetAll" />
    <main class="main-area">
      <header class="topbar">
        <div class="topbar-search"><Search :size="17" /><input v-model="searchQuery" aria-label="Search library" placeholder="Search books, authors, borrowers..." /><button v-if="searchQuery" class="clear-search" @click="searchQuery = ''" aria-label="Clear search"><X :size="14" /></button></div>
        <div class="topbar-tools"><div class="date-chip"><CalendarDays :size="16" /><span>{{ currentDate }}</span></div><button class="top-icon" aria-label="Notifications" @click="showToast('You are all caught up!', 'info')"><Bell :size="18" /><i></i></button><button class="top-icon message-icon" aria-label="Messages" @click="showToast('No new messages.', 'info')"><MessageSquare :size="18" /></button><button class="profile-chip" @click="showToast('Signed in as Library Admin.', 'info')"><span class="profile-avatar">AD</span><span class="profile-name">Admin</span><ChevronDown :size="14" /></button></div>
      </header>
      <div class="page-content">
        <div class="welcome-row"><div><p class="eyebrow">LIBRARY MANAGEMENT</p><h1>{{ pageTitle }}</h1><p class="page-subtitle">Manage your collection and keep every book in the right hands.</p></div><button class="btn btn-primary add-button" @click="openAdd"><Plus :size="17" /> Add book</button></div>

        <section class="metrics-grid" aria-label="Library summary">
          <MetricCard label="Total Books" :value="totalBooks" detail="Books in catalog" tone="violet" :icon="BookOpen" />
          <MetricCard label="Borrowing Users" :value="borrowingUsers" detail="Active borrowers" tone="blue" :icon="Users" />
          <MetricCard label="Total Borrowed" :value="borrowedBooks" detail="Currently checked out" tone="green" :icon="BookMarked" />
          <MetricCard label="Overdue Books" :value="overdueBooks" detail="Need to be returned" tone="orange" :icon="AlertTriangle" />
        </section>

        <template v-if="activePage === 'inventory'">
          <section class="inventory-section">
            <div class="section-heading"><div><h2>Book collection <span class="count-badge">{{ filteredBooks.length }}</span></h2><p>Browse, search, and manage your library books.</p></div><button class="btn btn-outline filter-button" :class="{ 'filter-active': filterOpen }" @click="filterOpen = !filterOpen"><SlidersHorizontal :size="16" /> Filters <span v-if="statusFilter !== 'All status' || categoryFilter !== 'All categories'" class="filter-dot"></span></button></div>
            <div v-if="filterOpen" class="filter-panel"><label class="field">Availability<select v-model="statusFilter"><option>All status</option><option>Available</option><option>Borrowed</option><option>Overdue</option></select></label><label class="field">Category<select v-model="categoryFilter"><option>All categories</option><option v-for="category in categories" :key="category">{{ category }}</option></select></label><button class="btn btn-quiet clear-filters" @click="statusFilter = 'All status'; categoryFilter = 'All categories'"><FilterX :size="15" /> Clear filters</button></div>
            <div class="tabs-row"><div class="type-tabs"><button v-for="tab in ['Physical', 'Online', 'All']" :key="tab" :class="{ selected: activeType === tab }" @click="activeType = tab">{{ tab === 'All' ? 'All Books' : `${tab} Books` }}</button></div><span class="result-note">{{ filteredBooks.length }} result{{ filteredBooks.length === 1 ? '' : 's' }}</span></div>
            <div v-if="filteredBooks.length" class="books-grid"><BookCard v-for="book in filteredBooks" :key="book.id" :book="book" :overdue="isOverdue(book)" @view="viewBook" @edit="openEdit" @delete="askDelete" /></div>
            <div v-else class="empty-state"><div class="empty-icon"><Search :size="25" /></div><h3>No books found</h3><p>Try a different search term or clear your filters.</p><button class="btn btn-outline" @click="searchQuery = ''; statusFilter = 'All status'; categoryFilter = 'All categories'; activeType = 'All'">Show all books</button></div>
          </section>
        </template>

        <section v-else-if="activePage === 'dashboard'" class="content-panel">
          <div class="section-heading"><div><h2>Library overview</h2><p>A quick look at the current collection.</p></div><button class="btn btn-primary" @click="navigate('inventory')">View inventory <ArrowUpRight :size="16" /></button></div>
          <div class="overview-grid"><button class="overview-tile" @click="activeType = 'All'; navigate('inventory')"><span class="overview-icon tone-violet"><BookOpen :size="19" /></span><strong>{{ totalBooks }}</strong><span>Total cataloged books</span></button><button class="overview-tile" @click="statusFilter = 'Borrowed'; activeType = 'All'; navigate('inventory')"><span class="overview-icon tone-green"><BookMarked :size="19" /></span><strong>{{ borrowedBooks }}</strong><span>Books currently borrowed</span></button><button class="overview-tile" @click="statusFilter = 'Overdue'; activeType = 'All'; navigate('inventory')"><span class="overview-icon tone-orange"><AlertTriangle :size="19" /></span><strong>{{ overdueBooks }}</strong><span>Overdue returns</span></button></div>
          <h3 class="subsection-title">Recently added / catalog entries</h3><div class="recent-list"><div v-for="book in books.slice(0, 5)" :key="book.id" class="recent-row"><div class="recent-book-icon"><BookOpen :size="17" /></div><div class="recent-book-text"><strong>{{ book.title }}</strong><span>{{ book.author }} · {{ book.category }}</span></div><span class="status-pill" :class="book.status === 'Borrowed' ? 'status-borrowed' : 'status-available'">{{ book.status }}</span><button class="icon-button" @click="viewBook(book)" aria-label="View book"><ArrowUpRight :size="17" /></button></div></div>
        </section>

        <section v-else-if="activePage === 'borrow'" class="content-panel">
          <div class="section-heading"><div><h2>Borrow / Return desk</h2><p>Track books checked out by students and record returns.</p></div></div>
          <div v-if="borrowedList.length" class="borrow-table-wrap"><table class="data-table"><thead><tr><th>Book</th><th>Borrower</th><th>Due date</th><th>Status</th><th>Action</th></tr></thead><tbody><tr v-for="book in borrowedList" :key="book.id"><td><strong>{{ book.title }}</strong><small>{{ book.author }}</small></td><td>{{ book.borrower }}</td><td>{{ book.dueDate || 'Not set' }}</td><td><span class="status-pill" :class="isOverdue(book) ? 'status-overdue' : 'status-borrowed'">{{ isOverdue(book) ? 'Overdue' : 'Borrowed' }}</span></td><td><button class="btn btn-small btn-outline" @click="returnSelected(book.id)"><CheckCircle2 :size="14" /> Return</button></td></tr></tbody></table></div>
          <div v-else class="empty-state"><h3>No borrowed books</h3><p>All books are currently available.</p></div>
          <button class="btn btn-primary borrow-available-button" @click="activeType = 'All'; statusFilter = 'Available'; navigate('inventory')">Find available books <ArrowUpRight :size="16" /></button>
        </section>

        <section v-else-if="activePage === 'users'" class="content-panel">
          <div class="section-heading"><div><h2>Borrowing users</h2><p>Students who currently have books checked out.</p></div></div>
          <div v-if="activeBorrowers.length" class="borrowers-grid"><article v-for="person in activeBorrowers" :key="person.name" class="borrower-card"><div class="borrower-avatar">{{ person.name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase() }}</div><div class="borrower-main"><h3>{{ person.name }}</h3><p>{{ person.books.length }} borrowed book{{ person.books.length === 1 ? '' : 's' }}</p><div v-for="book in person.books" :key="book.id" class="borrower-book-line"><BookOpen :size="14" /><span>{{ book.title }}</span></div></div><span v-if="person.overdue" class="status-pill status-overdue">{{ person.overdue }} overdue</span><span v-else class="status-pill status-available">On track</span></article></div>
          <div v-else class="empty-state"><div class="empty-icon"><Users :size="25" /></div><h3>No active borrowers</h3><p>When a book is borrowed, the borrower will appear here.</p></div>
        </section>
        <OptionsApiExample />
        <footer class="app-footer"><span>© 2026 Ulearna Learning Centre</span><span>Book Library System <span class="footer-dot">•</span> Vue 3</span></footer>
      </div>
    </main>
    <BookFormModal :open="formOpen" :book="editingBook" @close="formOpen = false" @save="saveBook" />
    <BookDetailsModal :open="detailsOpen" :book="selectedBook" :borrowers="borrowers" :overdue="selectedBook ? isOverdue(selectedBook) : false" @close="detailsOpen = false" @borrow="borrowSelected" @return="returnSelected" />
    <Transition name="toast"><div v-if="message" class="toast-message" :class="`toast-${kind}`" role="status"><CheckCircle2 v-if="kind === 'success'" :size="18" /><CircleAlert v-else :size="18" /><span>{{ message }}</span><button @click="clearToast" aria-label="Dismiss notification"><X :size="15" /></button></div></Transition>
>>>>>>> d15ca21e626a7f3b9fe7d08e50982ced96e46128
  </div>
</template>
