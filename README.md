# FleXiLift - PWA per il Monitoraggio del Sollevatore 🚀

## 📌 Descrizione
FleXiLift è una Progressive Web App (PWA) che permette di monitorare in tempo reale lo stato di un sollevatore per autofficine.  
✅ **Supporta ESP32** per aggiornare i dati dinamicamente.  
✅ **Dashboard in tempo reale** con storico sollevamenti.  
✅ **PWA installabile su iOS/macOS** con supporto offline.  

## 📂 Struttura File
FleXiLift/
│── index.html            # Dashboard PWA
│── app.js                # Logica UI
│── style.css             # Stile della PWA
│── manifest.json         # Configurazione PWA
│── service-worker.js     # Supporto offline
│── api/
│   ├── sollevatore.json  # Stato del sollevatore
│   ├── update.js         # Script per aggiornare la UI
│── assets/
│   ├── FleXiLift-192.png  # Icona 192px
│   ├── FleXiLift-512.png  # Icona 512px
│── README.md             # Documentazione
## 🚀 Deploy su GitHub Pages
1. **Attivare GitHub Pages** nelle impostazioni della repository.  
2. **Accedere alla PWA** all'URL generato (`https://tuo-username.github.io/FleXiLift`).  
3. **Installare la PWA** su iPhone/macOS per accesso rapido.  

## 🔗 API disponibili
| Endpoint | Metodo | Descrizione |
|----------|--------|-------------|
| `/api/sollevatore.json` | `GET` | Restituisce lo stato attuale |
| `/api/update.js` | `JS` | Aggiorna la UI in tempo reale |

---
🔧 **Sviluppato da PezzaliAPP**
