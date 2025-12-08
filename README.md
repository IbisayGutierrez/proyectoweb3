# proyectoweb3

Descripción del Proyecto

Este proyecto es una aplicación web completa para la gestión de adopciones de animales en refugios y casas cuna. El sistema está diseñado para facilitar y optimizar el proceso de adopción, conectando a animales que necesitan un hogar con personas interesadas en adoptarlos.

Objetivo Principal

Proporcionar una plataforma digital que simplifique la administración de refugios de animales y mejore la experiencia de adopción mediante:

Gestión de animales: Registro completo de animales con fotos, características, estado de salud y disponibilidad para adopción
Sistema de solicitudes: Permite a los usuarios solicitar la adopción de animales de forma digital y hacer seguimiento del estado de sus solicitudes
Control de roles: Diferentes niveles de acceso (Administrador, Voluntario, Adoptante) para una gestión eficiente
Proceso simplificado: Reduce el papeleo y agiliza la comunicación entre refugios y adoptantes

Funcionalidades Principales

CRUD completo de animales con eliminación lógica
Gestión de solicitudes de adopción con validación de disponibilidad
Sistema de autenticación con JWT
Control de acceso basado en roles
API RESTful documentada con Swagger
Soporte para imágenes en base64


Tecnologías Utilizadas

Backend
Node.js - Entorno de ejecución para JavaScript
Express.js - Framework web para crear la API RESTful
MySQL - Base de datos relacional
mysql2 - Cliente MySQL para Node.js con soporte de promesas
JWT (jsonwebtoken)- Autenticación basada en tokens
bcrypt - Encriptación de contraseñas
env - Gestión de variables de entorno
cors- Middleware para habilitar CORS
Swagger - Documentación interactiva de la API

Patrones y Arquitectura

Arquitectura en capas (Routes → Services → Database)
Procedimientos almacenados en MySQL
Middleware de autenticación y autorización
Eliminación lógica (soft delete) para mantener historial
Vistas SQL para consultas optimizadas

Pasos de instalacion y ejecucion

npm init -y 

npm i express mysql2 cors dotenv 

npm i -D nodemon

npm install bcrypt jsonwebtoken express-validator

npm install express-rate-limit 

npm install --save swagger-ui-express swagger-jsdoc



Integrantes y roles
Carlos:Encargado de las rutas de Tareas e historial
Ibisay:Encargada de las rutas de animales y solicitudes
Christofer:Encargado de las rutas de Usuario e inicio las carpetas del proyecto e instalacion de swagger en render



Roles del sistema
ADMIN: Acceso total al sistema
VOLUNTARIO: Puede gestionar solicitudes y ver información de animales
ADOPTANTE: Puede solicitar adopciones y ver sus solicitudes
USUARIO: Acceso básico de solo lectura

Notas Importantes

Las contraseñas se almacenan encriptadas con bcrypt
Se utiliza eliminación lógica para mantener historial
Las fotos de animales soportan formato base64 hasta 16MB
Solo se pueden crear solicitudes para animales con estado DISPONIBLE
Los tokens JWT expiran según configuración en .env

