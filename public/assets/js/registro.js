// registro.js

document.addEventListener('DOMContentLoaded', () => {
    const formularioRegistro = document.querySelector("#formularioRegistro");
    if (!formularioRegistro) {
        console.error("El elemento 'formularioRegistro' no se encontró en el DOM.");
        return;
    }

    formularioRegistro.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await axios.post("/registro", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 200) {
                window.location.href = "/participantes";
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
