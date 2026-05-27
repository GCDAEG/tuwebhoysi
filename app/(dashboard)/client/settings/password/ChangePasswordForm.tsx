"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { KeyRound, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Esquema de validación simple con Zod
const passwordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function ChangePasswordForm() {
  const [isPending, setIsPending] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setIsPending(true);
    setSuccess(false);

    try {
      const supabase = createClient();

      // Llamada directa a Supabase Auth para actualizar al usuario logueado 🔐
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;

      setSuccess(true);
      reset(); // Limpia el input
    } catch (error: any) {
      console.error("Error al cambiar contraseña:", error);
      alert("No se pudo actualizar la contraseña: " + error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-white/10 pb-3 mb-4">
        <KeyRound className="size-5 text-blue-600" />
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
          Seguridad de la Cuenta
        </h3>
      </div>

      <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
        Cambiá la clave temporal que te asignamos por una contraseña segura que
        recuerdes.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Nueva Contraseña
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 6 caracteres"
              className="w-full rounded-xl border border-zinc-200 bg-transparent pl-4 pr-10 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:text-white"
            />
            {/* Botón para mostrar/ocultar contraseña */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Mensaje de éxito sutil */}
        {success && (
          <div className="flex items-center gap-2 rounded-xl bg-green-50 text-green-700 p-3 text-xs font-bold dark:bg-green-500/10 dark:text-green-400">
            <CheckCircle className="size-4 shrink-0" />
            ¡Contraseña actualizada con éxito!
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Actualizar Contraseña"
          )}
        </button>
      </form>
    </div>
  );
}
