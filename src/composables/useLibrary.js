<<<<<<< HEAD
import { computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'
import { seedBooks, seedBorrowings } from '../data/seed'

const books = useLocalStorage('pageturn_books', seedBooks)
const borrowings = useLocalStorage('pageturn_borrowings', seedBorrowings)

const makeId = prefix => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export function useLibrary() {
  const categories = computed(() => [...new Set(books.value.map(book => book.category).filter(Boolean))].sort())
  const availableBooks = computed(() => books.value.filter(book => book.availableCopies > 0))
  const pendingBorrowings = computed(() => borrowings.value.filter(item => item.status === 'pending'))

  function createBook(payload) {
    const totalCopies = Math.max(0, Number(payload.totalCopies) || 0)
    books.value.unshift({
      ...payload,
      id: makeId('b'),
      year: Number(payload.year) || new Date().getFullYear(),
      totalCopies,
      availableCopies: totalCopies,
    })
  }

  function updateBook(id, payload) {
    const index = books.value.findIndex(book => book.id === id)
    if (index < 0) return { ok: false, message: 'Book not found.' }
    const old = books.value[index]
    const currentlyBorrowed = old.totalCopies - old.availableCopies
    const nextTotal = Math.max(currentlyBorrowed, Number(payload.totalCopies) || 0)
    books.value[index] = {
      ...old,
      ...payload,
      year: Number(payload.year) || old.year,
      totalCopies: nextTotal,
      availableCopies: Math.max(0, nextTotal - currentlyBorrowed),
    }
    return { ok: true }
  }

  function deleteBook(id) {
    const activeLoan = borrowings.value.some(item => item.bookId === id && ['pending', 'approved'].includes(item.status))
    if (activeLoan) return { ok: false, message: 'This book has a pending or active borrowing. Resolve it before deleting.' }
    books.value = books.value.filter(book => book.id !== id)
    return { ok: true }
  }

  function requestBorrow(bookId, userId) {
    const book = books.value.find(item => item.id === bookId)
    if (!book) return { ok: false, message: 'Book not found.' }
    if (book.availableCopies < 1) return { ok: false, message: 'No copies are currently available.' }
    const hasActive = borrowings.value.some(item => item.bookId === bookId && item.userId === userId && ['pending', 'approved'].includes(item.status))
    if (hasActive) return { ok: false, message: 'You already have a pending request or active loan for this book.' }
    borrowings.value.unshift({
      id: makeId('br'),
      bookId,
      userId,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      dueAt: null,
      returnedAt: null,
    })
    return { ok: true, message: 'Borrow request sent to the library admin.' }
  }

  function approveBorrow(id) {
    const loan = borrowings.value.find(item => item.id === id)
    if (!loan || loan.status !== 'pending') return { ok: false, message: 'This request is no longer pending.' }
    const book = books.value.find(item => item.id === loan.bookId)
    if (!book || book.availableCopies < 1) return { ok: false, message: 'No copies are currently available.' }
    book.availableCopies -= 1
    loan.status = 'approved'
    loan.dueAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    loan.approvedAt = new Date().toISOString()
    return { ok: true }
  }

  function rejectBorrow(id) {
    const loan = borrowings.value.find(item => item.id === id)
    if (!loan || loan.status !== 'pending') return { ok: false, message: 'This request is no longer pending.' }
    loan.status = 'rejected'
    loan.rejectedAt = new Date().toISOString()
    return { ok: true }
  }

  function returnBorrow(id, userId = null) {
    const loan = borrowings.value.find(item => item.id === id)
    if (!loan || loan.status !== 'approved') return { ok: false, message: 'Only approved loans can be returned.' }
    if (userId && loan.userId !== userId) return { ok: false, message: 'You can only return your own books.' }
    const book = books.value.find(item => item.id === loan.bookId)
    if (book) book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1)
    loan.status = 'returned'
    loan.returnedAt = new Date().toISOString()
    return { ok: true }
  }

  function cancelRequest(id, userId) {
    const loan = borrowings.value.find(item => item.id === id)
    if (!loan || loan.userId !== userId || loan.status !== 'pending') {
      return { ok: false, message: 'Only your own pending requests can be cancelled.' }
    }
    loan.status = 'cancelled'
    return { ok: true }
  }

  return {
    books, borrowings, categories, availableBooks, pendingBorrowings,
    createBook, updateBook, deleteBook, requestBorrow, approveBorrow,
    rejectBorrow, returnBorrow, cancelRequest,
  }
}
=======
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
>>>>>>> d15ca21e626a7f3b9fe7d08e50982ced96e46128
