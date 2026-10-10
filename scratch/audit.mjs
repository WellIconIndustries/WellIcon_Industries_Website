import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9222;
const SITE_DIR = "/Users/uttam4439/Downloads/WellIcon_Industries_Website";
const ARTIFACT_DIR = "/Users/uttam4439/.gemini/antigravity/brain/c571950f-4b96-480f-8850-dc94404b969e";

const VIEWPORTS = [
  { name: "small_mobile", width: 320, height: 568 },
  { name: "standard_mobile", width: 375, height: 812 },
  { name: "large_mobile", width: 430, height: 932 },
  { name: "small_tablet", width: 600, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "large_tablet", width: 1024, height: 1366 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "large_desktop", width: 1920, height: 1080 }
];

const PAGES = ["index.html", "men.html", "women.html", "accessories.html", "wishlist.html", "cart.html"];

async function run() {
  const profileDir = path.join(SITE_DIR, 'scratch', 'chrome_profile_node');
  fs.mkdirSync(profileDir, { recursive: true });

  console.log("Launching Chrome...");
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profileDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--mute-audio"
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

  if (!wsUrl) {
    console.error("Failed to connect to Chrome CDP");
    chrome.kill();
    process.exit(1);
  }

  console.log("Connected to Chrome CDP:", wsUrl);

  // Get list of targets to get default page target
  const targetsRes = await fetch(`http://localhost:${PORT}/json/list`);
  const targets = await targetsRes.json();
  const pageTarget = targets.find(t => t.type === 'page');

  if (!pageTarget) {
    console.error("No page target found");
    chrome.kill();
    process.exit(1);
  }

  const pageWsUrl = pageTarget.webSocketDebuggerUrl;
  const pageWs = new WebSocket(pageWsUrl);
  await new Promise(res => pageWs.addEventListener('open', res));

  let msgId = 1;
  const pagePending = new Map();
  pageWs.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pagePending.has(msg.id)) {
      pagePending.get(msg.id)(msg);
      pagePending.delete(msg.id);
    }
  });

  function sendPage(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      pagePending.set(id, resolve);
      pageWs.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendPage('Page.enable');
  await sendPage('DOM.enable');
  await sendPage('Runtime.enable');

  const auditResults = [];

  for (const pageName of PAGES) {
    const fileUrl = `file://${path.join(SITE_DIR, pageName)}`;
    console.log(`\n--- Auditing Page: ${pageName} ---`);

    for (const vp of VIEWPORTS) {
      await sendPage('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768
      });

      await sendPage('Page.navigate', { url: fileUrl });
      await new Promise(r => setTimeout(r, 600));

      const evalRes = await sendPage('Runtime.evaluate', {
        expression: `(() => {
          const docWidth = document.documentElement.clientWidth;
          const scrollWidth = document.documentElement.scrollWidth;
          const bodyWidth = document.body.scrollWidth;
          
          const overflowingElements = [];
          const allEls = document.querySelectorAll('*');
          allEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 3) {
              overflowingElements.push({
                tag: el.tagName,
                id: el.id,
                className: (el.className && typeof el.className === 'string') ? el.className.substring(0, 60) : '',
                right: Math.round(rect.right),
                overflowAmount: Math.round(rect.right - docWidth)
              });
            }
          });

          const brokenImages = [];
          document.querySelectorAll('img').forEach(img => {
            if (!img.complete || img.naturalWidth === 0) {
              brokenImages.push(img.src);
            }
          });

          const smallTouchTargets = [];
          document.querySelectorAll('button, a, input, select').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && (rect.width < 32 || rect.height < 32)) {
              smallTouchTargets.push({
                tag: el.tagName,
                text: el.textContent.trim().substring(0, 20),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              });
            }
          });

          return {
            docWidth,
            scrollWidth,
            bodyWidth,
            hasHorizontalOverflow: scrollWidth > docWidth + 3,
            overflowAmount: Math.max(0, scrollWidth - docWidth),
            overflowingElementsCount: overflowingElements.length,
            overflowingElements: overflowingElements.slice(0, 8),
            brokenImagesCount: brokenImages.length,
            brokenImages,
            smallTouchTargetsCount: smallTouchTargets.length,
            smallTouchTargets: smallTouchTargets.slice(0, 5)
          };
        })()`,
        returnByValue: true
      });

      const metrics = evalRes.result ? evalRes.result.value : null;

      const shotRes = await sendPage('Page.captureScreenshot', { format: 'png', fullPage: false });
      const shotPath = path.join(ARTIFACT_DIR, `audit_${pageName.replace('.html','')}_${vp.name}.png`);
      if (shotRes.result && shotRes.result.data) {
        fs.writeFileSync(shotPath, Buffer.from(shotRes.result.data, 'base64'));
      }

      auditResults.push({
        page: pageName,
        viewport: vp.name,
        width: vp.width,
        height: vp.height,
        metrics,
        screenshot: shotPath
      });

      console.log(`[${vp.name} (${vp.width}x${vp.height})] Overflow: ${metrics?.hasHorizontalOverflow ? `YES (+${metrics.overflowAmount}px)` : 'NO'}, Broken Imgs: ${metrics?.brokenImagesCount}, Overflowing Els: ${metrics?.overflowingElementsCount}`);
    }
  }

  fs.writeFileSync(path.join(SITE_DIR, 'scratch', 'audit_report.json'), JSON.stringify(auditResults, null, 2));
  console.log("\nAudit finished! Report saved to scratch/audit_report.json");

  pageWs.close();
  chrome.kill();
  process.exit(0);
}

run().catch(err => {
  console.error("Audit error:", err);
  process.exit(1);
});
