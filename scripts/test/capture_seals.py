import sys
import os
from playwright.sync_api import sync_playwright

def capture_seals():
    os.makedirs("scripts/test/output", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # 1. Capture Navbar seal detail
        nav_brand = page.locator("header a.group").first
        if nav_brand.is_visible():
            nav_brand.screenshot(path="scripts/test/output/current_navbar_seal.png")
            print("Captured current_navbar_seal.png")

        # 2. Capture Footer seal detail
        footer_seal = page.locator("#footer div.pt-8").first
        if footer_seal.is_visible():
            footer_seal.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            footer_seal.screenshot(path="scripts/test/output/current_footer_seal.png")
            print("Captured current_footer_seal.png")

        browser.close()

if __name__ == "__main__":
    capture_seals()
