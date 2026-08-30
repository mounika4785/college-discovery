"use client";

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

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadColleges() {
      try {
        const response = await fetch("/api/colleges");

        if (!response.ok) {
          throw new Error("Failed to load colleges");
        }

        const data = await response.json();

        console.log("COMPARE COLLEGES:", data);

        setColleges(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load colleges");
      } finally {
        setLoading(false);
      }
    }

    loadColleges();
  }, []);

  const college1 = colleges.find(
    (college) => college.id === Number(first)
  );

  const college2 = colleges.find(
    (college) => college.id === Number(second)
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold text-slate-900">
          Compare Colleges ⚖️
        </h1>

        <p className="mt-2 text-slate-600">
          Select two colleges to compare them side by side.
        </p>

        {loading && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            Loading colleges...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl bg-red-50 p-6 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                First College
              </label>

              <select
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="">-- Select College --</option>

                {colleges.map((college) => (
                  <option
                    key={college.id}
                    value={String(college.id)}
                  >
                    {college.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Second College
              </label>

              <select
                value={second}
                onChange={(e) => setSecond(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="">-- Select College --</option>

                {colleges.map((college) => (
                  <option
                    key={college.id}
                    value={String(college.id)}
                  >
                    {college.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        )}

        {college1 && college2 && (
          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-lg">

            <div className="grid grid-cols-3 bg-blue-50 p-5 font-bold">
              <div>Feature</div>
              <div>{college1.name}</div>
              <div>{college2.name}</div>
            </div>

            <div className="grid grid-cols-3 border-t p-5">
              <div className="font-semibold">📍 Location</div>
              <div>{college1.location}</div>
              <div>{college2.location}</div>
            </div>

            <div className="grid grid-cols-3 border-t p-5">
              <div className="font-semibold">⭐ Rating</div>
              <div>{college1.rating}</div>
              <div>{college2.rating}</div>
            </div>

            <div className="grid grid-cols-3 border-t p-5">
              <div className="font-semibold">💰 Fees</div>
              <div>₹{college1.fees.toLocaleString("en-IN")}</div>
              <div>₹{college2.fees.toLocaleString("en-IN")}</div>
            </div>

            <div className="grid grid-cols-3 border-t p-5">
              <div className="font-semibold">📈 Average Package</div>
              <div>
                ₹{college1.averagePackage.toLocaleString("en-IN")}
              </div>
              <div>
                ₹{college2.averagePackage.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="grid grid-cols-3 border-t p-5">
              <div className="font-semibold">🏆 Highest Package</div>
              <div>
                ₹{college1.highestPackage.toLocaleString("en-IN")}
              </div>
              <div>
                ₹{college2.highestPackage.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="grid grid-cols-3 border-t p-5">
              <div className="font-semibold">🎓 Courses</div>
              <div>{college1.courses.join(", ")}</div>
              <div>{college2.courses.join(", ")}</div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}