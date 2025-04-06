// Chọn các phần tử
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;
const navbar = document.getElementById('navbar');
const label = document.querySelector('.form-check-label');
const navLinks = document.querySelectorAll('.nav-link');

// Kiểm tra chế độ đã lưu trong localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    navbar.classList.add('navbar-dark-mode');
    themeToggleBtn.checked = true;
    label.textContent = 'Light Mode';
    // Apply dark mode to HTML data-bs-theme attribute for Bootstrap 5 components
    document.body.setAttribute('data-bs-theme', 'dark');

    // Apply dark mode to any modals or other Bootstrap components
} else {
    navbar.classList.add('navbar-light-mode');
    document.body.setAttribute('data-bs-theme', 'light');
    label.textContent = 'Dark Mode';
}

// Chuyển đổi giữa chế độ sáng và tối
themeToggleBtn.addEventListener('change', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        navbar.classList.remove('navbar-light-mode');
        navbar.classList.add('navbar-dark-mode');
        label.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
        document.body.setAttribute('data-bs-theme', 'dark');
    } else {
        navbar.classList.remove('navbar-dark-mode');
        navbar.classList.add('navbar-light-mode');
        label.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
        document.body.setAttribute('data-bs-theme', 'light');
    }
});

const activePage = localStorage.getItem('activePage');
if (activePage) {
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[href="${activePage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        localStorage.setItem('activePage', this.getAttribute('href'));
    });
});

const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
const otpSection = document.getElementById('otpSection');
const generatedCodeInput = document.getElementById('generatedCode');
const copyCodeBtn = document.getElementById('copyCodeBtn');

// Hàm gọi API để lấy mã OTP từ backend
async function fetchOTP(email) {
    try {
        // Gửi yêu cầu tới backend để lấy file JSON (OTP code)
        const response = await fetch('/api/get-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch OTP');
        }

        const data = await response.json();
        return data.otp_code; // Giả sử file JSON trả về có trường otp_code
    } catch (error) {
        console.error('Error fetching OTP: ', error);
        alert('Failed to retrieve OTP code. Please try again.');
        return null;
    }
}


// Lấy các phần tử modal và theme toggle
const modal = document.getElementById('staticBackdrop');
const themeToggle = document.getElementById('themeToggle');
const reportErrorBtn = document.getElementById('reportErrorBtn');

// Kiểm tra xem có thời gian đếm ngược còn lại trong localStorage không
const lastClickedTime = localStorage.getItem('reportErrorBtnClickedTime');
const currentTime = new Date().getTime();
const cooldownPeriod = 60000;

