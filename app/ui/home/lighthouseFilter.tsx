"use client";

const coasts = ["All", "North Atlantic Ocean", "North Channel", "Irish Sea", "Celtic Sea"] as const;
const countries = ["All", "Ireland", "Northern Ireland"] as const;

interface LighthouseFilterProps {
  selectedCoast: string;
  setSelectedCoast: (coast: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

export default function LighthouseFilter({
  selectedCoast, setSelectedCoast,
  selectedCountry, setSelectedCountry,
}: LighthouseFilterProps) {
  return (
    <div className="space-y-2 w-full md:w-1/3">

      <select
        value={selectedCoast}
        onChange={(e) => setSelectedCoast(e.target.value)}
        className="w-full bg-white border border-gray-300 px-4 py-2 rounded-lg shadow"
      >
        {coasts.map(coast => (
          <option key={coast} value={coast}>{coast}</option>
        ))}
      </select>

      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="w-full bg-white border border-gray-300 px-4 py-2 rounded-lg shadow"
      >
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

    </div>
  );
}
