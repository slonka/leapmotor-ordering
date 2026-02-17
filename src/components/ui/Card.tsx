'use client';

import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  disabled?: boolean;
  hoverable?: boolean;
}

export default function Card({
  selected = false,
  disabled = false,
  hoverable = true,
  className = '',
  children,
  ...props
}: CardProps) {
  const base = 'rounded-xl border-2 bg-white transition-all duration-200';

  const stateClasses = disabled
    ? 'border-gray-200 opacity-60 cursor-not-allowed'
    : selected
      ? 'border-emerald-500 shadow-lg shadow-emerald-100 ring-1 ring-emerald-500'
      : hoverable
        ? 'border-gray-200 hover:border-emerald-300 hover:shadow-md cursor-pointer'
        : 'border-gray-200';

  return (
    <div className={`${base} ${stateClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}
