import React from 'react';
import { Code, QrCode, Banknote } from 'lucide-react';
import { PostSubjectInfoProps } from '../../types';

export const PostSubjectInfo: React.FC<PostSubjectInfoProps> = ({
  courseCode,
  university,
  semesterAndBatch,
  title,
  price,
  originalPrice,
  savingsPercent,
  paymentMethodsText,
  specs,
  description,
  className = '',
}) => {
  return (
    <div
      className={`w-full bg-white rounded-2xl border border-[#E6DACD] p-5 sm:p-6 flex flex-col gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
    >
      {/* 1. Hàng thẻ phân loại (Subject badges) */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Badge Mã môn */}
        <span className="bg-[#FFF1E9] text-[#D35400] font-bold px-2.5 py-1 rounded-md border border-[#F6D2BD] flex items-center gap-1.5 shadow-2xs">
          <Code className="w-3.5 h-3.5 text-[#D35400]" />
          <span>Mã môn: {courseCode}</span>
        </span>

        {/* Badge Trường đại học */}
        <span className="bg-[#FAF6F0] text-[#756A63] font-medium px-2.5 py-1 rounded-md border border-[#E6DACD]">
          {university}
        </span>

        {/* Badge Học kỳ / Khóa */}
        <span className="bg-[#FAF6F0] text-[#756A63] font-medium px-2.5 py-1 rounded-md border border-[#E6DACD]">
          {semesterAndBatch}
        </span>
      </div>

      {/* 2. Tiêu đề bài đăng */}
      <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#221A14] leading-snug tracking-tight">
        {title}
      </h2>

      {/* 3. Khối giá tiền & phương thức thanh toán */}
      <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#FFF8F3] border border-[#F6D2BD]/60">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#9E3D00]">
            {price.toLocaleString('vi-VN')} VNĐ
          </span>

          {originalPrice && (
            <span className="text-sm sm:text-base text-[#9E928A] line-through font-normal">
              {originalPrice.toLocaleString('vi-VN')} VNĐ
            </span>
          )}

          {savingsPercent && (
            <span className="bg-[#E8F5E9] text-[#006D3B] font-bold text-xs px-2.5 py-0.5 rounded-full border border-[#A3E9B8]">
              -{savingsPercent}% Tiết kiệm
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#756A63]">
          <Banknote className="w-4 h-4 text-[#006D3B]" />
          <QrCode className="w-4 h-4 text-[#D35400]" />
          <span>{paymentMethodsText}</span>
        </div>
      </div>

      {/* 4. Bảng thông số giáo trình 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-[#EBE3D8] bg-[#FAF8F5]/70">
        <div>
          <span className="text-[11px] font-bold text-[#756A63] uppercase tracking-wider block">
            BỘ MÔN PHỤ TRÁCH
          </span>
          <p className="font-medium text-sm text-[#221A14] mt-0.5">
            {specs.facultyDept}
          </p>
        </div>

        <div>
          <span className="text-[11px] font-bold text-[#756A63] uppercase tracking-wider block">
            TÀI LIỆU TƯƠNG THÍCH
          </span>
          <p className="font-medium text-sm text-[#221A14] mt-0.5">
            {specs.compatibleMaterials}
          </p>
        </div>

        <div>
          <span className="text-[11px] font-bold text-[#756A63] uppercase tracking-wider block">
            NGÔN NGỮ MINH HỌA
          </span>
          <p className="font-medium text-sm text-[#221A14] mt-0.5">
            {specs.programmingLanguage}
          </p>
        </div>

        <div>
          <span className="text-[11px] font-bold text-[#756A63] uppercase tracking-wider block">
            TÌNH TRẠNG GIẤY
          </span>
          <p className="font-medium text-sm text-[#221A14] mt-0.5">
            {specs.paperCondition}
          </p>
        </div>
      </div>

      {/* 5. Mô tả chi tiết từ chủ bài đăng */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#756A63] font-heading">
          MÔ TẢ CHI TIẾT TỪ CHỦ BÀI ĐĂNG
        </h3>
        <p className="text-sm text-[#221A14] leading-relaxed font-body">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PostSubjectInfo;
