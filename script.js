/**
 * BUK Unboxing Waldhausen - Main Script
 * Mit Modus-System (U18/U26) und Varianten (Save/All-in)
 */

class UnboxingApp {
    constructor() {
        // DOM Elemente
        this.itemsTrack = document.getElementById('itemsTrack');
        this.rollButton = document.getElementById('rollButton');
        this.rewardsLeft = document.getElementById('rewardsLeft');
        this.rewardsRight = document.getElementById('rewardsRight');
        this.wonItemDisplay = document.getElementById('wonItemDisplay');
        this.wonItemImage = document.getElementById('wonItemImage');
        this.wonItemName = document.getElementById('wonItemName');
        this.wonItemRarity = document.getElementById('wonItemRarity');
        this.wonContent = document.getElementById('wonContent');
        this.wonByPlayer = document.getElementById('wonByPlayer');
        this.itemPreview = document.getElementById('itemPreview');
        this.previewImage = document.getElementById('previewImage');
        this.previewName = document.getElementById('previewName');
        this.previewRarity = document.getElementById('previewRarity');

        // Modus Elemente
        this.modeOverlay = document.getElementById('modeOverlay');
        this.modeDisplay = document.getElementById('modeDisplay');
        this.currentModeDisplay = document.getElementById('currentModeDisplay');
        this.modeSwitchBtn = document.getElementById('modeSwitchBtn');

        // Varianten Elemente
        this.variantOverlay = document.getElementById('variantOverlay');
        this.currentPlayerName = document.getElementById('currentPlayerName');

        // Person Won Elemente
        this.personWonDisplay = document.getElementById('personWonDisplay');
        this.personWonContent = document.getElementById('personWonContent');
        this.wonPersonName = document.getElementById('wonPersonName');
        this.personContinueBtn = document.getElementById('personContinueBtn');

        // Spieler Anzeige
        this.playerDisplay = document.getElementById('playerDisplay');
        this.playerName = document.getElementById('playerName');
        this.playerVariant = document.getElementById('playerVariant');

        // State
        this.currentMode = null; // 'U18' oder 'U26'
        this.currentVariant = null; // 'SAVE' oder 'ALL_IN'
        this.currentPerson = null;
        this.isSpinning = false;
        this.spinPhase = 'person'; // 'person' oder 'item'
        this.itemWidth = 200;
        this.totalItems = 60;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showModeSelection();
    }

    /**
     * Zeigt die Modus-Auswahl
     */
    showModeSelection() {
        this.modeOverlay.classList.add('show');
        this.rollButton.disabled = true;
    }

    /**
     * Setzt den Modus (U18 oder U26)
     */
    setMode(mode) {
        this.currentMode = mode;
        this.currentModeDisplay.textContent = mode === 'U18' ? 'U18' : 'U26 Samvirk';
        this.modeOverlay.classList.remove('show');
        this.modeDisplay.classList.add('show');

        // Reset für neue Runde
        this.resetRound();
        this.renderSidebars();
        this.preparePersonTrack();
        this.rollButton.disabled = false;
    }

    /**
     * Setzt die Variante (SAVE oder ALL_IN)
     */
    setVariant(variant) {
        this.currentVariant = variant;
        this.variantOverlay.classList.remove('show');

        // Spieler-Anzeige aktualisieren
        this.playerVariant.textContent = variant === 'SAVE' ? '🛡️ SAVE' : '🔥 ALL IN';
        this.playerVariant.className = `player-variant ${variant.toLowerCase().replace('_', '-')}`;

        // Sidebars mit aktuellen Items rendern
        this.renderSidebars();

        // Item-Track vorbereiten
        this.prepareItemTrack();

        // Button für Item-Spin
        this.spinPhase = 'item';
        this.rollButton.querySelector('.button-text').textContent = 'UNBOX!';
        this.rollButton.disabled = false;
    }

