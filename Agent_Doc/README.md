# UNIPASS FRONTEND — BỘ TÀI LIỆU AGENT DOCS & QUY CHUẨN PHÁT TRIỂN

Chào mừng bạn đến với bộ tài liệu quy chuẩn kỹ thuật cho dự án **UniPass** (Hệ thống trao đổi, pass đồ và tặng đồ dùng sinh viên).

Bộ tài liệu này được thiết kế chuyên biệt để:
1. Giúp lập trình viên và **AI Agent** nắm vững toàn bộ kiến trúc, quy tắc gọi API, quản lý State và phong cách viết code.
2. Cho phép bạn **dễ dàng triển khai toàn bộ dự án thông qua Prompt** từng bước mà không lo bị lệch cấu trúc hay phát sinh lỗi kỹ thuật.

---

## 📂 DANH MỤC TÀI LIỆU

| Tài liệu | Mô tả chi tiết |
| :--- | :--- |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | **Đặc tả kiến trúc hệ thống:** Phân tầng 5 lớp (Presentation, State, Logic, Data Access, External), phân quyền RBAC (GUEST/MEMBER/ADMIN), luồng nghiệp vụ gạ đổi đồ ngang (Barter Pipeline), quy trình mở rộng feature mới. |
| **[FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)** | **Cấu trúc thư mục chi tiết:** Cây thư mục toàn diện, vai trò và trách nhiệm của từng thư mục/tệp tin, phân vùng Feature-Sliced, Path Alias `@/*`. |
| **[UI_UX_GUIDELINES.md](./UI_UX_GUIDELINES.md)** | **Quy chuẩn thiết kế UI/UX (Design System):** Triết lý Warm & Community-Driven, bảng màu Terracotta `#D35400`, nền kem ấm `#FAF6F0`, Typography Be Vietnam Pro & Plus Jakarta Sans, Warm Shadows, thiết kế thẻ bài đăng & Tailwind config. |
| **[CODE_CONVENTIONS.md](./CODE_CONVENTIONS.md)** | **Quy chuẩn viết code (Coding Standards):** Naming conventions, thứ tự import, TypeScript strict, cấu trúc component chuẩn, quy tắc Tailwind CSS và bảng màu UniPass. |
| **[API_CONVENTIONS.md](./API_CONVENTIONS.md)** | **Tài liệu cốt lõi API:** Chuẩn hóa toàn bộ tầng tích hợp API, Axios Client, Endpoints, TanStack Query Hooks, Query Key Factory, TypeScript DTOs, Mock Service và quy tắc xử lý lỗi. |
| **[PROMPT_GUIDE.md](./PROMPT_GUIDE.md)** | **Bộ Prompt mẫu theo từng giai đoạn:** Hướng dẫn chi tiết từng câu lệnh prompt mẫu từ Phase 1 (Khởi tạo) đến Phase 4 (Mock Data) để copy-paste trực tiếp cho AI Agent. |
| **[AGENT_RULES.md](./AGENT_RULES.md)** | **Quy tắc hệ thống (Agent Rules):** Các điều luật bắt buộc (Strict Laws), checklist kiểm tra code và vai trò Lead Frontend của AI Agent. |

---

## 🚀 HƯỚNG DẪN SỬ DỤNG KHI LẬP TRÌNH BẰNG PROMPT

1. **Khi bắt đầu phiên làm việc mới với AI Agent:**
   - Đính kèm file `API_CONVENTIONS.md` và `AGENT_RULES.md` vào ngữ cảnh (context) hoặc gõ:
     > *"Hãy đọc kỹ file `API_CONVENTIONS.md` và tuân thủ các quy tắc trong `AGENT_RULES.md` để triển khai code cho dự án UniPass."*

2. **Khi triển khai tính năng:**
   - Mở file `PROMPT_GUIDE.md`, tìm đến Module bạn muốn làm (VD: *Prompt 3.2: Module Quản lý bài đăng* hoặc *Prompt 3.3: Module Gạ đổi đồ ngang*).
   - Copy prompt đó và gửi cho AI Agent.

3. **Kiểm tra kết quả:**
   - Đối chiếu sản phẩm AI sinh ra với Checklist trong `AGENT_RULES.md` (Không dùng `any`, có Loading/Empty/Error state, TanStack Query đúng chuẩn).
