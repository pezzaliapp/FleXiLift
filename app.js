document.addEventListener("DOMContentLoaded", () => {
    console.log("🔹 app.js caricato, avvio codice...");

    const statusElement = document.getElementById("status");
    const logList = document.getElementById("log-list");

    // 🔹 Verifichiamo se Firebase è attivo
    if (!firebase.apps.length) {
        console.error("❌ Firebase non risulta inizializzato!");
        statusElement.innerText = "Errore: Firebase non inizializzato";
        return;
    }
    console.log("✅ Firebase è inizializzato, procedo...");

    // 🔹 Riferimento al database
    const dbRef = firebase.database().ref("/sollevatore");
    console.log("🔹 Riferimento /sollevatore creato:", dbRef);

    // 🔹 Funzione per aggiornare lo stato del sollevatore
    function aggiornaStato(snapshot) {
        console.log("🔹 Dati ricevuti da Firebase:", snapshot.val());
        const data = snapshot.val();

        if (!data) {
            console.error("❌ Nessun dato ricevuto da Firebase");
            statusElement.innerText = "Errore nel recupero stato";
            return;
        }

        // ✅ Aggiornamento UI
        statusElement.innerText = data.stato ? "🚗 Occupato" : "✅ Libero";

        // ✅ Formattazione timestamp
        const dataFormattata = new Date(data.timestamp).toLocaleString();

        // ✅ Aggiorna storico
        const newLog = document.createElement("li");
        newLog.innerText = `Stato: ${data.stato ? "Occupato" : "Libero"} - ${dataFormattata}`;
        logList.prepend(newLog);
    }

    // 🔹 Ascolta i cambiamenti in tempo reale
    dbRef.on("value", aggiornaStato, (error) => {
        console.error("Errore nel caricamento dati da Firebase:", error);
        statusElement.innerText = "Errore nel recupero stato";
    });
});
