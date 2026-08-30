"use client";

import { useState } from "react";
import CollegeCard from "@/components/CollegeCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState<any[]>([]);

  async function handleSearch() {
    const res = await fetch(
      `/api/colleges?search=${encodeURIComponent(search)}`
    );

    const data = await res.json();
    setColleges(data);
  }

  return (
    <main>
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Find the Right College for You
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Search, explore and compare colleges to make better decisions.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl">
            <input
              type="text"
              placeholder="Search colleges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-l-lg border border-slate-300 bg-white px-5 py-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSearch}
              className="rounded-r-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Search
            </button>
          </div>

        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <h2 className="text-2xl font-bold text-slate-900">
            {search ? "Search Results" : "Popular Colleges"}
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(colleges.length > 0 ? colleges : []).map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
              />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}