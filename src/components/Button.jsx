import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  onClick,
  className = "",
  type = "button",
}) {
  const baseClass =
    "button-type inline-flex min-h-11 items-center justify-center rounded-full border border-white px-8 py-3 text-center text-white transition duration-300 hover:bg-white hover:text-black";

  if (to) {
    return (
      <Link to={to} className={`${baseClass} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}