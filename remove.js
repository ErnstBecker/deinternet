function disableShorts() {
	// Cards (home)
	document.querySelector("ytd-rich-section-renderer")?.remove()
	// Cards (search)
	document.querySelector("grid-shelf-view-model.ytGridShelfViewModelHost")?.remove()
	// Sidebar expanded and mini
	document.querySelector('#items a[title="Home"]')?.remove();
	document.querySelector('#items a[title="Shorts"]')?.remove();
}
function disableSidebarElements() {
	// Explore & More from YT & footer
	const sections = document.querySelectorAll("ytd-guide-section-renderer")
	if (sections.length >= 5) {
		sections[sections.length - 1]?.remove()
		sections[sections.length - 2]?.remove()
		sections[sections.length - 3]?.remove()
	}
	document.querySelector("#guide-renderer > div:nth-child(2)")?.remove()
}
function removeBloatedSearchs() {
	document.querySelector("ytd-horizontal-card-list-renderer.style-scope")?.remove()
	document.querySelector("ytd-shelf-renderer.style-scope > div")?.remove()
	// Shorts
	document.querySelectorAll('ytd-video-renderer').forEach(video => {
		const badge = video.querySelector('.yt-badge-shape__text');
		if (badge?.textContent.trim() === 'SHORTS') {
			video?.remove();
		}
	});
}
let timeout;
const obs = new MutationObserver(() => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		removeBloatedSearchs();
		disableShorts();
		disableSidebarElements();
	}, 100);
});
obs.observe(document.body, { childList: true, subtree: true });
