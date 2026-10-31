import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../styles/AuthPage.module.css";

export default function Register() {
  const navigate = useNavigate();

  const images = [
    "/assets/img/1.webp",
    "/assets/img/2.webp",
    "/assets/img/3.webp",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImage((prev) => (prev + 1) % images.length),
      3000,
    );
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.authPage}>
      {/* PANEL IZQUIERDO */}
      <div className={styles.leftPanel}>
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        />
        <div className={styles.overlay}>
          <h1 className={styles.brand}>SmartWear</h1>
          <p className={styles.slogan}>
            Creá tu cuenta y llevá la innovación puesta.
          </p>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className={styles.rightPanel}>
        <Link to="/" className={styles.backHome}>
          ⟵ Volver al inicio
        </Link>
        <h2>Crear cuenta</h2>
        <Formik
          // Cambiamos "name" por "nombre" para que coincida con el modelo de Node.js
          initialValues={{ nombre: "", email: "", password: "" }}
          validationSchema={Yup.object({
            nombre: Yup.string().required("Campo obligatorio"),
            email: Yup.string()
              .email("Correo inválido")
              .required("Campo obligatorio"),
            password: Yup.string()
              .min(6, "Mínimo 6 caracteres")
              .required("Campo obligatorio"),
          })}
          // NUEVA LÓGICA DE SUBMIT CONectada AL BACKEND
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const url = import.meta.env.VITE_API_URL;
              const respuesta = await fetch(`${url}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });

              const data = await respuesta.json();

              if (respuesta.ok) {
                Swal.fire({
                  icon: "success",
                  title: "¡Cuenta creada con éxito!",
                  text: "Ahora podés iniciar sesión",
                  confirmButtonColor: "#7dc6d9",
                });
                navigate("/login");
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: data.msg,
                  confirmButtonColor: "#7dc6d9",
                });
              }
            } catch (error) {
              console.error(error);
              Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar con el servidor.",
                confirmButtonColor: "#7dc6d9",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <label htmlFor="nombre">Nombre</label>
              <Field name="nombre" type="text" />
              <ErrorMessage
                name="nombre"
                component="div"
                className={styles.error}
              />

              <label htmlFor="email">Correo electrónico</label>
              <Field name="email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />

              <label htmlFor="password">Contraseña</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registrando..." : "Registrarse"}
              </button>

              <p className={styles.switchText}>
                ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
