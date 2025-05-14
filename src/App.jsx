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
        alert("Service Worker não é suportado neste navegador.");
        return;
      }

      // 1. Registro do Service Worker
      let reg;
      try {
        reg = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registrado:", reg);
      } catch (err) {
        console.error("Erro ao registrar o Service Worker:", err);
        alert("Falha ao registrar o Service Worker.");
        return;
      }

      // 2. Busca chave pública VAPID
      let vapidKey;
      try {
        const res = await fetch(
          "https://f334-45-160-89-106.ngrok-free.app/vapidPublicKey",
          {
            method: "POST",
          }
        );

        if (!res.ok)
          throw new Error("Resposta inválida ao buscar chave VAPID.");

        const data = await res.json();
        vapidKey = urlBase64ToUint8Array(data.publicKey);
      } catch (err) {
        console.error("Erro ao obter chave VAPID:", err);
        alert("Falha ao buscar chave pública para notificações.");
        return;
      }

      // 3. Inscrição no Push
      let subscription;
      try {
        subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKey,
        });
        console.log("Inscrição realizada:", subscription);
      } catch (err) {
        console.error("Erro ao se inscrever no push:", err);
        alert("Falha ao realizar a inscrição de notificações.");
        return;
      }

      // 4. Envia inscrição ao backend
      try {
        const resSub = await fetch(
          "https://f334-45-160-89-106.ngrok-free.app/subscribe",
          {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!resSub.ok)
          throw new Error("Resposta inválida ao enviar inscrição.");

        const dataSub = await resSub.json();
        console.log("Inscrição enviada ao backend:", dataSub);
      } catch (err) {
        console.error("Erro ao enviar inscrição ao backend:", err);
        alert("Falha ao enviar inscrição para o servidor.");
        return;
      }

      setSubscribed(true);
      alert("Notificações ativadas com sucesso! ✅");
    } catch (error) {
      console.error("Erro inesperado no processo de inscrição:", error);
      alert("Erro inesperado. Veja o console para mais detalhes.");
    }
  };

  const sendTestNotification = async () => {
    try {
      const res = await fetch(
        "https://f334-45-160-89-106.ngrok-free.app/send-notification",
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
