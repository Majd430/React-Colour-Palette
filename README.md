
# 🎨 React-Colour-Palette-Builder
An interactive color-palette builder built with React. Create palettes, browse existing ones, view single-color shades, and persist everything to LocalStorage. This is updated code from Colt Steele's React Bootcamp course.

# ✨ Features
Palette list → view, add, and delete palettes.
Palette detail → expand a palette into multiple shades.
Single-color view → see all tints/shades for a color.
Create new palette (form page).
LocalStorage persistence (key: palettes).
Material UI + Emotion styling ecosystem, plus handy UI libs (rc-slider, react-color).

# 🧰 Tech Stack
React 18, React Router.
UI: @mui/material, @emotion/react, @emotion/styled.
Color tooling: rc-slider, react-color, chroma-js.

# 🚦 Routes
/ → Palette list
/palette/new → New palette form
/palette/:id → Palette detail
/palette/:paletteId/:colorId → Single-color view

# 💾 Data Persistence
Palettes are saved to LocalStorage and rehydrated on load:

const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

# 🙌 Acknowledgments
Logo is made by Jared from Udemy, React Course by Colt Steele

# 📄 License
MIT

# 🗣️ Author
Majed Hishmeh
