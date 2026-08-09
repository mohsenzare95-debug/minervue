// data/notes/retina.ts

import type { Note } from "@/shared/types/note";

export const retinaNote: Note = {
  key: "retina",
  title: "Retina",

  pages: [
    {
      id: "retina-1",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Overview",
      text:
        `*Two broad categories of inherited disorders are typically introduced at the beginning of this topic:*
        
**1.Color Vision Defects**: affects the cone photoreceptors:
* S (short-wave) cones
* M (medium-wavelength) cones
* L (long-wavelength) cones

Depending on which cone type is affected, different portions of the color spectrum may be impaired.
        
---

**2.Congenital stationary night blindness (CSNB)**: causing nyctalopia, affects the rod photoreceptors.`,
    },

    {
      id: "retina-2",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Color Vision Defects",
      text:
        `### Inherited vs. Acquired

**Congenital disorders (X-linked inheritance):**
Male > female — predominantly red–green color abnormalities.


**Acquired disorders:**
Male = female — predominantly blue–yellow color abnormalities.

---
[DUMBBELL]**Code:** The most common form of inherited color blindness is often recognized behind the trafic-light: difficulty distinguishing **red and green**.
`,
    },

     // =========================
    // FILL IN THE BLANK
    // =========================
    {
      id: "retina-3",
      type: "fillBlank",
      subtitle: "Inherited Disorders",
      label: "Color Vision Defects",
      text: `______ is the most common color vision abnormality in acquired color vision defects.`,
      answer: `Blue–yellow color abnormalities`,
    },


    {
      id: "retina-4",
      type: "note",
      subtitle: "Inherited Disorders",
      label: "Achromatopsia",
      text:
        `**Achromatopsia** (monochromatism) is the most severe form of color vision defect, in which color discrimination is reduced to comparisons based essentially on **intensity**.

---
[SIREN]There are wo major types with a similar clinical picture:
**Achromatopsia** + **congenital nystagmus** + **↓VA** + **photophobia**

* **Rod Monochromatism**: VA: 20/80–20/200
* **Blue-Cone (S-Cone) Monochromatism**: VA > 20/80

---

[WARNING]Differential diagnoses: 
* Infantile Nystagmus Syndrome (INS)
* Ocular Albinism

→ *Both have a **normal Cone-ERG**, unlike the two forms of achromatopsia described above*.
`,
    },

    {
      id: "retina-5",
      type: "mcq",
      subtitle: "Inherited Disorders",
      label: "Achromatopsia",
      question:
    "A 14-year-old boy is referred with nystagmus and reduced vision since childhood. His visual acuity is 20/60 in both eyes. ERG shows normal scotopic responses, while the photopic flicker response is markedly reduced. His mother has the same condition. Which of the following is the most likely diagnosis?",
  options: [
    "Rod monochromatism",
    "S-cone monochromatism",
    "Congenital motor nystagmus syndrome",
    "Ocular albinism",
  ],
  correctAnswer: 2,
  explanation:
    "Congenital motor nystagmus syndrome & ocular albinism typically have a normal cone ERG. Visual acuity is generally >20/80 in S-cone monochromatism, compared with 20/80–20/200 in rod monochromatism.",
},

    

    

  ],
};