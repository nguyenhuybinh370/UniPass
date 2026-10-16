import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeroBanner,
  QuickAccess,
  FreeCornerSection,
  BarterSection,
  SubjectMarketSection,
} from './components';
import { ProductItem, BarterItem, QuickAccessItem } from '@/types';
import { useToast } from '@/components/feedback/Toast';
import { ROUTES } from '@/constants/routes';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSearchCourseCode = () => {
    showToast('🔍 Đang lọc theo danh mục Mã Môn Học!');
  };

  const handleExploreFreeCorner = () => {
    const el = document.getElementById('free-corner-title');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickAccessClick = (item: QuickAccessItem) => {
    showToast(`⚡ Bạn đã chọn: ${item.title} — ${item.subtitle}`);
  };

  const handleClaimFreeItem = (item: ProductItem) => {
    showToast({
      type: 'success',
      message: `🎁 Đã gửi yêu cầu nhận: "${item.title}" tới bạn ${item.seller.name}!`,
    });
  };

  const handleSendBarterOffer = (item: BarterItem) => {
    showToast({
      type: 'info',
      message: `🔄 Đang chuẩn bị đề xuất đổi món: "${item.title}"!`,
    });
  };

  const handleSelectProduct = (product: ProductItem) => {
    showToast(`📖 Xem chi tiết sản phẩm: "${product.title}" (${product.location})`);
    navigate(ROUTES.POSTS.DETAIL(product.id));
  };

  const handleLoadMore = () => {
    showToast('📦 Đang tải thêm danh sách giáo trình và đồ dùng học tập...');
  };

  return (
    <div className="flex flex-col gap-10">
      {/* 1. HeroBanner */}
      <HeroBanner
        onSearchCourseCode={handleSearchCourseCode}
        onExploreFreeCorner={handleExploreFreeCorner}
      />

      {/* 2. QuickAccess */}
      <QuickAccess onItemClick={handleQuickAccessClick} />

      {/* 3. Góc Trao Tặng 0đ */}
      <FreeCornerSection
        onViewAll={() => showToast('🎁 Mở toàn bộ danh sách đồ tặng 0đ!')}
        onClaimItem={handleClaimFreeItem}
      />

      {/* 4. Đề Xuất Trao Đổi Ngang */}
      <BarterSection
        onViewRoom={() => showToast('🔄 Chuyển sang Phòng trao đổi ngang sinh viên!')}
        onSendOffer={handleSendBarterOffer}
      />

      {/* 5. Thanh Lý Theo Mã Học Phần */}
      <SubjectMarketSection
        onSelectProduct={handleSelectProduct}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default HomePage;
