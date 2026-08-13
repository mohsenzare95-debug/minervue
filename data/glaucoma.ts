//data\glaucoma.ts
import type { Card } from "@/shared/types/card";

export const glaucomaCards: Card[] = [
  /// Chapt. 1 ///
  /// Question 1 ///
  {
    id: "glaucoma_1",
    topic: "Intro",
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
    topic: "Intro",
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
    topic: "Intro",
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
    topic: "Intro",
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
    topic: "Intro",
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
    topic: "Intro",
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
    topic: "Intro",
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
    topic: "Intro",
    q: `What are the gene locus, gene mutation, and inheritance pattern of aniridia?`,
    a: `
**Locus:** 11p13

**Gene:** PAX6

**Inheritance:** Autosomal dominant (AD)

---

[WARNING] *Sporadic aniridia (1/3 of cases) is associated with WT1 deletion (**Wilms tumor** risk).*
`,
  },

  {
    id: "glaucoma_9",
    topic: "Intro",
    q: `What is the common mutation in pseudoexfoliation (PXF), what is its function, and how frequently is it found in normal individuals?`,
    a: `
LOXL1 *(Elastin mutation)*

---

[SIREN] **PXF:** 99%, **Control:** 80%
`,
  },

  {
    id: "glaucoma_10",
    topic: "Intro",
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
    topic: "Dynamics",
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
    topic: "Dynamics",
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
    topic: "Dynamics",
    q: `How do the levels of H⁺, Cl⁻, ascorbate, HCO₃⁻, and protein in aqueous humor compare with plasma?`,
    a: `
**Higher than plasma:** H⁺, Cl⁻, ascorbate

**Lower than plasma:** HCO₃⁻, Protein (*Almost protein-free*)
`,
  },

  /// Question 14 ///

  {
    id: "glaucoma_14",
    topic: "Dynamics",
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
    topic: "Dynamics",
    q: `Name the three main mechanisms that reduce aqueous humor production.`,
    a: `
**Carbonic anhydrase inhibitors:** ↓ HCO₃⁻ and H⁺ providing

**β₂-receptor blockers:** ↓ Na⁺/K⁺-ATPase activity ([BRAIN] *Also c-AMP inhibition + ↓ Outflow Facility have been mentioned.*)

**α₂-receptor agonists:** ↓ cAMP → ↓ ciliary body blood flow
`,
  },

   /// Question 16 ///

  {
    id: "glaucoma_16",
    topic: "Dynamics",
    q: `Compare the trabecular meshwork vs Schlemm's canal in terms of 

1. endothelial and basement membrane continuity

2. active/inactive transport

3. and changes secondary to increased IOP.`,
    a: `

`,
answerImage: "/images/glaucoma/16.png",
  },

  /// Question 74 ///
  {
    id: "glaucoma_74",
    topic: "Dynamics",
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
    topic: "Dynamics",
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
    topic: "Dynamics",
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
    topic: "Dynamics",
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
    topic: "Dynamics",
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
    topic: "Dynamics",
    q: `Describe the technique, advantage, and disadvantage of the Tono-Pen (Mackay–Marg type).`,
    a: `

`,
answerImage: "/images/glaucoma/21.png",
  },

  /// Question 22 ///
  {
    id: "glaucoma_22",
    topic: "Dynamics",
    q: `Describe the technique, advantage, and disadvantage of the Pneumatonometer.`,
    a: `

`,
answerImage: "/images/glaucoma/22.png",
  },

  /// Question 23 ///
  {
    id: "glaucoma_23",
    topic: "Dynamics",
    q: `Describe the technique, advantage, and disadvantage of the Ocular Response Analyzer (ORA, Airpuff).`,
    a: `
`,
answerImage: "/images/glaucoma/23.png",
  },


   /// Question 42 ///
  {
    id: "glaucoma_42",
    topic: "Dynamics",
    q: `Describe the technique, advantage, and disadvantage of the Rebound Tonometer.`,
    a: `
`,
answerImage: "/images/glaucoma/25.png",
  },

  /// Question 24 ///
  {
    id: "glaucoma_24",
    topic: "Dynamics",
    q: `Describe the technique and advantage of the Dynamic Contour Tonometry.`,
    a: `

`,
answerImage: "/images/glaucoma/24.png",
  },

  /// Question 25 ///
  {
    id: "glaucoma_25",
    topic: "Dynamics",
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
    topic: "Evaluation",
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
    topic: "Evaluation",
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
    topic: "Evaluation",
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
    topic: "Evaluation",
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
    topic: "Evaluation",
    q: `What are the specific characteristics of angle vessels in Fuchs uveitis?`,
    a: `
* Thin + Branching + Unsheathed + Meandering (tortuous)

* Crosses the TM

* Usually no PAS

* Rarely progressive ([WARNING]may progress!)

* Spontaneous hyphema is possible
`,
  },

  /// Question 31 ///
  {
    id: "glaucoma_31",
    topic: "Evaluation",
    q: `Gonioscopic appearance of post-traumatic angle recession?`,
    a: `

[DOT]Wide ciliary body band

[DOT]White glistening of the scleral spur

[DOT]Torn iris processes

[DOT]Marked variation in ciliary face width and angle between different quadrants

[DOT]PAS at the border of recession`,
  },

  /// Question 32 ///
  {
    id: "glaucoma_32",
    topic: "Evaluation",
    q: `Name and describe the types of anterior chamber injuries following blunt trauma.`,
    a: `
1. **Angle Recession:** a tear between the longitudinal and circular muscles of the CB.

2. **Cyclodialysis:** separation of the CB from the SS + widening of the suprachoroidal space and a deepened angle recess.

3. **Iridodialysis:** a tear at the iris root.

4. **TM Damage:** a tear in the anterior portion of the TM → creating a flap hinged at the scleral spur.


---
**CB:** Ciliary body, **SS:** Scleral spur
`,
  },

  /// Question 33 ///
  {
    id: "glaucoma_33",
    topic: "Evaluation",
    q: `How is Ocular Perfusion Pressure (OPP) calculated?`,
    a: `
**OPP = DBP + 1/3 SBP − IOP**

---

**DBP:** Diastolic Blood Pressure, **SBP:** Systolic Blood Pressure, **IOP:** Intraocular Pressure
`,
  },

  /// Question 34 ///
  {
    id: "glaucoma_34",
    topic: "Evaluation",
    q: `Name two inappropriate treatments in patients with NTG (Normal-Tension Glaucoma)`,
    a: `
[DOT]Topical β-blockers

[DOT]ALT *(Argon Laser Trabeculoplasty)*

---
[SIREN]Particularly when IOP ≤ 15 mmHg
`,
  },

  /// Chapter 7 ///
  /// Question 35 ///
  {
    id: "glaucoma_35",
    topic: "POAG",
    q: `Name five risk factors in the OHTS study associated with an increased risk of progression from ocular hypertension to POAG.`,
    a: `




* **Age:** ↑ 22% per 10-year increase

* **CDR:** Vertical: ↑ 32% per 0.1; Horizontal: ↑ 27% per 0.1

* **Baseline IOP:** ↑ 10% per 1 mmHg

* **VF PSD:** ↑ 22% per 0.2 dB

* **CCT:** ↑ 81% per 40 μm

---

[SIREN]**Notice:** In the OHTS study, no association was found between OAG and DM or myopia, contrary to similar studies →[BRAIN]*possibly due to the exclusion of patients with diabetic retinopathy.*



**VF PSD:** Visual Field Pattern Standard Deviation
`,
  },

  /// Chapter 8 ///
  /// Question 36 ///
  {
    id: "glaucoma_36",
    topic: "SOAG",
    q: `What is the risk of progression to glaucoma or ocular hypertension in the following conditions:


PXF, PDS, Fuchs Uveitis, Hyphema Rebleeding, Angle Recession, ICE, Axenfeld-Rieger, Peters Anomaly, SWS?`,
    a: `
* **PXF:** 40% *(in 10 years)*

* **PDS:** 15%

* **Fuchs Uveitis:** 15%

* **Hyphema Rebleeding:** 50%, **ICE:** 50%, **Axenfeld-Rieger:** 50%, **Peters Anomaly:** 50%

* **Angle Recession:** 50% *(including the contralateral eye)* →[SIREN]decreases with time

* **SWS:** 70%
    
    

---
**PXF:** Pseudoexfoliation, **PDS:** Pigment Dispersion Syndrome, **ICE:** Iridocorneal Endothelial Syndrome, **SWS:** Sturge-Weber Syndrome
`,
  },

  /// Question 37 ///
  {
    id: "glaucoma_37",
    topic: "SOAG",
    q: `What is the general treatment approach for patients with Pigment Dispersion Glaucoma?`,
    a: `
* During exercise, **miotics** have a prophylactic effect.

* **Medical treatment**, **LTP**, and **Trabx** are all effective, *but with certain considerations.*

[WARNING]**Note:** The efficacy of LPI has not been established.

---

[SIREN]**LTP:** Short-lived effect; paradoxical ↑ IOP → [WARNING]low-energy settings

[SIREN]**Trabx:** Successful, but with a higher risk of hypotonic maculopathy → especially in young myopic men.

---

**LTP:** Laser Trabeculoplasty, **LPI:** Laser Peripheral Iridotomy, **Trabx:** Trabeculectomy
    `,
  },

  /// Question 38 ///
  {
    id: "glaucoma_38",
    topic: "SOAG",
    q: `What are the distinguishing features of phacolytic and phacoantigenic glaucoma?
`,
    a: `
* **Phacolytic:** Occurs in the setting of a mature/ hypermature cataract + without KPs.

* **Phacoantigenic:** Occurs following surgery/ trauma + with KPs.`,
  },

  /// Question 39 ///
  {
    id: "glaucoma_39",
    topic: "SOAG",
    q: `By what mechanisms can intraocular tumors cause glaucoma? Give examples.
`,
    a: `
* **Secondary Angle-Closure Glaucoma (Pushing):** Choroidal and retinal tumors

* **Neovascularization of the angle:** Choroidal melanoma, RB, Medulloepithelioma

* **Direct invasion of the angle:** Primary or Metastatic CB Tumors → Uveal Melanoma, Melanocytoma

---

**RB**: Retinoblastoma, **CB**: Ciliary Body
    `,
  },

  /// Question 40 ///
  {
    id: "glaucoma_40",
    topic: "SOAG",
    q: `Name the tumors that can cause glaucoma according to age group (adults vs. children).
`,
    a: `
**Adults:** Uveal melanoma, melanocytoma, metastatic carcinoma, lymphoma, leukemia



**Children:** RB, JXG, medulloepithelioma

---

**RB:** Retinoblastoma, **JXG:** Juvenile Xanthogranuloma
`,
  },

  /// Question 41 ///
  {
    id: "glaucoma_41",
    topic: "SOAG",
    q: `**Yes or No!**



Is there a relationship between the degree of inflammation and IOP in Fuchs Uveitis Syndrome?
`,
    a: `
**No!**

---

[WARNING]**Notice:** Corticosteroids are generally ineffective in controlling the chronic low-grade inflammation and may only lead to a rise in IOP.`,
  },

  /// Question 43 ///
  {
    id: "glaucoma_43",
    topic: "SOAG",
    q: `Describe the treatment options for Posner-Schlossman syndrome.`,
    a: `
* Topical ± Oral Hypotensive



* **Short-term** topical corticosteroid ± topical ± oral NSAIDs: *Indomethacin*



* Filtering Surgery → [SIREN]*In frequent attacks or advanced optic nerve damage*`,
  },

   /// Question 44 ///
  {
    id: "glaucoma_44",
    topic: "SOAG",
    q: `**Name three contraindicated treatment options in patients with sickle cell anemia (SCA) + Hyphema.**`,
    a: `
* Carbonic Anhydrase Inhibitors [WARNING]

* Hyperosmotic Agents

* Adrenergic Agonists with significant α1 effect → Apraclonidine, Epinephrine, Dipivefrine → [BRAIN]*Due to vasoconstriction*`,
  },

   /// Question 45 ///
  {
    id: "glaucoma_45",
    topic: "SOAG",
    q: `**Name two prognostic factors for the development of secondary open-angle glaucoma (SOAG) following angle recession.**
`,
    a: `




* ↑ Angle recession extension → ↑ Risk of SOAG

* Passage of time → ↓ Risk of SOAG *(never reaches zero!)*`,
  },

   /// Question 46 ///
  {
    id: "glaucoma_46",
    topic: "SOAG",
    q: `**Name six risk factors for corticosteroid-induced glaucoma.**
`,
    a: `
* History of POAG

* First-degree family history of POAG

* Age < 6 Y/O

* Connective Tissue Disorder

* Diabetes ([WARNING]Type 1)

* Myopia`,
  },

   /// Question 47 ///
  {
    id: "glaucoma_47",
    topic: "SOAG",
    q: `**Name four risk factors for cycloplegic-induced IOP elevation.**
`,
    a: `
* POAG

* Receiving Miotic Treatment

* PXF 

* PDS (Pigment Dispersion Syndrome)`,
  },
  

  /// Chapter 9 /// 
  /// Question 48 ///
  {
    id: "glaucoma_48",
    topic: "PACG",
    q: `What are the indications for performing laser PI in PACS?`,
    a: `
* Presence of PAS → *equals PAC*

* Segmental Pigmentation of the TM → *documentation of iridotrabecular contact*

* History of AAC

* Positive Family History

* AC Depth < 2 mm

---

**AAC**: Acute Angle Closure

[BRAIN]Reminder: **ACD < 2.5 mm**: PAC Predisposition, **ACD < 2.1 mm**: More usual in PAC, **ACD < 2.4 mm**: Strong Association with PAS
`,
  },

   /// Question 49 ///

  {

    id: "glaucoma_49",
    topic: "PACG",
    q: `What is the role of miotics in AAC, and at what dose can they be used?`,

    a: `

In cases of **Pupillary Block**, Pilocarpine **1–2%** may be effective. 





[WARNING]Without Pupillary Block, it may worsen the condition: [BRAIN] *shifting the iris–lens diaphragm anteriorly → worsening Angle Closure*

`,

  },

  /// Question 50 ///
  {
    id: "glaucoma_50",
    topic: "PACG",
    q: `How does the pattern of PAS differ between Plateau Iris and Pupillary Block?`,
    a: `
The direction of PAS is opposite in the two conditions.

**Plateau Iris**: Schwalbe Line → Angle Recession *(Anterior to Posterior)*

**Pupillary Block**: Angle Recession → Schwalbe Line *(Posterior to Anterior)*
`,
  },

   /// Question 51 ///
  {
    id: "glaucoma_51",
    topic: "PACG",
    q: `What treatment options are available for Plateau Iris Syndrome?`,
    a: `
* LPI

* ECP + Lensectomy

* Long-term Miotic Therapy

* Laser Iridoplasty

---

**LPI**: Laser PI, **ECP**: Endoscopic Cyclophotocoagulation
`,
  },

  /// Chapter 11 ///
   /// Question 52 ///

  {

    id: "glaucoma_52",
    topic: "Pediatric",
    q: `What are the normal cutoff values for horizontal corneal diameter according to age, including both the upper and lower limits?`,

    a: `

**Upper Limit**: 

* 11 mm in newborns 

* 12 mm in < 1 Y/O 

* 13 mm at any age 

---

**Lower Limit**: 

* 9.5–10.5 mm in newborns 

* 12 mm in adults 

`,

  },

   /// Question 53 ///
  {
    id: "glaucoma_53",
    topic: "Pediatric",
    q: `According to the definition, in which age groups do late-onset congenital glaucoma and juvenile open-angle glaucoma (JOAG) occur?`,
    a: `
**Late-Onset Congenital Glaucoma**: ≥ 24 M/O

---

**JOAG**: 4–40 Y/O
`,
  },

   /// Question 54 ///
  {
    id: "glaucoma_54",
    topic: "Pediatric",
    q: `Name three risk factors for blindness in patients with Primary Congenital Glaucoma (PCG).`,
    a: `
* Newborn PCG

* Diagnosis after 1 Y/O

* Corneal Diameter > 14 mm at diagnosis

---


[SIREN]The **best prognostic age** at diagnosis is between **3–12 months**.
`,
  },

   /// Question 55 ///

  {

    id: "glaucoma_55",
    topic: "Pediatric",
    q: `What gonioscopic finding is associated with glaucoma progression in patients with Axenfeld-Rieger Syndrome?`,

    a: `

* Higher **iris insertion height** 

[WARNING] It is not associated with the number of **iris processes** or the severity of **iris abnormalities**. 

`,

  },

   /// Question 56 ///
  {
    id: "glaucoma_56",
    topic: "Pediatric",
    q: `In which subgroup of patients with Peters Anomaly is glaucoma more common?`,
    a: `
Corneolenticular Adhesion > Iridocorneal
`,
  },

   /// Question 57 ///
  {
    id: "glaucoma_57",
    topic: "Pediatric",
    q: `What is the ocular and systemic significance of the Peters Anomaly subtype?`,
    a: `
The **Corneolenticular type** is more commonly associated with ocular and systemic abnormalities.

---

* **Ocular Associations**: Microcornea, Aniridia

* **Systemic Abnormalities**: Cardiac, Genitourinary, Musculoskeletal, Ear, Palatal, and Spinal Abnormalities
`,
  },

   /// Question 58 ///

  {

    id: "glaucoma_58",
    topic: "Pediatric",
    q: `What is the association between Neurofibromatosis and Glaucoma?`,

    a: `

**NF1**: Associated with glaucoma → 50% of cases are Autosomal Dominant, while 50% are Sporadic.

**NF2**: Not associated with glaucoma. 

---

[BRAIN] **Note**: NF1-associated glaucoma is generally **unilateral** and occurs in association with a **neurofibroma**. 

`,

  },

   /// Question 59 ///

  {

    id: "glaucoma_59",
    topic: "Pediatric",
    q: `Name the risk factors for Glaucoma Following Cataract Surgery (GFCS) in patients with congenital cataract.`,

    a: `

* Surgery during the first year of life *(especially within the first 6 weeks)*

* Postoperative Complications

* Small Corneal Diameter

* NS Cataract

---

[WARNING] **Note**: Aphakia or Pseudophakia does not alter the risk of developing GFCS. 

[SIREN] Overall, the risk of Glaucoma is approximately ≤ 50% in patients with Congenital Cataract. 

`,

  },

  /// Chapter 12 /// 
  /// Question 60 ///
  {
    id: "glaucoma_60",
    topic: "Medications",
    q: `Define Mild, Moderate, and Severe Glaucoma and state the target IOP for each. Also, state the target IOP for OHTN.`,
    a: `
**Mild Glaucoma**: Disc Damage + Normal VF

**Moderate Glaucoma**: VF Scotoma in 1 Hemi-Field, Outside the Central Area

**Severe Glaucoma**: VF Scotomas in 2 Hemi-Fields ± Central 10°

---
Target IOP:

**OHTN**: < 25 mmHg + 20% Below Baseline

**Mild**: < 21 mmHg + 25% Below Baseline

**Moderate**: < 18 mmHg + 30% Below Baseline

**Severe**: < 15 mmHg + 30% Below Baseline
`,
  },

   /// Question 61 ///

  {

    id: "glaucoma_61",
    topic: "Medications",
    q: `What is the mechanism of IOP lowering by PG Agonists?`,

    a: `

**F2α Binding** → MMP Activation → Remodelling of the CB, TM, and Scleral Extracellular Matrix 

**↑ Space Between CB Muscle Fibers**

---

**Final Result**: ↑ Uveoscleral + Conventional Outflow 

[SIREN] *PG Analogues are activated by Corneal Esterases.*
`,
  },

   /// Question 62 ///
  {
    id: "glaucoma_62",
    topic: "Medications",
    q: `Describe the pigmentation-related adverse effects associated with PG Analogues.`,
    a: `
**Skin Darkening (Irreversible)**: *Hazel > Green >>> Blue Irides*

**Hyperemia, Hypertrichosis, Trichiasis, and Distichiasis (Reversible)** → [SIREN] *More Common with **Bimatoprost** and **Travoprost***
`,
  },

   /// Question 63 ///
  {
    id: "glaucoma_63",
    topic: "Medications",
    q: `Name two antiglaucoma medications that may be associated with Uveitis and state the type of Uveitis associated with each.`,
    a: `
**PG Analogues** → Nongranulomatous Anterior Uveitis (1%)

**Brimonidine** → Granulomatous Anterior Uveitis (Rare)
`,
  },

   /// Question 64 ///
  {
    id: "glaucoma_64",
    topic: "Medications",
    q: `Which patients are at higher risk of developing CME following the use of PG Analogues?`,
    a: `
* Aphakia

* Pseudophakia + Open Posterior Capsule

* Uveitis
`,
  },

   /// Question 65 ///

  {

    id: "glaucoma_65",
    topic: "Medications",
    q: `What is the mechanism of IOP lowering by α2 Agonists?`,

    a: `

↓ Aqueous Humor Production

[SIREN] **Long-term Brimonidine** Use is also associated with **↑Uveoscleral Outflow**.
`,
  },

   /// Question 66 ///
  {
    id: "glaucoma_66",
    topic: "Medications",
    q: `What are the pregnancy categories of four major antiglaucoma medication classes: Prostaglandin Analogues, β-Blockers, α2 Agonists, and Carbonic Anhydrase Inhibitors?`,
    a: `
* **PG Analogues** → Category C

* **β-Blockers** → Category C ([WARNING]*×Breastfeeding×*)

* **α2 Agonists** → Category B ([WARNING]*×Breastfeeding×*) → [SIREN] *The drug of choice during pregnancy, but should be discontinued before delivery.*

* **CAI** → Category C *(Forelimb Deformity)*

---

**CAI**: Carbonic Anhydrase Inhibitors
`,
  },

   /// Question 67 ///
  {
    id: "glaucoma_67",
    topic: "Medications",
    q: `What are the washout periods for PG Analogues, β-Blockers, α2 Agonists, Pilocarpine, and Dorzolamide?`,
    a: `
* **PG Analogues**: 4–6 weeks

* **β-Blockers**: 4 weeks

* **α2 Agonists**: 1–2 weeks

* **Pilocarpine** & **Dorzolamide**: 48 hours
`,
  },

   /// Question 68 ///
  {
    id: "glaucoma_68",
    topic: "Medications",
    q: `What effects do Apraclonidine and Brimonidine have on pupil dilation?`,
    a: `
* **Apraclonidine** → Mydriasis

* **Brimonidine** → Miosis
`,
  },
   
   /// Question 69 ///

  {

    id: "glaucoma_69",
    topic: "Medications",
    q: `Which of Apraclonidine and Brimonidine is more commonly associated with allergic reactions?`,

    a: `

Apraclonidine > Brimonidine

[WARNING]*However, **Cross-Reactivity** between the two is **rare***.
`,

  },

  /// Chapter 13 ///
   /// Question 70 ///
  {
    id: "glaucoma_70",
    topic: "Surgeries",
    q: `In which cases of Glaucoma is LTP indicated?`,
    a: `
* PXF

* PDS

* Advanced Age

* POAG

[WARNING] **Notice**: *LTP is only performed in OAG or OHTN.*

---

**LTP**: Laser Trabeculoplasty, **PDS**: Pigment Dispersion Syndrome, **OHTN**: Ocular Hypertension
`,
  },

  /// Question 71 ///
  {
    id: "glaucoma_71",
    topic: "Surgeries",
    q: `What are the contraindications to LTP?`,
    a: `
* CAG

* Advanced Glaucoma or Highly Elevated IOP

* Anterior Uveitis

* Abnormal Angle: *Angle Recess*

---
**CAG**: Closed Angle Glaucoma
`,
  },

   /// Question 72 ///

  {

    id: "glaucoma_72",
    topic: "Surgeries",
    q: `Name the risk factors for Bleb-Related Infections.`,

    a: `

* Untreated Blepharitis 

* Inferior Bleb 

* Bleb Leakage  

* Thin-Walled Blebs → *More Common in Localized Blebs* 

* MMC / 5-FU Application 

* Fornix-Based Trabx [SIREN]
`,
  },

/// Question 73 ///
  {
    id: "glaucoma_73",
    topic: "Surgeries",
    q: `What are the stages of Bleb-Related Infection (Blebitis), and how is each stage treated?`,
    a: `
**Stage I**: Erythema / Infiltration Around the Bleb

**Stage II**: AC Inflammation

**Stage III**: Hypopyon ± Vitritis

---

Treatment:

**Stage I, Stage II**: Topical Fluoroquinolone or Fortified Drops ± Subconjunctival Antibiotics

**Stage III**: Vitreous Tap + AB Injection / Vitrectomy
`,
  },


 
];