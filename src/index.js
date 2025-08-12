
    // Intersection Observer para revelar elementos
    (() => {
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting) e.target.classList.add('show');
        });
      },{threshold:0.12});
      document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
    })();

    // Modal logic
    const modal = document.getElementById('modal');
    const openBtns = [document.getElementById('openDemo'), document.getElementById('openDemo2')];
    const closeBtn = document.getElementById('closeModal');
    openBtns.forEach(b=>b&&b.addEventListener('click',()=>{ modal.style.display='flex'; modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }));
    closeBtn.addEventListener('click',closeModal);
    modal.querySelector('[data-close]').addEventListener('click',closeModal);
    function closeModal(){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); document.body.style.overflow='auto'; }
    document.addEventListener('keydown',e=>{ if(e.key==='Escape' && modal.style.display==='flex') closeModal(); });

    // Visual tilt (subtle 3D) on mousemove
    const visual = document.getElementById('visual');
    if(visual){
      const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));
      visual.addEventListener('mousemove', (ev)=>{
        const r = visual.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5; // -0.5..0.5
        const y = (ev.clientY - r.top) / r.height - 0.5;
        const rotX = clamp(-y * 8, -12, 12);
        const rotY = clamp(x * 12, -12, 12);
        visual.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
      });
      visual.addEventListener('mouseleave', ()=>{ visual.style.transform='none' });
    }

    // Smooth polyfill for anchors (modern browsers mostly supported)
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const href = a.getAttribute('href');
        if(href.length>1){
          e.preventDefault();
          document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
        }
      });
    });

