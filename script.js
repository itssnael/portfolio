// On attend que le document soit chargé
document.addEventListener('DOMContentLoaded', () => {
    
    // --- PARTIE MENU BURGER ---
    const hamburger = document.querySelector(".hamburger");
    const sideMenu = document.querySelector(".side-menu");

    if (hamburger && sideMenu) { // Sécurité : on vérifie que le menu existe
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

    // --- PARTIE STICKER (IMAGE SURVOL) ---
    // --- PARTIE STICKERS (GÉRER TOUS LES STICKERS) ---
    // On utilise querySelectorAll pour prendre TOUTES les images, pas juste la première
    const stickers = document.querySelectorAll('.sticker-img');

    stickers.forEach(sticker => {
        // 1. Récupérer les sources pour CHAQUE sticker
        const originalSrc = sticker.src;
        const hoverSrc = sticker.getAttribute('data-hover');

        // Sécurité : on ne fait rien si data-hover est vide
        if (hoverSrc) {
            // 2. Préchargement
            const imgPreload = new Image();
            imgPreload.src = hoverSrc;

            // 3. Animation au survol
            sticker.addEventListener('mouseenter', () => {
                sticker.src = hoverSrc;
            });

            // 4. Retour à la normale
            sticker.addEventListener('mouseleave', () => {
                sticker.src = originalSrc;
            });
        }
    });

    // Met à jour l'année automatiquement dans le footer
document.getElementById("year").textContent = new Date().getFullYear();

// --- PARTIE SCROLL HORIZONTAL (PROJETS) ---
    const stickySection = document.querySelector('#projets');
    const stickyHeader = document.querySelector('.sticky-wrapper');
    const scrollTrack = document.querySelector('.horizontal-scroll-track');

    if (stickySection && scrollTrack) {
        window.addEventListener('scroll', () => {
            // 1. On récupère la position de la section par rapport au haut de l'écran
            const offsetTop = stickySection.offsetTop;
            // 2. On regarde combien on a scrollé depuis le haut du site
            const scrollY = window.scrollY;
            // 3. On récupère la hauteur de la fenêtre
            const windowHeight = window.innerHeight;
            // 4. On récupère la hauteur totale de la section Projets
            const sectionHeight = stickySection.offsetHeight;

            // --- CALCUL DU POURCENTAGE ---
            // On calcule où on est "dans" la section (entre 0 et 1)
            // On commence à scroller quand le haut de la section touche le haut de l'écran
            let percentage = (scrollY - offsetTop) / (sectionHeight - windowHeight);

            // On borne le pourcentage entre 0 et 1 pour éviter que ça parte trop loin
            percentage = Math.max(0, Math.min(1, percentage));

            // --- CALCUL DU DÉPLACEMENT ---
            // On veut que le rail bouge vers la gauche.
            // Distance à parcourir = Largeur totale du rail - Largeur de l'écran
            const trackWidth = scrollTrack.scrollWidth;
            const viewportWidth = window.innerWidth;
            
            // Si sur mobile (écran petit), on ne fait rien (géré par CSS)
            if (window.innerWidth > 768) {
                const moveDistance = (trackWidth - viewportWidth + 300) * percentage; // +100 pour un peu de marge fin
                
                // On applique le déplacement négatif (vers la gauche)
                scrollTrack.style.transform = `translateX(-${moveDistance}px)`;
            }
        });
    }

    // ============================================================
    // 6. SLIDER HORIZONTAL (SANS SCROLLBAR VERTICALE)
    // ============================================================
    const devContainer = document.querySelector('#projects-scroll-container');
    const devTrack = document.querySelector('.projects-track');

    if (devContainer && devTrack) {
        
        // Variable pour stocker la position actuelle (en pixels)
        let currentScroll = 0;

        // On écoute l'événement "wheel" (molette de la souris)
        devContainer.addEventListener('wheel', (evt) => {
            // Empêche le comportement par défaut (si jamais)
            evt.preventDefault();

            // Calcul de la limite max (Largeur totale - Largeur écran)
            const maxScroll = devTrack.scrollWidth - window.innerWidth;

            // On ajoute le mouvement de la molette (deltaY) à notre position
            // evt.deltaY est positif quand on descend, négatif quand on monte
            currentScroll += evt.deltaY;

            // On empêche d'aller trop loin (pas moins de 0, pas plus que max)
            currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));

            // On applique le déplacement
            devTrack.style.transform = `translate3d(-${currentScroll}px, 0, 0)`;
        });
    }

    // ============================================================
    // 7. GESTION VIDÉO (PAUSE AU SURVOL)
    // ============================================================
    const videos = document.querySelectorAll('.video-hover');

    videos.forEach(video => {
        // Quand la souris entre sur la vidéo -> PAUSE
        video.addEventListener('mouseenter', () => {
            video.pause();
        });

        // Quand la souris quitte la vidéo -> LECTURE
        video.addEventListener('mouseleave', () => {
            video.play();
        });
    });
    
});