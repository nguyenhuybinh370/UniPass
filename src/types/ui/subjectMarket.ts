import { ProductItem } from './freeCorner';

export interface SubjectFilterTab {
  id: string;
  label: string;
}

export interface SubjectMarketSectionProps {
  items?: ProductItem[];
  tabs?: SubjectFilterTab[];
  onSelectProduct?: (product: ProductItem) => void;
  onLoadMore?: () => void;
}
