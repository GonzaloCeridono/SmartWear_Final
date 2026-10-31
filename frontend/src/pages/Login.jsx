import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// Importamos la nueva acción de tu authSlice
import { loginSuccess } from "../features/auth/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../styles/AuthPage.module.css";

export default function Login() {
  const dispatch = useDispatch();
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
      {/* PANEL IZQUIERDO CON FONDO */}
      <div className={styles.leftPanel}>
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        />
        <div className={styles.overlay}>
          <h1 className={styles.brand}>SmartWear</h1>
          <p className={styles.slogan}>
            Tecnología y estilo fusionados en cada prenda.
          </p>
        </div>
      </div>

      {/* PANEL DERECHO CON FORMULARIO */}
      <div className={styles.rightPanel}>
        <Link to="/" className={styles.backHome}>
          ⟵ Volver al inicio
        </Link>
        <h2>Iniciar sesión</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Correo inválido")
              .required("Campo obligatorio"),
            password: Yup.string().required("Campo obligatorio"),
          })}
          // NUEVA LÓGICA DE SUBMIT CONectada AL BACKEND
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const url = import.meta.env.VITE_API_URL;
              const respuesta = await fetch(`${url}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });

              const data = await respuesta.json();

              if (respuesta.ok) {
                dispatch(
                  loginSuccess({ usuario: data.usuario, token: data.token }),
                );

                Swal.fire({
                  icon: "success",
                  title: `¡Bienvenido ${data.usuario.nombre}!`,
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 2000,
                });

                navigate("/");
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
                {isSubmitting ? "Cargando..." : "Iniciar sesión"}
              </button>

              <p className={styles.switchText}>
                ¿No tenés cuenta? <Link to="/register">Registrate</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
