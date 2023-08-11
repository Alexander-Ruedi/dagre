import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";

interface SupportButtonProps {
  mail: string;
  subject?: string;
}
export const SupportButtonComponent = (props: SupportButtonProps) => {
  const icon = <EnvelopeIcon className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />;

  const optionalSubject = props.subject ? `?subject=${props.subject}` : "";
  const fullUrl = "mailto:" + props.mail + optionalSubject;

  return (
    <div className="flex max-h-full">
      <SmallActionButtonComponent icon={icon} text={"Support"} onClick={() => (window.location.href = fullUrl)} />
    </div>
  );
};
