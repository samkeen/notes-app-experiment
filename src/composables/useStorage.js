const NAMESPACE = 'myNotesApp_'

export function useStorage() {
  const storage = window.localStorage

  const getNamespacedKey = (id) => `${NAMESPACE}${id}`

  const saveNote = (id, content) => {
    try {
      storage.setItem(getNamespacedKey(id), JSON.stringify(content))
    } catch (e) {
      console.error(`Failed to save note with id ${id}`, e)
    }
  }

  const getNote = (id) => {
    try {
      const note = storage.getItem(getNamespacedKey(id))
      return note ? JSON.parse(note) : null
    } catch (e) {
      console.warn(`Failed to parse note with id ${id}`, e)
      return null
    }
  }

  const deleteNote = (id) => {
    try {
      storage.removeItem(getNamespacedKey(id))
    } catch (e) {
      console.error(`Failed to delete note with id ${id}`, e)
    }
  }

  const getAllNotes = () => {
    console.log('Fetching all notes from localStorage')
    const notes = []
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (!key.startsWith(NAMESPACE)) {
        continue
      }
      const id = key.slice(NAMESPACE.length)
      console.log(`Processing note with id: ${id}`)
      try {
        const value = storage.getItem(key)
        const item = JSON.parse(value)
        if (item && typeof item === 'object' && 'content' in item) {
          notes.push({ id, ...item })
          console.log(`Successfully added note with id ${id}`)
        } else {
          console.log(`Skipping item with id ${id}: not a valid note structure`)
        }
      } catch (e) {
        console.warn(`Error processing item with id ${id}:`, e)
      }
    }
    console.log(`Returning ${notes.length} notes`)
    return notes
  }

  return {
    saveNote,
    getNote,
    deleteNote,
    getAllNotes
  }
}