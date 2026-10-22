// Session recordings only.
// Paste a OneDrive video iframe or its image-preview embed code.

const DAY_VIDEOS = {
  1: `<iframe src="https://1drv.ms/v/c/a1a27fad04d192e9/IQTvbwGMn5m5S4-0cAYHajrHAXQvilO399MYC4ENpI4_XTs" width="1920" height="1080" frameborder="0" scrolling="no" title="تسجيل اليوم الأول" allow="autoplay; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
  2: `<iframe src="https://1drv.ms/v/c/a1a27fad04d192e9/IQQJZ5-LIv2OQ65KcBsn6J9pAZGY88Cy_lfSMbxSjApvH2E" width="1920" height="1080" frameborder="0" scrolling="no" title="تسجيل اليوم الثاني" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`,
  3: `<a class="mj-video-open" href="https://1drv.ms/v/c/a1a27fad04d192e9/IQTOH9dS2GSOT6vbVqcG8UVrAWjKFG2N9ysdGAEb5bUUYwo" target="_blank" rel="noopener noreferrer" aria-label="مشاهدة تسجيل اليوم الثالث على OneDrive"><span class="mj-video-open-play" aria-hidden="true"></span><strong>شاهد تسجيل اليوم الثالث</strong><span class="mj-video-open-action">فتح التسجيل ↗</span><small>يفتح في نافذة جديدة</small></a>`,
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

  // Accept a direct player/share URL as well as existing embed markup.
  if (/^https?:\/\/\S+$/i.test(embed.trim())) {
    const url = new URL(embed.trim());
    const directVideo = /\.(mp4|webm|ogg)$/i.test(url.pathname);
    const player = document.createElement(directVideo ? `video` : `iframe`);
    player.src = url.href;
    if (directVideo) { player.controls = true; player.preload = `metadata`; }
    else { player.title = `تسجيل المحاضرة ${Number(dayId)}`; player.setAttribute(`allowfullscreen`, ``); player.setAttribute(`allow`, `fullscreen; picture-in-picture`); }
    return player.outerHTML;
  }

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
