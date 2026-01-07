/**
 * ITEM & PERSONEN KONFIGURATION
 * ==============================
 *
 * MODI: U18 und U26 Samvirk
 * VARIANTEN: All-in (riskant) und Save (sicher)
 */

// ==================== PERSONEN LISTEN ====================

const PERSONS = {
    U18: [
        { name: "Max Mustermann" },
        { name: "Lisa Schmidt" },
        { name: "Tom Weber" },
        { name: "Anna Müller" },
        { name: "Felix Braun" },
        { name: "Sophie Wagner" },
        { name: "Leon Fischer" },
        { name: "Emma Hoffmann" },
        // Füge hier weitere U18 Personen hinzu
    ],
    U26: [
        { name: "Michael Schneider" },
        { name: "Julia Becker" },
        { name: "David Koch" },
        { name: "Laura Richter" },
        { name: "Niklas Wolf" },
        { name: "Sarah Klein" },
        { name: "Jan Schulz" },
        { name: "Marie Neumann" },
        // Füge hier weitere U26 Samvirk Personen hinzu
    ]
};

// ==================== ITEM KONFIGURATION ====================

/**
 * Seltenheitsstufen:
 * - common (grau): Häufige Items
 * - rare (blau): Seltene Items
 * - epic (lila): Epische Items
 * - legendary (rot): Legendäre Items
 * - stier (gold): S-Tier / Extrem selten
 * - punishment (dunkelrot): Strafen (nur bei All-in)
 */

const RARITY_LABELS = {
    common: "Common",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
    stier: "★ S-TIER ★",
    punishment: "💀 STRAFE 💀"
};

// ==================== U18 ITEMS ====================

const ITEMS_U18 = {
    // SAVE Variante - Sichere Items, keine Strafen
    SAVE: [
        // Common
        { name: "Süßigkeiten-Tüte", image: "images/placeholder.png", rarity: "common", weight: 50 },
        { name: "Kino-Gutschein", image: "images/placeholder.png", rarity: "common", weight: 45 },
        { name: "Snack-Box", image: "images/placeholder.png", rarity: "common", weight: 40 },
        // Rare
        { name: "Gaming-Maus", image: "images/placeholder.png", rarity: "rare", weight: 25 },
        { name: "Kopfhörer", image: "images/placeholder.png", rarity: "rare", weight: 20 },
        // Epic
        { name: "Bluetooth Speaker", image: "images/placeholder.png", rarity: "epic", weight: 10 },
        // Legendary
        { name: "Nintendo Switch Spiel", image: "images/placeholder.png", rarity: "legendary", weight: 5 },
    ],

    // ALL-IN Variante - Bessere Items möglich, aber auch Strafen
    ALL_IN: [
        // Common
        { name: "Süßigkeiten-Tüte", image: "images/placeholder.png", rarity: "common", weight: 30 },
        { name: "Kino-Gutschein", image: "images/placeholder.png", rarity: "common", weight: 25 },
        // Rare
        { name: "Gaming-Maus", image: "images/placeholder.png", rarity: "rare", weight: 20 },
        { name: "Kopfhörer", image: "images/placeholder.png", rarity: "rare", weight: 18 },
        // Epic
        { name: "Bluetooth Speaker", image: "images/placeholder.png", rarity: "epic", weight: 15 },
        { name: "Powerbank Premium", image: "images/placeholder.png", rarity: "epic", weight: 12 },
        // Legendary
        { name: "Nintendo Switch Spiel", image: "images/placeholder.png", rarity: "legendary", weight: 8 },
        { name: "AirPods", image: "images/airpods.png", rarity: "legendary", weight: 5 },
        // S-Tier
        { name: "Freizeitpark-Ticket", image: "images/placeholder.png", rarity: "stier", weight: 2 },
        // Strafen
        { name: "Toiletten putzen", image: "images/placeholder.png", rarity: "punishment", weight: 15 },
        { name: "Küchendienst", image: "images/placeholder.png", rarity: "punishment", weight: 12 },
        { name: "Früh aufstehen", image: "images/placeholder.png", rarity: "punishment", weight: 10 },
    ]
};

// ==================== U26 SAMVIRK ITEMS ====================

const ITEMS_U26 = {
    // SAVE Variante - Sichere Items, keine Strafen
    SAVE: [
        // Common
        { name: "Kaffee-Gutschein", image: "images/placeholder.png", rarity: "common", weight: 50 },
        { name: "Snack-Paket", image: "images/placeholder.png", rarity: "common", weight: 45 },
        { name: "Getränke-Flatrate", image: "images/placeholder.png", rarity: "common", weight: 40 },
        // Rare
        { name: "Restaurant-Gutschein", image: "images/placeholder.png", rarity: "rare", weight: 25 },
        { name: "Spotify Premium", image: "images/placeholder.png", rarity: "rare", weight: 20 },
        // Epic
        { name: "Wellness-Gutschein", image: "images/placeholder.png", rarity: "epic", weight: 10 },
        // Legendary
        { name: "Konzertkarten", image: "images/placeholder.png", rarity: "legendary", weight: 5 },
    ],

    // ALL-IN Variante - Bessere Items möglich, aber auch Strafen
    ALL_IN: [
        // Common
        { name: "Kaffee-Gutschein", image: "images/placeholder.png", rarity: "common", weight: 30 },
        { name: "Snack-Paket", image: "images/placeholder.png", rarity: "common", weight: 25 },
        // Rare
        { name: "Restaurant-Gutschein", image: "images/placeholder.png", rarity: "rare", weight: 20 },
        { name: "Spotify Premium", image: "images/placeholder.png", rarity: "rare", weight: 18 },
        // Epic
        { name: "Wellness-Gutschein", image: "images/placeholder.png", rarity: "epic", weight: 15 },
        { name: "Gaming-Zubehör", image: "images/placeholder.png", rarity: "epic", weight: 12 },
        // Legendary
        { name: "Konzertkarten", image: "images/placeholder.png", rarity: "legendary", weight: 8 },
        { name: "AirPods Pro", image: "images/airpods.png", rarity: "legendary", weight: 5 },
        // S-Tier
        { name: "Fallschirm Sprung", image: "images/fallschirm.webp", rarity: "stier", weight: 2 },
        // Strafen
        { name: "Karaoke singen", image: "images/placeholder.png", rarity: "punishment", weight: 15 },
        { name: "Aufräum-Dienst", image: "images/placeholder.png", rarity: "punishment", weight: 12 },
        { name: "Weck-Service um 6 Uhr", image: "images/placeholder.png", rarity: "punishment", weight: 10 },
    ]
};

/**
 * Hilfsfunktion: Holt die richtige Item-Liste basierend auf Modus und Variante
 */
function getItemsForMode(mode, variant) {
    if (mode === 'U18') {
        return variant === 'ALL_IN' ? ITEMS_U18.ALL_IN : ITEMS_U18.SAVE;
    } else {
        return variant === 'ALL_IN' ? ITEMS_U26.ALL_IN : ITEMS_U26.SAVE;
    }
}

/**
 * Hilfsfunktion: Holt die Personen-Liste für den Modus
 */
function getPersonsForMode(mode) {
    return mode === 'U18' ? PERSONS.U18 : PERSONS.U26;
}
