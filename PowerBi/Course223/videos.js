// Session recordings only.
// Paste a OneDrive video iframe or its image-preview embed code.

const DAY_VIDEOS = {
  1: ``,
  2: ``,
  3: ``,
  4: ``,
  5: ``,
  6: ``,
  7: ``,
  8: ``,
  9: ``,
  10: ``
};

function getDayVideo(dayId) {
  const embed = DAY_VIDEOS[Number(dayId)] || ``;
  if (!embed.trim()) return ``;

  const template = document.createElement('template');
  template.innerHTML = embed.trim();
  const element = template.content.firstElementChild;
  if (element?.tagName !== 'IMG') return embed;

  // OneDrive's image-preview snippet uses the video share URL with size parameters.
  // Load the underlying share link in a player instead of displaying a still image.
  const url = new URL(element.getAttribute('src'), location.href);
  if (url.hostname !== '1drv.ms' || !url.pathname.startsWith('/v/')) return embed;
  url.searchParams.delete('width');
  url.searchParams.delete('height');

  const iframe = document.createElement('iframe');
  iframe.src = url.href;
  iframe.title = `تسجيل الجلسة ${Number(dayId)}`;
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
  iframe.setAttribute('loading', 'lazy');
  return iframe.outerHTML;
}

function hasDayVideo(dayId) {
  return Boolean(getDayVideo(dayId).trim());
}
