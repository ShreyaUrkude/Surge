import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // Yeh line add karein

export default async function AccountIndex() {
  redirect("/account/profile");
}