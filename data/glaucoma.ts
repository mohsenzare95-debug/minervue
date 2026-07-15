import type { Card } from "@/shared/types/card";

export const glaucomaCards: Card[] = [
  /// Chapt. 1 ///
  /// Question 1 ///
  {
    id: "glaucoma_1",
    q: `Which glaucoma types are associated with the GLC1, GLC2, and GLC3 gene loci?`,
    a: `
**GLC1:** POAG, NTG, JOAG

---

**GLC2:** ACG

---

**GLC3:** PCG
`,
  },

  {
    id: "glaucoma_2",
    q: `What are the gene locus, gene mutation, and inheritance pattern of juvenile open-angle glaucoma (JOAG)?`,
    a: `
**Gene locus:** GLC1A

---

**Gene mutation:** MYOC *(myocilin/TIGR)*

---

**Inheritance pattern:** Autosomal dominant (AD)

.

[DUMBBELL] **Code:** *"Juveniles are all Alpha and Dominant — they listen to music and become Tigers."*

→ JOAG = AD + MYOC (GLC1A) + TIGR
`,
  },

  {
    id: "glaucoma_3",
    q: `What are the defined gene loci, gene mutations, and inheritance patterns for normal-tension glaucoma (NTG)?`,
    a: `
**Pattern 1**

**Locus:** GLC1E

**Gene:** OPTN *(Autophagy)*

**Inheritance:** Autosomal dominant (AD)

---

**Pattern 2**

**Locus:** GLC1P

**Gene:** TBK1 *(TANK-binding kinase 1)*

**Inheritance:** Autosomal dominant (AD)

.

[DUMBBELL] **Code:** *"NTG is a mysterious politician with two dominant routes to power: either through autophagy tricks (OPTN) or by conquering with a TANK (TBK1)."*

→ NTG = AD inheritance via OPTN (GLC1E) or TBK1 (GLC1P)
`,
  },

  {
    id: "glaucoma_4",
    q: `What are the gene loci, gene mutations, and inheritance patterns of Axenfeld–Rieger syndrome?`,
    a: `
**Pattern 1**

**Locus:** IRID1

**Gene:** FOXC1 *(embryonic anterior segment development)*

**Inheritance:** Autosomal dominant (AD)

---

**Pattern 2**

**Locus:** RIEG1

**Gene:** PITX2 *(or CPAMD8 in some variants)*

**Inheritance:** Autosomal recessive (AR)

.

[DUMBBELL] **Code:** *"The fox was dominant and two Peters were defeated in the CAMP."*

→ FOXC1 = AD

→ PITX2, CPAMD8 = AR
`,
  },

  {
    id: "glaucoma_5",
    q: `What are the gene loci, gene mutations, and inheritance patterns associated with primary congenital glaucoma (PCG)?`,
    a: `
**Pattern 1**

**Locus:** GLC3A

**Gene:** CYP1B1 *(TM development)*

**Inheritance:** Autosomal recessive (AR)

---

**Pattern 2**

**Locus:** GLC3D

**Gene:** LTBP2 *(Extracellular matrix maintenance + cell adhesion)*

**Inheritance:** Autosomal recessive (AR)

---

**Pattern 3**

**Locus:** GLC3E

**Gene:** TEK (TIE2) or ANGPT1 *(Schlemm canal maldevelopment)*

**Inheritance:** Autosomal dominant (AD)
`,
  },

  {
    id: "glaucoma_6",
    q: `What diseases are associated with LTBP2 mutation?`,
    a: `
[DOT] Primary congenital glaucoma (PCG) *(GLC3D)*

[DOT] Weill–Marchesani syndrome

[DOT] Microspherophakia

[DOT] Ectopia lentis
`,
  },

  {
    id: "glaucoma_7",
    q: `What are the gene locus, gene mutation, and inheritance pattern of nail-patella syndrome?`,
    a: `
**Gene locus:** NPS

---

**Gene mutation:** LMX1B

---

**Inheritance pattern:** Autosomal dominant (AD)
`,
  },

  {
    id: "glaucoma_8",
    q: `What are the gene locus, gene mutation, and inheritance pattern of aniridia?`,
    a: `
**Locus:** 11p13

**Gene:** PAX6

**Inheritance:** Autosomal dominant (AD)

---

[WARNING] *Sporadic aniridia is associated with WT1 deletion (**Wilms tumor** risk).*
`,
  },

  {
    id: "glaucoma_9",
    q: `What is the common mutation in pseudoexfoliation (PXF), what is its function, and how frequently is it found in normal individuals?`,
    a: `
LOXL1 *(Elastin mutation)*

---

[SIREN] **PXF:** 99%, **Control:** 80%
`,
  },

  {
    id: "glaucoma_10",
    q: `What are environmental factors associated with glaucoma?`,
    a: `
[DOT] Sunlight exposure

[DOT] Low environmental temperature

[DOT] Estrogen exposure

[DOT] Hypercholesterolemia

[DOT] Statin use

[DOT] Lead (heavy metal) exposure
`,
  },
   /// Chapter 2///
   /// Question 11 ///

  {
    id: "glaucoma_11",
    q: `Describe the general anatomy of the ciliary processes?`,
    a: `

Approximately 80 cilliary processes, consisting of: a bilayered epithelium + stroma + fenestrated capillaries.

---

**Inner nonpigmented epithelium** (*protrudes into the posterior chamber*): abundant mitochondria + microvilli → aqueous humor production.

**Outer pigmented epithelium**

---

[SIREN]Note: The blood–aqueous barrier is located at the apical surfaces of the two epithelial layers.

`,
  },

  /// Question 12 ///

  {
    id: "glaucoma_12",
    q: `Name the three mechanisms of aqueous humor secretion.`,
    a: `
1. **Active secretion** (*majority of aqueous humor production*; carbonic anhydrase II–dependent) → Na⁺, Cl⁻, HCO₃⁻, etc.
2. **Ultrafiltration** (*pressure-dependent*)
3. **Simple diffusion**


`,
  },

  /// Question 13 ///

  {
    id: "glaucoma_13",
    q: `How do the levels of H⁺, Cl⁻, ascorbate, HCO₃⁻, and protein in aqueous humor compare with plasma?`,
    a: `
**Higher than plasma:** H⁺, Cl⁻, ascorbate

**Lower than plasma:** HCO₃⁻, Protein (*Almost protein-free*)
`,
  },

  /// Question 14 ///

  {
    id: "glaucoma_14",
    q: `At which sites is the composition of aqueous humor modified within the eye?`,
    a: `
[DOT]Vitreous hyaloid face

[DOT]Lens surface

[DOT]Iris blood vessels

[DOT]Corneal endothelium

`,
  },

  /// Question 15 ///

  {
    id: "glaucoma_15",
    q: `Name the three main mechanisms that reduce aqueous humor production.`,
    a: `
**Carbonic anhydrase inhibitors:** ↓ HCO₃⁻ and H⁺ providing

**β₂-receptor blockers:** ↓ Na⁺/K⁺-ATPase activity

**α₂-receptor agonists:** ↓ cAMP → ↓ ciliary body blood flow
`,
  },

   /// Question 16 ///

  {
    id: "glaucoma_16",
    q: `Compare the trabecular meshwork vs Schlemm's canal in terms of 

1. endothelial and basement membrane continuity

2. active/inactive transport

3. and changes secondary to increased IOP.`,
    a: `

`,
answerImage: "/images/glaucoma/16.png",
  },

  /// Question 16 ///
  {
    id: "glaucoma_16",
    q: `What changes occur in the trabecular meshwork with aging?`,
    a: `
↓ Trabecular meshwork cell number

↑ Basement membrane thickness

---

[BRAIN] **Note**: Laser trabeculoplasty (LTP) → ↑ Trabecular meshwork cell division
`,
  },

  /// Question 17 ///
  {
    id: "glaucoma_17",
    q: `What is the Goldmann equation for IOP?`,
    a: `
IOP = (F − U) / C + Pv

---

[DOT]F: Aqueous humor production rate *(µL/min)*

[DOT]U: Uveoscleral outflow *(µL/min)*

[DOT]C: Trabecular outflow facility *(µL/min/mmHg)*

[DOT]Pv: Episcleral venous pressure *(mmHg)*
`,
  },

   /// Question 18 ///
  {
    id: "glaucoma_18",
    q: `Which factors increase aqueous humor outflow through the uveoscleral pathway?`,
    a: `
1. Cycloplegic agents

2. Adrenergic agents

3. Prostaglandin F₂α analogues

4. Suprachoroidal stent

5. Cyclodialysis cleft

---
[BRAIN]**Note:** Miotic agents → ↓ uveoscleral outflow
`,
  },

  /// Question 19 ///
  {
    id: "glaucoma_19",
    q: `Name three causes of increased IOP.`,
    a: `
[DOT]**Fever** → [BRAIN]*↑ aqueous humor production*

[DOT]**Hypothyroidism**

[DOT]**Medications:**
Anticholinergics *(angle closure)*, Corticosteroids, Ketamine, LSD, Topiramate

---
[SIREN]**Note:** *These are high-yield causes; many other causes of elevated IOP also exist.*
`,
  },

  /// Question 20 ///
  {
    id: "glaucoma_20",
    q: `Name some causes of decreased IOP.`,
    a: `
[DOT]**Aerobic exercise**

[DOT]**Acidosis** *(metabolic or respiratory)*

[DOT]**Pregnancy**

[DOT]**Medications**:
Depolarizing muscle relaxants (succinylcholine), Ketamine, Alcohol, Heroin, Marijuana
`,
  },

  /// Question 21 ///
  {
    id: "glaucoma_21",
    q: `Describe the technique, advantage, and disadvantage of the Tono-Pen (Mackay–Marg type).`,
    a: `

`,
answerImage: "/images/glaucoma/21.png",
  },

  /// Question 22 ///
  {
    id: "glaucoma_22",
    q: `Describe the technique, advantage, and disadvantage of the Pneumatonometer.`,
    a: `

`,
answerImage: "/images/glaucoma/22.png",
  },

  /// Question 23 ///
  {
    id: "glaucoma_23",
    q: `Describe the technique, advantage, and disadvantage of the Ocular Response Analyzer (ORA, Airpuff).`,
    a: `
`,
answerImage: "/images/glaucoma/23.png",
  },

  /// Question 24 ///
  {
    id: "glaucoma_24",
    q: `Describe the technique and advantage of the Dynamic Contour Tonometry.`,
    a: `

`,
answerImage: "/images/glaucoma/24.png",
  },

  /// Question 25 ///
  {
    id: "glaucoma_25",
    q: `When does the highest peak of IOP occur during the 24-hour cycle, and what is the reason?`,
    a: `
Early morning hours (during sleep)

---

[BRAIN]**Mechanism:**

↓ aqueous humor production, + ↓ Trabecular Outflow facility + ↓ Uveoscleral outflow

---

[DUMBBELL]**Note:** All parameters of the Goldmann equation decrease except episcleral venous pressure (EVP).
`,
  },

  /// Chapter 3 ///
  /// Question 26 ///
  {
    id: "glaucoma_26",
    q: `Which adnexal diseases may be associated with glaucoma?`,
    a: `
[DOT]**Tuberous sclerosis** (TS, *Bourneville syndrome*) 

→[BRAIN]Due to DR, NVD, Vit Hx

---

[DOT]**Juvenile xanthogranuloma** (JXG)

---

[DOT]**Oculodermal melanocytosis** *(unilateral/bilateral)*

---

[DOT]**Neurofibromatosis type 1** (NF1, *von Recklinghausen disease*) → [SIREN]Glaucoma is rare, but occurs unilaterally in 25–50% of patients with subcutaneous plexiform neurofibroma

---

[DOT]**Sturge–Weber syndrome** (SWS)

---

[DOT]**Klippel–Trenaunay–Weber syndrome** (SWS + limb cutaneous hemangioma)
`,
  },

  /// Question 27 ///
  {
    id: "glaucoma_27",
    q: `Describe the types of gonioscopy lenses with examples.`,
    a: `
**1. Direct gonioscopy lenses:** Richard, Wurst, Swan-Jacob, Koeppe

---

**2. Indirect gonioscopy lenses:** Posner, Sussman, Zeiss

[DUMBBELL]*Similar to indirect ophthalmoscopy, they provide a smaller and inverted image.*
`,
  },

  /// Question 28 ///
  {
    id: "glaucoma_28",
    q: `What does the Shaffer system evaluate for estimation of angle closure, and how is it graded?`,
    a: `
Evaluates: TM–iris angle

---

Grade 4: >45°

Grade 3: 20–45°

Grade 2: <20° → *Possible angle closure*

Grade 1: <10° → *Probable angle closure*

Grade 0: 0° → *Present angle closure*
`,
  },

  /// Question 29 ///
  {
    id: "glaucoma_29",
    q: `What parameters are assessed in the Spaeth gonio classification?`,
    a: `
**1. Iris root insertion:**

**A**: Anterior to Schwalbe line

**B**: Behind Schwalbe line

**C:** Visible scleral spur

**D**: Deep, visible iris root

**E**: Extremely deep: >1 mm visible ciliary body

---

**2. Angle**:
10° / 20° / 30° / 40°

---

**3. Peripheral iris configuration**:

**B**: Bowing

**P**: Plateau

**F**: Flat

**C**: Concave
`,
  },

  /// Question 30 ///
  {
    id: "glaucoma_30",
    q: `What are the specific characteristics of angle vessels in Fuchs uveitis?`,
    a: `
Thin + Branching + Unsheathed + Meandering (tortuous)
`,
  },
];