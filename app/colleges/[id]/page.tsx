import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
});

export default async function CollegeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = await prisma.college.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!college) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-red-600">
            College not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl">

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h1 className="text-4xl font-bold text-slate-900">
            {college.name}
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            📍 {college.location}
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <span className="text-xl font-semibold">
              {college.rating}
            </span>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">
              About
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {college.overview}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Courses
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {college.courses.map((course) => (
                <span
                  key={course}
                  className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Fees
              </p>
              <p className="mt-2 text-xl font-bold">
                ₹{college.fees.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Average Package
              </p>
              <p className="mt-2 text-xl font-bold">
                ₹{college.averagePackage.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Highest Package
              </p>
              <p className="mt-2 text-xl font-bold">
                ₹{college.highestPackage.toLocaleString("en-IN")}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}