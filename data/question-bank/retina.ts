import type { Question } from "@/shared/types/question";

export const retinaQuestions: Question[] = [

// ==========================================================
  // Anatomy
  // ==========================================================

  {
  id: "retina-001",

  topic: "Anatomy",

  question:
    "What is the name of the potential space located between the **posterior lens capsule** and the **anterior cortical vitreous gel**?",

  options: [
    "Annular gap",
    "Berger space",
    "Wieger ligament",
    "Martegiani area",
  ],

  correctAnswer: 1,

  explanation: `**(A):** The **annular gap** is a ring-shaped space between the vitreous base and the lens, allowing communication between the aqueous humor and the vitreous.

**(C):** The **ligament of Wieger** is the circular adhesion formed where the anterior cortical vitreous attaches to the posterior lens capsule. It defines the margin of Berger space rather than the space itself.

**(D):** The **area of Martegiani** is the funnel-shaped opening of **Cloquet's canal** at the optic disc.`,
},

{
  id: "retina-002",

  topic: "Anatomy",

  question:
    "Which of the following retinal layers is **absent in the foveola**?",

  options: [
    "Internal limiting membrane (ILM)",
    "Outer nuclear layer (ONL)",
    "Outer plexiform layer (OPL)",
    "Inner nuclear layer (INL)",
  ],

  correctAnswer: 3,

  explanation:
    `The **foveola** is the floor of the fovea and contains only **cone photoreceptors**. Both the **inner nuclear layer** and the **ganglion cell layer** are displaced laterally.`,
},

{
  id: "retina-003",

  topic: "Anatomy",

  question:
    "Which of the following statements about the anatomical definitions of the **macula** is **incorrect**?",

  options: [
    "The perifovea is a 1.5 mm ring surrounding the parafovea.",
    "The foveola has a diameter of approximately 350 μm.",
    "The fovea subtends approximately 5 degrees of the visual field.",
    "The macula has a diameter of 3.5 mm and is located between the vascular arcades.",
  ],

  correctAnswer: 3,

  explanation:
    `**(D)** The **macula** has a diameter of approximately **5.5 mm** and is located between the superior and inferior vascular arcades.`,
},

{
  id: "retina-004",

  topic: "Anatomy",

  question:
    "Which region is the **thickest** in the central retina?",

  options: [
    "Umbo",
    "Foveal avascular zone (FAZ)",
    "Parafovea",
    "Perifovea",
  ],

  correctAnswer: 2,

  explanation:
    `**(C):** The **parafovea** is the thickest part of the central retina because the **ganglion cell layer**, **inner nuclear layer (INL)**, and **Henle fiber layer** reach their maximum thickness in this region.`,
},

{
  id: "retina-005",

  topic: "Anatomy",

  question:
    "Which of the following statements about **macular anatomy** is correct?",

  options: [
    "The perifovea is a 0.5 mm ring surrounding the parafovea.",
    "The macula contains 3 or more ganglion cell layers.",
    "The fovea is a concave central retinal depression measuring about 1.5 disc diameters.",
    "The umbo is a small (150–200 μm) central depression at the floor of the fovea.",
  ],

  correctAnswer: 3,

  explanation:
    `**(A):** The **perifovea** is a **1.5 mm** ring surrounding the parafovea.

**(B):** The **macula** contains **2 or more ganglion cell layers**.

**(C):** The **fovea** is a concave central retinal depression measuring about **1.5 mm**, not **1.5 disc diameters**.`,
},

{
  id: "retina-006",

  topic: "Anatomy",

  question:
    "During indirect ophthalmoscopy, a radially oriented thickening of the retina is seen extending toward the pars plana, with a **ciliary process** along its course. What is this structure called?",

  options: [
    "Meridional fold",
    "Meridional complex",
    "Ora bay",
    "Dentate process",
  ],

  correctAnswer: 1,

  explanation:
    `**(A):** A **meridional fold** is a radial thickening of the retina extending toward the pars plana. **(C):** An **ora bay** is a posterior extension of the pars plana toward the retina. **(D):** A **dentate process** is an extension of the retina onto the pars plana.`,
},

{
  id: "retina-007",

  topic: "Anatomy",

  question:
    "In the **parafoveal region** of the retina, all of the following are correct **except**:",

  options: [
    "It is a 1.5 mm-wide ring surrounding the fovea.",
    "The inner nuclear layer (INL) is thicker in this region than in the perifovea.",
    "The Henle fiber layer is thicker in this region than in other areas.",
    "The ganglion cell layer is thicker in this region than in other areas.",
  ],

  correctAnswer: 0,

  explanation:
    `**(A):** The **parafovea** is a **0.5 mm-wide** ring surrounding the fovea, while the **perifovea** forms a **1.5 mm-wide** ring surrounding the fovea.`,
},

{
  id: "retina-008",

  topic: "Anatomy",

  question:
    "Which of the following statements regarding the anatomy of the **sensory retina** is incorrect?",

  options: [
    "The external limiting membrane is formed by the zonular attachments of photoreceptors to Müller cells.",
    "The internal limiting membrane is formed by the footplates of Müller cells.",
    "In the fovea, cone photoreceptors are densely packed.",
    "The maximum density of rod photoreceptors is found in the far peripheral retina.",
  ],

  correctAnswer: 3,

  explanation:
    `**(D):** The maximum density of **rod photoreceptors** is located approximately **4 mm from the foveal center**, or about **12 degrees from fixation**. Rod density decreases toward the peripheral retina. There is also another region superior to the macula where rod density may be even higher than at the foveal center.`,
},

{
  id: "retina-009",

  topic: "Anatomy",

  question:
    "Which of the following statements is incorrect?",

  options: [
    "The photosensitive molecules in rod and cone photoreceptors contain derivatives of vitamin A.",
    "Each cone photoreceptor synapses with a bipolar cell.",
    "Each bipolar cell synapses with more than one, and sometimes more than 100, rod photoreceptors.",
    "Horizontal cells are responsible for responding to sudden changes in light intensity.",
  ],

  correctAnswer: 3,

  explanation:
    `**(D):** **Amacrine cells** are responsible for responses to changes in the stimulus, such as sudden changes in light intensity and specific stimulus sizes.`,
},

{
  id: "retina-010",

  topic: "Anatomy",

  question:
    "Which of the following statements regarding the anatomy of the retinal layers is incorrect?",

  options: [
    "Amacrine cells are located at the inner surface of the inner nuclear layer (INL).",
    "The junctions between the inner fibers of photoreceptors and bipolar cells form the external limiting membrane (ELM).",
    "The ellipsoid zone consists of mitochondria, cilia, and inner discs.",
    "The radial peripapillary vascular network is located within the nerve fiber layer.",
  ],

  correctAnswer: 1,

  explanation:
    `**(B):** The **external limiting membrane (ELM)** is formed by **zonular attachments between photoreceptors and Müller cells**. 
    
---
  The three limiting membranes described histologically or on OCT are not true membranes:

- **Internal limiting membrane (ILM):** formed by the **footplates of Müller cells** and attached to the posterior cortical vitreous.
- **Middle limiting membrane (MLM):** consists of **synaptic and desmosomal connections between photoreceptors and bipolar cells**, located in the inner one-third of the OPL.
- **External limiting membrane (ELM):** formed by **zonular attachments between photoreceptors and Müller cells**.`,
},

{
  id: "retina-011",

  topic: "Anatomy",

  question:
    "Which of the following structures contributes to the formation of the inner–outer segment junction of the retina?",

  options: [
    "Endoplasmic reticulum",
    "Mitochondria",
    "Outer disc",
    "Ciliary processes",
  ],

  correctAnswer: 1,

  explanation:
    `The **inner–outer segment junction** consists of the **mitochondria (ellipsoid) + cilium + inner portion of the discs of the outer segment**.`,
},
  // ==========================================================
  // ACHROMATOPSIA
  // ==========================================================

  {
    id: "retina-017",

    topic: "Achromatopsia",

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
* **S-cone** monochromatism: VA **>20/80**`,
  },

  // ==========================================================
  // ROD MONOCHROMATISM
  // ==========================================================

  {
    id: "retina-018",

    topic: "Rod Monochromatism",

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

**(A)** The rod response on ERG is normal while the cone response is abnormal.

**(B)** On dark adaptation, the cone plateau and cone–rod break are absent.

**(C)** The clinical findings are generally **nonprogressive**.

**(D)** Specifically, the severity of **nystagmus improves** with age.`,
  },

  // ==========================================================
  // CONGENITAL STATIONARY NIGHT BLINDNESS
  // ==========================================================

  {
    id: "retina-019",

    topic: "Congenital Stationary Night Blindness (CSNB)",

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

  // ==========================================================
  // FUNDUS ALBIPUNCTATUS vs RETINITIS PUNCTATA ALBESCENS
  // ==========================================================

  {
    id: "retina-020",

    topic: "Fundus Albipunctatus",

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
      `**(A)** **Retinitis punctata albescens** is the only disease in this chapter associated with **progressive** changes.

**(B)** The yellow iridescent reflex following light exposure is the **Mizuo–Nakamura phenomenon**, which is seen in **Oguchi disease**.

**(C)** The yellow–white dots in **retinitis punctata albescens** are **finer**.

**(D)** With prolonged dark adaptation, **fundus albipunctatus** can show **normalization** of the ERG, whereas **retinitis punctata albescens** may **improve only partially** and never becomes completely normal.`,
  },

  // ==========================================================
  // FUNDUS ALBIPUNCTATUS — GENE
  // ==========================================================

  {
    id: "retina-021",

    topic: "Inherited Nyctalopia",

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
];