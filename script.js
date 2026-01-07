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
        this.modeDisplayLogoBuk = document.getElementById('modeDisplayLogoBuk');
        this.modeDisplayLogoSamvirk = document.getElementById('modeDisplayLogoSamvirk');

        // Varianten Elemente
        this.variantOverlay = document.getElementById('variantOverlay');
        this.currentPlayerName = document.getElementById('currentPlayerName');
        this.variantPlayerAvatar = document.getElementById('variantPlayerAvatar');
        this.saveRewards = document.getElementById('saveRewards');
        this.allinRewards = document.getElementById('allinRewards');
        this.variantColumnSave = document.querySelector('.variant-column-save');
        this.variantColumnAllin = document.querySelector('.variant-column-allin');

        // Reward Preview Panel (statisch)
        this.rewardPreviewPanel = document.getElementById('rewardPreviewPanel');
        this.rewardPreviewImg = document.getElementById('rewardPreviewImg');
        this.rewardPreviewName = document.getElementById('rewardPreviewName');
        this.rewardPreviewRarity = document.getElementById('rewardPreviewRarity');
        this.rewardPreviewDesc = document.getElementById('rewardPreviewDesc');

        // Person Won Elemente
        this.personWonDisplay = document.getElementById('personWonDisplay');
        this.personWonContent = document.getElementById('personWonContent');
        this.wonPersonName = document.getElementById('wonPersonName');
        this.personContinueBtn = document.getElementById('personContinueBtn');

        // Spieler Anzeige
        this.playerDisplay = document.getElementById('playerDisplay');
        this.playerAvatar = document.getElementById('playerAvatar');
        this.playerName = document.getElementById('playerName');
        this.playerVariant = document.getElementById('playerVariant');

        // Spin Animationen
        this.centerBox = document.getElementById('centerBox');
        this.spinParticles = document.getElementById('spinParticles');
        this.buttonIcons = document.querySelectorAll('.button-icon');

        // History Elemente
        this.historyLog = document.getElementById('historyLog');
        this.historySlots = document.querySelectorAll('.history-slot');
        this.historyPopup = document.getElementById('historyPopup');

        // Sidebar Wrapper (einklappbar)
        this.sidebarWrapperLeft = document.getElementById('sidebarWrapperLeft');
        this.sidebarWrapperRight = document.getElementById('sidebarWrapperRight');
        this.sidebarCollapseTimer = null;

        // State
        this.currentMode = null; // 'U18' oder 'U26'
        this.currentVariant = null; // 'SAVE' oder 'ALL_IN'
        this.currentPerson = null;
        this.isSpinning = false;
        this.spinPhase = 'person'; // 'person' oder 'item'
        this.totalItems = 60;

        // History - speichert die letzten 4 Gewinner
        this.history = [null, null, null, null];
        this.historyIndex = 0;

        this.init();
    }

    /**
     * Kürzt den Namen auf "Vorname Nachname"
     */
    getShortName(fullName) {
        const parts = fullName.trim().split(/\s+/);
        if (parts.length <= 2) return fullName;
        // Erster Vorname + letzter Nachname
        return `${parts[0]} ${parts[parts.length - 1]}`;
    }

    /**
     * Ermittelt die aktuelle Item-Breite basierend auf CSS
     */
    getItemWidth() {
        const firstItem = this.itemsTrack.children[0];
        if (firstItem) {
            return firstItem.offsetWidth;
        }
        return 200; // Fallback
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

        // Logo je nach Modus anzeigen
        if (mode === 'U26') {
            this.modeDisplayLogoBuk.classList.remove('show');
            this.modeDisplayLogoSamvirk.classList.add('show');
        } else {
            this.modeDisplayLogoBuk.classList.add('show');
            this.modeDisplayLogoSamvirk.classList.remove('show');
        }

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
        this.playerDisplay.classList.add('hidden');
        this.playerName.textContent = '';
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
        // Faires Balancing: 50/50 Chance für Mädchen/Jungs
        return selectFairPerson(persons);
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
        const displayName = this.getShortName(person.name);

        // Wenn ein Bild vorhanden ist, zeige es an, sonst Fallback-Avatar
        const avatarContent = person.image
            ? `<img src="${person.image}" alt="${displayName}" class="person-avatar-img" onerror="this.parentElement.innerHTML='<div class=\\'person-avatar\\'>👤</div>'">`
            : `<div class="person-avatar">👤</div>`;

        div.innerHTML = `
            ${avatarContent}
            <span>${displayName}</span>
        `;
        return div;
    }

    /**
     * Bereitet den Track mit Personen vor (fair gemischt)
     */
    preparePersonTrack() {
        this.itemsTrack.innerHTML = '';
        this.itemsTrack.style.transition = 'none';
        this.itemsTrack.style.transform = 'translateX(0)';

        const persons = this.getCurrentPersons();
        const males = persons.filter(p => p.gender === 'm');
        const females = persons.filter(p => p.gender === 'f');

        for (let i = 0; i < this.totalItems; i++) {
            // Abwechselnd aus beiden Gruppen für visuelle Fairness
            let pool;
            if (i % 2 === 0) {
                pool = males.length > 0 ? males : females;
            } else {
                pool = females.length > 0 ? females : males;
            }
            const person = pool[Math.floor(Math.random() * pool.length)];
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

        // Maus-Position tracking für Varianten-Overlay (50/50 Split)
        this.variantOverlay.addEventListener('mousemove', (e) => {
            const halfWidth = window.innerWidth / 2;
            if (e.clientX < halfWidth) {
                // Linke Hälfte - SAVE aktiv
                this.variantColumnSave.classList.add('active');
                this.variantColumnSave.classList.remove('dimmed');
                this.variantColumnAllin.classList.add('dimmed');
                this.variantColumnAllin.classList.remove('active');
                // Preview-Panel links positionieren
                this.rewardPreviewPanel.classList.add('position-left');
                this.rewardPreviewPanel.classList.remove('position-right');
            } else {
                // Rechte Hälfte - ALL IN aktiv
                this.variantColumnAllin.classList.add('active');
                this.variantColumnAllin.classList.remove('dimmed');
                this.variantColumnSave.classList.add('dimmed');
                this.variantColumnSave.classList.remove('active');
                // Preview-Panel rechts positionieren
                this.rewardPreviewPanel.classList.add('position-right');
                this.rewardPreviewPanel.classList.remove('position-left');
            }
        });

        // History Hover Events
        this.historyLog.addEventListener('mouseenter', () => {
            this.showHistoryPopup();
        });

        this.historyLog.addEventListener('mouseleave', () => {
            this.hideHistoryPopup();
        });

        // Sidebars Auto-Collapse nach 2 Sekunden (anfangs ausgeklappt)
        this.startSidebarCollapseTimer();

        // Sidebar Hover - expandieren beim Hovern
        [this.sidebarWrapperLeft, this.sidebarWrapperRight].forEach(wrapper => {
            if (wrapper) {
                wrapper.addEventListener('mouseenter', () => {
                    this.clearSidebarCollapseTimer();
                    this.sidebarWrapperLeft.classList.remove('collapsed');
                    this.sidebarWrapperRight.classList.remove('collapsed');
                });

                wrapper.addEventListener('mouseleave', () => {
                    this.startSidebarCollapseTimer();
                });
            }
        });
    }

    /**
     * Startet den Timer zum Einklappen der Sidebars (2 Sekunden)
     */
    startSidebarCollapseTimer() {
        this.clearSidebarCollapseTimer();
        this.sidebarCollapseTimer = setTimeout(() => {
            this.collapseSidebars();
        }, 2000);
    }

    /**
     * Löscht den Collapse-Timer
     */
    clearSidebarCollapseTimer() {
        if (this.sidebarCollapseTimer) {
            clearTimeout(this.sidebarCollapseTimer);
            this.sidebarCollapseTimer = null;
        }
    }

    /**
     * Klappt beide Sidebars ein
     */
    collapseSidebars() {
        if (this.sidebarWrapperLeft) {
            this.sidebarWrapperLeft.classList.add('collapsed');
        }
        if (this.sidebarWrapperRight) {
            this.sidebarWrapperRight.classList.add('collapsed');
        }
    }

    /**
     * Expandiert beide Sidebars
     */
    expandSidebars() {
        if (this.sidebarWrapperLeft) {
            this.sidebarWrapperLeft.classList.remove('collapsed');
        }
        if (this.sidebarWrapperRight) {
            this.sidebarWrapperRight.classList.remove('collapsed');
        }
        this.startSidebarCollapseTimer();
    }

    /**
     * Zeigt das History-Popup an
     */
    showHistoryPopup() {
        this.updateHistoryPopup();
        this.historyPopup.classList.add('show');
    }

    /**
     * Versteckt das History-Popup
     */
    hideHistoryPopup() {
        this.historyPopup.classList.remove('show');
    }

    /**
     * Aktualisiert das History-Popup mit den aktuellen Daten
     */
    updateHistoryPopup() {
        const columns = this.historyPopup.querySelectorAll('.history-popup-column');

        columns.forEach((column, index) => {
            const entry = this.history[index];
            const avatar = column.querySelector('.history-popup-avatar');
            const name = column.querySelector('.history-popup-name');
            const variant = column.querySelector('.history-popup-variant');
            const itemDiv = column.querySelector('.history-popup-item');
            const itemImg = itemDiv.querySelector('img');
            const itemName = column.querySelector('.history-popup-item-name');
            const itemRarity = column.querySelector('.history-popup-item-rarity');

            if (entry) {
                column.classList.remove('empty');

                // Avatar
                if (entry.person.image) {
                    avatar.innerHTML = `<img src="${entry.person.image}" alt="${entry.person.name}" onerror="this.parentElement.textContent='👤'">`;
                } else {
                    avatar.textContent = '👤';
                }

                // Name
                name.textContent = this.getShortName(entry.person.name);

                // Variant
                variant.textContent = entry.variant === 'SAVE' ? 'SAVE' : 'ALL IN';
                variant.className = `history-popup-variant ${entry.variant === 'SAVE' ? 'save' : 'allin'}`;

                // Item
                itemImg.src = entry.item.image;
                itemImg.alt = entry.item.name;
                itemName.textContent = entry.item.name;
                itemRarity.textContent = RARITY_LABELS[entry.item.rarity];
                itemDiv.className = `history-popup-item rarity-${entry.item.rarity}`;
            } else {
                column.classList.add('empty');
                avatar.innerHTML = '?';
                name.textContent = '-';
                variant.textContent = '-';
                variant.className = 'history-popup-variant';
                itemImg.src = '';
                itemName.textContent = '-';
                itemRarity.textContent = '-';
                itemDiv.className = 'history-popup-item';
            }
        });
    }

    /**
     * Fügt einen Eintrag zur History hinzu
     */
    addToHistory(person, variant, item) {
        // Finde den nächsten freien Slot
        const nextSlot = this.history.findIndex(h => h === null);

        if (nextSlot !== -1) {
            this.history[nextSlot] = { person, variant, item };
            this.updateHistorySlot(nextSlot);
        } else {
            // Alle Slots voll - verschiebe alles nach links
            this.history.shift();
            this.history.push({ person, variant, item });
            this.updateAllHistorySlots();
        }
    }

    /**
     * Aktualisiert einen einzelnen History-Slot
     */
    updateHistorySlot(index) {
        const slot = this.historySlots[index];
        const circle = slot.querySelector('.history-circle');
        const entry = this.history[index];

        if (entry) {
            circle.classList.add('filled');
            if (entry.person.image) {
                circle.innerHTML = `<img src="${entry.person.image}" alt="${entry.person.name}" onerror="this.textContent='👤'">`;
            } else {
                circle.textContent = '👤';
            }
        } else {
            circle.classList.remove('filled');
            circle.textContent = '?';
        }
    }

    /**
     * Aktualisiert alle History-Slots
     */
    updateAllHistorySlots() {
        this.historySlots.forEach((slot, index) => {
            this.updateHistorySlot(index);
        });
    }

    /**
     * Zeigt die Varianten-Auswahl
     */
    showVariantSelection() {
        this.currentPlayerName.textContent = this.getShortName(this.currentPerson.name);

        // Avatar setzen
        if (this.currentPerson.image) {
            this.variantPlayerAvatar.innerHTML = `<img src="${this.currentPerson.image}" alt="${this.currentPerson.name}" onerror="this.parentElement.textContent='👤'">`;
        } else {
            this.variantPlayerAvatar.textContent = '👤';
        }

        this.renderVariantRewards();
        this.variantOverlay.classList.add('show');
    }

    /**
     * Rendert die Reward-Previews für beide Varianten
     */
    renderVariantRewards() {
        this.saveRewards.innerHTML = '';
        this.allinRewards.innerHTML = '';

        const saveItems = getItemsForMode(this.currentMode, 'SAVE');
        const allinItems = getItemsForMode(this.currentMode, 'ALL_IN');

        // Sortiere nach Seltenheit
        const rarityOrder = ['stier', 'legendary', 'epic', 'rare', 'common', 'punishment'];
        const sortItems = (items) => [...items].sort((a, b) =>
            rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
        );

        // Render SAVE Rewards
        sortItems(saveItems).forEach(item => {
            const div = document.createElement('div');
            div.className = `variant-reward-item rarity-${item.rarity}`;
            div.innerHTML = `<img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22 rx=%2210%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2250%22 font-weight=%22bold%22>?</text></svg>'">`;
            this.addRewardHoverEvents(div, item);
            this.saveRewards.appendChild(div);
        });

        // Render ALL IN Rewards
        sortItems(allinItems).forEach(item => {
            const div = document.createElement('div');
            div.className = `variant-reward-item rarity-${item.rarity}`;
            div.innerHTML = `<img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22 rx=%2210%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2250%22 font-weight=%22bold%22>?</text></svg>'">`;
            this.addRewardHoverEvents(div, item);
            this.allinRewards.appendChild(div);
        });
    }

    /**
     * Fügt Hover-Events für Reward-Preview hinzu
     */
    addRewardHoverEvents(element, item) {
        element.addEventListener('mouseenter', () => {
            this.showRewardPreview(item);
        });

        element.addEventListener('mouseleave', () => {
            this.hideRewardPreview();
        });
    }

    /**
     * Zeigt die Reward-Preview an (statisches Panel)
     */
    showRewardPreview(item) {
        this.rewardPreviewImg.src = item.image;
        this.rewardPreviewName.textContent = item.name;
        this.rewardPreviewRarity.textContent = RARITY_LABELS[item.rarity];
        this.rewardPreviewDesc.textContent = item.desc || '';

        // Rarity-Klasse setzen + Position beibehalten
        const positionClass = this.rewardPreviewPanel.classList.contains('position-left') ? 'position-left' : 'position-right';
        this.rewardPreviewPanel.className = `reward-preview-panel rarity-${item.rarity} ${positionClass} show`;
    }

    /**
     * Versteckt die Reward-Preview
     */
    hideRewardPreview() {
        this.rewardPreviewPanel.classList.remove('show');
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
     * Startet die Spin-Animationen (Box rasseln, Icons fliegen, Partikel)
     */
    startSpinAnimations() {
        // Box rasseln lassen
        this.centerBox.classList.add('spinning');

        // Button Icons wild fliegen lassen
        this.buttonIcons.forEach(icon => icon.classList.add('spinning'));

        // Partikel spawnen
        this.spawnParticles();
    }

    /**
     * Stoppt die Spin-Animationen
     */
    stopSpinAnimations() {
        this.centerBox.classList.remove('spinning');
        this.buttonIcons.forEach(icon => icon.classList.remove('spinning'));
        this.spinParticles.innerHTML = '';
    }

    /**
     * Spawnt fliegende Partikel aus der Box - sanft
     */
    spawnParticles() {
        const boxRect = this.centerBox.getBoundingClientRect();
        const boxCenterX = boxRect.left + boxRect.width / 2;
        const boxTop = boxRect.top + boxRect.height * 0.3;

        // Partikel alle 500ms spawnen - weniger und langsamer
        this.particleInterval = setInterval(() => {
            if (!this.isSpinning) {
                clearInterval(this.particleInterval);
                return;
            }

            // Nur 1-2 Partikel auf einmal
            const particleCount = Math.random() > 0.5 ? 2 : 1;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'spin-particle';
                particle.innerHTML = '<img src="images/favicon.svg" alt="">';

                // Zufällige Position um die Box herum
                const offsetX = (Math.random() - 0.5) * 150;
                particle.style.left = `${boxCenterX + offsetX}px`;
                particle.style.top = `${boxTop}px`;

                // Längere Animation-Dauer
                particle.style.animationDuration = `${2.5 + Math.random() * 1.5}s`;
                particle.style.animationDelay = `${Math.random() * 0.5}s`;

                this.spinParticles.appendChild(particle);

                // Aktivieren
                requestAnimationFrame(() => {
                    particle.classList.add('active');
                });

                // Nach Animation entfernen
                setTimeout(() => {
                    particle.remove();
                }, 4500);
            }
        }, 500);
    }

    /**
     * Spin für Person
     */
    spinPerson() {
        this.isSpinning = true;
        this.rollButton.disabled = true;
        this.rollButton.querySelector('.button-text').textContent = '...';

        // Spin-Animationen starten
        this.startSpinAnimations();

        this.preparePersonTrack();

        const winningPerson = this.getRandomPerson();
        this.currentPerson = winningPerson;
        const winningPosition = 45;
        const displayName = this.getShortName(winningPerson.name);

        const trackItems = this.itemsTrack.children;

        // Avatar Content mit Bild oder Fallback
        const avatarContent = winningPerson.image
            ? `<img src="${winningPerson.image}" alt="${displayName}" class="person-avatar-img" onerror="this.parentElement.innerHTML='<div class=\\'person-avatar\\'>👤</div>'">`
            : `<div class="person-avatar">👤</div>`;

        trackItems[winningPosition].innerHTML = `
            ${avatarContent}
            <span>${displayName}</span>
        `;
        trackItems[winningPosition].className = 'roll-item person-item winning';

        // Dynamische Item-Breite ermitteln
        const itemWidth = this.getItemWidth();
        const rollWindowWidth = document.querySelector('.roll-window').offsetWidth;
        const centerOffset = rollWindowWidth / 2 - itemWidth / 2;
        const randomOffset = (Math.random() - 0.5) * (itemWidth * 0.5);
        const scrollDistance = (winningPosition * itemWidth) - centerOffset + randomOffset;

        requestAnimationFrame(() => {
            this.itemsTrack.style.transition = 'transform 7s cubic-bezier(0.1, 0.7, 0.2, 1)';
            this.itemsTrack.style.transform = `translateX(-${scrollDistance}px)`;
        });

        setTimeout(() => {
            this.stopSpinAnimations();
            this.showPersonWon(winningPerson);
            this.isSpinning = false;
            // Spieler-Anzeige mit Avatar einblenden
            this.showPlayerDisplay(winningPerson, displayName);
        }, 7200);
    }

    /**
     * Zeigt die Spieler-Anzeige mit Avatar
     */
    showPlayerDisplay(person, displayName) {
        this.playerName.textContent = displayName;

        // Avatar setzen
        if (person.image) {
            this.playerAvatar.src = person.image;
            this.playerAvatar.style.display = 'block';
            this.playerAvatar.onerror = () => {
                this.playerAvatar.style.display = 'none';
            };
        } else {
            this.playerAvatar.style.display = 'none';
        }

        // Anzeige einblenden
        this.playerDisplay.classList.remove('hidden');
    }

    /**
     * Spin für Item
     */
    spinItem() {
        this.isSpinning = true;
        this.rollButton.disabled = true;
        this.rollButton.querySelector('.button-text').textContent = '...';

        // Spin-Animationen starten
        this.startSpinAnimations();

        this.prepareItemTrack();

        const winningItem = this.getWeightedRandomItem();
        const winningPosition = 45;

        const trackItems = this.itemsTrack.children;
        trackItems[winningPosition].innerHTML = `
            <img src="${winningItem.image}" alt="${winningItem.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22 rx=%2210%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2250%22 font-weight=%22bold%22>?</text></svg>'">
            <span>${winningItem.name}</span>
        `;
        trackItems[winningPosition].className = `roll-item rarity-${winningItem.rarity}`;

        // Dynamische Item-Breite ermitteln
        const itemWidth = this.getItemWidth();
        const rollWindowWidth = document.querySelector('.roll-window').offsetWidth;
        const centerOffset = rollWindowWidth / 2 - itemWidth / 2;
        const randomOffset = (Math.random() - 0.5) * (itemWidth * 0.5);
        const scrollDistance = (winningPosition * itemWidth) - centerOffset + randomOffset;

        requestAnimationFrame(() => {
            this.itemsTrack.style.transition = 'transform 7s cubic-bezier(0.1, 0.7, 0.2, 1)';
            this.itemsTrack.style.transform = `translateX(-${scrollDistance}px)`;
        });

        setTimeout(() => {
            this.stopSpinAnimations();
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
        this.wonPersonName.textContent = this.getShortName(person.name);

        // Profilbild in Person-Icon setzen
        const personIconEl = this.personWonContent.querySelector('.person-icon');
        if (person.image) {
            personIconEl.innerHTML = `<img src="${person.image}" alt="${person.name}" class="person-won-img" onerror="this.parentElement.textContent='👤'">`;
        } else {
            personIconEl.textContent = '👤';
        }

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
        this.wonByPlayer.textContent = this.currentPerson ? this.getShortName(this.currentPerson.name) : '-';

        this.wonContent.classList.remove('animate-in');
        this.wonContent.className = `won-content rarity-${item.rarity}`;

        this.wonItemDisplay.classList.add('show');

        // Zur History hinzufügen
        this.addToHistory(this.currentPerson, this.currentVariant, item);

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
