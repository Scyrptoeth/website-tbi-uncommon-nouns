import {
  type Difficulty,
  type NounEntry,
  type OptionKey,
  type Question,
  type TestPackage,
} from "./content";

const source = {
  sourceType: "tutor_review" as const,
  sourceName: "Persiapantubel tutor review",
  urlOrCitation: "advanced-uncommon-curation-2026-05",
  accessedAt: "2026-05-09",
  claimAllowed: false as const,
  sourceNote:
    "Reactivated from the archived specialized/uncommon reference set for advanced challenge practice; no claim that this item appeared in a real TOEFL, TOEIC, or IELTS exam.",
};

const advancedUncountableSeeds = [
  ["abrasion", "pengikisan", "a sign of abrasion", "science"],
  ["accretion", "pertambahan bertahap", "a layer of accretion", "geology"],
  ["adherence", "kepatuhan atau pelekatan", "strict adherence", "policy"],
  ["aeration", "pengudaraan", "proper aeration", "agriculture"],
  ["albedo", "daya pantul permukaan", "an albedo value", "climate"],
  ["anonymity", "anonimitas", "complete anonymity", "digital"],
  ["apathy", "sikap acuh tak acuh", "public apathy", "society"],
  ["arbitrage", "selisih beli-jual untuk untung", "currency arbitrage", "finance"],
  ["asbestos", "asbes", "a sheet of asbestos", "materials"],
  ["audacity", "keberanian nekat", "sheer audacity", "behavior"],
  ["biodiversity", "keanekaragaman hayati", "rich biodiversity", "environment"],
  ["birefringence", "pembiasan ganda", "optical birefringence", "physics"],
  ["bitumen", "aspal alami atau bitumen", "a layer of bitumen", "construction"],
  ["bravado", "gaya sok berani", "empty bravado", "behavior"],
  ["brine", "air garam pekat", "a tank of brine", "food"],
  ["camouflage", "penyamaran", "effective camouflage", "biology"],
  ["candor", "keterusterangan", "rare candor", "communication"],
  ["carcinogenesis", "pembentukan kanker", "chemical carcinogenesis", "medicine"],
  ["cartilage", "tulang rawan", "a piece of cartilage", "anatomy"],
  ["causality", "hubungan sebab-akibat", "clear causality", "research"],
  ["chitin", "kitin", "a layer of chitin", "biology"],
  ["chlorophyll", "klorofil", "green chlorophyll", "botany"],
  ["coagulation", "penggumpalan", "blood coagulation", "medicine"],
  ["cohesion", "keterpaduan atau daya rekat", "social cohesion", "society"],
  ["combustion", "pembakaran", "a combustion reaction", "chemistry"],
  ["compost", "kompos", "a bag of compost", "agriculture"],
  ["condensation", "pengembunan", "surface condensation", "physics"],
  ["conformity", "keseragaman atau kepatuhan sosial", "social conformity", "psychology"],
  ["contagion", "penularan", "a risk of contagion", "health"],
  ["corrosion", "korosi", "a patch of corrosion", "engineering"],
  ["curvature", "kelengkungan", "a degree of curvature", "geometry"],
  ["debris", "puing atau serpihan", "a pile of debris", "disaster"],
  ["decay", "pelapukan atau pembusukan", "a sign of decay", "health"],
  ["deforestation", "penggundulan hutan", "rapid deforestation", "environment"],
  ["deference", "rasa hormat atau sikap tunduk", "a gesture of deference", "culture"],
  ["desalination", "penyulingan air laut", "large-scale desalination", "water"],
  ["detritus", "sisa organik atau serpihan", "a layer of detritus", "ecology"],
  ["diction", "pilihan kata", "precise diction", "language"],
  ["dormancy", "masa tidak aktif", "a period of dormancy", "biology"],
  ["drought", "kekeringan", "a period of drought", "climate"],
  ["effervescence", "gelembung atau semangat berkilau", "soft effervescence", "chemistry"],
  ["elasticity", "elastisitas", "a measure of elasticity", "economics"],
  ["empathy", "empati", "genuine empathy", "psychology"],
  ["erosion", "erosi", "coastal erosion", "geography"],
  ["ethanol", "etanol", "a bottle of ethanol", "chemistry"],
  ["euphoria", "rasa gembira berlebihan", "a wave of euphoria", "emotion"],
  ["eutrophication", "penyuburan air berlebih", "lake eutrophication", "environment"],
  ["evaporation", "penguapan", "a rate of evaporation", "physics"],
  ["exuberance", "kegembiraan meluap", "youthful exuberance", "behavior"],
  ["fibrosis", "pengerasan jaringan", "a stage of fibrosis", "medicine"],
  ["filtration", "penyaringan", "water filtration", "technology"],
  ["fluency", "kelancaran berbahasa", "spoken fluency", "language"],
  ["foliage", "dedaunan", "dense foliage", "botany"],
  ["friction", "gesekan", "a coefficient of friction", "physics"],
  ["fungicide", "zat antijamur", "a dose of fungicide", "agriculture"],
  ["gallium", "galium", "a sample of gallium", "chemistry"],
  ["granite", "granit", "a slab of granite", "materials"],
  ["grit", "ketabahan atau pasir kasar", "personal grit", "character"],
  ["habituation", "pembiasaan stimulus", "behavioral habituation", "psychology"],
  ["haze", "kabut asap", "a layer of haze", "weather"],
  ["hemostasis", "penghentian perdarahan", "normal hemostasis", "medicine"],
  ["heredity", "pewarisan sifat", "genetic heredity", "biology"],
  ["hindsight", "pemahaman setelah kejadian", "the benefit of hindsight", "thinking"],
  ["humidity", "kelembapan udara", "a level of humidity", "weather"],
  ["inertia", "kelembaman", "institutional inertia", "physics"],
  ["infiltration", "peresapan atau penyusupan", "a rate of infiltration", "water"],
  ["ingenuity", "kecerdikan", "technical ingenuity", "innovation"],
  ["insulation", "isolasi atau pelindung panas", "a layer of insulation", "construction"],
  ["introspection", "perenungan diri", "quiet introspection", "psychology"],
  ["irrigation", "irigasi", "drip irrigation", "agriculture"],
  ["kinship", "kekerabatan", "a sense of kinship", "anthropology"],
  ["lactose", "laktosa", "a gram of lactose", "nutrition"],
  ["latency", "jeda keterlambatan", "network latency", "technology"],
  ["leverage", "daya ungkit atau pengaruh", "financial leverage", "business"],
  ["limestone", "batu kapur", "a block of limestone", "geology"],
  ["literacy", "kemelekan baca/tulis", "digital literacy", "education"],
  ["magnetism", "kemagnetan", "strong magnetism", "physics"],
  ["malnutrition", "kekurangan gizi", "child malnutrition", "health"],
  ["manganese", "mangan", "a trace of manganese", "chemistry"],
  ["masonry", "pekerjaan pasangan batu", "a section of masonry", "construction"],
  ["melancholy", "kemurungan", "deep melancholy", "emotion"],
  ["methane", "metana", "a molecule of methane", "climate"],
  ["mileage", "jarak tempuh atau manfaat", "a mileage figure", "transport"],
  ["mirth", "kegembiraan tawa", "a moment of mirth", "emotion"],
  ["mold", "jamur atau lapuk", "a patch of mold", "health"],
  ["morphology", "bentuk atau struktur", "a study of morphology", "science"],
  ["mucus", "lendir", "a layer of mucus", "anatomy"],
  ["negligence", "kelalaian", "professional negligence", "law"],
  ["nostalgia", "kerinduan masa lalu", "a wave of nostalgia", "emotion"],
  ["opacity", "ketidaktembusan atau ketidakjelasan", "a degree of opacity", "design"],
  ["ozone", "ozon", "a concentration of ozone", "environment"],
  ["perseverance", "ketekunan", "steady perseverance", "character"],
  ["permafrost", "tanah beku permanen", "a layer of permafrost", "climate"],
  ["porosity", "tingkat berpori", "a porosity value", "materials"],
  ["precipitation", "curah hujan atau endapan", "annual precipitation", "weather"],
  ["proficiency", "kemahiran", "a level of proficiency", "education"],
  ["quartz", "kuarsa", "a crystal of quartz", "geology"],
  ["resilience", "ketangguhan", "a measure of resilience", "planning"],
  ["salinity", "kadar garam", "a salinity level", "ocean"],
  ["sediment", "endapan", "a layer of sediment", "geology"],
] as const;

