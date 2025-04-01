const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send('Vui lòng cung cấp URL');
    }

    try {
        const response = await axios.get(targetUrl);
        const html = response.data;
        const $ = cheerio.load(html);

        // Xóa thẻ og:image và các thẻ Open Graph khác
        $('meta[property="og:image"]').remove();
        $('meta[property^="og:"]').remove();

        res.send($.html());
    } catch (error) {
        res.status(500).send('Lỗi khi tải trang');
    }
});

app.listen(port, () => {
    console.log(`Proxy chạy tại http://localhost:${port}`);
});
