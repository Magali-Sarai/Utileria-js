document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioLogin');
    const campoCorreo = document.getElementById('correo');
    const campoContrasena = document.getElementById('contrasena');

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

    const validarCampoCorreo = () => marcarEstado(campoCorreo, validarCorreo(campoCorreo.value.trim()));
    const validarCampoContrasena = () => marcarEstado(campoContrasena, validarPassword(campoContrasena.value));

    campoCorreo.addEventListener('input', validarCampoCorreo);
    campoContrasena.addEventListener('input', validarCampoContrasena);

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const correoValido = validarCampoCorreo();
        const contrasenaValida = validarCampoContrasena();

        if (correoValido && contrasenaValida) {
            alert('¡Inicio de sesión exitoso!');
            formulario.reset();
            document.querySelectorAll('.grupo-campo').forEach(grupo => {
                grupo.classList.remove('valido', 'invalido');
            });
        } else {
            alert('Por favor, ingresa credenciales válidas.');
        }
    });
});