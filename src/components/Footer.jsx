import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-black px-5 py-14 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-[1280px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="wordmark text-white">MATHDASH</p>

          <p className="body-sm mt-6 max-w-sm text-[#999999]">
            A minimal factor-tree interface for calculating FPB through prime
            factorization.
          </p>
        </div>

        <div>
          <p className="caption text-white">Pages</p>

          <div className="mt-5 grid gap-3">
            <Link className="body-sm text-[#999999] hover:text-white" to="/">
              Landing
            </Link>

            <Link
              className="body-sm text-[#999999] hover:text-white"
              to="/calculator"
            >
              Calculator
            </Link>
          </div>
        </div>

        <div>
          <p className="caption text-white">System</p>

          <div className="mt-5 grid gap-3">
            <p className="body-sm text-[#999999]">Prime Factors</p>
            <p className="body-sm text-[#999999]">Factor Tree</p>
            <p className="body-sm text-[#999999]">FPB Details</p>
          </div>
        </div>

        <div>
          <p className="caption text-white">Stack</p>

          <div className="mt-5 grid gap-3">
            <p className="body-sm text-[#999999]">React</p>
            <p className="body-sm text-[#999999]">Vite</p>
            <p className="body-sm text-[#999999]">Tailwind</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1280px] flex-col gap-4 border-t border-[#262626] pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
        <p className="caption text-[#666666]">© 2026</p>
        <p className="caption text-[#666666]">Ananta Firdaus</p>
      </div>
    </footer>
  );
}