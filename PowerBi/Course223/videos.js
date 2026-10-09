// Session recordings only.
// Paste a OneDrive video iframe or its image-preview embed code.

const DAY_VIDEOS = {
  1: `<iframe src="https://1drv.ms/v/c/a1a27fad04d192e9/IQQ1ap9rXHqTRIOXnbs6dHSyAU4SDPKYweIgT7t9-M3ZI-M" width="1920" height="1080" frameborder="0" scrolling="no" allowfullscreen></iframe>`,
  2: `<iframe src="https://1drv.ms/v/c/a1a27fad04d192e9/IQQdzObmVlepT7WOdE4uwMxvAYXzc2tIlFNgx_WoGPSjqpk" width="1920" height="1080" frameborder="0" scrolling="no" allowfullscreen></iframe>`,
  3: `<iframe src="https://1drv.ms/v/c/a1a27fad04d192e9/IQQbURQVtjzYTamX2kGOJUrYAb6y8D--6S4kD2mVi-nQhao" width="320" height="320" frameborder="0" scrolling="no" allowfullscreen></iframe>`,
  4: `<iframe src="https://1drv.ms/v/c/a1a27fad04d192e9/IQTeSmYgUTlvRJNAhC5MOPkXAWcguZovui8VamiwwKBRkgY" width="1920" height="1080" frameborder="0" scrolling="no" allowfullscreen></iframe>`,
  5: `<iframe src="https://1drv.ms/v/c/a1a27fad04d192e9/IQS3hrZmuNiZRZfNXGpV5aKSAVbJ-WXMggnKrb-G6xdGgfo" width="320" height="320" frameborder="0" scrolling="no" allowfullscreen></iframe>`,
  6: `<iframe src="https://1drv.ms/v/c/a1a27fad04d192e9/IQTPbrgcfrW-SKD7fSJlRBlfAdyP_9bD29CLpWD4uXWNBMU?width=1920&height=1080" width="1920" height="1080" frameborder="0" scrolling="no" allowfullscreen></iframe>`,
  7: `<iframe src="https://1drv.ms/v/c/a1a27fad04d192e9/IQQjxQg9CqBJTIZ_laB4hKQWAS5p3QlhLm96WEYqwMvAQes?width=1920&height=1080" width="1920" height="1080" frameborder="0" scrolling="no" allowfullscreen></iframe>`,
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
