"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Copy, Check } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { newStore } from "@/app/(admin)/admin/action";

// Esquema de validación con Zod
const storeSchema = z.object({
  email: z.email("Correo inválido"),
  storename: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  instagram_url: z.string().optional().or(z.literal("")), // Maneja strings vacíos
  whatsapp: z.string().min(8, "Ingresa un número válido"),
  facebook_url: z.string().optional().or(z.literal("")),
  catalog: z.boolean(), // 👈 Quitá el .default aquí si lo vas a poner en useForm
  website: z.string().optional().or(z.literal("")),
});
type StoreFormValues = z.infer<typeof storeSchema>; //clientFormData

export default function CreateStore() {
  const [loading, setLoading] = useState(false);
  const [generatedPass, setGeneratedPass] = useState("");
  const [copied, setCopied] = useState(false);
  const [usernameGenerated, setUsernameGenerated] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: { catalog: true },
  });

  // Función para generar contraseña aleatoria

  const onSubmit = async (data: StoreFormValues) => {
    setLoading(true);

    const response = await newStore(data); //Creando cliente

    if (response.success) {
      setLoading(false);
      reset();
      setGeneratedPass(response.password);
      setUsernameGenerated(response.username);
    }

    // setTimeout(() => {
    //   setGeneratedPass(password);
    //   setLoading(false);
    //   // reset(); // Opcional: limpiar formulario
    // }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white/70 border rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Dar de alta nuevo comercio
      </h2>

      {!generatedPass ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nombre del Comercio */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Nombre del Comercio
            </label>
            <input
              {...register("storename")}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 text-foreground/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ej: Pizzería Don Luis"
            />
            {errors.storename && (
              <p className="text-red-500 text-xs mt-1">
                {errors.storename.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Página Web (opcional)
            </label>
            <input
              {...register("website")}
              type="url"
              className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 text-foreground/50 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://www.tuwebhoy.com"
            />
            {errors.website && (
              <p className="text-red-500 text-xs mt-1">
                {errors.website.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Correo Electrónico
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 text-foreground/50 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="cliente@correo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                WhatsApp (con código)
              </label>
              <input
                {...register("whatsapp")}
                className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 text-foreground/50 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="543446..."
              />
            </div>
            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Instagram (@usuario)
              </label>
              <input
                {...register("instagram_url")}
                className="w-full bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 text-foreground/50 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="@tuwebhoy"
              />
            </div>
          </div>

          {/* Switch de Catálogo */}
          <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700">
            <div>
              <p className="text-sm font-medium text-white">
                ¿Integrar Catálogo Digital?
              </p>
              <p className="text-xs text-zinc-500">
                Permite al cliente subir productos y recibir pedidos.
              </p>
            </div>
            <input
              type="checkbox"
              {...register("catalog")}
              className="w-5 h-5 accent-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Registrar Comercio y Generar Acceso"
            )}
          </button>
          {loading && <button onClick={() => setLoading(false)}>retry</button>}
        </form>
      ) : (
        /* Pantalla de Éxito y Credenciales */
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg text-center">
            <p className="text-green-400 font-medium">
              ¡Comercio creado con éxito!
            </p>
          </div>

          <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 relative">
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
              Nombre de usuario:
            </p>
            <div className="flex items-center justify-between">
              <code className="text-xl font-mono text-blue-400">
                {usernameGenerated}
              </code>
            </div>
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
              Contraseña de acceso para el cliente:
            </p>
            <div className="flex items-center justify-between">
              <code className="text-xl font-mono text-blue-400">
                {generatedPass}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-zinc-700 rounded-md transition-colors"
              >
                {copied ? (
                  <Check className="text-green-500" />
                ) : (
                  <Copy className="text-zinc-400" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={() => setGeneratedPass("")}
            className="w-full border border-zinc-700 text-zinc-400 py-2 rounded-lg hover:bg-zinc-800 transition-all"
          >
            Registrar otro comercio
          </button>
        </div>
      )}
    </div>
  );
}
