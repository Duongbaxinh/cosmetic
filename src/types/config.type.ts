export type MenuItem = {
  path: string;
  icon: React.ReactNode;
  title: string;
};

export type CategoryConfig = {
  title: string;
  slug: string;
  url: string;
  id: number | string;
  images?: string[];
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

export type TypeEdit = {
  phone: React.ReactNode;
  password: React.ReactNode;
};

export type Props = {
  params: Promise<{
    product_id: string;
    order_id: string;
    category_key: string;
    text_search: string;
    promotion: string;
    type_edit: keyof TypeEdit;
    product_slug: string;
    value: string;
    token: string;
  }>;
  searchParams: Promise<{
    token: string;
    promotionId: string;
  }>;
};

export type IconProps = {
  className?: string;
  fill?: string;
};

export type OrderTabItem = {
  title: string;
  status: string;
};