const advancedCountableSeeds = [
  ["abutment", "abutments", "penopang ujung jembatan", "engineering"],
  ["acorn", "acorns", "buah ek", "botany"],
  ["adage", "adages", "pepatah", "language"],
  ["airfoil", "airfoils", "bentuk sayap pengangkat", "aviation"],
  ["alga", "algae", "satu ganggang", "biology"],
  ["alcove", "alcoves", "ceruk ruangan", "architecture"],
  ["amulet", "amulets", "jimat", "culture"],
  ["anvil", "anvils", "landasan tempa", "tools"],
  ["aperture", "apertures", "bukaan lensa atau celah", "photography"],
  ["arbiter", "arbiters", "penengah keputusan", "law"],
  ["archipelago", "archipelagos", "gugusan pulau", "geography"],
  ["artifact", "artifacts", "benda peninggalan", "history"],
  ["asymptote", "asymptotes", "garis batas kurva", "math"],
  ["barometer", "barometers", "alat ukur tekanan udara", "weather"],
  ["bastion", "bastions", "benteng pertahanan", "history"],
  ["beaker", "beakers", "gelas kimia", "lab"],
  ["beetle", "beetles", "kumbang", "biology"],
  ["bivalve", "bivalves", "kerang dua cangkang", "marine"],
  ["blight", "blights", "penyakit tanaman", "agriculture"],
  ["bollard", "bollards", "tiang penghalang pendek", "urban"],
  ["bracket", "brackets", "penyangga atau tanda kurung", "design"],
  ["bract", "bracts", "daun pelindung bunga", "botany"],
  ["burrow", "burrows", "liang hewan", "ecology"],
  ["cairn", "cairns", "tumpukan batu penanda", "outdoor"],
  ["caldera", "calderas", "kawah vulkanik besar", "geology"],
  ["canopy", "canopies", "kanopi atau tajuk pohon", "nature"],
  ["carapace", "carapaces", "cangkang punggung", "biology"],
  ["catalyst", "catalysts", "pemicu atau katalis", "chemistry"],
  ["cavern", "caverns", "gua besar", "geography"],
  ["cistern", "cisterns", "tangki air", "infrastructure"],
  ["clause", "clauses", "klausa", "grammar"],
  ["cleft", "clefts", "celah atau rekahan", "anatomy"],
  ["cloister", "cloisters", "lorong biara", "architecture"],
  ["cochlea", "cochleae", "rumah siput telinga", "anatomy"],
  ["colonnade", "colonnades", "deretan pilar", "architecture"],
  ["conifer", "conifers", "pohon berbiji kerucut", "botany"],
  ["crater", "craters", "kawah", "geology"],
  ["crucible", "crucibles", "wadah peleburan", "lab"],
  ["culvert", "culverts", "gorong-gorong", "infrastructure"],
  ["cusp", "cusps", "ujung runcing atau titik batas", "math"],
  ["dais", "daises", "panggung kecil kehormatan", "public space"],
  ["dendrite", "dendrites", "cabang sel saraf", "biology"],
  ["diaphragm", "diaphragms", "diafragma atau sekat", "anatomy"],
  ["dike", "dikes", "tanggul", "water"],
  ["diorama", "dioramas", "maket pemandangan", "museum"],
  ["dormer", "dormers", "jendela atap", "architecture"],
  ["eddy", "eddies", "pusaran kecil", "water"],
  ["easel", "easels", "penyangga lukisan", "art"],
  ["embankment", "embankments", "tanggul tanah", "infrastructure"],
  ["emblem", "emblems", "lambang", "culture"],
  ["enclave", "enclaves", "wilayah kantong", "geography"],
  ["enzyme", "enzymes", "enzim", "biology"],
  ["epitaph", "epitaphs", "tulisan nisan", "history"],
  ["estuary", "estuaries", "muara pasang-surut", "geography"],
  ["facade", "facades", "tampak depan bangunan", "architecture"],
  ["fissure", "fissures", "retakan panjang", "geology"],
  ["flange", "flanges", "bibir sambungan pipa", "engineering"],
  ["floret", "florets", "bunga kecil", "botany"],
  ["fresco", "frescoes", "lukisan dinding basah", "art"],
  ["fuse", "fuses", "sekering", "electricity"],
  ["gait", "gaits", "cara berjalan", "movement"],
  ["gasket", "gaskets", "paking penyekat", "mechanics"],
  ["gauge", "gauges", "alat ukur atau ukuran standar", "tools"],
  ["groove", "grooves", "alur", "materials"],
  ["grotto", "grottoes", "gua kecil buatan atau alami", "landscape"],
  ["gully", "gullies", "parit erosi", "geography"],
  ["harpoon", "harpoons", "tombak ikan", "maritime"],
  ["hinge", "hinges", "engsel", "hardware"],
  ["hive", "hives", "sarang lebah", "ecology"],
  ["hollow", "hollows", "cekungan atau rongga", "landform"],
  ["husk", "husks", "sekam atau kulit luar", "agriculture"],
  ["inlet", "inlets", "teluk kecil atau saluran masuk", "geography"],
  ["juncture", "junctures", "titik sambung atau momen penting", "planning"],
  ["keel", "keels", "lunas kapal", "maritime"],
  ["kiln", "kilns", "tungku pembakaran", "craft"],
  ["lattice", "lattices", "kisi-kisi", "structure"],
  ["ledger", "ledgers", "buku besar", "finance"],
  ["ligament", "ligaments", "ligamen", "anatomy"],
  ["lobe", "lobes", "cuping atau bagian bundar", "anatomy"],
  ["mangrove", "mangroves", "bakau", "ecology"],
  ["manifold", "manifolds", "pipa bercabang atau rangkaian", "engineering"],
  ["marsh", "marshes", "rawa", "ecology"],
  ["meander", "meanders", "kelokan sungai", "geography"],
  ["mezzanine", "mezzanines", "lantai antara", "architecture"],
  ["mollusk", "mollusks", "moluska", "biology"],
  ["monolith", "monoliths", "batu tunggal besar", "history"],
  ["moraine", "moraines", "endapan gletser", "geology"],
  ["notch", "notches", "lekukan atau takik", "design"],
  ["oasis", "oases", "oase", "geography"],
  ["obelisk", "obelisks", "tugu runcing", "history"],
  ["outcrop", "outcrops", "singkapan batu", "geology"],
  ["parapet", "parapets", "dinding rendah tepi atap", "architecture"],
  ["peatland", "peatlands", "lahan gambut", "environment"],
  ["pendulum", "pendulums", "bandul", "physics"],
  ["periscope", "periscopes", "periskop", "optics"],
  ["quarry", "quarries", "tambang batu", "industry"],
  ["reef", "reefs", "terumbu", "marine"],
  ["rivet", "rivets", "paku keling", "engineering"],
  ["silo", "silos", "menara penyimpanan", "agriculture"],
  ["synapse", "synapses", "celah penghubung sel saraf", "biology"],
] as const;

