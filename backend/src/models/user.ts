import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  rol: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

// Medida de seguridad: Sobrescribimos el método toJSON para que cuando
// devolvamos el usuario al frontend, NUNCA se envíe la contraseña encriptada.
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  // Renombramos visualmente el _id a uid (User ID) por convención, pero en la DB sigue siendo _id
  usuario.uid = _id;
  return usuario;
};

export default model("User", UserSchema);
