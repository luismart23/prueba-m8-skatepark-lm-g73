// admin.js

document.addEventListener('DOMContentLoaded', () => {
    const skatersList = document.querySelector("#skatersList");
    if (!skatersList) {
        console.error("El elemento 'skatersList' no se encontró en el DOM.");
        return;
    }

    const checkboxes = skatersList.querySelectorAll("input[type='checkbox']");
    if (checkboxes.length === 0) {
        console.error("No se encontraron checkboxes en la lista de skaters.");
        return;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", async (event) => {
            const skaterId = event.target.dataset.skaterId;

            try {
                const response = await axios.put(`/admin/${skaterId}`);

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
});

