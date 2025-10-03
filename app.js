// Medical Study Tracker Application
class MedicalStudyTracker {
    constructor() {
        this.subjects = {};
        this.progress = {};
        this.currentSubject = null;
        this.searchResults = [];
        this.currentFilter = 'all';
        
        this.init();
    }

    async init() {
        await this.loadMedicalData();
        this.initializeProgress();
        this.setupEventListeners();
        this.renderSubjects();
        this.updateOverallProgress();
        this.selectSubject('Anatomy'); // Default selection
    }

    async loadMedicalData() {
        // Medical data structure
        this.subjects = {
            "Anatomy": {
                "categories": [
                    {
                        "name": "General Anatomy & Histology",
                        "topics": [
                            "Cell structure and function",
                            "Tissues - Epithelial, Connective, Muscular, Nervous",
                            "Body systems overview",
                            "Anatomical positions and terminology",
                            "Basic histology techniques",
                            "Microscopic structure of organs"
                        ]
                    },
                    {
                        "name": "Neuroanatomy",
                        "topics": [
                            "Central nervous system",
                            "Spinal cord structure and function",
                            "Brain stem anatomy",
                            "Cerebrum and cerebellum",
                            "Cranial nerves (I-XII)",
                            "Peripheral nervous system",
                            "Autonomic nervous system",
                            "Meninges and CSF",
                            "Blood supply of brain",
                            "Sensory and motor pathways"
                        ]
                    },
                    {
                        "name": "Head & Neck",
                        "topics": [
                            "Skull bones and sutures",
                            "Facial muscles and expressions",
                            "Temporomandibular joint",
                            "Teeth and oral cavity",
                            "Salivary glands",
                            "Pharynx and larynx",
                            "Thyroid and parathyroid glands",
                            "Neck triangles and fascial planes",
                            "Lymphatic drainage of head and neck"
                        ]
                    },
                    {
                        "name": "Thorax",
                        "topics": [
                            "Thoracic cage and respiratory muscles",
                            "Heart anatomy and chambers",
                            "Great vessels and circulation",
                            "Lungs and pleura",
                            "Mediastinum compartments",
                            "Esophagus anatomy",
                            "Diaphragm structure and function"
                        ]
                    },
                    {
                        "name": "Abdomen & Pelvis",
                        "topics": [
                            "Abdominal wall and inguinal canal",
                            "Peritoneum and peritoneal cavity",
                            "Stomach and duodenum",
                            "Small and large intestine",
                            "Liver, gallbladder, and biliary system",
                            "Pancreas anatomy",
                            "Spleen structure",
                            "Kidney and ureter",
                            "Pelvis bones and muscles",
                            "Male and female reproductive organs",
                            "Urinary bladder and urethra"
                        ]
                    },
                    {
                        "name": "Upper Limb",
                        "topics": [
                            "Shoulder joint and muscles",
                            "Arm bones and muscles",
                            "Elbow joint anatomy",
                            "Forearm compartments",
                            "Wrist and hand anatomy",
                            "Upper limb nerve supply",
                            "Blood supply of upper limb"
                        ]
                    },
                    {
                        "name": "Lower Limb",
                        "topics": [
                            "Hip joint and gluteal region",
                            "Thigh compartments and muscles",
                            "Knee joint anatomy",
                            "Leg compartments",
                            "Ankle and foot anatomy",
                            "Lower limb nerve supply",
                            "Blood supply of lower limb"
                        ]
                    },
                    {
                        "name": "Embryology",
                        "topics": [
                            "Gametogenesis and fertilization",
                            "Early embryonic development",
                            "Implantation and placentation",
                            "Gastrulation and neurulation",
                            "Cardiovascular system development",
                            "Respiratory system development",
                            "Digestive system development",
                            "Urogenital system development",
                            "Musculoskeletal system development",
                            "Congenital anomalies"
                        ]
                    }
                ]
            },
            "Physiology": {
                "categories": [
                    {
                        "name": "General Physiology",
                        "topics": [
                            "Cell membrane and transport",
                            "Membrane potential",
                            "Homeostasis",
                            "Body fluid compartments",
                            "pH regulation",
                            "Temperature regulation"
                        ]
                    },
                    {
                        "name": "Blood & Cardiovascular System",
                        "topics": [
                            "Blood composition and functions",
                            "Hemoglobin and oxygen transport",
                            "Blood groups and transfusion",
                            "Hemostasis and coagulation",
                            "Cardiac cycle and ECG",
                            "Heart sounds and murmurs",
                            "Blood pressure regulation",
                            "Coronary circulation",
                            "Peripheral circulation",
                            "Shock and heart failure"
                        ]
                    },
                    {
                        "name": "Respiratory System",
                        "topics": [
                            "Pulmonary ventilation",
                            "Lung volumes and capacities",
                            "Gas exchange and transport",
                            "Oxygen-hemoglobin dissociation curve",
                            "Control of respiration",
                            "Acid-base balance",
                            "Respiratory adjustments in disease"
                        ]
                    },
                    {
                        "name": "Renal Physiology",
                        "topics": [
                            "Nephron structure and function",
                            "Glomerular filtration",
                            "Tubular reabsorption and secretion",
                            "Urine concentration and dilution",
                            "Acid-base regulation by kidneys",
                            "Kidney function tests",
                            "Renal blood flow regulation"
                        ]
                    },
                    {
                        "name": "Gastrointestinal System",
                        "topics": [
                            "Digestion and absorption",
                            "Gastric secretion",
                            "Pancreatic and biliary secretions",
                            "Small intestinal motility",
                            "Large intestinal functions",
                            "Liver functions",
                            "GI hormones"
                        ]
                    },
                    {
                        "name": "Neurophysiology",
                        "topics": [
                            "Nerve conduction",
                            "Synaptic transmission",
                            "Reflexes",
                            "Motor control",
                            "Sensory systems",
                            "Pain and temperature",
                            "Sleep and consciousness",
                            "Learning and memory"
                        ]
                    },
                    {
                        "name": "Endocrine System",
                        "topics": [
                            "Hormone classification and mechanisms",
                            "Hypothalamic-pituitary axis",
                            "Thyroid function",
                            "Adrenal cortex and medulla",
                            "Pancreatic hormones and diabetes",
                            "Parathyroid and calcium metabolism",
                            "Reproductive hormones",
                            "Growth hormone"
                        ]
                    },
                    {
                        "name": "Special Senses",
                        "topics": [
                            "Vision and eye physiology",
                            "Hearing and equilibrium",
                            "Taste and smell",
                            "Vestibular system"
                        ]
                    }
                ]
            },
            "Biochemistry": {
                "categories": [
                    {
                        "name": "Biomolecules",
                        "topics": [
                            "Carbohydrates structure and function",
                            "Lipids and fatty acids",
                            "Proteins and amino acids",
                            "Nucleic acids and nucleotides",
                            "Vitamins and coenzymes",
                            "Minerals and trace elements"
                        ]
                    },
                    {
                        "name": "Enzymology",
                        "topics": [
                            "Enzyme kinetics",
                            "Enzyme regulation",
                            "Clinical enzymology",
                            "Enzyme inhibitors",
                            "Diagnostic enzymes"
                        ]
                    },
                    {
                        "name": "Metabolism",
                        "topics": [
                            "Glycolysis and gluconeogenesis",
                            "TCA cycle and oxidative phosphorylation",
                            "Fatty acid metabolism",
                            "Amino acid metabolism",
                            "Purine and pyrimidine metabolism",
                            "Integration of metabolism",
                            "Metabolic disorders"
                        ]
                    },
                    {
                        "name": "Molecular Biology",
                        "topics": [
                            "DNA structure and replication",
                            "RNA types and transcription",
                            "Protein synthesis",
                            "Gene regulation",
                            "Genetic mutations",
                            "Recombinant DNA technology"
                        ]
                    },
                    {
                        "name": "Clinical Biochemistry",
                        "topics": [
                            "Liver function tests",
                            "Kidney function tests",
                            "Cardiac biomarkers",
                            "Diabetes monitoring",
                            "Lipid profile",
                            "Tumor markers",
                            "Acid-base disorders"
                        ]
                    }
                ]
            },
            "Pathology": {
                "categories": [
                    {
                        "name": "General Pathology",
                        "topics": [
                            "Cell injury and death",
                            "Acute and chronic inflammation",
                            "Tissue repair and healing",
                            "Hemodynamic disorders",
                            "Thrombosis and embolism",
                            "Shock and DIC",
                            "Edema and effusions"
                        ]
                    },
                    {
                        "name": "Immunopathology",
                        "topics": [
                            "Hypersensitivity reactions",
                            "Autoimmune diseases",
                            "Immunodeficiency disorders",
                            "Transplant pathology",
                            "Tumor immunology"
                        ]
                    },
                    {
                        "name": "Neoplasia",
                        "topics": [
                            "Benign vs malignant tumors",
                            "Carcinogenesis",
                            "Tumor markers",
                            "Metastasis",
                            "Tumor staging and grading",
                            "Oncogenes and tumor suppressor genes"
                        ]
                    },
                    {
                        "name": "Hematology",
                        "topics": [
                            "Anemia classification",
                            "Leukemias and lymphomas",
                            "Bleeding disorders",
                            "Bone marrow pathology",
                            "Blood transfusion reactions"
                        ]
                    },
                    {
                        "name": "Systemic Pathology",
                        "topics": [
                            "Cardiovascular pathology",
                            "Respiratory pathology",
                            "Gastrointestinal pathology",
                            "Hepatobiliary pathology",
                            "Renal pathology",
                            "Endocrine pathology",
                            "Nervous system pathology",
                            "Musculoskeletal pathology",
                            "Skin pathology",
                            "Reproductive system pathology"
                        ]
                    }
                ]
            },
            "Microbiology": {
                "categories": [
                    {
                        "name": "General Microbiology",
                        "topics": [
                            "Bacterial morphology and structure",
                            "Bacterial growth and nutrition",
                            "Sterilization and disinfection",
                            "Antimicrobial agents",
                            "Host-parasite relationships",
                            "Normal flora"
                        ]
                    },
                    {
                        "name": "Bacteriology",
                        "topics": [
                            "Gram-positive cocci",
                            "Gram-negative cocci",
                            "Gram-positive bacilli",
                            "Gram-negative bacilli",
                            "Acid-fast bacilli",
                            "Anaerobic bacteria",
                            "Spirochetes",
                            "Mycoplasma and Chlamydia"
                        ]
                    },
                    {
                        "name": "Virology",
                        "topics": [
                            "Viral structure and replication",
                            "DNA viruses",
                            "RNA viruses",
                            "Hepatitis viruses",
                            "HIV and AIDS",
                            "Respiratory viruses",
                            "Enteric viruses",
                            "Oncogenic viruses"
                        ]
                    },
                    {
                        "name": "Mycology",
                        "topics": [
                            "Superficial mycoses",
                            "Cutaneous mycoses",
                            "Subcutaneous mycoses",
                            "Systemic mycoses",
                            "Opportunistic fungi"
                        ]
                    },
                    {
                        "name": "Parasitology",
                        "topics": [
                            "Intestinal protozoa",
                            "Blood and tissue protozoa",
                            "Helminths - nematodes",
                            "Helminths - cestodes",
                            "Helminths - trematodes",
                            "Arthropod vectors"
                        ]
                    },
                    {
                        "name": "Immunology",
                        "topics": [
                            "Innate immunity",
                            "Adaptive immunity",
                            "Antigen-antibody reactions",
                            "Complement system",
                            "Vaccines and vaccination",
                            "Diagnostic immunology"
                        ]
                    }
                ]
            },
            "Pharmacology": {
                "categories": [
                    {
                        "name": "General Pharmacology",
                        "topics": [
                            "Pharmacokinetics and pharmacodynamics",
                            "Drug metabolism",
                            "Adverse drug reactions",
                            "Drug interactions",
                            "Rational drug therapy",
                            "Clinical pharmacology"
                        ]
                    },
                    {
                        "name": "Autonomic Nervous System",
                        "topics": [
                            "Cholinergic drugs",
                            "Anticholinergic drugs",
                            "Adrenergic drugs",
                            "Antiadrenergic drugs",
                            "Neuromuscular blocking agents"
                        ]
                    },
                    {
                        "name": "Central Nervous System",
                        "topics": [
                            "General anesthetics",
                            "Local anesthetics",
                            "Sedatives and hypnotics",
                            "Antiepileptic drugs",
                            "Antiparkinsonian drugs",
                            "Antipsychotic drugs",
                            "Antidepressants",
                            "Anxiolytics",
                            "Opioid analgesics"
                        ]
                    },
                    {
                        "name": "Cardiovascular System",
                        "topics": [
                            "Antihypertensive drugs",
                            "Diuretics",
                            "Antianginal drugs",
                            "Antiarrhythmic drugs",
                            "Heart failure drugs",
                            "Anticoagulants and antiplatelets",
                            "Thrombolytics",
                            "Lipid-lowering drugs"
                        ]
                    },
                    {
                        "name": "Respiratory System",
                        "topics": [
                            "Bronchodilators",
                            "Anti-asthmatic drugs",
                            "Antitussives",
                            "Expectorants",
                            "Antihistamines"
                        ]
                    },
                    {
                        "name": "Gastrointestinal System",
                        "topics": [
                            "Antiulcer drugs",
                            "Antidiarrheal drugs",
                            "Laxatives",
                            "Antiemetics",
                            "Hepatic drugs"
                        ]
                    },
                    {
                        "name": "Endocrine System",
                        "topics": [
                            "Insulin and antidiabetic drugs",
                            "Thyroid and antithyroid drugs",
                            "Corticosteroids",
                            "Sex hormones",
                            "Calcium metabolism drugs"
                        ]
                    },
                    {
                        "name": "Chemotherapy",
                        "topics": [
                            "Antibiotics",
                            "Antifungal drugs",
                            "Antiviral drugs",
                            "Antimalarial drugs",
                            "Anticancer drugs",
                            "Immunosuppressive drugs"
                        ]
                    }
                ]
            },
            "Medicine": {
                "categories": [
                    {
                        "name": "Cardiology",
                        "topics": [
                            "Ischemic heart disease",
                            "Heart failure",
                            "Hypertension",
                            "Arrhythmias",
                            "Valvular heart disease",
                            "Cardiomyopathies",
                            "Pericardial diseases",
                            "Congenital heart disease"
                        ]
                    },
                    {
                        "name": "Respiratory Medicine",
                        "topics": [
                            "Asthma and COPD",
                            "Pneumonia",
                            "Tuberculosis",
                            "Interstitial lung diseases",
                            "Pleural diseases",
                            "Lung cancer",
                            "Respiratory failure"
                        ]
                    },
                    {
                        "name": "Gastroenterology",
                        "topics": [
                            "Peptic ulcer disease",
                            "Inflammatory bowel disease",
                            "Liver diseases",
                            "Pancreatitis",
                            "GI bleeding",
                            "Malabsorption syndromes",
                            "GI cancers"
                        ]
                    },
                    {
                        "name": "Nephrology",
                        "topics": [
                            "Acute kidney injury",
                            "Chronic kidney disease",
                            "Glomerulonephritis",
                            "Nephrotic syndrome",
                            "Kidney stones",
                            "Dialysis",
                            "Kidney transplant"
                        ]
                    },
                    {
                        "name": "Endocrinology",
                        "topics": [
                            "Diabetes mellitus",
                            "Thyroid disorders",
                            "Adrenal disorders",
                            "Pituitary disorders",
                            "Parathyroid disorders",
                            "Metabolic bone diseases",
                            "Obesity"
                        ]
                    },
                    {
                        "name": "Hematology",
                        "topics": [
                            "Anemia types",
                            "Bleeding disorders",
                            "Thrombotic disorders",
                            "Leukemias",
                            "Lymphomas",
                            "Multiple myeloma",
                            "Blood transfusion"
                        ]
                    },
                    {
                        "name": "Infectious Diseases",
                        "topics": [
                            "Fever syndromes",
                            "Sepsis and septic shock",
                            "HIV/AIDS",
                            "Viral hepatitis",
                            "Tropical diseases",
                            "Healthcare-associated infections",
                            "Antimicrobial resistance"
                        ]
                    },
                    {
                        "name": "Rheumatology",
                        "topics": [
                            "Rheumatoid arthritis",
                            "Osteoarthritis",
                            "SLE and connective tissue disorders",
                            "Gout and crystal arthropathies",
                            "Vasculitis",
                            "Fibromyalgia"
                        ]
                    },
                    {
                        "name": "Neurology",
                        "topics": [
                            "Stroke",
                            "Epilepsy",
                            "Movement disorders",
                            "Dementia",
                            "Headache disorders",
                            "Neuromuscular disorders",
                            "CNS infections"
                        ]
                    }
                ]
            },
            "Surgery": {
                "categories": [
                    {
                        "name": "General Surgery Principles",
                        "topics": [
                            "Wound healing",
                            "Surgical infections",
                            "Fluid and electrolyte management",
                            "Shock and resuscitation",
                            "Blood transfusion",
                            "Perioperative care",
                            "Surgical instruments"
                        ]
                    },
                    {
                        "name": "Gastrointestinal Surgery",
                        "topics": [
                            "Appendicitis",
                            "Hernia",
                            "Intestinal obstruction",
                            "Peptic ulcer complications",
                            "Gallbladder diseases",
                            "Pancreatic disorders",
                            "Colorectal diseases",
                            "GI malignancies"
                        ]
                    },
                    {
                        "name": "Hepatobiliary Surgery",
                        "topics": [
                            "Liver trauma",
                            "Liver tumors",
                            "Portal hypertension",
                            "Biliary tract diseases",
                            "Pancreatic tumors"
                        ]
                    },
                    {
                        "name": "Thoracic Surgery",
                        "topics": [
                            "Lung cancer",
                            "Pleural diseases",
                            "Chest trauma",
                            "Esophageal diseases",
                            "Mediastinal masses"
                        ]
                    },
                    {
                        "name": "Vascular Surgery",
                        "topics": [
                            "Arterial diseases",
                            "Venous diseases",
                            "Vascular trauma",
                            "Amputations",
                            "Vascular access"
                        ]
                    },
                    {
                        "name": "Endocrine Surgery",
                        "topics": [
                            "Thyroid diseases",
                            "Parathyroid diseases",
                            "Adrenal tumors",
                            "Pancreatic endocrine tumors"
                        ]
                    },
                    {
                        "name": "Breast Surgery",
                        "topics": [
                            "Breast cancer",
                            "Benign breast diseases",
                            "Breast reconstruction"
                        ]
                    },
                    {
                        "name": "Trauma Surgery",
                        "topics": [
                            "Head injury",
                            "Chest trauma",
                            "Abdominal trauma",
                            "Extremity trauma",
                            "Burns",
                            "Emergency procedures"
                        ]
                    }
                ]
            },
            "Obstetrics and Gynecology": {
                "categories": [
                    {
                        "name": "Obstetrics",
                        "topics": [
                            "Antenatal care",
                            "Normal labor and delivery",
                            "Complications in pregnancy",
                            "Antepartum hemorrhage",
                            "Postpartum hemorrhage",
                            "Preeclampsia and eclampsia",
                            "Multiple pregnancies",
                            "Medical disorders in pregnancy",
                            "Operative obstetrics",
                            "High-risk pregnancy",
                            "Fetal monitoring"
                        ]
                    },
                    {
                        "name": "Gynecology",
                        "topics": [
                            "Menstrual disorders",
                            "Infertility",
                            "Contraception",
                            "Genital infections",
                            "Ovarian cysts and tumors",
                            "Uterine disorders",
                            "Cervical pathology",
                            "Endometriosis",
                            "Pelvic inflammatory disease",
                            "Gynecologic malignancies",
                            "Menopause",
                            "Sexual dysfunction"
                        ]
                    }
                ]
            },
            "Pediatrics": {
                "categories": [
                    {
                        "name": "Growth and Development",
                        "topics": [
                            "Normal growth parameters",
                            "Developmental milestones",
                            "Growth disorders",
                            "Developmental delays",
                            "Nutrition in children"
                        ]
                    },
                    {
                        "name": "Neonatology",
                        "topics": [
                            "Normal newborn care",
                            "Neonatal resuscitation",
                            "Birth injuries",
                            "Congenital anomalies",
                            "Neonatal jaundice",
                            "Respiratory distress syndrome",
                            "Neonatal sepsis",
                            "Feeding problems"
                        ]
                    },
                    {
                        "name": "Pediatric Infections",
                        "topics": [
                            "Childhood exanthems",
                            "Respiratory infections",
                            "Diarrheal diseases",
                            "Central nervous system infections",
                            "Immunization schedule",
                            "Tuberculosis in children"
                        ]
                    },
                    {
                        "name": "Pediatric Cardiology",
                        "topics": [
                            "Congenital heart diseases",
                            "Heart failure in children",
                            "Rheumatic heart disease",
                            "Kawasaki disease"
                        ]
                    },
                    {
                        "name": "Pediatric Hematology-Oncology",
                        "topics": [
                            "Childhood anemias",
                            "Bleeding disorders",
                            "Childhood leukemias",
                            "Solid tumors in children"
                        ]
                    },
                    {
                        "name": "Pediatric Endocrinology",
                        "topics": [
                            "Growth hormone disorders",
                            "Diabetes in children",
                            "Thyroid disorders",
                            "Puberty disorders"
                        ]
                    },
                    {
                        "name": "Pediatric Nephrology",
                        "topics": [
                            "Urinary tract infections",
                            "Nephrotic syndrome",
                            "Glomerulonephritis",
                            "Kidney diseases in children"
                        ]
                    }
                ]
            },
            "Community Medicine/PSM": {
                "categories": [
                    {
                        "name": "Epidemiology",
                        "topics": [
                            "Principles of epidemiology",
                            "Study designs",
                            "Disease surveillance",
                            "Outbreak investigation",
                            "Screening programs",
                            "Disease prevention levels"
                        ]
                    },
                    {
                        "name": "Biostatistics",
                        "topics": [
                            "Descriptive statistics",
                            "Probability distributions",
                            "Hypothesis testing",
                            "Correlation and regression",
                            "Vital statistics",
                            "Demographic indicators"
                        ]
                    },
                    {
                        "name": "Communicable Diseases",
                        "topics": [
                            "Water and food-borne diseases",
                            "Air-borne diseases",
                            "Vector-borne diseases",
                            "Sexually transmitted diseases",
                            "Vaccine-preventable diseases",
                            "Emerging and re-emerging diseases"
                        ]
                    },
                    {
                        "name": "Non-communicable Diseases",
                        "topics": [
                            "Cardiovascular diseases",
                            "Cancer epidemiology",
                            "Diabetes and metabolic syndrome",
                            "Chronic respiratory diseases",
                            "Mental health",
                            "Accident and injuries"
                        ]
                    },
                    {
                        "name": "Environmental Health",
                        "topics": [
                            "Water quality and sanitation",
                            "Air pollution",
                            "Solid waste management",
                            "Food safety",
                            "Housing and health",
                            "Occupational health"
                        ]
                    },
                    {
                        "name": "Health Systems",
                        "topics": [
                            "Primary healthcare",
                            "Health policy and planning",
                            "Health economics",
                            "Health insurance",
                            "National health programs",
                            "International health"
                        ]
                    }
                ]
            },
            "ENT (Otorhinolaryngology)": {
                "categories": [
                    {
                        "name": "Ear Diseases",
                        "topics": [
                            "External ear diseases",
                            "Otitis media",
                            "Hearing loss",
                            "Vertigo and balance disorders",
                            "Facial nerve disorders",
                            "Ear trauma"
                        ]
                    },
                    {
                        "name": "Nose and Paranasal Sinuses",
                        "topics": [
                            "Rhinitis and sinusitis",
                            "Nasal polyps",
                            "Epistaxis",
                            "Nasal trauma",
                            "Anosmia",
                            "Sino-nasal tumors"
                        ]
                    },
                    {
                        "name": "Throat and Neck",
                        "topics": [
                            "Tonsillitis and adenoids",
                            "Pharyngitis",
                            "Laryngeal disorders",
                            "Voice disorders",
                            "Neck masses",
                            "Thyroid diseases",
                            "Salivary gland disorders"
                        ]
                    }
                ]
            },
            "Ophthalmology": {
                "categories": [
                    {
                        "name": "Refractive Errors",
                        "topics": [
                            "Myopia, hyperopia, astigmatism",
                            "Presbyopia",
                            "Contact lenses",
                            "Refractive surgery"
                        ]
                    },
                    {
                        "name": "Anterior Segment",
                        "topics": [
                            "Conjunctival diseases",
                            "Corneal diseases",
                            "Anterior uveitis",
                            "Glaucoma",
                            "Cataract"
                        ]
                    },
                    {
                        "name": "Posterior Segment",
                        "topics": [
                            "Retinal detachment",
                            "Diabetic retinopathy",
                            "Hypertensive retinopathy",
                            "Macular diseases",
                            "Posterior uveitis",
                            "Optic nerve disorders"
                        ]
                    },
                    {
                        "name": "Orbit and Adnexa",
                        "topics": [
                            "Orbital cellulitis",
                            "Lid disorders",
                            "Lacrimal system diseases",
                            "Squint and amblyopia"
                        ]
                    }
                ]
            },
            "Psychiatry": {
                "categories": [
                    {
                        "name": "General Psychiatry",
                        "topics": [
                            "Mental status examination",
                            "Psychiatric history taking",
                            "Classification of mental disorders",
                            "Psychopharmacology",
                            "Psychotherapy principles"
                        ]
                    },
                    {
                        "name": "Psychotic Disorders",
                        "topics": [
                            "Schizophrenia",
                            "Delusional disorders",
                            "Acute psychotic episodes",
                            "Substance-induced psychosis"
                        ]
                    },
                    {
                        "name": "Mood Disorders",
                        "topics": [
                            "Major depressive disorder",
                            "Bipolar disorder",
                            "Dysthymia",
                            "Seasonal affective disorder"
                        ]
                    },
                    {
                        "name": "Anxiety Disorders",
                        "topics": [
                            "Generalized anxiety disorder",
                            "Panic disorder",
                            "Phobias",
                            "Obsessive-compulsive disorder",
                            "PTSD"
                        ]
                    },
                    {
                        "name": "Other Disorders",
                        "topics": [
                            "Substance use disorders",
                            "Personality disorders",
                            "Eating disorders",
                            "Sleep disorders",
                            "Child and adolescent psychiatry",
                            "Geriatric psychiatry"
                        ]
                    }
                ]
            },
            "Dermatology": {
                "categories": [
                    {
                        "name": "Basic Dermatology",
                        "topics": [
                            "Skin anatomy and physiology",
                            "Skin lesion morphology",
                            "Dermatological therapy",
                            "Skin biopsy and histopathology"
                        ]
                    },
                    {
                        "name": "Inflammatory Disorders",
                        "topics": [
                            "Eczema and dermatitis",
                            "Psoriasis",
                            "Lichen planus",
                            "Urticaria and angioedema",
                            "Erythema multiforme"
                        ]
                    },
                    {
                        "name": "Infectious Diseases",
                        "topics": [
                            "Bacterial skin infections",
                            "Viral skin infections",
                            "Fungal infections",
                            "Parasitic infestations",
                            "Sexually transmitted diseases"
                        ]
                    },
                    {
                        "name": "Neoplastic Disorders",
                        "topics": [
                            "Benign skin tumors",
                            "Malignant skin tumors",
                            "Melanoma",
                            "Precancerous lesions"
                        ]
                    },
                    {
                        "name": "Hair and Nail Disorders",
                        "topics": [
                            "Alopecia",
                            "Hirsutism",
                            "Nail diseases",
                            "Hair shaft disorders"
                        ]
                    }
                ]
            },
            "Orthopedics": {
                "categories": [
                    {
                        "name": "Fractures and Trauma",
                        "topics": [
                            "Fracture healing",
                            "Upper limb fractures",
                            "Lower limb fractures",
                            "Spinal trauma",
                            "Polytrauma management"
                        ]
                    },
                    {
                        "name": "Joint Disorders",
                        "topics": [
                            "Arthritis",
                            "Joint replacement",
                            "Dislocations",
                            "Sports injuries"
                        ]
                    },
                    {
                        "name": "Spine Disorders",
                        "topics": [
                            "Back pain",
                            "Disc prolapse",
                            "Spinal deformities",
                            "Spinal infections"
                        ]
                    },
                    {
                        "name": "Bone and Soft Tissue Tumors",
                        "topics": [
                            "Benign bone tumors",
                            "Malignant bone tumors",
                            "Soft tissue sarcomas",
                            "Metastatic bone disease"
                        ]
                    },
                    {
                        "name": "Pediatric Orthopedics",
                        "topics": [
                            "Congenital disorders",
                            "Growth disturbances",
                            "Developmental dysplasia",
                            "Cerebral palsy"
                        ]
                    }
                ]
            },
            "Anesthesiology": {
                "categories": [
                    {
                        "name": "General Anesthesia",
                        "topics": [
                            "Preoperative assessment",
                            "Induction and maintenance",
                            "Airway management",
                            "Monitoring during anesthesia",
                            "Recovery and complications"
                        ]
                    },
                    {
                        "name": "Regional Anesthesia",
                        "topics": [
                            "Spinal anesthesia",
                            "Epidural anesthesia",
                            "Peripheral nerve blocks",
                            "Local anesthetic toxicity"
                        ]
                    },
                    {
                        "name": "Critical Care",
                        "topics": [
                            "ICU management",
                            "Mechanical ventilation",
                            "Hemodynamic monitoring",
                            "Shock management",
                            "Fluid and electrolyte therapy"
                        ]
                    },
                    {
                        "name": "Pain Management",
                        "topics": [
                            "Acute pain management",
                            "Chronic pain syndromes",
                            "Cancer pain",
                            "Pain pharmacology"
                        ]
                    }
                ]
            },
            "Radiology": {
                "categories": [
                    {
                        "name": "Basic Radiology",
                        "topics": [
                            "X-ray physics",
                            "Radiation safety",
                            "Contrast media",
                            "Image interpretation"
                        ]
                    },
                    {
                        "name": "Chest Radiology",
                        "topics": [
                            "Normal chest anatomy",
                            "Pulmonary pathology",
                            "Cardiac imaging",
                            "Mediastinal masses"
                        ]
                    },
                    {
                        "name": "Abdominal Radiology",
                        "topics": [
                            "GI imaging",
                            "Genitourinary imaging",
                            "Hepatobiliary imaging",
                            "Cross-sectional anatomy"
                        ]
                    },
                    {
                        "name": "Musculoskeletal Radiology",
                        "topics": [
                            "Fracture imaging",
                            "Joint pathology",
                            "Bone tumors",
                            "Spine imaging"
                        ]
                    },
                    {
                        "name": "Advanced Imaging",
                        "topics": [
                            "CT scanning",
                            "MRI principles",
                            "Ultrasound imaging",
                            "Nuclear medicine"
                        ]
                    }
                ]
            },
            "Forensic Medicine": {
                "categories": [
                    {
                        "name": "Legal Medicine",
                        "topics": [
                            "Medical jurisprudence",
                            "Court procedures",
                            "Medical certificates",
                            "Expert testimony",
                            "Medical ethics"
                        ]
                    },
                    {
                        "name": "Thanatology",
                        "topics": [
                            "Death and its types",
                            "Postmortem changes",
                            "Autopsy procedures",
                            "Time since death",
                            "Identification of deceased"
                        ]
                    },
                    {
                        "name": "Trauma and Violence",
                        "topics": [
                            "Mechanical injuries",
                            "Wound examination",
                            "Firearm injuries",
                            "Explosive injuries",
                            "Sexual offenses",
                            "Child abuse"
                        ]
                    },
                    {
                        "name": "Toxicology",
                        "topics": [
                            "Poisoning types",
                            "Common poisons",
                            "Alcohol and drugs",
                            "Sample collection",
                            "Toxicological analysis"
                        ]
                    },
                    {
                        "name": "Special Topics",
                        "topics": [
                            "Asphyxia",
                            "Burns and thermal injuries",
                            "Drowning",
                            "Aviation and railway medicine",
                            "Mass disasters"
                        ]
                    }
                ]
            }
        };
    }

