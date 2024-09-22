<template>
  <div class="home">
    <NoteList />
    <div class="editor-container">
      <Toolbar :isPreview="isPreview" @toggle-view="toggleView" />
      <div v-if="currentNote" class="content-area">
        <MarkdownEditor
            v-if="!isPreview"
            v-model="currentNote.content"
            @input="updateNote"
        />
        <MarkdownPreview
            v-else
            :markdown="currentNote.content"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {useNotesStore} from '../store/notes'
import NoteList from '../components/NoteList.vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import MarkdownPreview from '../components/MarkdownPreview.vue'
import Toolbar from '../components/Toolbar.vue'

const notesStore = useNotesStore()
const {currentNote} = storeToRefs(notesStore)

const isPreview = ref(false)

onMounted(() => {
  notesStore.fetchNotes()
})

const updateNote = () => {
  if (currentNote.value) {
    notesStore.updateNote(currentNote.value.id, currentNote.value.content)
  }
}

const toggleView = () => {
  isPreview.value = !isPreview.value
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
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>