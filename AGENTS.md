# UNIPASS FRONTEND — AGENT INSTRUCTION & WORKSPACE RULES

> **Mục tiêu:** Định hướng cho mọi AI Assistant (Antigravity, Cursor, Windsurf, Copilot...) khi làm việc trong repository **UniPass**.
> **Quy định bắt buộc:** Mọi thay đổi mã nguồn PHẢI tuân thủ 100% các tài liệu đặc tả kỹ thuật trong thư mục `Agent_Doc/`.

---

## 📚 TÀI LIỆU QUY CHUẨN (SPECIFICATIONS)

Mọi quyết định thiết kế kiến trúc, đặt tên file, chia tách thư mục, quản lý state và tích hợp API đều phải căn cứ theo các file sau:

1. **Quy tắc hệ thống & Kỷ luật lập trình:**
   - [Agent_Doc/AGENT_RULES.md](file:///d:/Đồ Án 1/UniPass/Agent_Doc/AGENT_RULES.md)
   - Cấm `any`, cấm lưu Server State trong `useState`, cấm hardcode hằng số.

2. **Cấu trúc thư mục chi tiết:**
   - [Agent_Doc/FOLDER_STRUCTURE.md](file:///d:/Đồ Án 1/UniPass/Agent_Doc/FOLDER_STRUCTURE.md)
   - Quy định rõ ràng vai trò của `src/pages/`, `src/features/`, `src/components/ui/`, `src/layouts/`, `src/routes/`, `src/context/`.

3. **Kiến trúc tổng thể hệ thống:**
   - [Agent_Doc/ARCHITECTURE.md](file:///d:/Đồ Án 1/UniPass/Agent_Doc/ARCHITECTURE.md)
   - Kiến trúc phân tầng 5 lớp, cây tuyến đường (Route Tree) và luồng phân quyền RBAC.

4. **Quy chuẩn API & Data Fetching:**
   - [Agent_Doc/API_CONVENTIONS.md](file:///d:/Đồ Án 1/UniPass/Agent_Doc/API_CONVENTIONS.md)
   - TanStack Query v5, Query Key Factory Pattern, Axios Interceptors, Mock Service.

5. **Quy chuẩn viết Code:**
   - [Agent_Doc/CODE_CONVENTIONS.md](file:///d:/Đồ Án 1/UniPass/Agent_Doc/CODE_CONVENTIONS.md)
   - Naming conventions, thứ tự import, thứ tự khai báo trong Component.

---

## ⚠️ NGUYÊN TẮC BẤT DI BẤT DỊCH CHO AI AGENT

1. **Phân biệt `src/pages/` và `src/features/`:**
   - `src/features/<feature>/`: Nơi lưu trữ **nghiệp vụ** (API, Custom Query Hooks, Types, Feature Components).
   - `src/pages/<PageName>/`: Nơi **lắp ráp mỏng (Thin Page Assembler)** tương ứng 1:1 với URL Route. Chỉ nhận params, gọi custom hook và ghép các component lại.
2. **`src/components/ui/` chỉ chứa Atomic UI:**
   - Chỉ chứa các UI nguyên tử nhỏ, phi nghiệp vụ: `Button`, `Input`, `Badge`, `Modal`, `Skeleton`, `Spinner`, `Select`, `Dropdown`.
   - **TUYỆT ĐỐI KHÔNG** đặt các Section lớn hoặc trang màn hình vào `src/components/ui/`.
3. **`src/layouts/` chứa bộ khung giao diện:**
   - `MainLayout`: Navbar/Header, `<Outlet />`, Footer.
   - `AuthLayout`: Layout chia cột cho đăng nhập/đăng ký.
   - `AdminLayout`: Layout cho trang quản trị.
4. **App.tsx chỉ là Root Provider:**
   - `App.tsx` chỉ bọc `QueryClientProvider`, `BrowserRouter`, `AuthProvider`, `ToastProvider` và render `<AppRoutes />`. Tuyệt đối không nhồi nhét giao diện hay `useState` cục bộ vào `App.tsx`.
5. **Phong cách Centralized Types (Đặc tả kiểu tập trung — Chuẩn UniPass):**
   - **TUYỆT ĐỐI CẤM:** Không khai báo `interface` hoặc `type` (kể cả Component Props `[ComponentName]Props`) trực tiếp bên trong các file giao diện (`.tsx`).
   - **BẮT BUỘC:** 100% Component Props, Data Models, DTOs, Payload phải được định nghĩa tập trung trong thư mục `types/`:
     - **UI Dùng chung (`src/components/ui/`, `src/components/feedback/`, `src/components/form/`):** Khai báo Props trong `src/types/` (VD: `src/types/feedback.ts`, `src/types/ui/`, `src/types/form.ts`...) và re-export tại `src/types/index.ts`. Trong file component `.tsx` chỉ nhận kiểu qua `import { [ComponentName]Props } from '@/types';`.
     - **Feature Components (`src/features/<feature>/components/`):** Khai báo Props trong `src/features/<feature>/types/` (VD: `src/features/posts/types/manageComponents.ts`, `src/features/offers/types/offerComponents.ts`...) và re-export tại `src/features/<feature>/types/index.ts`. Trong file component `.tsx` chỉ nhận kiểu qua `import { [ComponentName]Props } from '../../types';`.
