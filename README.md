# Markdown Notes App

## Overview

Markdown Notes App is a web-based note-taking application built with Vue 3 and the Composition 
API. It allows users to create, edit, and manage notes using Markdown syntax, with a real-time 
preview of the rendered content.

## Features

- Create and edit notes using Markdown syntax
- Real-time preview of rendered Markdown
- WYSIWYG-style toolbar for common Markdown formatting
- Local storage for offline access to notes
- Responsive design for use on various devices
- Keyboard shortcuts for quick formatting
- Fullscreen mode for distraction-free writing
- Help modal with Markdown syntax guide

## Technologies Used

- Vue 3 (Composition API)
- Vite (for fast development and building)
- Pinia (for state management)
- Marked (for Markdown parsing)
- DOMPurify (for sanitizing rendered HTML)

## ToDos
- Start a branch and experiment with: [EasyMDE](https://github.com/Ionaru/easy-markdown-editor?tab=readme-ov-file)

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/markdown-notes-app.git
   cd markdown-notes-app
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

### Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Usage

- Create a new note by clicking the "New Note" button.
- Edit your note using Markdown syntax in the left pane.
- See the rendered preview in the right pane.
- Use the toolbar buttons for quick formatting.
- Notes are automatically saved to local storage.
- Click the help (?) button for a quick Markdown syntax reference.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Vue.js](https://vuejs.org/)
- [Marked](https://marked.js.org/)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)

---

Feel free to customize this README to better fit your project's specific details and requirements!