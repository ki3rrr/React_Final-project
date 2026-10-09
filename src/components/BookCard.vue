<script setup>
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
      </div>
    </div>
  </article>
</template>