const expectedChallengeNounsPerType = 100;
const entriesPerTypePerChallengePackage = 5;
const challengeQuestionsPerPackage = entriesPerTypePerChallengePackage * 2;
const expectedChallengePackageCount = expectedChallengeNounsPerType / entriesPerTypePerChallengePackage;

const difficultyByIndex = (index: number): Difficulty => {
  if (index % 10 === 8 || index % 10 === 9) return "advanced";
  if (index % 10 >= 4) return "medium";
  return "core";
};

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const maybePluralize = (value: string) => {
  if (value.endsWith("y")) return `${value.slice(0, -1)}ies`;
  if (value.endsWith("s") || value.endsWith("x") || value.endsWith("ch") || value.endsWith("sh")) {
    return `${value}es`;
  }
  return `${value}s`;
};

const classificationOptions: Array<{ key: OptionKey; text: string }> = [
  { key: "A", text: "Uncountable Noun" },
  { key: "B", text: "Countable Noun" },
];

const advancedUncountableEntries: NounEntry[] = advancedUncountableSeeds.map(
  ([displayNoun, meaning, quantityExpression, topic], index) => ({
    id: "advanced-uncountable-" + slugify(displayNoun),
    nounType: "uncountable" as const,
    displayNoun,
    meaning,
    topic,
    difficulty: difficultyByIndex(index),
    usageNote:
      displayNoun +
      " dipakai sebagai uncountable noun dalam konteks " +
      topic +
      "; fokusnya adalah konsep, zat, atau proses, bukan satuan benda yang dihitung langsung.",
    commonMistake:
      "Jangan langsung memakai a/an atau bentuk plural untuk " + displayNoun + " dalam konteks ini.",
    quantityExpression,
    countableAlternative: quantityExpression,
    classificationHint: "Konteks " + topic + ": " + meaning + ".",
    ...source,
  }),
);

