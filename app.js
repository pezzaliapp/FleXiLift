document.addEventListener("DOMContentLoaded", () => {
  console.log("🔹 app.js caricato, avvio codice...");

  const statusElement = document.getElementById("status");
  const logList = document.getElementById("log-list");
  const distanceElement = document.getElementById("distance"); // Nuovo elemento per l'altezza

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

  // 🔹 Funzione per aggiornare lo stato del sollevatore e l'altezza
  function aggiornaStato(snapshot) {
    console.log("🔹 Dati ricevuti da Firebase:", snapshot.val());
    const data = snapshot.val();
    if (!data) {
      console.error("❌ Nessun dato ricevuto da Firebase");
      statusElement.innerText = "Errore nel recupero stato";
      distanceElement.innerText = "Nessun dato distanza";
      return;
    }

    // Aggiorna lo stato: Occupato o Libero
    statusElement.innerText = data.stato ? "🚗 Occupato" : "✅ Libero";

    // Aggiorna il campo per l'altezza (distanza)
    if (typeof data.altezza !== "undefined") {
      distanceElement.innerText = data.altezza + " cm";
    } else {
      distanceElement.innerText = "Nessun dato distanza";
    }

    // Formatta il timestamp
    const dataFormattata = new Date(data.timestamp).toLocaleString("it-IT");

    // Aggiorna lo storico
    const newLog = document.createElement("li");
    newLog.innerText = `Stato: ${data.stato ? "Occupato" : "Libero"} - ${dataFormattata}`;
    logList.prepend(newLog);
  }

  // 🔹 Ascolta i cambiamenti in tempo reale
  dbRef.on("value",
    (snapshot) => {
      aggiornaStato(snapshot);
    },
    (error) => {
      console.error("Errore nel caricamento dati da Firebase:", error);
      statusElement.innerText = "Errore nel recupero stato";
      distanceElement.innerText = "Errore nel recupero distanza";
    }
  );
});
