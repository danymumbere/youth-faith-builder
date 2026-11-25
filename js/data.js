// Données embarquées : versets, récits bibliques paginés et questions de défi
export const verses = [
    { text: "Car Dieu a tant aimé le monde qu’il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu’il ait la vie éternelle.", ref: "Jean 3:16" },
    { text: "Je puis tout par celui qui me fortifie.", ref: "Philippiens 4:13" },
    { text: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.", ref: "Psaume 119:105" },
    { text: "Confie-toi en l’Éternel de tout ton cœur, et ne t’appuie pas sur ta sagesse.", ref: "Proverbes 3:5" },
    { text: "L’Éternel est mon berger : je ne manquerai de rien.", ref: "Psaume 23:1" },
    { text: "Aimez-vous les uns les autres, comme je vous ai aimés.", ref: "Jean 15:12" },
    { text: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.", ref: "Psaume 46:1" },
    { text: "Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu.", ref: "Ésaïe 41:10" },
    { text: "Or la foi est une ferme assurance des choses qu’on espère, une démonstration de celles qu’on ne voit pas.", ref: "Hébreux 11:1" },
    { text: "Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.", ref: "Philippiens 4:6" },
    { text: "Comment le jeune homme rendra-t-il pur son sentier ? En se dirigeant d’après ta parole.", ref: "Psaume 119:9" },
    { text: "Fortifie-toi et prends courage ; ne t’effraie point, car l’Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.", ref: "Josué 1:9" }
];

export const stories = [
    { title: "La création", ref: "Genèse 1", pages: [
        "Au commencement, Dieu créa les cieux et la terre. La terre était informe et vide, et l’esprit de Dieu se mouvait au-dessus des eaux.",
        "Dieu dit : Que la lumière soit ! Et la lumière fut. Il sépara la lumière des ténèbres, puis rassembla les eaux et fit apparaître la terre sèche.",
        "Dieu créa les plantes, les poissons, les oiseaux et les animaux. Enfin il créa l’homme et la femme à son image, et il vit que tout était très bon."
    ] },
    { title: "Noé et l’arche", ref: "Genèse 6 à 9", pages: [
        "Les hommes devenaient violents sur la terre. Noé, lui, marchait avec Dieu. Dieu lui demanda de construire une arche en bois avec de nombreuses pièces.",
        "Noé obéit. Il fit entrer sa famille et les animaux dans l’arche. La pluie tomba quarante jours et les eaux couvrirent toute la montagne.",
        "Après plusieurs mois, Noé envoya une colombe qui revint avec une feuille d’olivier. La terre était sèche. Dieu plaça un arc-en-ciel comme signe de son alliance."
    ] },
    { title: "Moïse et la mer Rouge", ref: "Exode 14", pages: [
        "Le peuple d’Israël sortit d’Égypte, conduit par Moïse. Mais l’armée du pharaon le poursuivait, et devant eux se trouvait la mer Rouge.",
        "Le peuple eut peur. Moïse leva sa main vers la mer, et l’Éternel envoya un vent d’est qui sépara les eaux. Israël marcha sur un chemin sec.",
        "Les chars égyptiens s’engagèrent à leur suite, mais les eaux se refermèrent. Le peuple vit la puissance de Dieu et crut en lui et en Moïse, son serviteur."
    ] },
    { title: "David et Goliath", ref: "1 Samuel 17", pages: [
        "L’armée d’Israël faisait face aux Philistins. Leur champion, Goliath, mesurait près de trois mètres et défiait Israël chaque matin.",
        "David, un jeune berger, vint apporter du pain à ses frères. Il refusa l’armure du roi et prit sa fronde, cinq pierres et sa confiance en Dieu.",
        "David fit tournoyer sa fronde et lança une pierre qui frappa Goliath au front. Le géant tomba. Israël remporta la victoire et David devint un grand chef."
    ] },
    { title: "Daniel dans la fosse aux lions", ref: "Daniel 6", pages: [
        "Daniel servait le roi Darius et priait Dieu trois fois par jour. Des jaloux firent signer une loi interdisant toute prière pendant trente jours.",
        "Daniel continua de prier, fenêtre ouverte vers Jérusalem. Il fut jeté dans la fosse aux lions, et le roi passa la nuit dans l’angoisse.",
        "Au matin, le roi courut à la fosse : Daniel était vivant, car Dieu avait fermé la bouche des lions. Darius fit honorer le Dieu de Daniel."
    ] },
    { title: "Jonas et le grand poisson", ref: "Jonas 1 à 3", pages: [
        "Dieu demanda à Jonas d’aller prêcher à Ninive. Jonas prit un bateau dans la direction opposée, et une grande tempête se leva.",
        "Les marins jetèrent Jonas à la mer, et les eaux se calmèrent. Un grand poisson l’avala. Pendant trois jours, Jonas pria depuis le ventre du poisson.",
        "Le poisson le rendit sur la terre ferme. Jonas marcha vers Ninive, la ville se repentit, et Dieu renonça au mal qu’il avait résolu de lui faire."
    ] },
    { title: "La naissance de Jésus", ref: "Luc 2", pages: [
        "Marie et Joseph montèrent à Bethléem pour le recensement. La ville était pleine, et Marie mit au monde son fils premier-né dans une étable.",
        "Elle l’emmaillota et le coucha dans une crèche. Des bergers veillaient dans les champs quand un ange leur annonça cette bonne nouvelle.",
        "Les bergers accoururent et trouvèrent l’enfant. Ils racontèrent ce qu’ils avaient entendu, et tous s’étonnaient de leurs paroles."
    ] },
    { title: "Le bon Samaritain", ref: "Luc 10", pages: [
        "Un homme descendait de Jérusalem à Jéricho et tomba sur des brigands qui le laissèrent à demi mort. Un prêtre passa sans s’arrêter.",
        "Un Lévite regarda aussi et continua son chemin. Mais un Samaritain, méprisé de tous, eut pitié de l’homme blessé.",
        "Il banda ses plaies, le conduisit dans une auberge et paya pour lui. Jésus dit : Va, et toi, fais de même."
    ] }
];

export const quiz = [
    { question: "Qui a construit l’arche pour sauver sa famille ?", answer: "Noé" },
    { question: "Qui a affronté le géant Goliath avec une fronde ?", answer: "David" },
    { question: "Qui a séparé la mer Rouge en levant sa main ?", answer: "Moïse" },
    { question: "Dans quelle ville Jésus est-il né ?", answer: "Bethléem" },
    { question: "Qui a été jeté dans la fosse aux lions ?", answer: "Daniel" },
    { question: "Combien de disciples Jésus a-t-il choisis ?", answer: "12" },
    { question: "Quel disciple a trahi Jésus pour trente pièces d’argent ?", answer: "Judas" },
    { question: "Qui a passé trois jours dans le ventre d’un grand poisson ?", answer: "Jonas" },
    { question: "Quel juge d’Israël avait une force surnaturelle ?", answer: "Samson" },
    { question: "Qui a écrit la plupart des Psaumes ?", answer: "David" },
    { question: "Quel apôtre a marché sur l’eau vers Jésus ?", answer: "Pierre" },
    { question: "Combien de pains ont nourri cinq mille hommes ?", answer: "5" }
];
