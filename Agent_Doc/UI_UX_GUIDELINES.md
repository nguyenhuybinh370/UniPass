# UNIPASS FRONTEND — HƯỚNG DẪN THIẾT KẾ UI/UX (UI/UX GUIDELINES)
> **Dự án:** UniPass — Nền tảng Trao đổi, Pass đồ & Tặng đồ Secondhand Sinh viên  
> **Ngôn ngữ thiết kế:** Warm & Community-Driven (Ấm áp, Mộc mạc, Thân thiện & Kết nối Sinh viên)  
> **Màu thương hiệu chủ đạo:** `#D35400` (Terracotta / Cam gạch ấm)  
> **Tài liệu:** Quy chuẩn Giao diện & Trải nghiệm Người dùng (UI/UX Specifications)

---

## 1. TRIẾT LÝ THIẾT KẾ CỐT LÕI (CORE DESIGN PRINCIPLES)

1. **Warm & Low-Glare Surfaces (Bề mặt kem ấm, chống mỏi mắt):**
   - Loại bỏ hoàn toàn nền trắng tinh chói lóa (`#FFFFFF`) và chữ đen tuyền cơ học (`#000000`).
   - Sử dụng nền **kem ấm mộc mạc** (`#FAF6F0`) kết hợp chữ **nâu đất trầm** (`#2D241E`). Giảm mỏi mắt tối đa khi sinh viên lướt tìm tài liệu, giáo trình ban đêm tại ký túc xá, tạo cảm giác mộc mạc và chân thực.
2. **Soft & Friendly Geometry (Hình khối mềm mại, gần gũi):**
   - Loại bỏ các góc nhọn sắc cạnh (0px – 4px). Toàn bộ hệ thống sử dụng bo góc mềm (`8px` – `14px`) và dạng viên thuốc (`pill radius` 9999px). Tạo thiện cảm nhẹ nhàng, khuyến khích sự chia sẻ và tương thân tương ái.
3. **Eco & Campus Transparency (Minh bạch học đường & Sinh thái bền vững):**
   - Đặt trọng tâm vào các hành vi đặc thù: **Tặng đồ 0đ**, **Giao lưu giáo trình**, **Đổi đồ ngang (Barter)**, công khai độ mới (%) và hiển thị vị trí khuôn viên trường / Ký túc xá (KTX) để sinh viên dễ dàng hẹn gặp trực tiếp.
4. **Gentle & Trustworthy Motion (Chuyển động điềm tĩnh, tạo dựng niềm tin):**
   - Chuyển động nhấc nhẹ (`translateY(-1px)` đến `-2px`) khi hover. Tuyệt đối không dùng animation giật nảy, lòe loẹt mang tính thương mại xô bồ.

---

## 2. HỆ THỐNG MÀU SẮC (COLOR SYSTEM)

### 2.1. Bảng màu Cốt lõi (Core Palette)

| Vai trò (Role) | Token CSS | Mã HEX | Ứng dụng cụ thể trong UniPass |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `--brand-500` | `#D35400` | Nút hành động chính (Đăng tin, Mua ngay, Gửi đề xuất), liên kết quan trọng, tab active. |
| **Brand Hover** | `--brand-600` | `#B94600` | Hiệu ứng hover cho nút chính. |
| **Brand Active** | `--brand-700` | `#9C3B00` | Trạng thái active khi nhấn giữ nút chính. |
| **Secondary / Eco** | `--secondary-500` | `#1E824C` | Nhãn & nút "Đổi đồ", "Tặng 0đ", huy hiệu điểm uy tín, thông báo thành công. |
| **Secondary Hover** | `--secondary-600` | `#16683C` | Hover cho các nút hành động trao đổi sinh thái. |
| **Accent / Highlight**| `--accent-500` | `#E67E22` | Badge pass rẻ, tin nổi bật, cảnh báo nhẹ an toàn khuôn viên. |
| **Background Canvas** | `--bg-canvas` | `#FAF6F0` | **Nền toàn trang web** (kem mộc, không gây mỏi mắt). |
| **Surface Card** | `--surface-card` | `#FFFFFF` | Nền thẻ sản phẩm, dropdown menu, modal nổi bật trên nền canvas. |
| **Surface Muted** | `--surface-muted` | `#F3E9DD` | Nền ô input, nền thẻ phụ, avatar mặc định khi chưa tải xong. |
| **Surface Accent Tint**| `--surface-accent`| `#FDF3E1` | Nền banner gợi ý, dải màu chuyển nhẹ, hover nút secondary. |
| **Text Primary** | `--text-primary` | `#2D241E` | Tiêu đề, tên vật phẩm, giá tiền (nâu đen ấm thay cho đen thuần). |
| **Text Muted** | `--text-muted` | `#756A63` | Mô tả ngắn, thời gian đăng, tên trường / phân hiệu / KTX. |
| **Text Disabled** | `--text-disabled`| `#9E928A` | Placeholder ô nhập, nhãn nút bị vô hiệu hóa. |
| **Border Subtle** | `--border-subtle` | `#E6DACD` | Đường viền thẻ, viền input mặc định, đường kẻ phân cách. |

