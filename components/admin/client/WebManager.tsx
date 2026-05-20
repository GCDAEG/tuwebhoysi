"use client";

import * as React from "react";
import { Copy, Check, QrCode, ExternalLink, Download } from "lucide-react";

interface WebManagerProps {
  config: {
    slug: string;
    business_name: string;
  } | null;
}

export function WebManager({ config }: WebManagerProps) {
  const [copied, setCopied] = React.useState(false);

  if (!config || !config.slug) {
    return (
      <div className="p-6 text-center text-sm text-zinc-500">
        No se pudo cargar la configuración de tu web. Asegurate de tener un
        usuario asignado.
      </div>
    );
  }

  // 1. Construimos la URL pública de su catálogo (en producción usará tu dominio real)
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://tuwebhoy.com";
  const publicUrl = `${baseUrl}/${config.slug}`;

  // 2. Armamos el enlace de la API pública para generar el QR (Codificado para URL)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(publicUrl)}&margin=10`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("No se pudo copiar automáticamente.");
    }
  };

  // Función para descargar el QR directamente como archivo PNG
  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `QR_${config.slug}_tuwebhoy.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error al descargar el código QR.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Mi Página Web
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Tu catálogo digital ya está online. Desde acá podés difundir tu link o
          descargar tu código QR personalizado.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* 🔗 TARJETA DEL LINK (Ocupa 2 columnas) */}
        <div className="space-y-4 md:col-span-2 flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Catálogo Online Activo
            </span>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white pt-1">
              {config.business_name}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
              Este es el enlace único de tu comercio. Compartilo en la biografía
              de tu Instagram, estados de WhatsApp o perfiles de redes sociales
              para que tus clientes armen sus pedidos de forma directa.
            </p>
          </div>

          {/* Input bloqueado con botones de acción */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/50 p-2 dark:border-white/10 dark:bg-zinc-900/50">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="w-full bg-transparent px-2 py-1 text-sm font-medium text-zinc-800 focus:outline-none dark:text-zinc-200"
              />
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all shadow-sm",
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
                )}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" /> ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" /> Copiar Link
                  </>
                )}
              </button>
            </div>

            {/* Botón para visitar la web en otra pestaña */}
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 pt-1"
            >
              <ExternalLink className="size-3.5" /> Ver mi sitio web público
            </a>
          </div>
        </div>

        {/* 🔲 TARJETA CÓDIGO QR (Ocupa 1 columna) */}
        <div className="flex flex-col items-center justify-between rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center justify-center gap-1.5">
              <QrCode className="size-4 text-zinc-500" /> Tu Código QR
            </h3>
            <p className="text-[11px] text-zinc-400">
              Escaneable desde celulares
            </p>
          </div>

          {/* Imagen del QR real generado por API */}
          <div className="my-4 size-36 overflow-hidden rounded-2xl border border-zinc-100 bg-white p-2 dark:border-white/5">
            <img
              src={qrImageUrl}
              alt="Código QR de la tienda"
              className="size-full object-contain"
            />
          </div>

          {/* Botón de descarga */}
          <button
            onClick={handleDownloadQR}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <Download className="size-3.5" /> Descargar QR (.PNG)
          </button>
        </div>
      </div>
    </div>
  );
}

// Pequeño helper para manejar condicionalmente clases de Tailwind
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
