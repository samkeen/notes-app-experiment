<template>
  <div class="toolbar">
    <button @click="$emit('toggle-view')">
      {{ isPreview ? 'Show Markdown' : 'Show Preview' }}
    </button>
    <!-- Add more toolbar items here in the future -->
  </div>
</template>

<script setup>
defineProps({
  isPreview: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle-view'])
</script>

<style scoped>
.toolbar {
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}

button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>