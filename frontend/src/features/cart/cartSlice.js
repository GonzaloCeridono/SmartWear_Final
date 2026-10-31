import { createSlice } from "@reduxjs/toolkit";

// 1. Leemos el carrito desde localStorage de forma segura
let estadoInicial = {
  items: [],
  total: 0,
};

try {
  const stored = localStorage.getItem("cart");
  if (stored) {
    const parsed = JSON.parse(stored);
    // Validamos que tenga la estructura correcta para que no se rompa la app
    if (parsed && Array.isArray(parsed.items)) {
      estadoInicial = parsed;
    }
  }
} catch (error) {
  console.error("Error al leer el carrito del localStorage:", error);
}

// 2. Creamos el Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: estadoInicial, // Usamos la variable que definimos arriba
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // Usamos _id de Mongo
      const existing = state.items.find((i) => i._id === item._id);

      if (existing) {
        existing.cantidad += 1;
      } else {
        state.items.push({ ...item, cantidad: 1 });
      }

      state.total = state.items.reduce(
        (acc, i) => acc + i.precio * i.cantidad,
        0,
      );
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        if (item.cantidad > 1) {
          item.cantidad -= 1;
        } else {
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
        state.total = state.items.reduce(
          (acc, i) => acc + i.precio * i.cantidad,
          0,
        );
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      state.total = state.items.reduce(
        (acc, i) => acc + i.precio * i.cantidad,
        0,
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// 3. Suscripción de Redux para guardar automáticamente (ya la tenías armada y es perfecta)
export const persistCart = (store) => {
  store.subscribe(() => {
    const state = store.getState().cart;
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch (error) {
      console.error("Error al guardar el carrito:", error);
    }
  });
};
