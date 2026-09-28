import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    output_dir = "/Users/apple/projects/vetri-tncm-aios/docs/screenshots"
    os.makedirs(output_dir, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page = await context.new_page()

        print("Navigating to http://localhost:3000...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await asyncio.sleep(2)

        # 1. Executive Workspace
        print("Capturing 01_cm_executive_workspace.png...")
        await page.screenshot(path=os.path.join(output_dir, "01_cm_executive_workspace.png"))

        # 2. GRM Directory Tab
        print("Navigating to Gov Directory (GRM)...")
        grm_tab = page.locator('button:has-text("Gov Directory"), button:has-text("அரசு அடைவு")').first
        if await grm_tab.is_visible():
            await grm_tab.click()
            await asyncio.sleep(1.5)
            print("Capturing 02_enterprise_grm_directory.png...")
            await page.screenshot(path=os.path.join(output_dir, "02_enterprise_grm_directory.png"))

            # 3. 21-Tier Org Chart
            print("Navigating to Org Chart (21 Tiers)...")
            tree_tab = page.locator('button:has-text("Org Chart"), button:has-text("21-அடுக்கு")').first
            if await tree_tab.is_visible():
                await tree_tab.click()
                await asyncio.sleep(1.5)
                print("Capturing 03_grm_21tier_org_chart.png...")
                await page.screenshot(path=os.path.join(output_dir, "03_grm_21tier_org_chart.png"))

            # 4. AI Relationship Intel
            print("Navigating to AI Relationship Intel...")
            intel_tab = page.locator('button:has-text("AI Relationship"), button:has-text("AI கூட்ட")').first
            if await intel_tab.is_visible():
                await intel_tab.click()
                await asyncio.sleep(1.5)
                print("Capturing 04_ai_meeting_relationship_intel.png...")
                await page.screenshot(path=os.path.join(output_dir, "04_ai_meeting_relationship_intel.png"))

        # 5. Official Calendar Tab
        print("Navigating to Official Calendar...")
        cal_tab = page.locator('button:has-text("Official Calendar"), button:has-text("நாள்காட்டி")').first
        if await cal_tab.is_visible():
            await cal_tab.click()
            await asyncio.sleep(1.5)
            print("Capturing 05_official_calendar_appointments.png...")
            await page.screenshot(path=os.path.join(output_dir, "05_official_calendar_appointments.png"))

        await browser.close()
        print("All 5 screenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(main())
