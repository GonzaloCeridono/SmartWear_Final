# Documentación de la API (Backend)

Esta API RESTful está desarrollada con Node.js, Express y MongoDB (Mongoose). Provee los servicios necesarios para el e-commerce, incluyendo gestión del catálogo y autenticación mediante JSON Web Tokens (JWT).

## Configuración y Variables de Entorno

Abrir el archivo ".env.example" dentro de la carpeta backend, pegar el codigo que se encuentra en el archivo de texto adjuntado al proyecto, y renombrar el archivo a ".env".

## Endpoints de la API

La URL base para las peticiones locales es: `http://localhost:8080/api`

### 1. Autenticación (`/auth`)

#### Registrar un Usuario

- **Endpoint:** `/auth/register`
- **Método:** `POST`
- **Descripción:** Crea un nuevo usuario, encripta su contraseña (bcryptjs) y lo guarda en la base de datos.
- **Body (JSON):**
  ```json
  {
    "nombre": "Juan Perez",
    "email": "juan@ejemplo.com",
    "password": "password123"
  }
  ```
- **Respuesta (201 Created):**
  ```json
  {
    "msg": "Usuario creado exitosamente",
    "usuario": {
      "uid": "64a1b...",
      "nombre": "Juan Perez",
      "email": "juan@ejemplo.com",
      "estado": true
    }
  }
  ```

#### Iniciar Sesión (Login)

- **Endpoint:** `/auth/login`
- **Método:** `POST`
- **Descripción:** Valida las credenciales. Si son correctas, devuelve la información del usuario y un JWT válido por 4 horas.
- **Body (JSON):**
  ```json
  {
    "email": "juan@ejemplo.com",
    "password": "password123"
  }
  ```
- **Respuesta (200 OK):**
  ```json
  {
    "usuario": {
      "uid": "64a1b...",
      "nombre": "Juan Perez",
      "email": "juan@ejemplo.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
  }
  ```

---

### 2. Catálogo de Productos (`/products`)

#### Obtener catálogo completo

- **Endpoint:** `/products`
- **Método:** `GET`
- **Descripción:** Devuelve un arreglo con todos los productos activos en la base de datos. Es una ruta pública.
- **Respuesta (200 OK):**
  ```json
  [
    {
      "_id": "60d5ec49f1b2c3d4e5f6g7",
      "nombre": "Remera Lisa color Azul",
      "precio": 95000,
      "imagenUrl": "/assets/img/remera.jpg",
      "categoria": "Ropa",
      "stock": 15
    },
    {
      "_id": "60d5ec49f1b2c3d4e5f6g8",
      "nombre": "Zapatillas Urbanas",
      "precio": 120000,
      "imagenUrl": "/assets/img/zapatillas.jpg",
      "categoria": "Calzado",
      "stock": 8
    }
  ]
  ```
