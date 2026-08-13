// data/notes/retina.ts

import type { Note } from "@/shared/types/note";

export const retinaNote: Note = {
  key: "retina",
  title: "Retina",

  pages: [
    // =========================
    // OVERVIEW
    // =========================
    {
      id: "retina-1",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Overview",
      text: `*Two broad categories of disorders are introduced in this topic: **dyschromatopsia (color vision defects)** and **nyctalopia (night blindness)***.

---

**Dyschromatopsia:** involves the cone photoreceptors, of which there are three types:
* **S-cones** (short-wave)
* **M-cones** (medium-wavelength)
* **L-cones** (long-wavelength)

*Depending on which cone type is affected, different portions of the color spectrum may become impaired.*

**Nyctalopia:** results from dysfunction of the rod photoreceptors.`,
    },

    // =========================
    // COLOR VISION DEFECTS
    // =========================
    {
      id: "retina-2",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Dyschromatopsia",
      text: `
[DOT]**Congenital:** Male > female; typically X-linked → *predominantly **red–green** color abnormalities.*

[DOT]**Acquired:** Male = female → *predominantly **blue–yellow** color abnormalities.*

---
[DUMBBELL]**Code:** Dyschromatopsia often reveals itself at **traffic lights**: the patient has difficulty distinguishing **red from green** and is left wondering what the yellow light is supposed to mean!`,
    },

    {
      id: "retina-3",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Dyschromatopsia",
      text: `The most common color spectrum abnormality in acquired dyschromatopsia is ______.`,
      answer: `Blue–yellow`,
    },

    // =========================
    // ACHROMATOPSIA
    // =========================
    {
      id: "retina-4",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Achromatopsia",
      text: `

**Achromatopsia** refers to a complete inability to discriminate colors. As a result, the patient must distinguish different colors primarily on the basis of **intensity**.

---

**Manifestations**: Achromatopsia + congenital nystagmus + ↓VA + photophobia

---

1.**Rod Monochromatism**
* VA: 20/80–20/200
* *Complete cone dysfunction, including the **S-cones***

2. **Blue-Cone (S-Cone) Monochromatism**
* VA: >20/80 [BRAIN]*Because a relatively greater proportion of cones remains functional, visual acuity is better than in rod monochromatism.*

---

**Important differential diagnoses:**
* Congenital Motor Nystagmus
* Ocular Albinism

[WARNING]Unlike achromatopsia, both **congenital motor nystagmus** and **ocular albinism** have a **normal Cone-ERG**.`,
    },

    // =========================
    // ACHROMATOPSIA MCQ
    // =========================
    {
      id: "retina-5",
      type: "mcq",
      subtitle: "Inherited Disorders",
      label: "Achromatopsia",
      question:
        "A 9-year-old boy is referred with **reduced vision** since childhood. His parents report **nystagmus** since early childhood, and one of his **maternal uncles** also has poor visual acuity. Visual acuity is **20/60** in both eyes. Fundus examination is normal. ERG shows **normal scotopic responses** but **reduced photopic responses**. Which of the following is the most likely diagnosis?",
      options: [
        "S-cone monochromatism",
        "Rod monochromatism",
        "Ocular albinism",
        "Congenital motor nystagmus",
      ],
      correctAnswer: 0,
      explanation:
        `**(C, D):** Ocular albinism and congenital motor nystagmus typically have a **normal cone ERG**. **(B):** In rod monochromatism, visual acuity is usually worse than 20/80. 
        
      
  [SIREN]**Quick Clue:** Visual acuity can provide a rapid way to distinguish the causes of achromatopsia.

* **Rod** monochromatism: VA **<20/80**
* **S-cone** monochromatism: VA **>20/80**
        `,
    },

    // =========================
    // ROD MONOCHROMATISM
    // =========================
    {
      id: "retina-6",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Rod Monochromatism",
      text: `

**Inheritance:** Autosomal recessive

**Visual acuity** 20/80–20/200 [SIREN]

**ERG:** Normal rod response + absent cone response [SIREN]

**Dark Adaptation:** Loss of the cone plateau + loss of the cone–rod break. 

[SIREN] *Childhood nystagmus **improves** with increasing age.*
`,
    },

    {
      id: "retina-7",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Rod Monochromatism",
      text: `The severity of nystagmus in patients with **rod monochromatism** ______ with increasing age.`,
      answer: `decreases`,
    },

    {
      id: "retina-8",
      type: "mcq",
      subtitle: "Inherited Disorders",
      label: "Rod Monochromatism",
      question:
        "A 7-year-old child is referred because of **involuntary eye movements** present since birth. Examination reveals obvious nystagmus, and best-corrected visual acuity is **20/160** in each eye. Color vision is also impaired. Which of the following descriptions is correct?",
      options: [
        "Both rod and cone responses are abnormal on ERG.",
        "On dark adaptation, the cone plateau is normal and the cone–rod break is absent.",
        "With increasing age, the nystagmus will worsen and visual acuity will fall below 20/200.",
        "With increasing age, the nystagmus will improve and visual acuity will not fall below 20/200.",
      ],
      correctAnswer: 3,
      explanation:
        `**In Rod monochromatism:**
        **(A)** the rod response on ERG is normal while the cone response is abnormal. **(B)** On dark adaptation, the cone plateau and cone–rod break are absent. **(C)** the clinical findings are generally **nonprogressive**, and **(D)** specifically, the severity of **nystagmus improves** with age.`,
    },

    // =========================
    // S-CONE MONOCHROMATISM
    // =========================
    {
      id: "retina-9",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "S-Cone Monochromatism",
      text: `

[DOT]**Inheritance:** X-linked

[DOT]**Visual acuity** >20/80 [SIREN]

[DOT]**ERG:** Preserved S-cone response + Reduced LA 3.0 30-Hz response + normal rod response [SIREN]`,
    },

    {
      id: "retina-10",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "S-Cone Monochromatism",
      text: `Visual acuity in patients with **rod monochromatism** is typically ______.`,
      answer: `>20/80`,
    },

    // =========================
    // INHERITED DISORDERS CAUSING NYCTALOPIA
    // =========================
    {
      id: "retina-11",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Inherited Nyctalopia",
      text: `

*Four major disorders are included in this group:*

1. **Congenital Stationary Night Blindness (CSNB)**
2. **Fundus Albipunctatus**
3. **Retinitis Punctata Albescens**
4. **Oguchi Disease**

---

[DOT]**Visual acuity** is usually **normal** or only mildly reduced in these disorders.

[WARNING] **Retinitis punctata albescens** is **progressive**, whereas the other three disorders are generally nonprogressive.

[DOT]Except for **CSNB**, which has a normal posterior segment examination, the other disorders in this group have characteristic abnormal fundus findings.

---`,
    },

    {
      id: "retina-12",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Inherited Nyctalopia",
      text: `**Retinitis punctata albescens** is a ______ disease.`,
      answer: `progressive`,
    },

    {
      id: "retina-13",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Inherited Nyctalopia",
      text: `**Fundus albipunctatus** is a ______ disease.`,
      answer: `nonprogressive`,
    },

    // =========================
    // CSNB
    // =========================
    {
      id: "retina-14",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "CSNB",
      text: `

**Congenital Stationary Night Blindness (CSNB)** is, as its name suggests, a **nonprogressive (stationary)** disorder.

It is associated with **myopia**, and its most common inheritance pattern is **X-linked**.

---
**Clinical examination:**
* Normal posterior segment appearance
* ± Paradoxical pupillary response to darkness: *initial miosis, followed by mydriasis*

**ERG:** Electronegative ERG

**Dark Adaptation:** Reduced response`,
    },

    {
      id: "retina-15",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Electronegative ERG",
      text: `

[WARNING]**Differential diagnoses of a negative ERG:**
1. Drugs causing RGC toxicity, *such as methanol and quinine*
2. Siderosis
3. CSNB
4. Birdshot chorioretinopathy
5. Melanoma-associated retinopathy (MAR)
6. X-linked retinoschisis (XLRS)
7. CRAO
8. Duchenne dystrophy

*In **Duchenne dystrophy**, an electronegative ERG may be present in the **absence of pigmentary retinopathy**.*`,
    },

    {
      id: "retina-16",
      type: "mcq",
      subtitle: "Inherited Disorders",
      label: "CSNB",
      question:
        "A 33-year-old man presents with a history of **night vision** difficulty since **childhood**. Best-corrected visual acuity is **20/30** in both eyes. Fundus examination reveals no pathological findings. Electrophysiologic testing demonstrates a **negative ERG** pattern. Which of the following statements is **incorrect**?",
      options: [
        "It is most commonly inherited in an X-linked pattern.",
        "A paradoxical pupillary response to light may be observed.",
        "A normal a-wave helps distinguish this condition from retinitis pigmentosa.",
        "Progressive visual loss is expected in this patient.",
      ],
      correctAnswer: 3,
      explanation:
        "CSNB is a **stationary *(nonprogressive)*** disorder, as indicated by its name.",
    },

    // =========================
    // FUNDUS ALBIPUNCTATUS
    // =========================
    {
      id: "retina-17",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Fundus Albipunctatus",
      text: `

Fundus albipunctatus is a congenital disorder associated with **delayed regeneration of rhodopsin**, resulting in prolonged recovery of vision in darkness.

**Mutation:** RDH5 → 11-cis retinol dehydrogenase

**Clinical examination:**
* White–yellow dots throughout the posterior pole
* No foveal involvement [WARNING]
* Extension toward the midperiphery

**ERG:** Isolated cone response without a rod response

**Dark Adaptation:** Becomes normal after recovery.[SIREN]`,
    },

    {
      id: "retina-18",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Fundus Albipunctatus",
      text: `In **fundus albipunctatus**, the white–yellow retinal dots ______ the fovea.`,
      answer: `spares`,
    },

    {
      id: "retina-19",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Fundus Albipunctatus",
      text: `Fundus albipunctatus results from a mutation in the ______ gene, which encodes ______.`,
      answer: `RDH-5`,
    },

    // =========================
    // RETINITIS PUNCTATA ALBESCENS
    // =========================
    {
      id: "retina-20",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Retinitis Punctata Albescens",
      text: `

**Retinitis punctata albescens** is the only congenital cause of nyctalopia in this chapter that is **progressive**. It is essentially a **rod–cone dystrophy**. Retinitis punctate albescens can be distinguished from fundus albipunctatus by incomplete recovery on **dark adaptation**.

**Mutation:** RLBP1 → retinaldehyde-binding protein

**Clinical examination:**
* Finer white dots than those seen in fundus albipunctatus [SIREN]
* Vascular attenuation

**ERG:** Severely subnormal

**Dark Adaptation:** Slight recovery with prolonged adaptation, but without normalization [WARNING]`,
    },

    {
      id: "retina-21",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Fundus Albipunctatus",
      text: `After recovery, dark adaptation becomes ______ in **fundus albipunctatus.**`,
      answer: `normal`,
    },

    {
      id: "retina-22",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Retinitis Punctata Albescens",
      text: `After recovery, dark adaptation becomes ______ in **retinitis punctata albescens.**`,
      answer: `slightly better`,
    },

    {
      id: "retina-23",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Retinitis Punctata Albescens",
      text: `Compared with retinitis punctata albescens, the white dots seen in fundus albipunctatus are ______.`,
      answer: `larger`,
    },

    // =========================
    // FUNDUS ALBIPUNCTATUS VS RPA
    // =========================
    {
      id: "retina-24",
      type: "mcq",
      subtitle: "Inherited Disorders",
      label: "Fundus Albipunctatus",
      question:
        "Which of the following findings helps distinguish fundus albipunctatus from retinitis punctata albescens?",
      options: [
        "Progressive decline in visual acuity with increasing age",
        "Development of a yellow iridescent reflex following light exposure",
        "Presence of finer yellow–white dots on retinal examination",
        "Complete normalization of the ERG following prolonged dark adaptation",
      ],
      correctAnswer: 3,
      explanation:
        "**(A)** **Retinitis punctata albescens** is the only disease in this chapter associated with **progressive** changes. **(B)** The yellow iridescent reflex following light exposure is the **Mizuo–Nakamura phenomenon**, which is seen in **Oguchi disease**. **(C)** The yellow–white dots in **retinitis punctata albescens** are **finer**. **(D)** With prolonged dark adaptation, **fundus albipunctatus** can show **normalization** of the ERG, whereas **retinitis punctata albescens** may **improve only partially** and never becomes completely normal.",
    },

    // =========================
    // GENE MUTATION MCQ
    // =========================
    {
      id: "retina-24",
      type: "mcq",
      subtitle: "Inherited Disorders",
      label: "Nyctalopia Gene Mutation",
      question:
        "A patient presents with **nyctalopia** since childhood. Visual acuity and color vision are normal. Fundus examination reveals **white–yellow dots** throughout the retina except for the fovea. ERG demonstrates an abnormal rod response that returns to **normal after prolonged dark adaptation**. Which gene mutation is most likely?",
      options: [
        "SAG",
        "GRK1",
        "RLBP1",
        "RDH5",
      ],
      correctAnswer: 3,
      explanation:
        "**RDH5** encodes 11-cis retinol dehydrogenase and is associated with **fundus albipunctatus**.",
    },

    // =========================
    // GENE TABLE / NOTE
    // =========================
    {
      id: "retina-25",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Key Mutations",
      text: `
| Disease | Gene Mutation | Encoded Protein |
|---|---|---|
| **Fundus Albipunctatus** | RDH5 | 11-cis retinol dehydrogenase |
| **Retinitis Punctata Albescens** | RLBP1 | Retinaldehyde-binding protein |
| **Oguchi Disease** | SAG/ GRK1 | Arrestin/ Rhodopsin kinase |

`,
    },

    // =========================
    // OGUCHI
    // =========================
    {
      id: "retina-26",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Oguchi Disease",
      text: `

Oguchi disease is a very rare disorder that has been reported more frequently in Japanese individuals.

**Mutation:**
* **SAG** → Arrestin
* **GRK1** → Rhodopsin kinase

**Clinical findings:**
**Mizuo–Nakamura phenomenon** on fundus examination: the retina appears normal in darkness but develops a **yellowish, bright iridescent** appearance under **illumination**.`,
    },

    {
      id: "retina-27",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Oguchi Disease",
      text: `In **Oguchi disease**, the retina develops a yellowish **iridescent** appearance in ______.`,
      answer: `bright light`,
    },
  ],
};