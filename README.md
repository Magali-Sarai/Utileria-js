# Librería de Validaciones JS

**Autor:** Magali Sarai Diego Revilla  
**Proyecto:** Librería ligera y funcional en JavaScript sin dependencias.
**Fecha de entrega:** 24 de Septiembre de 2026.

# Utilería JS - Librería de Validaciones

Una librería desarrollada en JavaScript que facilita la validación de datos en formularios web. 
Su propósito es reducir código repetitivo y proporcionar funciones reutilizables para validar información común como correos electrónicos, contraseñas, nombres, CURP, teléfonos y la edad.

## Qué problema resuelve?

Al desarrollar formularios es común tener que escribir varias veces las mismas validaciones para verificar que los datos ingresados por el usuario sean correctos.
Esta librería concentra esas validaciones en un solo archivo (`utileria.js`), permitiendo reutilizarlas en cualquier proyecto web de forma rpida y sencilla

---

# Estructura del proyecto

```
/utileria
│── README.md
│── index.html
│── login.html
│
├── css
│   └── styles.css
│
├── js
│   └── utileria.js
|   └── login.js
|   └── index.js
│
└── img
    
```

---

# Instalación

Descarga el archivo **utileria.js** y agrégalo antes de cerrar la etiqueta `body`.

```html
<script src="js/utileria.js"></script>
```

O si el archivo se encuentra en la misma carpeta:

```html
<script src="utileria.js"></script>
```

---

# Funciones de la librería

## 1. validarCorreo(correo)

Valida que un correo electrónico tenga un formato correcto.

**Parámetros**

| Parámetro | Tipo |
|-----------|------|
| correo | String |

**Retorna**

- `true` si el correo es válido.
- `false` si el formato es incorrecto.

### Código js

```javascript
function validarCorreo(correo) {
    const expresionRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expresionRegular.test(correo);
}
```
---

## 2. soloLetras(texto)

Permite únicamente letras mayúsculas, minúsculas, espacios y vocales acentuadas.

**Parámetros**

| Parámetro | Tipo |
|-----------|------|
| texto | String |

**Retorna**

- `true` si el texto contiene únicamente letras.
- `false` si contiene números o símbolos.

### Código js

```javascript
function soloLetras(texto) {
    const expresionRegular = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    return expresionRegular.test(texto);
}
```

---

## 3. validarLongitud(numero, maxLongitud)

Valida que un número no exceda la longitud máxima permitida.

**Parámetros**

| Parámetro | Tipo |
|-----------|------|
| numero | Number o String |
| maxLongitud | Number |

**Retorna**

- `true` si la longitud es válida.
- `false` si supera el límite.

### Código js

```javascript
function validarLongitud(numero, maxLongitud) {
    if (numero === null || numero === undefined) {
        return false;
    }
    const cadena = String(numero).trim();
    return cadena.length <= maxLongitud;
}
```


---

## 4. calcularEdad(fechaNacimiento)

Calcula la edad del usuario a partir de su fecha de nacimiento.

**Parámetros**

| Parámetro | Tipo |
|-----------|------|
| fechaNacimiento | Date (YYYY-MM-DD) |

**Retorna**

La edad como número entero.

### Código js

```javascript
function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) {
        return 0;
    }
    const hoy = new Date();
    const fechaCumple = new Date(fechaNacimiento);
    // Evitar desfase de zona horaria al crear el objeto Date
    const cumpleUTC = new Date(fechaCumple.getUTCFullYear(), fechaCumple.getUTCMonth(), fechaCumple.getUTCDate());
    let edadCalculada = hoy.getFullYear() - cumpleUTC.getFullYear();
    const diferenciaMeses = hoy.getMonth() - cumpleUTC.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < cumpleUTC.getDate())) {
        edadCalculada--;
    }
    return edadCalculada;
}
```
---

## 5. esMayorDeEdad(fechaNacimiento)

Determina si una persona es mayor de edad.

**Parámetros**

| Parámetro | Tipo |
|-----------|------|
| fechaNacimiento | Date |

**Retorna**

- `true` si tiene 18 años o más.
- `false` en caso contrario.

### Código js

```javascript
function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    return edad >= 18;
}
```
---

## 6. validarPassword(password)

Valida que una contraseña cumpla con los siguientes requisitos:

- Mínimo 8 caracteres
- Una letra mayúscula
- Una letra minúscula
- Un número
- Un carácter especial

**Parámetros**

| Parámetro | Tipo |
|-----------|------|
| password | String |

**Retorna**

- `true` si cumple todos los requisitos.
- `false` en caso contrario.

### Código js

```javascript
function validarPassword(contrasena) {
    const expresionRegular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-#+=\[\]{}()^|~`:;,<>\/\\\"\'\`])[A-Za-z\d@$!%*?&._\-#+=\[\]{}()^|~`:;,<>\/\\\"\'\`]{8,}$/;
    return expresionRegular.test(contrasena);
}
```

---

# Funciones adicionales

## validarTelefono(telefono)

Valida que un número telefónico mexicano tenga exactamente 10 dígitos.

Acepta espacios, guiones y paréntesis.

**Parámetros**

| Parámetro | Tipo |
|-----------|------|
| telefono | String |

**Retorna**

- `true` si el teléfono es válido.
- `false` si no cumple el formato.

### Código js

```javascript
function validarTelefono(telefono) {
    if (!telefono) {
        return false;
    }
    const limpio = String(telefono).replace(/[\s\-()]/g, '');
    const expresionRegular = /^\d{10}$/;
    return expresionRegular.test(limpio);
}
```
---

## validarCURP(curp)

Valida que una CURP mexicana tenga un formato correcto.

**Parámetros**

| Parámetro | Tipo |
|-----------|------|
| curp | String |

**Retorna**

- `true` si la CURP es válida.
- `false` si el formato es incorrecto.

### Código Js

```javascript
function validarCURP(curp) {
    if (!curp) {
        return false;
    }
    const expresionRegular = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/;
    return expresionRegular.test(curp.toUpperCase().trim());
}
```
---

# Integración del proyecto

La librería fue utilizada en tres componentes principales del proyecto.

## Formulario

El formulario utiliza las funciones:

- validarCorreo()
- soloLetras()
- validarLongitud()
- validarCURP()
- validarTelefono()
- esMayorDeEdad()

---

## Modal

Después de seleccionar la fecha de nacimiento se calcula automáticamente la edad utilizando:

```javascript
const edad = calcularEdad(fechaNacimiento);
```

La edad se muestra dentro de una ventana modal.

---

## Login

El archivo **login.html** utiliza:

```javascript
validarCorreo(correo);
validarPassword(password);
```

Antes de permitir el acceso al sistema.

---

# Capturas de pantalla

## Consola ejecutando las funciones

![Captura consola]()

---

## Formulario funcionando

![Formulario menor de edad](img/formulario1.png)
![Formulario normal](img/formulario2.png)

---

## Modal mostrando la edad

![Modal](img/modal.PNG)

---

## Login

![Login](img/login.PNG)

---

# Video demostrativo



---

# Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript 
