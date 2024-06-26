// participantes.js

document.addEventListener('DOMContentLoaded', () => {
    const rellenarFormularioSkater = document.querySelector("#rellenarFormularioSkater");
    if (!rellenarFormularioSkater) {
        console.error("El elemento 'rellenarFormularioSkater' no se encontró en el DOM.");
        return;
    }

    rellenarFormularioSkater.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await axios.put("/participantes", data);

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
});




