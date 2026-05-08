export type NounType = "uncountable" | "countable";
export type Difficulty = "core" | "medium" | "advanced";
export type PackageType = "mixed";

export type NounEntry = {
  id: string;
  nounType: NounType;
  displayNoun: string;
  meaning: string;
  topic: string;
  difficulty: Difficulty;
  usageNote: string;
  commonMistake: string;
  sourceType: "dictionary" | "grammar_reference" | "tutor_review";
  sourceName: string;
  urlOrCitation: string;
  accessedAt: string;
  claimAllowed: false;
  sourceNote: string;
  quantityExpression?: string;
  countableAlternative?: string;
  singularForm?: string;
  pluralForm?: string;
  pluralType?: "regular" | "irregular" | "zero" | "foreign" | "compound";
};

export type OptionKey = "A" | "B";

export type Question = {
  id: string;
  packageSlug: string;
  nounId: string;
  prompt: string;
  options: Array<{ key: OptionKey; text: string }>;
  answerKey: OptionKey;
  explanation: string;
};

export type TestPackage = {
  slug: string;
  title: string;
  packageType: PackageType;
  order: number;
  questions: Question[];
};

const source = {
  sourceType: "tutor_review" as const,
  sourceName: "Persiapantubel tutor review",
  urlOrCitation: "common-noun-curation-2026-05",
  accessedAt: "2026-05-09",
  claimAllowed: false as const,
  sourceNote:
    "Validated for learning use; no claim that this item appeared in a real TOEFL, TOEIC, or IELTS exam.",
};

