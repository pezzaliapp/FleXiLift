document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("status");
    const logList = document.getElementById("log-list");

    // Configurazione Firebase
    const firebaseConfig = {
        databaseURL: "https://flexilift-db-default-rtdb.europe-west1.firebasedatabase.app/"
    };

    // Inizializza Firebase SOLO SE non è già inizializzato
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Riferimento al database
    const dbRef = firebase.database().ref("/sollevatore");

    // Funzione per aggiornare lo stato del sollevatore
    function aggiornaStato(snapshot) {
        const data = snapshot.val();
        if (!data) {
            console.error("❌ Nessun dato ricevuto da Firebase");
            return;
        }

        // Aggiornamento UI
        statusElement.innerText = data.stato ? "🚗 Occupato" : "✅ Libero";

        // Formattazione timestamp
        const dataFormattata = new Date(data.timestamp).toLocaleString();

        // Aggiorna storico
        const newLog = document.createElement("li");
        newLog.innerText = `Stato: ${data.stato ? "Occupato" : "Libero"} - ${dataFormattata}`;
        logList.prepend(newLog);
    }

    // Ascolta i cambiamenti in tempo reale
    dbRef.on("value", aggiornaStato, (error) => {
        console.error("Errore nel caricamento dati da Firebase:", error);
        statusElement.innerText = "Errore nel recupero stato";
    });
});
