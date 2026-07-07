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

**Gene mutation:** MYOC *(myocilin/ TIGR)*

---

**Inheritance pattern:** Autosomal dominant (AD)

.


**Code:** *“Juveniles are all Alpha and Dominant — they listen to music and become Tigers”*
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

**Code:** *“NTG is a mysterious politician with two dominant routes to power: either through autophagy tricks (OPTN) or by conquering with a TANK (TBK1).”
→ NTG = AD inheritance via OPTN (GLC1E) or TBK1 (GLC1P).*



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
**Gene:** PITX2 (or CPAMD8 in some variants)
**Inheritance:** Autosomal recessive (AR)   

.

**Code:** *“The fox was dominaant and two Peters were defeated in the CAMP”
→ FOXC1 = AD, PITX2, CPAMD8 = AR*
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

**Locus:** GLC3E **Genes:** TEK (TIE2) or ANGPT1 *(both Schlemm canal maldevelopment)*
**Inheritance:** Autosomal dominant (AD)
`,
  },

   {
    id: "glaucoma_6",
    q: `What diseases are associated with LTBP2 mutation?`,
    a: `
• Primary congenital glaucoma (PCG) *(Locus: GLC3D)*


• Weill–Marchesani syndrome


• Microspherophakia


• Ectopia lentis
`,
  },

   {
    id: "glaucoma_7",
    q: `What are the gene locus, gene mutation, and inheritance pattern of nail-patella syndrome?`,
    a: `
**Gene Locus:** NPS

---

**Gene Mutation:** LMX1B

---

**Inheritance Pattern:** Autosomal dominant (AD)
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

***Sporadic aniridia** is associated with *WT1* deletion (**Wilms tumor** risk).*
`,
  },

   {
    id: "glaucoma_9",
    q: `What is the common mutation in pseudoexfoliation (PXF), what is its function, and how frequently is it found in normal individuals?`,
    a: `
LOXL1 *(Elastin mutation)*

---

PXF: 99%, Control: 80%
`,
  },

   {
    id: "glaucoma_10",
    q: `What are environmental factors associated with glaucoma?`,
    a: `
1. Sunlight exposure
2. Low environmental temperature
3. Estrogen exposure
4. Hypercholesterolemia
5. Statin use
6. Lead (heavy metal) exposure
`,
  },

];