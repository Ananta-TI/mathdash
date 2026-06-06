import { useMemo, useState } from "react";
import { calculateFPB, validateInput } from "../utils/factorization";
import Button from "./Button";
import FactorTree from "./FactorTree";
import FactorizationLine from "./FactorizationLine";
import ResultPanel from "./ResultPanel";
import SectionLabel from "./SectionLabel";

export default function CalculatorSection() {
  const [numA, setNumA] = useState("");
  const [numB, setNumB] = useState("");

  const isEmptyA = numA.trim() === "";
  const isEmptyB = numB.trim() === "";
  const isEmpty = isEmptyA || isEmptyB;

  const errorA = !isEmptyA ? validateInput(numA, "Angka pertama") : "";
  const errorB = !isEmptyB ? validateInput(numB, "Angka kedua") : "";
  const hasError = Boolean(errorA || errorB);

  const data = useMemo(() => {
    if (isEmpty || hasError) return null;
    return calculateFPB(Number(numA), Number(numB));
  }, [numA, numB, isEmpty, hasError]);

  const resetInput = () => {
    setNumA("");
    setNumB("");
  };

  return (
    <section className="bg-black px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-[110px] lg:py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <aside>
            <SectionLabel>Input</SectionLabel>

            <h2 className="display-lg text-white">TWO NUMBERS</h2>

            <p className="body-md mt-6 text-[#cccccc]">
              Masukkan dua bilangan bulat. Hasil akan muncul setelah kedua
              input terisi dengan angka yang valid.
            </p>

            <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10">
              <label className="block">
                <span className="caption mb-3 block text-[#999999]">
                  Angka Pertama
                </span>

                <input
                  className="input-line w-full"
                  type="number"
                  value={numA}
                  onChange={(event) => setNumA(event.target.value)}
                  placeholder="Masukkan angka pertama"
                />
              </label>

              <label className="block">
                <span className="caption mb-3 block text-[#999999]">
                  Angka Kedua
                </span>

                <input
                  className="input-line w-full"
                  type="number"
                  value={numB}
                  onChange={(event) => setNumB(event.target.value)}
                  placeholder="Masukkan angka kedua"
                />
              </label>
            </div>

            {hasError && (
              <div className="mt-8 border border-[#3a3a3a] bg-[#141414] p-5">
                <p className="caption text-white">Input Error</p>

                <p className="body-sm mt-3 text-[#cccccc]">
                  {errorA || errorB}
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <Button onClick={resetInput} className="w-full px-5 sm:w-auto">
                Reset
              </Button>
            </div>

            <div className="mt-8 border-t border-[#262626] pt-6">
              <p className="caption text-[#666666]">Input Rules</p>

              <p className="body-sm mt-3 text-[#999999]">
                Gunakan bilangan bulat minimal 2. Hasil akan dihitung otomatis
                setelah kedua input valid.
              </p>
            </div>
          </aside>

          <div>
            {data ? (
              <ResultPanel data={data} />
            ) : (
              <div className="grid min-h-[320px] place-items-center border border-[#262626] bg-[#0d0d0d] p-6 text-center sm:min-h-[380px] sm:p-8 md:min-h-[420px]">
                <div className="w-full max-w-md">
                  <p className="caption text-[#999999]">Result</p>

                  <p className="display-md mt-4 text-white">
                    {isEmpty ? "WAITING FOR INPUT" : "INVALID INPUT"}
                  </p>

                  <p className="body-sm mt-5 text-[#999999]">
                    {isEmpty
                      ? "Isi kedua angka terlebih dahulu untuk menampilkan hasil perhitungan."
                      : "Periksa kembali nilai input. Angka harus berupa bilangan bulat minimal 2."}
                  </p>

                  {isEmpty && (
                    <div className="mt-10 border-t border-[#262626]">
                      <div className="flex items-center justify-between gap-4 border-b border-[#262626] py-4">
                        <span className="caption text-[#666666]">01</span>
                        <span className="caption text-[#999999]">
                          Prime Factorization
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 border-b border-[#262626] py-4">
                        <span className="caption text-[#666666]">02</span>
                        <span className="caption text-[#999999]">
                          Factor Tree
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 border-b border-[#262626] py-4">
                        <span className="caption text-[#666666]">03</span>
                        <span className="caption text-[#999999]">
                          FPB Result
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {data && (
          <div className="mt-20 grid gap-14 md:mt-[110px] md:gap-16">
            <div>
              <SectionLabel>Prime Factorization</SectionLabel>

              <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                <FactorizationLine
                  label="First Number"
                  number={data.numA}
                  factorization={data.factorizationA}
                  map={data.mapA}
                />

                <FactorizationLine
                  label="Second Number"
                  number={data.numB}
                  factorization={data.factorizationB}
                  map={data.mapB}
                />
              </div>
            </div>

            <div>
              <SectionLabel>Factor Tree</SectionLabel>

              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                <FactorTree
                  title={`Tree of ${data.numA}`}
                  tree={data.treeA}
                  lines={data.treeLinesA}
                />

                <FactorTree
                  title={`Tree of ${data.numB}`}
                  tree={data.treeB}
                  lines={data.treeLinesB}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}