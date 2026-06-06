export default function ResultPanel({ data }) {
  return (
    <section className="border border-[#262626] bg-[#0d0d0d]">
      <div className="border-b border-[#262626] p-6 sm:p-8 md:p-10">
        <p className="caption text-[#999999]">Greatest Common Divisor</p>

        <div className="mt-8 grid gap-8 md:grid-cols-[0.75fr_0.25fr] md:items-end">
          <div>
            <p className="display-xl text-white">{data.gcd}</p>

            <p className="body-md mt-5 max-w-xl text-[#cccccc]">
              FPB dari {data.numA} dan {data.numB} adalah {data.gcd}.
            </p>
          </div>

          <div className="md:text-right">
            <p className="caption text-[#999999]">Formula</p>

            <p className="title-sm mt-3 break-words text-white">
              {data.steps} = {data.gcd}
            </p>
          </div>
        </div>
      </div>

      <div className="grid border-b border-[#262626] sm:grid-cols-3">
        <div className="border-b border-[#262626] p-6 sm:border-b-0 sm:border-r sm:p-8">
          <p className="caption text-[#999999]">Input A</p>
          <p className="display-md mt-4 text-white">{data.numA}</p>
        </div>

        <div className="border-b border-[#262626] p-6 sm:border-b-0 sm:border-r sm:p-8">
          <p className="caption text-[#999999]">Input B</p>
          <p className="display-md mt-4 text-white">{data.numB}</p>
        </div>

        <div className="p-6 sm:p-8">
          <p className="caption text-[#999999]">Common Factors</p>
          <p className="display-md mt-4 text-white">
            {data.items.length > 0 ? data.items.length : 0}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-[#262626]">
              <th className="caption px-6 py-5 text-left text-[#999999] md:px-8">
                Factor
              </th>

              <th className="caption px-6 py-5 text-left text-[#999999] md:px-8">
                Power A
              </th>

              <th className="caption px-6 py-5 text-left text-[#999999] md:px-8">
                Power B
              </th>

              <th className="caption px-6 py-5 text-left text-[#999999] md:px-8">
                Selected
              </th>
            </tr>
          </thead>

          <tbody>
            {data.items.length > 0 ? (
              data.items.map((item) => (
                <tr key={item.factor} className="border-b border-[#262626]">
                  <td className="title-sm px-6 py-6 text-white md:px-8">
                    {item.factor}
                  </td>

                  <td className="body-sm px-6 py-6 text-[#cccccc] md:px-8">
                    {item.expA}
                  </td>

                  <td className="body-sm px-6 py-6 text-[#cccccc] md:px-8">
                    {item.expB}
                  </td>

                  <td className="body-sm px-6 py-6 text-white md:px-8">
                    {item.factor}^{item.selectedExp}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="body-sm px-6 py-8 text-[#cccccc] md:px-8" colSpan="4">
                  Tidak ada faktor prima yang sama. FPB bernilai 1.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}