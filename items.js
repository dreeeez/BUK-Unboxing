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
        // Mädels (f)
        { name: "Lia Mailin Kolb", image: "Pofile Pictures/U18/Lia Kolb.jpg", gender: "f" },
        { name: "Mara Höfer", image: "Pofile Pictures/U18/Mara Höfer.jpg", gender: "f" },
        { name: "Janne Charlene Fächner", image: "Pofile Pictures/U18/Janne Fächner.jpg", gender: "f" },
        { name: "Lina Mathilde Albrecht", image: "Pofile Pictures/U18/Lina Albrecht.jpg", gender: "f" },
        { name: "Marta Louise Albrecht", image: null, gender: "f" },
        { name: "Ida Bahmüller", image: "Pofile Pictures/U18/Ida Bahmüller.jpg", gender: "f" },
        { name: "Leyla-Theresa Tekdal", image: "Pofile Pictures/U18/Leyla-Therase Tekdal.jpg", gender: "f" },
        { name: "Klara Sattler", image: "Pofile Pictures/U18/Klara Sattler.jpg", gender: "f" },
        { name: "Leonie Clara Müller", image: "Pofile Pictures/U18/Leonie.jpg", gender: "f" },
        { name: "Anita Höfer", image: "Pofile Pictures/U18/Anita Höfer.jpg", gender: "f" },
        { name: "Melinda Cécile Maier", image: "Pofile Pictures/U18/Melinda Maier.jpg", gender: "f" },
        { name: "Miriam-Alina Manoli", image: "Pofile Pictures/U18/Miriam.jpg", gender: "f" },
        { name: "Britta Maier", image: "Pofile Pictures/U18/Britta Maier.jpg", gender: "f" },
        { name: "Emilia Holzwarth", image: "Pofile Pictures/U18/Emilia Holzwarth.jpg", gender: "f" },
        { name: "Michelle Marie Maier", image: null, gender: "f" },
        { name: "Jenny Höfer", image: "Pofile Pictures/U18/Jenny Höfer.jpg", gender: "f" },
        { name: "Marielen Grupp", image: "Pofile Pictures/U18/Marielen Grupp.jpg", gender: "f" },
        { name: "Marlen Maier", image: "Pofile Pictures/U18/Marlen Maier.jpg", gender: "f" },
        { name: "Jana Jolie Maier", image: "Pofile Pictures/U18/Jana Maier.jpg", gender: "f" },
        { name: "Leticia Höfer", image: "Pofile Pictures/U18/Leticia Höfer.jpg", gender: "f" },
        { name: "Anelice Lozneanu", image: "Pofile Pictures/U18/Anelice Lozneanu.jpg", gender: "f" },
        { name: "Anine Höfer", image: null, gender: "f" },
        { name: "Celine Grace Placinta", image: "Pofile Pictures/U18/Celine Grace Placinta.jpg", gender: "f" },
        { name: "Caitlyn Maier", image: "Pofile Pictures/U18/Caitlyn Maier.jpg", gender: "f" },
        { name: "Anne-Christin Müller", image: "Pofile Pictures/U18/Anne-Christin Müller.jpg", gender: "f" },
        // Jungs (m)
        { name: "Jannik-Noah Müller", image: "Pofile Pictures/U18/Jannik-Noah Müller.jpg", gender: "m" },
        { name: "Alexander Fächner", image: "Pofile Pictures/U18/Alexander Fächner.jpg", gender: "m" },
        { name: "Toni Felix Höfer", image: "Pofile Pictures/U18/Toni Felix Höfer.jpg", gender: "m" },
        { name: "Lennox Kolb", image: "Pofile Pictures/U18/Lennox Kolb.jpg", gender: "m" },
        { name: "Lenn Robin Diestelmeier", image: "Pofile Pictures/U18/Lenn Diestelmaier.jpg", gender: "m" },
        { name: "Louis Gabriel Maier", image: "Pofile Pictures/U18/Louis Maier.jpg", gender: "m" },
        { name: "Paul Holzwarth", image: null, gender: "m" },
        { name: "Chris Micha Kern", image: "Pofile Pictures/U18/Chris Micha Kern.jpg", gender: "m" },
        { name: "Johan Georgi Bali", image: "Pofile Pictures/U18/Johan Georgi Bali.jpg", gender: "m" },
        { name: "Simon Anton", image: "Pofile Pictures/U18/Simon Anton.mp4", gender: "m" },
        { name: "Jannis Höfer", image: "Pofile Pictures/U18/Jannis Höfer.jpg", gender: "m" },
        { name: "Benedikt Schniepp", image: "Pofile Pictures/U18/Benedikt Schniepp.jpg", gender: "m" },
        { name: "Alf Thomas Kern", image: "Pofile Pictures/U18/Alf Kern.jpg", gender: "m" },
        { name: "Matteo Höfer", image: "Pofile Pictures/U18/Matteo Höfer.jpg", gender: "m" },
        { name: "Lasse Hennig", image: "Pofile Pictures/U18/Lasse Henning.jpg", gender: "m" },
        { name: "Maurice Maier", image: "Pofile Pictures/U18/Maurcie Maier.jpg", gender: "m" },
        { name: "Jamie-Liam Müller", image: "Pofile Pictures/U18/Jamie Müller.jpg", gender: "m" },
        { name: "Henry Höfer", image: "Pofile Pictures/U18/Henry Höfer.jpg", gender: "m" },
        { name: "Florin Fächner", image: "Pofile Pictures/U18/Florin Fächner.jpg", gender: "m" },
        { name: "Dina Schneider", image: "Pofile Pictures/U18/Dina Schneider.jpg", gender: "m" },
        { name: "Riecky Kern", image: "Pofile Pictures/U18/Riecky Kern.jpg", gender: "f" },
        { name: "Elias Daniel Anton", image: "Pofile Pictures/U18/Elias Anton.jpg", gender: "m" },
        { name: "Ben-Collin Keller", image: "Pofile Pictures/U18/Ben-Collin Keller.jpg", gender: "m" },
        { name: "Tom Lenas Rebmann", image: "Pofile Pictures/U18/Tom Lenas Rebmann.jpg", gender: "m" },
    ],
    U26: [
        // Jungs (m)
        { name: "Samuel Mihai Anton", image: "Pofile Pictures/U26 Samvirk/Samuel Anton.jpg", gender: "m" },
        { name: "Sebastian jr. Anton", image: "Pofile Pictures/U26 Samvirk/Sebastian Anton.jpg", gender: "m" },
        { name: "Juan Gabriel Bojoi", image: "Pofile Pictures/U26 Samvirk/Juan Gabriel.jpg", gender: "m" },
        { name: "Henrik Sven Fächner", image: "Pofile Pictures/U26 Samvirk/Henrik Fächner.mp4", gender: "m" },
        { name: "Finn Arild Grupp", image: "Pofile Pictures/U26 Samvirk/Finn Grupp.jpg", gender: "m" },
        { name: "Lius Höfer", image: "Pofile Pictures/U26 Samvirk/Lius Höfer.jpg", gender: "m" },
        { name: "Marc Andre Höfer", image: "Pofile Pictures/U26 Samvirk/Marc Höfer.jpg", gender: "m" },
        { name: "Tim-Lukas Höfer", image: "Pofile Pictures/U26 Samvirk/Tim Lukas Höfer.jpg", gender: "m" },
        { name: "Daniel Kern", image: "Pofile Pictures/U26 Samvirk/Daniel Kern.jpg", gender: "m" },
        { name: "Harry Kern", image: "Pofile Pictures/U26 Samvirk/Harry Kern.jpg", gender: "m" },
        { name: "Hartmut Kern", image: "Pofile Pictures/U26 Samvirk/Hartmut Kern.jpg", gender: "m" },
        { name: "Kari Kern", image: "Pofile Pictures/U26 Samvirk/Kari Kern.jpg", gender: "m" },
        { name: "Theo Kern", image: "Pofile Pictures/U26 Samvirk/Theo Kern.jpg", gender: "m" },
        { name: "Romeo Kolb", image: "Pofile Pictures/U26 Samvirk/Romeo Kolb.jpg", gender: "m" },
        { name: "Kevin Maier", image: "Pofile Pictures/U26 Samvirk/Kevin Maier.jpg", gender: "m" },
        { name: "Leon Maier", image: "Pofile Pictures/U26 Samvirk/Leon Maier.jpg", gender: "m" },
        { name: "Tom Maier", image: "Pofile Pictures/U26 Samvirk/Tom Maier.jpg", gender: "m" },
        { name: "William Manoli", image: "Pofile Pictures/U26 Samvirk/William Manoli.jpg", gender: "m" },
        { name: "Henning Müller", image: "Pofile Pictures/U26 Samvirk/Henning Müller.jpg", gender: "m" },
        { name: "Jannik Noel Müller", image: "Pofile Pictures/U26 Samvirk/Jannik Müller.jpg", gender: "m" },
        { name: "Marcel Müller", image: null, gender: "m" },
        { name: "Phil Rube", image: "Pofile Pictures/U26 Samvirk/Phil Rube.jpg", gender: "m" },
        { name: "Sean Andrew Rube", image: "Pofile Pictures/U26 Samvirk/Sean Rube.mp4", gender: "m" },
        { name: "Marco Andres Schneider", image: "Pofile Pictures/U26 Samvirk/Marco Schneider.jpg", gender: "m" },
        { name: "Julian Magnus Lionel Schniepp", image: "Pofile Pictures/U26 Samvirk/Julian Schniepp.jpg", gender: "m" },
        { name: "Paul Schwarz", image: "Pofile Pictures/U26 Samvirk/Paul Schwarz.jpg", gender: "m" },
        // Mädels (f)
        { name: "Julia Elaine Fächner", image: "Pofile Pictures/U26 Samvirk/Julia Fächner.jpg", gender: "f" },
        { name: "Raluca Lozneanu", image: "Pofile Pictures/U26 Samvirk/Raluca .jpg", gender: "f" },
        { name: "Cindy Maier", image: "Pofile Pictures/U26 Samvirk/Cindy Maier.jpg", gender: "f" },
        { name: "Simona Nahorne", image: "Pofile Pictures/U26 Samvirk/Simona Nahorne.jpg", gender: "f" },
        { name: "Jill Rube", image: "Pofile Pictures/U26 Samvirk/Jill Rube.jpg", gender: "f" },
        { name: "Jana Schmidt", image: "Pofile Pictures/U26 Samvirk/Jana Schmidt.jpg", gender: "f" },
    ]
};