// Hàm cập nhật hiển thị thời gian đếm ngược trên nút
function updateCountdownDisplay(remainingTime) {
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    reportErrorBtn.textContent = `The system is fixing: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Kiểm tra nếu có thời gian đếm ngược còn lại trong localStorage
if (lastClickedTime) {
    const remainingTime = cooldownPeriod - (currentTime - lastClickedTime);
    if (remainingTime > 0) {
        reportErrorBtn.disabled = true;
        updateCountdownDisplay(remainingTime);
        const countdownInterval = setInterval(() => {
            const remainingTime = cooldownPeriod - (new Date().getTime() - lastClickedTime);
            if (remainingTime <= 0) {
                reportErrorBtn.disabled = false;
                reportErrorBtn.textContent = 'Report Error';
                localStorage.removeItem('reportErrorBtnClickedTime');
                clearInterval(countdownInterval);
                document.getElementById('checkStatusBtn').click();
            } else {
                updateCountdownDisplay(remainingTime);
            }
        }, 1000);
    }
}

// Lắng nghe sự kiện khi người dùng mở modal (click vào "Report Error")
// reportErrorBtn.addEventListener('click', () => {
//     const userEmail = document.getElementById('emailInputReport').value;
//     document.getElementById('userEmail').textContent = userEmail;  // Đưa email vào span#userEmail

//     reportErrorBtn.disabled = true;
//     localStorage.setItem('reportErrorBtnClickedTime', new Date().getTime());

//     // Đếm ngược 1 phút (60,000 milliseconds)
//     const countdownInterval = setInterval(() => {
//         const remainingTime = cooldownPeriod - (new Date().getTime() - localStorage.getItem('reportErrorBtnClickedTime'));
//         if (remainingTime <= 0) {
//             reportErrorBtn.disabled = false;
//             reportErrorBtn.textContent = 'Report Error';  // Reset button text
//             localStorage.removeItem('reportErrorBtnClickedTime');  // Xoá thời gian đã lưu
//             clearInterval(countdownInterval);

//             // Tự động click nút Check Status khi hết thời gian
//             document.getElementById('checkStatusBtn').click(); // Tự động click Check Status
//         } else {
//             updateCountdownDisplay(remainingTime);
//         }
//     }, 1000);

//     // Kiểm tra trạng thái của chế độ và thay đổi lớp của modal
//     if (themeToggle.checked) {
//         // Chế độ tối
//         modal.classList.add('modal-dark-mode');
//         modal.classList.remove('modal-light-mode');
//     } else {
//         // Chế độ sáng
//         modal.classList.add('modal-light-mode');
//         modal.classList.remove('modal-dark-mode');
//     }
// });

// Lắng nghe sự kiện khi thay đổi chế độ trên theme toggle
// themeToggle.addEventListener('change', () => {
//     if (themeToggle.checked) {
//         modal.classList.add('modal-dark-mode');
//         modal.classList.remove('modal-light-mode');
//     } else {
//         modal.classList.add('modal-light-mode');
//         modal.classList.remove('modal-dark-mode');
//     }
// });

// Lấy các phần tử cần thiết
const checkStatusBtn = document.getElementById('checkStatusBtn');
const statusMessage = document.getElementById('statusMessage'); // Ô thông báo trạng thái
const emailInputReport = document.getElementById('emailInputReport');

// Lắng nghe sự kiện khi người dùng nhấn "Check Status"
// checkStatusBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     const userEmail = emailInputReport.value;


//     if (userEmail && validateEmail(userEmail)) {
//         // Hiển thị thông báo trạng thái
//         statusMessage.style.display = 'block'; // Hiển thị ô thông báo
//         statusMessage.classList.remove('alert-danger', 'alert-warning');
//         statusMessage.classList.add('alert-info');
//         statusMessage.textContent = `Checking status for email: ${userEmail}...`;


//         setTimeout(() => {
//             statusMessage.textContent = `Status for ${userEmail}: Active`;
//             statusMessage.classList.remove('alert-info');
//             statusMessage.classList.add('alert-success');
//         }, 2000);
//     } else {
//         // Nếu email không hợp lệ, hiển thị lỗi
//         statusMessage.style.display = 'block';
//         statusMessage.classList.remove('alert-info', 'alert-success');
//         statusMessage.classList.add('alert-danger');
//         statusMessage.textContent = 'Invalid email. Please enter a valid email address.';
//     }
// });

// Hàm kiểm tra định dạng email
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Hàm áp dụng chế độ sáng/tối cho modal
function applyThemeToModal(modalElement, theme) {
    if (theme === 'dark') {
        modalElement.classList.add('modal-dark-mode');
        modalElement.classList.remove('modal-light-mode');
    } else {
        modalElement.classList.add('modal-light-mode');
        modalElement.classList.remove('modal-dark-mode');
    }
}

// Lắng nghe sự kiện khi trang tải
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const welcomeModalContent = document.getElementById('loginModal');
    const email = localStorage.getItem('email');

    // Áp dụng chế độ sáng/tối cho toàn bộ modal
    if (!email) {
        applyThemeToModal(welcomeModalContent, savedTheme);

        // Hiển thị modal Welcome
        // const welcomeModal = new bootstrap.Modal(document.getElementById('loginModal'), {
        //     backdrop: 'static',
        //     keyboard: false,
        // });
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    } else {
        mainContainer.classList.remove('hidden');
        mainContainer.classList.add('visible');
    }

    // welcomeModal.show();
});

// Lắng nghe sự kiện thay đổi chế độ
themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';

    // Cập nhật modal Welcome
    const welcomeModalContent = document.getElementById('loginModal');
    applyThemeToModal(welcomeModalContent, theme);
});

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})




const inputEmail = document.getElementById('email');
let username = localStorage.getItem('email');
const closeModalBtn = document.getElementById('closeModalBtn');
const mainContainer = document.getElementById('mainContainer');

closeModalBtn.addEventListener('click', function () {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
    // Clear the email from localStorage
    localStorage.removeItem('email');

    mainContainer.classList.add('hidden');
    mainContainer.classList.remove('visible');
})

inputEmail.addEventListener('input', function () {
    const email = inputEmail.value;
    if (email) {
        localStorage.setItem('email', email);
        username = email;
    }
})



// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;

    // Add your login validation logic here
    if (username === 'admin') {
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        localStorage.setItem('email', username);

        inputEmail.value = username

        loginModal.hide();
        mainContainer.classList.remove('hidden');
        mainContainer.classList.add('visible');
        document.getElementById('alert-login').innerHTML = '';
    } else {
        const usernameElement = document.getElementById('username');
        usernameElement.classList.add('animate__shakeX', "animate__animated");
        usernameElement.classList.add('border-danger');
        appendAlert("alert-login", 'Tài Khoản Chưa Có Cập Nhật Dữ Liệu Trong Hệ Thống, Vui Lòng Liên Lạc Với Nhà Phan Phối Tài Khoản Của Bạn Để Được Cập Nhật Và Xử Lý Ngay Lập Tức!', 'danger');

        setTimeout(() => {
            usernameElement.classList.remove('animate__shakeX', "animate__animated");
            usernameElement.classList.remove('border-danger');
        }, 1000);

    }
});

inputEmail.value = username || "";

let countdown;
let countdownInterval;

function startOtpCountdown() {
    const otpInput = document.getElementById('OTP');
    const copyOtpBtn = document.getElementById('copyOtpBtn');
    const errorOtp = document.getElementById('errorOtp');
    if (username != "admin") {
        // resendBtn.disabled = false;
        // resendBtn.innerHTML = 'Gửi lại mã';
        appendAlert('live-alert-tab-otp', 'Không có email nao trong ngày!', 'danger');
        errorOtp.innerHTML = 'Vui Lòng Yêu Cầu OTP Từ Trang Chủ Adobe Trước Rồi Mới Nhận Mã Xác Minh Tại Đây';
        otpInput.classList.add('d-none');
        copyOtpBtn.classList.add('d-none');
        return;
    } else {
        if(otpInput.classList.contains('d-none')){
            otpInput.classList.remove('d-none');
            copyOtpBtn.classList.remove('d-none');
        }
        errorOtp.innerHTML = '';
        otpInput.value = Math.floor(100000 + Math.random() * 900000);
        
        appendAlert('live-alert-tab-otp', 'Lấy mã xác thực thành công!', 'info');
        // resendBtn.disabled = true;
        countdown = 60;
        

        countdownInterval = setInterval(function () {
            countdown--;
            //resendBtn.innerHTML = `Gửi lại mã (${countdown}s)`;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                // resendBtn.disabled = false;
                // resendBtn.innerHTML = 'Gửi lại mã';
            }
        }, 1000);
        
    }
}
document.getElementById('otpButton').addEventListener('click', function () {
    // if(countdown > 0){
    //     appendAlert("liveAlertPlaceholder",`Bạn Đã Gửi Mã OTP Vui Lòng Chờ ${countdown}s để gửi lại!`, 'danger');
    //     return;
    // } 
    // document.getElementById('statusDiv').classList.add('slide-left');
    // document.getElementById('otpDiv').classList.add('slide-right');
    // setTimeout(function () {
    //     document.getElementById('statusDiv').classList.add('reverse-border-radius-2');
    //     document.getElementById('otpDiv').classList.add('reverse-border-radius');
    // }, 0);
    // document.getElementById('myOtp').classList.add('fade-in');
    // document.getElementById('checkStatus').classList.add('fade-out');
    // document.getElementById('checkStatus-2').classList.add('fade-in');
    // document.getElementById('otp-2').classList.add('fade-out');
    // setTimeout(function () {
    //     document.getElementById('myOtp').classList.remove('hide-tab-2');
    //      document.getElementById('checkStatus').classList.add('hide-tab-1');
    //     document.getElementById('myOtp').classList.remove('fade-in');
    //     document.getElementById('checkStatus').classList.remove('fade-out');
    //     document.getElementById('checkStatus-2').classList.remove('hide-tab-2');
    //     document.getElementById('otp-2').classList.add('hide-tab-1');
    //     document.getElementById('checkStatus-2').classList.remove('fade-in');
    //     document.getElementById('otp-2').classList.remove('fade-out');

    // }, 800);

    // // OTP Resend Timer


    // startOtpCountdown();

    // Check if the elements have these classes before removing them
    if (document.getElementById('statusDiv').classList.contains('slide-left')) {
        document.getElementById('statusDiv').classList.remove('slide-left', 'reverse-border-radius-2');
        document.getElementById('statusDiv').classList.add('slide-left-reverse');

        setTimeout(function () {
            document.getElementById('statusDiv').classList.remove('slide-left-reverse');
            
        }, 800);
        document.getElementById('otp-2').classList.add('fade-out');
    }


    if (document.getElementById('otpDiv').classList.contains('slide-right')) {
        document.getElementById('otpDiv').classList.remove('slide-right', 'reverse-border-radius');
        document.getElementById('otpDiv').classList.add('slide-right-reverse');
        setTimeout(function () {
            document.getElementById('otpDiv').classList.remove('slide-right-reverse');
        }, 800);
    }


    document.getElementById('otp-2').classList.add('fade-out');
     document.getElementById('otp-2').classList.add('hide-tab-2');
     document.getElementById('checkStatus-2').classList.add('fade-in');
     document.getElementById('checkStatus-2').classList.remove('hide-tab-2');

    




    //document.getElementById('myOtp').classList.add('fade-in');
    //document.getElementById('checkStatus').classList.add('fade-out');
    //document.getElementById('checkStatus-2').classList.add('fade-in');
    
    

    // OTP Resend Timer


    startOtpCountdown();
});


// document.getElementById('return').addEventListener('click', function () {







//     document.getElementById('statusDiv').classList.remove('slide-left', 'reverse-border-radius-2');
//     document.getElementById('otpDiv').classList.remove('slide-right', 'reverse-border-radius');
//     document.getElementById('statusDiv').classList.add('slide-left-reverse');
//     document.getElementById('otpDiv').classList.add('slide-right-reverse');


//     document.getElementById('myOtp').classList.add('fade-out');
//     document.getElementById('checkStatus').classList.add('fade-in');
//     document.getElementById('checkStatus-2').classList.add('fade-out');
//     document.getElementById('otp-2').classList.add('fade-in');

//     setTimeout(function () {
//         document.getElementById('statusDiv').classList.remove('slide-left-reverse');
//         document.getElementById('otpDiv').classList.remove('slide-right-reverse');


//         document.getElementById('myOtp').classList.add('hide-tab-2');
//         document.getElementById('checkStatus').classList.remove('hide-tab-1');
//         document.getElementById('checkStatus-2').classList.add('hide-tab-2');
//         document.getElementById('otp-2').classList.remove('hide-tab-1');

//         document.getElementById('myOtp').classList.remove('fade-out');
//         document.getElementById('checkStatus').classList.remove('fade-in');
//         document.getElementById('checkStatus-2').classList.remove('fade-out');
//         document.getElementById('otp-2').classList.remove('fade-in');

//     }, 800);


//     // Reset countdown when returning to status check
//     clearInterval(countdownInterval);
// });

// Handle resend OTP button click
// document.getElementById('resendOtpBtn').addEventListener('click', function () {
//     // Add your OTP resend logic here
//     startOtpCountdown();
// });


const appendAlert = (id, message, type) => {
    const alertPlaceholder = document.getElementById(id)
    // Clear existing alerts first
    alertPlaceholder.innerHTML = '';

    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} ${type == "danger" ? "animate__shakeX" : ""} alert-dismissible animate__animated " role="alert">`,
        `   <div>${message}</div>`,
        ,
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
 
        document.getElementById('checkStatus-2').classList.contains('fade-in') ? document.getElementById('checkStatus-2').classList.remove('fade-in') & document.getElementById('checkStatus-2').classList.add('hide-tab-2') : null;
        document.getElementById('otp-2').classList.contains('fade-out') ? document.getElementById('otp-2').classList.remove('fade-out') & document.getElementById('otp-2').classList.remove('hide-tab-2') & document.getElementById('otp-2').classList.add('fade-in') : null;

        document.getElementById('statusDiv').classList.add('slide-left');
        document.getElementById('otpDiv').classList.add('slide-right');
        setTimeout(function () {
            document.getElementById('statusDiv').classList.add('reverse-border-radius-2');
            document.getElementById('otpDiv').classList.add('reverse-border-radius');
        }, 0);
        
        if (username == "admin") {
            appendAlert('liveAlertPlaceholder', `
                <div>Tài khoản của bạn đã được xử lý thành công vào lúc 2025-03-31 21:57:27.</div>
                <div>Nếu bạn chưa đăng nhập lại, vui lòng đóng tất cả ứng dụng Adobe đang bật, sau đó hãy mở ứng dụng Adobe Creative Cloud lên và tiến hành đăng nhập lại tài khoản để tiếp tục sử dụng.</div>
            `, 'success')
        } else {
            appendAlert('liveAlertPlaceholder', `
               
                    <div>Email không cho phép sử dụng các chức năng trong Báo Cáo Lỗi!</div>
                    <div>Có thể tài khoản Adobe của bạn đang không phải là Adobe Renew,</div>
                    <div>Vui Lòng Liên Lạc Với Nhà Phân Phối Tài Khoản Của Bạn Để Được Cập Nhật Và Xử Lý Ngay Lập Tức!</div>
               
            `, 'danger')

        }

    })
}

document.getElementById('copyOtpBtn').addEventListener('click', function () {
    const otpInput = document.getElementById('OTP');
    otpInput.select();
    document.execCommand('copy');

    // Show feedback
    const icon = this.querySelector('i');
    icon.classList.remove('bi-clipboard');
    icon.classList.add('bi-clipboard-check');

    setTimeout(() => {
        icon.classList.remove('bi-clipboard-check');
        icon.classList.add('bi-clipboard');
    }, 2000);
});






