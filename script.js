async function fetchFavicon() {
    const domain = document.getElementById('domain').value;
    if (!domain) {
        alert('Please enter a domain.');
        return;
    }

    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    const faviconImg = document.getElementById('favicon');
    faviconImg.src = faviconUrl;
    faviconImg.style.display = 'block';

    document.getElementById('downloadBtn').style.display = 'inline-block';
    document.getElementById('generateSVGBtn').style.display = 'inline-block';
}

function downloadFavicon() {
    const domain = document.getElementById('domain').value;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    const link = document.createElement('a');
    link.href = faviconUrl;
    link.download = `${domain}-favicon.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function generateSVG() {
    const domain = document.getElementById('domain').value;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    const svgContainer = document.getElementById('svgContainer');
    const svgCode = document.getElementById('svgCode');

    const response = await fetch(faviconUrl);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);

    svgCode.value = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><image href="data:image/png;base64,${base64}" width="128" height="128"/></svg>`;
    svgContainer.style.display = 'block';
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

function copySVG() {
    const svgCode = document.getElementById('svgCode');
    svgCode.select();
    document.execCommand('copy');
    alert('SVG code copied to clipboard!');
}
