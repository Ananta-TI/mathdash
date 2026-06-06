import CalculatorSection from "../components/CalculatorSection";
import SectionLabel from "../components/SectionLabel";

export default function Calculator() {
  return (
    <div className="page-shell overflow-hidden">
      <section className="border-b border-[#262626] bg-black px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:px-10 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-[1280px]">
          <SectionLabel>Calculator</SectionLabel>

          <div className="grid gap-7 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h1 className="display-xl max-w-3xl text-white">
              FACTOR TREE FPB CALCULATOR
            </h1>

            <p className="body-md max-w-2xl text-[#cccccc] lg:pt-3">
              Input two integers and the interface will calculate prime
              factorization, factor tree breakdown, exponent mapping, and the
              final FPB result. Separate page, focused function, fewer excuses.
            </p>
          </div>
        </div>
      </section>

      <CalculatorSection />
    </div>
  );
}