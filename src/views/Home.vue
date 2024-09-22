<template>
  <div class="home">
    <NoteList />
    <div class="editor-container">
      <WYSIWYGMarkdownEditor
        v-if="currentNote"
        v-model="currentNote.content"
        @update:modelValue="updateNote"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotesStore } from '../store/notes'
import NoteList from '../components/NoteList.vue'
import WYSIWYGMarkdownEditor from '../components/MarkdownEditor.vue'

const notesStore = useNotesStore()
const { currentNote } = storeToRefs(notesStore)

onMounted(() => {
  notesStore.fetchNotes()
})

const updateNote = (content) => {
  if (currentNote.value) {
    notesStore.updateNote(currentNote.value.id, content)
  }
}

watch(() => currentNote.value, (newNote) => {
  if (newNote) {
    notesStore.setCurrentNote(newNote.id)
  }
})
</script>

<style scoped>
.home {
  display: flex;
  height: 100vh;
}

.editor-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>