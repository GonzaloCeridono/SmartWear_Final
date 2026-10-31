import jwt from "jsonwebtoken";

export const generarJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    // El payload es la info que guardamos en el token. Solo el ID, nada sensible.
    const payload = { uid };

    // Firmamos el token la palabra secreta del .env
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY as string,
      {
        expiresIn: "4h", // El token dura 4 horas
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      },
    );
  });
};
