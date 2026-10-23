import { BaseEntity } from '@/types/common';
import { AuthUser } from '@/types/auth';

export type PostType = 'GIVE_AWAY' | 'EXCHANGE' | 'SELL';
export type PostStatus = 'AVAILABLE' | 'NEGOTIATING' | 'COMPLETED' | 'HIDDEN' | 'PENDING_APPROVAL';
export type ItemCondition = 'NEW' | 'LIKE_NEW_99' | 'GOOD_90' | 'FAIR_80' | 'OLD';

export interface PostCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface PostImageItem {
  id: string;
  url: string;
  label: string; // e.g., "Bìa ngoài", "Mục lục", "Gáy sách", "Note bút chì"
  caption?: string;
}

export interface PostSpecs {
  facultyDept: string;
  compatibleMaterials: string;
  programmingLanguage: string;
  paperCondition: string;
}

export type BuyerRequestStatus = 'SCHEDULED' | 'PENDING' | 'REPLIED' | 'COMPLETED';

export interface BuyerRequest {
  id: string;
  buyerName: string;
  buyerFaculty: string;
  buyerUniversity: string;
  buyerClassOrYear?: string;
  avatarUrl?: string;
  avatarInitial: string;
  reputationScore: number;
  isVerifiedStudent: boolean;
  message: string;
  sentTimeText: string;
  appointmentTime?: string; // e.g. "ĐÃ HẸN 17:30"
  status: BuyerRequestStatus;
}

export interface PostAnalytics {
  viewsCount: number;
  chatPeopleCount: number;
  savedCount: number;
  responseRatePercent: number;
  responseTimeText: string;
  trendPercent: number;
  isTrendingGood: boolean;
}

export interface HandoverLocationInfo {
  buildingName: string;
  address: string;
  note: string;
  mapUrl?: string;
  preferredTime: string;
  safeCommitmentText: string;
  isFreeDelivery: boolean;
}

export interface MyPostDetailData {
  id: string;
  code: string; // e.g., "#SVP-1082"
  title: string;
  status: PostStatus;
  statusBadgeText: string;
  postedTimeText: string;
  verifiedByText: string;
  price: number;
  originalPrice?: number;
  savingsPercent?: number;
  paymentMethodsText: string;
  courseCode: string;
  university: string;
  semesterAndBatch: string;
  conditionPercent: number;
  curriculumBadgeText: string;
  description: string;
  specs: PostSpecs;
  images: PostImageItem[];
  handover: HandoverLocationInfo;
  analytics: PostAnalytics;
  buyerRequests: BuyerRequest[];
  totalConversationsCount: number;
  qrHandoverCode: string;
}

export interface Post extends BaseEntity {
  title: string;
  description: string;
  type: PostType;
  status: PostStatus;
  price: number;
  targetExchangeItem?: string;
  condition: ItemCondition;
  conditionPercent: number;
  images: string[];
  courseCode?: string;
  university: string;
  faculty?: string;
  category: PostCategory;
  author: AuthUser;
  viewCount: number;
  likesCount: number;
}

export interface PostFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: PostType;
  categoryId?: string;
  university?: string;
  faculty?: string;
  courseCode?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: ItemCondition;
  sortBy?: 'createdAt_desc' | 'price_asc' | 'price_desc' | 'views_desc';
}

export interface CreatePostDTO {
  title: string;
  description: string;
  type: PostType;
  price?: number;
  targetExchangeItem?: string;
  condition: ItemCondition;
  conditionPercent: number;
  images: string[];
  categoryId: string;
  university: string;
  faculty?: string;
  courseCode?: string;
}

export type UpdatePostDTO = Partial<CreatePostDTO> & {
  status?: PostStatus;
};

export * from './manageComponents';
