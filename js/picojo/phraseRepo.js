class PhraseRepo {
  constructor() {
	this.phrases = new Set();
        //Actions
        this.add("%s tu peux doubler 1 fois max %d gorgée", 4);
        this.add("%s si tu a bu plus q'une 24 dans la derniere semaine, chug. A partir de dimanche", 1);
        this.add("%s dit le nom complet de tout le monde qui joue ou prend %d gorgées", 3);
        this.add("%s mets tes bas dans tes mains pour 6 questions. si tu n'a pas de mains/bas tu chug", 1);
        this.add("%s commence le WWWATERFALL!", 1);
        this.add("%s donne le nombre de gorgé que tu tes cassé d'os", 1);
        this.add("%s si tu n'a pas de chien prend %d gorgées", 2);
        this.add("%s si tu est jamais aller au mephisto boit %d gorgées", 3);
        this.add("%s vériter ou conséquence", 1);
        this.add("%s texte ta maman que tu l'aime vraiment beaucoup", 1);
        this.add("%s fait un massage a ton voisin de gauche ou prend %d gorgées", 2);
        this.add("La dernière personne châpeau pointu s'assis par terre pour 6 questions", 1);
        this.add("La plus grande personne prend %d gorgées", 2);
        this.add("Ceux qui portent des lunettes prennent %d gorgées", 2);
        this.add("Ceux qui ne porte pas des lunettes prennent %d gorgées", 2);
        this.add("%s boit autend de gorgées qu'il y a de fille présente", 1);
        this.add("Prend %d gorgées si t'es déjà aller au Méphisto", 2);
        this.add("Les invités prennent %d gorgées", 2);
        this.add("L'hote du jeux prend %d gorgées", 2);
        this.add("L'hote de la soirée prend %d gorgées", 2);
        this.add("L'hote de la soirée distribue %d gorgées", 2);
        this.add("Tous ceux qui ont fait un arbre de noel cette année prennent %d gorgées", 2);
        this.add("Tout le monde prend autant de gorgées que d'année d'étude post-secondaire", 1);
        this.add("La derniere personne qui a ouvert un bière prend %d gorgées", 2);
        this.add("%s choisi la prochaine chanson", 1);
        this.add("%s choisi qui entre %s et %s doit finir sa consommation", 1);
        this.add("Pendant 10 minutes %s doit servir les consommations", 1);
        this.add("Tout ceux qui on un écran craqué prennent %d gorgées", 2);
        this.add("L'hote du jeux distribue %d gorgées", 3);
        this.add("Si tu déjà a perdu ton cellulaire et que tu ne la jamais retrouver prend %d gorgées sinon distribu %d gorgées", 2);
        this.add("%s choisi un objet dans la pièce. Le premier a y touché distribu %d gorgées", 3);
        this.add("%s distribue autant de gorgées que tu a fini de consommation", 1);
        this.add("La première personne à licher son coude distribue %d gorgées", 4);
        this.add("%s distribue 2 gorgées ou laisse %s prendre 3 gorgées", 1);
        this.add("Celui qui a les plus grande mains entre %s et %s distribue %d gorgées", 2);
        this.add("%s fait une imitation de Chewbaca ou prend %d gorgées", 3);
        this.add("La personne avec les plus longs cheveux prend %d gorgées", 2);
        this.add("Si tu n'a jamais pass-out, prend %d gorgées", 2);
        this.add("%s choisi une couleur. Tout ceux qui ont un vetement de cette couleur prennent %d gorgées", 2);
        this.add("La personne la plus petite distribue %d gorgées", 2);
        this.add("La premiere personne a identifé le joueur le plus jeune distribu %d gorgées", 3);
        this.add("%s distribue et prend autant de gorgées que tu a de frère ou soeur.", 1);
        this.add("%s devine le sport préféré de %s. Prend %d gorgées si tu te trompe. Distribue %d gorgées si tu réussi.", 2);
        this.add("Tout ceux qui on fumé aujourd'hui prennent %d gorgées.", 2);
        this.add("La dernière personne arrivé prend %d gorgées.", 3);
        this.add("Les personnes en couple prennent %d gorgées.", 2);
        this.add("Les personnes pas en couple prennent %d gorgées.", 2);
        this.add("Prend %d gorgées si tu a déjà volé quelque chose a quelqu'un a la table.", 2);
        this.add("Tout le monde distribue %d gorgées si tu a déjà manger chez %s.", 3);
        this.add("Prend %d gorgées si tu chante dans la douche.", 2);
        this.add("%s prend autant de gorgées que tu veux puis distribue en autant", 1);
        this.add("%s et %s prennent %d gorgées dans le drink de l'autre", 2);
        this.add("%d gorgées pour tout le monde! Cheers!", 1);
        this.add("Le plus musclé prend %d gorgée.", 3);
        this.add("Le moins musclé prend %d gorgée.", 3);
        this.add("%s nomme 2 chansons de Justin Bieber et donne %d gorgées sinon bois les", 3);
        this.add("Le joueur avec le moins d'alcool dans son verre doit le finir.", 1);
        this.add("%s nomme autant de défaut a %s que tu veux puis distribue autant de gorgées.", 1);
        this.add("%s prend autant de gorgées que tu veux. %s doit t'égaler.", 1);
        this.add("La personne la plus poilus distribue %d gorgées.", 3);
        this.add("%s prend %d gorgées. La personne a ta droite prend 1 gorgée de moins et ainsi de suite.", 3);
        this.add("%s donne %d gorgées a quelqu'un de plus grand que toi. Si impossible prend les!", 2);
        this.add("%s donne %d gorgées a quelqu'un de plus petit que toi. Si impossible prend les!", 2);
        this.add("%s donne 2 gorgées a %s ou 4 a %s", 1);
        this.add("%s nomme une chose que tu na jamais fait. Tout ceux qui l'on déjà fait prennent 4 gorgées", 4);
        this.add("La dernière personne qui a pris l'avion distribue %d gorgées.", 3);
        this.add("%s, tu a 3 secondes pour répondre a la question: Combien de personne présente dans la pièce? Prend 5 gorgées en cas d'éhcec.", 5);
        this.add("%s dit une phrase d'un filme, le premier a devenier le film distribue %d gorgées.", 2);
        this.add("Le DJ distribue %d gorgées.", 4);
        this.add("%s donne %d gorgées a la personne que tu connais le mieux.", 2);
        this.add("Prend %d gorgées si tu a déjà travailé dans un camp d'été", 3);
        this.add("%s, fait une action décidé par %s ou prend %d gorgées.", 4);
        this.add("Prend %d gorgées si t'es jamais aller au subway un lendemain de brosse", 3);
        this.add("Prend %d gorgées si tu t'es déja fait arrêter.", 3);
        this.add("Le plus jeune prend %d gorgées", 2);
        this.add("Le plus vieux prend %d gorgées", 2);

        //Question
        this.add("%s, qui vomit le plus souvent entre %s et %s. Celui qui vomit le moins souvent prend %d gorgées", 3);
        this.add("%s, qui prendrait tu comme partenaire de spikeball? %s ou %s? Ton partenaire distribue %d gorgées", 3);
        this.add("%s, qui prendrait tu comme partenaire de beer pong? %s ou %s? Ton partenaire distribue %d gorgées", 3);
        this.add("%s, qui est le meilleur joueur d'échec? %s ou %s? Le meilleur distribue %d gorgées", 3);
        this.add("%s, qui est le meilleur conducteur? %s ou %s? Le meilleur distribue %d gorgées", 3);
        this.add("%s, qui est le meilleur menteur? %s ou %s? Le meilleur distribue %d gorgées", 2);
        this.add("%s, qui est le moins fiable? %s ou %s? Le moins fiable prend %d gorgées", 2);
        this.add("%s, qui est les plus beau yeux? %s ou %s? Le gagant prend 1 et distribue %d gorgées", 2);
        this.add("%s, qui a les meilleurs gout musicaux? %s ou %s? Le gagant prend 1 et distribue %d gorgées", 2);
        this.add("%s, qui serait le meilleur acteur? %s ou %s? Le gagant prend 1 et distribue %d gorgées", 3);
        this.add("%s, qui est le plus intraverti? %s ou %s? Le plus intraverti prend %d gorgées", 3);
        this.add("%s, si tu a coucher avec plus de 5 personnes prend %d gorgées", 3);

        //Action ou conséquence.
        this.add("%s tient sur tes mains pendant %d secondes ou prend 5 gorgées", 5);
        this.add("%s fait 20 squats ou prend %d gorgées", 4);
        this.add("%s laisse %s refaire ta coupe de cheuveux ou prend %d gorgées", 3);
        this.add("Pendant 5 minutes, %s parle avec un accent congolais ou prend %d gorgées", 4);
        this.add("%s fait un massage a %s ou prend %d gorgées", 3);
        this.add("%s fait la larve ou prend %d gorgées", 3);
        this.add("%s choisi une chanson et fait une chorégraphie puis distribue 6 ou prend %d gorgées", 4);
        this.add("%s dévoile une de tes this.addictions ou prend %d gorgées", 4);
        this.add("%s fait un split ou prend %d gorgées", 3);
        this.add("%s racontre une blague ou prend %d gorgées", 4);

        //Jeux
        this.add("%s sacre le dernier qui en trouve pu prend %d gorgées", 3);
        this.add("Flip the cup: Le premier qui échoue prend autant de gorgé qu'il y a eu de réussite", 1);
        this.add("Le dernier a mettre son pouce sur la table après %s prend %d gorgées", 3);
        this.add("%s dit quelque chose que tu n'aime pas. Tous ceux qui aime prennent %d gorgées", 2);
        this.add("'Un artiste décédé' Le premier qui n'en connait pas prend %d gorgées. %s commence", 3);
        this.add("'Marque de sport' Le premier qui n'en connait pas prend %d gorgées. %s commence", 3);
        this.add("'Nom de supermarché' Le premier qui n'en connait pas prend %d gorgées. %s commence", 3);
        this.add("Celui qui fait le plus de push-ups entre %s et %s distribue %d gorgées", 4);
        this.add("%s et %s Roche papier ciseaux. Le perdant prend %d gorgées", 2);
        this.add("%s pose une question. Le premier a trouvé la réponse distribue %d gorgées.", 3);
        this.add("Téléphone: Chuchotte un mots dans l'oreille de ton voisin de gauche. Après le tour de table celui qui c'est tromper prend %d gorgées. %s commence", 4);
        this.add("Vérité ou conséquence: %s commence vers sa droite. Le premier qui refuse prend %d gorgées.", 3);
        this.add("Dit le nom de famille de la personne a ta gauche. Le premier qui se trompe prend %d gorgées. %s commence", 3);
        this.add("%s, dit une lettre. Chaque personne ajoute une lettre. La premiere personne a finir le mots distribue %d gorgées", 3);
        this.add("%s fait un autobus", 1);
        this.add("%s pense a un objet dans la piece. La premiere personne a deviner distribue %d gorgées", 4);
        this.add("Dit l'age de la personne a ta gauche. %d Gorgées au premier qui se trompe. %s commence", 3);
        this.add("Bras de fer entre %s et %s, le perdant prend %s gorgées", 2);

        //Votes
        this.add("Vote: Le plus dangereux entre %s et %s prend %d gorgées", 3);
        this.add("Vote: Le moins sportif prend %d gorgées", 3);
        this.add("Vote: Écouter un films en boucle ou une chanson en boucle pendant 1 journée? Les perdants prennent %d gorgées", 2);
        this.add("Vote: Qui a la plus belle coupe de cheveux entre %s et %s. Le perdant prend 2 gorgées. Le gagnant distribue %d gorgées", 1);
        this.add("Vote: Ne plus avoir besoin de dormir ou ne plus avoir besoin de travailler? Les perdants prennent %d gorgées.", 2);
        this.add("Vote: Préfèrais tu travailler pour la NASA ou Google? Les perdants prennent %d gorgées.", 2);
        this.add("Vote: Un monde sans musique ou sans films? Les perdants prennent %d gorgées.", 2);

        //Règles
        this.add("Règle: Le prochain qui regarde son cell prend %d gorgées", 4);
        this.add("Règle: Le prochain qui dit 'bière' prend %d gorgées", 4);
        this.add("Règle: Le prochain qui va au toilette prend 6 gorgées", 6);
        this.add("Règle: Le prochain qui parle a %s prend %d gorgées", 2);
        this.add("Règle: %s le prochain a te regarder dans les yeux prend %d gorgées.", 3);
        this.add("Règle: Pendant 30 minutes, chaque fois que %s dit 'marco', %s doit répondre 'polo' sinon il prend %d gorgées", 1);
        this.add("Règle: Pendant 10 minutes, chaque fois que %s parle a %s ou %s, il prend %d gorgées", 2);
        this.add("Règle: Pendant 5 minutes, %s parle avec un accent congolais ou prend %d gorgées", 3);
        this.add("Règle: Pour les 3 prochaines questions, les gorgées prise et distribué sont inversé.", 1);
        this.add("Règle: Pour les 3 prochaines questions, les gorgées sont doublées.", 1);
        this.add("Règle: %s devient la bitch de %s pendant 10 minutes. La bitch doit toujours boire avec son maitre.", 1);
  }

  getPhrases() {
    return this.phrases;
  }
  
  add(phrase, sips) {
	this.phrases.add(new Phrase(phrase, sips));
  }
  
}