interface ErrorTextProps {
  message?: string;
}

export const ErrorTextComponent = (props: ErrorTextProps) => {
  return (
    <p className="mt-2 text-red-500 text-left" data-testid="errorText">
      {props.message}
    </p>
  );
};
