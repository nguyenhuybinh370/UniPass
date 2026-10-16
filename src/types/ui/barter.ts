export interface BarterItem {
  id: string;
  title: string;
  conditionTag: string;
  neededItemDescription: string;
  sellerName: string;
  sellerSchool: string;
  sellerRating: number;
  location: string;
  imageUrl: string;
}

export interface BarterSectionProps {
  items?: BarterItem[];
  onViewRoom?: () => void;
  onSendOffer?: (item: BarterItem) => void;
}
