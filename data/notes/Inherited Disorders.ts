import type { Note } from "@/shared/types/note";

export const IDNote: Note = {
  key: "Inherited Disorders",
  title: "Retina",

  sections: [
    // =========================
    // OVERVIEW
    // =========================
    {
      slug: "overview",
      title: "Overview",
      description: "AAO BCSC retina overview of inherited retinal disorders, including dyschromatopsia and nyctalopia, with ophthalmology board-review concepts on cone and rod photoreceptor dysfunction and color vision defects.",      pages: [
        {
          id: "retina_12_1",
          type: "note",
          label: "Introduction",
          text: `*Two broad categories of disorders are introduced in this topic: **dyschromatopsia (color vision defects)** and **nyctalopia (night blindness)**.*

---

**Dyschromatopsia:** involves the cone photoreceptors, of which there are three types:

* **S-cones** (short-wave)
* **M-cones** (medium-wavelength)
* **L-cones** (long-wavelength)

*Depending on which cone type is affected, different portions of the color spectrum may become impaired.*

**Nyctalopia:** results from dysfunction of the rod photoreceptors.`,
        },
      ],
    },

    // =========================
    // DYSCHROMATOPSIA
    // =========================
    {
      slug: "dyschromatopsia",
      title: "Dyschromatopsia", 
      description: "AAO BCSC retina summary and board-review notes on congenital and acquired dyschromatopsia, including red–green vs blue–yellow color vision defects, inheritance patterns, and ophthalmology board pearls.",      
      pages: [
        {
          id: "retina_12_2",
          type: "note",
          label: "Note",
          text: `
[DOT]**Congenital:** Male > female; typically X-linked → *predominantly **red–green** color abnormalities.*

[DOT]**Acquired:** Male = female → *predominantly **blue–yellow** color abnormalities.*

---

[DUMBBELL]**Code:** Dyschromatopsia often reveals itself at **traffic lights**: the patient has difficulty distinguishing **red from green** and is left wondering what the yellow light is supposed to mean!`,
        },
        {
          id: "retina_12_3",
          type: "fillBlank",
          label: "Fill in the Blank",
          text: `The most common color spectrum abnormality in acquired dyschromatopsia is ______.`,
          answer: `Blue–yellow`,
        },
      ],
    },

    // =========================
    // ACHROMATOPSIA
    // =========================
    {
      slug: "achromatopsia",
      title: "Achromatopsia",
      description: "AAO BCSC retina summary and ophthalmology board review of achromatopsia, including rod monochromatism, blue-cone monochromatism, congenital nystagmus, cone ERG findings, and key differential diagnoses.",
      pages: [
        {
          id: "retina_12_4",
          type: "note",
          label: "Note",
          text: `
**Achromatopsia** refers to a complete inability to discriminate colors. As a result, the patient must distinguish different colors primarily on the basis of **intensity**.

---

**Manifestations**: Achromatopsia + congenital nystagmus + ↓VA + photophobia

---

1. **Rod Monochromatism**

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
        {
          id: "retina_12_5",
          type: "mcq",
          label: "Practise Test",
          question:
            "A 9-year-old boy is referred with **reduced vision** since childhood. His parents report **nystagmus** since early childhood, and one of his **maternal uncles** also has poor visual acuity. Visual acuity is **20/60** in both eyes. Fundus examination is normal. ERG shows **normal scotopic responses** but **reduced photopic responses**. Which of the following is the most likely diagnosis?",
          options: [
            "S-cone monochromatism",
            "Rod monochromatism",
            "Ocular albinism",
            "Congenital motor nystagmus",
          ],
          correctAnswer: 0,
          explanation: `
**(C, D):** Ocular albinism and congenital motor nystagmus typically have a **normal cone ERG**. **(B):** In rod monochromatism, visual acuity is usually worse than 20/80.

[SIREN]**Quick Clue:** Visual acuity can provide a rapid way to distinguish the causes of achromatopsia.

* **Rod** monochromatism: VA **<20/80**
* **S-cone** monochromatism: VA **>20/80**`,
        },
      ],
    },

    // =========================
    // ROD MONOCHROMATISM
    // =========================
    {
      slug: "rod-monochromatism",
      title: "Rod Monochromatism",
      description: "A focused review of rod monochromatism, covering its inheritance, visual acuity, characteristic ERG and dark-adaptation findings, and the typical improvement of childhood nystagmus with age.",
      pages: [
        {
          id: "retina_12_6",
          type: "note",
          label: "Note",
          text: `
**Inheritance:** Autosomal recessive

**Visual acuity** 20/80–20/200 [SIREN]

**ERG:** Normal rod response + absent cone response [SIREN]

**Dark Adaptation:** Loss of the cone plateau + loss of the cone–rod break.

[SIREN] *Childhood nystagmus **improves** with increasing age.*`,
        },
        {
          id: "retina_12_7",
          type: "fillBlank",
          label: "Fill in the Blanks",
          text: `The severity of nystagmus in patients with **rod monochromatism** ______ with increasing age.`,
          answer: `decreases`,
        },
        {
          id: "retina_12_8",
          type: "mcq",
          label: "Practise Test",
          question:
            "A 7-year-old child is referred because of **involuntary eye movements** present since birth. Examination reveals obvious nystagmus, and best-corrected visual acuity is **20/160** in each eye. Color vision is also impaired. Which of the following descriptions is correct?",
          options: [
            "Both rod and cone responses are abnormal on ERG.",
            "On dark adaptation, the cone plateau is normal and the cone–rod break is absent.",
            "With increasing age, the nystagmus will worsen and visual acuity will fall below 20/200.",
            "With increasing age, the nystagmus will improve and visual acuity will not fall below 20/200.",
          ],
          correctAnswer: 3,
          explanation: `
**In Rod monochromatism:**

**(A)** the rod response on ERG is normal while the cone response is abnormal. **(B)** On dark adaptation, the cone plateau and cone–rod break are absent. **(C)** the clinical findings are generally **nonprogressive**, and **(D)** specifically, the severity of **nystagmus improves** with age.`,
        },
      ],
    },

    // =========================
    // S-CONE MONOCHROMATISM
    // =========================
    {
      slug: "s-cone-monochromatism",
      title: "S-Cone Monochromatism",
      description: "A concise review of S-cone monochromatism, including its X-linked inheritance, characteristic visual acuity, and distinctive ERG findings involving S-cone, 30-Hz cone, and rod responses.",
      pages: [
        {
          id: "retina_12_9",
          type: "note",
          label: "Note",
          text: `
[DOT]**Inheritance:** X-linked

[DOT]**Visual acuity** >20/80 [SIREN]

[DOT]**ERG:** Preserved S-cone response + Reduced LA 3.0 30-Hz response + normal rod response [SIREN]`,
        },
        {
          id: "retina_12_10",
          type: "fillBlank",
          label: "Fill in the Blanks",
          text: `Visual acuity in patients with **rod monochromatism** is typically ______.`,
          answer: `>20/80`,
        },
      ],
    },

    // =========================
    // INHERITED NYCTALOPIA
    // =========================
    {
      slug: "inherited-nyctalopia",
      title: "Inherited Nyctalopia",
      description: "An overview of inherited nyctalopia, covering congenital stationary night blindness, fundus albipunctatus, retinitis punctata albescens, and Oguchi disease, with emphasis on progression and characteristic fundus findings.",
      pages: [
        {
          id: "retina_12_11",
          type: "note",
          label: "Note",
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
          id: "retina_12_12",
          type: "fillBlank",
          label: "Fill in the Blank",
          text: `**Retinitis punctata albescens** is a ______ disease.`,
          answer: `progressive`,
        },
        {
          id: "retina_12_13",
          type: "fillBlank",
          label: "Fill in the Blank",
          text: `**Fundus albipunctatus** is a ______ disease.`,
          answer: `nonprogressive`,
        },
      ],
    },

    // =========================
    // CSNB
    // =========================
    {
      slug: "csnb",
      title: "CSNB",
      description: "A focused review of congenital stationary night blindness, covering its nonprogressive course, X-linked inheritance, myopia, normal fundus appearance, paradoxical pupillary response, and characteristic electronegative ERG.",
      pages: [
        {
          id: "retina_12_14",
          type: "note",
          label: "Note",
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
          id: "retina_12_15",
          type: "note",
          label: "Note",
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
          id: "retina_12_16",
          type: "mcq",
          label: "Practise Test",
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
            "CSNB is a **stationary (nonprogressive)** disorder, as indicated by its name.",
        },
      ],
    },

    // =========================
    // FUNDUS ALBIPUNCTATUS
    // =========================
    {
      slug: "fundus-albipunctatus",
      title: "Fundus Albipunctatus",
      description: "A focused review of fundus albipunctatus, covering delayed rhodopsin regeneration, RDH5-related dysfunction, characteristic white–yellow retinal dots, preserved foveal involvement, and dark-adaptation findings.",
      pages: [
        {
          id: "retina_12_17",
          type: "note",
          label: "Note",
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
          id: "retina_12_18",
          type: "fillBlank",
          label: "Fill in the Blank",
          text: `In **fundus albipunctatus**, the white–yellow retinal dots ______ the fovea.`,
          answer: `spares`,
        },
        {
          id: "retina_12_19",
          type: "fillBlank",
          label: "Fill in the Blank",
          text: `Fundus albipunctatus results from a mutation in the ______ gene, which encodes ______.`,
          answer: `RDH-5`,
        },
      ],
    },

    // =========================
    // RETINITIS PUNCTATA ALBESCENS
    // =========================
    {
      slug: "retinitis-punctata-albescens",
      title: "Retinitis Punctata Albescens",
      description:
  "A focused review of retinitis punctata albescens, a progressive rod–cone dystrophy characterized by fine white retinal dots, vascular attenuation, severely reduced ERG responses, and incomplete recovery on dark adaptation.",
      pages: [
        {
          id: "retina_12_20",
          type: "note",
          label: "Note",
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
          id: "retina_12_21",
          type: "fillBlank",
          label: "Fill in the Blank",
          text: `After recovery, dark adaptation becomes ______ in **fundus albipunctatus.**`,
          answer: `normal`,
        },
        {
          id: "retina_12_22",
          type: "fillBlank",
          label: "Fill in the Blank",
          text: `After recovery, dark adaptation becomes ______ in **retinitis punctata albescens.**`,
          answer: `slightly better`,
        },
        {
          id: "retina_12_23",
          type: "fillBlank",
          label: "Fill in the Blank",
          text: `Compared with retinitis punctata albescens, the white dots seen in fundus albipunctatus are ______.`,
          answer: `larger`,
        },

         {
          id: "retina_12_24",
          type: "mcq",
          label: "Practise Test",
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
      ],
    },

         
    // =========================
    // KEY MUTATIONS
    // =========================
    {
      slug: "key-mutations",
      title: "Key Mutations",
      description:
  "A concise review of key gene–disease associations in inherited nyctalopia, covering RDH5 in fundus albipunctatus, RLBP1 in retinitis punctata albescens, and SAG and GRK1 in Oguchi disease.",
      pages: [
        {
          id: "retina_12_25",
          type: "note",
          label: "Key Mutations",
          text: `

*This is a list of most important mutations discussed in this chapter.*

| Disease | Gene Mutation | Encoded Protein |
|---|---|---|
| **Fundus Albipunctatus** | RDH5 | 11-cis retinol dehydrogenase |
| **Retinitis Punctata Albescens** | RLBP1 | Retinaldehyde-binding protein |
| **Oguchi Disease** | SAG/ GRK1 | Arrestin/ Rhodopsin kinase |
`,
        },

      {
          id: "retina_12_26",
          type: "mcq",
          label: "Practise Test",
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
      ],
    },

    // =========================
    // OGUCHI DISEASE
    // =========================
    {
      slug: "oguchi-disease",
      title: "Oguchi Disease",
      description: "A focused review of Oguchi disease, including its SAG and GRK1 mutations, arrestin and rhodopsin kinase involvement, and the characteristic Mizuo–Nakamura phenomenon on fundus examination.",
      pages: [
        {
          id: "retina_12_27",
          type: "note",
          label: "Note",
          text: `
Oguchi disease is a very rare disorder that has been reported more frequently in Japanese individuals.

**Mutation:**

* **SAG** → Arrestin
* **GRK1** → Rhodopsin kinase

**Clinical findings:**

**Mizuo–Nakamura phenomenon** on fundus examination: the retina appears normal in darkness but develops a **yellowish, bright iridescent** appearance under **illumination**.`,
        },
        {
          id: "retina_12_28",
          type: "fillBlank",
          label: "Fill in the Blanks",
          text: `In **Oguchi disease**, the retina develops a yellowish **iridescent** appearance in ______.`,
          answer: `bright light`,
        },
      ],
    },
  ],
};