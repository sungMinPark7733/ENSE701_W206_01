# ENSE701_W206_01


```
ENSE701_W206_01-search2
├─ README.md
├─ speed_backend
│  ├─ .env
│  ├─ .eslintrc.js
│  ├─ .prettierrc
│  ├─ dist
│  │  ├─ api
│  │  │  ├─ article
│  │  │  │  ├─ article.controller.d.ts
│  │  │  │  ├─ article.controller.js
│  │  │  │  ├─ article.controller.js.map
│  │  │  │  ├─ article.module.d.ts
│  │  │  │  ├─ article.module.js
│  │  │  │  ├─ article.module.js.map
│  │  │  │  ├─ article.schema.d.ts
│  │  │  │  ├─ article.schema.js
│  │  │  │  ├─ article.schema.js.map
│  │  │  │  ├─ article.service.d.ts
│  │  │  │  ├─ article.service.js
│  │  │  │  ├─ article.service.js.map
│  │  │  │  ├─ submit-article.dto.d.ts
│  │  │  │  ├─ submit-article.dto.js
│  │  │  │  └─ submit-article.dto.js.map
│  │  │  ├─ auth
│  │  │  │  ├─ auth.controller.d.ts
│  │  │  │  ├─ auth.controller.js
│  │  │  │  ├─ auth.controller.js.map
│  │  │  │  ├─ auth.guard.d.ts
│  │  │  │  ├─ auth.guard.js
│  │  │  │  ├─ auth.guard.js.map
│  │  │  │  ├─ auth.module.d.ts
│  │  │  │  ├─ auth.module.js
│  │  │  │  ├─ auth.module.js.map
│  │  │  │  ├─ auth.service.d.ts
│  │  │  │  ├─ auth.service.js
│  │  │  │  ├─ auth.service.js.map
│  │  │  │  ├─ constants.d.ts
│  │  │  │  ├─ constants.js
│  │  │  │  └─ constants.js.map
│  │  │  └─ user
│  │  │     ├─ user.controller.d.ts
│  │  │     ├─ user.controller.js
│  │  │     ├─ user.controller.js.map
│  │  │     ├─ user.dto.d.ts
│  │  │     ├─ user.dto.js
│  │  │     ├─ user.dto.js.map
│  │  │     ├─ user.module.d.ts
│  │  │     ├─ user.module.js
│  │  │     ├─ user.module.js.map
│  │  │     ├─ user.schema.d.ts
│  │  │     ├─ user.schema.js
│  │  │     ├─ user.schema.js.map
│  │  │     ├─ user.service.d.ts
│  │  │     ├─ user.service.js
│  │  │     └─ user.service.js.map
│  │  ├─ app.controller.d.ts
│  │  ├─ app.controller.js
│  │  ├─ app.controller.js.map
│  │  ├─ app.module.d.ts
│  │  ├─ app.module.js
│  │  ├─ app.module.js.map
│  │  ├─ app.service.d.ts
│  │  ├─ app.service.js
│  │  ├─ app.service.js.map
│  │  ├─ main.d.ts
│  │  ├─ main.js
│  │  ├─ main.js.map
│  │  └─ tsconfig.build.tsbuildinfo
│  ├─ nest-cli.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  │  ├─ article
│  │  │  │  ├─ article.controller.ts
│  │  │  │  ├─ article.module.ts
│  │  │  │  ├─ article.schema.ts
│  │  │  │  ├─ article.service.ts
│  │  │  │  └─ submit-article.dto.ts
│  │  │  ├─ auth
│  │  │  │  ├─ auth.controller.ts
│  │  │  │  ├─ auth.guard.ts
│  │  │  │  ├─ auth.module.ts
│  │  │  │  ├─ auth.service.ts
│  │  │  │  └─ constants.ts
│  │  │  └─ user
│  │  │     ├─ user.controller.ts
│  │  │     ├─ user.dto.ts
│  │  │     ├─ user.module.ts
│  │  │     ├─ user.schema.ts
│  │  │     └─ user.service.ts
│  │  ├─ app.controller.spec.ts
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  └─ main.ts
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ tsconfig.build.json
│  └─ tsconfig.json
└─ speed_frontend
   ├─ .env
   ├─ .eslintrc.json
   ├─ .next
   │  ├─ app-build-manifest.json
   │  ├─ app-path-routes-manifest.json
   │  ├─ build-manifest.json
   │  ├─ BUILD_ID
   │  ├─ cache
   │  │  ├─ .tsbuildinfo
   │  │  ├─ eslint
   │  │  │  └─ .cache_1ijqiw1
   │  │  ├─ swc
   │  │  │  └─ plugins
   │  │  │     └─ v7_windows_x86_64_0.106.15
   │  │  └─ webpack
   │  │     ├─ client-production
   │  │     │  ├─ 0.pack
   │  │     │  ├─ 1.pack
   │  │     │  ├─ 2.pack
   │  │     │  ├─ 3.pack
   │  │     │  ├─ 4.pack
   │  │     │  ├─ 5.pack
   │  │     │  ├─ 6.pack
   │  │     │  ├─ index.pack
   │  │     │  └─ index.pack.old
   │  │     ├─ edge-server-production
   │  │     │  ├─ 0.pack
   │  │     │  ├─ index.pack
   │  │     │  └─ index.pack.old
   │  │     └─ server-production
   │  │        ├─ 0.pack
   │  │        ├─ 1.pack
   │  │        ├─ 2.pack
   │  │        ├─ 3.pack
   │  │        ├─ index.pack
   │  │        └─ index.pack.old
   │  ├─ export-marker.json
   │  ├─ images-manifest.json
   │  ├─ next-minimal-server.js.nft.json
   │  ├─ next-server.js.nft.json
   │  ├─ package.json
   │  ├─ prerender-manifest.json
   │  ├─ react-loadable-manifest.json
   │  ├─ required-server-files.json
   │  ├─ routes-manifest.json
   │  ├─ server
   │  │  ├─ app
   │  │  │  ├─ dashboard
   │  │  │  │  ├─ page.js
   │  │  │  │  ├─ page.js.nft.json
   │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  ├─ dashboard.html
   │  │  │  ├─ dashboard.meta
   │  │  │  ├─ dashboard.rsc
   │  │  │  ├─ favicon.ico
   │  │  │  │  ├─ route.js
   │  │  │  │  └─ route.js.nft.json
   │  │  │  ├─ favicon.ico.body
   │  │  │  ├─ favicon.ico.meta
   │  │  │  ├─ index.html
   │  │  │  ├─ index.meta
   │  │  │  ├─ index.rsc
   │  │  │  ├─ page.js
   │  │  │  ├─ page.js.nft.json
   │  │  │  ├─ pages
   │  │  │  │  ├─ admin
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  ├─ page.js.nft.json
   │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  ├─ admin.html
   │  │  │  │  ├─ admin.meta
   │  │  │  │  ├─ admin.rsc
   │  │  │  │  ├─ analyse
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  ├─ page.js.nft.json
   │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  ├─ analyse.html
   │  │  │  │  ├─ analyse.meta
   │  │  │  │  ├─ analyse.rsc
   │  │  │  │  ├─ browse
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  ├─ page.js.nft.json
   │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  ├─ browse.html
   │  │  │  │  ├─ browse.meta
   │  │  │  │  ├─ browse.rsc
   │  │  │  │  ├─ login
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  ├─ page.js.nft.json
   │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  ├─ login.html
   │  │  │  │  ├─ login.meta
   │  │  │  │  ├─ login.rsc
   │  │  │  │  ├─ moderate
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  ├─ page.js.nft.json
   │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  ├─ moderate.html
   │  │  │  │  ├─ moderate.meta
   │  │  │  │  ├─ moderate.rsc
   │  │  │  │  ├─ submit
   │  │  │  │  │  ├─ page.js
   │  │  │  │  │  ├─ page.js.nft.json
   │  │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  │  ├─ submit.html
   │  │  │  │  ├─ submit.meta
   │  │  │  │  └─ submit.rsc
   │  │  │  ├─ page_client-reference-manifest.js
   │  │  │  ├─ _not-found
   │  │  │  │  ├─ page.js
   │  │  │  │  ├─ page.js.nft.json
   │  │  │  │  └─ page_client-reference-manifest.js
   │  │  │  ├─ _not-found.html
   │  │  │  ├─ _not-found.meta
   │  │  │  └─ _not-found.rsc
   │  │  ├─ app-paths-manifest.json
   │  │  ├─ chunks
   │  │  │  ├─ 161.js
   │  │  │  ├─ 208.js
   │  │  │  ├─ 379.js
   │  │  │  ├─ 564.js
   │  │  │  └─ font-manifest.json
   │  │  ├─ font-manifest.json
   │  │  ├─ functions-config-manifest.json
   │  │  ├─ interception-route-rewrite-manifest.js
   │  │  ├─ middleware-build-manifest.js
   │  │  ├─ middleware-manifest.json
   │  │  ├─ middleware-react-loadable-manifest.js
   │  │  ├─ next-font-manifest.js
   │  │  ├─ next-font-manifest.json
   │  │  ├─ pages
   │  │  │  ├─ 404.html
   │  │  │  ├─ 500.html
   │  │  │  ├─ _app.js
   │  │  │  ├─ _app.js.nft.json
   │  │  │  ├─ _document.js
   │  │  │  ├─ _document.js.nft.json
   │  │  │  ├─ _error.js
   │  │  │  └─ _error.js.nft.json
   │  │  ├─ pages-manifest.json
   │  │  ├─ server-reference-manifest.js
   │  │  ├─ server-reference-manifest.json
   │  │  └─ webpack-runtime.js
   │  ├─ static
   │  │  ├─ chunks
   │  │  │  ├─ 117-324ff96c2cd2f83b.js
   │  │  │  ├─ 648-8f8c22edd5ee0f3b.js
   │  │  │  ├─ app
   │  │  │  │  ├─ dashboard
   │  │  │  │  │  └─ page-6807c6422dddaaea.js
   │  │  │  │  ├─ layout-21467ccba911d517.js
   │  │  │  │  ├─ page-0a8b9a7b052e6eac.js
   │  │  │  │  ├─ pages
   │  │  │  │  │  ├─ admin
   │  │  │  │  │  │  └─ page-103d5e89498379a8.js
   │  │  │  │  │  ├─ analyse
   │  │  │  │  │  │  └─ page-c8277b27fcf15832.js
   │  │  │  │  │  ├─ browse
   │  │  │  │  │  │  └─ page-3bce34f8ac40f6ec.js
   │  │  │  │  │  ├─ login
   │  │  │  │  │  │  └─ page-f9756e852480e361.js
   │  │  │  │  │  ├─ moderate
   │  │  │  │  │  │  └─ page-3679e69ae5cf755b.js
   │  │  │  │  │  └─ submit
   │  │  │  │  │     └─ page-23e68f45e019d304.js
   │  │  │  │  └─ _not-found
   │  │  │  │     └─ page-7a34f99f4340cc5e.js
   │  │  │  ├─ fd9d1056-5b96b8eee33f5cfd.js
   │  │  │  ├─ framework-f66176bb897dc684.js
   │  │  │  ├─ main-3f2706bc14956a49.js
   │  │  │  ├─ main-app-b14e87978b31c955.js
   │  │  │  ├─ pages
   │  │  │  │  ├─ _app-72b849fbd24ac258.js
   │  │  │  │  └─ _error-7ba65e1336b92748.js
   │  │  │  ├─ polyfills-42372ed130431b0a.js
   │  │  │  └─ webpack-36e021f09f093d02.js
   │  │  ├─ css
   │  │  │  ├─ a075074c9a875923.css
   │  │  │  └─ f239acfbfcf96ca8.css
   │  │  └─ HW2HQHFSvmsMcsy5923Lh
   │  │     ├─ _buildManifest.js
   │  │     └─ _ssgManifest.js
   │  ├─ trace
   │  └─ types
   │     ├─ app
   │     │  ├─ dashboard
   │     │  │  └─ page.ts
   │     │  ├─ layout.ts
   │     │  ├─ page.ts
   │     │  └─ pages
   │     │     ├─ admin
   │     │     │  └─ page.ts
   │     │     ├─ analyse
   │     │     │  └─ page.ts
   │     │     ├─ browse
   │     │     │  └─ page.ts
   │     │     ├─ login
   │     │     │  └─ page.ts
   │     │     ├─ moderate
   │     │     │  └─ page.ts
   │     │     └─ submit
   │     │        └─ page.ts
   │     └─ package.json
   ├─ next-env.d.ts
   ├─ next.config.mjs
   ├─ package-lock.json
   ├─ package.json
   ├─ postcss.config.mjs
   ├─ README.md
   ├─ src
   │  ├─ app
   │  │  ├─ dashboard
   │  │  │  └─ page.tsx
   │  │  ├─ favicon.ico
   │  │  ├─ fonts
   │  │  │  ├─ GeistMonoVF.woff
   │  │  │  └─ GeistVF.woff
   │  │  ├─ globals.css
   │  │  ├─ layout.tsx
   │  │  ├─ page.tsx
   │  │  └─ pages
   │  │     ├─ admin
   │  │     │  ├─ admin.css
   │  │     │  └─ page.tsx
   │  │     ├─ analyse
   │  │     │  └─ page.tsx
   │  │     ├─ browse
   │  │     │  └─ page.tsx
   │  │     ├─ login
   │  │     │  └─ page.tsx
   │  │     ├─ moderate
   │  │     │  └─ page.tsx
   │  │     ├─ search
   │  │     │  ├─ search.css
   │  │     │  └─ search.tsx
   │  │     └─ submit
   │  │        └─ page.tsx
   │  ├─ components
   │  │  ├─ bootstrap.d.ts
   │  │  └─ Navbar.tsx
   │  └─ context
   │     └─ AuthContext.tsx
   ├─ tailwind.config.js
   ├─ tailwind.config.ts
   └─ tsconfig.json

```