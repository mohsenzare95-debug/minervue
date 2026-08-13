import type { Question } from "./types";

export const retinaQuestions: Question[] = [
  // ==========================================================
  // ACHROMATOPSIA
  // ==========================================================

  {
    id: "retina-001",

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
    id: "retina-002",

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
    id: "retina-003",

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
    id: "retina-004",

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
    id: "retina-005",

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