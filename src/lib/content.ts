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
  classificationHint?: string;
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

const expectedNounsPerType = 200;
const entriesPerTypePerPackage = 5;
const questionsPerPackage = entriesPerTypePerPackage * 2;
const expectedPackageCount = expectedNounsPerType / entriesPerTypePerPackage;

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
  ["fruit", "buah sebagai makanan umum", "a piece of fruit", "food and drink"],
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
  ["research", "penelitian", "a research project", "school"],
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
  ["beef", "daging sapi", "a slice of beef", "food and drink"],
  ["bacon", "daging asap", "a slice of bacon", "food and drink"],
  ["pork", "daging babi", "a piece of pork", "food and drink"],
  ["seafood", "makanan laut", "a serving of seafood", "food and drink"],
  ["yogurt", "yogurt", "a cup of yogurt", "food and drink"],
  ["cream", "krim", "a spoonful of cream", "food and drink"],
  ["jam", "selai", "a jar of jam", "food and drink"],
  ["ketchup", "saus tomat", "a bottle of ketchup", "food and drink"],
  ["mustard", "mustard", "a spoonful of mustard", "food and drink"],
  ["mayonnaise", "mayones", "a jar of mayonnaise", "food and drink"],
  ["vinegar", "cuka", "a bottle of vinegar", "food and drink"],
  ["pepper", "merica", "a pinch of pepper", "food and drink"],
  ["garlic", "bawang putih", "a clove of garlic", "food and drink"],
  ["lettuce", "selada", "a head of lettuce", "food and drink"],
  ["spinach", "bayam", "a bunch of spinach", "food and drink"],
  ["broccoli", "brokoli", "a head of broccoli", "food and drink"],
  ["chocolate", "cokelat", "a bar of chocolate", "food and drink"],
  ["lemonade", "limun", "a glass of lemonade", "food and drink"],
  ["rubber", "karet", "a piece of rubber", "materials"],
  ["cement", "semen", "a bag of cement", "materials"],
  ["concrete", "beton", "a slab of concrete", "materials"],
  ["paint", "cat", "a can of paint", "materials"],
  ["glue", "lem", "a tube of glue", "materials"],
  ["ink", "tinta", "a bottle of ink", "materials"],
  ["clay", "tanah liat", "a lump of clay", "materials"],
  ["coal", "batu bara", "a lump of coal", "materials"],
  ["charcoal", "arang", "a bag of charcoal", "materials"],
  ["copper", "tembaga", "a coil of copper", "materials"],
  ["aluminum", "aluminium", "a sheet of aluminum", "materials"],
  ["bronze", "perunggu", "a piece of bronze", "materials"],
  ["brass", "kuningan", "a piece of brass", "materials"],
  ["marble", "marmer", "a slab of marble", "materials"],
  ["fabric", "kain", "a piece of fabric", "materials"],
  ["silk", "sutra", "a length of silk", "materials"],
  ["linen", "linen", "a piece of linen", "materials"],
  ["denim", "denim", "a yard of denim", "materials"],
  ["polyester", "poliester", "a piece of polyester", "materials"],
  ["nylon", "nilon", "a length of nylon", "materials"],
  ["detergent", "deterjen", "a bottle of detergent", "home"],
  ["bleach", "pemutih", "a bottle of bleach", "home"],
  ["laundry", "cucian", "a load of laundry", "home"],
  ["makeup", "riasan", "a bit of makeup", "daily life"],
  ["perfume", "parfum", "a bottle of perfume", "daily life"],
  ["wifi", "Wi-Fi", "a Wi-Fi connection", "technology"],
  ["bandwidth", "bandwidth", "a lot of bandwidth", "technology"],
  ["storage", "penyimpanan", "a lot of storage", "technology"],
  ["privacy", "privasi", "a level of privacy", "technology"],
  ["security", "keamanan", "a layer of security", "technology"],
  ["feedback", "umpan balik", "a piece of feedback", "communication"],
  ["support", "dukungan", "some support", "communication"],
  ["guidance", "bimbingan", "some guidance", "communication"],
  ["attention", "perhatian", "a lot of attention", "communication"],
  ["care", "kepedulian atau perawatan", "a lot of care", "daily life"],
  ["respect", "rasa hormat", "a sign of respect", "character"],
  ["trust", "kepercayaan", "a level of trust", "character"],
  ["leadership", "kepemimpinan", "strong leadership", "work"],
  ["management", "manajemen", "good management", "work"],
  ["employment", "pekerjaan atau lapangan kerja", "full-time employment", "work"],
  ["unemployment", "pengangguran", "a period of unemployment", "work"],
  ["training", "pelatihan", "a training session", "school"],
  ["practice", "latihan", "a lot of practice", "school"],
  ["stress", "stres", "a lot of stress", "health"],
  ["pressure", "tekanan", "a lot of pressure", "daily life"],
  ["pain", "rasa sakit", "a bit of pain", "health"],
  ["damage", "kerusakan", "a lot of damage", "daily life"],
  ["harm", "bahaya atau kerugian", "serious harm", "daily life"],
  ["trouble", "masalah atau kesulitan", "a lot of trouble", "daily life"],
  ["importance", "kepentingan", "great importance", "communication"],
  ["violence", "kekerasan", "an act of violence", "society"],
  ["poverty", "kemiskinan", "a level of poverty", "society"],
  ["wealth", "kekayaan", "a great deal of wealth", "society"],
  ["transportation", "transportasi", "public transportation", "transport"],
  ["shipping", "pengiriman", "free shipping", "transport"],
  ["advertising", "periklanan", "online advertising", "work"],
  ["marketing", "pemasaran", "digital marketing", "work"],
  ["shopping", "berbelanja", "some shopping", "daily life"],
  ["fitness", "kebugaran", "physical fitness", "health"],
  ["nutrition", "gizi", "good nutrition", "health"],
  ["fog", "kabut", "a patch of fog", "nature"],
  ["mist", "kabut tipis", "a layer of mist", "nature"],
  ["dew", "embun", "a drop of dew", "nature"],
  ["frost", "embun beku", "a layer of frost", "nature"],
  ["thunder", "guntur", "a clap of thunder", "nature"],
  ["lightning", "kilat", "a flash of lightning", "nature"],
  ["wind", "angin", "a gust of wind", "nature"],
  ["sunlight", "cahaya matahari", "a beam of sunlight", "nature"],
  ["moonlight", "cahaya bulan", "a patch of moonlight", "nature"],
  ["shade", "keteduhan", "a patch of shade", "nature"],
  ["humidity", "kelembapan", "a level of humidity", "nature"],
  ["nitrogen", "nitrogen", "a supply of nitrogen", "nature"],
  ["carbon dioxide", "karbon dioksida", "a level of carbon dioxide", "nature"],
  ["steam", "uap", "a cloud of steam", "nature"],
  ["chalk", "kapur tulis", "a piece of chalk", "school"],
  ["parking", "parkir", "a parking space", "transport"],
  ["housing", "perumahan", "affordable housing", "society"],
  ["accommodation", "akomodasi", "student accommodation", "travel"],
  ["equality", "kesetaraan", "a degree of equality", "society"],
  ["justice", "keadilan", "a sense of justice", "society"],
  ["truth", "kebenaran", "a grain of truth", "communication"],
] as const;