const difficultyByIndex = (index: number): Difficulty => {
  if (index % 10 === 8 || index % 10 === 9) return "advanced";
  if (index % 10 >= 4) return "medium";
  return "core";
};

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const uncountableSeeds = [
  ["water", "air", "a glass of water", "food and drink"],
  ["milk", "susu", "a carton of milk", "food and drink"],
  ["rice", "nasi atau beras", "a bowl of rice", "food and drink"],
  ["sugar", "gula", "a spoonful of sugar", "food and drink"],
  ["salt", "garam", "a pinch of salt", "food and drink"],
  ["flour", "tepung", "a bag of flour", "food and drink"],
  ["bread", "roti", "a slice of bread", "food and drink"],
  ["butter", "mentega", "a pat of butter", "food and drink"],
  ["cheese", "keju", "a piece of cheese", "food and drink"],
  ["honey", "madu", "a spoonful of honey", "food and drink"],
  ["meat", "daging", "a piece of meat", "food and drink"],
  ["coffee", "kopi", "a cup of coffee", "food and drink"],
  ["tea", "teh", "a cup of tea", "food and drink"],
  ["juice", "jus", "a glass of juice", "food and drink"],
  ["oil", "minyak", "a bottle of oil", "food and drink"],
  ["soup", "sup", "a bowl of soup", "food and drink"],
  ["cereal", "sereal", "a box of cereal", "food and drink"],
  ["pasta", "pasta", "a serving of pasta", "food and drink"],
  ["air", "udara", "a breath of air", "nature"],
  ["weather", "cuaca", "a spell of bad weather", "nature"],
  ["rain", "hujan", "a drop of rain", "nature"],
  ["snow", "salju", "a blanket of snow", "nature"],
  ["ice", "es", "a cube of ice", "nature"],
  ["sunshine", "sinar matahari", "a burst of sunshine", "nature"],
  ["heat", "panas", "a wave of heat", "nature"],
  ["light", "cahaya", "a beam of light", "nature"],
  ["electricity", "listrik", "a supply of electricity", "home"],
  ["energy", "energi", "a lot of energy", "daily life"],
  ["music", "musik", "a piece of music", "daily life"],
  ["traffic", "lalu lintas", "heavy traffic", "transport"],
  ["homework", "pekerjaan rumah", "a piece of homework", "school"],
  ["housework", "pekerjaan rumah tangga", "a lot of housework", "home"],
  ["work", "pekerjaan", "a lot of work", "work"],
  ["money", "uang", "a sum of money", "daily life"],
  ["cash", "uang tunai", "some cash", "daily life"],
  ["advice", "nasihat", "a piece of advice", "communication"],
  ["information", "informasi", "a piece of information", "communication"],
  ["news", "berita", "a piece of news", "communication"],
  ["knowledge", "pengetahuan", "a body of knowledge", "school"],
  ["research", "penelitian", "a piece of research", "school"],
  ["evidence", "bukti", "a piece of evidence", "communication"],
  ["furniture", "perabotan", "a piece of furniture", "home"],
  ["luggage", "barang bawaan", "a piece of luggage", "travel"],
  ["baggage", "bagasi", "a piece of baggage", "travel"],
  ["equipment", "peralatan", "a piece of equipment", "daily life"],
  ["clothing", "pakaian", "an item of clothing", "daily life"],
  ["jewelry", "perhiasan", "a piece of jewelry", "daily life"],
  ["mail", "surat atau kiriman", "a piece of mail", "communication"],
  ["software", "perangkat lunak", "a piece of software", "technology"],
  ["hardware", "perangkat keras", "a piece of hardware", "technology"],
  ["access", "akses", "a level of access", "technology"],
  ["permission", "izin", "a form of permission", "daily life"],
  ["help", "bantuan", "some help", "daily life"],
  ["progress", "kemajuan", "steady progress", "school"],
  ["education", "pendidikan", "basic education", "school"],
  ["health", "kesehatan", "good health", "daily life"],
  ["sleep", "tidur", "a night of sleep", "daily life"],
  ["fun", "kesenangan", "a lot of fun", "daily life"],
  ["luck", "keberuntungan", "a bit of luck", "daily life"],
  ["patience", "kesabaran", "a lot of patience", "character"],
  ["courage", "keberanian", "a great deal of courage", "character"],
  ["confidence", "kepercayaan diri", "a boost of confidence", "character"],
  ["happiness", "kebahagiaan", "a sense of happiness", "feeling"],
  ["sadness", "kesedihan", "a feeling of sadness", "feeling"],
  ["anger", "kemarahan", "a flash of anger", "feeling"],
  ["beauty", "keindahan", "natural beauty", "daily life"],
  ["love", "cinta", "a lot of love", "feeling"],
  ["peace", "kedamaian", "a period of peace", "society"],
  ["safety", "keselamatan", "a sense of safety", "daily life"],
  ["freedom", "kebebasan", "a degree of freedom", "society"],
  ["pollution", "polusi", "a level of pollution", "environment"],
  ["garbage", "sampah", "a bag of garbage", "home"],
  ["trash", "sampah", "a bag of trash", "home"],
  ["waste", "limbah", "a lot of waste", "environment"],
  ["dust", "debu", "a layer of dust", "home"],
  ["dirt", "kotoran atau tanah", "a patch of dirt", "nature"],
  ["sand", "pasir", "a grain of sand", "nature"],
  ["soil", "tanah", "a handful of soil", "nature"],
  ["grass", "rumput", "a patch of grass", "nature"],
  ["wood", "kayu", "a piece of wood", "materials"],
  ["paper", "kertas", "a sheet of paper", "materials"],
  ["plastic", "plastik", "a piece of plastic", "materials"],
  ["glass", "kaca", "a piece of glass", "materials"],
  ["metal", "logam", "a piece of metal", "materials"],
  ["gold", "emas", "a bar of gold", "materials"],
  ["silver", "perak", "a piece of silver", "materials"],
  ["steel", "baja", "a beam of steel", "materials"],
  ["cotton", "kapas", "a ball of cotton", "materials"],
  ["wool", "wol", "a ball of wool", "materials"],
  ["leather", "kulit", "a piece of leather", "materials"],
  ["hair", "rambut", "a strand of hair", "body"],
  ["soap", "sabun", "a bar of soap", "home"],
  ["toothpaste", "pasta gigi", "a tube of toothpaste", "home"],
  ["shampoo", "sampo", "a bottle of shampoo", "home"],
  ["medicine", "obat", "a dose of medicine", "health"],
  ["food", "makanan", "a plate of food", "food and drink"],
  ["fuel", "bahan bakar", "a tank of fuel", "transport"],
  ["gasoline", "bensin", "a liter of gasoline", "transport"],
  ["oxygen", "oksigen", "a supply of oxygen", "health"],
  ["smoke", "asap", "a cloud of smoke", "nature"],
] as const;

