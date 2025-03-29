function processLink() {
    const shopeeLink = document.getElementById('shopeeLink').value.trim();
    
    if (!shopeeLink) {
        alert('Vui lòng nhập link Shopee!');
        return;
    }

    if (!shopeeLink.includes('shopee.vn') && !shopeeLink.includes('shp.ee')) {
        alert('Link không hợp lệ! Vui lòng nhập link Shopee.');
        return;
    }

    // Rút gọn link bằng TinyURL API
    fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(shopeeLink)}`)
        .then(response => response.text())
        .then(shortUrl => {
            // Tạo Facebook URL với định dạng l.php?u= và link đã rút gọn
            const facebookUrl = `https://www.facebook.com/l.php?u=${encodeURIComponent(shortUrl)}`;
            // Hiển thị kết quả
            document.getElementById('resultLink').value = facebookUrl;
        })
        .catch(error => {
            console.error('Lỗi khi rút gọn link:', error);
            // Nếu có lỗi, sử dụng link gốc
            const facebookUrl = `https://www.facebook.com/l.php?u=${encodeURIComponent(shopeeLink)}`;
            document.getElementById('resultLink').value = facebookUrl;
        });
}

function copyToClipboard() {
    const resultLink = document.getElementById('resultLink');
    resultLink.select();
    document.execCommand('copy');
    
    // Hiển thị thông báo đã sao chép
    const button = document.querySelector('.result-box button');
    const originalText = button.textContent;
    button.textContent = 'Đã sao chép!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}
