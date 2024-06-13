export interface IBreadcrumbsProps {
  items: TBreadcrumbsItem[]
}

export type TBreadcrumbsItem = {
  title: string;
  link?: string;
}