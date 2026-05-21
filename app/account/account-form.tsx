"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Claims {
  sub: string;
  email?: string;
}

export default function AccountForm({ claims }: { claims: Claims | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    fullname: "",
    username: "",
    website: "",
    avatar_url: "",
    instagram_url: "",
    facebook_url: "",
    whatsapp_number: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        if (!claims?.sub) return;
        setLoading(true);

        const { data, error } = await supabase
          .from("profiles")
          .select(
            `full_name, username, website, avatar_url, instagram_url, facebook_url, whatsapp_number`,
          )
          .eq("id", claims.sub)
          .single();

        if (error) throw error;

        if (data && isMounted) {
          setProfile({
            fullname: data.full_name || "",
            username: data.username || "",
            website: data.website || "",
            avatar_url: data.avatar_url || "",
            instagram_url: data.instagram_url || "",
            facebook_url: data.facebook_url || "",
            whatsapp_number: data.whatsapp_number || "",
          });
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [claims?.sub, supabase]);

  async function handleUpdate() {
    try {
      if (!claims?.sub) return;
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: claims.sub,
        full_name: profile.fullname,
        username: profile.username,
        website: profile.website,
        avatar_url: profile.avatar_url,
        instagram_url: profile.instagram_url,
        facebook_url: profile.facebook_url,
        whatsapp_number: profile.whatsapp_number,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      alert("¡Perfil de TUWEBHOY actualizado!");
    } catch (error) {
      alert("Error al actualizar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-xl font-bold mb-4">Configuración del Negocio</h2>

      <div className="space-y-4">
        {/* Datos Básicos */}
        <div>
          <label className="block text-sm font-medium">
            Nombre de la Empresa
          </label>
          <input
            type="text"
            value={profile.fullname}
            onChange={(e) =>
              setProfile({ ...profile, fullname: e.target.value })
            }
            className="w-full p-2 bg-transparent border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Link al Logo (URL)
          </label>
          <input
            type="text"
            value={profile.avatar_url}
            onChange={(e) =>
              setProfile({ ...profile, avatar_url: e.target.value })
            }
            placeholder="https://..."
            className="w-full p-2 bg-transparent border rounded"
          />
        </div>

        {/* Redes Sociales */}
        <div className="border-t pt-4 mt-4 space-y-4">
          <p className="text-sm font-semibold text-zinc-500">
            Datos de Contacto
          </p>

          <div>
            <label className="block text-sm font-medium">WhatsApp</label>
            <input
              type="text"
              value={profile.whatsapp_number}
              onChange={(e) =>
                setProfile({ ...profile, whatsapp_number: e.target.value })
              }
              placeholder="543446..."
              className="w-full p-2 bg-transparent border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Instagram URL</label>
            <input
              type="text"
              value={profile.instagram_url}
              onChange={(e) =>
                setProfile({ ...profile, instagram_url: e.target.value })
              }
              placeholder="https://instagram.com/..."
              className="w-full p-2 bg-transparent border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Facebook URL</label>
            <input
              type="text"
              value={profile.facebook_url}
              onChange={(e) =>
                setProfile({ ...profile, facebook_url: e.target.value })
              }
              placeholder="https://facebook.com/..."
              className="w-full p-2 bg-transparent border rounded"
            />
          </div>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
        >
          {loading ? "Guardando..." : "Actualizar Datos"}
        </button>
      </div>

      {/* Signout form igual que antes... */}
    </div>
  );
}
