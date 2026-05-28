import React from "react";
import Link from "next/link";
import { sections } from "@/lib/public/sections";
import { Smartphone, Mail } from "lucide-react";
import { CiInstagram } from "react-icons/ci";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-100 dark:border-white/5 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          {/* 1. Columna de Marca (Ocupa 2 espacios en desktop) */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-0.5 font-heading text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
            >
              <img src="/twhlogo.svg" alt="TUWEBHOY" className="h-8 w-32" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Transformando la manera en que los comercios locales venden.
              Catálogos digitales autogestionables, rápidos y directos a tu
              WhatsApp.
            </p>
            {/* Redes Sociales / Contacto */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="rounded-full bg-zinc-100 p-2.5 text-zinc-500 transition-all hover:bg-blue-100 hover:text-blue-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-blue-600/20 dark:hover:text-blue-400"
                aria-label="Instagram"
              >
                <CiInstagram className="size-4" strokeWidth={2.5} />
              </a>
              <a
                href="#"
                className="rounded-full bg-zinc-100 p-2.5 text-zinc-500 transition-all hover:bg-blue-100 hover:text-blue-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-blue-600/20 dark:hover:text-blue-400"
                aria-label="WhatsApp"
              >
                <Smartphone className="size-4" strokeWidth={2.5} />
              </a>
              <a
                href="#"
                className="rounded-full bg-zinc-100 p-2.5 text-zinc-500 transition-all hover:bg-blue-100 hover:text-blue-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-blue-600/20 dark:hover:text-blue-400"
                aria-label="Email"
              >
                <Mail className="size-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* 2. Columna de Navegación Dinámica */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    {section.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Columna de Legal / Extra */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Plataforma
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                >
                  Acceso Comercios
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-sm font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                >
                  Políticas de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador inferior y Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-zinc-200/60 pt-8 dark:border-white/5 sm:flex-row gap-4">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
            © {currentYear} TUWEBHOY. Todos los derechos reservados.
          </p>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-600 flex items-center gap-1">
            Hecho con <span className="text-red-500">♥</span> en Gualeguaychú
          </p>
        </div>
      </div>
    </footer>
  );
}
