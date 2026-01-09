import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

export function Loader({ className, size = "default", ...props }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <Loader2
      className={cn("animate-spin text-primary", sizeClasses[size], className)}
      {...props}
    />
  );
}

export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader size="xl" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}
