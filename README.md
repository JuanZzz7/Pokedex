# Pokédex Viewer ⚡

Este proyecto nació como parte de una actividad práctica, donde decidí utilizar **React** (junto con Vite) para poner en práctica y fortalecer conceptos sobre componentes, consumo de APIs y manejo de estados. 

Lo dejo por aquí en el repositorio por si a alguien le sirve de referencia, quiere revisar la implementación o le llama la atención el diseño de la interfaz.

---

## 🛠️ ¿Qué incluye?

- **Consumo de PokéAPI v2:** Consulta directa a los endpoints de [PokeAPI](https://pokeapi.co/).
- **Búsqueda flexible:** Puedes consultar cualquier Pokémon tanto por su **nombre** (ej: *charizard*, *gengar*) como por su **número de Pokédex** (ej: *6*, *94*).
- **Diseño interactivo:**
  - Ilustración oficial del Pokémon en alta resolución.
  - Iluminación dinámica de fondo según el tipo elemental del Pokémon.
  - Resumen de 3 datos clave: tipos, dimensiones físicas (altura/peso) y habilidades.
  - Botón de selección al azar (🎲) y atajos rápidos a Pokémon populares.

---

## 🚀 Cómo ejecutarlo localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JuanZzz7/Pokedex.git
   cd Pokedex
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. Abre en tu navegador la dirección que indique la terminal (usualmente `http://localhost:5173`).

---

## 📦 Tecnologías utilizadas

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [PokéAPI v2](https://pokeapi.co/)
- CSS moderno (Glassmorphism, gradientes dinámicos y Flexbox)
