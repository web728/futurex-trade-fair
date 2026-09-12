import type { ElementType, ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: 'default' | 'narrow' | 'wide' | 'full';
  noPadding?: boolean;
}

const sizeMap = {
  narrow: 'max-w-5xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1400px]',
  full: 'max-w-full'
};

export function PageContainer({
  children,
  className = '',
  as: Component = 'div',
  size = 'default',
  noPadding = false
}: PageContainerProps) {
  return (
    <Component
      className={`w-full mx-auto ${sizeMap[size]} ${
        noPadding ? '' : 'px-5 sm:px-8 lg:px-12'
      } ${className}`.trim()}
    >
      {children}
    </Component>
  );
}

export default PageContainer;