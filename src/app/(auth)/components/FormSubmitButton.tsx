import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FC, ReactNode } from "react";

interface FormSubmitButtonProps {
  children: ReactNode;
  isLoading: boolean;
}
const FormSubmitButton: FC<FormSubmitButtonProps> = ({
  children,
  isLoading,
}) => {
  return (
    <>
      {!isLoading ? (
        <Button type="submit">{children}</Button>
      ) : (
        <Button type="submit" disabled>
          <Loader2 className="animate-spin mr-1 duration-1000" size={18} />
          {children}
        </Button>
      )}
    </>
  );
};

export default FormSubmitButton;
