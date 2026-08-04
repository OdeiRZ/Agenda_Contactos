# Agenda Contactos

Agenda de contactos que se ejecuta enteramente en el navegador, guardando los datos en local mediante IndexedDB.

## Características

- Creación, listado y borrado de la base de datos IndexedDB (`crearBBDD`, `listarBBDD`, `borrarBBDD`).
- Alta de contactos con nombre, teléfono y correo electrónico.
- Listado de todos los contactos almacenados, recorriendo la base de datos con un cursor.
- Consulta de un contacto por correo electrónico (usado como clave única).
- Modificación y borrado de un contacto existente, localizándolo también por correo.
- Validación de los campos mediante expresiones regulares (nombre, teléfono de 9 dígitos y formato de email) antes de guardar o actualizar.

## Tecnologías

- HTML5
- CSS3 (con iconos de Font Awesome)
- JavaScript vanilla (sin frameworks)
- IndexedDB (API nativa del navegador para almacenamiento local)

## Instalación / Cómo ejecutarlo

No requiere backend ni instalación de dependencias:

1. Clona el repositorio.
2. Abre `public/index.html` en un navegador con soporte para IndexedDB (Chrome, Firefox, Edge, etc.).
3. Pulsa "Abrir BBDD" para inicializar la base de datos antes de usar el resto de opciones.

Ejercicio académico que practica el uso de la API IndexedDB (transacciones, cursores, índices) y la validación de formularios con expresiones regulares en JavaScript.

## Seguridad

El nombre, teléfono y email del contacto se escapan antes de insertarse en el DOM (`innerHTML`). Antes, la protección frente a XSS dependía únicamente de que la expresión regular de validación rechazara los símbolos `<`/`>`, una coincidencia frágil y no una garantía real.

## Licencia

GPL versión 3 (ver archivo [LICENSE](LICENSE)).