### 2.2. Bảng màu Ngữ nghĩa & An toàn Sinh viên (Semantic Colors)

| Vai trò | Token | HEX | Ứng dụng |
| :--- | :--- | :--- | :--- |
| **Success / Eco Badge** | `--success-500` | `#1E824C` | Xác nhận gửi yêu cầu đổi thành công, hoàn tất giao dịch. |
| **Success Background** | `--success-50` | `#E8F5E9` | Nền toast / alert thành công. |
| **Warning / Campus Alert**| `--warning-500` | `#E67E22` | Hộp nhắc nhở an toàn giao dịch tại KTX, tin đang chờ duyệt. |
| **Warning Background** | `--warning-50` | `#FDF3E1` | Nền hộp thông báo an toàn giao dịch tại trường. |
| **Error / Danger** | `--error-500` | `#C0392B` | Báo cáo bài đăng sách lậu, bom hẹn, cảnh báo rủi ro, lỗi form. |
| **Error Background** | `--error-50` | `#FBECEB` | Nền thông báo lỗi và cảnh báo gian lận. |

---

## 3. NGHỆ THUẬT CHỮ & TYPOGRAPHY (TYPOGRAPHY SYSTEM)

Hệ thống kết hợp 2 bộ font tối ưu tiếng Việt Unicode đầy đủ, trẻ trung và vững chãi:
- **Heading:** `Be Vietnam Pro` (Nét chắc khỏe, ấm áp, dấu câu tiếng Việt chuẩn xác).
- **Body & UI:** `Plus Jakarta Sans` (Nét bo cong hiện đại, độ thoáng tốt, dễ đọc thông số đồ dùng).

```html
<!-- Nhúng Google Fonts trong index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Thang đo phân cấp chữ (Type Scale)

| Token | Font Family | Size / Line Height | Weight | Mục đích sử dụng |
| :--- | :--- | :--- | :--- | :--- |
| `--text-display` | Be Vietnam Pro | `40px` / `48px` | Bold (700) | Banner trang chủ, khẩu hiệu chiến dịch dọn đồ KTX. |
| `--text-h1` | Be Vietnam Pro | `32px` / `40px` | Bold (700) | Tiêu đề trang chi tiết món đồ, tiêu đề trang quản lý. |
| `--text-h2` | Be Vietnam Pro | `24px` / `32px` | Semibold (600) | Tiêu đề khối chuyên mục ("Đồ tặng 0đ", "Giáo trình hot"). |
| `--text-h3` | Be Vietnam Pro | `18px` / `26px` | Semibold (600) | Tiêu đề thẻ sản phẩm, tiêu đề Modal/Hộp thoại. |
| `--text-body-lg` | Plus Jakarta Sans | `16px` / `24px` | Regular (400) | Mô tả chi tiết món đồ, ghi chú tình trạng sách vở. |
| `--text-body` | Plus Jakarta Sans | `15px` / `22px` | Regular (400) | Nội dung mô tả thẻ bài đăng, form field input. |
| `--text-body-sm` | Plus Jakarta Sans | `13px` / `18px` | Regular (400) | Vị trí KTX, tên trường đại học, thời gian đăng tin. |
| `--text-caption` | Plus Jakarta Sans | `12px` / `16px` | Medium (500) | Badge độ mới ("Mới 95%"), nhãn trạng thái giao dịch. |

---

## 4. HỆ THỐNG ĐỔ BÓNG NÂU ẤM (WARM SHADOW SYSTEM)

Tránh bóng đen gắt nhân tạo (`rgba(0,0,0,...)`). Toàn bộ bóng được pha từ sắc nâu đất `--text-primary` (`#2D241E`) để hòa quyện mềm mại với nền canvas kem:

| Token Shadow | Giá trị CSS | Ứng dụng |
| :--- | :--- | :--- |
| `--shadow-warm-xs` | `0 1px 3px rgba(45, 36, 30, 0.04)` | Chip danh mục môn học, badge độ mới. |
| `--shadow-warm-sm` | `0 2px 8px rgba(45, 36, 30, 0.05)` | Thẻ sản phẩm ở trạng thái nghỉ, ô tìm kiếm. |
| `--shadow-warm-md` | `0 4px 14px rgba(45, 36, 30, 0.08)` | Thẻ sản phẩm khi hover, dropdown menu bộ lọc. |
| `--shadow-warm-lg` | `0 8px 24px rgba(45, 36, 30, 0.12)` | Modal xác nhận đổi đồ, toast thông báo nổi góc màn hình. |
| `--shadow-focus` | `0 0 0 3px rgba(211, 84, 0, 0.18)` | Vòng glow khi focus ô input hoặc nút bấm chính. |

