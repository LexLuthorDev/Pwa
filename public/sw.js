// public/sw.js

self.addEventListener("push", (event) => {

  console.log("[SW] Push listener ativado");
  if (!event.data) {
    console.warn("[SW] Push recebido sem payload!");
    return;
  }

  const data = event.data.json();
  console.log("[SW] Notificação recebida:", data);

  const options = {
    body: data.body || "Você tem uma nova notificação!",
    icon: data.icon || "/icon_144.png",
    data: {
      url: data.data.url || "/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Nova mensagem", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
