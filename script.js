// On attend que le document soit chargé
document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================================
    // 1. MENU BURGER
    // ============================================================
    const hamburger = document.querySelector(".hamburger");
    const sideMenu = document.querySelector(".side-menu");

    if (hamburger && sideMenu) {
        // Gestion du clic sur le burger
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            sideMenu.classList.toggle("active");
        });

        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll(".side-menu li a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                sideMenu.classList.remove("active");
            });
        });
    }

    // ============================================================
    // 2. STICKERS (EFFET SURVOL ET PRÉCHARGEMENT)
    // ============================================================
    const stickers = document.querySelectorAll('.sticker-img');

    // On exécute l'effet uniquement si l'appareil a une vraie souris !
    if (window.matchMedia("(hover: hover)").matches) {
        stickers.forEach(sticker => {
            const originalSrc = sticker.src;
            const hoverSrc = sticker.getAttribute('data-hover');

            if (hoverSrc) {
                // Préchargement de l'image pour éviter le clignotement
                const imgPreload = new Image();
                imgPreload.src = hoverSrc;

                sticker.addEventListener('mouseenter', () => {
                    sticker.src = hoverSrc;
                });

                sticker.addEventListener('mouseleave', () => {
                    sticker.src = originalSrc;
                });
            }
        });
    }

    // ============================================================
    // 3. MISE À JOUR DE L'ANNÉE (FOOTER)
    // ============================================================
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ============================================================
    // 4. SCROLL HORIZONTAL (SECTION PROJETS - ACCUEIL)
    // ============================================================
    const stickySection = document.querySelector('#projets');
    const scrollTrack = document.querySelector('.horizontal-scroll-track');

    if (stickySection && scrollTrack) {
        window.addEventListener('scroll', () => {
            // Si sur mobile (écran petit), on ne fait rien (géré par le CSS Scroll Snap)
            if (window.innerWidth > 768) {
                const offsetTop = stickySection.offsetTop;
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const sectionHeight = stickySection.offsetHeight;

                let percentage = (scrollY - offsetTop) / (sectionHeight - windowHeight);
                percentage = Math.max(0, Math.min(1, percentage));

                const trackWidth = scrollTrack.scrollWidth;
                const viewportWidth = window.innerWidth;
                const moveDistance = (trackWidth - viewportWidth + 300) * percentage;
                
                scrollTrack.style.transform = `translateX(-${moveDistance}px)`;
            }
        });
    }

    // ============================================================
    // 5. SLIDER HORIZONTAL À LA MOLETTE (PAGES PROJETS)
    // ============================================================
    const devContainer = document.querySelector('#projects-scroll-container');
    const devTrack = document.querySelector('.projects-track');

    if (devContainer && devTrack) {
        let currentScroll = 0;

        devContainer.addEventListener('wheel', (evt) => {
            // On ne l'active que sur les grands écrans pour ne pas bloquer le tactile
            if (window.innerWidth > 1024) {
                evt.preventDefault();
                const maxScroll = devTrack.scrollWidth - window.innerWidth;
                currentScroll += evt.deltaY;
                currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));
                devTrack.style.transform = `translate3d(-${currentScroll}px, 0, 0)`;
            }
        }, { passive: false }); // Autorise preventDefault proprement
    }

    // ============================================================
    // 6. GESTION VIDÉO (PAUSE AU SURVOL)
    // ============================================================
    const videos = document.querySelectorAll('.video-hover');

    // On exécute l'effet de pause au survol uniquement si l'appareil a une vraie souris !
    if (window.matchMedia("(hover: hover)").matches) {
        videos.forEach(video => {
            video.addEventListener('mouseenter', () => video.pause());
            video.addEventListener('mouseleave', () => video.play());
        });
    }
    
    // ============================================================
    // 7. BULLE CURSEUR LOGOS (COMPÉTENCES)
    // ============================================================
    const tooltip = document.getElementById('cursor-tooltip');
    const stackItems = document.querySelectorAll('.stack-item');

    // On ajoute la condition "hover: hover" ici aussi
    if (tooltip && stackItems.length > 0 && window.matchMedia("(hover: hover)").matches) {
        stackItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top = (e.clientY - 10) + 'px'; 
            });

            item.addEventListener('mouseenter', () => {
                const softwareName = item.getAttribute('data-name');
                if(softwareName) {
                    tooltip.textContent = softwareName; 
                    tooltip.classList.add('visible'); 
                }
            });

            item.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });
        });
    }

    // ============================================================
    // 8. ANIMATIONS AU SCROLL (INTERSECTION OBSERVER)
    // ============================================================
    const hiddenElements = document.querySelectorAll('.hidden-anim');
    
    if (hiddenElements.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.15, 
            rootMargin: "0px 0px -50px 0px" 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        hiddenElements.forEach((el) => observer.observe(el));
    }

    // ============================================================
    // 9. FORCER LA LECTURE DES VIDÉOS SUR MOBILE (Sécurité Safari/Chrome)
    // ============================================================
    const allVideos = document.querySelectorAll('video');
    
    allVideos.forEach(vid => {
        // On s'assure que le son est bien coupé (strictement obligatoire pour l'autoplay mobile)
        vid.muted = true;
        
        // On tente de forcer la lecture
        let playPromise = vid.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Si le navigateur bloque quand même (ex: Mode économie d'énergie), 
                // on évite de faire planter le reste du site et on l'affiche discrètement dans la console.
                console.log("Lecture automatique bloquée par le navigateur mobile :", error);
            });
        }
    });

});
