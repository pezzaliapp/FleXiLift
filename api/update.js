fetch("sollevatore.json")
  .then(response => response.json())
  .then(data => {
      document.getElementById("status").innerText = 
          data.sollevatore ? "🚗 Occupato" : "✅ Libero";

      const newLog = document.createElement("li");
      newLog.innerText = `Stato: ${data.sollevatore ? "Occupato" : "Libero"} - ${new Date(data.timestamp * 1000).toLocaleString()}`;
      document.getElementById("log-list").prepend(newLog);
  })
  .catch(error => console.error("Errore nel caricamento dati:", error));
