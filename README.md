# Couchette — Prototype HF mobile

Prototype HTML **haute fidélité** (cadre iPhone 390×844), UI française, esthétique nuit.  
**Pas une app réelle / pas un MVP** — wireframes cliquables pour démo interne, alignement landing, et smoke test du CTA deep-link opérateur.

## Ouvrir

**Aperçu en ligne (jsDelivr)**  
https://cdn.jsdelivr.net/gh/tmallet/couchette-proto@main/index.html

**En local**

```bash
git clone https://github.com/tmallet/couchette-proto.git
cd couchette-proto
python3 -m http.server 8765
# Puis ouvrir http://localhost:8765
```

Ou ouvrir directement `index.html` dans un navigateur (Chrome / Safari / Firefox). Fonctionne **offline** (pas d’API, pas de CDN).

Sur mobile ou fenêtre étroite (< 440px), le cadre téléphone disparaît et le proto passe en plein écran.

## Écrans

| # | Écran | Rôle démo |
|---|--------|-----------|
| **1** | **Carte explore nuit** | Découverte carte + liste (Nightjet / European Sleeper), filtres cabine / durée / Interrail |
| **2** | **Fiche trajet / cabine** | Photos placeholder, résumé, tips confort + Interrail, CTA « Continuer sur [opérateur] » |
| **3a** | **Handoff opérateur** | Pont avant sortie vers le site opérateur (smoke test deep-link) |
| **3b** | **Favoris & alertes** | Trajets sauvegardés + toggle « alerte ouverture ventes » |

## Parcours cliquable (smoke test)

1. **Explore** — sélectionner une ligne sur la carte ou dans la liste → ouvre la **fiche**.
2. Filtres (cabine, durée, Interrail) : filtrage client-side de la liste **et** des traits sur la carte.
3. Sur la fiche : choisir une cabine → **Continuer sur [Nightjet | European Sleeper]** → **3a Handoff**.
4. Sur le handoff : **Ouvrir [opérateur]** simule le deep-link (écran flash « site opérateur ») — utile pour valider le wording CTA / funnel landing.
5. **Favoris** (nav bas) → **3b** ; cœur sur une fiche pour sauver ; toggle alerte ventes.

Données d’exemple : Paris→Vienne, Bruxelles→Berlin, Amsterdam→Prague, Paris→Berlin, Munich→Rome, Zurich→Vienne.

## Usage interne (pas d’entretien)

- **Démo produit / design** : enchaîner 1 → 2 → 3a pour montrer le job « découvrir la nuit → choisir une cabine → sortir chez l’opérateur ».
- **Alignement landing** : vérifier cohérence ton, promesse « nuit only », et CTA de sortie (deep-link) avec la page marketing.
- **Smoke CTA deep-link** : le bouton handoff ne charge pas de vrai site ; il valide le **message** et le **moment** du handoff (pas de compte / paiement dans Couchette).

Hors scope (volontaire) : compte, paiement, social, waitlist, build natif.

## Fichiers

```
.
├── index.html         # Shell + 4 écrans
├── styles.css         # @import des parts (CSS complet)
├── styles-part1.css
├── styles-part2.css
├── app.js             # charge app-part1 + app-part2
├── app-part1.js
├── app-part2.js
└── README.md
```

> Note : `styles.css` / `app.js` sont des chargeurs ; le contenu HF est dans les fichiers `*-part*.css|js` (découpe pour le push GitHub).

## Captures

Non incluses dans ce dépôt (PNG binaires non poussés via MCP). Disponibles en local sous `screenshots/` si générées :
- `01-explore.png` — carte + liste
- `02-fiche.png` — trajet / cabine + CTA
- `03a-handoff.png` — pont deep-link opérateur
- `03b-favoris.png` — favoris & alertes
