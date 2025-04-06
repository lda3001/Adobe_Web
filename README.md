# Adobe Email OTP and Report System

**Mô tả:**  
Dự án này cung cấp chức năng xác thực qua OTP cho các tài khoản Adobe, cũng như cho phép người dùng báo cáo lỗi qua email và kiểm tra trạng thái tài khoản của họ. Giao diện hỗ trợ chế độ sáng và tối (Dark Mode/Light Mode) để nâng cao trải nghiệm người dùng.

## Các tính năng chính:
1. **Email OTP (Email One-Time Password)**  
   - Người dùng có thể nhập địa chỉ email của mình để nhận mã OTP qua email.
2. **Báo cáo lỗi (Report Error)**  
   - Người dùng có thể báo cáo lỗi qua email của họ. Sau khi gửi báo cáo, nút "Report Error" sẽ bị vô hiệu hóa trong 1 phút và tự động kích hoạt lại sau khi hết thời gian.
   - Modal thông báo sẽ hiển thị thông tin của người dùng và đếm ngược thời gian.

3. **Chế độ sáng và tối (Light/Dark Mode)**  
   - Giao diện có thể chuyển giữa chế độ sáng và tối thông qua một công tắc chuyển đổi (toggle).

4. **Hiển thị trạng thái tài khoản**  
   - Người dùng có thể kiểm tra trạng thái tài khoản của họ, xem thời gian cập nhật cuối cùng và thông tin hướng dẫn sử dụng trong modal.

# Cấu trúc thư mục của dự án

/Adobe_Web                 # Thư mục gốc của dự án  
├── /html                  # Thư mục chứa các trang HTML  
│   ├── Home.html          # Trang chính (Email OTP)  
├── /css                   # Thư mục chứa các file CSS  
│   ├── bootstrap.css      # Bootstrap CSS  
│   ├── bootstrap.min.css  # Bootstrap minified CSS  
│   └── style.css          # Các style tùy chỉnh  
├── /js                    # Thư mục chứa các file JavaScript  
│   ├── bootstrap.bundle.js # Bootstrap JS (bundle)  
│   ├── bootstrap.min.js    # Bootstrap minified JS  
│   ├── jquery-3.6.4.min.js # Thư viện jQuery  
│   └── script.js           # Script JavaScript tùy chỉnh  
├── /img                   # Thư mục chứa các file hình ảnh  
│   └── logo.jpg            # Logo ứng dụng  
└── README.md              # File README mô tả dự án


## Cài đặt:
1. **Yêu cầu hệ thống:**
   - Trình duyệt web hỗ trợ HTML5, CSS3, và JavaScript.
   - Đảm bảo có kết nối internet để tải tài nguyên từ CDN (Bootstrap Icons, jQuery).

2. **Cài đặt các phụ thuộc:**
   - Tải các file CSS và JS như Bootstrap và jQuery nếu chưa có trong thư mục của dự án.

3. **Chạy ứng dụng:**
   - Đơn giản mở file `Home.html`  trong trình duyệt để sử dụng ứng dụng.

## Hướng dẫn sử dụng:
1. **Trang chính (Email OTP):**
   - Nhập địa chỉ email của bạn vào ô "Enter your Adobe Email".
   - Nhấn nút **Get Code** để nhận mã OTP.
   - Mã OTP sẽ được hiển thị và bạn có thể sao chép mã đó vào clipboard.

3. **Chế độ sáng/tối (Light/Dark Mode):**
   - Chuyển đổi giữa chế độ sáng và tối bằng công tắc ở góc trên bên phải của giao diện.