const uncountableClassificationHints: Record<string, string> = {
  chalk: "kapur sebagai bahan tulis, bukan satu batang kapur tertentu",
  cereal: "sereal sebagai makanan secara umum, bukan satu merek atau jenis sereal tertentu",
  coffee: "kopi sebagai minuman secara umum, bukan satu cangkir pesanan",
  dust: "debu sebagai partikel halus secara umum, bukan jenis debu ilmiah tertentu",
  food: "makanan secara umum, bukan satu jenis makanan tertentu",
  fruit: "buah sebagai kategori makanan umum, bukan satu jenis buah tertentu",
  glass: "kaca sebagai bahan, bukan satu gelas minum",
  hair: "rambut sebagai massa di kepala atau tubuh, bukan satu helai rambut",
  homework: "pekerjaan rumah sekolah secara umum, bukan satu tugas yang dihitung sebagai task",
  housework: "pekerjaan rumah tangga secara umum, bukan satu pekerjaan terpisah",
  ice: "es sebagai zat/bahan, bukan satu balok atau kubus es",
  jam: "selai sebagai bahan oles, bukan kemacetan lalu lintas",
  light: "cahaya secara umum, bukan satu lampu",
  makeup: "riasan sebagai produk/kosmetik secara umum, bukan satu ujian susulan",
  medicine: "obat sebagai zat/perawatan secara umum, bukan satu pil tertentu",
  metal: "logam sebagai bahan, bukan satu benda logam tertentu",
  money: "uang sebagai nilai/alat tukar secara umum, bukan satu koin atau lembar uang",
  parking: "parkir sebagai layanan/aktivitas, bukan satu tempat parkir tertentu",
  paper: "kertas sebagai bahan, bukan makalah atau artikel",
  pepper: "merica sebagai bumbu, bukan satu buah cabai/paprika",
  practice: "latihan sebagai aktivitas umum, bukan satu praktik bisnis/profesional",
  plastic: "plastik sebagai bahan, bukan satu benda plastik tertentu",
  progress: "kemajuan secara umum, bukan satu tahap perkembangan yang dihitung terpisah",
  research: "penelitian sebagai kegiatan/bidang umum, bukan satu proyek penelitian",
  sand: "pasir sebagai massa butiran, bukan satu butir pasir",
  shade: "keteduhan sebagai area/cahaya terhalang, bukan satu warna tertentu",
  smoke: "asap sebagai gas/kabut dari pembakaran, bukan tindakan merokok",
  sugar: "gula sebagai bahan, bukan satu butir atau satu bungkus gula",
  truth: "kebenaran secara umum, bukan satu fakta/pernyataan tertentu",
  tea: "teh sebagai minuman secara umum, bukan satu cangkir pesanan",
  traffic: "lalu lintas sebagai kondisi pergerakan kendaraan, bukan kendaraan satu per satu",
  work: "pekerjaan atau aktivitas kerja secara umum, bukan karya seni atau satu tugas tertentu",
};