const countableSeeds = [
  ["apple", "apples", "apel", "food and drink"],
  ["banana", "bananas", "pisang", "food and drink"],
  ["orange", "oranges", "jeruk", "food and drink"],
  ["egg", "eggs", "telur", "food and drink"],
  ["sandwich", "sandwiches", "roti lapis", "food and drink"],
  ["bottle", "bottles", "botol", "food and drink"],
  ["cup", "cups", "cangkir", "food and drink"],
  ["plate", "plates", "piring", "food and drink"],
  ["spoon", "spoons", "sendok", "food and drink"],
  ["fork", "forks", "garpu", "food and drink"],
  ["knife", "knives", "pisau", "food and drink"],
  ["chair", "chairs", "kursi", "home"],
  ["table", "tables", "meja", "home"],
  ["bed", "beds", "tempat tidur", "home"],
  ["door", "doors", "pintu", "home"],
  ["window", "windows", "jendela", "home"],
  ["room", "rooms", "ruangan", "home"],
  ["house", "houses", "rumah", "home"],
  ["apartment", "apartments", "apartemen", "home"],
  ["car", "cars", "mobil", "transport"],
  ["bus", "buses", "bus", "transport"],
  ["train", "trains", "kereta", "transport"],
  ["bicycle", "bicycles", "sepeda", "transport"],
  ["phone", "phones", "telepon", "technology"],
  ["computer", "computers", "komputer", "technology"],
  ["bag", "bags", "tas", "daily life"],
  ["book", "books", "buku", "school"],
  ["notebook", "notebooks", "buku catatan", "school"],
  ["pen", "pens", "pulpen", "school"],
  ["pencil", "pencils", "pensil", "school"],
  ["letter", "letters", "surat", "communication"],
  ["email", "emails", "email", "communication"],
  ["ticket", "tickets", "tiket", "travel"],
  ["key", "keys", "kunci", "daily life"],
  ["wallet", "wallets", "dompet", "daily life"],
  ["shirt", "shirts", "kemeja", "daily life"],
  ["shoe", "shoes", "sepatu", "daily life"],
  ["hat", "hats", "topi", "daily life"],
  ["coat", "coats", "mantel", "daily life"],
  ["towel", "towels", "handuk", "home"],
  ["toothbrush", "toothbrushes", "sikat gigi", "home"],
  ["mirror", "mirrors", "cermin", "home"],
  ["clock", "clocks", "jam dinding", "home"],
  ["watch", "watches", "jam tangan", "daily life"],
  ["lamp", "lamps", "lampu", "home"],
  ["picture", "pictures", "gambar", "daily life"],
  ["photo", "photos", "foto", "daily life"],
  ["idea", "ideas", "ide", "communication"],
  ["question", "questions", "pertanyaan", "school"],
  ["answer", "answers", "jawaban", "school"],
  ["problem", "problems", "masalah", "daily life"],
  ["mistake", "mistakes", "kesalahan", "school"],
  ["plan", "plans", "rencana", "daily life"],
  ["job", "jobs", "pekerjaan", "work"],
  ["task", "tasks", "tugas", "work"],
  ["meeting", "meetings", "rapat", "work"],
  ["lesson", "lessons", "pelajaran", "school"],
  ["class", "classes", "kelas", "school"],
  ["course", "courses", "kursus", "school"],
  ["student", "students", "siswa", "school"],
  ["teacher", "teachers", "guru", "school"],
  ["friend", "friends", "teman", "people"],
  ["child", "children", "anak", "people"],
  ["person", "people", "orang", "people"],
  ["man", "men", "pria", "people"],
  ["woman", "women", "wanita", "people"],
  ["city", "cities", "kota", "place"],
  ["village", "villages", "desa", "place"],
  ["country", "countries", "negara", "place"],
  ["street", "streets", "jalan", "place"],
  ["road", "roads", "jalan raya", "place"],
  ["park", "parks", "taman", "place"],
  ["restaurant", "restaurants", "restoran", "place"],
  ["shop", "shops", "toko", "place"],
  ["school", "schools", "sekolah", "place"],
  ["office", "offices", "kantor", "place"],
  ["hospital", "hospitals", "rumah sakit", "place"],
  ["bank", "banks", "bank", "place"],
  ["market", "markets", "pasar", "place"],
  ["beach", "beaches", "pantai", "nature"],
  ["mountain", "mountains", "gunung", "nature"],
  ["river", "rivers", "sungai", "nature"],
  ["lake", "lakes", "danau", "nature"],
  ["island", "islands", "pulau", "nature"],
  ["tree", "trees", "pohon", "nature"],
  ["flower", "flowers", "bunga", "nature"],
  ["leaf", "leaves", "daun", "nature"],
  ["bird", "birds", "burung", "animal"],
  ["dog", "dogs", "anjing", "animal"],
  ["cat", "cats", "kucing", "animal"],
  ["horse", "horses", "kuda", "animal"],
  ["animal", "animals", "hewan", "animal"],
  ["box", "boxes", "kotak", "daily life"],
  ["dish", "dishes", "piring atau hidangan", "food and drink"],
  ["basket", "baskets", "keranjang", "home"],
  ["bowl", "bowls", "mangkuk", "food and drink"],
  ["camera", "cameras", "kamera", "technology"],
  ["song", "songs", "lagu", "daily life"],
  ["movie", "movies", "film", "daily life"],
  ["game", "games", "permainan", "daily life"],
] as const;

