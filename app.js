document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("status");
    const logList = document.getElementById("log-list");
    const apiUrl = "api/sollevatore.json"; // URL del file JSON su GitHub Pages

    // Funzione per aggiornare lo stato del sollevatore
    async function aggiornaStato() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Errore nel recupero dati");
            }
            const data = await response.json();
            
            // Aggiornamento UI
            statusElement.innerText = data.sollevatore ? "🚗 Occupato" : "✅ Libero";
            
            // Aggiorna storico
            const newLog = document.createElement("li");
            newLog.innerText = `Stato: ${data.sollevatore ? "Occupato" : "Libero"} - ${new Date(data.timestamp * 1000).toLocaleString()}`;
            logList.prepend(newLog);
        } catch (error) {
            console.error("Errore nel caricamento dati:", error);
            statusElement.innerText = "Errore nel recupero stato";
        }
    }

    // Aggiornamento iniziale e ogni 5 secondi
    aggiornaStato();
    setInterval(aggiornaStato, 5000);
});
