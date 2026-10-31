import { createSlice } from "@reduxjs/toolkit";

// 1. Buscamos si el usuario ya se había logueado antes (para sobrevivir al F5)
const tokenGuardado = localStorage.getItem("tokenSmartWear") || null;
const usuarioGuardado =
  JSON.parse(localStorage.getItem("usuarioSmartWear")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: usuarioGuardado,
    token: tokenGuardado,
    isAuthenticated: !!tokenGuardado, // true si hay token, false si no hay
  },
  reducers: {
    // Cuando el login es exitoso, guardamos los datos en Redux y en localStorage
    loginSuccess: (state, action) => {
      state.user = action.payload.usuario;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("tokenSmartWear", action.payload.token);
      localStorage.setItem(
        "usuarioSmartWear",
        JSON.stringify(action.payload.usuario),
      );
    },
    // Cuando cerramos sesión, limpiamos todo
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("tokenSmartWear");
      localStorage.removeItem("usuarioSmartWear");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
