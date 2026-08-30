"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type College = {
  id: number;
  name: string;
  location: string;
  rating: number;
  averagePackage: number;
  highestPackage: number;
  fees: number;
  courses: string[];
};

export default function SavedPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSaved() {
    try {
      const res = await fetch("/api/saved");
      const data = await res.json();

      if (res.ok) {
        setColleges(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSaved();
  }, []);

  async function removeCollege(collegeId: number) {
    const res = await fetch("/api/saved", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ collegeId }),
    });

    if (res.ok) {
      setColleges((previous) =>
        previous.filter((college) => college.id !== collegeId)
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold text-slate-900">
          ❤️ Saved Colleges
        </h1>

        <p className="mt-2 text-slate-600">
          Colleges you saved for later.
        </p>

        {loading ? (
          <p className="mt-10">Loading...</p>
        ) : colleges.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              No saved colleges yet
            </h2>

            <p className="mt-2 text-slate-600">
              Go to Find Colleges and save your favourites.
            </p>

            <Link
              href="/colleges"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Find Colleges
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {colleges.map((college) => (
              <div
                key={college.id}
                className="rounded-2xl bg-white p-6 shadow-md"
              >
                <Link href={`/colleges/${college.id}`}>
                  <h2 className="text-xl font-bold">
                    {college.name}
                  </h2>

                  <p className="mt-2 text-slate-500">
                    📍 {college.location}
                  </p>

                  <p className="mt-3 font-semibold text-yellow-600">
                    ⭐ {college.rating}
                  </p>

                  <div className="mt-4 space-y-2 text-sm">
                    <p>
                      <strong>Fees:</strong> ₹
                      {college.fees.toLocaleString("en-IN")}
                    </p>

                    <p>
                      <strong>Average Package:</strong> ₹
                      {college.averagePackage.toLocaleString("en-IN")}
                    </p>

                    <p>
                      <strong>Highest Package:</strong> ₹
                      {college.highestPackage.toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => removeCollege(college.id)}
                  className="mt-5 w-full rounded-lg bg-red-500 py-2 font-medium text-white hover:bg-red-600"
                >
                  🗑 Remove
                </button>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}