---

## 5. HỆ BO GÓC THÂN THIỆN (BORDER RADIUS SYSTEM)

| Token Radius | Giá trị | Ứng dụng |
| :--- | :--- | :--- |
| `--radius-xs` | `6px` | Checkbox, nhãn metadata phụ, icon background nhỏ. |
| `--radius-sm` | `8px` | Ô input, thanh search, nút phụ, toast notification. |
| `--radius-md` | `10px` | Nút chính (Primary/Eco Button), dropdown menu. |
| `--radius-lg` | `14px` | Thẻ sản phẩm (Product Card), khối card thông tin người bán. |
| `--radius-xl` | `20px` | Modal giao dịch đổi đồ, banner lớn, bottom sheet mobile. |
| `--radius-pill` | `9999px` | Badges tình trạng ("Đổi đồ", "0đ"), chip lọc môn học, avatar. |

---

## 6. QUY CHUẨN THÀNH PHẦN GIAO DIỆN (COMPONENT SPECIFICATIONS)

### 6.1. Thẻ bài đăng sinh viên (Product Card) — Trái tim của UniPass
- **Khung thẻ:** Nền `#FFFFFF`, viền `1px solid #E6DACD`, bo góc `14px` (`--radius-lg`), bóng `--shadow-warm-sm`.
- **Hiệu ứng Hover:** `transform: translateY(-2px)`, chuyển bóng sang `--shadow-warm-md`, transition `200ms ease-out`.
- **Ảnh Thumbnail:** Tỉ lệ 1:1 hoặc 4:3. Khi sản phẩm đã hoàn tất đổi: giảm `opacity: 0.5` kèm overlay chữ "Đã trao đổi".
- **Hệ thống Badges trên ảnh:**
  - **Góc trên bên trái (Loại giao dịch):** Dạng viên thuốc (`--radius-pill`), đệm `4px 10px`, font size `12px` đậm:
    - *Đổi đồ:* Nền `#1E824C`, chữ trắng.
    - *Pass rẻ:* Nền `#E67E22`, chữ trắng.
    - *Tặng 0đ:* Nền `#27AE60`, chữ trắng.
  - **Góc dưới bên phải (Độ mới):** Nền `rgba(45, 36, 30, 0.75)`, chữ trắng, bo góc `6px` (`--radius-xs`), VD: *"Mới 95%"*.
- **Nội dung thẻ:**
  - **Tên vật phẩm:** Chữ `#2D241E`, font Be Vietnam Pro, font-weight 600, tối đa 2 dòng (`line-clamp-2`).
  - **Giá / Nhu cầu đổi:** Chữ `#D35400`, font-size `16px`, font-weight 700 (hoặc *"Giao lưu giáo trình KTX"*).
  - **Metadata người đăng:** Avatar tròn nhỏ + Tên sinh viên + Icon định vị khuôn viên trường/KTX (VD: *KTX Khu B, ĐHQG*), màu `#756A63`, font-size `13px`.

### 6.2. Nút bấm (Button Variations)
- **Primary Button (Đăng tin, Mua ngay, Gửi đề xuất):**
  - Nền `#D35400`, chữ `#FFFFFF`, bo góc `10px` (`--radius-md`).
  - Hover: Nền `#B94600`, `transform: translateY(-1px)`.
  - Active: Nền `#9C3B00`, `transform: scale(0.98)`.
- **Secondary / Outline Button (Lọc danh mục, Nhắn tin):**
  - Nền trong suốt hoặc `#FAF6F0`, viền `1.5px solid #D35400`, chữ `#D35400`, bo góc `10px`.
  - Hover: Nền `#FDF3E1`.
- **Eco / Trade Button (Đặc thù: "Gạ đổi đồ", "Nhận tặng 0đ"):**
  - Nền `#1E824C`, chữ `#FFFFFF`, bo góc `10px`.
  - Hover: Nền `#16683C`.
- **Disabled State:**
  - Nền `#E6DACD`, chữ `#9E928A`, con trỏ `not-allowed`.

