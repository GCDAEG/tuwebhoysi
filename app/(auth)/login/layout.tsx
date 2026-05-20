// app/(auth)/layout.tsx
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black text-white antialiased">
      {/* Contenedor centrado para el login */}
      <main className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-black">
            TU WEBHOY si
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Acceso a tu panel administrativo
          </p>
        </div>

        {children}
      </main>

      {/* Footer simple para Auth */}
      <footer className="mt-8 text-zinc-500 text-xs">
        &copy; {new Date().getFullYear()} tuwebhoysi.com.ar
      </footer>
    </div>
  );
}
