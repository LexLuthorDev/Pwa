self.addEventListener("push", (event) => {
    console.log("Notificação recebida:", event);
  const data = event.data?.json() || {
    title: "teste",
    body: "Você recebeu uma nova mensagem.",
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon_144.png",
      badge: "/icon_144.png",
    })
  );
});