### 6.3. Ô nhập liệu & Thanh tìm kiếm KTX (Inputs & Search Bar)
- **Trạng thái bình thường:** Nền `#FFFFFF` (hoặc `#F3E9DD`), viền `1px solid #E6DACD`, bo góc `8px`, chữ `#2D241E`, placeholder `#9E928A`.
- **Trạng thái Focus:** Viền `1.5px solid #D35400`, bóng viền ngoài `--shadow-focus`.
- **Trạng thái Lỗi:** Viền `1.5px solid #C0392B`, thông báo lỗi bên dưới màu `#C0392B`, font-size `12px`.
- **Campus Search Bar:** Tích hợp icon kính lúp màu `#756A63`, hỗ trợ các chip lọc nhanh theo khu vực (Khu A, Khu B, Cơ sở 1).

### 6.4. Hộp nhắc nhở an toàn học đường (Community Safety Alerts)
- **Alert An toàn giao dịch:** Nền `#FDF3E1`, viền `1px solid #F5D7B2`, bo góc `10px`. Icon khiên bảo vệ màu `#D35400`.
  - Nội dung: *"💡 Lưu ý: Hãy hẹn gặp trực tiếp tại sảnh KTX hoặc thư viện/căn tin trường để kiểm tra đồ trước khi trao đổi."*
- **Alert Cảnh báo rủi ro / Sách lậu:** Nền `#FBECEB`, viền `1px solid #F5C6CB`, icon `#C0392B`, chữ `#5C1D16`.

### 6.5. Thông báo nổi (Toast Notifications)
- Nền `#FFFFFF`, bo góc `8px`, bóng `--shadow-warm-lg`, viền trái `4px solid`.
  - **Thành công:** Viền trái & icon `#1E824C`.
  - **Lỗi / Cảnh báo:** Viền trái & icon `#C0392B`.
  - **Đề xuất đổi mới:** Viền trái & icon `#E67E22`.

---

## 7. CẤU HÌNH TAILWIND CSS MẪU (TAILWIND INTEGRATION)

Để toàn bộ dự án áp dụng chuẩn xác hệ thống thiết kế trên, cấu hình `tailwind.config.js` được thiết lập như sau:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF3E1',
          500: '#D35400', // Terracotta chính
          600: '#B94600', // Hover
          700: '#9C3B00', // Active
        },
        secondary: {
          50: '#E8F5E9',
          500: '#1E824C', // Eco / Trade xanh lá
          600: '#16683C',
        },
        accent: {
          500: '#E67E22', // Pass rẻ / Highlight
        },
        canvas: '#FAF6F0', // Nền toàn trang kem ấm
        surface: {
          card: '#FFFFFF',
          muted: '#F3E9DD',
          accent: '#FDF3E1',
        },
        text: {
          primary: '#2D241E', // Nâu đen ấm
          muted: '#756A63',   // Nâu xám
          disabled: '#9E928A',
        },
        border: {
          subtle: '#E6DACD',
        },
      },
      fontFamily: {
        heading: ['"Be Vietnam Pro"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'warm-xs': '0 1px 3px rgba(45, 36, 30, 0.04)',
        'warm-sm': '0 2px 8px rgba(45, 36, 30, 0.05)',
        'warm-md': '0 4px 14px rgba(45, 36, 30, 0.08)',
        'warm-lg': '0 8px 24px rgba(45, 36, 30, 0.12)',
        'focus': '0 0 0 3px rgba(211, 84, 0, 0.18)',
      },
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
        'pill': '9999px',
      },
    },
  },
  plugins: [],
};
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #FAF6F0; /* --bg-canvas */
    color: #2D241E;           /* --text-primary */
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Be Vietnam Pro', sans-serif;
    color: #2D241E;
  }
}
```

---

## 8. NHỮNG ĐIỀU TUYỆT ĐỐI TRÁNH (ANTI-PATTERNS)

- ❌ **Không dùng góc bo sắc nhọn (0px – 4px):** Tránh tạo cảm giác khô khan, mang tính phần mềm công nghiệp thay vì cộng đồng trường học gần gũi.
- ❌ **Không dùng màu đen tuyền `#000000` và xám lạnh `#F4F5F7`:** Làm mất độ mộc mạc và cảm giác ấm áp đặc trưng của UniPass.
- ❌ **Không dùng bóng đổ màu đen gắt (`rgba(0,0,0,0.25)`):** Bóng đen làm xỉn nền kem ấm; luôn pha bóng từ sắc nâu `--text-primary`.
- ❌ **Không giấu thông tin địa điểm (Ký túc xá / Tên cơ sở):** Vị trí trường là yếu tố quan trọng số 1 để sinh viên hẹn gặp trực tiếp không tốn phí ship.
- ❌ **Không dùng hiệu ứng giật nảy (flashy/bouncy animation):** Giữ chuyển động êm dịu, nhẹ nhàng để củng cố độ tin cậy trong giao dịch.
