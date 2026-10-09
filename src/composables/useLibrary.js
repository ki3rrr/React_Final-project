import { computed, ref, watch } from 'vue'
import { seedBooks } from '../data/seedBooks'

const STORAGE_KEY = 'book-library-system-v1'
const saved = loadSaved()
const books = ref(saved ?? seedBooks.map(book => ({ ...book })))
const borrowers = ref(['Mika Santos', 'Paolo Reyes', 'Ana Cruz', 'Jules Garcia', 'Sam Dela Rosa'])

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.warn('Could not read saved library data:', error)
    return null
  }
}

watch(books, value => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) }
  catch (error) { console.warn('Could not save library data:', error) }
}, { deep: true })

export function useLibrary() {
  const totalBooks = computed(() => books.value.length)
  const borrowedBooks = computed(() => books.value.filter(book => book.status === 'Borrowed').length)
  const overdueBooks = computed(() => books.value.filter(isOverdue).length)
  const borrowingUsers = computed(() => new Set(books.value.filter(book => book.status === 'Borrowed').map(book => book.borrower).filter(Boolean)).size)

  function isOverdue(book) {
    return book.status === 'Borrowed' && book.dueDate && new Date(`${book.dueDate}T23:59:59`) < new Date()
  }
  function addBook(bookData) {
    const nextId = Math.max(0, ...books.value.map(book => Number(book.id) || 0)) + 1
    books.value.unshift({ ...bookData, id: nextId, status: 'Available', borrower: '', dueDate: '' })
  }
  function updateBook(id, changes) {
    const index = books.value.findIndex(book => book.id === id)
    if (index !== -1) books.value[index] = { ...books.value[index], ...changes }
  }
  function deleteBook(id) {
    books.value = books.value.filter(book => book.id !== id)
  }
  function borrowBook(id, borrower, dueDate) {
    const book = books.value.find(item => item.id === id)
    if (!book || book.status !== 'Available') return false
    updateBook(id, { status: 'Borrowed', borrower, dueDate })
    if (!borrowers.value.includes(borrower)) borrowers.value.push(borrower)
    return true
  }
  function returnBook(id) {
    const book = books.value.find(item => item.id === id)
    if (!book || book.status !== 'Borrowed') return false
    updateBook(id, { status: 'Available', borrower: '', dueDate: '' })
    return true
  }
  function resetDemoData() {
    books.value = seedBooks.map(book => ({ ...book }))
    localStorage.removeItem(STORAGE_KEY)
  }
  return { books, borrowers, totalBooks, borrowedBooks, overdueBooks, borrowingUsers, isOverdue, addBook, updateBook, deleteBook, borrowBook, returnBook, resetDemoData }
}
