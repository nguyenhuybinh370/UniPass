export interface ProductSeller {
  name: string;
  school: string;
  rating: number;
}

export interface ProductItem {
  id: string;
  title: string;
  subjectCode?: string;
  price: number;
  originalPrice?: number;
  conditionTag: string;
  location: string;
  category: string;
  imageUrl: string;
  seller: ProductSeller;
}

export interface FreeCornerSectionProps {
  items?: ProductItem[];
  onViewAll?: () => void;
  onClaimItem?: (item: ProductItem) => void;
}
