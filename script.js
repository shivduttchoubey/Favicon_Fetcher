
        async function fetchFavicon() {
            const domain = document.getElementById('domain').value.trim();
            if (!domain) {
                alert('Please enter a domain.');
                return;
            }

            // Show loading
            document.getElementById('loading').style.display = 'flex';
            document.getElementById('faviconPreview').style.display = 'none';
            document.getElementById('downloadBtn').style.display = 'none';
            document.getElementById('generateSVGBtn').style.display = 'none';
            document.getElementById('svgContainer').style.display = 'none';

            try {
                const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                const faviconImg = document.getElementById('favicon');
                
                // Create a promise that resolves when the image loads
                const loadImage = new Promise((resolve, reject) => {
                    faviconImg.onload = resolve;
                    faviconImg.onerror = reject;
                });

                faviconImg.src = faviconUrl;
                await loadImage;

                document.getElementById('faviconPreview').style.display = 'block';
                document.getElementById('downloadBtn').style.display = 'inline-block';
                document.getElementById('generateSVGBtn').style.display = 'inline-block';
            } catch (error) {
                alert('Failed to load favicon. Please check the domain and try again.');
            } finally {
                document.getElementById('loading').style.display = 'none';
            }
        }

        async function downloadFavicon() {
            const domain = document.getElementById('domain').value;
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

            try {
                const response = await fetch(faviconUrl);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${domain}-favicon.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                alert('Failed to download favicon. Please try again.');
            }
        }

        async function generateSVG() {
            const domain = document.getElementById('domain').value;
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
            const svgContainer = document.getElementById('svgContainer');
            const svgCode = document.getElementById('svgCode');

            try {
                const response = await fetch(faviconUrl);
                const blob = await response.blob();
                const base64 = await blobToBase64(blob);
                
                const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
    <image href="data:image/png;base64,${base64}" width="128" height="128"/>
</svg>`;
                
                svgCode.value = svgTemplate;
                svgContainer.style.display = 'block';
            } catch (error) {
                alert('Failed to generate SVG. Please try again.');
            }
        }

        function blobToBase64(blob) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    resolve(base64String.split(',')[1]);
                };
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

        // Add enter key support for the input field
        document.getElementById('domain').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                fetchFavicon();
            }
        });
