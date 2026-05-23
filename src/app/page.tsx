import { HOME_META_DATA } from "@/utils/metaData";
import { Metadata } from "next";
import AddUserPage from "@/components/pages/AddUserPage";

export const metadata: Metadata = HOME_META_DATA;

export default function Home() {
  return (
    <main className="app-container space-y-8">
      <AddUserPage />
    </main>
  );
}
