<template>
  <div class="markdown-editor-container">
    <textarea ref="editor"></textarea>
    <div v-if="showSlashMenu" class="slash-menu" ref="slashMenuRef" :style="slashMenuStyle" @keydown="handleMenuKeydown" tabindex="-1">
      <div
        v-for="(item, index) in slashMenuItems"
        :key="index"
        @click="selectSlashMenuItem(item)"
        @mouseover="selectedIndex = index"
        :class="['slash-menu-item', { 'selected': selectedIndex === index }]"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const editor = ref(null)
const slashMenuRef = ref(null)
let easyMDE = null

const showSlashMenu = ref(false)
const slashMenuStyle = ref({})
const selectedIndex = ref(0)

// AI function stubs
const doAiThingOne = () => {
  console.log("AI Thing One is being processed...")
  // Here you would typically call an API or perform some AI-related task
  return "AI Thing One has been completed."
}

const doAiThingTwo = () => {
  console.log("AI Thing Two is being processed...")
  // Here you would typically call an API or perform some AI-related task
  return "AI Thing Two has been completed."
}

const slashMenuItems = ref([
  { label: 'ai-thing-one', action: doAiThingOne },
  { label: 'ai-thing-two', action: doAiThingTwo },
])

const handleMenuKeydown = (event) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = (selectedIndex.value + 1) % slashMenuItems.value.length
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = (selectedIndex.value - 1 + slashMenuItems.value.length) % slashMenuItems.value.length
      break
    case 'Enter':
      event.preventDefault()
      selectSlashMenuItem(slashMenuItems.value[selectedIndex.value])
      break
    case 'Escape':
      event.preventDefault()
      showSlashMenu.value = false
      easyMDE.codemirror.focus()
      break
  }
}

const replaceSlashCommand = (text) => {
  const cm = easyMDE.codemirror
  const cursor = cm.getCursor()
  const line = cm.getLine(cursor.line)
  const slashIndex = line.lastIndexOf('/', cursor.ch)

  if (slashIndex !== -1) {
    cm.replaceRange(text,
      { line: cursor.line, ch: slashIndex },
      { line: cursor.line, ch: cursor.ch }
    )
  } else {
    cm.replaceRange(text, cursor, cursor)
  }
  cm.focus()
}

const selectSlashMenuItem = async (item) => {
  showSlashMenu.value = false
  const result = await item.action()
  replaceSlashCommand(result)
}

const positionSlashMenu = (cm) => {
  const cursor = cm.getCursor()
  const coords = cm.cursorCoords(cursor, 'window')
  const editorRect = cm.getWrapperElement().getBoundingClientRect()

  nextTick(() => {
    if (slashMenuRef.value) {
      const menuRect = slashMenuRef.value.getBoundingClientRect()
      const rightSpace = window.innerWidth - coords.left - menuRect.width
      const bottomSpace = window.innerHeight - coords.bottom - menuRect.height

      let top, left

      // Position to the right by default
      left = coords.left + 20 // 20px to the right of cursor

      // If not enough space on the right, position to the left
      if (rightSpace < 10) {
        left = coords.left - menuRect.width - 10
      }

      // Position below by default
      top = coords.top + 20 // 20px below the cursor

      // If not enough space below, position above
      if (bottomSpace < 10) {
        top = coords.top - menuRect.height - 10
      }

      // Ensure the menu stays within the editor boundaries
      left = Math.max(editorRect.left, Math.min(left, editorRect.right - menuRect.width))
      top = Math.max(editorRect.top, Math.min(top, editorRect.bottom - menuRect.height))

      slashMenuStyle.value = {
        top: `${top}px`,
        left: `${left}px`
      }
    }
  })
}

onMounted(() => {
  easyMDE = new EasyMDE({
    element: editor.value,
    initialValue: props.modelValue,
    autofocus: true,
    spellChecker: false,
    autosave: {
      enabled: true,
      uniqueId: "MyUniqueID",
      delay: 1000,
    },
    toolbar: [
      "bold", "italic", "heading", "|",
      "quote", "unordered-list", "ordered-list", "|",
      "link", "image", "|",
      "preview", "side-by-side", "fullscreen", "|",
      "guide"
    ],
  })

  easyMDE.codemirror.on("change", () => {
    emit('update:modelValue', easyMDE.value())
  })

  easyMDE.codemirror.on("keyup", (cm, event) => {
    if (event.key === '/') {
      showSlashMenu.value = true
      selectedIndex.value = 0
      positionSlashMenu(cm)
      nextTick(() => {
        slashMenuRef.value?.focus()
      })
    } else if (showSlashMenu.value && event.key !== '/') {
      showSlashMenu.value = false
    }
  })

  // Close slash menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.slash-menu')) {
      showSlashMenu.value = false
    }
  })
})

onUnmounted(() => {
  if (easyMDE) {
    easyMDE.toTextArea()
    easyMDE = null
  }
})

watch(() => props.modelValue, (newValue) => {
  if (easyMDE && newValue !== easyMDE.value()) {
    easyMDE.value(newValue)
  }
})
</script>

<style scoped>
.markdown-editor-container {
  height: 100%;
  position: relative;
}

.slash-menu {
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  outline: none;
}

.slash-menu-item {
  padding: 8px 12px;
  cursor: pointer;
}

.slash-menu-item:hover, .slash-menu-item.selected {
  background-color: #f0f0f0;
}
</style>