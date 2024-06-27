// app.js

document.addEventListener('DOMContentLoaded', () => {
    const skatersList = document.getElementById('skatersList');
    const formularioInicioSesion = document.getElementById('formularioInicioSesion');
    const rellenarFormularioSkater = document.getElementById('rellenarFormularioSkater');
    const registroForm = document.getElementById('registroForm');

    if (skatersList) {
        // Código para skatersList
        const checkboxes = skatersList.querySelectorAll("input[type='checkbox']");

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", async (event) => {
                const skaterId = event.target.dataset.skaterId;

                try {
                    const response = await axios.put(`/api/v1/skater/${skaterId}`);

                    if (response.status === 200) {
                        alert("Skater aprobado exitosamente");
                        location.reload();
                    } else {
                        alert(response.data.message);
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("Hubo un error al aprobar el skater.");
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
                const response = await axios.post("/login", data);

                if (response.status === 200) {
                    window.location.href = "/participantes"; // Redirigir a la página de participantes si la autenticación es exitosa
                } else {
                    alert(response.data.message); // Mostrar mensaje de error si la autenticación falla
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un error al iniciar sesión.");
            }
        });


    } else {
        console.error("El elemento 'formularioInicioSesion' no se encontró en el DOM.");
    }

    if (rellenarFormularioSkater) {
        // Código para rellenarFormularioSkater
        rellenarFormularioSkater.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await axios.put("/api/v1/skater", data);

                if (response.status === 200) {
                    alert("Perfil actualizado exitosamente");
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un error al actualizar el perfil.");
            }
        });
    } else {
        console.error("El elemento 'rellenarFormularioSkater' no se encontró en el DOM.");
    }

    if (registroForm) {
        registroForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);

            const file = formData.get('foto');
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64Image = reader.result.split(',')[1];

                const data = {
                    email: formData.get('email'),
                    nombre: formData.get('nombre'),
                    password: formData.get('password'),
                    repitaPassword: formData.get('repitaPassword'),
                    anos_experiencia: formData.get('anos_experiencia'),
                    especialidad: formData.get('especialidad'),
                    foto: base64Image // Enviar la imagen en base64
                };

                try {
                    const response = await fetch('/api/v1/skater/registro', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();
                    if (response.ok) {
                        alert("Registro exitoso");
                        window.location.href = "/login"; // Redirigir a la página de inicio de sesión
                        // Puedes redirigir a cualquier página necesaria después del registro
                    } else {
                        alert(result.message);
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("Hubo un error al registrar el skater.");
                }
            };
        });
    };
});
