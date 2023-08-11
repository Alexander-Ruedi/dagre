import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface SearchComponentProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}
export const SearchComponent = (props: SearchComponentProps) => {
  const icon = <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />;

  return (
    <>
      <div className="max-w-[260px]">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">{icon}</div>
          <input
            id="search"
            name="search"
            className="h-[30px] block w-full rounded-md shadow border border-gray-300 bg-white py-1.5 pl-7 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search"
            type="search"
            onChange={(event: any) => {
              props.onSearch(event.target.value);
            }}
            value={props.searchTerm}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
};
