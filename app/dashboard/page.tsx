"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-slate-900">
            Welcome{user ? `, ${user.name}` : ""}! 👋
          </h1>

          <p className="mt-2 text-slate-600">
            Find, compare and save your favourite colleges.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <Link
            href="/colleges"
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">🎓</div>

            <h2 className="mt-4 text-xl font-bold">
              Find Colleges
            </h2>

            <p className="mt-2 text-slate-600">
              Search and filter colleges.
            </p>
          </Link>

          <Link
            href="/compare"
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">⚖️</div>

            <h2 className="mt-4 text-xl font-bold">
              Compare Colleges
            </h2>

            <p className="mt-2 text-slate-600">
              Compare colleges side by side.
            </p>
          </Link>

          <Link
            href="/saved"
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">❤️</div>

            <h2 className="mt-4 text-xl font-bold">
              Saved Colleges
            </h2>

            <p className="mt-2 text-slate-600">
              View your saved colleges.
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}