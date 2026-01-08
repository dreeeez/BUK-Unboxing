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
        this.wonPlayerAvatar = document.getElementById('wonPlayerAvatar');
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
        this.playerAvatarContainer = document.getElementById('playerAvatarContainer');
        this.playerName = document.getElementById('playerName');
        this.playerVariant = document.getElementById('playerVariant');

        // Spin Animationen
        this.centerBox = document.getElementById('centerBox');
        this.spinParticles = document.getElementById('spinParticles');
        this.buttonIcons = document.querySelectorAll('.button-icon');

        // Sound
        this.spinSound = new Audio('songs/Spinning Prize.mp3');
        this.itemMusic = null; // Wird bei Musikauswahl gesetzt

        // Music Selection Elemente
        this.musicOverlay = document.getElementById('musicOverlay');
        this.musicCards = document.getElementById('musicCards');

        // Verfügbare Songs für Item-Spin
        this.availableSongs = [
            { file: 'songs/Assumptions_10.wav', title: 'Assumptions' },
            { file: 'songs/GladGiver_10.wav', title: 'Glad Giver' },
            { file: 'songs/ElskerBrunstad_10.wav', title: 'Elsker Brunstad' },
            { file: 'songs/Tiger_10.wav', title: 'Tiger' },
            { file: 'songs/JegKanBevareGleden_10.wav', title: 'Jeg Kan Bevare Gleden' },
            { file: 'songs/Pyromaniac_10.wav', title: 'Pyromaniac' },
            { file: 'songs/Symbolism_10.wav', title: 'Symbolism' }
        ];
        this.selectedSong = null;

        // GIF/Video Hintergründe
        this.saveBgVideo = document.getElementById('saveBgVideo');
        this.allinBgVideo = document.getElementById('allinBgVideo');
        this.wonVideoLeft = document.getElementById('wonVideoLeft');
        this.wonVideoRight = document.getElementById('wonVideoRight');

        // Verfügbare Videos für Hintergründe
        this.saveVideos = ['GIF/Save/dog.mp4', 'GIF/Save/escape.mp4', 'GIF/Save/jumping.mp4', 'GIF/Save/never.mp4', 'GIF/Save/sick.mp4'];
        this.allinVideos = ['GIF/All_in/cat.mp4', 'GIF/All_in/cool.mp4', 'GIF/All_in/dance.mp4', 'GIF/All_in/lol.mp4', 'GIF/All_in/man.mp4'];
        this.winnerVideos = ['GIF/Winner/suii.mp4', 'GIF/Winner/suii2.mp4'];
        this.cookedVideos = ['GIF/Cooked/bye.mp4', 'GIF/Cooked/gg.MP4', 'GIF/Cooked/laugh.mp4', 'GIF/Cooked/laugh2.mp4'];

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
        this.totalItems = 120;

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
     * Prüft ob eine Datei ein Video ist
     */
    isVideo(filename) {
        if (!filename) return false;
        const ext = filename.split('.').pop().toLowerCase();
        return ['mp4', 'webm', 'mov', 'ogg'].includes(ext);
    }

    /**
     * Erstellt Avatar-HTML (Bild oder Video)
     */
    createAvatarHTML(person, className = 'person-avatar-img') {
        if (!person.image) {
            return `<div class="person-avatar">👤</div>`;
        }

        const displayName = person.name.split(' ')[0];

        if (this.isVideo(person.image)) {
            return `<video src="${person.image}" class="${className}" autoplay loop muted playsinline onerror="this.parentElement.innerHTML='<div class=\\'person-avatar\\'>👤</div>'"></video>`;
        } else {
            return `<img src="${person.image}" alt="${displayName}" class="${className}" onerror="this.parentElement.innerHTML='<div class=\\'person-avatar\\'>👤</div>'">`;
        }
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
        this.preparePersonTrack();
        this.rollButton.disabled = false;
    }

    /**
     * Setzt die Variante (SAVE oder ALL_IN)
     */
    setVariant(variant) {
        this.currentVariant = variant;
        this.variantOverlay.classList.remove('show');

        // Varianten-Videos stoppen
        this.saveBgVideo.pause();
        this.saveBgVideo.currentTime = 0;
        this.allinBgVideo.pause();
        this.allinBgVideo.currentTime = 0;

        // Hintergrund-Schimmer entfernen
        this.variantOverlay.classList.remove('save-active', 'allin-active');

        // Spieler-Anzeige aktualisieren
        this.playerVariant.textContent = variant === 'SAVE' ? '🛡️ SAVE' : '🔥 ALL IN';
        this.playerVariant.className = `player-variant ${variant.toLowerCase().replace('_', '-')}`;

        // Sidebars mit aktuellen Items rendern
        this.renderSidebars();

        // Item-Track vorbereiten
        this.prepareItemTrack();

        // Zeige Musikauswahl
        this.showMusicSelection();
    }

    /**
     * Zeigt die Musikauswahl mit 3 zufälligen Songs
     */
    showMusicSelection() {
        // 3 zufällige Songs auswählen
        const shuffled = [...this.availableSongs].sort(() => Math.random() - 0.5);
        const selectedSongs = shuffled.slice(0, 3);

        // Cards generieren
        this.musicCards.innerHTML = '';
        const icons = ['🎵', '🎶', '🎸', '🎹', '🎺', '🎷', '🥁'];

        selectedSongs.forEach((song, index) => {
            const card = document.createElement('div');
            card.className = 'music-card';
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            card.innerHTML = `
                <span class="music-card-number">${index + 1}</span>
                <span class="music-card-icon">${randomIcon}</span>
                <span class="music-card-title">${song.title}</span>
            `;
            card.addEventListener('click', () => this.selectMusic(song));
            this.musicCards.appendChild(card);
        });

        this.musicOverlay.classList.add('show');
    }

    /**
     * Wählt einen Song aus und geht zum Item-Spin
     */
    selectMusic(song) {
        this.selectedSong = song;
        this.musicOverlay.classList.remove('show');

        // Item Music vorbereiten (mit Fade-in)
        this.itemMusic = new Audio(song.file);
        this.itemMusic.volume = 0;

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

        // Musik stoppen und zurücksetzen
        if (this.itemMusic) {
            this.itemMusic.pause();
            this.itemMusic.currentTime = 0;
            this.itemMusic = null;
        }
        this.selectedSong = null;
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

        div.innerHTML = `
            ${this.createAvatarHTML(person)}
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
                // Save Video abspielen, All-in pausieren
                this.saveBgVideo.play();
                this.allinBgVideo.pause();
                // Hintergrund-Schimmer aktivieren
                this.variantOverlay.classList.add('save-active');
                this.variantOverlay.classList.remove('allin-active');
            } else {
                // Rechte Hälfte - ALL IN aktiv
                this.variantColumnAllin.classList.add('active');
                this.variantColumnAllin.classList.remove('dimmed');
                this.variantColumnSave.classList.add('dimmed');
                this.variantColumnSave.classList.remove('active');
                // Preview-Panel rechts positionieren
                this.rewardPreviewPanel.classList.add('position-right');
                this.rewardPreviewPanel.classList.remove('position-left');
                // All-in Video abspielen, Save pausieren
                this.allinBgVideo.play();
                this.saveBgVideo.pause();
                // Hintergrund-Schimmer aktivieren
                this.variantOverlay.classList.add('allin-active');
                this.variantOverlay.classList.remove('save-active');
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

                // Avatar (Bild oder Video)
                if (entry.person.image) {
                    if (this.isVideo(entry.person.image)) {
                        avatar.innerHTML = `<video src="${entry.person.image}" autoplay loop muted playsinline onerror="this.parentElement.textContent='👤'"></video>`;
                    } else {
                        avatar.innerHTML = `<img src="${entry.person.image}" alt="${entry.person.name}" onerror="this.parentElement.textContent='👤'">`;
                    }
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
                if (this.isVideo(entry.person.image)) {
                    circle.innerHTML = `<video src="${entry.person.image}" autoplay loop muted playsinline onerror="this.textContent='👤'"></video>`;
                } else {
                    circle.innerHTML = `<img src="${entry.person.image}" alt="${entry.person.name}" onerror="this.textContent='👤'">`;
                }
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

        // Zufällige Videos für Save und All-in laden
        this.loadRandomVariantVideos();

        this.renderVariantRewards();
        this.variantOverlay.classList.add('show');
    }

    /**
     * Lädt zufällige Videos für die Varianten-Auswahl (Playback erst bei Hover)
     */
    loadRandomVariantVideos() {
        // Zufälliges Save Video
        const randomSaveVideo = this.saveVideos[Math.floor(Math.random() * this.saveVideos.length)];
        this.saveBgVideo.src = randomSaveVideo;
        this.saveBgVideo.load();

        // Zufälliges All-in Video
        const randomAllinVideo = this.allinVideos[Math.floor(Math.random() * this.allinVideos.length)];
        this.allinBgVideo.src = randomAllinVideo;
        this.allinBgVideo.load();
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

        // Won Videos stoppen
        this.wonVideoLeft.pause();
        this.wonVideoLeft.currentTime = 0;
        this.wonVideoRight.pause();
        this.wonVideoRight.currentTime = 0;

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

            // 2-4 Partikel auf einmal
            const particleCount = 2 + Math.floor(Math.random() * 3);
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'spin-particle';
                particle.innerHTML = '<img src="images/favicon.svg" alt="">';

                // Zufällige Position um die Box herum
                const offsetX = (Math.random() - 0.5) * 150;
                particle.style.left = `${boxCenterX + offsetX}px`;
                particle.style.top = `${boxTop}px`;

                // Zufällige Richtung: 0 = oben, 1 = links-oben (45°), 2 = rechts-oben (45°)
                const direction = Math.floor(Math.random() * 3);
                let flyClass = '';
                if (direction === 1) {
                    flyClass = 'fly-left';
                } else if (direction === 2) {
                    flyClass = 'fly-right';
                }

                // Längere Animation-Dauer
                particle.style.animationDuration = `${2.5 + Math.random() * 1.5}s`;
                particle.style.animationDelay = `${Math.random() * 0.5}s`;

                this.spinParticles.appendChild(particle);

                // Aktivieren mit Richtungsklasse
                requestAnimationFrame(() => {
                    particle.classList.add('active');
                    if (flyClass) {
                        particle.classList.add(flyClass);
                    }
                });

                // Nach Animation entfernen
                setTimeout(() => {
                    particle.remove();
                }, 4500);
            }
        }, 300);
    }

    /**
     * Spin für Person
     */
    spinPerson() {
        this.isSpinning = true;
        this.rollButton.disabled = true;
        this.rollButton.querySelector('.button-text').textContent = '...';

        // Sound abspielen
        this.spinSound.currentTime = 0;
        this.spinSound.play();

        // Spin-Animationen starten
        this.startSpinAnimations();

        this.preparePersonTrack();

        const winningPerson = this.getRandomPerson();
        this.currentPerson = winningPerson;
        const winningPosition = 100;
        const displayName = this.getShortName(winningPerson.name);

        const trackItems = this.itemsTrack.children;

        trackItems[winningPosition].innerHTML = `
            ${this.createAvatarHTML(winningPerson)}
            <span>${displayName}</span>
        `;
        // WICHTIG: Keine 'winning' Klasse während des Spins - wird erst nach dem Stopp hinzugefügt
        trackItems[winningPosition].className = 'roll-item person-item';

        // Dynamische Item-Breite ermitteln
        const itemWidth = this.getItemWidth();
        const rollWindowWidth = document.querySelector('.roll-window').offsetWidth;
        const centerOffset = rollWindowWidth / 2 - itemWidth / 2;
        const randomOffset = (Math.random() - 0.5) * (itemWidth * 0.5);
        const scrollDistance = (winningPosition * itemWidth) - centerOffset + randomOffset;

        requestAnimationFrame(() => {
            this.itemsTrack.style.transition = 'transform 10s cubic-bezier(0.1, 0.7, 0.2, 1)';
            this.itemsTrack.style.transform = `translateX(-${scrollDistance}px)`;
        });

        setTimeout(() => {
            this.stopSpinAnimations();
            // Jetzt erst die 'winning' Klasse hinzufügen (nach dem Stopp)
            trackItems[winningPosition].classList.add('winning');
            this.showPersonWon(winningPerson);
            this.isSpinning = false;
            // Spieler-Anzeige mit Avatar einblenden
            this.showPlayerDisplay(winningPerson, displayName);
        }, 10200);
    }

    /**
     * Zeigt die Spieler-Anzeige mit Avatar
     */
    showPlayerDisplay(person, displayName) {
        this.playerName.textContent = displayName;

        // Avatar setzen (Bild oder Video)
        if (person.image) {
            if (this.isVideo(person.image)) {
                this.playerAvatarContainer.innerHTML = `<video src="${person.image}" class="player-avatar" autoplay loop muted playsinline></video>`;
            } else {
                this.playerAvatarContainer.innerHTML = `<img src="${person.image}" alt="${displayName}" class="player-avatar">`;
            }
        } else {
            this.playerAvatarContainer.innerHTML = `<span class="player-avatar-fallback">👤</span>`;
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

        // Ausgewählte Musik mit Fade-in abspielen
        if (this.itemMusic) {
            this.itemMusic.currentTime = 0;
            this.itemMusic.volume = 0;
            this.itemMusic.play();
            this.fadeInMusic(this.itemMusic, 1.0, 2000); // Fade zu voller Lautstärke über 2 Sekunden
        }

        // Case Opener Sound von Anfang an
        const caseOpener = new Audio('songs/case_opener.wav');
        caseOpener.volume = 1.0; // 100% Lautstärke
        caseOpener.play();

        // Spin-Animationen starten
        this.startSpinAnimations();

        this.prepareItemTrack();
 
        const winningItem = this.getWeightedRandomItem();
        const winningPosition = 100;

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

        // Dreistufige Animation: Beschleunigen -> Vollgas halten -> Abbremsen
        const phase1Distance = scrollDistance * 0.20;  // 20% beim Beschleunigen
        const phase2Distance = scrollDistance * 0.85;  // 65% bei Vollgas
        const phase3Distance = scrollDistance;          // 15% beim Abbremsen

        requestAnimationFrame(() => {
            // Phase 1: Beschleunigen (2 Sekunden) - ease-in, wird immer schneller
            this.itemsTrack.style.transition = 'transform 2s cubic-bezier(0.4, 0, 1, 1)';
            this.itemsTrack.style.transform = `translateX(-${phase1Distance}px)`;
        });

        // Phase 2: Vollgas halten (4.5 Sekunden) - linear, konstant schnell
        setTimeout(() => {
            this.itemsTrack.style.transition = 'transform 4.5s linear';
            this.itemsTrack.style.transform = `translateX(-${phase2Distance}px)`;
        }, 2000);

        // Phase 3: Abbremsen (3.5 Sekunden) - ab 6.5s
        setTimeout(() => {
            this.itemsTrack.style.transition = 'transform 3.5s cubic-bezier(0, 0, 0.2, 1)';
            this.itemsTrack.style.transform = `translateX(-${phase3Distance}px)`;
        }, 6500);

        setTimeout(() => {
            this.stopSpinAnimations();
            this.showWonItem(winningItem);
            this.isSpinning = false;
            this.rollButton.disabled = false;
            this.rollButton.querySelector('.button-text').textContent = 'SPIN PERSON';
        }, 10200);
    }

    /**
     * Startet das schwarze Pulsieren vor dem Drop
     */
    startDropPulse() {
        this.itemsTrack.classList.add('drop-pulse');
    }

    /**
     * Stoppt das schwarze Pulsieren
     */
    stopDropPulse() {
        this.itemsTrack.classList.remove('drop-pulse');
    }

    /**
     * Fade-in für Musik
     */
    fadeInMusic(audio, targetVolume, duration) {
        const startVolume = audio.volume;
        const volumeStep = (targetVolume - startVolume) / (duration / 50);

        const fadeInterval = setInterval(() => {
            if (audio.volume < targetVolume) {
                audio.volume = Math.min(audio.volume + volumeStep, targetVolume);
            } else {
                clearInterval(fadeInterval);
            }
        }, 50);
    }

    /**
     * Zeigt die gewonnene Person
     */
    showPersonWon(person) {
        this.wonPersonName.textContent = this.getShortName(person.name);

        // Profilbild in Person-Icon setzen (Bild oder Video)
        const personIconEl = this.personWonContent.querySelector('.person-icon');
        if (person.image) {
            if (this.isVideo(person.image)) {
                personIconEl.innerHTML = `<video src="${person.image}" class="person-won-img" autoplay loop muted playsinline onerror="this.parentElement.textContent='👤'"></video>`;
            } else {
                personIconEl.innerHTML = `<img src="${person.image}" alt="${person.name}" class="person-won-img" onerror="this.parentElement.textContent='👤'">`;
            }
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

        // Avatar setzen
        if (this.currentPerson && this.currentPerson.image) {
            if (this.isVideo(this.currentPerson.image)) {
                this.wonPlayerAvatar.innerHTML = `<video src="${this.currentPerson.image}" autoplay loop muted playsinline></video>`;
            } else {
                this.wonPlayerAvatar.innerHTML = `<img src="${this.currentPerson.image}" alt="${this.currentPerson.name}">`;
            }
        } else {
            this.wonPlayerAvatar.innerHTML = '👤';
        }

        this.wonContent.classList.remove('animate-in');
        this.wonContent.className = `won-content rarity-${item.rarity}`;

        // Winner oder Cooked Videos basierend auf Rarity (2 verschiedene für links und rechts)
        const goodRarities = ['stier', 'legendary', 'epic'];
        const isGoodItem = goodRarities.includes(item.rarity);
        const videoList = isGoodItem ? this.winnerVideos : this.cookedVideos;

        // Zwei zufällige Videos auswählen (können unterschiedlich sein)
        const shuffled = [...videoList].sort(() => Math.random() - 0.5);
        const videoLeft = shuffled[0];
        const videoRight = shuffled[1] || shuffled[0]; // Falls nur 1 Video vorhanden

        this.wonVideoLeft.src = videoLeft;
        this.wonVideoLeft.load();
        this.wonVideoLeft.play();

        this.wonVideoRight.src = videoRight;
        this.wonVideoRight.load();
        this.wonVideoRight.play();

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
