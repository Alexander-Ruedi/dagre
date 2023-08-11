import { useRouteError } from "react-router-dom";

interface ErrorInterface {
  statusText: any;
  message: any;
}
const ErrorPage = () => {
  const error = useRouteError() as ErrorInterface;
  return (
    <div id="error-page" className="p-3">
      <div className="flex flex-col space-y-2">
        <h5>Oops!</h5>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
