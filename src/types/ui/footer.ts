export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
  isDanger?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  columns?: FooterColumn[];
}