    /**
     * Reset für neue Runde
     */
    resetRound() {
        this.currentPerson = null;
        this.currentVariant = null;
        this.spinPhase = 'person';
        this.playerName.textContent = '-';
        this.playerVariant.textContent = '';
        this.playerVariant.className = 'player-variant';
        this.rollButton.querySelector('.button-text').textContent = 'SPIN PERSON';
    }

    /**
     * Holt die aktuelle Item-Liste basierend auf Modus und Variante
     */
    getCurrentItems() {
        if (!this.currentMode || !this.currentVariant) {
            // Fallback: zeige Save Items
            return getItemsForMode(this.currentMode || 'U18', 'SAVE');
        }
        return getItemsForMode(this.currentMode, this.currentVariant);
    }

    /**
     * Holt die Personen für den aktuellen Modus
     */
    getCurrentPersons() {
        return getPersonsForMode(this.currentMode);
    }

    /**
     * Wählt ein Item basierend auf Gewichtung
     */
    getWeightedRandomItem() {
        const items = this.getCurrentItems();
        const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;

        for (const item of items) {
            random -= item.weight;
            if (random <= 0) {
                return item;
            }
        }
        return items[items.length - 1];
    }

    /**
     * Wählt eine zufällige Person
     */
    getRandomPerson() {
        const persons = this.getCurrentPersons();
        return persons[Math.floor(Math.random() * persons.length)];
    }