const advancedCountableEntries: NounEntry[] = advancedCountableSeeds.map(
  ([singularForm, pluralForm, meaning, topic], index) => ({
    id: "advanced-countable-" + slugify(singularForm),
    nounType: "countable" as const,
    displayNoun: singularForm,
    meaning,
    topic,
    difficulty: difficultyByIndex(index),
    usageNote:
      singularForm +
      " adalah countable noun dalam konteks " +
      topic +
      "; gunakan bentuk plural ketika jumlahnya lebih dari satu.",
    commonMistake:
      "Setelah penanda jumlah seperti two, several, atau many, gunakan bentuk plural " + pluralForm + ".",
    singularForm,
    pluralForm,
    pluralType:
      String(singularForm) === String(pluralForm)
        ? "zero"
        : String(pluralForm) === maybePluralize(singularForm)
          ? "regular"
          : "irregular",
    classificationHint: "Konteks " + topic + ": " + meaning + ".",
    ...source,
  }),
);

export const challengeNounEntries: NounEntry[] = [
  ...advancedUncountableEntries,
  ...advancedCountableEntries,
].sort((left, right) => left.displayNoun.localeCompare(right.displayNoun));

const challengeQuestion = (entry: NounEntry, packageSlug: string): Question => {
  const answerKey: OptionKey = entry.nounType === "uncountable" ? "A" : "B";
  const ruleText =
    entry.nounType === "uncountable"
      ? "Dalam konteks ini, " +
        entry.displayNoun +
        ' tidak dihitung langsung satu per satu. Gunakan ungkapan seperti "' +
        entry.quantityExpression +
        '" jika perlu menunjukkan jumlah.'
      : "Dalam konteks ini, " +
        entry.displayNoun +
        ' dapat dihitung. Bentuk singularnya "' +
        entry.singularForm +
        '" dan pluralnya "' +
        entry.pluralForm +
        '".';

  return {
    id: packageSlug + "-" + entry.id,
    packageSlug,
    nounId: entry.id,
    prompt:
      "Dalam konteks " +
      entry.topic +
      " (" +
      entry.meaning +
      '), tentukan jenis noun berikut: "' +
      entry.displayNoun +
      '".',
    options: classificationOptions,
    answerKey,
    explanation:
      entry.displayNoun +
      ' berarti "' +
      entry.meaning +
      '". ' +
      ruleText +
      " Jawaban yang tepat adalah " +
      answerKey +
      " (" +
      (entry.nounType === "uncountable" ? "Uncountable Noun" : "Countable Noun") +
      ").",
  };
};

