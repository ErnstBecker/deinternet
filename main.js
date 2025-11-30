const style = document.createElement('style');
style.textContent = `
	ytd-rich-section-renderer,
	grid-shelf-view-model.ytGridShelfViewModelHost,
	#items a[title="Home"],
	#items a[title="Shorts"],
	ytd-horizontal-card-list-renderer.style-scope,
	ytd-shelf-renderer.style-scope > div {
		display: none !important;
	}
`;
document.head.appendChild(style);

function disableShorts() {
	document.querySelectorAll("ytd-rich-section-renderer, grid-shelf-view-model.ytGridShelfViewModelHost, #items a[title='Home'], #items a[title='Shorts']").forEach(el => {
		el.style.display = 'none';
		setTimeout(() => el.remove(), 1000);
	});
}
function disableSidebarElements() {
	const sections = document.querySelectorAll("ytd-guide-section-renderer");
	if (sections.length >= 5) {
		[sections[sections.length - 1], sections[sections.length - 2], sections[sections.length - 3]].forEach(section => {
			section.style.display = 'none';
			setTimeout(() => section.remove(), 1000);
		});
	}
	const footer = document.querySelector("#guide-renderer > div:nth-child(2)");
	if (footer) {
		footer.style.display = 'none';
		setTimeout(() => footer.remove(), 1000);
	}
}
function removeBloatedSearchs() {
	document.querySelectorAll("ytd-horizontal-card-list-renderer.style-scope, ytd-shelf-renderer.style-scope > div").forEach(el => {
		el.style.display = 'none';
		setTimeout(() => el.remove(), 1000);
	});
	document.querySelectorAll('ytd-video-renderer').forEach(video => {
		const badge = video.querySelector('.yt-badge-shape__text');
		if (badge?.textContent.trim() === 'SHORTS') {
			video.style.display = 'none';
			setTimeout(() => video.remove(), 1000);
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