// ================= ITEM KONFIGURATION ===================

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
        { name: "Süßigkeiten-Tüte", image: "images/placeholder.png", rarity: "common", weight: 50, desc: "Zucker-Rush incoming! Dein Zahnarzt wird begeistert sein." },
        { name: "Kino-Gutschein", image: "images/placeholder.png", rarity: "common", weight: 45, desc: "Popcorn, großer Becher Cola und ein guter Film. Perfekt!" },
        { name: "Snack-Box", image: "images/placeholder.png", rarity: "common", weight: 40, desc: "Eine Box voller Leckereien. Teilen? Niemals!" },
        // Rare
        { name: "Gaming-Maus", image: "images/placeholder.png", rarity: "rare", weight: 25, desc: "Mehr DPI = mehr Skill. Oder so ähnlich..." },
        { name: "Kopfhörer", image: "images/placeholder.png", rarity: "rare", weight: 20, desc: "Musik an, Welt aus. So muss das sein!" },
        // Epic
        { name: "Bluetooth Speaker", image: "images/placeholder.png", rarity: "epic", weight: 10, desc: "Party-Modus aktiviert! Bass, der die Wände wackeln lässt." },
        // Legendary
        { name: "Nintendo Switch Spiel", image: "images/placeholder.png", rarity: "legendary", weight: 5, desc: "Ein neues Abenteuer wartet! Gaming-Session incoming!" },
    ],

    // ALL-IN Variante - Bessere Items möglich, aber auch Strafen
    ALL_IN: [
        // Common
        { name: "Süßigkeiten-Tüte", image: "images/placeholder.png", rarity: "common", weight: 30, desc: "Zucker-Rush incoming! Dein Zahnarzt wird begeistert sein." },
        { name: "Kino-Gutschein", image: "images/placeholder.png", rarity: "common", weight: 25, desc: "Popcorn, großer Becher Cola und ein guter Film. Perfekt!" },
        // Rare
        { name: "Gaming-Maus", image: "images/placeholder.png", rarity: "rare", weight: 20, desc: "Mehr DPI = mehr Skill. Oder so ähnlich..." },
        { name: "Kopfhörer", image: "images/placeholder.png", rarity: "rare", weight: 18, desc: "Musik an, Welt aus. So muss das sein!" },
        // Epic
        { name: "Bluetooth Speaker", image: "images/placeholder.png", rarity: "epic", weight: 15, desc: "Party-Modus aktiviert! Bass, der die Wände wackeln lässt." },
        { name: "Powerbank Premium", image: "images/placeholder.png", rarity: "epic", weight: 12, desc: "Nie wieder leerer Akku! Dein Handy wird dich lieben." },
        // Legendary
        { name: "Nintendo Switch Spiel", image: "images/placeholder.png", rarity: "legendary", weight: 8, desc: "Ein neues Abenteuer wartet! Gaming-Session incoming!" },
        { name: "AirPods", image: "images/airpods.png", rarity: "legendary", weight: 5, desc: "Kabellose Freiheit! Sieht auch noch stylisch aus." },
        // S-Tier
        { name: "Freizeitpark-Ticket", image: "images/placeholder.png", rarity: "stier", weight: 2, desc: "Achterbahnen, Zuckerwatte und Adrenalin! Der beste Tag ever!" },
        // Strafen
        { name: "Toiletten putzen", image: "images/placeholder.png", rarity: "punishment", weight: 15, desc: "Zeit für einen Frühjahrsputz! Die Klobürste ruft..." },
        { name: "Küchendienst", image: "images/placeholder.png", rarity: "punishment", weight: 12, desc: "Spülen, Abtrocknen, Aufräumen. Spaß garantiert... oder auch nicht." },
        { name: "Früh aufstehen", image: "images/placeholder.png", rarity: "punishment", weight: 10, desc: "Der frühe Vogel fängt den Wurm! Aufstehen um 6 Uhr!" },
    ]
};

