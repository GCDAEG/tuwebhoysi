// src/components/auth/login/LoginForm.tsx

import { login } from "@/app/(auth)/login/actions";
import { Loader2, Lock, Mail } from "lucide-react";
import React, { SubmitEventHandler, useState } from "react";
// import { login, signup } from "./actions";

interface LoginFormProps {
  // No se pasan props a este componente
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<{
    errorStatus: number | undefined;
    message: string;
    state: boolean;
  }>({ errorStatus: 0, message: "", state: false });
  // Envolvemos la acción para manejar el estado de carga visual
  const handleSubmit = async (e: FormData) => {
    console.log(e);
    setIsPending(true);
    const { error, message } = await login(e);

    if (error) {
      setError({ errorStatus: error, message, state: true });
    }
    setIsPending(false);
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-foreground">
      {/* Encabezado */}
      {/* <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          TUWEB<span className="text-blue-600">HOY</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Ingresá al panel de control de tu negocio
        </p>
      </div> */}

      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          {/* Input Email */}
          <div className="relative">
            <label
              className="text-sm font-medium mb-1.5 block text-foreground"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nombre@empresa.com"
                className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="relative">
            <label
              className="text-sm font-medium mb-1.5 block text-foreground"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70"
            formAction={handleSubmit}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Iniciar Sesión"
            )}
          </button>

          {/* <button
            formAction={signup}
            className="w-full py-2.5 text-zinc-600 dark:text-zinc-400 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
          >
            Crear cuenta nueva
          </button> */}
        </div>
      </form>
      {error.state && (
        <div className="text-red-500 ">
          {error.errorStatus}
          {error.message}
        </div>
      )}
      <footer className="mt-8 text-center">
        <p className="text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} TUWEBHOY - Gualeguaychú, Entre Ríos.
        </p>
      </footer>
    </div>
  );
};

export default LoginForm;
