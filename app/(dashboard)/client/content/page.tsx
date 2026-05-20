import { StoreContentManager } from "@/components/admin/client/StoreContentManager";
import { getClientStoreContent } from "./actions";

export default async function ClientContentPage() {
  const storeData = await getClientStoreContent();

  return <StoreContentManager initialData={storeData} />;
}