const countableClassificationHints: Record<string, string> = {
  class: "satu kelas atau sesi belajar, bukan status sosial secara umum",
  dish: "satu piring atau satu hidangan, bukan makanan sebagai massa umum",
  email: "satu pesan email, bukan sistem atau metode komunikasi email",
  room: "satu ruangan fisik, bukan ruang/kesempatan secara abstrak",
};

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
  ["parent", "parents", "orang tua", "people"],
  ["mother", "mothers", "ibu", "people"],
  ["father", "fathers", "ayah", "people"],
  ["brother", "brothers", "saudara laki-laki", "people"],
  ["sister", "sisters", "saudara perempuan", "people"],
  ["cousin", "cousins", "sepupu", "people"],
  ["neighbor", "neighbors", "tetangga", "people"],
  ["doctor", "doctors", "dokter", "people"],
  ["nurse", "nurses", "perawat", "people"],
  ["driver", "drivers", "pengemudi", "people"],
  ["customer", "customers", "pelanggan", "people"],
  ["worker", "workers", "pekerja", "people"],
  ["manager", "managers", "manajer", "people"],
  ["player", "players", "pemain", "people"],
  ["singer", "singers", "penyanyi", "people"],
  ["actor", "actors", "aktor", "people"],
  ["visitor", "visitors", "pengunjung", "people"],
  ["passenger", "passengers", "penumpang", "people"],
  ["guest", "guests", "tamu", "people"],
  ["member", "members", "anggota", "people"],
  ["sofa", "sofas", "sofa", "home"],
  ["shelf", "shelves", "rak", "home"],
  ["cabinet", "cabinets", "lemari kabinet", "home"],
  ["drawer", "drawers", "laci", "home"],
  ["blanket", "blankets", "selimut", "home"],
  ["pillow", "pillows", "bantal", "home"],
  ["carpet", "carpets", "karpet", "home"],
  ["curtain", "curtains", "tirai", "home"],
  ["sink", "sinks", "wastafel", "home"],
  ["stove", "stoves", "kompor", "home"],
  ["refrigerator", "refrigerators", "kulkas", "home"],
  ["oven", "ovens", "oven", "home"],
  ["pan", "pans", "wajan", "home"],
  ["pot", "pots", "panci", "home"],
  ["kettle", "kettles", "ketel", "home"],
  ["tray", "trays", "nampan", "home"],
  ["napkin", "napkins", "serbet", "home"],
  ["bucket", "buckets", "ember", "home"],
  ["broom", "brooms", "sapu", "home"],
  ["cupboard", "cupboards", "lemari", "home"],
  ["tablet", "tablets", "tablet", "technology"],
  ["charger", "chargers", "pengisi daya", "technology"],
  ["cable", "cables", "kabel", "technology"],
  ["screen", "screens", "layar", "technology"],
  ["keyboard", "keyboards", "papan ketik", "technology"],
  ["mouse", "mice", "tetikus", "technology"],
  ["printer", "printers", "printer", "technology"],
  ["speaker", "speakers", "pengeras suara", "technology"],
  ["microphone", "microphones", "mikrofon", "technology"],
  ["battery", "batteries", "baterai", "technology"],
  ["file", "files", "berkas", "technology"],
  ["folder", "folders", "folder", "technology"],
  ["website", "websites", "situs web", "technology"],
  ["app", "apps", "aplikasi", "technology"],
  ["desk", "desks", "meja kerja", "school"],
  ["page", "pages", "halaman", "school"],
  ["ruler", "rulers", "penggaris", "school"],
  ["eraser", "erasers", "penghapus", "school"],
  ["marker", "markers", "spidol", "school"],
  ["exam", "exams", "ujian", "school"],
  ["grade", "grades", "nilai", "school"],
  ["note", "notes", "catatan", "school"],
  ["report", "reports", "laporan", "school"],
  ["project", "projects", "proyek", "school"],
  ["schedule", "schedules", "jadwal", "school"],
  ["calendar", "calendars", "kalender", "daily life"],
  ["taxi", "taxis", "taksi", "transport"],
  ["truck", "trucks", "truk", "transport"],
  ["motorcycle", "motorcycles", "sepeda motor", "transport"],
  ["scooter", "scooters", "skuter", "transport"],
  ["airplane", "airplanes", "pesawat", "transport"],
  ["boat", "boats", "perahu", "transport"],
  ["ship", "ships", "kapal", "transport"],
  ["station", "stations", "stasiun", "place"],
  ["airport", "airports", "bandara", "place"],
  ["bridge", "bridges", "jembatan", "place"],
  ["building", "buildings", "gedung", "place"],
  ["hotel", "hotels", "hotel", "place"],
  ["library", "libraries", "perpustakaan", "place"],
  ["museum", "museums", "museum", "place"],
  ["stadium", "stadiums", "stadion", "place"],
  ["seed", "seeds", "benih", "nature"],
  ["garden", "gardens", "kebun", "nature"],
  ["cloud", "clouds", "awan", "nature"],
  ["star", "stars", "bintang", "nature"],
  ["planet", "planets", "planet", "nature"],
  ["wave", "waves", "ombak", "nature"],
  ["hill", "hills", "bukit", "nature"],
  ["forest", "forests", "hutan", "nature"],
  ["desert", "deserts", "gurun", "nature"],
  ["bee", "bees", "lebah", "animal"],
  ["butterfly", "butterflies", "kupu-kupu", "animal"],
  ["cookie", "cookies", "kue kering", "food and drink"],
  ["potato", "potatoes", "kentang", "food and drink"],
  ["tomato", "tomatoes", "tomat", "food and drink"],
  ["carrot", "carrots", "wortel", "food and drink"],
  ["onion", "onions", "bawang bombai", "food and drink"],
  ["grape", "grapes", "anggur", "food and drink"],
  ["strawberry", "strawberries", "stroberi", "food and drink"],
  ["lemon", "lemons", "lemon", "food and drink"],
] as const;

