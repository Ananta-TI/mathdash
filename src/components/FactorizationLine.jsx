export default function FactorizationLine({
  label,
  number,
  factorization,
  map,
}) {
  const entries = Object.entries(map);

  return (
    <article className="border border-[#262626] bg-black p-6 sm:p-8">
      <p className="caption text-[#999999]">{label}</p>

      <div className="mt-8 border-b border-[#262626] pb-8">
        <p className="display-lg break-words text-white">{number}</p>
      </div>

      <div className="mt-8">
        <p className="caption text-[#999999]">Prime Factorization</p>

        <p className="display-md mt-4 break-words text-white">
          {factorization}
        </p>
      </div>

      <div className="mt-8 grid border-t border-[#262626]">
        {entries.map(([base, exp]) => (
          <div
            key={base}
            className="grid grid-cols-2 gap-4 border-b border-[#262626] py-5"
          >
            <p className="caption text-[#999999]">Base {base}</p>
            <p className="title-sm text-right text-white">Power {exp}</p>
          </div>
        ))}
      </div>
    </article>
  );
}