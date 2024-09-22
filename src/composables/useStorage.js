import { ref } from 'vue'

export function useStorage() {
  const storage = window.localStorage

  const saveNote = (id, content) => {
    storage.setItem(id, JSON.stringify(content))
  }

  const getNote = (id) => {
    const note = storage.getItem(id)
    return note ? JSON.parse(note) : null
  }

  const deleteNote = (id) => {
    storage.removeItem(id)
  }

  const getAllNotes = () => {
    return Object.keys(storage).map(id => ({
      id,
      ...JSON.parse(storage.getItem(id))
    }))
  }

  return {
    saveNote,
    getNote,
    deleteNote,
    getAllNotes
  }
}