import type { Question } from "@/shared/types/question";

export const traumaQuestions: Question[] = [

    {
  id: "retina_18_1",
  topic: "Trauma",
  question:
    "A 6-year-old boy is brought to the emergency department with a history of blunt trauma to the right eye the previous day. Visual acuity is counting fingers at 3 meters, and the retina appears white in the macular region. Which of the following findings is NOT observed?",
  options: [
    "Disruption of the inner segments of photoreceptors",
    "Extracellular edema",
    "Glial cell swelling",
    "Cherry-red spot",
  ],
  correctAnswer: 0,
  explanation:
    `The clinical presentation is consistent with **commotio retinae** is characterized by retinal whitening. The primary structural changes involve disruption of the **outer retina**, particularly the photoreceptor outer segments and RPEs. **(D)** When the **fovea** is involved, a **cherry-red spot** may be observed. 
    ___
    ***(B)**, **(C)**: Previous editions of the textbook describe commotio retinae as being associated with **extracellular edema** and **glial swelling***`,
},


{
  id: "retina_18_2",
  topic: "Trauma",
  question:
    "A patient presents after being struck in the eye by a ball. Visual acuity is 20/40, and fundus examination reveals sheen-like retinal whitening with a cherry-red spot. Which of the following findings is incorrect?",
  options: [
    "Extracellular edema",
    "Glial swelling",
    "Photoreceptor outer segment disruption",
    "INL infarction",
  ],
  correctAnswer: 3,
  explanation:
    `Commotio retinae is characterized by disruption of the **outer retina**.

***(A), (B):** Previous editions of the textbook describe commotio retinae as being associated with **extracellular edema** and **glial swelling**.*`,
},


{
  id: "retina_18_3",
  topic: "Trauma",
  question:
    "A 15-year-old boy presents to the emergency department after being struck in the right eye by a tennis ball. Visual acuity in the right eye is 20/100, and the anterior segment examination is normal. Fundus examination reveals a 2-DD subretinal hemorrhage in the macular region and two linear, whitish-yellow lesions concentric with the optic disc in the choroidal layer, one of which extends temporal to the fovea. Which of the following is the most appropriate recommendation?",
  options: [
    "The hemorrhage will resolve spontaneously, and no follow-up is required.",
    "Intravitreal tPA injection with simultaneous SF6 gas injection and prone positioning is recommended.",
    "Monitoring with an Amsler grid is recommended.",
    "Photocoagulation of the macular region is recommended.",
  ],
  correctAnswer: 2,
  explanation:
    `**Choroidal rupture** occurs secondary to a break in Bruch's membrane, the RPE, and the surrounding choriocapillaris tissue. One associated complication is **CNV**, which requires careful follow-up. If CNV develops, treatment with **anti-VEGF** agents is indicated.`,
},


{
  id: "retina_18_4",
  topic: "Trauma",
  question:
    "A 24-year-old man presents with decreased vision following trauma to the eye, head, and chest sustained in a motor vehicle accident. He reports sudden visual loss immediately after the trauma. Which of the following statements is incorrect?",
  options: [
    "In Berlin edema, a macular hole may develop immediately.",
    "Initial visual acuity is the most important predictor of injury severity.",
    "In choroidal rupture, due to the high elasticity of Bruch's membrane, the rupture occurs only in the RPE.",
    "Following blunt chest trauma, cotton-wool spots, Purtscher flecken, and hemorrhages around the optic nerve head are more common.",
  ],
  correctAnswer: 2,
  explanation:
    `**(A):** A traumatic macular hole may develop **immediately** following commotio retinae.

**(B):** **Initial visual acuity** is the most important prognostic factor in ocular trauma.

**(C):** Bruch's membrane has **low elasticity**, making it susceptible to rupture.

**(D):** This is a correct description of **Purtscher retinopathy**.`,
},


{
  id: "retina_18_5",
  topic: "Trauma",
  question:
    "A macular hole secondary to lightning or electrical injury may be associated with all of the following findings EXCEPT:",
  options: [
    "Cataract",
    "Acute peripapillary whitening",
    "Macular hole",
    "Sub-RPE hemorrhage at the fovea",
  ],
  correctAnswer: 3,
  explanation:
    `**Lightning and electrical injuries** may cause a **macular hole**, **cataract**, and **acute peripapillary whitening**. Sub-RPE hemorrhage at the fovea is not a characteristic finding of these injuries.`,
},


{
  id: "retina_18_6",
  topic: "Trauma",
  question:
    "Which of the following complications is least commonly observed in retinitis sclopetaria?",
  options: [
    "Severe visual loss",
    "Extensive subretinal hemorrhage",
    "Secondary retinal detachment",
    "Retinal necrosis and rupture",
  ],
  correctAnswer: 2,
  explanation:
    `**Retinitis sclopetaria** occurs secondary to high-velocity projectile injuries. It is a chorioretinal disruption characterized by rupture of the retina and choroid, with extensive subretinal, intraretinal, and vitreous hemorrhage. **Retinal detachment (RD) is rare**.`,
},



{
  id: "retina_18_7",
  topic: "Trauma",
  question:
    "A patient presents with a history of penetrating trauma to the right eye. Visual acuity in the injured eye is 20/22, and fundus examination reveals a small iron intraocular foreign body (IOFB) embedded in the retina superotemporal to the optic nerve, approximately one disc diameter away from the disc. Localized siderosis is observed around the foreign body. Which of the following is the most appropriate approach?",
  options: [
    "Vitrectomy with IOFB removal",
    "Follow-up with VEP and EOG",
    "Vitrectomy if the ERG a-wave amplitude increases",
    "Vitrectomy if the ERG b-wave amplitude decreases",
  ],
  correctAnswer: 3,
  explanation:
    `Due to the location of the IOFB, surgery carries a high risk.

In **ocular siderosis**, ERG changes progress as follows:

- **Early stages:** Increased a-wave amplitude with a normal b-wave.
- **Later stages:** Decreased b-wave amplitude.
- **End stages:** An extinguished (silent) ERG.

In high-risk cases, surgery is generally performed when the ERG becomes **electronegative**, indicating a reduction in the b-wave amplitude.

[WARNING]**Note:** RPE cells and photoreceptors are particularly susceptible to injury in ocular siderosis.`,
},

{
  id: "retina_18_8",
  topic: "Trauma",
  question: "A 50-year-old man presents one day after cataract surgery, which was prolonged due to zonular damage, with mild visual loss and a paracentral scotoma in the operated eye. On examination, the cornea is clear and the anterior segment is normal. Fundoscopy reveals an oval, yellowish lesion with irregular margins in the perifoveal region. Which of the following statements is incorrect?",
  options: [
    "Vision usually improves over several months.",
    "The presence of a window defect on angiography helps confirm the diagnosis.",
    "The condition occurs less frequently when a blue-light filter is used.",
    "The primary site of injury is usually the photoreceptor inner segments."
  ],
  correctAnswer: 3,
  explanation: `The presentation is consistent with **phototoxic retinopathy** following prolonged cataract surgery. Phototoxic injury caused by ophthalmic instruments primarily affects the **photoreceptor outer segments** and the RPE. Visual function may improve over several months, and a window defect on fluorescein angiography may support the diagnosis. Blue-light filtering reduces the risk of phototoxic retinal injury.`
},

{
  id: "retina_18_9",
  topic: "Trauma",
  question: "A patient presents with decreased vision after viewing a solar eclipse. Which of the following statements is correct?",
  options: [
    "Solar retinopathy occurs more commonly in younger patients.",
    "The photoreceptor outer segments are more sensitive than the inner segments.",
    "Solar retinopathy is a simultaneous thermal and photochemical injury.",
    "Solar retinopathy has no effective treatment."
  ],
  correctAnswer: 2,
  explanation: `Solar retinopathy is a simultaneous **thermal** and **photochemical injury**. **(A)** Solar retinopathy occurs more commonly in **younger** patients. **(B)** The **outer** segments are more sensitive than the inner segments. **(D)** Solar retinopathy has no effective treatment.`
}



  ];