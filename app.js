document.addEventListener("DOMContentLoaded", () => {
    console.log("🔹 app.js caricato, avvio codice...");

    const statusElement = document.getElementById("status");
    const logList = document.getElementById("log-list");

    // 🔹 Verifica se Firebase è stato inizializzato correttamente
    if (!firebase.apps.length) {
        console.error("❌ Firebase non è inizializzato! (app.js)");
        statusElement.innerText = "Errore: Firebase non è inizializzato!";
        return;
    } else {
        console.log("✅ Firebase già inizializzato (app.js)");
    }

    // 🔹 Riferimento al database
    const dbRef = firebase.database().ref("/sollevatore");
    console.log("🔹 Riferimento creato /sollevatore:", dbRef);

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
        const dataFormattata = new Date(data.timestamp).toLocaleString("it-IT");

        // ✅ Aggiorna storico
        const newLog = document.createElement("li");
        newLog.innerText = `Stato: ${data.stato ? "Occupato" : "Libero"} - ${dataFormattata}`;
        logList.prepend(newLog);
    }

    // 🔹 Ascolta i cambiamenti in tempo reale
    dbRef.on("value",
        (snapshot) => {
            // Quando arrivano dati
            aggiornaStato(snapshot);
        },
        (error) => {
            // In caso di errore
            console.error("Errore nel caricamento dati da Firebase:", error);
            statusElement.innerText = "Errore nel recupero stato";
        }
    );
});
