// Shared Tailwind Theme Config
if (window.tailwind) {
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        },
        colors: {
          surface: '#F8FAFC',
          paper: '#FFFFFF',
          subtle: '#F1F5F9',
          ink: '#0F172A',
          charcoal: '#1E293B',
          muted: '#64748B',
          borderlight: '#E2E8F0',
          accent: '#0D9488',
          accentdark: '#0F766E',
          slateaccent: '#0284C7'
        }
      }
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const activePage = document.body.getAttribute('data-page') || 'home';
  const email = 'ybendall2005@gmail.com';

  const navClass = (page) =>
    activePage === page
      ? 'px-3.5 py-2 rounded-full text-sm font-medium transition-all text-ink bg-subtle'
      : 'px-3.5 py-2 rounded-full text-sm font-medium transition-all text-muted hover:text-ink';

  // 1. Inject Shared Header (Root-relative "/" links never stack!)
  const headerPlaceholder = document.getElementById('site-header');
  if (headerPlaceholder) {
    headerPlaceholder.outerHTML = `
      <header class="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-borderlight">
        <div class="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between gap-4">
          <a href="/" class="text-left group focus:outline-none flex items-center gap-3">
            <span class="text-xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors">Yuri</span>
            <span class="hidden sm:inline-block text-xs text-muted font-normal border-l border-borderlight pl-3">
              Materials Engineering &amp; Mechatronic Systems
            </span>
          </a>
          <nav class="flex items-center gap-1 sm:gap-2">
            <a href="/" class="${navClass('home')}">Home</a>
            <a href="/work" class="${navClass('work')}">Work</a>
            <a href="/about" class="${navClass('about')}">About</a>
            <a href="#section-contact" class="px-3.5 py-2 rounded-full text-sm font-medium transition-all text-muted hover:text-ink">Contact</a>
            <div class="h-4 w-px bg-borderlight mx-1 hidden sm:block"></div>
            <a href="/assets/Yuri Bendall CV.pdf" download class="p-2 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-medium border border-borderlight bg-paper text-charcoal hover:border-ink/40 transition-all flex items-center gap-1.5" title="Download CV">
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-accent"></i>
              <span class="hidden md:inline">Download CV</span>
            </a>
          </nav>
        </div>
      </header>
    `;
  }

  // 2. Inject Shared Contact Section & Footer
  const footerPlaceholder = document.getElementById('site-footer');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = `
      <section id="section-contact" class="bg-paper border-t border-borderlight py-16 sm:py-20">
        <div class="max-w-6xl mx-auto px-5 sm:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-7 space-y-3">
              <p class="text-xs font-semibold uppercase tracking-widest text-accent">Contact</p>
              <h2 class="text-2xl sm:text-4xl font-semibold text-ink tracking-tight">
                Let’s talk about materials, hardware, or new opportunities.
              </h2>
              <p class="text-sm sm:text-base text-muted leading-relaxed max-w-xl">
                Whether you want to chat about a project or discuss internship opportunities, feel free to reach out directly.
              </p>
            </div>
            <div class="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 sm:items-center lg:items-end">
              <div class="w-full sm:w-auto min-w-[280px] p-5 rounded-2xl bg-surface border border-borderlight space-y-3">
                <div class="text-xs text-muted font-medium">Direct Email</div>
                <div class="text-base font-semibold text-ink break-all">${email}</div>
                <div class="flex items-center gap-2 pt-1">
                  <a href="mailto:${email}" class="flex-1 py-2.5 px-4 rounded-xl bg-ink text-paper text-xs font-medium text-center hover:bg-charcoal transition-colors">
                    Send Email
                  </a>
                  <button id="copyEmailBtn" class="py-2.5 px-4 rounded-xl bg-paper text-ink border border-borderlight text-xs font-medium hover:border-ink/40 transition-colors">
                    Copy Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="bg-surface border-t border-borderlight py-8">
        <div class="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-ink">Yuri</span>
            <span>·</span>
            <span>Materials Engineering &amp; Mechatronic Systems Portfolio</span>
          </div>
          <div class="flex items-center gap-5">
            <a href="/" class="hover:text-ink transition-colors">Home</a>
            <a href="/work" class="hover:text-ink transition-colors">Work</a>
            <a href="/about" class="hover:text-ink transition-colors">About</a>
            <a href="https://linkedin.com/in/yuribendall" target="_blank" class="text-accent hover:underline font-medium">LinkedIn</a>
          </div>
        </div>
      </footer>
    `;
  }

  // 3. Copy Email Button
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(email);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy Address'), 1800);
    });
  }

  // 4. Category Filter Buttons on work page
  const filterButtons = document.querySelectorAll('[data-work-filter]');
  const workCards = document.querySelectorAll('[data-project-category]');
  if (filterButtons.length && workCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-work-filter');
        filterButtons.forEach((b) => {
          b.className = 'work-filter-btn px-4 py-2 rounded-full text-xs font-medium bg-paper text-muted border border-borderlight hover:text-ink transition-all';
        });
        btn.className = 'work-filter-btn px-4 py-2 rounded-full text-xs font-medium bg-ink text-paper transition-all';

        let visibleCount = 0;
        workCards.forEach((card) => {
          const matches = selected === 'all' || card.getAttribute('data-project-category') === selected;
          card.classList.toggle('hidden', !matches);
          if (matches) visibleCount++;
        });

        let idx = 1;
        workCards.forEach((card) => {
          if (!card.classList.contains('hidden')) {
            const badge = card.querySelector('.project-index-badge');
            if (badge) badge.textContent = `0${idx} / 0${visibleCount}`;
            idx++;
          }
        });
      });
    });
  }

  if (window.lucide) window.lucide.createIcons();
});
