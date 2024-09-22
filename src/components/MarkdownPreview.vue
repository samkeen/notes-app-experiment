<template>
    <div class="markdown-preview" v-html="sanitizedHtml"></div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { marked } from 'marked'
  import DOMPurify from 'dompurify'
  
  const props = defineProps(['markdown'])
  
  const sanitizedHtml = computed(() => {
    const rawHtml = marked(props.markdown || '')
    return DOMPurify.sanitize(rawHtml)
  })
  </script>
  
  <style scoped>
  .markdown-preview {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  </style>