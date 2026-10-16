export interface QuickAccessColorToken {
  bgClass: string;
  colorClass: string;
  iconBgColor?: string;
  iconColor?: string;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  bgClass?: string;
  colorClass?: string;
}

export interface QuickAccessProps {
  items?: QuickAccessItem[];
  onItemClick?: (item: QuickAccessItem) => void;
}
