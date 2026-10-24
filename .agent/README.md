# UNIPASS FRONTEND — HỆ THỐNG AGENT WORKSPACE QUY CHUẨN

> **Dự án:** UniPass (Hệ thống Trao đổi, Pass đồ & Tặng đồ dùng Sinh viên)  
> **Phiên bản cấu trúc:** Antigravity / Gemini CLI Agentic Standard (0.6.x)  
> **Thư mục quản trị:** `.agent/` (Hỗ trợ tương thích chuẩn `.agents/`)

Thư mục `.agent/` được tổ chức chuẩn mực theo 4 trụ cột nghiệp vụ: **Skills**, **Agents**, **Rules**, và **Plugins** nhằm hỗ trợ tối đa cho các AI Assistant (Antigravity, Cursor, Windsurf, Claude, Copilot) và lập trình viên.

---

## 🌳 SƠ ĐỒ CẤU TRÚC THƯ MỤC CHUẨN

```text
.agent/
├── rules/                               # Quy tắc & kỷ luật lập trình của dự án (Rule definitions)
│   ├── AGENT_RULES.md                   # 7 điều luật bắt buộc, Tech stack, checklist kiểm tra code
│   ├── CODE_CONVENTIONS.md              # Naming conventions, import order, TypeScript strict, Clean code
│   ├── FOLDER_STRUCTURE.md              # Cấu trúc thư mục chi tiết, Feature-Sliced & Centralized Types
│   ├── API_CONVENTIONS.md               # Chuẩn Axios client, TanStack Query v5, Query Key Factory, Mock
│   ├── ARCHITECTURE.md                  # Kiến trúc 5 lớp, phân quyền RBAC, Barter Pipeline
│   └── UI_UX_GUIDELINES.md              # Design system: Terracotta #D35400, canvas #FAF6F0, bo góc mềm
│
├── skills/                              # Kỹ năng (skills) chuyên biệt dành cho dự án UniPass
│   ├── unipass-frontend/                # Kỹ năng phát triển tính năng Frontend toàn diện
│   │   ├── skill.md                     # Định nghĩa kỹ năng chính (bắt buộc)
│   │   ├── references/                  # Tài liệu tham khảo kỹ thuật
│   │   │   ├── architecture.md
│   │   │   ├── folder_structure.md
│   │   │   ├── prompt_guide.md
│   │   │   └── system_design.md
│   │   ├── scripts/                     # Scripts hỗ trợ tự động
│   │   │   └── validate_centralized_types.js
│   │   └── assets/                      # Tài nguyên đi kèm
│   │
│   ├── api-conventions/                 # Kỹ năng tích hợp API, TanStack Query & Mock
│   │   ├── skill.md
│   │   ├── references/
│   │   │   └── api_conventions.md
│   │   └── scripts/
│   │       └── verify_query_keys.js
│   │
│   ├── code-reviewer/                   # Kỹ năng rà soát mã nguồn & kiểm tra 7 Strict Laws
│   │   ├── skill.md
│   │   └── references/
│   │       └── checklist.md
│   │
│   └── ui-ux-design/                    # Kỹ năng thiết kế UI Warm & Community-Driven
│       ├── skill.md
│       └── references/
│           ├── ui_ux_guidelines.md
│           └── system_design.md
│
├── agents/                              # Định nghĩa custom subagent với YAML frontmatter
│   ├── unipass-lead-engineer.md         # Lead Frontend Engineer chuyên trách UniPass
│   ├── code-reviewer.md                 # Chuyên gia kiểm tra mã nguồn & kỷ luật lập trình
│   └── ui-ux-architect.md               # Kiến trúc sư giao diện & trải nghiệm người dùng
│
└── plugins/                             # Các plugin mở rộng được tích hợp trong dự án
    └── README.md                        # Hướng dẫn cấu hình plugin với manifest plugin.json
```

---

## 📂 DANH MỤC CÁC QUY TẮC CỐT LÕI (RULES)

| Quy tắc | Vai trò chính |
| :--- | :--- |
| **[AGENT_RULES.md](rules/AGENT_RULES.md)** | **7 Điều luật bắt buộc:** Không `any`, Server State qua TanStack Query, Feature-First, Query Key Factory, validate `.edu.vn`, không hardcode, Centralized Types. |
| **[CODE_CONVENTIONS.md](rules/CODE_CONVENTIONS.md)** | **Chuẩn viết code:** Thứ tự import 5 khối, thứ tự khai báo trong component, chuẩn Tailwind CSS. |
| **[FOLDER_STRUCTURE.md](rules/FOLDER_STRUCTURE.md)** | **Phân chia thư mục:** Nhiệm vụ của `src/pages/`, `src/features/`, `src/components/ui/`, `src/layouts/`. |
| **[API_CONVENTIONS.md](rules/API_CONVENTIONS.md)** | **Data Fetching:** Axios Interceptors, ApiResponse envelope, PaginatedResponse, TanStack Query v5. |
| **[ARCHITECTURE.md](rules/ARCHITECTURE.md)** | **Kiến trúc hệ thống:** 5 tầng phân tách, cây Route, phân quyền RBAC (GUEST/MEMBER/ADMIN). |
| **[UI_UX_GUIDELINES.md](rules/UI_UX_GUIDELINES.md)** | **Hệ thống thiết kế:** Tone màu ấm áp, bo góc mềm, micro-interactions, responsive design. |

---

## 🛠️ HƯỚNG DẪN KÍCH HOẠT VÀ SỬ DỤNG CHO AI AGENT

1. **Trước khi bắt đầu code:** Đọc kỹ `rules/AGENT_RULES.md` và `rules/CODE_CONVENTIONS.md`.
2. **Khi triển khai tính năng:** Kích hoạt skill `unipass-frontend` hoặc tham khảo `skills/unipass-frontend/references/prompt_guide.md`.
3. **Trước khi bàn giao code:** Kích hoạt agent `code-reviewer` hoặc chạy script kiểm tra:
   ```bash
   node .agent/skills/unipass-frontend/scripts/validate_centralized_types.js
   ```