const maybePluralize = (noun: string) => {
  if (noun.endsWith("y")) return `${noun.slice(0, -1)}ies`;
  if (noun.endsWith("s") || noun.endsWith("x") || noun.endsWith("ch")) return `${noun}es`;
  if (noun.endsWith("f")) return `${noun.slice(0, -1)}ves`;
  return `${noun}s`;
};

export const nounEntries: NounEntry[] = [
  ...uncountableSeeds.map(([displayNoun, meaning, quantityExpression, topic], index) => ({
    id: `u-${slugify(displayNoun)}`,
    nounType: "uncountable" as const,
    displayNoun,
    meaning,
    topic,
    difficulty: difficultyByIndex(index),
    usageNote: `${displayNoun} dipakai sebagai uncountable noun saat yang dimaksud adalah zat, konsep, atau massa yang tidak dihitung satu per satu.`,
    commonMistake: `Hindari bentuk *${maybePluralize(displayNoun)}* untuk makna ini dan gunakan frasa jumlah seperti "${quantityExpression}" jika perlu menghitung satuannya.`,
    quantityExpression,
    countableAlternative: quantityExpression,
    ...source,
  })),
  ...countableSeeds.map(([singularForm, pluralForm, meaning, topic], index) => ({
    id: `c-${slugify(singularForm)}`,
    nounType: "countable" as const,
    displayNoun: singularForm,
    meaning,
    topic,
    difficulty: difficultyByIndex(index),
    usageNote: `${singularForm} adalah countable noun; gunakan bentuk tunggal untuk satu benda/orang dan bentuk jamak untuk lebih dari satu.`,
    commonMistake: `Jangan gunakan ${singularForm} sebagai massa umum; setelah many, several, atau angka lebih dari satu, gunakan bentuk jamak "${pluralForm}".`,
    singularForm,
    pluralForm,
    pluralType: pluralForm === maybePluralize(singularForm) ? ("regular" as const) : ("irregular" as const),
    ...source,
  })),
].sort((a, b) => a.displayNoun.localeCompare(b.displayNoun));

const classificationOptions = [
  { key: "A" as const, text: "Uncountable Noun" },
  { key: "B" as const, text: "Countable Noun" },
];

const buildClassificationQuestion = (entry: NounEntry, packageSlug: string): Question => {
  const answerKey = entry.nounType === "uncountable" ? "A" : "B";
  const evidence =
    entry.nounType === "uncountable"
      ? `Kata ini biasanya tidak dihitung langsung satu per satu. Gunakan ukuran seperti "${entry.quantityExpression}" jika perlu menghitungnya.`
      : `Kata ini dapat dihitung satu per satu: singular "${entry.singularForm}" dan plural "${entry.pluralForm}".`;

  return {
    id: `${packageSlug}-${entry.id}`,
    packageSlug,
    nounId: entry.id,
    prompt: `Tentukan jenis noun berikut: "${entry.displayNoun}".`,
    options: classificationOptions,
    answerKey,
    explanation: `${entry.displayNoun} berarti "${entry.meaning}". Jawaban yang tepat adalah ${answerKey} (${entry.nounType === "uncountable" ? "Uncountable Noun" : "Countable Noun"}). ${evidence}`,
  };
};

const uncountableEntries = nounEntries.filter((entry) => entry.nounType === "uncountable");
const countableEntries = nounEntries.filter((entry) => entry.nounType === "countable");

const interleaveEntries = (left: NounEntry[], right: NounEntry[]) =>
  left.flatMap((entry, index) => [entry, right[index]]).filter(Boolean);

const buildPackages = (): TestPackage[] =>
  Array.from({ length: 20 }, (_, packageIndex) => {
    const slug = `classification-${String(packageIndex + 1).padStart(2, "0")}`;
    const start = packageIndex * 5;
    const entries = interleaveEntries(
      uncountableEntries.slice(start, start + 5),
      countableEntries.slice(start, start + 5),
    );

    return {
      slug,
      title: `Noun Classification ${String(packageIndex + 1).padStart(2, "0")}`,
      packageType: "mixed" as const,
      order: packageIndex + 1,
      questions: entries.map((entry) => buildClassificationQuestion(entry, slug)),
    };
  });

export const testPackages = buildPackages();

export const contentStats = {
  uncountableCount: uncountableEntries.length,
  countableCount: countableEntries.length,
  totalEntries: nounEntries.length,
  totalQuestions: testPackages.reduce((total, item) => total + item.questions.length, 0),
  totalPackages: testPackages.length,
};

if (
  contentStats.uncountableCount !== 100 ||
  contentStats.countableCount !== 100 ||
  contentStats.totalQuestions !== 200 ||
  contentStats.totalPackages !== 20
) {
  throw new Error("TBI noun content must contain 100 uncountable entries, 100 countable entries, and 20 test packages.");
}
