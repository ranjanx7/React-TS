# User Management CRUD

React + TypeScript + React Hook Form + Zod + TanStack Query + Zustand + Axios + Ant Design + Tailwind CSS.

## Run
```bash
npm install
npm start        # runs json-server API (port 3001) + Vite (port 5173)
```
Or run separately: `npm run api` and `npm run dev`.

## State separation
- React Hook Form -> form fields
- TanStack Query  -> users from the API
- Zustand         -> `editingUser` (UI state)