const challengePermutation = [0, 5, 6, 1, 7, 2, 3, 8, 4, 9] as const;
const oddChallengePermutation = [5, 0, 1, 6, 2, 7, 8, 3, 9, 4] as const;

const reorderForChallenge = (entries: NounEntry[], packageIndex: number) =>
  (packageIndex % 2 === 0 ? challengePermutation : oddChallengePermutation).map((index) => entries[index]);

const buildChallengePackages = (): TestPackage[] =>
  Array.from({ length: expectedChallengePackageCount }, (_, packageIndex) => {
    const slug = "challenge-" + String(packageIndex + 1).padStart(2, "0");
    const start = packageIndex * entriesPerTypePerChallengePackage;
    const packageEntries = [
      ...advancedUncountableEntries.slice(start, start + entriesPerTypePerChallengePackage),
      ...advancedCountableEntries.slice(start, start + entriesPerTypePerChallengePackage),
    ];

    return {
      slug,
      title: "Tantangan " + String(packageIndex + 1).padStart(2, "0"),
      packageType: "mixed" as const,
      order: packageIndex + 1,
      questions: reorderForChallenge(packageEntries, packageIndex).map((entry) =>
        challengeQuestion(entry, slug),
      ),
    };
  });

export const challengePackages = buildChallengePackages();

