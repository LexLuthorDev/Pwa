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

      // ✅ NÃO registre manualmente o SW — apenas espere ele estar pronto
      const reg = await navigator.serviceWorker.ready;
      console.log("Service Worker pronto:", reg);

      // 🔑 Busca chave pública do backend
      const res = await fetch(
        "https://e885-45-160-89-106.ngrok-free.app/vapidPublicKey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const data = await res.json();
      console.log("Chave VAPID recebida:", data);

      const convertedVapidKey = urlBase64ToUint8Array(data.publicKey);

      // ✅ Inscreve o push com a chave VAPID
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      console.log("Inscrição criada:", subscription);

      // Envia para o backend
      const resSubscription = await fetch(
        "https://e885-45-160-89-106.ngrok-free.app/subscribe",
        {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await resSubscription.json();

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
        "https://e885-45-160-89-106.ngrok-free.app/send-notification",
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
