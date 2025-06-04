export type OutlineButtonProps = {
  title: string;
  isSelected: boolean;
  onSelected: (value: string) => void;
};

export interface IconButtonProps {
  className?: string;
  onClick?: () => void;
  title?: string;
  icon?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  eRef?: React.Ref<HTMLDivElement>;
}

export interface ChipProps {
  leading?: React.ReactNode;
  title: string;
  trailing?: React.ReactNode;
  className?: string;
}

export interface ItemRectangleProps {
  icon?: React.ReactNode;
  title?: string;
  onFunction?: () => void;
  onmousedown?: () => void;
  className?: string;
  babe?: boolean;
  quantity?: number;
}

export interface PriceProps {
  product_price: number | string;
  className?: string;
}

export interface TimeCountProps {
  hour?: number;
  minus?: number;
  second?: number;
}

export interface RadioScrollProps {
  percentage?: number;
  label: string;
}

export type ProductSkeletonType = { length?: number; className?: string };
