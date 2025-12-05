# Instrucciones para crear la base de datos MySQL (XAMPP)

1. Abre phpMyAdmin en XAMPP y ejecuta el siguiente script SQL para crear la base de datos y tablas:

```sql
CREATE DATABASE IF NOT EXISTS restaurante_db;
USE restaurante_db;

CREATE TABLE restaurante (
  id_restaurante INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  horario VARCHAR(100) NOT NULL,
  capacidad INT NOT NULL,
  gerente VARCHAR(100) NOT NULL
);

CREATE TABLE platillo (
  id_platillo INT AUTO_INCREMENT PRIMARY KEY,
  id_restaurante INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  categoria VARCHAR(50) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  disponible BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (id_restaurante) REFERENCES restaurante(id_restaurante)
);

CREATE TABLE pedido (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_restaurante INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  mesa VARCHAR(20) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  metodo_pago VARCHAR(50) NOT NULL,
  estatus VARCHAR(20) NOT NULL,
  FOREIGN KEY (id_restaurante) REFERENCES restaurante(id_restaurante)
);
```

2. Verifica que las tablas se hayan creado correctamente y que la conexión en `app.module.ts` apunte a `restaurante_db` con usuario `root` y contraseña vacía.

3. Inicia el servidor NestJS y prueba los endpoints definidos en el controlador `restaurante-pedidos.controller.ts`.