    initializeProgress() {
        // Initialize progress tracking for all subjects
        for (const [subjectName, subjectData] of Object.entries(this.subjects)) {
            this.progress[subjectName] = {};
            subjectData.categories.forEach((category, categoryIndex) => {
                category.topics.forEach((topic, topicIndex) => {
                    const key = `${categoryIndex}-${topicIndex}`;
                    this.progress[subjectName][key] = false;
                });
            });
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', this.handleSearch.bind(this));

        // Filter functionality
        const filterSelect = document.getElementById('filter-select');
        filterSelect.addEventListener('change', this.handleFilter.bind(this));

        // Reset subject button
        const resetBtn = document.getElementById('reset-subject-btn');
        resetBtn.addEventListener('click', this.showResetConfirmation.bind(this));

        // Export progress button
        const exportBtn = document.getElementById('export-progress-btn');
        exportBtn.addEventListener('click', this.showExportModal.bind(this));

        // Modal event listeners
        this.setupModalEventListeners();

        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
    }

    setupModalEventListeners() {
        // Export modal
        const exportModal = document.getElementById('export-modal');
        const closeExportBtns = [
            document.getElementById('close-export-modal'),
            document.getElementById('close-export-modal-btn')
        ];
        
        closeExportBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                exportModal.classList.add('hidden');
            });
        });

        // Copy export button
        document.getElementById('copy-export-btn').addEventListener('click', this.copyExportContent.bind(this));

        // Confirmation modal
        const confirmModal = document.getElementById('confirm-modal');
        const closeConfirmBtns = [
            document.getElementById('close-confirm-modal'),
            document.getElementById('cancel-reset-btn')
        ];
        
        closeConfirmBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                confirmModal.classList.add('hidden');
            });
        });

        // Confirm reset button
        document.getElementById('confirm-reset-btn').addEventListener('click', this.resetSubjectProgress.bind(this));

        // Close modals on outside click
        [exportModal, confirmModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    }

    renderSubjects() {
        const subjectsNav = document.getElementById('subjects-nav');
        subjectsNav.innerHTML = '';

        Object.keys(this.subjects).forEach(subjectName => {
            const progress = this.getSubjectProgress(subjectName);
            const button = this.createSubjectButton(subjectName, progress);
            subjectsNav.appendChild(button);
        });
    }

    createSubjectButton(subjectName, progress) {
        const button = document.createElement('button');
        button.className = `subject-btn ${this.getProgressClass(progress.percentage)}`;
        button.addEventListener('click', () => this.selectSubject(subjectName));

        button.innerHTML = `
            <div>
                <div class="subject-name">${subjectName}</div>
                <div class="subject-progress-text">${progress.completed}/${progress.total} topics</div>
            </div>
            <div class="subject-icon">
                ${this.getSubjectIcon(subjectName)}
            </div>
        `;

        return button;
    }

    getSubjectIcon(subjectName) {
        const icons = {
            'Anatomy': '<i class="fas fa-user"></i>',
            'Physiology': '<i class="fas fa-heartbeat"></i>',
            'Biochemistry': '<i class="fas fa-flask"></i>',
            'Pathology': '<i class="fas fa-microscope"></i>',
            'Microbiology': '<i class="fas fa-bacteria"></i>',
            'Pharmacology': '<i class="fas fa-pills"></i>',
            'Medicine': '<i class="fas fa-stethoscope"></i>',
            'Surgery': '<i class="fas fa-cut"></i>',
            'Obstetrics and Gynecology': '<i class="fas fa-baby"></i>',
            'Pediatrics': '<i class="fas fa-child"></i>',
            'Community Medicine/PSM': '<i class="fas fa-users"></i>',
            'ENT (Otorhinolaryngology)': '<i class="fas fa-ear-listen"></i>',
            'Ophthalmology': '<i class="fas fa-eye"></i>',
            'Psychiatry': '<i class="fas fa-brain"></i>',
            'Dermatology': '<i class="fas fa-hand"></i>',
            'Orthopedics': '<i class="fas fa-bone"></i>',
            'Anesthesiology': '<i class="fas fa-syringe"></i>',
            'Radiology': '<i class="fas fa-x-ray"></i>',
            'Forensic Medicine': '<i class="fas fa-search"></i>'
        };
        return icons[subjectName] || '<i class="fas fa-book"></i>';
    }

    getProgressClass(percentage) {
        if (percentage === 100) return 'progress-complete';
        if (percentage >= 75) return 'progress-high';
        if (percentage >= 50) return 'progress-medium';
        if (percentage >= 25) return 'progress-medium';
        return 'progress-low';
    }

    selectSubject(subjectName) {
        this.currentSubject = subjectName;
        
        // Update active subject button
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const currentBtn = Array.from(document.querySelectorAll('.subject-btn'))
            .find(btn => btn.querySelector('.subject-name').textContent === subjectName);
        if (currentBtn) {
            currentBtn.classList.add('active');
        }

        // Clear search when selecting subject
        document.getElementById('search-input').value = '';
        document.getElementById('search-results').style.display = 'none';
        document.getElementById('topics-container').style.display = 'block';

        this.renderSubjectContent(subjectName);
        this.updateSubjectProgress(subjectName);
        
        // Show subject-specific controls
        document.getElementById('subject-progress').style.display = 'block';
        document.querySelector('.subject-actions').style.display = 'flex';
    }

    renderSubjectContent(subjectName) {
        const subjectData = this.subjects[subjectName];
        const topicsContainer = document.getElementById('topics-container');
        const currentSubjectEl = document.getElementById('current-subject');
        
        currentSubjectEl.textContent = subjectName;
        
        let html = '';
        subjectData.categories.forEach((category, categoryIndex) => {
            const categoryProgress = this.getCategoryProgress(subjectName, categoryIndex);
            
            html += `
                <div class="category">
                    <div class="category-header">
                        <h3 class="category-title">
                            ${category.name}
                            <span class="category-progress">${categoryProgress.completed}/${categoryProgress.total}</span>
                        </h3>
                    </div>
                    <div class="topics-list">
            `;
            
            category.topics.forEach((topic, topicIndex) => {
                const key = `${categoryIndex}-${topicIndex}`;
                const isCompleted = this.progress[subjectName][key];
                const shouldShow = this.shouldShowTopic(isCompleted);
                
                if (shouldShow) {
                    html += this.createTopicHTML(topic, topicIndex + 1, isCompleted, categoryIndex, topicIndex);
                }
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        topicsContainer.innerHTML = html;
        
        // Add event listeners to topic items
        this.attachTopicEventListeners(subjectName);
    }

    createTopicHTML(topic, number, isCompleted, categoryIndex, topicIndex) {
        return `
            <div class="topic-item ${isCompleted ? 'completed' : ''}" 
                 data-category="${categoryIndex}" 
                 data-topic="${topicIndex}">
                <div class="topic-checkbox ${isCompleted ? 'checked' : ''}">
                    ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="topic-number">${number}.</div>
                <div class="topic-name">${topic}</div>
            </div>
        `;
    }

    shouldShowTopic(isCompleted) {
        switch (this.currentFilter) {
            case 'completed':
                return isCompleted;
            case 'incomplete':
                return !isCompleted;
            default:
                return true;
        }
    }

    attachTopicEventListeners(subjectName) {
        const topicItems = document.querySelectorAll('.topic-item');
        topicItems.forEach(item => {
            item.addEventListener('click', () => {
                const categoryIndex = parseInt(item.dataset.category);
                const topicIndex = parseInt(item.dataset.topic);
                this.toggleTopicCompletion(subjectName, categoryIndex, topicIndex, item);
            });
        });
    }

    toggleTopicCompletion(subjectName, categoryIndex, topicIndex, element) {
        const key = `${categoryIndex}-${topicIndex}`;
        const wasCompleted = this.progress[subjectName][key];
        
        // Toggle completion status
        this.progress[subjectName][key] = !wasCompleted;
        
        // Update UI
        const checkbox = element.querySelector('.topic-checkbox');
        if (!wasCompleted) {
            element.classList.add('completed', 'just-completed');
            checkbox.classList.add('checked');
            checkbox.innerHTML = '<i class="fas fa-check"></i>';
            
            // Remove animation class after animation completes
            setTimeout(() => {
                element.classList.remove('just-completed');
            }, 600);
        } else {
            element.classList.remove('completed');
            checkbox.classList.remove('checked');
            checkbox.innerHTML = '';
        }
        
        // Update progress displays
        this.updateSubjectProgress(subjectName);
        this.updateOverallProgress();
        this.renderSubjects(); // Update sidebar progress
    }

    getSubjectProgress(subjectName) {
        const subjectProgress = this.progress[subjectName];
        const total = Object.keys(subjectProgress).length;
        const completed = Object.values(subjectProgress).filter(Boolean).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { completed, total, percentage };
    }

    getCategoryProgress(subjectName, categoryIndex) {
        const subjectProgress = this.progress[subjectName];
        const categoryKeys = Object.keys(subjectProgress).filter(key => 
            key.startsWith(`${categoryIndex}-`)
        );
        
        const total = categoryKeys.length;
        const completed = categoryKeys.filter(key => subjectProgress[key]).length;
        
        return { completed, total };
    }

    updateSubjectProgress(subjectName) {
        const progress = this.getSubjectProgress(subjectName);
        
        document.getElementById('subject-completed').textContent = progress.completed;
        document.getElementById('subject-total').textContent = progress.total;
        document.getElementById('subject-percentage').textContent = `${progress.percentage}%`;
        
        const progressBar = document.getElementById('subject-progress-bar');
        progressBar.style.width = `${progress.percentage}%`;
    }

    updateOverallProgress() {
        let totalCompleted = 0;
        let totalTopics = 0;
        
        Object.keys(this.subjects).forEach(subjectName => {
            const progress = this.getSubjectProgress(subjectName);
            totalCompleted += progress.completed;
            totalTopics += progress.total;
        });
        
        const percentage = totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;
        
        document.getElementById('overall-completed').textContent = totalCompleted;
        document.getElementById('overall-total').textContent = totalTopics;
        document.getElementById('overall-percentage').textContent = `${percentage}%`;
        
        const progressBar = document.getElementById('overall-progress-bar');
        progressBar.style.width = `${percentage}%`;
    }

    handleSearch(event) {
        const query = event.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            document.getElementById('search-results').style.display = 'none';
            document.getElementById('topics-container').style.display = 'block';
            return;
        }
        
        if (query.length < 2) return; // Wait for at least 2 characters
        
        this.searchResults = [];
        
        // Search through all subjects and topics
        Object.entries(this.subjects).forEach(([subjectName, subjectData]) => {
            subjectData.categories.forEach((category, categoryIndex) => {
                category.topics.forEach((topic, topicIndex) => {
                    if (topic.toLowerCase().includes(query)) {
                        const key = `${categoryIndex}-${topicIndex}`;
                        const isCompleted = this.progress[subjectName][key];
                        
                        this.searchResults.push({
                            subject: subjectName,
                            category: category.name,
                            topic: topic,
                            isCompleted: isCompleted,
                            categoryIndex,
                            topicIndex
                        });
                    }
                });
            });
        });
        
        this.renderSearchResults();
    }

    renderSearchResults() {
        const searchResultsContainer = document.getElementById('search-results');
        const searchResultsContent = document.getElementById('search-results-content');
        
        if (this.searchResults.length === 0) {
            searchResultsContent.innerHTML = '<p>No topics found matching your search.</p>';
        } else {
            let html = '';
            this.searchResults.forEach(result => {
                const shouldShow = this.shouldShowTopic(result.isCompleted);
                if (shouldShow) {
                    html += `
                        <div class="search-result-item ${result.isCompleted ? 'completed' : ''}" 
                             data-subject="${result.subject}"
                             data-category="${result.categoryIndex}"
                             data-topic="${result.topicIndex}">
                            <div class="search-result-subject">${result.subject}</div>
                            <div class="search-result-category">${result.category}</div>
                            <div class="search-result-topic">
                                <div class="topic-checkbox ${result.isCompleted ? 'checked' : ''}">
                                    ${result.isCompleted ? '<i class="fas fa-check"></i>' : ''}
                                </div>
                                ${result.topic}
                            </div>
                        </div>
                    `;
                }
            });
            searchResultsContent.innerHTML = html;
            
            // Add click handlers to search results
            searchResultsContent.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const subject = item.dataset.subject;
                    const categoryIndex = parseInt(item.dataset.category);
                    const topicIndex = parseInt(item.dataset.topic);
                    
                    this.toggleTopicCompletion(subject, categoryIndex, topicIndex, item);
                });
            });
        }
        
        searchResultsContainer.style.display = 'block';
        document.getElementById('topics-container').style.display = 'none';
    }

    handleFilter(event) {
        this.currentFilter = event.target.value;
        
        if (this.currentSubject) {
            this.renderSubjectContent(this.currentSubject);
        }
        
        if (document.getElementById('search-results').style.display === 'block') {
            this.renderSearchResults();
        }
    }

    showResetConfirmation() {
        if (!this.currentSubject) return;
        
        const confirmModal = document.getElementById('confirm-modal');
        confirmModal.classList.remove('hidden');
    }

    resetSubjectProgress() {
        if (!this.currentSubject) return;
        
        // Reset all progress for current subject
        Object.keys(this.progress[this.currentSubject]).forEach(key => {
            this.progress[this.currentSubject][key] = false;
        });
        
        // Update UI
        this.renderSubjectContent(this.currentSubject);
        this.updateSubjectProgress(this.currentSubject);
        this.updateOverallProgress();
        this.renderSubjects();
        
        // Close modal
        document.getElementById('confirm-modal').classList.add('hidden');
        
        // Show success message (could be enhanced with a toast notification)
        setTimeout(() => {
            alert('Subject progress has been reset successfully!');
        }, 100);
    }

    showExportModal() {
        const exportContent = this.generateExportContent();
        document.getElementById('export-content').innerHTML = exportContent;
        document.getElementById('export-modal').classList.remove('hidden');
    }

    generateExportContent() {
        let html = '<div class="export-section">';
        html += '<h4>Study Progress Summary</h4>';
        
        const overallProgress = this.getOverallProgress();
        html += `<p><strong>Overall Progress:</strong> ${overallProgress.completed}/${overallProgress.total} topics (${overallProgress.percentage}%)</p>`;
        
        html += '</div>';
        
        // Subject-wise breakdown
        Object.keys(this.subjects).forEach(subjectName => {
            const progress = this.getSubjectProgress(subjectName);
            if (progress.completed > 0) {
                html += `<div class="export-section">`;
                html += `<h4>${subjectName} (${progress.completed}/${progress.total})</h4>`;
                html += `<div class="export-topics">`;
                
                const completedTopics = this.getCompletedTopics(subjectName);
                completedTopics.forEach(topic => {
                    html += `â€¢ ${topic}<br>`;
                });
                
                html += `</div></div>`;
            }
        });
        
        return html;
    }

    getCompletedTopics(subjectName) {
        const completedTopics = [];
        const subjectData = this.subjects[subjectName];
        
        subjectData.categories.forEach((category, categoryIndex) => {
            category.topics.forEach((topic, topicIndex) => {
                const key = `${categoryIndex}-${topicIndex}`;
                if (this.progress[subjectName][key]) {
                    completedTopics.push(`${category.name}: ${topic}`);
                }
            });
        });
        
        return completedTopics;
    }

    getOverallProgress() {
        let totalCompleted = 0;
        let totalTopics = 0;
        
        Object.keys(this.subjects).forEach(subjectName => {
            const progress = this.getSubjectProgress(subjectName);
            totalCompleted += progress.completed;
            totalTopics += progress.total;
        });
        
        const percentage = totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;
        return { completed: totalCompleted, total: totalTopics, percentage };
    }

    copyExportContent() {
        const exportContent = document.getElementById('export-content').innerText;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(exportContent).then(() => {
                alert('Progress summary copied to clipboard!');
            }).catch(() => {
                this.fallbackCopyTextToClipboard(exportContent);
            });
        } else {
            this.fallbackCopyTextToClipboard(exportContent);
        }
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert('Progress summary copied to clipboard!');
        } catch (err) {
            alert('Unable to copy to clipboard. Please copy the text manually.');
        }
        
        document.body.removeChild(textArea);
    }

    handleKeyboardShortcuts(event) {
        // Arrow keys for subject navigation
        if (event.target.tagName.toLowerCase() !== 'input') {
            const subjects = Object.keys(this.subjects);
            const currentIndex = subjects.indexOf(this.currentSubject);
            
            if (event.key === 'ArrowUp' && currentIndex > 0) {
                event.preventDefault();
                this.selectSubject(subjects[currentIndex - 1]);
            } else if (event.key === 'ArrowDown' && currentIndex < subjects.length - 1) {
                event.preventDefault();
                this.selectSubject(subjects[currentIndex + 1]);
            }
        }
        
        // Escape key to close modals
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MedicalStudyTracker();
});
