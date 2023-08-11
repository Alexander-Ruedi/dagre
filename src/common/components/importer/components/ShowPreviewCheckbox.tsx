export interface ShowPreviewCheckboxProps {
  value: boolean;
  setValue: (value: boolean) => void;
}

export const ShowPreviewCheckbox = (props: ShowPreviewCheckboxProps) => {
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          id="show-preview"
          aria-describedby="comments-description"
          name="show-preview"
          type="checkbox"
          checked={props.value}
          onChange={() => props.setValue(!props.value)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="show-preview" className="font-medium text-gray-700">
          Show preview
        </label>
      </div>
    </div>
  );
};
