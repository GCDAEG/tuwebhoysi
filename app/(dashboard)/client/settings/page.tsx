import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  redirect("/client/settings/password");
  return <div>page</div>;
}
