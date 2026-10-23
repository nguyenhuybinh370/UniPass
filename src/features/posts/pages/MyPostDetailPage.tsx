import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { Skeleton } from '@/components/ui/Skeleton';
import { ConfirmDialog, EmptyState } from '@/components/feedback';
import { useToast } from '@/components/feedback/Toast';
import {
  usePostManageDetail,
  useUpdatePostStatus,
  useDeletePost,
} from '../hooks';
import {
  OwnerActionToolbar,
  PostImageGallery,
  PostSubjectInfo,
  PostHandoverLocation,
  PostAnalyticsWidget,
  BuyerRequestQueue,
  QuickHandoverQrCard,
} from '../components/manage';

export const MyPostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // TanStack Query Hooks
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = usePostManageDetail(id);

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdatePostStatus();
  const { mutate: deletePost, isPending: isDeletingPost } = useDeletePost();

  const post = response?.data;

  // 1. Loading Skeleton Guard Clause
  if (isLoading) {
    return (
      <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-6 pb-12 font-body">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20 rounded" />
          <span className="text-[#9E928A]">&gt;</span>
          <Skeleton className="h-4 w-32 rounded" />
          <span className="text-[#9E928A]">&gt;</span>
          <Skeleton className="h-4 w-40 rounded" />
        </div>

        {/* Action Toolbar Skeleton */}
        <Skeleton className="h-28 w-full rounded-2xl" />

        {/* 12-Column Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cột trái 7 cột */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Skeleton className="h-[420px] w-full rounded-2xl" />
            <Skeleton className="h-[320px] w-full rounded-2xl" />
            <Skeleton className="h-[220px] w-full rounded-2xl" />
          </div>

          {/* Cột phải 5 cột */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Skeleton className="h-[200px] w-full rounded-2xl" />
            <Skeleton className="h-[360px] w-full rounded-2xl" />
            <Skeleton className="h-[120px] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Error / Empty Guard Clause
  if (isError || !post) {
    return (
      <div className="w-full max-w-lg mx-auto py-12 font-body">
        <EmptyState
          title="Không tìm thấy bài đăng"
          description="Bài đăng này không tồn tại hoặc bạn không có quyền xem thông tin quản lý."
          actionText="Quay lại danh sách bài đăng"
          onAction={() => navigate('/profile/me?tab=posts')}
        />
      </div>
    );
  }

  // Handlers nghiệp vụ
  const handleMarkCompleted = () => {
    const nextStatus = post.status === 'COMPLETED' ? 'AVAILABLE' : 'COMPLETED';
    updateStatus({ id: post.id, status: nextStatus });
  };

  const handleToggleHide = () => {
    const nextStatus = post.status === 'HIDDEN' ? 'AVAILABLE' : 'HIDDEN';
    updateStatus({ id: post.id, status: nextStatus });
  };

  const handleEdit = () => {
    navigate(`/posts/${post.id}/edit`);
  };

  const handleDeleteConfirm = () => {
    deletePost(post.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        navigate('/profile/me?tab=posts');
      },
    });
  };

  const handleChat = (_requestId: string, buyerName: string) => {
    showToast({
      type: 'info',
      message: `Đang kết nối hội thoại với bạn ${buyerName}...`,
    });
    navigate('/chat');
  };

  const handleConfirmHandover = (requestId: string) => {
    updateStatus(
      { id: post.id, status: 'COMPLETED' },
      {
        onSuccess: () => {
          showToast({
            type: 'success',
            message: `Xác nhận bàn giao thành công cho yêu cầu #${requestId}! +10 Điểm uy tín đã được cộng vào tài khoản.`,
          });
        },
      }
    );
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-6 pb-12 font-body">
      {/* A. Thanh điều hướng Breadcrumb & Nút quay lại */}
        <div className="w-full flex items-center justify-between gap-4 flex-wrap">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-[13px] text-[#756A63] font-body"
          >
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-1.5 hover:text-[#221A14] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </Link>
            <span className="text-[#9E928A] select-none">&gt;</span>
            <Link
              to="/profile/me?tab=overview"
              className="hover:text-[#221A14] transition-colors"
            >
              Tài khoản sinh viên
            </Link>
            <span className="text-[#9E928A] select-none">&gt;</span>
            <Link
              to="/profile/me?tab=posts"
              className="hover:text-[#221A14] transition-colors"
            >
              Quản lý bài đăng
            </Link>
            <span className="text-[#9E928A] select-none">&gt;</span>
            <span className="font-semibold text-[#221A14]">
              Chi tiết bài đăng {post.code}
            </span>
          </nav>

          <button
            type="button"
            onClick={() => navigate('/profile/me?tab=posts')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#756A63] hover:text-[#D35400] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Quay lại danh sách bài đăng</span>
          </button>
        </div>

        {/* B. Thanh điều khiển của chủ tin (Owner Action Toolbar) */}
        <OwnerActionToolbar
          code={post.code}
          status={post.status}
          statusBadgeText={post.statusBadgeText}
          postedTimeText={post.postedTimeText}
          verifiedByText={post.verifiedByText}
          onMarkCompleted={handleMarkCompleted}
          isCompleting={isUpdatingStatus}
          onToggleHide={handleToggleHide}
          isHiding={isUpdatingStatus}
          onEdit={handleEdit}
          onDelete={() => setIsDeleteDialogOpen(true)}
          isDeleting={isDeletingPost}
        />

        {/* C. Lưới bố cục chính 12 Cột (Main 12-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CỘT TRÁI (7 CỘT): Gallery ảnh, Thông tin môn học & Địa điểm bàn giao */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            {/* 1. Gallery ảnh chụp thực tế */}
            <PostImageGallery
              images={post.images}
              conditionPercent={post.conditionPercent}
              curriculumBadgeText={post.curriculumBadgeText}
            />

            {/* 2. Thông tin môn học, giá và mô tả */}
            <PostSubjectInfo
              courseCode={post.courseCode}
              university={post.university}
              semesterAndBatch={post.semesterAndBatch}
              title={post.title}
              price={post.price}
              originalPrice={post.originalPrice}
              savingsPercent={post.savingsPercent}
              paymentMethodsText={post.paymentMethodsText}
              specs={post.specs}
              description={post.description}
            />

            {/* 3. Địa điểm & cách thức bàn giao KTX */}
            <PostHandoverLocation handover={post.handover} />
          </div>

          {/* CỘT PHẢI (5 CỘT): Chỉ số tương tác, Hàng đợi bạn học & Mã QR xác nhận */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* 1. Widget thống kê chỉ số tương tác */}
            <PostAnalyticsWidget analytics={post.analytics} />

            {/* 2. Hàng đợi bạn học quan tâm */}
            <BuyerRequestQueue
              requests={post.buyerRequests}
              totalConversationsCount={post.totalConversationsCount}
              onChat={handleChat}
              onConfirmHandover={handleConfirmHandover}
              onRefresh={() => refetch()}
            />

            {/* 3. Khung mã QR xác nhận bàn giao tại KTX */}
            <QuickHandoverQrCard
              postCode={post.code}
              qrHandoverCode={post.qrHandoverCode}
            />
          </div>
        </div>

      {/* Hộp thoại xác nhận xóa bài */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Xóa bài đăng này?"
        message={`Bạn có chắc chắn muốn xóa bài đăng ${post.code} ("${post.title}")? Hành động này sẽ gỡ bài viết khỏi hệ thống và không thể hoàn tác.`}
        confirmText="Xác nhận xóa"
        cancelText="Giữ lại tin"
        variant="danger"
        isLoading={isDeletingPost}
        onConfirm={handleDeleteConfirm}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default MyPostDetailPage;
