"use client";

import Link from "next/link";
import UsersTable from "@/components/organisms/UsersTable";
import { useUsersQuery } from "@/services/user.service";

export default function UsersTemplate() {
  const usersQuery = useUsersQuery();

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
      <UsersTable
        users={usersQuery.data ?? []}
        isLoading={usersQuery.isLoading}
        isError={usersQuery.isError}
        onRetry={() => usersQuery.refetch()}
      />
    </main>
  );
}
