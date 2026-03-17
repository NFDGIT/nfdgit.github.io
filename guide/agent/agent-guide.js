(function () {
  initScrollSpy();
  initCopyButtons();
  initKnowledgeToggles();
  initSmoothScroll();

  function initScrollSpy() {
    var links = document.querySelectorAll('.agent-progress-link');
    var sections = document.querySelectorAll('.agent-step');
    if (!sections.length || !links.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (link) {
          var isMatch = link.getAttribute('href') === '#' + id;
          link.classList.toggle('is-active', isMatch);
        });
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function initCopyButtons() {
    document.querySelectorAll('.agent-copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var codeBlock = btn.closest('.agent-code-block');
        var code = codeBlock.querySelector('code');
        if (!code) return;

        var text = code.textContent;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = '已复制';
          btn.classList.add('is-copied');
          setTimeout(function () {
            btn.textContent = '复制';
            btn.classList.remove('is-copied');
          }, 1800);
        });
      });
    });
  }

  function initKnowledgeToggles() {
    document.querySelectorAll('.agent-knowledge-toggle').forEach(function (btn) {
      var body = btn.nextElementSibling;
      if (!body || !body.classList.contains('agent-knowledge-body')) return;

      btn.addEventListener('click', function () {
        var isOpen = btn.classList.toggle('is-open');
        body.classList.toggle('is-open', isOpen);

        if (isOpen) {
          body.style.maxHeight = body.scrollHeight + 'px';
        } else {
          body.style.maxHeight = '0';
        }
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('.agent-progress-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }
})();
