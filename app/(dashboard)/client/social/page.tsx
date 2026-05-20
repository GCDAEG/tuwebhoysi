import { SocialMediaManager } from "@/components/admin/client/SocialMediaManager";
import { getClientSocialMedia } from "./actions";

export default async function ClientSocialPage() {
  // Hacemos el fetch inicial de las redes directo en el servidor 🚀
  const socialData = await getClientSocialMedia();

  return <SocialMediaManager initialData={socialData} />;
}
