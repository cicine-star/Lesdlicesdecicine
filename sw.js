self.addEventListener("notificationclick", function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:"window", includeUncontrolled:true}).then(function(cs) {
      for(var i=0;i<cs.length;i++){
        if(cs[i].url.includes("admin.html")&&"focus"in cs[i])return cs[i].focus();
      }
      return clients.openWindow(e.notification.data&&e.notification.data.url||"/Lesdlicesdecicine/admin.html");
    })
  );
});

self.addEventListener("push", function(e) {
  if(!e.data)return;
  var d=e.data.json();
  e.waitUntil(self.registration.showNotification(d.title||"🧁 Nouvelle commande !",{
    body:d.body||"",icon:"icon.svg",tag:d.tag||"order",data:{url:"/Lesdlicesdecicine/admin.html"}
  }));
});
