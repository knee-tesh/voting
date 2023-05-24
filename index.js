import puppeteer from "puppeteer";

let count = 0;
const vote = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
        console.log("launching page to vote");
        await page.goto("https://www.cutebabyvote.com/may-2023/?contest=photo-detail&photo_id=244187", {
            waitUntil: "networkidle2",
        });
        await page.screenshot({
            path: `./screenshots/${Date.now()}.jpg`,
            type: "jpeg",
            quality: 100,
            fullPage: true,
        });

        // CLICK TO VOTE
        const [clickDiv] = await page.$x("//div[@class='pc-image-info-box-button-btn photo_vote pc-show']");
        await clickDiv.click();

        // Print the full title
        count += 1;
        console.log("voted", count);

        await browser.close();
    } catch (error) {
        console.log(error);
        await browser.close();
    }
};
vote();
const inter = setInterval(vote, 31 * 60 * 1000);
