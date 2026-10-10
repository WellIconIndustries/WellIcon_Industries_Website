import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9222;
const SITE_DIR = "/Users/uttam4439/Downloads/WellIcon_Industries_Website";

const PAGES = ["index.html", "men.html", "women.html", "accessories.html", "wishlist.html", "cart.html"];

async function run() {
  const profileDir = path.join(SITE_DIR, 'scratch', 'chrome_profile_scroll_test');
  fs.mkdirSync(profileDir, { recursive: true });

  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profileDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu"
  ], { stdio: 'ignore' });

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await fetch(`http://localhost:${PORT}/json/version`);
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  const targetsRes = await fetch(`http://localhost:${PORT}/json/list`);
  const targets = await targetsRes.json();
  const pageTarget = targets.find(t => t.type === 'page');

  const pageWs = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(res => pageWs.addEventListener('open', res));

  let msgId = 1;
  const pending = new Map();
  pageWs.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });

  function sendPage(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      pending.set(id, resolve);
      pageWs.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendPage('Page.enable');
  await sendPage('Runtime.enable');

  for (const pageName of PAGES) {
    const fileUrl = `file://${path.join(SITE_DIR, pageName)}`;
    await sendPage('Page.navigate', { url: fileUrl });
    await new Promise(r => setTimeout(r, 1500));

    const res = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        window.scrollTo(0, 500);
        return JSON.stringify({
          page: '${pageName}',
          scrollY: window.scrollY,
          scrollHeight: document.body.scrollHeight,
          clientHeight: document.documentElement.clientHeight,
          overflowYHTML: window.getComputedStyle(document.documentElement).overflowY,
          overflowYBody: window.getComputedStyle(document.body).overflowY
        });
      })()`,
      returnByValue: true
    });

    const rawVal = res.result?.result?.value || res.result?.value;
    if (rawVal) {
      const info = JSON.parse(rawVal);
      console.log(`[${pageName}] ScrollY: ${info.scrollY}px / Total Height: ${info.scrollHeight}px (Viewport: ${info.clientHeight}px) | HTML OverflowY: ${info.overflowYHTML}, Body OverflowY: ${info.overflowYBody}`);
    } else {
      console.log(`[${pageName}] Raw CDP Response:`, JSON.stringify(res));
    }
  }

  pageWs.close();
  chrome.kill();
  process.exit(0);
}

run().catch(err => {
  console.error("Scroll test error:", err);
  process.exit(1);
});
