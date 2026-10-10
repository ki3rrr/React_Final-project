<script setup>
<<<<<<< HEAD
import { BookOpen, CheckCircle2, CircleAlert } from 'lucide-vue-next'
defineProps({
  book: { type: Object, required: true },
  canBorrow: { type: Boolean, default: false },
})
defineEmits(['borrow'])
</script>

<template>
  <article class="book-card">
    <div class="book-cover-wrap">
      <img v-if="book.cover" class="book-cover" :src="book.cover" :alt="`Cover of ${book.title}`" loading="lazy" @error="$event.target.style.display='none'" />
      <div v-else class="book-cover-fallback"><BookOpen :size="34" /></div>
      <span class="cover-category">{{ book.category }}</span>
    </div>
    <div class="book-card-body">
      <div class="book-author">{{ book.author }}</div>
      <h3>{{ book.title }}</h3>
      <p class="book-description">{{ book.description }}</p>
      <div class="book-card-bottom">
        <span class="availability" :class="book.availableCopies > 0 ? 'available' : 'unavailable'">
          <CheckCircle2 v-if="book.availableCopies > 0" :size="14" />
          <CircleAlert v-else :size="14" />
          {{ book.availableCopies }} {{ book.availableCopies === 1 ? 'copy' : 'copies' }} available
        </span>
        <button v-if="canBorrow" class="button button-primary button-small" :disabled="book.availableCopies < 1" @click="$emit('borrow', book)">
          {{ book.availableCopies > 0 ? 'Borrow' : 'Unavailable' }}
        </button>
=======
import { MoreVertical, Eye, Pencil, Trash2, BookOpen, Clock3 } from 'lucide-vue-next'
import { ref, computed } from 'vue'
const props = defineProps({ book: { type: Object, required: true }, overdue: Boolean })
const emit = defineEmits(['view', 'edit', 'delete'])
const menuOpen = ref(false)
const shortTitle = computed(() => props.book.title.length > 43 ? `${props.book.title.slice(0, 42)}…` : props.book.title)
function choose(action) { menuOpen.value = false; emit(action, props.book) }
</script>
<template>
  <article class="book-card">
    <div class="book-cover" :class="`cover-${book.cover || 'blue'}`">
      <div v-if="book.type === 'Online'" class="ebook-mark"><BookOpen :size="28" /></div>
      <template v-else><span class="cover-mini">{{ book.category }}</span><strong>{{ book.title }}</strong><small>{{ book.author }}</small></template>
    </div>
    <div class="book-info">
      <div class="book-title-row"><h3 :title="book.title">{{ shortTitle }}</h3><span class="status-pill" :class="overdue ? 'status-overdue' : book.status === 'Borrowed' ? 'status-borrowed' : 'status-available'">{{ overdue ? 'Overdue' : book.status }}</span></div>
      <p class="book-price">{{ book.price ? `₱${Number(book.price).toLocaleString()}` : 'Free access' }}</p>
      <p class="book-author">by {{ book.author || 'Unknown author' }}</p>
      <p class="book-meta">{{ book.language || 'English' }} <span>•</span> {{ book.type }} book <span>•</span> {{ book.category }}</p>
      <p v-if="book.status === 'Borrowed'" class="borrower-line"><Clock3 :size="13" /> {{ book.borrower }} · due {{ book.dueDate || 'not set' }}</p>
    </div>
    <div class="card-actions">
      <button class="icon-button" @click="menuOpen = !menuOpen" aria-label="Book actions"><MoreVertical :size="19" /></button>
      <div v-if="menuOpen" class="action-menu">
        <button @click="choose('view')"><Eye :size="15" /> View details</button>
        <button @click="choose('edit')"><Pencil :size="15" /> Edit book</button>
        <button class="danger-text" @click="choose('delete')"><Trash2 :size="15" /> Delete book</button>
>>>>>>> d15ca21e626a7f3b9fe7d08e50982ced96e46128
      </div>
    </div>
  </article>
</template>
