import { defineStore } from 'pinia'
import { useStorage } from '../composables/useStorage'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    currentNoteId: null
  }),
  getters: {
    currentNote: (state) => state.notes.find(note => note.id === state.currentNoteId)
  },
  actions: {
    async fetchNotes() {
      try {
        const { getAllNotes } = useStorage()
        this.notes = getAllNotes()
        if (this.notes.length > 0 && !this.currentNoteId) {
          this.currentNoteId = this.notes[0].id
        }
        this.error = null
      } catch (e) {
        console.error('Failed to fetch notes:', e)
        this.error = 'Failed to fetch notes. Please try again.'
      }
    },
    async createNote(content) {
      const { saveNote } = useStorage()
      const id = Date.now().toString()
      const newNote = { id, content, createdAt: new Date().toISOString() }
      saveNote(id, newNote)
      this.notes.push(newNote)
      this.currentNoteId = id
    },
    async updateNote(id, content) {
      const { saveNote } = useStorage()
      const noteIndex = this.notes.findIndex(note => note.id === id)
      if (noteIndex !== -1) {
        const updatedNote = { ...this.notes[noteIndex], content, updatedAt: new Date().toISOString() }
        this.notes[noteIndex] = updatedNote
        saveNote(id, updatedNote)
      }
    },
    async deleteNote(id) {
      const { deleteNote } = useStorage()
      deleteNote(id)
      this.notes = this.notes.filter(note => note.id !== id)
      if (this.currentNoteId === id) {
        this.currentNoteId = this.notes.length > 0 ? this.notes[0].id : null
      }
    },
    setCurrentNote(id) {
      this.currentNoteId = id
    }
  }
})