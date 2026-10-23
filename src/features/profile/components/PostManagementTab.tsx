import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostItem, PostStatus } from '@/features/profile/types';
import { mockPostManagementItems } from '@/mocks/data/profile';
import { useToast } from '@/components/feedback/Toast';
import { POST_CATEGORIES, POST_ITEMS_PER_PAGE } from '@/constants/post';
import { ROUTES } from '@/constants/routes';
import {
  PostStatusFilterTabs,
  PostSearchToolbar,
  PostItemCard,
  PostPagination,
  PostEmptyState,
} from './posts';

export interface PostManagementTabProps {
  initialPosts?: PostItem[];
  className?: string;
}

export const PostManagementTab: React.FC<PostManagementTabProps> = ({
  initialPosts = mockPostManagementItems,
  className = '',
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [activeStatus, setActiveStatus] = useState<PostStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(POST_CATEGORIES[0]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Thống kê số lượng bài theo từng trạng thái
  const counts = useMemo(() => {
    const activeCount = posts.filter((p) => p.type === 'pass' || p.type === 'gift').length;
    const completedCount = posts.filter((p) => p.type === 'completed').length;
    return {
      all: posts.length,
      active: activeCount,
      completed: completedCount,
      hidden: 0,
    };
  }, [posts]);

  // Bộ lọc danh sách bài đăng
  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      // 1. Lọc theo trạng thái tab
      if (activeStatus === 'active') {
        if (item.type !== 'pass' && item.type !== 'gift') return false;
      } else if (activeStatus === 'completed') {
        if (item.type !== 'completed') return false;
      } else if (activeStatus === 'hidden') {
        return false;
      }

      // 2. Lọc theo danh mục
      if (
        selectedCategory !== POST_CATEGORIES[0] &&
        item.category !== selectedCategory
      ) {
        return false;
      }

      // 3. Lọc theo từ khóa tìm kiếm (tên bài hoặc mã môn)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchCourse = item.courseCode
          ? item.courseCode.toLowerCase().includes(query)
          : false;
        if (!matchTitle && !matchCourse) return false;
      }

      return true;
    });
  }, [posts, activeStatus, selectedCategory, searchQuery]);

  // Phân trang
  const totalPages = Math.ceil(filteredPosts.length / POST_ITEMS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POST_ITEMS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POST_ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const startItem = filteredPosts.length === 0 ? 0 : (currentPage - 1) * POST_ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * POST_ITEMS_PER_PAGE, filteredPosts.length);

  // Thao tác đổi trạng thái bài viết
  const handleMarkAsPassed = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              type: 'completed',
              completedNote: 'Đã giao dịch thành công tại Sảnh KTX',
            }
          : p
      )
    );
    showToast({
      type: 'success',
      message: 'Chúc mừng bạn! Bài đăng đã được đánh dấu là ĐÃ PASS.',
    });
  };

  const handleMarkAsGifted = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              type: 'completed',
              completedNote: 'Đã hoàn tất tặng đồ cho bạn học tại KTX',
            }
          : p
      )
    );
    showToast({
      type: 'success',
      message: 'Tuyệt vời! Bạn vừa lan tỏa tinh thần tương thân tương ái tại KTX.',
    });
  };

  const handleRepublish = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              type: 'pass',
              createdAtText: 'Vừa đăng lại',
              completedNote: undefined,
            }
          : p
      )
    );
    showToast({
      type: 'info',
      message: 'Đã đưa bài viết trở lại danh sách tin đang pass!',
    });
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setOpenMenuId(null);
    showToast({
      type: 'info',
      message: 'Đã xóa bài đăng khỏi hệ thống.',
    });
  };

  const handleHidePost = (postId: string) => {
    setOpenMenuId(null);
    showToast({
      type: 'info',
      message: `Đã tạm ẩn bài đăng #${postId}. Bạn có thể bật lại bất kỳ lúc nào.`,
    });
  };

  const handleViewDetails = (postId: string) => {
    navigate(ROUTES.PROFILE.MY_POST_DETAIL(postId));
  };

  const handleEditPost = (postId: string) => {
    navigate(`/posts/${postId}/edit`);
  };

  return (
    <div
      className={`w-full bg-white rounded-2xl border border-[#E6DACD] p-6 sm:p-8 flex flex-col gap-6 shadow-[0px_2px_8px_rgba(45,36,30,0.05)] font-body ${className}`}
    >
      {/* A. Tiêu đề tab (Tab Header) */}
      <div>
        <h2 className="font-heading font-bold text-2xl text-[#221A14] tracking-tight">
          Quản lý bài đăng tin
        </h2>
        <p className="font-body text-sm text-[#756A63] mt-1">
          Quản lý tình trạng bài pass giáo trình và đồ dùng phòng trọ/KTX
        </p>
      </div>

      {/* B. Thanh bộ lọc trạng thái (Filter Tabs Pills Row) */}
      <PostStatusFilterTabs
        activeStatus={activeStatus}
        counts={counts}
        onStatusChange={(status) => {
          setActiveStatus(status);
          setCurrentPage(1);
        }}
      />

      {/* C. Thanh tìm kiếm & Phân loại danh mục (Search & Category Toolbar) */}
      <PostSearchToolbar
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
      />

      {/* D. Danh sách bài đăng (Post Cards Stack) */}
      <div className="flex flex-col gap-4">
        {paginatedPosts.length === 0 ? (
          <PostEmptyState />
        ) : (
          paginatedPosts.map((item) => (
            <PostItemCard
              key={item.id}
              item={item}
              isMenuOpen={openMenuId === item.id}
              onToggleMenu={() =>
                setOpenMenuId((prev) => (prev === item.id ? null : item.id))
              }
              onCloseMenu={() => setOpenMenuId(null)}
              onMarkAsPassed={handleMarkAsPassed}
              onMarkAsGifted={handleMarkAsGifted}
              onRepublish={handleRepublish}
              onDeletePost={handleDeletePost}
              onHidePost={handleHidePost}
              onViewDetails={handleViewDetails}
              onEditPost={handleEditPost}
            />
          ))
        )}
      </div>

      {/* E. Chân trang phân trang (Pagination Footer) */}
      <PostPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startItem={startItem}
        endItem={endItem}
        totalItems={filteredPosts.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PostManagementTab;
