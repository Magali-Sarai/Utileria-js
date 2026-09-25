document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioRegistro');
    const campoNombre = document.getElementById('nombre');
    const campoCorreo = document.getElementById('correo');
    const campoFechaNacimiento = document.getElementById('fechaNacimiento');
    const campoTelefono = document.getElementById('telefono');
    const campoCURP = document.getElementById('curp');
    const campoContrasena = document.getElementById('contrasena');
    const campoConfirmarContrasena = document.getElementById('confirmarContrasena');

    const modalEdad = document.getElementById('modalEdad');
    const textoModalEdad = document.getElementById('textoModalEdad');
    const cerrarModal = document.getElementById('cerrarModal');

    const marcarEstado = (campoInput, esValido) => {
        const grupoCampo = campoInput.closest('.grupo-campo');
        if (esValido) {
            grupoCampo.classList.remove('invalido');
            grupoCampo.classList.add('valido');
        } else {
            grupoCampo.classList.remove('valido');
            grupoCampo.classList.add('invalido');
        }
        return esValido;
    };

    const validarCampoNombre = () => marcarEstado(campoNombre, campoNombre.value.trim().length > 0 && soloLetras(campoNombre.value.trim()));
    const validarCampoCorreo = () => marcarEstado(campoCorreo, validarCorreo(campoCorreo.value.trim()));
    const validarCampoFechaNacimiento = () => {
        const valor = campoFechaNacimiento.value;
        if (!valor) return marcarEstado(campoFechaNacimiento, false);
        return marcarEstado(campoFechaNacimiento, esMayorDeEdad(valor));
    };
    const validarCampoTelefono = () => marcarEstado(campoTelefono, validarTelefono(campoTelefono.value.trim()));
    const validarCampoCURP = () => marcarEstado(campoCURP, validarCURP(campoCURP.value.trim()));
    const validarCampoContrasena = () => marcarEstado(campoContrasena, validarPassword(campoContrasena.value));
    const validarCampoConfirmarContrasena = () => {
        const valor = campoConfirmarContrasena.value;
        const coincide = valor === campoContrasena.value;
        const longitudValida = validarLongitud(valor, 20);
        return marcarEstado(campoConfirmarContrasena, coincide && longitudValida && valor.length > 0);
    };

    campoNombre.addEventListener('input', validarCampoNombre);
    campoCorreo.addEventListener('input', validarCampoCorreo);
    campoTelefono.addEventListener('input', validarCampoTelefono);
    campoCURP.addEventListener('input', validarCampoCURP);
    
    // Valida silenciosamente mientras se escribe
    campoFechaNacimiento.addEventListener('input', validarCampoFechaNacimiento);

    campoContrasena.addEventListener('input', () => {
        validarCampoContrasena();
        if (campoConfirmarContrasena.value) validarCampoConfirmarContrasena();
    });
    campoConfirmarContrasena.addEventListener('input', validarCampoConfirmarContrasena);

    // Dispara el modal 
    campoFechaNacimiento.addEventListener('blur', () => {
        const esFechaValida = validarCampoFechaNacimiento();
        if (campoFechaNacimiento.value) {
            const edadCalculada = calcularEdad(campoFechaNacimiento.value);
            
            // Si la fecha está incompleta (NaN), no mostramos el modal
            if (edadCalculada >= 0) {
                if (esFechaValida) {
                    textoModalEdad.textContent = `Tu edad calculada es de ${edadCalculada} años. ¡Acceso permitido!`;
                } else {
                    textoModalEdad.textContent = `Tu edad calculada es de ${edadCalculada} años. Debes tener 18 años o más.`;
                }
                modalEdad.classList.add('activo');
            }
        }
    });

    cerrarModal.addEventListener('click', () => modalEdad.classList.remove('activo'));
    modalEdad.addEventListener('click', (evento) => {
        if (evento.target === modalEdad) modalEdad.classList.remove('activo');
    });

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombreValido = validarCampoNombre();
        const correoValido = validarCampoCorreo();
        const fechaNacimientoValida = validarCampoFechaNacimiento();
        const telefonoValido = validarCampoTelefono();
        const curpValida = validarCampoCURP();
        const contrasenaValida = validarCampoContrasena();
        const confirmarContrasenaValida = validarCampoConfirmarContrasena();

        console.log('--- Resultados de validación al enviar el formulario ---');
        console.log('validarCorreo("' + campoCorreo.value.trim() + '"):', validarCorreo(campoCorreo.value.trim()));
        console.log('soloLetras("' + campoNombre.value.trim() + '"):', soloLetras(campoNombre.value.trim()));
        console.log('validarLongitud(confirmarContrasena, 20):', validarLongitud(campoConfirmarContrasena.value, 20));
        console.log('calcularEdad("' + campoFechaNacimiento.value + '"):', calcularEdad(campoFechaNacimiento.value));
        console.log('esMayorDeEdad("' + campoFechaNacimiento.value + '"):', esMayorDeEdad(campoFechaNacimiento.value));
        console.log('validarPassword("' + campoContrasena.value + '"):', validarPassword(campoContrasena.value));
        console.log('validarTelefono("' + campoTelefono.value.trim() + '"):', validarTelefono(campoTelefono.value.trim()));
        console.log('validarCURP("' + campoCURP.value.trim() + '"):', validarCURP(campoCURP.value.trim()));

        const todoCorrecto = nombreValido && correoValido && fechaNacimientoValida &&
            telefonoValido && curpValida && contrasenaValida && confirmarContrasenaValida;

        if (todoCorrecto) {
            console.log('Formulario enviado correctamente con los datos:', {
                nombre: campoNombre.value,
                correo: campoCorreo.value,
                fechaNacimiento: campoFechaNacimiento.value,
                telefono: campoTelefono.value,
                curp: campoCURP.value.toUpperCase()
            });
            alert('¡Registro exitoso!');
            formulario.reset();
            document.querySelectorAll('.grupo-campo').forEach(grupo => grupo.classList.remove('valido', 'invalido'));
        } else {
            alert('Por favor, corrige los errores en el formulario.');
        }
    });
});