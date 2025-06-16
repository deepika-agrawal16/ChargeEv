import { useState } from "react";

export function Select({ children, className = "", ...props }) {
  return (
    <select
      className={`w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className = "", ...props }) {
  return <div {...props} className={`relative ${className}`}>{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <option value="">{placeholder}</option>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
