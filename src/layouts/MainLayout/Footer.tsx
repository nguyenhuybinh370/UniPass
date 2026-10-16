import React from 'react';
import {
  Sprout,
  ExternalLink,
  ShieldAlert,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { FooterProps } from '@/types/ui/footer';

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full bg-surface-card border-t border-border-card pt-12 pb-8 mt-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* 4 Cột thông tin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1 (HỖ TRỢ SINH VIÊN) */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-text-primary mb-4">
              Hỗ trợ sinh viên
            </h3>
            <ul className="space-y-2.5 text-xs text-text-muted">
              <li>
                <a href="#guide" className="hover:text-brand-primary transition-colors">
                  Hướng dẫn đổi đồ &amp; nhận 0đ
                </a>
              </li>
              <li>
                <a href="#pricing-tips" className="hover:text-brand-primary transition-colors">
                  Mẹo định giá sách cũ
                </a>
              </li>
              <li>
                <a href="#safety-rules" className="hover:text-brand-primary transition-colors">
                  Quy tắc hẹn gặp an toàn KTX
                </a>
              </li>
              <li>
                <a
                  href="#report"
                  className="inline-flex items-center gap-1.5 text-semantic-danger hover:underline font-medium"
                >
                  <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Link báo cáo lừa đảo / bom hàng</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 2 (VỀ DỰ ÁN) */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-text-primary mb-4">
              Về dự án
            </h3>
            <ul className="space-y-2.5 text-xs text-text-muted">
              <li>
                <a href="#about-unipass" className="hover:text-brand-primary transition-colors font-medium">
                  UniPass - Pass đồ sinh viên
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-secondary-500 font-medium">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Dự án Xanh vì Sinh Viên</span>
                </span>
              </li>
              <li>
                <a href="#terms" className="hover:text-brand-primary transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-brand-primary transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3 (CỘNG ĐỒNG) */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-text-primary mb-4">
              Cộng đồng ĐHQG
            </h3>
            <ul className="space-y-2.5 text-xs text-text-muted">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors"
                >
                  <span>Group KTX Khu A (Pass đồ)</span>
                  <ExternalLink className="w-3 h-3 text-border-subtle" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors"
                >
                  <span>Group KTX Khu B (Trao đổi)</span>
                  <ExternalLink className="w-3 h-3 text-border-subtle" />
                </a>
              </li>
              <li>
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span>Kênh Zalo hỗ trợ nhanh</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4 (LIÊN HỆ & ĐỊA ĐIỂM) */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-text-primary mb-4">
              Khuôn viên hoạt động
            </h3>
            <div className="space-y-2.5 text-xs text-text-muted">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-primary flex-shrink-0 mt-0.5" />
                <span>Khu đô thị Đại học Quốc gia TP.HCM (Dĩ An, Bình Dương / Thủ Đức)</span>
              </p>
              <p className="text-[11px] text-text-disabled">
                Dành riêng cho sinh viên các trường đại học thành viên và đối tác liên kết.
              </p>
            </div>
          </div>
        </div>

        {/* Thanh bản quyền dưới đáy */}
        <div className="border-t border-border-divider mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11.5px] text-text-disabled gap-3">
          <p>© {new Date().getFullYear()} UniPass — Nền tảng Trao đổi, Pass đồ &amp; Tặng đồ dùng Sinh viên.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-secondary-500 font-medium">
              <Sprout className="w-3.5 h-3.5" />
              <span>Tiết kiệm sinh viên • Bảo vệ môi trường</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
