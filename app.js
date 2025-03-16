document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("status");
    const logList = document.getElementById("log-list");

    // Inizializza Firebase
    const firebaseConfig = {
        databaseURL: "https://flexilift-db-default-rtdb.europe-west1.firebasedatabase.app/"
    };
    firebase.initializeApp(firebaseConfig);

    // Riferimento al database
    const dbRef = firebase.database().ref("/sollevatore");

    // Funzione per aggiornare lo stato del sollevatore
    function aggiornaStato(snapshot) {
        const data = snapshot.val();
        
        // Aggiornamento UI
        statusElement.innerText = data.stato ? "🚗 Occupato" : "✅ Libero";
        
        // Formattazione corretta del timestamp
        const dataFormattata = new Date(data.timestamp).toLocaleString();

        // Aggiorna storico
        const newLog = document.createElement("li");
        newLog.innerText = `Stato: ${data.stato ? "Occupato" : "Libero"} - ${dataFormattata}`;
        logList.prepend(newLog);
    }

    // Ascolta i cambiamenti in tempo reale
    dbRef.on("value", aggiornaStato);
});
