"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface UseAutoSizeTextAreaProps {
  textAreaRef: HTMLTextAreaElement | null;
  triggerAutoSize: string;
}

const useAutoSizeTextArea = ({
  textAreaRef,
  triggerAutoSize,
}: UseAutoSizeTextAreaProps) => {
  React.useEffect(() => {
    
    if( !textAreaRef ) return;
    
    const borderWidth = parseFloat(getComputedStyle(textAreaRef).borderTopWidth) + parseFloat(getComputedStyle(textAreaRef).borderBottomWidth);
    
    textAreaRef.style.height = `${borderWidth}px`;
    const scrollHeight = textAreaRef.scrollHeight;

    const maxHeight = parseInt(textAreaRef.style.maxHeight);
    
    const newHeight = maxHeight ? Math.min(scrollHeight, maxHeight) : scrollHeight;
    
    textAreaRef.style.height = `${newHeight + borderWidth}px`;
    

  }, [textAreaRef, triggerAutoSize]);
};


export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, value, ...props }, ref) => {

    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [triggerAutoSize, setTriggerAutoSize] = React.useState("");

    useAutoSizeTextArea({
      textAreaRef: textAreaRef.current,
      triggerAutoSize,
    });

    React.useImperativeHandle(ref, () => ({
      ...textAreaRef.current as HTMLTextAreaElement,
    }));

    React.useEffect(() => {
      if (value || props?.defaultValue) {
        setTriggerAutoSize(value as string);
      }
    }, [value, props?.defaultValue]);

    return (
      <textarea
        ref={textAreaRef}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[98px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={value}
        onChange={(e) => {
          setTriggerAutoSize(e.target.value);
          onChange?.(e);
        }}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
