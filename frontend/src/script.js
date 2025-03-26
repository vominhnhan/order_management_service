// Kiểm tra token khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        showOrderItems(token);
    } else {
        showLogin();
    }
});

// Xử lý form đăng nhập
document.getElementById('login-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Đăng nhập thất bại');
        }

        const { metaData } = data;
        const token = metaData.accessToken;
        localStorage.setItem('token', token);
        loginError.style.display = 'none';
        showOrderItems(token);
    } catch (err) {
        loginError.textContent = err.message;
        loginError.style.display = 'block';
    }
});

// Xử lý đăng xuất
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    showLogin();
});

// Hàm hiển thị giao diện đăng nhập
function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('order-items-container').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('remember-me').checked = false;
}

// Hàm hiển thị danh sách món ăn
async function showOrderItems(token) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('order-items-container').style.display = 'block';

    const orderItemsList = document.getElementById('order-items-list');
    const orderItemsError = document.getElementById('order-items-error');

    try {
        const response = await fetch('http://localhost:3000/api/chef/pending-order-items', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Lỗi khi lấy danh sách món ăn');
        }

        const orderItems = data.metaData;
        orderItemsError.style.display = 'none';

        if (orderItems.length === 0) {
            orderItemsList.innerHTML = '<p>Không có món ăn nào đang chuẩn bị.</p>';
        } else {
            const ul = document.createElement('ul');
            orderItems.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
            <strong>${item.product.name}</strong> - Số lượng: ${item.quantity} - 
            Bàn: ${item.order.table.table_name} - Ghi chú: ${item.notes || 'Không có'}
          `;
                ul.appendChild(li);
            });
            orderItemsList.innerHTML = '';
            orderItemsList.appendChild(ul);
        }
    } catch (err) {
        orderItemsError.textContent = err.message;
        orderItemsError.style.display = 'block';
    }
}