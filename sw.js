// Service Worker para Tecno-Checklist PWA
const CACHE_NAME = 'tecno-checklist-v1.0.0';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Arquivos para cache estático
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/date-fns@2.29.3/index.min.js'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Cacheando arquivos estáticos');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Instalação concluída');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Erro na instalação', error);
      })
  );
});

// Ativar Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Ativação concluída');
        return self.clients.claim();
      })
  );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Estratégia para diferentes tipos de requisições
  if (request.method === 'GET') {
    // Arquivos estáticos - Cache First
    if (STATIC_FILES.includes(request.url) || url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
      event.respondWith(cacheFirst(request));
    }
    // Páginas HTML - Network First
    else if (request.headers.get('accept').includes('text/html')) {
      event.respondWith(networkFirst(request));
    }
    // API calls - Network First com fallback
    else if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirst(request));
    }
    // Outros recursos - Stale While Revalidate
    else {
      event.respondWith(staleWhileRevalidate(request));
    }
  }
});

// Estratégia Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache First error:', error);
    return new Response('Recurso não disponível offline', { status: 503 });
  }
}

// Estratégia Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network First: Tentando cache...');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para páginas HTML
    if (request.headers.get('accept').includes('text/html')) {
      return caches.match('/index.html');
    }
    
    return new Response('Recurso não disponível offline', { status: 503 });
  }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Sincronização em background
self.addEventListener('sync', event => {
  console.log('Service Worker: Sincronização em background');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Executar sincronização
async function doBackgroundSync() {
  try {
    // Sincronizar dados do localStorage
    const data = {
      clientes: localStorage.getItem('clientes'),
      tecnicos: localStorage.getItem('tecnicos'),
      tarefas: localStorage.getItem('tarefas'),
      tiposDeTarefa: localStorage.getItem('tiposDeTarefa'),
      usuarios: localStorage.getItem('usuarios'),
      comments: localStorage.getItem('comments'),
      notificationHistory: localStorage.getItem('notificationHistory')
    };
    
    // Aqui você pode implementar a sincronização com um servidor
    console.log('Dados sincronizados:', data);
    
    // Notificar o cliente sobre a sincronização
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        data: data
      });
    });
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
}

// Notificações push
self.addEventListener('push', event => {
  console.log('Service Worker: Push recebido');
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do Tecno-Checklist',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Detalhes',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Tecno-Checklist', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Clique em notificação');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/index.html#dashboard')
    );
  } else if (event.action === 'close') {
    // Apenas fechar a notificação
  } else {
    // Clique na notificação (não em ação)
    event.waitUntil(
      clients.openWindow('/index.html')
    );
  }
});

// Mensagens do cliente
self.addEventListener('message', event => {
  console.log('Service Worker: Mensagem recebida', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_DATA') {
    // Cachear dados importantes
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then(cache => {
        return cache.put('/data/backup', new Response(JSON.stringify(event.data.data)));
      })
    );
  }
});

// Limpeza periódica do cache
self.addEventListener('periodicsync', event => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(cleanupCache());
  }
});

async function cleanupCache() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    name !== STATIC_CACHE && 
    name !== DYNAMIC_CACHE && 
    name.includes('cache')
  );
  
  await Promise.all(
    oldCaches.map(name => caches.delete(name))
  );
  
  console.log('Service Worker: Cache limpo');
}
