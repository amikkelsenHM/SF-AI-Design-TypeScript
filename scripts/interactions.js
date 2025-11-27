document.addEventListener('DOMContentLoaded', () => {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  document.body.appendChild(toast);

  let toastTimeout;

  function showToast(html) {
    toast.innerHTML = html;
    toast.classList.add('show');
    
    if (toastTimeout) clearTimeout(toastTimeout);
    
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  function copyToClipboard(text) {
    // Use navigator.clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`<span class="toast-label">Copied:</span> ${text}`);
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
  }

  function fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
          const successful = document.execCommand('copy');
          if (successful) {
              showToast(`<span class="toast-label">Copied:</span> ${text}`);
          } else {
              showToast('Failed to copy');
          }
      } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
          showToast('Failed to copy');
      }

      document.body.removeChild(textArea);
  }

  // Color Swatches
  const colorSwatches = document.querySelectorAll('.color-swatch');
  colorSwatches.forEach(swatch => {
    swatch.style.cursor = 'pointer';
    swatch.setAttribute('title', 'Click to copy variable name');
    
    swatch.addEventListener('click', () => {
      const preview = swatch.querySelector('.color-preview');
      const style = preview.getAttribute('style');
      // Extract variable from "background: var(--variable-name)"
      const match = style.match(/var\(([^)]+)\)/);
      
      if (match && match[1]) {
        const variableName = match[1].trim();
        copyToClipboard(variableName);
      }
    });
  });

  // Typography
  const typographyRows = document.querySelectorAll('.typography-row');
  typographyRows.forEach(row => {
    row.style.cursor = 'pointer';
    row.setAttribute('title', 'Click to copy class name');
    
    row.addEventListener('click', () => {
      const label = row.querySelector('.typography-label');
      if (label) {
        const text = label.textContent.trim();
        copyToClipboard(text);
      }
    });
  });
});