const maybePluralize = (noun: string) => {
  if (noun.endsWith("y")) return `${noun.slice(0, -1)}ies`;
  if (noun.endsWith("s") || noun.endsWith("x") || noun.endsWith("ch") || noun.endsWith("sh")) return `${noun}es`;
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
    usageNote: `${displayNoun} dipakai sebagai uncountable noun saat yang dimaksud adalah zat, konsep, atau massa yang tidak dihitung satu per satu.${
      uncountableClassificationHints[displayNoun]
        ? ` Dalam latihan ini konteksnya: ${uncountableClassificationHints[displayNoun]}.`
        : ""
    }`,
    commonMistake: `Jangan menambahkan -s/-es untuk makna ini. Jika perlu menghitung satuannya, gunakan frasa jumlah seperti "${quantityExpression}".`,
    classificationHint: uncountableClassificationHints[displayNoun],
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
    usageNote: `${singularForm} adalah countable noun; gunakan bentuk tunggal untuk satu benda/orang dan bentuk jamak untuk lebih dari satu.${
      countableClassificationHints[singularForm]
        ? ` Dalam latihan ini konteksnya: ${countableClassificationHints[singularForm]}.`
        : ""
    }`,
    commonMistake: `Setelah many, several, atau angka lebih dari satu, gunakan bentuk jamak "${pluralForm}".${
      countableClassificationHints[singularForm]
        ? ` Jangan pakai konteks massa/abstrak saat menjawab soal ini.`
        : ""
    }`,
    classificationHint: countableClassificationHints[singularForm],
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
  const promptContext = entry.classificationHint ? ` dalam konteks ${entry.classificationHint}` : "";
  const explanationContext = entry.classificationHint ? `Dalam soal ini, konteksnya adalah ${entry.classificationHint}. ` : "";
  const evidence =
    entry.nounType === "uncountable"
      ? `Kata ini biasanya tidak dihitung langsung satu per satu. Gunakan ukuran seperti "${entry.quantityExpression}" jika perlu menghitungnya.`
      : `Kata ini dapat dihitung satu per satu: singular "${entry.singularForm}" dan plural "${entry.pluralForm}".`;

  return {
    id: `${packageSlug}-${entry.id}`,
    packageSlug,
    nounId: entry.id,
    prompt: `Tentukan jenis noun berikut${promptContext}: "${entry.displayNoun}".`,
    options: classificationOptions,
    answerKey,
    explanation: `${entry.displayNoun} berarti "${entry.meaning}". ${explanationContext}Jawaban yang tepat adalah ${answerKey} (${entry.nounType === "uncountable" ? "Uncountable Noun" : "Countable Noun"}). ${evidence}`,
  };
};

