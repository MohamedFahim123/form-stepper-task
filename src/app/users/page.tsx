import { USERS_META_DATA } from "@/utils/metaData";
import { Metadata } from "next";
import UsersListPage from "@/components/pages/UsersListPage";

export const metadata: Metadata = USERS_META_DATA;

export default function UsersPage() {
  return <UsersListPage />;
}
