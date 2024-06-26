// login.js

document.addEventListener('DOMContentLoaded', () => {
    const formularioInicioSesion = document.querySelector("#formularioInicioSesion");
    if (!formularioInicioSesion) {
        console.error("El elemento 'formularioInicioSesion' no se encontró en el DOM.");
        return;
    }

    formularioInicioSesion.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await axios.post("/login", data);

            if (response.status === 200) {
                window.location.href = "/participantes"; // Redirigir a la página de datos
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al iniciar sesión.");
        }
    });
});

