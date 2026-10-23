import {
  PostStatus,
  PostImageItem,
  PostSpecs,
  HandoverLocationInfo,
  PostAnalytics,
  BuyerRequest,
} from './index';

export interface OwnerActionToolbarProps {
  code: string;
  status: PostStatus;
  statusBadgeText: string;
  postedTimeText: string;
  verifiedByText: string;
  onMarkCompleted: () => void;
  isCompleting?: boolean;
  onToggleHide: () => void;
  isHiding?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  className?: string;
}

export interface PostImageGalleryProps {
  images: PostImageItem[];
  conditionPercent: number;
  curriculumBadgeText: string;
  className?: string;
}

export interface PostSubjectInfoProps {
  courseCode: string;
  university: string;
  semesterAndBatch: string;
  title: string;
  price: number;
  originalPrice?: number;
  savingsPercent?: number;
  paymentMethodsText: string;
  specs: PostSpecs;
  description: string;
  className?: string;
}

export interface PostHandoverLocationProps {
  handover: HandoverLocationInfo;
  className?: string;
}

export interface PostAnalyticsWidgetProps {
  analytics: PostAnalytics;
  className?: string;
}

export interface BuyerRequestItemProps {
  request: BuyerRequest;
  onChat: (requestId: string, buyerName: string) => void;
  onConfirmHandover?: (requestId: string) => void;
  className?: string;
}

export interface BuyerRequestQueueProps {
  requests: BuyerRequest[];
  totalConversationsCount: number;
  onChat: (requestId: string, buyerName: string) => void;
  onConfirmHandover: (requestId: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
}

export interface QuickHandoverQrCardProps {
  postCode: string;
  qrHandoverCode: string;
  className?: string;
}
