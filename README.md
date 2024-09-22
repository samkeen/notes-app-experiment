# Markdown Notes App experiment

## Overview

This is a sandbox for a note-taking application built with Vue 3 and EasyMDE.

## Features

- Create and edit notes using Markdown syntax
- Real-time preview of rendered Markdown
- EasyMDE integration for a rich editing experience
- Custom slash command menu
- Local storage for offline access to notes

## Technologies Used

- Vue 3 (Composition API)
- Vite (for fast development and building)
- Pinia (for state management)
- EasyMDE (for Markdown editing)
- Custom AI integration (currently stubbed)

## Getting Started

### Prerequisites

- Node.js (v20 or later recommended)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-enhanced-markdown-notes.git
   cd ai-enhanced-markdown-notes
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Usage

- Create a new note by clicking the "New Note" button.
- Edit your note using Markdown syntax in the EasyMDE editor.
- Use the EasyMDE toolbar for common Markdown formatting options.
- To access slash menu:
   1. Type `/` in the editor to bring up the slash command menu.
   2. Press Enter or click to select an AI function.
   3. The result of the AI function will be inserted at the cursor position.

## Custom Slash Commands

Currently, the app includes two stub AI functions:
- `ai-thing-one`: Simulates an AI process and inserts a completion message.
- `ai-thing-two`: Another simulated AI process with a different completion message.

These stubs are placeholders for future AI integrations.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Vue.js](https://vuejs.org/)
- [EasyMDE](https://github.com/Ionaru/easy-markdown-editor)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
