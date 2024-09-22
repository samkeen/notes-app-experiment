<template>
    <div class="note-list">
      <h2>Notes</h2>
      <ul>
        <li v-for="note in notes" :key="note.id" @click="selectNote(note.id)">
          {{ note.content.substring(0, 30) }}...
        </li>
      </ul>
      <button @click="createNewNote">New Note</button>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia'
  import { useNotesStore } from '../store/notes'
  
  const notesStore = useNotesStore()
  const { notes } = storeToRefs(notesStore)
  
  const selectNote = (id) => {
    notesStore.setCurrentNote(id)
  }
  
  const createNewNote = () => {
    notesStore.createNote('New note')
  }
  </script>
  
  <style scoped>
  .note-list {
    width: 200px;
    border-right: 1px solid #ccc;
    padding: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    cursor: pointer;
    padding: 5px 0;
  }
  
  li:hover {
    background-color: #f0f0f0;
  }
  
  button {
    margin-top: 10px;
  }
  </style>