const challengeUncountableCount = advancedUncountableEntries.length;
const challengeCountableCount = advancedCountableEntries.length;

export const challengeStats = {
  uncountableCount: challengeUncountableCount,
  countableCount: challengeCountableCount,
  totalEntries: challengeNounEntries.length,
  totalQuestions: challengePackages.reduce((total, item) => total + item.questions.length, 0),
  totalPackages: challengePackages.length,
};

const findDuplicates = (values: string[]) => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
};

const duplicateChallengeIds = findDuplicates(challengeNounEntries.map((entry) => entry.id));
const duplicateChallengeDisplayNouns = findDuplicates(
  challengeNounEntries.map((entry) => slugify(entry.displayNoun)),
);
const incompleteChallengePackages = challengePackages.filter(
  (item) => item.questions.length !== challengeQuestionsPerPackage,
);
const patternedChallengePackages = challengePackages.filter((item) => {
  const sequence = item.questions.map((question) => question.answerKey).join("");
  return sequence === "ABABABABAB" || sequence === "BABABABABA" || sequence.startsWith("AAAAA") || sequence.startsWith("BBBBB");
});

if (
  challengeStats.uncountableCount !== expectedChallengeNounsPerType ||
  challengeStats.countableCount !== expectedChallengeNounsPerType ||
  challengeStats.totalQuestions !== expectedChallengeNounsPerType * 2 ||
  challengeStats.totalPackages !== expectedChallengePackageCount ||
  incompleteChallengePackages.length > 0
) {
  throw new Error(
    "TBI challenge content must contain " +
      expectedChallengeNounsPerType +
      " uncountable entries, " +
      expectedChallengeNounsPerType +
      " countable entries, " +
      expectedChallengeNounsPerType * 2 +
      " questions, and " +
      expectedChallengePackageCount +
      " complete challenge packages.",
  );
}

if (duplicateChallengeIds.length > 0 || duplicateChallengeDisplayNouns.length > 0) {
  throw new Error(
    "TBI challenge content must not contain duplicate ids or display nouns. Duplicate ids: " +
      (duplicateChallengeIds.join(", ") || "-") +
      "; duplicate nouns: " +
      (duplicateChallengeDisplayNouns.join(", ") || "-"),
  );
}

if (patternedChallengePackages.length > 0) {
  throw new Error(
    "TBI challenge packages must not expose a simple answer pattern: " +
      patternedChallengePackages.map((item) => item.slug).join(", "),
  );
}