// ==================== U26 SAMVIRK ITEMS ====================

const ITEMS_U26 = {
    // SAVE Variante - Sichere Items, keine Strafen
    SAVE: [
        // Common
        { name: "Kaffee-Gutschein", image: "images/placeholder.png", rarity: "common", weight: 50, desc: "Koffein-Kick gefällig? Damit bleibst du wach... vielleicht." },
        { name: "Snack-Paket", image: "images/placeholder.png", rarity: "common", weight: 45, desc: "Füttere deinen inneren Hamster. Nom nom nom!" },
        { name: "Getränke-Flatrate", image: "images/placeholder.png", rarity: "common", weight: 40, desc: "Trink so viel du willst! Deine Blase wird es lieben." },
        // Rare
        { name: "Restaurant-Gutschein", image: "images/placeholder.png", rarity: "rare", weight: 25, desc: "Endlich mal nicht selber kochen müssen. Luxus!" },
        { name: "Spotify Premium", image: "images/placeholder.png", rarity: "rare", weight: 20, desc: "Keine Werbung mehr! Deine Ohren werden dir danken." },
        // Epic
        { name: "Wellness-Gutschein", image: "images/placeholder.png", rarity: "epic", weight: 10, desc: "Entspannung pur. Wie ein Urlaub, nur kürzer." },
        // Legendary
        { name: "Konzertkarten", image: "images/placeholder.png", rarity: "legendary", weight: 5, desc: "Live-Musik! Deine Nachbarn werden neidisch sein." },
    ],

    // ALL-IN Variante - Bessere Items möglich, aber auch Strafen
    ALL_IN: [
        // Common
        { name: "Kaffee-Gutschein", image: "images/placeholder.png", rarity: "common", weight: 30, desc: "Koffein-Kick gefällig? Damit bleibst du wach... vielleicht." },
        { name: "Snack-Paket", image: "images/placeholder.png", rarity: "common", weight: 25, desc: "Füttere deinen inneren Hamster. Nom nom nom!" },
        // Rare
        { name: "Restaurant-Gutschein", image: "images/placeholder.png", rarity: "rare", weight: 20, desc: "Endlich mal nicht selber kochen müssen. Luxus!" },
        { name: "Spotify Premium", image: "images/placeholder.png", rarity: "rare", weight: 18, desc: "Keine Werbung mehr! Deine Ohren werden dir danken." },
        // Epic
        { name: "Wellness-Gutschein", image: "images/placeholder.png", rarity: "epic", weight: 15, desc: "Entspannung pur. Wie ein Urlaub, nur kürzer." },
        { name: "Gaming-Zubehör", image: "images/placeholder.png", rarity: "epic", weight: 12, desc: "Level up dein Gaming! Mehr FPS, mehr Spaß!" },
        // Legendary
        { name: "Konzertkarten", image: "images/placeholder.png", rarity: "legendary", weight: 8, desc: "Live-Musik! Deine Nachbarn werden neidisch sein." },
        { name: "AirPods Pro", image: "images/airpods.png", rarity: "legendary", weight: 5, desc: "Noise-Cancelling für nervige Kollegen. Genial!" },
        // S-Tier
        { name: "Fallschirm Sprung", image: "images/fallschirm.webp", rarity: "stier", weight: 2, desc: "YOLO! Einmal aus einem Flugzeug springen. Adrenalin pur!" },
        // Strafen
        { name: "Karaoke singen", image: "images/placeholder.png", rarity: "punishment", weight: 15, desc: "Zeit zu glänzen! Oder alle Ohren zum Bluten zu bringen..." },
        { name: "Aufräum-Dienst", image: "images/placeholder.png", rarity: "punishment", weight: 12, desc: "Putzen ist auch Sport! Quasi ein Ganzkörper-Workout." },
        { name: "Weck-Service um 6 Uhr", image: "images/placeholder.png", rarity: "punishment", weight: 10, desc: "Guten Morgen Sonnenschein! Zeit für Frühaufsteher-Vibes." },
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

/**
 * FAIRES BALANCING: Wählt eine Person fair aus
 * - 50% Chance für Mädchen, 50% Chance für Jungs
 * - Dann zufällige Auswahl innerhalb der Gruppe
 * - Falls eine Gruppe leer ist, wird aus der anderen gewählt
 */
function selectFairPerson(persons, excludeNames = []) {
    // Filtere bereits ausgewählte Personen
    const available = persons.filter(p => !excludeNames.includes(p.name));

    if (available.length === 0) return null;

    // Teile in Gruppen
    const males = available.filter(p => p.gender === 'm');
    const females = available.filter(p => p.gender === 'f');

    // Bestimme welche Gruppe gewählt wird (50/50)
    let selectedGroup;

    if (males.length === 0) {
        selectedGroup = females;
    } else if (females.length === 0) {
        selectedGroup = males;
    } else {
        // 50/50 Chance
        selectedGroup = Math.random() < 0.5 ? males : females;
    }

    // Zufällige Person aus der Gruppe
    const randomIndex = Math.floor(Math.random() * selectedGroup.length);
    return selectedGroup[randomIndex];
}

/**
 * Erstellt eine faire Track-Liste für die Animation
 * - Abwechselnd Mädchen und Jungs wo möglich
 * - Gewinner wird fair mit 50/50 bestimmt
 */
function createFairTrackList(persons, count, winner) {
    const track = [];
    const males = persons.filter(p => p.gender === 'm');
    const females = persons.filter(p => p.gender === 'f');

    for (let i = 0; i < count - 1; i++) {
        // Abwechselnd aus beiden Gruppen für visuelle Fairness
        let pool;
        if (i % 2 === 0) {
            pool = males.length > 0 ? males : females;
        } else {
            pool = females.length > 0 ? females : males;
        }
        const randomPerson = pool[Math.floor(Math.random() * pool.length)];
        track.push(randomPerson);
    }

    // Gewinner am Ende
    track.push(winner);

    return track;
}
