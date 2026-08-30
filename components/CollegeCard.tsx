interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
}

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      
      <h3 className="text-xl font-bold text-slate-900">
        {college.name}
      </h3>

      <p className="mt-2 text-slate-600">
        📍 {college.location}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-medium">
          ⭐ {college.rating}
        </span>

        <span className="font-medium">
          ₹{college.fees.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="mt-6 flex gap-3">
        <a
          href={`/colleges/${college.id}`}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          View Details
        </a>

        <button className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          Compare
        </button>
      </div>
    </div>
  );
}