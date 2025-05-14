import { useState } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const subscribeToPush = async () => {
    try {
      if (!("serviceWorker" in navigator)) {
        alert("Service Worker não suportado!");
        return;
      }

      // 1. Registra o Service Worker
      const reg = await navigator.serviceWorker.register("/sw.js");

      // 2. Busca chave pública do backend
      const res = await fetch(
        "https://f334-45-160-89-106.ngrok-free.app/vapidPublicKey",
        {
          method: "POST",
        }
      );
      const data = await res.json();

      //console.log("Chave VAPID:", data);

      const convertedVapidKey = urlBase64ToUint8Array(data.publicKey);

      // 3. Realiza inscrição no push
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      // 4. Envia subscription ao backend
      const resSubscription = await fetch("https://f334-45-160-89-106.ngrok-free.app/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataSubscription = await resSubscription.json();
      console.log(dataSubscription);

      setSubscribed(true);
      alert("Inscrição realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao se inscrever:", error);
      alert("Erro ao se inscrever. Veja o console.");
    }
  };

  const sendTestNotification = async () => {
    try {
      const res = await fetch(
        "https://f334-45-160-89-106.ngrok-free.app/sendNotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: {
              title: "🚀 Notificação de Teste",
              body: "Você recebeu essa notificação direto do front!",
              icon: "/icon_144.png",
              url: "https://pwa-dun-sigma.vercel.app",
            },
          }),
        }
      );

      const data = await res.json();
      console.log("Resposta do servidor:", data);
      alert("Notificação enviada!");
    } catch (err) {
      console.error("Erro ao enviar notificação:", err);
      alert("Falha ao enviar notificação. Veja o console.");
    }
  };

  // Util para converter a chave VAPID
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return (
    <>
      <div className="card">
        <button onClick={subscribeToPush} disabled={subscribed}>
          {subscribed ? "Inscrito ✅" : "Ativar Notificações 🔔"}
        </button>
      </div>
      <button onClick={sendTestNotification}>
        Enviar Notificação de Teste 🚀
      </button>

      <PWABadge />
    </>
  );
}

export default App;
