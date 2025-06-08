const CACHE_NAME = 'cn-site-cache';
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbXN6dHV4cmxydGJueHhyaHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3OTA1MzYsImV4cCI6MjA1NjM2NjUzNn0.wxYd_XO12CKjUeQZ1_MRPnD5o_S8KBK9XDKL0jh1I1I";
const SUPABASE_URL = "https://kpmsztuxrlrtbnxxrhpj.supabase.co";
importScripts("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const urlsToCache = [
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.cdnfonts.com/css/product-sans",
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
    "/",
    "/index.html",
    "/index2.html",
    "/google-spinner.min.css",
    "/games",
    "/games/game_loader.html",
    "/assets",
    "/assets/logo",
    "/assets/logo/exclusives_logo.png",
    "/assets/logo/original_logo.png",
    "/assets/logo/original_logo_white.png",
    "/assets/logo/profile.png",
]

function truncate(string, maxLength) {
    return string.length > maxLength ? string.slice(0, maxLength) + '...' : string;
}

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache)
        })
    );
    event.waitUntil(
        self.registration.backgroundFetch.fetch('new-updates', ['/fetch-updates'], {
            title: "Checking for New Data...",
            icons: [{ src: "/assets/logo/profile.png", sizes: "192x192", type: "image/png" }]
        })
    );
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    const url = event.notification.data.url;
    event.waitUntil(
        clients.openWindow(url) // Opens the specified URL
    );
});

self.addEventListener('backgroundfetchsuccess', event => {
    event.fetches.forEach(fetch => {
        fetch.responseReady.then(response => {
            response.json().then(data => {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification(payload.new.username, {
                        body: JSON.stringify(data),
                        icon: "/assets/logo/profile.png",
                    });
                });
            });
        });
    });
});


supabaseClient
    .channel("main")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "main_chat" }, (payload) => {
        if (payload.new.is_announcement && Notification.permission === "granted") {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(payload.new.username, {
                    body: payload.new.content,
                    icon: "/assets/logo/profile.png",
                });
            });
        }
    })
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "videos"}, (payload) => {
        if (Notification.permission === "granted") {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification("A new video has dropped: " + payload.new.title, {
                    body: payload.new.description,
                    icon: "/assets/logo/profile.png",
                    // On click
                    data: {
                        url: self.origin + "/?mode=video&id=" + payload.new.id
                    }
                });
            });
        }
    })
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "games"}, (payload) => {
        if (Notification.permission === "granted") {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification("A new game has been added: " + payload.new.name, {
                    body: truncate(payload.new.description, 100),
                    icon: "/assets/logo/profile.png",
                    // On click
                    data: {
                        url: self.origin + "/?mode=game&id=" + payload.new.id
                    }
                });
            });
        }
    })
    //.subscribe();