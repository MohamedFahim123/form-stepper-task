import Link from "next/link";
import UsersTable from "@/components/organisms/UsersTable";
import { getUsersAction } from "@/actions/userActions";

export default async function UsersTemplate() {
  const users = await getUsersAction();

  return (
    <main className="app-container space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-heading-1">Users</h1>
        </div>
        <Link href="/" className="btn-primary">
          Add User
        </Link>
      </div>
      <UsersTable users={users} />
    </main>
  );
}
