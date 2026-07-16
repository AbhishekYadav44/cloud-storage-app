"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getCurrentUser,
  getAllUsers,
  getDeletedUsers,
  logoutUserById,
  deleteUser,
  deleteUserHard,
} from "@/app/services/users";

type UserRow = { id: string; name: string; email: string; isLoggedIn: boolean };
type DeletedUserRow = { _id: string; name: string; email: string };

export default function AdminPage() {
  const router = useRouter();

  const [users, setUsers] = useState<UserRow[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<DeletedUserRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user.role === "user") {
          router.push("/drive");
        } else {
          loadUsers();
        }
      })
      .catch(() => router.push("/login"));
  }, []);

  async function loadUsers() {
    setLoading(true);
    setError("");
    try {
      const [active, deleted] = await Promise.all([getAllUsers(), getDeletedUsers()]);
      setUsers(active);
      setDeletedUsers(deleted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load users");
    } finally {
      setLoading(false);
    }
  }

  async function handleForceLogout(id: string) {
    if (!window.confirm("Log this user out of all their devices?")) return;
    try {
      await logoutUserById(id);
      loadUsers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not log the user out");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not delete this user");
    }
  }

  async function handleHardDelete(id: string) {
    if (!window.confirm("Permanently delete this user? This cannot be undone.")) return;
    try {
      await deleteUserHard(id);
      loadUsers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not permanently delete this user");
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Users</h1>
        <Link href="/drive" className="text-sm text-blue-600 hover:underline">
          Back to Cloudy
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {!loading && (
        <>
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Active users</h2>
          <ul className="mb-8 divide-y divide-gray-200 rounded border border-gray-200 bg-white">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.email} · {user.isLoggedIn ? "Online" : "Offline"}
                  </p>
                </div>
                <div className="flex gap-3 text-xs text-gray-500">
                  <button onClick={() => handleForceLogout(user.id)} className="hover:underline">
                    Log out
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {users.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500">No active users.</li>
            )}
          </ul>

          <h2 className="mb-2 text-sm font-semibold text-gray-700">Deleted users</h2>
          <ul className="divide-y divide-gray-200 rounded border border-gray-200 bg-white">
            {deletedUsers.map((user) => (
              <li key={user._id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => handleHardDelete(user._id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Permanently delete
                </button>
              </li>
            ))}
            {deletedUsers.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500">No deleted users.</li>
            )}
          </ul>
        </>
      )}
    </main>
  );
}
