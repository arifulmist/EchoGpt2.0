"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onValueChange: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            activeValue: value,
            onChange: onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  activeValue?: string;
  onChange?: (val: string) => void;
  className?: string;
}

export function TabsList({ children, activeValue, onChange, className }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isSelected: (child.props as any).value === activeValue,
            onSelect: () => onChange?.((child.props as any).value),
          });
        }
        return child;
      })}
    </div>
  );
}

interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function TabTrigger({ children, isSelected, onSelect, className }: TabTriggerProps) {
  return (
    <button
      role="tab"
      type="button"
      aria-selected={isSelected}
      onClick={onSelect}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
        isSelected
          ? "bg-card text-foreground shadow-sm font-semibold"
          : "hover:text-foreground text-muted-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}

interface TabContentProps {
  value: string;
  activeValue?: string;
  children: React.ReactNode;
  className?: string;
}

export function TabContent({ value, activeValue, children, className }: TabContentProps) {
  if (value !== activeValue) return null;
  return (
    <div role="tabpanel" className={cn("mt-3 focus-visible:outline-none", className)}>
      {children}
    </div>
  );
}
