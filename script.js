/**
 * BUK Unboxing Waldhausen - Main Script
 */

class UnboxingApp {
    constructor() {
        this.itemsTrack = document.getElementById('itemsTrack');
        this.rollButton = document.getElementById('rollButton');
        this.rewardsLeft = document.getElementById('rewardsLeft');
        this.rewardsRight = document.getElementById('rewardsRight');
        this.wonItemDisplay = document.getElementById('wonItemDisplay');
        this.wonItemImage = document.getElementById('wonItemImage');
        this.wonItemName = document.getElementById('wonItemName');
        this.wonItemRarity = document.getElementById('wonItemRarity');
        this.wonContent = document.getElementById('wonContent');
        this.itemPreview = document.getElementById('itemPreview');
        this.previewImage = document.getElementById('previewImage');
        this.previewName = document.getElementById('previewName');
        this.previewRarity = document.getElementById('previewRarity');

        this.isSpinning = false;
        this.itemWidth = 200; // Breite eines Items in px
        this.totalItems = 60; // Anzahl der Items im Track

        this.init();
    }

    init() {
        this.renderSidebars();
        this.setupEventListeners();
        this.prepareTrack();
    }

    /**
     * Wählt ein Item basierend auf Gewichtung
     */
    getWeightedRandomItem() {
        const totalWeight = ITEMS.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;

        for (const item of ITEMS) {
            random -= item.weight;
            if (random <= 0) {
                return item;
            }
        }
        return ITEMS[ITEMS.length - 1];
    }

    /**
     * Erstellt ein Item-Element für den Track
     */
    createTrackItem(item) {
        const div = document.createElement('div');
        div.className = `roll-item rarity-${item.rarity}`;
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22 rx=%2210%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23555%22 font-size=%2210%22>?</text></svg>'">
            <span>${item.name}</span>
        `;
        return div;
    }

    /**
     * Bereitet den Track mit Items vor
     */
    prepareTrack() {
        this.itemsTrack.innerHTML = '';
        this.itemsTrack.style.transition = 'none';
        this.itemsTrack.style.transform = 'translateX(0)';

        for (let i = 0; i < this.totalItems; i++) {
            const item = this.getWeightedRandomItem();
            this.itemsTrack.appendChild(this.createTrackItem(item));
        }
    }

    /**
     * Rendert die Items in den Sidebars links und rechts (je 5 Items)
     */
    renderSidebars() {
        this.rewardsLeft.innerHTML = '';
        this.rewardsRight.innerHTML = '';

        const rarityOrder = ['stier', 'legendary', 'epic', 'rare', 'common'];
        const sortedItems = [...ITEMS].sort((a, b) => {
            return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        });

        // Erste 5 Items links, nächste 5 rechts
        sortedItems.forEach((item, index) => {
            if (index >= 10) return; // Max 10 Items total

            const div = document.createElement('div');
            div.className = `sidebar-item rarity-${item.rarity}`;
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22 rx=%2210%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23555%22 font-size=%2210%22>?</text></svg>'">
                <h3>${item.name}</h3>
                <p class="rarity-label">${RARITY_LABELS[item.rarity]}</p>
            `;

            // Hover Events für Preview
            div.addEventListener('mouseenter', () => this.showPreview(item));
            div.addEventListener('mouseleave', () => this.hidePreview());

            if (index < 5) {
                this.rewardsLeft.appendChild(div);
            } else {
                this.rewardsRight.appendChild(div);
            }
        });
    }

    /**
     * Zeigt die Item-Preview an
     */
    showPreview(item) {
        this.previewImage.src = item.image;
        this.previewImage.alt = item.name;
        this.previewName.textContent = item.name;
        this.previewRarity.textContent = RARITY_LABELS[item.rarity];

        // Rarity-Klasse setzen
        this.itemPreview.className = `item-preview rarity-${item.rarity} show`;
    }

    /**
     * Versteckt die Item-Preview
     */
    hidePreview() {
        this.itemPreview.classList.remove('show');
    }

    /**
     * Event Listener einrichten
     */
    setupEventListeners() {
        // Spin Button
        this.rollButton.addEventListener('click', () => this.spin());

        // Won Display schließen
        this.wonItemDisplay.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-button') || e.target === this.wonItemDisplay) {
                this.closeWonDisplay();
            }
        });

        // ESC zum Schließen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.wonItemDisplay.classList.contains('show')) {
                    this.closeWonDisplay();
                }
            }
        });
    }

    closeWonDisplay() {
        this.wonContent.classList.remove('animate-in');
        this.wonItemDisplay.classList.remove('show');
        this.prepareTrack();
    }

    /**
     * Startet den Spin
     */
    spin() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.rollButton.disabled = true;
        this.rollButton.querySelector('.button-text').textContent = '...';

        this.prepareTrack();

        const winningItem = this.getWeightedRandomItem();
        const winningPosition = 45;

        const trackItems = this.itemsTrack.children;
        trackItems[winningPosition].innerHTML = `
            <img src="${winningItem.image}" alt="${winningItem.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22 rx=%2210%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23555%22 font-size=%2210%22>?</text></svg>'">
            <span>${winningItem.name}</span>
        `;
        trackItems[winningPosition].className = `roll-item rarity-${winningItem.rarity}`;

        const rollWindowWidth = document.querySelector('.roll-window').offsetWidth;
        const centerOffset = rollWindowWidth / 2 - this.itemWidth / 2;
        const randomOffset = (Math.random() - 0.5) * (this.itemWidth * 0.5);
        const scrollDistance = (winningPosition * this.itemWidth) - centerOffset + randomOffset;

        requestAnimationFrame(() => {
            this.itemsTrack.style.transition = 'transform 7s cubic-bezier(0.1, 0.7, 0.2, 1)';
            this.itemsTrack.style.transform = `translateX(-${scrollDistance}px)`;
        });

        setTimeout(() => {
            this.showWonItem(winningItem);
            this.isSpinning = false;
            this.rollButton.disabled = false;
            this.rollButton.querySelector('.button-text').textContent = 'UNBOX!';
        }, 7200);
    }

    /**
     * Zeigt das gewonnene Item mit Fly-Out Animation
     */
    showWonItem(item) {
        this.wonItemImage.src = item.image;
        this.wonItemImage.alt = item.name;
        this.wonItemName.textContent = item.name;
        this.wonItemRarity.textContent = RARITY_LABELS[item.rarity];

        this.wonContent.classList.remove('animate-in');
        this.wonContent.className = `won-content rarity-${item.rarity}`;

        this.wonItemDisplay.classList.add('show');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.wonContent.classList.add('animate-in');
            });
        });
    }
}

// App starten
document.addEventListener('DOMContentLoaded', () => {
    new UnboxingApp();
});
