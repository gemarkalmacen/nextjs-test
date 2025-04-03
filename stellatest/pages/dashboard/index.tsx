import { ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}
const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); // Sign out and redirect to login page
  };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-2 text-gray-400">Welcome, {session?.user?.name || "User"}!</p>

        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="block hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard/profile" className="block hover:text-gray-400">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-700 w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {session?.user?.name || "User"}!</h1>
          <p className="mt-2 text-gray-600">This is your personalized dashboard.</p>
        </div>
        {children}
      </main>
    </div>
  );
}