const uncountableEntries = nounEntries.filter((entry) => entry.nounType === "uncountable");
const countableEntries = nounEntries.filter((entry) => entry.nounType === "countable");

const interleaveEntries = (left: NounEntry[], right: NounEntry[]) =>
  left.flatMap((entry, index) => [entry, right[index]]).filter(Boolean);

const buildPackages = (): TestPackage[] =>
  Array.from({ length: expectedPackageCount }, (_, packageIndex) => {
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

const findDuplicates = (values: string[]) => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
};

const duplicateIds = findDuplicates(nounEntries.map((entry) => entry.id));
const duplicateDisplayNouns = findDuplicates(nounEntries.map((entry) => slugify(entry.displayNoun)));
const incompletePackages = testPackages.filter((item) => item.questions.length !== questionsPerPackage);

export const highRiskClassificationTerms = [
  "cereal",
  "chalk",
  "class",
  "coffee",
  "dish",
  "dust",
  "email",
  "food",
  "fruit",
  "glass",
  "hair",
  "homework",
  "housework",
  "ice",
  "jam",
  "light",
  "makeup",
  "medicine",
  "metal",
  "money",
  "parking",
  "paper",
  "pepper",
  "plastic",
  "practice",
  "progress",
  "research",
  "room",
  "sand",
  "shade",
  "smoke",
  "sugar",
  "tea",
  "traffic",
  "truth",
  "work",
] as const;

const highRiskEntriesWithoutContext = nounEntries.filter(
  (entry) => highRiskClassificationTerms.includes(entry.displayNoun as (typeof highRiskClassificationTerms)[number]) && !entry.classificationHint,
);

if (
  contentStats.uncountableCount !== expectedNounsPerType ||
  contentStats.countableCount !== expectedNounsPerType ||
  contentStats.totalQuestions !== expectedNounsPerType * 2 ||
  contentStats.totalPackages !== expectedPackageCount ||
  incompletePackages.length > 0
) {
  throw new Error(
    `TBI noun content must contain ${expectedNounsPerType} uncountable entries, ${expectedNounsPerType} countable entries, ${expectedNounsPerType * 2} questions, and ${expectedPackageCount} complete test packages.`,
  );
}

if (duplicateIds.length > 0 || duplicateDisplayNouns.length > 0) {
  throw new Error(
    `TBI noun content must not contain duplicate ids or display nouns. Duplicate ids: ${duplicateIds.join(", ") || "-"}; duplicate nouns: ${duplicateDisplayNouns.join(", ") || "-"}`,
  );
}

if (highRiskEntriesWithoutContext.length > 0) {
  throw new Error(
    `High-risk classification entries need explicit context: ${highRiskEntriesWithoutContext.map((entry) => entry.displayNoun).join(", ")}`,
  );
}
