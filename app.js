document.addEventListener("DOMContentLoaded", () => {
  console.log("🔹 app.js caricato, avvio codice...");

  const statusElement = document.getElementById("status");
  const logList = document.getElementById("log-list");
  const distanceElement = document.getElementById("distance"); // Altezza dal suolo

  // 🔹 Verifica inizializzazione Firebase
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

  // 🔹 Funzione per aggiornare interfaccia
  function aggiornaStato(snapshot) {
    const data = snapshot.val();
    console.log("🔹 Dati ricevuti da Firebase:", data);

    if (!data) {
      statusElement.innerText = "Errore nel recupero stato";
      distanceElement.innerText = "Nessun dato distanza";
      return;
    }

    // Stato
    statusElement.innerText = data.stato ? "🚗 Occupato" : "✅ Libero";

    // Altezza
    distanceElement.innerText = typeof data.altezza !== "undefined"
      ? data.altezza + " cm"
      : "Nessun dato distanza";

    // Timestamp gestito in modo dinamico
    const rawTimestamp = data.timestamp;
    const timestamp = rawTimestamp < 10000000000 ? rawTimestamp * 1000 : rawTimestamp;
    const dataFormattata = new Date(timestamp).toLocaleString("it-IT");

    // Log
    const newLog = document.createElement("li");
    newLog.innerText = `Stato: ${data.stato ? "Occupato" : "Libero"} - ${dataFormattata}`;
    logList.prepend(newLog);
  }

  // 🔹 Ascolto in tempo reale
  dbRef.on("value",
    (snapshot) => aggiornaStato(snapshot),
    (error) => {
      console.error("Errore Firebase:", error);
      statusElement.innerText = "Errore nel recupero stato";
      distanceElement.innerText = "Errore nel recupero distanza";
    }
  );
});
