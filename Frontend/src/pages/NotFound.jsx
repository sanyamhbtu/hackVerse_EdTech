import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-6">
      <h1 className="text-7xl font-bold text-slate-200">404</h1>
      <h2 className="text-2xl font-semibold text-white mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist. It might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-slate-800 text-white px-6 py-2 rounded-md shadow-md hover:bg-slate-500 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
