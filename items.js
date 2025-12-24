/**
 * ITEM KONFIGURATION
 * ==================
 * Hier kannst du deine eigenen Items hinzufügen!
 *
 * Jedes Item hat folgende Eigenschaften:
 * - name: Der Name des Items
 * - image: Pfad zum Bild (z.B. "images/mein-item.png")
 * - rarity: Seltenheitsstufe ("common", "rare", "epic", "legendary", "stier")
 * - weight: Gewichtung für die Wahrscheinlichkeit (höher = häufiger)
 *
 * SELTENHEITSSTUFEN:
 * - common (grau): Häufige Items
 * - rare (blau): Seltene Items
 * - epic (lila): Epische Items
 * - legendary (rot): Legendäre Items
 * - stier (gold): S-Tier / Extrem selten
 */

const ITEMS = [
    // === COMMON (Grau) - Hohe Gewichtung ===
    {
        name: "Fischstaebchen",
        image: "images/fischstaebchen.png",
        rarity: "common",
        weight: 50
    },
    {
        name: "Klopapier",
        image: "images/klo.png",
        rarity: "common",
        weight: 50
    },
    {
        name: "Basis Gegenstand",
        image: "images/placeholder.png",
        rarity: "common",
        weight: 45
    },

    // === RARE (Blau) - Mittlere Gewichtung ===
    {
        name: "Seltenes Item 1",
        image: "images/placeholder.png",
        rarity: "rare",
        weight: 25
    },
    {
        name: "Seltenes Item 2",
        image: "images/placeholder.png",
        rarity: "rare",
        weight: 25
    },

    // === EPIC (Lila) - Niedrigere Gewichtung ===
    {
        name: "Episches Item",
        image: "images/placeholder.png",
        rarity: "epic",
        weight: 12
    },
    {
        name: "Mystischer Gegenstand",
        image: "images/placeholder.png",
        rarity: "epic",
        weight: 10
    },

    // === LEGENDARY (Rot) - Sehr niedrige Gewichtung ===
    {
        name: "Airpdos Pro",
        image: "images/airpods.png",
        rarity: "legendary",
        weight: 5
    },
    {
        name: "Mythischer Schatz",
        image: "images/placeholder.png",
        rarity: "legendary",
        weight: 4
    },

    // === S-TIER (Gold) - Extrem selten ===
    {
        name: "Fallschirm Sprung",
        image: "images/fallschirm.webp",
        rarity: "stier",
        weight: 1
    }
];

/**
 * Rarity-Labels für die Anzeige
 */
const RARITY_LABELS = {
    common: "Common",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
    stier: "★ S-TIER ★"
};
