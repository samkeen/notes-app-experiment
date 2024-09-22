<template>
    <div class="markdown-editor">
      <textarea
        v-model="markdown"
        @input="updateMarkdown"
        placeholder="Enter your markdown here..."
      ></textarea>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])
  
  const markdown = ref(props.modelValue || '')
  
  watch(() => props.modelValue, (newValue) => {
    markdown.value = newValue
  })
  
  const updateMarkdown = () => {
    emit('update:modelValue', markdown.value)
  }
  </script>
  
  <style scoped>
  .markdown-editor {
    width: 100%;
    height: 100%;
  }
  
  textarea {
    width: 100%;
    height: 100%;
    min-height: 300px;
    padding: 10px;
    font-family: monospace;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }
  </style>