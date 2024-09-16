import { test, expect, Locator } from '@playwright/test';


/* - перейти на https://telemart.ua/ua/
 - перевірити що в каруселі знаходиться більше 2х елементів (використовуйте locator().all() і length) 
 - натиснути 2 рази на scroll каруселі 
 - клікнути на контект каруселі 
 - перевірити що навігація успішна  (подумайте як) 
  */

test('Check carousel slider has 2 elements', async ({ page }) => {
    await page.goto('https://telemart.ua/ua/');
    let buttonNext: Locator = page.locator('div.categories-slider div.swiper-button-next');

    let slidePrev: Locator = page.locator('a.swiper-slide-prev:not(.swiper-slide-duplicate)');
    let slideActive: Locator = page.locator('a.swiper-slide-active:not(.swiper-slide-duplicate)');
    let slideNext: Locator = page.locator('a.swiper-slide-next:not(.swiper-slide-duplicate)');
    let slides: {[key: string]: Locator} = {
        "slidePrev": slidePrev,
        "slideActive": slideActive,
        "slideNext": slideNext
    };

    async function getBannerIds(slides: {[key: string]: Locator}): Promise<{ [key: string]: string | null }> {
        let bannerIds: { [ key: string]: string | null } = {};
        
        for(let key in slides) {
            bannerIds[key] = await slides[key].getAttribute("data-banner-id");
        }
        return bannerIds;
    };

    let initialBannerIds = await getBannerIds(slides);
    await buttonNext.click();
    let currentBannerIds =  await getBannerIds(slides);
    expect(initialBannerIds.slideActive).toEqual(currentBannerIds.slidePrev);
    expect(initialBannerIds.slideNext).toEqual(currentBannerIds.slideActive);

    // Navigate to banner link and check the link is correct
    let sliderUrl: string | null = await slideActive.getAttribute('href');
    await slideActive.click();
    let currentUrl: string = page.url();
    let expectedUrl: string | undefined = sliderUrl?.split('ua/')[1];
    currentUrl = currentUrl?.split('/ua/')[1];
    expect(expectedUrl).toBe(currentUrl);
})
