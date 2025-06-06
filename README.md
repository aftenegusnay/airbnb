# FlatFinder

Plataforma tipo Airbnb para encontrar, comparar y gestionar alojamientos.

## Requisitos

- Node.js 18+
- npm 9+
- (Opcional) Docker para base de datos si tu backend lo requiere

---

## Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone <URL_DEL_REPO>
cd airbnb
```

---

### 2. Backend

```bash
cd backend
npm install
# Si usas base de datos local, asegúrate de tenerla corriendo y configura tu .env
npm run start:dev
```

- El backend corre por defecto en `http://localhost:3000`
- Endpoints principales: `/auth/login`, `/auth/register`, `/flats`, `/users/me`, etc.

---

### 3. Frontend

En otra terminal:

```bash
cd fronted
npm install
npm run dev
```

- El frontend corre por defecto en `http://localhost:5173` (Vite)
- Accede a la app en tu navegador: [http://localhost:5173](http://localhost:5173)

---

## Estructura de carpetas

```
airbnb/
  backend/    # NestJS API
  fronted/    # React + Vite + Tailwind + PrimeReact
```

---

## Notas

- El frontend espera que el backend esté corriendo en `http://localhost:3000`
- Si cambias el puerto del backend, actualiza las URLs en los adapters del frontend.
- El backend debe tener CORS habilitado (ya configurado).
- El frontend guarda el JWT en localStorage para autenticación.

---

## Scripts útiles

### Backend

- `npm run start:dev` — Inicia el backend en modo desarrollo
- `npm run start` — Inicia el backend en modo producción

### Frontend

- `npm run dev` — Inicia el frontend en modo desarrollo
- `npm run build` — Compila el frontend para producción

---

## Contacto

Cualquier duda, abre un issue o contacta al equipo de FlatFinder. 