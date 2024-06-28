// app.js


document.addEventListener('DOMContentLoaded', () => {
    const skatersList = document.getElementById('skatersList');
    const formularioInicioSesion = document.getElementById('formularioInicioSesion');
    const rellenarFormularioSkater = document.getElementById('rellenarFormularioSkater');
    const registroForm = document.getElementById('registroForm');
    const eliminarUsuario = document.getElementById('eliminarUsuario');
    const formularioActualizar = document.getElementById('formularioActualizar');

    const URL_DOMAIN = "http://localhost:3000/api/v1";

    // Función para actualizar un skater por su ID
    const updateSkater = async (skaterId, data) => {
        try {
            const response = await axios.put(`${URL_DOMAIN}/skater/${skaterId}`, data);
            if (response.status === 200) {
                alert("Skater actualizado correctamente");
                location.reload(); // Recargar la página después de la actualización
            } else {
                alert("Error al actualizar skater");
            }
        } catch (error) {
            console.error("Error al actualizar el skater:", error);
            alert("Hubo un error al actualizar el skater.");
        }
    }

    // Función para eliminar un skater por su ID
    const deleteSkater = async (skaterId) => {
        try {
            const response = await axios.delete(`${URL_DOMAIN}/skater/${skaterId}`);
            if (response.status === 200) {
                alert("Skater eliminado correctamente");
                location.reload(); // Recargar la página después de la eliminación
            } else {
                alert("Error al eliminar skater");
            }
        } catch (error) {
            console.error("Error al eliminar el skater:", error);
            alert("Hubo un error al eliminar el skater.");
        }
    }

    // Verificar si existe skatersList en el DOM
    if (skatersList) {
        // Obtener todos los checkboxes dentro de skatersList
        const checkboxes = skatersList.querySelectorAll("input[type='checkbox']");

        // Iterar sobre cada checkbox para añadir un listener de cambio
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", async (event) => {
                const skaterId = event.target.dataset.skaterId; // Obtener el ID del skater desde el dataset del checkbox

                try {
                    // Realizar una solicitud PUT para actualizar el skater
                    await updateSkater(skaterId, { /* datos a enviar si es necesario */ });
                } catch (error) {
                    console.error("Error al actualizar skater:", error);
                    alert("Hubo un error al actualizar skater.");
                }
            });
        });
    } else {
        console.error("El elemento 'skatersList' no se encontró en el DOM.");
    }

    if (formularioInicioSesion) {
        // Código para formularioInicioSesion
        formularioInicioSesion.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await axios.post(`${URL_DOMAIN}/skater/login`, data);

                if (response.status === 200) {
                    const skater = response.data.skater; // Suponiendo que el servidor devuelve el skater al iniciar sesión

                    // Redirige a la página de participantes y muestra los datos del skater
                    window.location.href = "/participantes";
                } else {
                    alert(response.data.message); // Mostrar mensaje de error si la autenticación falla
                }
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                alert("Hubo un error al iniciar sesión.");
            }
        });
    } else {
        console.error("El elemento 'formularioInicioSesion' no se encontró en el DOM.");
    }

    // Obtener el formulario de actualización por su ID
    if (rellenarFormularioSkater) {
        rellenarFormularioSkater.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            try {
                // Obtener el ID del skater desde el dataset del formulario
                const skaterId = rellenarFormularioSkater.dataset.skaterId;

                // Realizar una solicitud PUT para actualizar el skater
                await updateSkater(skaterId, data);
            } catch (error) {
                console.error("Error al actualizar el perfil:", error);
                alert("Hubo un error al actualizar el perfil.");
            }
        });
    } else {
        console.error("El elemento 'rellenarFormularioSkater' no se encontró en el DOM.");
    }

    if (formularioActualizar) {
        formularioActualizar.addEventListener('submit', async (event) => {
            event.preventDefault();
            const skaterId = formularioActualizar.dataset.skaterId;
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            try {
                await updateSkater(skaterId, data);
            } catch (error) {
                console.error("Error al actualizar el perfil:", error);
                alert("Hubo un error al actualizar el perfil.");
            }
        });
    } else {
        console.error("El elemento 'formularioActualizar' no se encontró en el DOM.");
    }

    if (registroForm) {
        document.getElementById('registroForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);

            try {
                // Realiza una solicitud POST para registrar un nuevo skater
                const response = await axios.post(`${URL_DOMAIN}/skater/registro`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {
                    alert("Registro exitoso");
                    window.location.href = "/admin"; // Redirige a la página de administración después del registro
                } else {
                    alert(response.data.message || "Error al registrar skater.");
                }
            } catch (error) {
                console.error("Error al registrar el skater:", error);
                alert("Hubo un error al registrar el skater.");
            }
        });
    } else {
        console.error("El elemento 'registroForm' no se encontró en el DOM.");
    }

    // Event listener para el botón de eliminar
    if (eliminarUsuario) {
        eliminarUsuario.addEventListener('click', function () {
            if (confirm('¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.')) {
                // Lógica para obtener dinámicamente el ID del skater según sea necesario
                const skaterId = obtenerSkaterIdDinamicamente(); // Implementa esta función según tu lógica
                deleteSkater(skaterId); // Llamar a la función deleteSkater con el ID del skater
            }
        });
    } else {
        console.error("El elemento 'eliminarUsuario' no se encontró en el DOM.");
    }
});
