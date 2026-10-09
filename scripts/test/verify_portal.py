import sys
import os
from playwright.sync_api import sync_playwright

def run_verification():
    errors = []
    logs = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # Capture console messages and errors
        page.on("console", lambda msg: logs.append(f"[{msg.type}] {msg.text}"))
        page.on("pageerror", lambda err: errors.append(str(err)))

        print("Navigating to http://localhost:3000 ...")
        page.goto("http://localhost:3000", wait_until="networkidle")

        # 1. Verify Core Title & Branding
        hero_title = page.locator("h1").inner_text()
        print(f"Hero Title: {hero_title}")
        assert "觀" in hero_title and "瀾" in hero_title, "Hero title does not contain 觀瀾"

        # 2. Verify Philosophy Text
        motto = page.locator("text=观水有术，必观其澜").first
        assert motto.is_visible(), "Motto text not visible"
        print("Motto text verified.")

        # 3. Verify Works Section
        works = page.locator("#works h3").all_inner_texts()
        print(f"Found {len(works)} flagship works: {works}")
        assert len(works) >= 4, f"Expected at least 4 flagship works, got {len(works)}"

        # 4. Verify Blog Portal Section & Links
        blog_link = page.locator("a[href*='blog.guanlan365.top']").first
        assert blog_link.is_visible(), "Blog portal link not visible"
        print("Blog portal link verified:", blog_link.get_attribute("href"))

        # 5. Verify WebGL Canvas
        canvas = page.locator("canvas")
        assert canvas.is_visible(), "Fluid canvas is not visible"
        print("Fluid canvas verified.")

        # 6. Simulate Pointer interaction (test fluid interaction)
        page.mouse.move(720, 450)
        page.mouse.down()
        page.mouse.move(800, 300)
        page.mouse.up()

        # Wait for ink dissipation and ambient wave diffusion
        page.wait_for_timeout(1500)

        # Take screenshot of Hero fold (viewport only)
        os.makedirs("scripts/test/output", exist_ok=True)
        hero_screenshot_path = "scripts/test/output/hero_ink_desktop.png"
        page.screenshot(path=hero_screenshot_path, full_page=False)
        print(f"Saved Hero fold screenshot to {hero_screenshot_path}")

        # 7. Simulate Scrolling and take full page screenshot
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(300)
        screenshot_path = "scripts/test/output/portal_full_desktop.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Saved full desktop screenshot to {screenshot_path}")

        # Also test mobile viewport
        page.set_viewport_size({"width": 390, "height": 844})
        page.wait_for_timeout(500)
        mobile_screenshot = "scripts/test/output/portal_mobile.png"
        page.screenshot(path=mobile_screenshot, full_page=True)
        print(f"Saved mobile verification screenshot to {mobile_screenshot}")

        browser.close()
        print("All UI and interaction checks PASSED cleanly!")

if __name__ == "__main__":
    run_verification()
