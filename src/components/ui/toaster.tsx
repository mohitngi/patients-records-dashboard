import { useToast } from "@/hooks/use-toast";
import { Toast, ToastTitle, ToastDescription } from "@/components/ui/toast";
import { X } from "lucide-react";

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]">
      {toasts.map(({ id, title, description, variant }) => (
        <div
          key={id}
          className="mb-4 animate-in slide-in-from-top-full sm:slide-in-from-bottom-full"
        >
          <Toast variant={variant}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            <button
              onClick={() => removeToast(id)}
              className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </Toast>
        </div>
      ))}
    </div>
  );
}
