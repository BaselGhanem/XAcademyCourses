const HOME_COPY = {
  ar: {
    eyebrow: `X · ACADEMY`,
    title: `استثمار حقيقي<br>في مستقبلك`,
    body: `تعلم مهارات عملية مطلوبة في سوق العمل<br>مع محتوى مبني على خبرة واقعية وتجربة حقيقية.`,
    benefits: [
      {
        title: `آلاف المتدربين`,
        note: `وثقوا تجربتنا`,
        icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
      },
      {
        title: `مهارات عملية`,
        note: `تحدث فرقًا في عملك`,
        icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 4 8-9"/><path d="M14 6h7v7"/></svg>`
      },
      {
        title: `تجربة تعليمية`,
        note: `بأسلوب بسيط وممتع`,
        icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
      }
    ]
  },
  en: {
    eyebrow: `X · ACADEMY`,
    title: `A real investment<br>in your future`,
    body: `Build practical skills that matter in today’s workplace<br>through content grounded in real experience and real application.`,
    benefits: [
      {
        title: `Thousands trained`,
        note: `and trusted the experience`,
        icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
      },
      {
        title: `Practical skills`,
        note: `that make a difference at work`,
        icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 4 8-9"/><path d="M14 6h7v7"/></svg>`
      },
      {
        title: `Better learning`,
        note: `clear, simple, and engaging`,
        icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
      }
    ]
  }
};

function patchHome() {
  const hero = document.querySelector(`.home-hero`);
  if (!hero) return;

  const screen = hero.closest(`.screen`);
  const lang = screen?.classList.contains(`en`) ? `en` : `ar`;
  const copy = HOME_COPY[lang];
  const copyPanel = hero.querySelector(`.home-copy`);
  if (!copyPanel) return;

  const eyebrow = copyPanel.querySelector(`.eyebrow`);
  const title = copyPanel.querySelector(`h1`);
  const body = copyPanel.querySelector(`:scope > p`);
  const benefits = copyPanel.querySelector(`.home-micro`);
  const visual = hero.querySelector(`.home-visual`);

  if (eyebrow && eyebrow.dataset.homeV9 !== lang) {
    eyebrow.textContent = copy.eyebrow;
    eyebrow.dataset.homeV9 = lang;
  }

  if (title && title.dataset.homeV9 !== lang) {
    title.innerHTML = copy.title;
    title.dataset.homeV9 = lang;
  }

  if (body && body.dataset.homeV9 !== lang) {
    body.innerHTML = copy.body;
    body.dataset.homeV9 = lang;
  }

  if (benefits && benefits.dataset.homeV9 !== lang) {
    benefits.innerHTML = copy.benefits.map((item) => `
      <span class="home-benefit">
        <span class="benefit-icon">${item.icon}</span>
        <strong>${item.title}</strong>
        <small>${item.note}</small>
      </span>
    `).join(``);
    benefits.dataset.homeV9 = lang;
  }

  if (visual && !visual.querySelector(`.home-dots`)) {
    visual.insertAdjacentHTML(`beforeend`, `
      <span class="home-dots" aria-hidden="true">
        <i></i><i></i><i></i>
      </span>
    `);
  }
}

let patchQueued = false;
function queuePatch() {
  if (patchQueued) return;
  patchQueued = true;
  requestAnimationFrame(() => {
    patchQueued = false;
    patchHome();
  });
}

const observer = new MutationObserver(queuePatch);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: [`class`, `lang`, `dir`]
});

document.addEventListener(`DOMContentLoaded`, queuePatch, { once: true });
queuePatch();
