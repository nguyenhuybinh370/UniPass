# UNIPASS FRONTEND — AGENT INSTRUCTION & WORKSPACE RULES

> **Mục tiêu:** Định hướng cho mọi AI Assistant (Antigravity, Cursor, Windsurf, Copilot...) khi làm việc trong repository **UniPass**.  
> **Quy định bắt buộc:** Mọi thay đổi mã nguồn PHẢI tuân thủ 100% các tài liệu đặc tả kỹ thuật trong thư mục `.agent/rules/` và các kỹ năng trong `.agent/skills/`.

---

## 📚 TÀI LIỆU QUY CHUẨN (SPECIFICATIONS)

Mọi quyết định thiết kế kiến trúc, đặt tên file, chia tách thư mục, quản lý state và tích hợp API đều phải căn cứ theo các file sau:

1. **Quy tắc hệ thống & Kỷ luật lập trình:**
   - [.agent/rules/AGENT_RULES.md](file:///d:/Đồ Án 1/UniPass/.agent/rules/AGENT_RULES.md)
   - 7 điều luật bắt buộc: Cấm `any`, cấm lưu Server State trong `useState`, cấm hardcode hằng số.

2. **Cấu trúc thư mục chi tiết:**
   - [.agent/rules/FOLDER_STRUCTURE.md](file:///d:/Đồ Án 1/UniPass/.agent/rules/FOLDER_STRUCTURE.md)
   - Quy định rõ ràng vai trò của `src/pages/`, `src/features/`, `src/components/ui/`, `src/layouts/`, `src/routes/`, `src/context/`.

3. **Kiến trúc tổng thể hệ thống:**
   - [.agent/rules/ARCHITECTURE.md](file:///d:/Đồ Án 1/UniPass/.agent/rules/ARCHITECTURE.md)
   - Kiến trúc phân tầng 5 lớp, cây tuyến đường (Route Tree) và luồng phân quyền RBAC.

4. **Quy chuẩn API & Data Fetching:**
   - [.agent/rules/API_CONVENTIONS.md](file:///d:/Đồ Án 1/UniPass/.agent/rules/API_CONVENTIONS.md)
   - TanStack Query v5, Query Key Factory Pattern, Axios Interceptors, Mock Service.

5. **Quy chuẩn viết Code:**
   - [.agent/rules/CODE_CONVENTIONS.md](file:///d:/Đồ Án 1/UniPass/.agent/rules/CODE_CONVENTIONS.md)
   - Naming conventions, thứ tự import, thứ tự khai báo trong Component.

6. **Quy chuẩn thiết kế UI/UX (Design System):**
   - [.agent/rules/UI_UX_GUIDELINES.md](file:///d:/Đồ Án 1/UniPass/.agent/rules/UI_UX_GUIDELINES.md)
   - Triết lý Warm & Community-Driven: Bảng màu Terracotta `#D35400`, nền kem ấm `#FAF6F0`, bo góc mềm.

---

## 🧩 HỆ THỐNG KỸ NĂNG & AGENTS TRONG `.agent/`

Hệ sinh thái `.agent/` của dự án UniPass được chuẩn hóa theo Antigravity/Gemini CLI:

- **Skills (`.agent/skills/`):**
  - `unipass-frontend`: Kỹ năng triển khai tính năng Frontend, Feature-First, Centralized Types.
  - `api-conventions`: Kỹ năng tích hợp API, TanStack Query v5, Query Key Factory, Mock Service.
  - `code-reviewer`: Kỹ năng rà soát mã nguồn, kiểm tra 7 Strict Laws và pre-output checklist.
  - `ui-ux-design`: Kỹ năng thiết kế UI Warm & Community-Driven với Tailwind CSS.
- **Agents (`.agent/agents/`):**
  - `unipass-lead-engineer.md`: Lead Frontend Engineer chuyên trách UniPass.
  - `code-reviewer.md`: Chuyên gia kiểm tra mã nguồn & kỷ luật lập trình.
  - `ui-ux-architect.md`: Kiến trúc sư giao diện & trải nghiệm người dùng.
- **Rules (`.agent/rules/`):**
  - 6 bộ quy tắc cốt lõi được cấu hình frontmatter tự động kích hoạt theo ngữ cảnh.
- **Plugins (`.agent/plugins/`):**
  - Nơi tích hợp các plugin mở rộng với manifest `plugin.json`.

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
