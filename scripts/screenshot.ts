const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the viewport to desktop size
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'dist/desktop.png' });

    // Set the viewport to tablet size
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'dist/tablet.png' });

    // Set the viewport to mobile size
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'dist/mobile.png' });

    await browser.close();
})();
