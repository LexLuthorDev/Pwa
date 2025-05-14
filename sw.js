// public/sw.js
[{"revision":null,"url":"assets/index-B9l3WV8N.js"},{"revision":null,"url":"assets/index-DyBGCjdk.css"},{"revision":null,"url":"assets/workbox-window.prod.es5-B9K5rw8f.js"},{"revision":"fdf7e8038b874c5ae7e39ddbff13c89d","url":"index.html"},{"revision":"865ed3f77b35763ef379af97747a9164","url":"sw.js"},{"revision":"7bc53385cd0162f24d614ebf4a5380aa","url":"icon_144.png"},{"revision":"9f0542a57715dd3f4ab110c982edc65a","url":"icon_512.png"},{"revision":"6686a89d7a002e4ce69cfc663f900b23","url":"manifest.webmanifest"}];

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
