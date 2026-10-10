import subprocess
import time
import json
import urllib.request
import urllib.parse
import os
import sys

CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 9222
SCRATCH_DIR = "/Users/uttam4439/.gemini/antigravity/brain/c571950f-4b96-480f-8850-dc94404b969e"
SITE_DIR = "/Users/uttam4439/Downloads/WellIcon_Industries_Website"

VIEWPORTS = [
    {"name": "small_mobile", "width": 320, "height": 568},
    {"name": "standard_mobile", "width": 375, "height": 812},
    {"name": "large_mobile", "width": 430, "height": 932},
    {"name": "small_tablet", "width": 600, "height": 900},
    {"name": "tablet", "width": 768, "height": 1024},
    {"name": "large_tablet", "width": 1024, "height": 1366},
    {"name": "laptop", "width": 1280, "height": 800},
    {"name": "desktop", "width": 1440, "height": 900},
    {"name": "large_desktop", "width": 1920, "height": 1080},
]

PAGES = ["index.html", "men.html", "women.html", "accessories.html", "wishlist.html", "cart.html"]

def start_chrome():
    user_data = os.path.join(SITE_DIR, "scratch", "chrome_audit_profile")
    os.makedirs(user_data, exist_ok=True)
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--remote-debugging-port=9222",
        f"--user-data-dir={user_data}",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-gpu",
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)
    return proc

def get_targets():
    req = urllib.request.urlopen(f"http://localhost:{PORT}/json")
    return json.loads(req.read().decode())

def create_tab(url):
    target_url = f"http://localhost:{PORT}/json/new?{urllib.parse.quote(url)}"
    req = urllib.request.urlopen(target_url)
    return json.loads(req.read().decode())

def close_tab(target_id):
    urllib.request.urlopen(f"http://localhost:{PORT}/json/close/{target_id}")

print("Script template ready")
