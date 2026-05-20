// @/lib/zod/schemas.ts
import * as z from "zod";

// Regex estándar para validar un UUID v4 de forma manual e infalible
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const productSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  description: z.string().optional().nullable(),
  price: z.coerce.number().min(0, "El precio debe ser positivo"),
  discount_percent: z.coerce.number().min(0).max(100, "Máximo 100%").default(0),
  
  // ✅ Usamos regex para validar el formato del UUID sin depender de métodos internos
  category: z.string().regex(uuidRegex, "Seleccioná una categoría válida").optional().or(z.literal("")), 
  
  // ✅ Para la URL, una validación de string limpia que acepte formato web o vacío
  image_url: z.string().url("URL de imagen inválida").optional().or(z.literal("")),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// Esquema para crear/editar categorías rápidas
export const categorySchema = z.object({
  name: z.string().min(2, "El nombre de la categoría es muy corto"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;





// Agregá esto a tu @/lib/zod/schemas.ts

export const socialMediaSchema = z.object({
  whatsapp: z
    .string()
    .min(8, "El número es muy corto")
    .regex(/^[0-9]+$/, "Ingresá solo números, sin espacios, guiones ni el signo +"),
  instagram_url: z.string().url("URL de Instagram inválida").optional().or(z.literal("")),
  facebook_url: z.string().url("URL de Facebook inválida").optional().or(z.literal("")),
});

export type SocialMediaFormValues = z.infer<typeof socialMediaSchema>;


// Agregá esto a tu @/lib/zod/schemas.ts

export const storeContentSchema = z.object({
  business_name: z.string().min(2, "El nombre del negocio debe tener al menos 2 caracteres"),
  welcome_message: z.string().max(200, "El mensaje no puede superar los 200 caracteres").optional().or(z.literal("")),
  logo_url: z.string().url("URL de logo inválida").optional().or(z.literal("")),
  banner_url: z.string().url("URL de portada inválida").optional().or(z.literal("")),
});

export type StoreContentFormValues = z.infer<typeof storeContentSchema>;