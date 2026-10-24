import type { Question } from "@/shared/types/question";

export const rdQuestions: Question[] = [

{
  id: "retina_16_1",

  topic: "Retina",

  question:
    "Which of the following statements regarding PVD is incorrect?",

  options: [
    "The presence of vitreous pigment increases the likelihood of a retinal break.",
    "The early stages of PVD are usually asymptomatic.",
    "PVD typically begins at the optic disc margin and progresses toward the macular region.",
    "Concurrent vitreous hemorrhage increases the likelihood of a retinal tear by ×5-6.",
  ],

  correctAnswer: 2,

  explanation: `**(A):** The presence of **vitreous pigment** in a patient with acute PVD is associated with **×7 increased risk** of a retinal tear.

**(C):** The **final stage of PVD** typically involves vitreous separation at the **optic nerve head**, within the area of Martegiani. When the vitreous separates from the optic nerve head, a **Weiss ring** becomes visible on examination.

**(D):** The probability of a concurrent retinal tear is **7–18%** in symptomatic acute PVD and **50–70%** in **hemorrhagic PVD**.`,
},


{
  id: "retina_16_2",

  topic: "Retina",

  question:
    "Which of the following patients has the lowest risk of developing RRD?",

  options: [
    "Elevated focal areas of glial hyperplasia associated with vitreous traction.",
    "Peripheral retinal microcystic legsions with holes",
    "Lattice degeneration",
    "Retinal folds extending posteriorly from the dentate processes.",
  ],

  correctAnswer: 1,

  explanation: `**Lesions predisposing to RRD:** Lattice degeneration, vitreoretinal tufts, meridional folds, enclosed ora bays, and peripheral retinal excavation.

**Lesions that do not predispose to RRD:** Paving-stone (cobblestone) degeneration, RPE hypertrophy, and typical peripheral cystoid degeneration.

**(A):** [SIREN] **Vitreoretinal tuft** → elevated glial hyperplasia + vitreous/ zonular traction.
  
**(B):** **Typical peripheral cystoid degeneration** → appears as peripheral microcysts with a bubbly appearance in the OPL. It may occur with or without a retinal hole, and the risk of RRD is rare.

**(C):** The 11-year risk of RRD in patients with lattice degeneration without a symptomatic retinal break is only 1%. However, 20–30% of patients with RRD have been reported to have lesions consistent with lattice degeneration on examination.

**(D):** **Meridional fold →** Thickening of retinal tissue or redundant retinal folds that extend radially from the dentate process toward the posterior retina.`,
},

{
  id: "retina_16_3",

  topic: "Retina",

  question:
    "During indirect ophthalmoscopy of the peripheral retina, an elevated, pigmented lesion characterized by glial hyperplasia and vitreous-zonular traction is observed. Which of the following does this lesion represent?",

  options: [
    "Meridional fold",
    "Enclosed ora bay",
    "Vitreoretinal tuft",
    "Lattice degeneration",
  ],

  correctAnswer: 2,

  explanation: `**Vitreoretinal tuft**: Elevated glial hyperplasia + vitreous/zonular traction.

**(B):** Enclosed ora bay is surrounded by a dentate process.`,
},

{
  id: "retina_16_4",

  topic: "Anatomy",

  question:
    "In which retinal quadrant are meridional folds most commonly located?",

  options: [
    "Superotemporal",
    "Superonasal",
    "Inferotemporal",
    "Inferonasal",
  ],

  correctAnswer: 1,

  explanation: `Meridional folds are usually located in the **superonasal** quadrant.

  ---

[BRAIN] **Peripheral cystoid degeneration** is usually located in the **inferotemporal** quadrant.
[BRAIN] **Dentate processes** are more prominent on the **nasal** side.`,
},


{
  id: "retina_16_5",

  topic: "Anatomy",

  question:
    "Which of the following statements is most accurate?",

  options: [
    "An ora bay is radially oriented, prominent retinal tissue.",
    "Most retinal tears occur posterior to the equator.",
    "Retinal tears may occur at the posterior end of a meridional fold.",
    "Retinal tears may occur at the anterior end of a dentate process.",
  ],

  correctAnswer: 2,

  explanation: `[SIREN] **Retinal tears may occur in three locations**:
1. Posterior to a meridional fold.
2. At the posterior margin of an enclosed ora bay.
3. At the site of peripheral retinal excavation.

**(A):** Meridional fold is correct.

**(B):** Anterior to the equator is correct.`,
},

{
  id: "retina_16_6",
  topic: "Anatomy",
  question:
    "What is the posterior extension of the pars plana epithelium into the retina from the ora serrata called?",
  options: [
    "Enclosed ora bay",
    "Meridional complex",
    "Dentate process",
    "Perifoveal retinal excavation",
  ],
  correctAnswer: 0,
  explanation: `**Ora bay:** A portion of the pars plana that extends into the retina.

**Enclosed ora bay:** An ora bay surrounded by a dentate process.

**Meridional fold:** Thickening of retinal tissue or retinal folds that extend radially into the pars plana.

**Meridional complex:** A meridional fold + its associated ciliary process.

**Dentate process:** A portion of the retina that extends into the pars plana.

**Perifoveal retinal excavation:** A type of lattice degeneration at the ora serrata or four disc diameters posterior to it, usually aligned with a meridional fold.`,
},

{
  id: "retina_16_7",
  topic: "Anatomy",
  question:
    "Which of the following definitions of a meridional fold is correct?",
  options: [
    "Triangular pigmentary changes in the peripheral retina measuring 1–2 disc diameters.",
    "An extension of the pars plana toward the retina.",
    "Radial thickening of the retina extending toward the pars plana.",
    "An area of the retina surrounded by dentate processes.",
  ],
  correctAnswer: 2,
  explanation: `**(B):** An **ora bay** is an extension of the pars plana toward the retina.

**(D):** An **enclosed ora bay** is an ora bay surrounded by a dentate process.`,
},

{
  id: "retina_16_8",
  topic: "Anatomy",
  question:
    "During a retinal examination of a 65-year-old man presenting for cataract evaluation, multiple well-demarcated yellowish-white lesions are observed in the inferior retina near the ora serrata, with RPE hypertrophy at their margins. Large choroidal vessels are visible through the lesions. Which of the following statements regarding these lesions is correct?",
  options: [
    "Histopathology reveals atrophy of the inner retinal layers.",
    "They are present in 22% of individuals older than 20 years.",
    "They are usually aligned with a meridional fold.",
    "They are a risk factor for RRD.",
  ],
  correctAnswer: 0,
  explanation: `The lesions are characteristic of **paving-stone (cobblestone) degeneration**.

**(A):** [WARNING] Atrophy of the **outer retina** is correct. 

**(D):** [WARNING] Paving-stone (cobblestone) degeneration is not associated with a significantly increased risk of RD.`,
},

{
  id: "retina_16_9",
  topic: "Anatomy",
  question:
    "A man presents for a routine eye examination. Fundus examination reveals a black, flat lesion measuring 5 mm in the nasal peripheral retina, with a less pigmented border and a central lacuna. What is the most likely pathological diagnosis?",
  options: [
    "Proliferation of melanocytic cells without dysplasia.",
    "Proliferation of melanocytic cells with dysplasia.",
    "Hyperplasia of the retinal pigment epithelium.",
    "Hypertrophy of the retinal pigment epithelium.",
  ],
  correctAnswer: 3,
  explanation: `**(D):** CHRPE is equivalent to RPE **hypertrophy**.`,
},

{
  id: "retina_16_10",
  topic: "Anatomy",
  question:
    "Which of the following statements regarding retinal breaks is correct?",
  options: [
    "A retinal break is a full-thickness defect in the neurosensory retina.",
    "Some retinal breaks occur due to atrophy of the inner retinal layers.",
    "Traumatic retinal dialysis usually occurs at the vitreous base's anterior margin.",
    "Hemorrhagic PVD is associated with a retinal break in 15% of cases.",
  ],
  correctAnswer: 1,
  explanation: `[WARNING] A retinal break should not be confused with a retinal tear. A retinal tear is a type of retinal break caused by vitreoretinal traction.

**(A):** **Retinal break** is a **full-thickness** defect in the neurosensory retina.

**(B):** **Retinal holes** occur due to atrophy of the **inner retinal layers**.

**(C):** **Retinal dialysis** occurs predominantly at the **posterior margin of the vitreous base**, although it may rarely occur at the anterior margin.

**(D):** **Hemorrhagic PVD** is associated with a retinal break in **50–70%** of cases.`,
},


    ];