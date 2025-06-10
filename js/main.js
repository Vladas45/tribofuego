document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const closeMenu = document.getElementById('close-menu');

    hamburger.addEventListener('click', () => {
        fullscreenMenu.classList.remove('hidden');
        // Spustí animaci s malým zpožděním
        setTimeout(() => {
            fullscreenMenu.classList.remove('opacity-0', 'scale-95');
            fullscreenMenu.classList.add('opacity-100', 'scale-100');
        }, 10);
    });

    closeMenu.addEventListener('click', () => {
        fullscreenMenu.classList.remove('opacity-100', 'scale-100');
        fullscreenMenu.classList.add('opacity-0', 'scale-95');

        // Po skončení animace skryj prvek
        fullscreenMenu.addEventListener('transitionend', function hideMenu() {
            fullscreenMenu.classList.add('hidden');
            fullscreenMenu.removeEventListener('transitionend', hideMenu);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');
    const paginationControls = document.getElementById('pagination-controls');
    const pageHeight = 2500; // Fixed height for each page in px - stejné jako v CSS

    if (!contentContainer || !paginationControls) {
        console.error('Pagination: missing container or controls');
        return;
    }

    let pages = [];
    let currentPageIndex = 0;

    function paginateContent() {
        // Odstraníme staré stránky
        const oldPages = contentContainer.querySelectorAll('.page-content');
        oldPages.forEach(p => p.remove());
        pages = [];

        // Skryjeme originální sekce (budou jen pro klonování)
        const originalSections = Array.from(document.querySelectorAll('#content-container > .content-section'));

        // Temp div pro měření klonů
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';

        document.body.appendChild(tempDiv);


        let currentSections = [];
        let currentHeight = 0;

        for (const section of originalSections) {
            const clone = section.cloneNode(true);
            clone.style.display = 'block';
            tempDiv.appendChild(clone);
            const sectionHeight = clone.offsetHeight;
            tempDiv.innerHTML = '';

            // Pokud přidání sekce překročí stránku a stránka není prázdná, založíme novou
            if (currentHeight + sectionHeight > pageHeight && currentSections.length > 0) {
                createPage(currentSections);
                currentSections = [];
                currentHeight = 0;
            }

            currentSections.push(section);
            currentHeight += sectionHeight;
        }

        if (currentSections.length > 0) {
            createPage(currentSections);
        }

        document.body.removeChild(tempDiv);

        // Nastavíme kontejner
        contentContainer.style.height = pageHeight + 'px';
        contentContainer.style.position = 'relative';
        contentContainer.style.overflow = 'hidden';

        // Skryjeme originální sekce
        originalSections.forEach(sec => sec.style.display = 'none');

        // Zobrazíme první stránku
        pages.forEach(p => p.classList.remove('active'));
        if (pages.length > 0) pages[0].classList.add('active');

        generatePaginationButtons();
        updatePaginationButtonsState();
    }

    function createPage(sections) {
        const pageDiv = document.createElement('div');
        pageDiv.classList.add('page-content');
        // Přidáme klony sekcí na stránku
        sections.forEach(sec => {
            pageDiv.appendChild(sec.cloneNode(true));
        });
        contentContainer.appendChild(pageDiv);
        pages.push(pageDiv);
    }

    function generatePaginationButtons() {
        paginationControls.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.classList.add('pagination-button');
        prevBtn.onclick = () => showPage(currentPageIndex - 1);
        paginationControls.appendChild(prevBtn);

        // Numbered buttons
        pages.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.textContent = (i + 1).toString();
            btn.classList.add('pagination-button');
            btn.onclick = () => showPage(i);
            paginationControls.appendChild(btn);
        });

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.classList.add('pagination-button');
        nextBtn.onclick = () => showPage(currentPageIndex + 1);
        paginationControls.appendChild(nextBtn);
    }

    function showPage(index) {
        if (index < 0 || index >= pages.length) return;
        pages.forEach(p => p.classList.remove('active'));
        pages[index].classList.add('active');
        currentPageIndex = index;
        updatePaginationButtonsState();
    }

    function updatePaginationButtonsState() {
        const buttons = paginationControls.querySelectorAll('.pagination-button');
        buttons.forEach((btn, idx) => {
            if (idx === 0) { // Prev
                btn.disabled = currentPageIndex === 0;
            } else if (idx === buttons.length - 1) { // Next
                btn.disabled = currentPageIndex === pages.length - 1;
            } else { // Numbered
                btn.classList.toggle('active', (parseInt(btn.textContent, 10) - 1) === currentPageIndex);
            }
        });
    }

    paginateContent();
});