const LABELS = new Map<string, string>([
  ['.reel-controls button:first-child', 'Previous memory'],
  ['.reel-controls button:last-child', 'Next memory'],
  ['.timeline-controls > button:first-child', 'Previous chapter'],
  ['.timeline-controls > button:last-child', 'Next chapter'],
  ['.player-controls > button:nth-child(1)', 'Previous song'],
  ['.player-controls > button:nth-child(2)', 'Play or pause song'],
  ['.player-controls > button:nth-child(3)', 'Next song'],
  ['.player-controls > button:nth-child(4)', 'Toggle shuffle'],
  ['.player-controls > button:nth-child(5)', 'Toggle repeat'],
  ['.volume-row button', 'Mute or unmute song'],
  ['.close-button', 'Close memory'],
]);

function hasAccessibleName(button: HTMLButtonElement) {
  return Boolean(
    button.getAttribute('aria-label') ||
    button.getAttribute('aria-labelledby') ||
    button.getAttribute('title') ||
    button.textContent?.trim()
  );
}

function labelButtons(root: ParentNode = document) {
  root.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
    if (hasAccessibleName(button)) return;
    for (const [selector, label] of LABELS) {
      if (button.matches(selector)) {
        button.setAttribute('aria-label', label);
        break;
      }
    }
  });
}

function installAccessibilityFixes() {
  labelButtons();
  const observer = new MutationObserver(() => labelButtons());
  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', installAccessibilityFixes, { once: true });
} else {
  installAccessibilityFixes();
}