    /**
     * Erstellt ein Item-Element für den Track
     */
    createTrackItem(item) {
        const div = document.createElement('div');
        div.className = `roll-item rarity-${item.rarity}`;
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22 rx=%2210%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2250%22 font-weight=%22bold%22>?</text></svg>'">
            <span>${item.name}</span>
        `;
        return div;
    }

    /**
     * Erstellt ein Personen-Element für den Track
     */
    createPersonTrackItem(person) {
        const div = document.createElement('div');
        div.className = 'roll-item person-item';
        div.innerHTML = `
            <div class="person-avatar">👤</div>
            <span>${person.name}</span>
        `;
        return div;
    }

    /**
     * Bereitet den Track mit Personen vor
     */
    preparePersonTrack() {
        this.itemsTrack.innerHTML = '';
        this.itemsTrack.style.transition = 'none';
        this.itemsTrack.style.transform = 'translateX(0)';

        const persons = this.getCurrentPersons();
        for (let i = 0; i < this.totalItems; i++) {
            const person = persons[Math.floor(Math.random() * persons.length)];
            this.itemsTrack.appendChild(this.createPersonTrackItem(person));
        }
    }

    /**
     * Bereitet den Track mit Items vor
     */
    prepareItemTrack() {
        this.itemsTrack.innerHTML = '';
        this.itemsTrack.style.transition = 'none';
        this.itemsTrack.style.transform = 'translateX(0)';

        for (let i = 0; i < this.totalItems; i++) {
            const item = this.getWeightedRandomItem();
            this.itemsTrack.appendChild(this.createTrackItem(item));
        }
    }

    /**
     * Rendert die Items in den Sidebars
     */
    renderSidebars() {
        this.rewardsLeft.innerHTML = '';
        this.rewardsRight.innerHTML = '';

        // Falls kein Modus gewählt, nicht rendern
        if (!this.currentMode) return;

        // Zeige Items für aktuelle Variante oder SAVE als Default
        const items = this.currentVariant
            ? this.getCurrentItems()
            : getItemsForMode(this.currentMode, 'SAVE');

        const rarityOrder = ['stier', 'legendary', 'epic', 'rare', 'common', 'punishment'];
        const sortedItems = [...items].sort((a, b) => {
            return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        });

        sortedItems.forEach((item, index) => {
            if (index >= 10) return;

            const div = document.createElement('div');
            div.className = `sidebar-item rarity-${item.rarity}`;
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22 rx=%2210%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2250%22 font-weight=%22bold%22>?</text></svg>'">
                <h3>${item.name}</h3>
                <p class="rarity-label">${RARITY_LABELS[item.rarity]}</p>
            `;

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

        // Modus Buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                this.setMode(mode);
            });
        });

        // Modus Wechseln Button
        this.modeSwitchBtn.addEventListener('click', () => {
            this.showModeSelection();
        });

        // Varianten Buttons
        document.querySelectorAll('.variant-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const variant = btn.dataset.variant;
                this.setVariant(variant);
            });
        });

        // Person Continue Button
        this.personContinueBtn.addEventListener('click', () => {
            this.personWonContent.classList.remove('animate-in');
            this.personWonDisplay.classList.remove('show');
            this.showVariantSelection();
        });

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

    /**
     * Zeigt die Varianten-Auswahl
     */
    showVariantSelection() {
        this.currentPlayerName.textContent = this.currentPerson.name;
        this.variantOverlay.classList.add('show');
    }

    closeWonDisplay() {
        this.wonContent.classList.remove('animate-in');
        this.wonItemDisplay.classList.remove('show');

        // Neue Runde starten
        this.resetRound();
        this.preparePersonTrack();
    }

    /**
     * Startet den Spin (Person oder Item)
     */
    spin() {
        if (this.isSpinning) return;
        if (!this.currentMode) {
            this.showModeSelection();
            return;
        }

        if (this.spinPhase === 'person') {
            this.spinPerson();
        } else {
            this.spinItem();
        }
    }

    /**
     * Spin für Person
     */
    spinPerson() {
        this.isSpinning = true;
        this.rollButton.disabled = true;
        this.rollButton.querySelector('.button-text').textContent = '...';

        this.preparePersonTrack();

        const winningPerson = this.getRandomPerson();
        this.currentPerson = winningPerson;
        const winningPosition = 45;

        const trackItems = this.itemsTrack.children;
        trackItems[winningPosition].innerHTML = `
            <div class="person-avatar">👤</div>
            <span>${winningPerson.name}</span>
        `;
        trackItems[winningPosition].className = 'roll-item person-item winning';

        const rollWindowWidth = document.querySelector('.roll-window').offsetWidth;
        const centerOffset = rollWindowWidth / 2 - this.itemWidth / 2;
        const randomOffset = (Math.random() - 0.5) * (this.itemWidth * 0.5);
        const scrollDistance = (winningPosition * this.itemWidth) - centerOffset + randomOffset;

        requestAnimationFrame(() => {
            this.itemsTrack.style.transition = 'transform 7s cubic-bezier(0.1, 0.7, 0.2, 1)';
            this.itemsTrack.style.transform = `translateX(-${scrollDistance}px)`;
        });

        setTimeout(() => {
            this.showPersonWon(winningPerson);
            this.isSpinning = false;
            this.playerName.textContent = winningPerson.name;
        }, 7200);
    }

    /**
     * Spin für Item
     */
    spinItem() {
        this.isSpinning = true;
        this.rollButton.disabled = true;
        this.rollButton.querySelector('.button-text').textContent = '...';

        this.prepareItemTrack();

        const winningItem = this.getWeightedRandomItem();
        const winningPosition = 45;

        const trackItems = this.itemsTrack.children;
        trackItems[winningPosition].innerHTML = `
            <img src="${winningItem.image}" alt="${winningItem.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22 rx=%2210%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2250%22 font-weight=%22bold%22>?</text></svg>'">
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
            this.rollButton.querySelector('.button-text').textContent = 'SPIN PERSON';
        }, 7200);
    }

    /**
     * Zeigt die gewonnene Person
     */
    showPersonWon(person) {
        this.wonPersonName.textContent = person.name;
        this.personWonContent.classList.remove('animate-in');
        this.personWonDisplay.classList.add('show');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.personWonContent.classList.add('animate-in');
            });
        });
    }

    /**
     * Zeigt das gewonnene Item
     */
    showWonItem(item) {
        this.wonItemImage.src = item.image;
        this.wonItemImage.alt = item.name;
        this.wonItemName.textContent = item.name;
        this.wonItemRarity.textContent = RARITY_LABELS[item.rarity];
        this.wonByPlayer.textContent = this.currentPerson ? this.currentPerson.name : '-';

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
