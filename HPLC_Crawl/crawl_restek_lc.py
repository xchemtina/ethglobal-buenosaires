from playwright.sync_api import sync_playwright
import os
import time

BASE = "https://www.restek.com"
OUT = "restek_LC_pdfs"
os.makedirs(OUT, exist_ok=True)

LIST_PAGES = [
    f"https://www.restek.com/global/en/chromatogram-library/?s=type:LC&Nrpp=48&No={i}"
    for i in range(0, 8 * 48, 48)
]

def main():
    with sync_playwright() as p:
        browser = p.firefox.launch(headless=False)   # use headless=True later
        page = browser.new_page()

        detail_links = set()

        # Step 1 — discover all chromatogram detail URLs
        for lp in LIST_PAGES:
            print(f"[+] Loading listing: {lp}")
            page.goto(lp, wait_until="networkidle")
            time.sleep(0.5)

            anchors = page.locator("a[href*='chromatogram-detail/LC_']")
            for i in range(anchors.count()):
                href = anchors.nth(i).get_attribute("href")
                if href:
                    detail_links.add(BASE + href)

        detail_links = sorted(list(detail_links))
        print(f"[✓] Found {len(detail_links)} LC chromatograms")

        # Step 2 — download PDFs using Playwright download API
        for url in detail_links:
            cid = url.split("/")[-1]
            print(f"[•] {cid}")

            page.goto(url, wait_until="networkidle")
            time.sleep(0.5)

            # Find the PDF link
            pdf_link = page.locator("a[href$='.pdf']").first
            if pdf_link.count() == 0:
                print(f"[!] No PDF on page for {cid}")
                continue

            with page.expect_download() as dl_info:
                pdf_link.click()

            download = dl_info.value
            savepath = os.path.join(OUT, f"{cid}.pdf")
            download.save_as(savepath)

            print(f"    [✓] Saved {savepath}")

        browser.close()

if __name__ == "__main__":
    main()
