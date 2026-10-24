---
name: ui-ux-design
description: "Kỹ năng thiết kế giao diện UI/UX Warm & Community-Driven cho UniPass: Terracotta #D35400, kem ấm #FAF6F0, bo góc mềm, micro-interactions và Atomic UI."
---

# Kỹ Năng Thiết Kế UI/UX UniPass (ui-ux-design)

Kỹ năng này hướng dẫn áp dụng Design System "Warm & Community-Driven" vào toàn bộ giao diện UniPass, tạo cảm giác mộc mạc, gần gũi, ấm áp và an toàn cho cộng đồng sinh viên các trường đại học.

## Khi Nào Kích Hoạt (When to Activate)
- Tạo mới hoặc cập nhật Atomic UI components (`src/components/ui/`, `src/components/feedback/`, `src/components/form/`).
- Tạo thẻ bài đăng (PostCard), thẻ đề xuất (OfferCard), modal, banner hoặc trang màn hình.
- Tinh chỉnh màu sắc, khoảng cách (spacing), typography hoặc micro-interactions với Tailwind CSS.

## Các Quy Chuẩn Thiết Kế Cốt Lõi
1. **Bảng màu chủ đạo:**
   - **Brand Primary:** `#D35400` (Terracotta / Cam gạch ấm) cho các nút hành động chính.
   - **Secondary / Eco:** `#1E824C` (Xanh lá sinh thái) cho nhãn "Đổi đồ", "Tặng 0đ".
   - **Background Canvas:** `#FAF6F0` (Nền kem ấm, dịu mắt khi dùng ban đêm ở KTX).
   - **Text Primary:** `#2D241E` (Nâu đất ấm thay cho màu đen gắt).
2. **Hình khối & Bo góc (Soft Geometry):**
   - Sử dụng bo góc `rounded-xl` (12px), `rounded-2xl` (16px) và `rounded-full` (pill radius). Tuyệt đối tránh góc nhọn cơ học.
3. **Chuyển động (Micro-interactions):**
   - Nút bấm và thẻ: `transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-98`.
4. **Phân biệt Atomic UI vs Feature Components:**
   - `src/components/ui/`: Chỉ chứa các hạt UI nhỏ phi nghiệp vụ (`Button`, `Input`, `Badge`, `Modal`, `Skeleton`).
   - Cấm đặt các section lớn hoặc logic nghiệp vụ vào `src/components/ui/`.

## Tài Liệu Tham Khảo (References)
- [Quy chuẩn UI/UX Guidelines](references/ui_ux_guidelines.md)
- [Hệ thống thiết kế System Design](references/system_design.md)
