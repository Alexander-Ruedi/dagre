import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div className="flex text-center my-5 p-3 align-middle justify-center justify-items-center">
    <div className="flex flex-col space-y-2 w-80">
      <h5 className="font-bold">Sorry, page not found!</h5>

      <div className="text-gray-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;ve mistyped the URL? Be sure to check your spelling.
      </div>

      <Link
        to="/"
        className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Go to Home
      </Link>
    </div>
  </div>
);

export default PageNotFound;
