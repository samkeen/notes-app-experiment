<template>
  <div class="markdown-editor-container" :class="{ 'fullscreen': isFullscreen }">
    <div class="toolbar">
      <button @click="insertMarkdown('**', '**')" title="Bold (Ctrl+B)">B</button>
      <button @click="insertMarkdown('*', '*')" title="Italic (Ctrl+I)">I</button>
      <button @click="insertMarkdown('# ')" title="Heading">H</button>
      <button @click="insertMarkdown('[', '](url)')" title="Link">Link</button>
      <button @click="insertList" title="List">List</button>
      <button @click="insertCodeBlock" title="Code Block">Code</button>
      <button @click="toggleFullscreen" title="Toggle Fullscreen">
        {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
      </button>
      <button @click="showHelpModal = true" title="Help">?</button>
      <button @click="confirmDelete" title="Delete Note" class="delete-button">Delete</button>
    </div>
    <textarea
      ref="editorRef"
      class="markdown-editor"
      :value="modelValue"
      @input="handleInput"
      @keydown="handleKeyDown"
    ></textarea>
    <div class="markdown-preview" v-html="renderedMarkdown"></div>

    <!-- Help Modal -->
    <div v-if="showHelpModal" class="modal">
      <div class="modal-content">
        <h2>Markdown Editor Help</h2>
        <h3>Keyboard Shortcuts</h3>
        <ul>
          <li><strong>Ctrl+B</strong>: Bold</li>
          <li><strong>Ctrl+I</strong>: Italic</li>
        </ul>
        <h3>Markdown Syntax</h3>
        <ul>
          <li><code># Heading</code>: Create a heading</li>
          <li><code>**Bold**</code>: Make text bold</li>
          <li><code>*Italic*</code>: Make text italic</li>
          <li><code>[Link](url)</code>: Create a link</li>
          <li><code>- Item</code>: Create a list item</li>
          <li><code>```</code>: Create a code block</li>
        </ul>
        <button @click="showHelpModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import debounce from 'lodash/debounce'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'delete'])

const editorRef = ref(null)
const isFullscreen = ref(false)
const showHelpModal = ref(false)

const renderedMarkdown = computed(() => {
  const rendered = marked(props.modelValue || '')
  return DOMPurify.sanitize(rendered)
})

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this note?')) {
    emit('delete')
  }
}

const handleInput = debounce((event) => {
  emit('update:modelValue', event.target.value)
}, 100)

const insertMarkdown = (before, after = '') => {
  const input = editorRef.value
  const start = input.selectionStart
  const end = input.selectionEnd
  const text = input.value
  const newText = text.substring(0, start) + before + text.substring(start, end) + after + text.substring(end)

  emit('update:modelValue', newText)

  nextTick(() => {
    input.focus()
    input.setSelectionRange(start + before.length, end + before.length)
  })
}

const insertList = () => {
  const input = editorRef.value
  const start = input.selectionStart
  const text = input.value
  const lines = text.substring(0, start).split('\n')
  const currentLine = lines[lines.length - 1]
  const listPrefix = currentLine.trim().startsWith('- ') ? '' : '- '
  insertMarkdown(listPrefix)
}

const insertCodeBlock = () => {
  insertMarkdown('```\n', '\n```')
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const handleKeyDown = (event) => {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key.toLowerCase()) {
      case 'b':
        event.preventDefault()
        insertMarkdown('**', '**')
        break
      case 'i':
        event.preventDefault()
        insertMarkdown('*', '*')
        break
    }
  }
}

watch(() => props.modelValue, (newValue) => {
  if (editorRef.value && newValue !== editorRef.value.value) {
    editorRef.value.value = newValue
  }
})
</script>

<style scoped>
.markdown-editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.markdown-editor-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: white;
}

.toolbar {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f0f0f0;
}

.toolbar button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.toolbar button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545 !important;
}

.delete-button:hover {
  background-color: #c82333 !important;
}

.markdown-editor, .markdown-preview {
  flex: 1;
  border: 1px solid #ccc;
  min-height: 300px;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
  overflow-y: auto;
}

.markdown-editor {
  resize: none;
}

.markdown-editor:focus {
  outline: none;
  border-color: #007bff;
}

.markdown-preview {
  background-color: #f8f8f8;
  font-family: Arial, sans-serif;
}

.modal {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content ul {
  padding-left: 20px;
}

.modal-content button {
  margin-top: 20px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #0056b3;
}
</style>