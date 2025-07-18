# Surplus Connect

Surplus Connect is a full-stack web application that solves the global food waste problem by connecting food vendors with consumers or NGOs who can pick up surplus food.

## Features

- **Vendor Portal:** Vendors can register, login, and post surplus food listings as much as they want.
- **Consumer Portal:** Consumers/NGOs can browse available food on a live map, reserve items, and get pickup details.
- **Real-time Map:** Live map with available food listings using Leaflet.js and OpenStreetMap.
- **Authentication:** Secure authentication with Supabase Auth.
- **Gamification:** "Meals Saved" counter and badges for users.
- **Dark Mode:** Modern UI with dark mode support.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS
- **Backend:** Supabase (Auth, Postgres DB, Realtime)
- **Map:** Leaflet.js, React Leaflet, OpenStreetMap
- **UI:** shadcn/ui, next-themes

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/surplus-connect.git
cd surplus-connect
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1.  Go to [supabase.com](https://supabase.com/) and create a new project.
2.  Go to the **SQL Editor** in your Supabase project.
3.  Copy the content of `schema.sql` and run it to create the database tables and policies.
4.  Go to **Settings > API** and get your **Project URL** and **anon key**.
5.  Create a `.env.local` file in the root of the project by copying `.env.local.example`.
6.  Add your Supabase URL and anon key to the `.env.local` file.

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Generate TypeScript types for the database

Install the Supabase CLI:

```bash
npm install -g supabase
```

Login to Supabase:

```bash
supabase login
```

Link your project:

```bash
supabase link --project-ref <your-project-id>
```

Generate the types:

```bash
supabase gen types typescript --project-id <your-project-id> --schema public > src/types/database.types.ts
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using Mock Services

The `src/services` directory contains mock implementations so you can try the frontend without a running backend. Set the following flag in your `.env.local` file:

```bash
NEXT_PUBLIC_USE_MOCK_DATA=true
```

When this flag is present the app loads the mock service modules. Removing it (or setting it to `false`) automatically switches to the real Supabase-based services under `src/services/*.ts`.

## Frontend Architecture

For a detailed overview of the recommended folder structure and design guidelines, see [docs/frontend-architecture.md](docs/frontend-architecture.md). The document covers component organization, navigation flow and how to extend the service layer when connecting a real backend.

### Using Mock Services

The `src/services` directory contains mock implementations so you can try the frontend without a running backend. Set the following flag in your `.env.local` file:

```bash
NEXT_PUBLIC_USE_MOCK_DATA=true
```

When this flag is present the app loads the mock service modules. Removing it (or setting it to `false`) automatically switches to the real Supabase-based services under `src/services/*.ts`.

## Frontend Architecture

For a detailed overview of the recommended folder structure and design guidelines, see [docs/frontend-architecture.md](docs/frontend-architecture.md). The document covers component organization, navigation flow and how to extend the service layer when connecting a real backend.

### Using Mock Services

The `src/services` directory contains mock implementations so you can try the frontend without a running backend. Set the following flag in your `.env.local` file:

```bash
NEXT_PUBLIC_USE_MOCK_DATA=true
```

When this flag is present the app loads the mock service modules. Removing it (or setting it to `false`) automatically switches to the real Supabase-based services under `src/services/*.ts`.

> > > > > master

## Deployment

This application is ready to be deployed to [Vercel](https://vercel.com/).

1.  Push your code to a Git repository.
2.  Go to [vercel.com](https://vercel.com/) and create a new project.
3.  Connect your Git repository.
4.  Add your Supabase environment variables in the Vercel project settings.
5.  Deploy!

## License

This project is licensed under the MIT License.
