export type MenuItem = {
  path: string;
  icon: React.ReactNode;
  title: string;
};

export type CategoryConfig = {
  title: string;
  url: string;
};

export type RouteConfig = {
  path: string;
  component: React.ComponentType;
  title: string;
  isSidebar: boolean;
  isHeader: boolean;
  isFooter: boolean;
  isPrivate: boolean;
  padding: string;
};

export type LayoutContainerProps = {
  component: React.ElementType;
  title: string;
  isHeader?: boolean;
  isFooter?: boolean;
  isSidebar?: boolean;
  isPrivate?: boolean;
  padding?: string;
};

export type Props = {
  params: {
    product_id: string;
    order_id: string;
  };
};

export type IconProps = {
  className?: string;
  fill?: string;
};

export type OrderTabItem = {
  title: string;
  status: string;
};
