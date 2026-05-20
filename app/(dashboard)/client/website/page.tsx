import { WebManager } from "@/components/admin/client/WebManager";
import { getClientWebConfig } from "./actions";

export default async function ClientWebPage() {
  const webConfig = await getClientWebConfig();

  return <WebManager config={webConfig} />;
}
