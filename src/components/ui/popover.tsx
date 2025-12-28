import * as React from "react";
import { cn } from "@/utils";

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Popover({ open, onOpenChange, children }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(open ?? false);

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, {
            isOpen,
            onOpenChange: handleOpenChange,
          });
        }
        return child;
      })}
    </div>
  );
}

interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PopoverTrigger = React.forwardRef<
  HTMLDivElement,
  PopoverTriggerProps
>(({ className, children, asChild, isOpen, onOpenChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      onClick={() => onOpenChange?.(!isOpen)}
      {...props}
    >
      {children}
    </div>
  );
});
PopoverTrigger.displayName = "PopoverTrigger";

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  isOpen?: boolean;
}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(({ className, align = "center", isOpen, children, ...props }, ref) => {
  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 rounded-md border border-gray-200 bg-white p-4 text-gray-950 shadow-md outline-none",
        {
          "left-0": align === "start",
          "left-1/2 -translate-x-1/2": align === "center",
          "right-0": align === "end",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
PopoverContent.displayName = "PopoverContent";
