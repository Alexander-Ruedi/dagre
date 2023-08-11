interface TitleProps {
  label: string;
  children?: React.ReactNode;
}

export default function SubTitleComponent(props: TitleProps) {
  return (
    <div className="md:flex md:items-center md:justify-between flex-row py-2">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-gray-900">{props.label}</h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4 max-h-[30px]">{props.children}</div>
    </div>
  );
}
