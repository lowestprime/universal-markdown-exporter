# Anthropic STEM Fellows Application Responses

## Evidence base and fit

I grounded this synthesis in your uploaded materials, especially `Beaman_Cooper_Qualifications_Merged_Size_Optimized_LlamaParse_V2_Agentic_Plus_01092026.md`, `Background_and_Skills.md`, `AI_Tutor_Background_Information.md`, `CB_F31_Research_Training_Project_Current.md`, `KenMatch_README.md`, `KenMatch_PLANS.md`, `KenMatch_Conception.md`, and `DataAnnotation.tech_Biology_Starter_Assessment.md`, plus the live KenMatch site and the current official Anthropic fellowship listing. Your strongest evidence comes from research spanning University of California, San Francisco, University of California, Los Angeles, and University of California, San Diego, including functional genomics, psychiatric genetics, neurodevelopment, HPC-based computational analysis, scientific writing, and a live public prototype focused on long-horizon AI evaluation and governance. Anthropic’s current STEM Fellow posting is live as of April 22, 2026, and explicitly emphasizes deep domain expertise, high-agency project execution, rigorous hard-to-game evaluations, tool use, and scientific applications of Claude, with applications due May 15, 2026. Anthropic also now publicly highlights life-sciences and biology workflows as a priority area for Claude. ([1](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview))([2](https://job-boards.greenhouse.io/anthropic/jobs/5189848008))([3](https://www.anthropic.com/engineering/claude-code-best-practices))([4](https://www.anthropic.com/research/claude-for-life-sciences))

I also optimized for factual defensibility. In particular, I avoided brittle wording around your current degree status. Where the evidence clearly supports doctoral-level neuroscience training, I say so directly; where “candidate” or a current administrative designation could be contestable, I avoid overclaiming. Repo-specific claims are based on the uploaded repo documentation and the live KenMatch site. Two shortened links tied to your older repositories were not directly retrievable during this session, and the BP-DNAm short link returned unavailable, so I did not invent details beyond what your uploaded files consistently document. ([5](https://kmat.ch/))([6](https://kmat.ch/about))

## Field expertise

This answer works because it leads with the exact domains where your record is strongest and most legible to Anthropic: computational genomics, psychiatric genetics, functional genomics, and neuroscience. It also foregrounds contributions that are independently visible: your co-authorship on a 2025 paper in *Nature* and a 2023 paper in *Molecular Cell*, both tied to genomic / functional-variant work, while also pulling in the ABCD, bipolar methylation, NAPLS, and F31 materials from your uploads. Anthropic’s posting explicitly values deep domain expertise more than prior ML credentials, so this answer intentionally makes your scientific depth do the first-pass work. ([1](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview))([2](https://job-boards.greenhouse.io/anthropic/jobs/5189848008))([3](https://www.anthropic.com/engineering/claude-code-best-practices))([4](https://www.anthropic.com/research/claude-for-life-sciences))

**Paste-ready response**

My strongest fields are computational genomics, psychiatric genetics, functional genomics, and neurodevelopmental neuroscience. At UCSF, I contributed to CRISPRi- and PRIME-based studies of regulatory elements and disease-associated DNA variants in human iPSC-derived systems, contributing to papers in *Nature* and *Molecular Cell*. In parallel, I built computational projects in R, Python, and Unix on HPC systems, including a longitudinal GWAS of subcortical neurodevelopment in the ABCD cohort, an epigenetic-aging analysis of a large bipolar-disorder DNA methylation cohort using GrimAge2, and pre-imputation / GenomicSEM-oriented workflows for NAPLS. Conceptually, my core contribution is linking biological mechanism to scalable computation: regulatory genomics, psychiatric risk architecture, neurodevelopment, and reproducible analysis.

## ML and AI experience

The strongest truthful framing here is applied-AI fluency rather than claiming you trained frontier models from scratch. Anthropic explicitly says prior ML experience is helpful but not required, and the fellowship is about pairing domain expertise with frontier models and internal tooling. Your materials show repeated evidence of model evaluation, code auditing, prompt design, scientific reasoning checks, and AI-product building, especially through KenMatch and the biology-assessment materials. The live KenMatch site also makes the project legible as more than an idea: it is already a public demo centered on ranking, auditing, and governing long-running frontier-AI tasks. ([1](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview))([2](https://job-boards.greenhouse.io/anthropic/jobs/5189848008))([3](https://www.anthropic.com/engineering/claude-code-best-practices))([4](https://www.anthropic.com/research/claude-for-life-sciences))

**Paste-ready response**

My ML/AI experience is primarily applied rather than centered on training frontier models from scratch. I routinely use frontier models for literature synthesis, code generation and debugging, structured evidence review, experimental brainstorming, and failure analysis, but I use them in a verification-first way and check outputs against source material, statistics, and domain knowledge. On the quantitative side, I work with adjacent methods that sit close to ML, including polygenic scoring, GenomicSEM, GWAS-by-subtraction, epigenetic age models, and multimodal neurodevelopmental modeling ideas. I have also completed biology-focused model-evaluation exercises that required generating hard prompts, identifying reasoning errors, and explaining corrections. More recently, I built KenMatch, a public prototype for proposing, ranking, and auditing long-running frontier-AI work, which pushed me to think concretely about evaluation, governance, compute allocation, and transparency.

## Agentic coding experience

The most credible version here is candid and still strong: your experience is clearly substantial with repo-aware agentic coding workflows and similar products, while the evidence for heavy day-to-day Claude Code usage specifically is weaker in the uploaded materials. Anthropic’s own Claude Code documentation emphasizes tests, self-verification, context management, scoped sessions, parallel investigation, and subagents. That maps well onto the workflow documented around KenMatch and the way your materials describe your broader technical work. This answer therefore presents you as highly transferable to Claude Code without making a claim the evidence does not cleanly support. ([1](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview))([5](https://kmat.ch/))([6](https://kmat.ch/about))([3](https://www.anthropic.com/engineering/claude-code-best-practices))

**Paste-ready response**

My experience is stronger with similar repo-aware agentic coding tools than with Claude Code specifically, but the workflow is very close and highly transferable. I use agentic systems for repo mapping, architectural planning, refactors, documentation audits, and implementation support across both scientific R/Python code and full-stack projects such as KenMatch. My default loop is: define acceptance criteria and tests first, let the agent inspect the codebase and propose a plan, break the job into scoped sessions, require tool-use and self-verification, then manually review assumptions, statistics, and scientific claims. I am especially comfortable with context management, parallel investigations for modular tasks, and treating the model as a fast collaborator rather than an oracle. That workflow fits naturally with the way I already build and debug technical systems.

## Promising project ideas

Anthropic says fellows will be asked to design rigorous, hard-to-game evaluations that test whether models can plan experiments, interpret data, reason about mechanisms, use tools well, and reveal where they are confidently wrong. Anthropic also now explicitly positions Claude for life-sciences use cases such as genetic data analysis, scientific connectors, and broader scientific discovery. The two ideas below are therefore intentionally concrete, biologically serious, and scoped to something that could plausibly ship inside a fellowship window. The first is closer to your UCSF functional-genomics background; the second is closer to your ABCD / bipolar / NAPLS / F31 computational-psychiatry arc. ([1](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview))([2](https://job-boards.greenhouse.io/anthropic/jobs/5189848008))([3](https://www.anthropic.com/engineering/claude-code-best-practices))([4](https://www.anthropic.com/research/claude-for-life-sciences))

**Paste-ready response**

First, I would build a mechanism-grounded functional-genomics evaluation set for Claude. I do not mean generic biology QA. I mean tasks where Claude has to integrate perturbation results, regulatory annotations, chromatin or contact information, and cell-type context to answer questions like: which regulatory element is most likely causal, which follow-up perturbation best discriminates competing mechanisms, and which explanation still holds once contradictory evidence is introduced. I would score final-answer accuracy, calibration, citation quality, and whether Claude notices when the evidence is insufficient.

Second, I would build a computational-psychiatry sandbox around genetic-risk and neurodevelopment data. Claude would get controlled access to R/Python tools plus sanitized GWAS summary statistics, pathway-level scores, MRI-derived deviation measures, and limited clinical metadata. The task would be to perform QC, catch confounds such as ancestry or batch leakage, generate conservative risk-versus-resilience hypotheses, and propose the next most informative analysis. I would be especially interested in evaluating whether Claude avoids clinical overreach, detects subtle analytical traps, and uses scientific tools correctly under realistic research conditions.

## References

I cannot verify willingness or current availability, so you should only use these after confirming consent. These are the two strongest evidence-based options for this application because together they cover your highest-signal functional-genomics and computational-psychiatric-genetics work.

**Paste-ready response**

1. **Yin Shen** — [Yin.Shen@ucsf.edu](mailto:Yin.Shen@ucsf.edu)

UCSF Institute for Human Genetics / Department of Neurology. Dr. Shen supervised me full-time as a Junior Specialist and lab manager in her functional genomics lab. She can speak to my CRISPRi, PRIME, iPSC-neuron, and regulatory-genomics work, as well as my manuscript contributions, experimental judgment, and ability to bridge biology with computation. ([7](https://bms.ucsf.edu/people/yin-shen-phd))([8](https://pubmed.ncbi.nlm.nih.gov/38134886/))([9](https://shenlab.ucsf.edu/contact-us))([10](https://www.nature.com/articles/s41586-025-08622-x))

2. **Roel Ophoff** — [rophoff@mednet.ucla.edu](mailto:rophoff@mednet.ucla.edu)

UCLA Departments of Psychiatry & Biobehavioral Sciences and Human Genetics. Dr. Ophoff can speak to my computational psychiatric-genetics work, especially my bipolar-disorder DNA methylation / epigenetic-aging analyses, R/Python/HPC workflows, and my ability to formulate rigorous translational questions at the intersection of genomics and neuropsychiatry. ([11](https://bri.ucla.edu/people/roel-ophoff/))([12](https://medschool.ucla.edu/index.php/people/roel-ophoff-phd))

If you prefer to avoid a UCLA-affiliated reference, the strongest external backup is **Shweta Joshi** — [shjoshi@health.ucsd.edu](mailto:shjoshi@health.ucsd.edu) — who can speak to your cancer-immunology research, scientific writing contributions, and publication-focused work at UC San Diego Health. ([13](https://immunology.ucsd.edu/research/faculty.html))([14](https://pmc.ncbi.nlm.nih.gov/articles/PMC10416758/))([15](https://pmc.ncbi.nlm.nih.gov/articles/PMC7919651/))

## Open questions and limitations

The Anthropic fellowship posting, current deadline, question wording, and Claude / science positioning were verified against live official sources in this session. ([1](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview))([2](https://job-boards.greenhouse.io/anthropic/jobs/5189848008))([3](https://www.anthropic.com/engineering/claude-code-best-practices))([4](https://www.anthropic.com/research/claude-for-life-sciences))

Your uploaded materials gave enough evidence to personalize the answers well, but a few repo links were not directly retrievable during this session. Specifically, the BP-DNAm short link returned unavailable, and two shortened GitHub links redirected to an unsafe intermediary viewer rather than directly opening the repo. I therefore based repo-level claims on the uploaded repo-derived documentation and the live KenMatch site rather than pretending I had fully browsed every live repository. ([5](https://kmat.ch/))([6](https://kmat.ch/about))

I also intentionally used wording like “doctoral training” rather than more administratively loaded labels where your current university status could be disputed. That is the most truthful and strategically sound framing based on the materials you provided.

---

## **Citations [`6` Sources]**

1. [job-boards.greenhouse.io](https://job-boards.greenhouse.io/anthropic/jobs/5189848008)
2. [KenMatch — Transparent allocation of frontier AI compute](https://kmat.ch/)
3. [anthropic.com](https://www.anthropic.com/engineering/claude-code-best-practices)
4. [shenlab.ucsf.edu](https://shenlab.ucsf.edu/contact-us)
5. [medschool.ucla.edu](https://medschool.ucla.edu/index.php/people/roel-ophoff-phd)
6. [immunology.ucsd.edu](https://immunology.ucsd.edu/research/faculty.html)

---

## **Scanned [`61` Sources]**

1. [Mercor hiring Evaluation Specialist in United States](https://www.linkedin.com/jobs/view/evaluation-specialist-at-mercor-4370131146)
   - Feb 14, 2026 — Your actual pay will be based on your skills and experience — talk with your recruiter to learn more. Base pay range. $40.00/hr - $45.00/hr.Read more
2. [DataAnnotation | Your New Remote Job](https://www.dataannotation.tech/)
   - Apply to DataAnnotation to train AI for on-demand work from home. Choose from diverse tasks that suit your skills, with flexible hours and pay starting at ...
3. [Alignerr not live in my area](https://www.reddit.com/r/alignerr/comments/1poayqf/alignerr_not_live_in_my_area/)
   - Hello, that is correct. It is not available in California at this time. Thank you for your understanding and interest.Read more
4. [AI Evaluation – Safety Specialist](https://work.mercor.com/jobs/list_AAABmX3sSTcTTHLn6OFKiqiw/ai-evaluation-safety-specialist)
   - Location: Remote-friendly (US time zones preferred); open to US, UK, Canada Type: Full-time or Part-time Why This Role Exists At Mercor, we believe the ...
5. [Dataannotation jobs in San Francisco Bay Area, Ca](https://www.indeed.com/q-dataannotation-l-san-francisco-bay-area%2C-ca-jobs.html)
   - Dataannotation jobs in San Francisco Bay Area, CA. Print Designer - AI Trainer. Company logo. DataAnnotation. Remote in San Francisco, CA. $20 - $40 an hour.
6. [FAQs](https://www.alignerr.com/faqs)
   - What is Alignerr? Who are Alignerrs? What does the onboarding process look like? Is it safe to provide my information? What qualifications do I need to become ...Read more
7. [Scale AI Misclassifies Workers - Clarkson](https://clarksonlawfirm.com/scale-ai-misclassifies-workers/)
   - Dec 6, 2024 — Scale AI is misclassifying independent contractors responsible for the generative artificial intelligence boom by circumnavigating labor laws.Read more
8. [AI Trainer ($35-$40 per hour) – Mercor – Job Sunnyvale](https://www.talent.com/view?id=4d69adeab827)
   - Apply for Remote Generalist Evaluator Expert - AI Trainer ($35-$40 per hour) in Sunnyvale. Mercor is hiring now. Discover your next career opportunity today ...
9. [Outlier AI: Train the Next Generation of AI as a Freelancer](https://outlier.ai/)
   - Outlier is a platform operated by Scale AI that connects experts with leading AI companies to provide human feedback that improves language learning models ( ...Read more
10. [Scale AI is being investigated by San Francisco labor regulators](https://www.businessinsider.com/san-francisco-investigating-scale-ai-labor-practices-2025-9)
   - San Francisco’s Office of Labor Standards Enforcement (OLSE) is investigating Scale AI over its labor practices, focusing on city residents who worked for the company—remotely or otherwise—within the past three years. The probe targets gig workers identified as "taskers" and "freelancers" rather tha...
11. [Legal Support](https://talent.docs.mercor.com/support/legal)
   - This page addresses frequently asked questions and support topics related to contracts, legal documents, privacy, taxes, and work authorization.Read more
12. [Generalist – Project Velocity](https://www.mercor.com/jobs/list_AAABmfY0k7cTwxKGri1PC6rA)
   - Oct 17, 2025 — You will be legally classified as an hourly contractor for Mercor · We will pay you out at the end of each week via Stripe Connect ...Read more
13. [Has anyone had this problem? I don't even know why my ...](https://www.facebook.com/groups/487006836164827/posts/1066342784897893/)
   - I have been back in California since mid May and my account is still suspended. ... not available, If anyone has any idea, please help. 3. 3 ...Read more
14. [Cisco DX Series Administration Guide, Release 10.2(5)](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/dx/series/admin/1025/DX00_BK_CB112361_00_cisco-dx-series-ag-1025.epub)
   - ... not available when protected calling is configured. Protected calls are not ... alignErr. Total number of packets received between 64 and 1522 bytes in ...Read more
15. [Cisco Unified IP Phone 7975G, 7971G-GE, 7970G, 7965G, ...](https://www.th-wildau.de/files/HRZ/dokumente/voip/Cisco-Unified-IP-Telefone-7975G-7971G-GE-7970G-7965G-und-7945G-2018.pdf)
   - Jan 1, 2012 — ... California, Berkeley (UCB) as part of UCB's public domain version ... statistics not available on the phone. For more information about ...Read more
16. [Remote Science Communication Jobs in Los Angeles, CA](https://www.ziprecruiter.com/Jobs/Remote-Science-Communication/-in-Los-Angeles%2CCA)
   - Environmental Science Expert - $90/hr Remote - Alignerr * Location: Remote About the job At ... ... Remote work is not available for this role. WHAT ... California ...
17. [Mercor Contractors Allege The AI Company Slashed Their ...](https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/)
   - Nov 12, 2025 — I have never seen anything like that and have worked on a few AI projects,” one Mercor contractor told Forbes. ... California, Washington and ...Read more
18. [22-Year-Old Billionaire Mercor Co-Founders Attacked by ...](https://people.com/youngest-self-made-billionaires-mercor-co-founders-criticized-allegedly-changing-worker-pay-11849188)
   - Nov 14, 2025 — A contractor who agreed to work on the new project echoed that view ... That helped the trio, who went to the same California high ...Read more
19. [833 remote 1099 Jobs in California, December 2025](https://www.glassdoor.com/Job/remote-1099-California-SRCH_KO0%2C11_IL.12%2C22_IS2280.htm)
   - 833 Remote 1099 jobs in California · administrative assistant jobs in San Francisco, CASan Francisco, CA jobsMercor jobs in San Francisco, CA · administrative ...
20. [Real Estate Sales Agents - San Francisco, California](https://www.ihirerealestate.com/jobs/view/509676328)
   - Feb 11, 2026 — Mercor is searching for a Real Estate Sales Agents in San Francisco, California ... contractor engagement through Mercor Hourly ...Read more
21. [Accounts Payable Specialist - Brex Super User](https://mycareer.aicpa-cima.com/job/14220695/accounts-payable-specialist-brex-super-user/)
   - Accounts Payable Specialist - Brex Super User job in Hayes Valley, California, United States with Mercor Inc. Apply Today ... 1099 Compliance: Prepare and ...
22. [Backend Engineering Specialist at UTOR in USA](https://www.codingjobboard.com/job/backend-engineering-specialist-at-utor-usa/9480)
   - ... CA); in-office requires 5 days/week. Schedule: 9 ... Visa sponsorship: Not available. Compensation ... work.mercor.com/jobs/list_AAABmfUuJmUqPk-B ...
23. [Statistical Data Analyst - Remote with 0](https://www.foundit.in/job/statistical-data-analyst-remote-mercor-india-38502249)
   - Jan 31, 2026 — Visa sponsorship is not available. Application Process (Takes 2030 ... Job Source: work.mercor.com. Job ID: 132881025. Report Job. View ...Read more
24. [New Job posting: AI Math Tutor - Palo Alto, California ...](https://share.cazvid.com/cazvid3.0/videos/opp/68fa218321f4537a51e0001b/68fa218321f4537a51e0000f)
   - 1.Role Overview Mercor is partnering with a leading AI research group to ... Not available. 6.Compensation & Contract Terms $45–100/hour for U.S.-based ...
25. [Document](https://www.sec.gov/Archives/edgar/data/2085091/000162828026004270/robinhoodventuresfundi-nx2.htm)
   - ... not available to the Fund or its Adviser. In addition, some of our ... The company is headquartered in San Francisco, California. Mercor.io Corporation.
26. [Freelance AI Assistant Expert - Mindrift](https://apply.workable.com/toloka-ai/j/30A5E80FBC)
   - Mindrift is looking for passionate freelance contributors to join the Tendem project (https://tendem.ai/) to help build the future of hybrid agents — where ...Read more
27. [AI Training Jobs — Earn $15-60/hr From Home | Mindrift ...](https://mindrift.ai/)
   - Join 10000+ experts earning $15-50/hr training AI models remotely. Flexible freelance work, weekly payments. No AI experience required. Apply in 5 minutes.
28. [Training and Development Specialist - AI Trainer - Remote](https://remote.com/jobs/invisible-technologies-c1bcklvo/training-and-development-specialist-ai-trainer-j18cvg3s)
   - Invisible Technologies is hiring a Training and Development Specialist - AI Trainer ... We offer a pay range of $8-to- $65 per hour, with ...
29. [Mindrift: Remote AI training & data creation platform](https://www.thehomebase.ai/companies/mindrift)
   - Dec 26, 2025 — Launched in 2024 and backed by Toloka (a solid player in AI data since 2014), Mindrift connects over 10,000 freelance experts across 50+ fields ...Read more
30. [Ai Model Evaluator - HR & Business Operations](https://www.glassdoor.ca/job-listing/ai-model-evaluator-hr-and-business-operations-yo-it-consulting-JV_KO0%2C45_KE46%2C62.htm?jl=1010043318714)
   - This is a fully remote role that can be completed on your own schedule. ... Related pages. Ai Model Evaluator - HR & Business Operations jobs in Canada.Read more
31. [Toloka Careers](https://toloka.ai/careers)
   - Empowered contributors. We collaborate with a vibrant and engaged network of AI Tutors passionate about improving LLM technologies. Our contributors are the ...Read more
32. [Meridial AI: Shape the future of AI](https://www.meridial.ai/)
   - Flexible AI training projects that work with your schedule. Apply your expertise to help shape next-gen AI models for the world's most innovative companies.
33. [English Specialist (US Only) - Freelance AI Trainer Project](https://jobright.ai/jobs/info/696944f5639b452fb57f0fc6)
   - Apply to English Specialist (US Only) - Freelance AI Trainer Project at Meridial Marketplace, by Invisible on Jobright: Elevate Your Search with an AI ...
34. [Careers in AI & Operations | Join Invisible Technologies](https://invisibletech.ai/join-us)
   - See open roles and join the team reshaping AI operations. Invisible offers competitive benefits, equity, flexible PTO.
35. [Invisible Technologies hiring English Language Data ...](https://himalayas.app/companies/inv/jobs/english-language-data-contributor-multimodal-freelance-ai-trainer-project)
   - Feb 12, 2026 — Job title: General Specialist – AI Trainer. Employment type: Contract. Workplace type: Remote US Only. Seniority level: Entry. Apply now. Job ...Read more
36. [Freelance AI Trainer Project at Invisible Expert Marketplace](https://jobgether.com/offer/698b412692425699427ae093-english-language-data-contributor-multimodal---freelance-ai-trainer-project)
   - Feb 10, 2026 — Job title: General Specialist – AI Trainer Employment type: Contract Workplace type: Remote US Only Seniority level: Entry. Less More. Ready ...Read more
37. [165 invisible agency jobs in Remote, February 2026](https://www.glassdoor.ie/Job/invisible-agency-jobs-SRCH_IS11047_KO0%2C16.htm)
   - Job title: General Specialist – AI Trainer Employment type: Contract Workplace type: Remote US Only Seniority level: Entry. Show more. See company reviews ...
38. [#job #opportunity: "Anthropology Specialist - Freelance AI ...](https://www.instagram.com/p/DSDNd7NipV2/)
   - #job #opportunity: "Anthropology Specialist - Freelance AI Trainer Project" (Meridial Marketplace by Invisible, USA) ... [freelance AI jobs, ...Read more
39. [Jobs at Invisible Agency](https://job-boards.eu.greenhouse.io/agency)
   - Join the Meridial Expert Marketplace, Powered by Invisible. Search. Department ... Education Specialist (Fluent in French) - Freelance AI Trainer Project.
40. [Ai quality analyst jobs in Remote](https://ca.indeed.com/q-ai-quality-analyst-l-remote-jobs.html)
   - Evaluate the quality produced by AI models for correctness and performance. Projects are paid hourly starting at $40+ USD per hour, with bonuses on high-quality ...
41. [AI Red-Teamer - Adversarial Expert | Upto $111/hr Hourly](https://ca.linkedin.com/jobs/view/ai-red-teamer-adversarial-expert-upto-%24111-hr-hourly-at-mercor-4370313493)
   - Feb 17, 2026 — AI Red-Teamer - Adversarial Expert | Upto $111/hr ... Location: Remote-friendly (US time zones); Geography restricted to US, UK, CanadaRead more
42. [Exceptional Biology PhDs - Toronto, ON](https://emplois.ca.indeed.com/viewjob?jk=b2fe654853345e35)
   - Mercor is seeking Biology PhDs for a premier project with one of the world's top AI labs. This role pays between $90-110/hour.Read more
43. [Biology Labeling Expert – India - Bengaluru, Karnataka](https://in.indeed.com/viewjob?jk=a6528b8b553f1046)
   - Mercor is seeking PhD holders, doctoral candidates, and outstanding Master's graduates in biology and related disciplines to join a high-impact AI research ...Read more
44. [Biology Specialist | 110/hr Remote | Mercor](https://talents.studysmarter.co.uk/companies/crossing-hurdles/biology-specialist-110-hr-remote-mercor-18126832/)
   - Mercor. Position: Exceptional Biology PhDs. Referral Partner: Crossing Hurdles. Type: Hourly Contract. Compensation: $90–$110/hour. Location: Remote. Commitment ...Read more
45. [Biology Expert - London - Indeed.com](https://uk.indeed.com/viewjob?jk=af2a53c7bfe92e0a)
   - Compensation & Contract Terms. $60-80/hr dependent on experience + performance ... Review for Biology Expert at Mercor · Review for Biology Expert at Mercor ...Read more
46. [Biology Expert (Olympiad Problem Writers, Medalists ...](https://de.indeed.com/viewjob?jk=0dae6321be5ddd50)
   - Compensation & Contract Terms. $60-80/hr dependent on experience + performance. Open to contributors worldwide (English proficiency required). Independent ...Read more
47. [Human data for AI training and evaluation](https://www.prolific.com/ai-services)
   - Get complete AI training and evaluation datasets with our managed services. 200000+ verified participants. RLHF, evaluation, and domain expertise.
48. [AI Training Experts - US (PST) job in San Francisco at Prolific](https://lensa.com/job-v1/prolific/san-francisco-ca/management-trainee/4d482d4a4324a3065990497e17289608)
   - 7 days ago — Prolific is currently looking for a AI Training Experts - US (PST) near San Francisco. Full job description and instant apply on Lensa.
49. [mercor/APEX-v1-extended · Datasets at ...](https://huggingface.co/datasets/mercor/APEX-v1-extended)
   - mercor ... By entering Circus Circus you proceed at your own risk.” When Circus Circus came to Long Beach, California, local celebrity influencers Libby and ...Read more
50. [Historical Topo Map 1949](https://berkeleyca.gov/sites/default/files/2022-04/04-C-787-Bancroft-Phase-I-and-II-2020-Part3-TheLab-Phase3.pdf)
   - ... California. -. -. -. -. 1928. R.L. Polk and Co of California. -. X. X. -. 5833407- 5 ... MERCOR INC. 2448 SIXTH ST. RCRA-SQG. Higher. 1275, 0.241, SSE. U165.Read more
51. [Jobs and Employment at Mercor](https://simplify.jobs/c/Mercor)
   - Menlo Park, California. Founded. 2023 ... * Hourly Pay Rate: Up to $140/hour * Payment: Weekly via Stripe Connect * Contract Type: Independent contractor ...Read more
52. [Farm Labor Contractor at Mercor | Apply now!](https://talents.studysmarter.co.uk/companies/mercor/farm-labor-contractor-11614175/)
   - Mercor is recruiting Farm Labor Contractors as independent contractors working on a research project for one of the world's top AI companies. This project ...Read more
53. [Mercor hiring for Conversational AI Quality Evaluator](https://jobs.weekday.works/mercor-conversational-ai-quality-evaluator---remote)
   - Position: AI Model Evaluation Specialist Type: Full-time or Part-time Contract Work Compensation: $40/hour. Location: Geography restricted to Europe, USARead more
54. [The #1 Remote Nurse Job Board](https://www.telehealthnursenetwork.com/jobs)
   - ... Alignerr. Nursing Informatics Specialist. Posted on: February 14, 2026. Job Type: Contract. Role Type: Informatics. License: RN. State License: California. At ...Read more
55. [Scale AI](https://en.wikipedia.org/wiki/Scale_AI)
   - Scale AI, Inc. is an American data annotation company based in San Francisco, California. It provides data labeling, model evaluation, and software to ...Read more
56. [Read Customer Service Reviews of dataannotation.tech](https://www.trustpilot.com/review/dataannotation.tech)
   - Do you agree with Dataannotation's 4-star rating? Check out what 1914 people have written so far, and share your own experience.
57. [Audio Specialist - AI Trainer job at Invisible Technologies ...](https://remote.co/job-details/audio-specialist-ai-trainer-3309fd6f-73e5-49de-9b90-d557bc520c5d)
   - 2 hours ago — We offer a pay range of $11-to- $30.65 per hour, with the exact rate determined after evaluating your experience, expertise, and geographic ...
58. [Scale AI, Outlier sued over mental toll of AI model safety](https://www.theregister.com/2025/01/24/scale_ai_outlier_sued_over/)
   - Jan 24, 2025 — The lawsuit against Scale AI and Outlier alleges negligence and violation of California's unfair competition law. And it seeks both damages ...Read more
59. [Is Data Annotation Legit? What to Know About the Tech Jobs](https://time.com/6962608/data-annotation-legit-tech-jobs-ai/)
   - Apr 2, 2024 — For example, DataAnnotation.tech offers $40 for coding tasks, and Outlier.ai offers $60 per hour for chemistry tasks. Outside of the U.S., data ...
60. [Ghost Workers in the AI Machine:](https://cwa-union.org/ghost-workers-ai-machine)
   - The purpose of this report is to bring visibility to the working conditions faced by data workers in the U.S., who are also part of the global AI workforce, and ...Read more
61. [Schuster et al. v. Scale AI, Inc. et al. - 4:25-cv-00620](https://www.classaction.org/media/schuster-et-al-v-scale-ai-inc-et-al.pdf)
   - Jan 17, 2025 — Defendant Outlier AI, Inc. is an entity incorporated under the laws of the State of. Delaware, with principal places of business in Oakland, ...Read more

---

## **Connector scanned [`0` Sources]**

No connector sources scanned

---

## **Research Activity**

1. **Investigating remote AI alignment job opportunities**
2. **Finding high-paying, flexible, remote AI-related jobs for CA applicants**
3. **Handling entity wrappers and company lists**
4. **Handling entity wrapping for user-specified companies**
5. **Resolving entity wrapping conflict**
6. **Resolving entity wrapping guidelines**
7. **Clarifying entity wrapping approach**
8. **Streamlining job content analysis**
9. **Ensuring proper citation from file search**
10. **Citing file search results properly**
11. **Verifying CA eligibility for job openings**
12. **Confirming job listing eligibility for CA**
13. **Identifying targeted AI roles for the user**
14. **Clarifying job type preference for user**
15. **Considering remote options unrelated to RLHF**
16. **Focusing on user needs and ranking roles**
17. **Ensuring pay transparency and CA inclusion**
18. **Identifying CA-eligible RLHF companies**
19. **Reviewing potential RLHF roles with CA eligibility**
20. **Identifying potential platforms with higher pay for RLHF roles**
21. **Crafting job search parameters**
22. **Aligning with user query**
23. **Problem with file_search access**
24. **Citing user-provided files without tool citation**
25. **Accessing files through Python for analysis**
26. **Reading files as text**
27. **Analyzing high-frequency platform options**
28. **Focus on top recommendations**
29. **Extracting and validating job qualifications**
30. **Identifying RLHF tasks and similar options**
31. **Extracting and summarizing qualifications**
32. **Verifying pay options and location restrictions**
33. **Searching for remote AI training roles with high pay**
34. **Exploring remote evaluator roles**
35. **Focusing on high-frequency RLHF roles while considering adjacent tasks**
36. **Searching for top high-pay AI opportunities**
37. **Considering non-RLHF AI trainer roles**
38. **Searching**
   1. [www.linkedin.com](https://www.linkedin.com/jobs/view/evaluation-specialist-at-mercor-4370131146)
   2. [www.dataannotation.tech](https://www.dataannotation.tech/)
   3. [www.reddit.com](https://www.reddit.com/r/alignerr/comments/1poayqf/alignerr_not_live_in_my_area/)
   4. [work.mercor.com](https://work.mercor.com/jobs/list_AAABmX3sSTcTTHLn6OFKiqiw/ai-evaluation-safety-specialist)
   5. [www.indeed.com](https://www.indeed.com/q-dataannotation-l-san-francisco-bay-area%2C-ca-jobs.html)
   6. [www.alignerr.com](https://www.alignerr.com/faqs)
   7. [clarksonlawfirm.com](https://clarksonlawfirm.com/scale-ai-misclassifies-workers/)
   8. [www.talent.com](https://www.talent.com/view?id=4d69adeab827)
   9. [outlier.ai](https://outlier.ai/)
   10. [www.businessinsider.com](https://www.businessinsider.com/san-francisco-investigating-scale-ai-labor-practices-2025-9)
39. **Verifying CA restrictions for remote jobs**
40. **Searching**
   1. [www.alignerr.com](https://www.alignerr.com/faqs)
41. **Handling blocked website and searching elsewhere**
42. **Searching**
   1. [www.alignerr.com](https://www.alignerr.com/)
   2. [www.reddit.com](https://www.reddit.com/r/alignerr/comments/1poayqf/alignerr_not_live_in_my_area/)
   3. [talent.docs.mercor.com](https://talent.docs.mercor.com/support/legal)
   4. [work.mercor.com](https://work.mercor.com/)
   5. [www.linkedin.com](https://www.linkedin.com/posts/alignerr_train-ai-with-alignerr-activity-7263597018529374208-R_6h)
   6. [www.mercor.com](https://www.mercor.com/jobs/list_AAABmfY0k7cTwxKGri1PC6rA)
   7. [www.facebook.com](https://www.facebook.com/groups/487006836164827/posts/1066342784897893/)
   8. [www.cisco.com](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/dx/series/admin/1025/DX00_BK_CB112361_00_cisco-dx-series-ag-1025.epub)
   9. [www.th-wildau.de](https://www.th-wildau.de/files/HRZ/dokumente/voip/Cisco-Unified-IP-Telefone-7975G-7971G-GE-7970G-7965G-und-7945G-2018.pdf)
   10. [www.ziprecruiter.com](https://www.ziprecruiter.com/Jobs/Remote-Science-Communication/-in-Los-Angeles%2CCA)
   11. [www.indeed.com](https://www.indeed.com/q-independent-contractor-l-castro-valley%2C-ca-jobs.html)
43. **Looking into Mercor docs for legal support details**
44. **Checking Mercor's payment countries for California details**
45. **Searching**
   1. [talent.docs.mercor.com](https://talent.docs.mercor.com/policies/supported-countries)
46. **Confirming Mercor's contractor policy for California**
47. **Searching**
   1. [www.mercor.com](https://www.mercor.com/jobs/list_AAABmfY0k7cTwxKGri1PC6rA)
48. **Searching**
   1. [www.linkedin.com](https://www.linkedin.com/posts/gabriel-schwartz-la_mercor-ai-aitraining-activity-7392765775331299328-NACB)
   2. [www.reddit.com](https://www.reddit.com/r/mercor_ai/comments/1ou3nhs/is_it_legal_for_mercor_to_pay_hourly_but_only_if/)
   3. [www.indeed.com](https://www.indeed.com/q-jobs-at-mercor-jobs.html)
   4. [www.forbes.com](https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/)
   5. [www.facebook.com](https://www.facebook.com/groups/1754001498119420/posts/3119425604910329/)
   6. [people.com](https://people.com/youngest-self-made-billionaires-mercor-co-founders-criticized-allegedly-changing-worker-pay-11849188)
   7. [www.glassdoor.com](https://www.glassdoor.com/Job/remote-1099-California-SRCH_KO0%2C11_IL.12%2C22_IS2280.htm)
   8. [www.talent.com](https://www.talent.com/view?id=604923185239630599)
   9. [www.ihirerealestate.com](https://www.ihirerealestate.com/jobs/view/509676328)
   10. [mycareer.aicpa-cima.com](https://mycareer.aicpa-cima.com/job/14220695/accounts-payable-specialist-brex-super-user/)
   11. [www.ziprecruiter.com](https://www.ziprecruiter.com/Jobs/Evening-Remote-Data-Annotation)
49. **Confirming California eligibility for Mercor roles**
50. **Searching for Mercor's California role eligibility**
51. **Searching**
   1. [www.reddit.com](https://www.reddit.com/r/remoteworking/comments/1ohmgs8/presentation_writing_tutor_full_time_fulltime/)
   2. [www.facebook.com](https://www.facebook.com/groups/1754001498119420/posts/3119425604910329/)
   3. [www.linkedin.com](https://www.linkedin.com/jobs/view/statistical-analytics-analyst-at-mercor-4336383920)
   4. [www.codingjobboard.com](https://www.codingjobboard.com/job/backend-engineering-specialist-at-utor-usa/9480)
   5. [www.indeed.com](https://www.indeed.com/q-jobs-at-mercor-jobs.html)
   6. [www.foundit.in](https://www.foundit.in/job/statistical-data-analyst-remote-mercor-india-38502249)
   7. [www.talent.com](https://www.talent.com/view?id=604923185239630599)
   8. [www.ziprecruiter.com](https://www.ziprecruiter.com/Jobs/International-Remote-Video-Editor/--in-California)
   9. [share.cazvid.com](https://share.cazvid.com/cazvid3.0/videos/opp/68fa218321f4537a51e0001b/68fa218321f4537a51e0000f)
   10. [www.sec.gov](https://www.sec.gov/Archives/edgar/data/2085091/000162828026004270/robinhoodventuresfundi-nx2.htm)
52. **Exploring options beyond DataAnnotation**
53. **Focusing on high-frequency AI positions**
54. **Identifying and parsing relevant qualifications**
55. **Fixing issue with "R" count using regex boundaries**
56. **Reviewing background file and preparing summary**
57. **Inspecting ellipses and reviewing file content**
58. **Summarizing report approach and acknowledging limitations**
59. **Identifying candidate platforms and positions for CA validation**
60. **Evaluating companies for CA eligibility and potential RLHF roles**
61. **Searching for AI red team contractor roles**
62. **Searching**
   1. [www.linkedin.com](https://www.linkedin.com/jobs/view/ai-red-teamer-adversarial-expert-upto-%24111-hr-hourly-at-mercor-4370324208)
   2. [www.indeed.com](https://www.indeed.com/cmp/Invisible-Technologies/salaries/Trainer)
   3. [apply.workable.com](https://apply.workable.com/toloka-ai/j/30A5E80FBC)
   4. [www.glassdoor.com](https://www.glassdoor.com/Hourly-Pay/Invisible-Technologies-Remote-Ai-Trainer-Hourly-Pay-E2342977_D_KO23%2C40.htm)
   5. [mindrift.ai](https://mindrift.ai/)
   6. [www.ziprecruiter.com](https://www.ziprecruiter.com/Jobs/Contract-Ai-Evaluator)
   7. [remote.com](https://remote.com/jobs/invisible-technologies-c1bcklvo/training-and-development-specialist-ai-trainer-j18cvg3s)
   8. [www.thehomebase.ai](https://www.thehomebase.ai/companies/mindrift)
   9. [www.glassdoor.ca](https://www.glassdoor.ca/job-listing/ai-model-evaluator-hr-and-business-operations-yo-it-consulting-JV_KO0%2C45_KE46%2C62.htm?jl=1010043318714)
   10. [toloka.ai](https://toloka.ai/careers)
63. **Checking eligibility for Mindrift and Toloka listings**
64. **Searching**
   1. [apply.workable.com](https://apply.workable.com/toloka-ai/j/30A5E80FBC)
65. **Confirming CA eligibility and details for job listings**
66. **Searching**
   1. [www.linkedin.com](https://www.linkedin.com/jobs/view/general-specialist-us-%E2%80%93-ai-trainer-at-invisible-expert-marketplace-4301583246)
67. **Searching for active "AI Trainer" roles at Meridial Marketplace**
68. **Searching**
   1. [www.linkedin.com](https://www.linkedin.com/jobs/view/entry-level-english-specialist-us-only-freelance-ai-trainer-project-at-meridial-marketplace-by-invisible-4302548788)
   2. [www.meridial.ai](https://www.meridial.ai/)
   3. [jobright.ai](https://jobright.ai/jobs/info/696944f5639b452fb57f0fc6)
   4. [invisibletech.ai](https://invisibletech.ai/join-us)
   5. [himalayas.app](https://himalayas.app/companies/inv/jobs/english-language-data-contributor-multimodal-freelance-ai-trainer-project)
   6. [www.reddit.com](https://www.reddit.com/r/AIJobs/comments/1q3oaat/anyone_here_worked_with_meridial_marketplace/)
   7. [jobgether.com](https://jobgether.com/offer/698b412692425699427ae093-english-language-data-contributor-multimodal---freelance-ai-trainer-project)
   8. [www.glassdoor.ie](https://www.glassdoor.ie/Job/invisible-agency-jobs-SRCH_IS11047_KO0%2C16.htm)
   9. [www.instagram.com](https://www.instagram.com/p/DSDNd7NipV2/)
   10. [job-boards.eu.greenhouse.io](https://job-boards.eu.greenhouse.io/agency)
   11. [www.indeed.com](https://www.indeed.com/q-ai-life-l-remote-jobs.html)
   12. [www.glassdoor.com](https://www.glassdoor.com/Job/remote-ai-tutoring-jobs-SRCH_IL.0%2C6_IS11047_KO7%2C18.htm)
69. **Checking roles on Greenhouse Job Board for CA eligibility**
70. **Searching for relevant life sciences roles**
71. **Searching for biology roles directly**
72. **Checking pay details and CA eligibility**
73. **Confirming CA eligibility from job description**
74. **Confirming CA eligibility based on job details**
75. **Confirming CA eligibility and job availability**
76. **Identifying high pay roles from Mercor and verifying CA eligibility**
77. **Searching**
   1. [www.indeed.com](https://www.indeed.com/viewjob?jk=fdaa963980c3c7c9)
   2. [www.linkedin.com](https://www.linkedin.com/jobs/view/ai-red-teamer-fully-remote-upto-%2428-hr-hourly-at-mercor-4359684341)
   3. [ca.indeed.com](https://ca.indeed.com/q-ai-quality-analyst-l-remote-jobs.html)
   4. [ca.linkedin.com](https://ca.linkedin.com/jobs/view/ai-red-teamer-adversarial-expert-upto-%24111-hr-hourly-at-mercor-4370313493)
78. **Confirming CA eligibility and adjusting search focus**
79. **Confirming relevant Mercor jobs**
80. **Searching**
   1. [emplois.ca.indeed.com](https://emplois.ca.indeed.com/viewjob?jk=b2fe654853345e35)
   2. [www.talent.com](https://www.talent.com/view?id=a90a9f1fd406)
   3. [www.indeed.com](https://www.indeed.com/q-remote-biology-l-san-francisco-bay-area%2C-ca-jobs.html)
   4. [ca.linkedin.com](https://ca.linkedin.com/jobs/view/exceptional-biology-phds-at-mercor-4323214427)
   5. [in.indeed.com](https://in.indeed.com/viewjob?jk=a6528b8b553f1046)
   6. [himalayas.app](https://himalayas.app/companies/work-mercor/jobs/exceptional-biology-phds)
   7. [www.linkedin.com](https://www.linkedin.com/jobs/view/mercor-biologist-%24110-hr-remote-at-crossing-hurdles-4336472920)
   8. [talents.studysmarter.co.uk](https://talents.studysmarter.co.uk/companies/crossing-hurdles/biology-specialist-110-hr-remote-mercor-18126832/)
81. **Confirming CA eligibility for the biology role**
82. **Checking for correct job listing on US site**
83. **Refining search to find job listing**
84. **Looking into job listing details**
85. **Opening the company page**
86. **Searching for "Exceptional Biology PhDs" on company page**
87. **Exploring full job list**
88. **Reviewing Mercor job listings**
89. **Finding the job link**
90. **Searching**
   1. [uk.indeed.com](https://uk.indeed.com/viewjob?jk=af2a53c7bfe92e0a)
   2. [www.indeed.com](https://www.indeed.com/viewjob?jk=c6c0641705a7a5a4)
   3. [de.indeed.com](https://de.indeed.com/viewjob?jk=0dae6321be5ddd50)
   4. [ca.indeed.com](https://ca.indeed.com/viewjob?jk=891840e59d2dd2e7)
   5. [in.indeed.com](https://in.indeed.com/viewjob?jk=64e91020dab937b9)
91. **Opening Biology Expert job page**
92. **Opening full job description**
93. **Examining job details for remote opportunity**
94. **Searching**
   1. [emplois.ca.indeed.com](https://emplois.ca.indeed.com/viewjob?jk=b2fe654853345e35)
95. **Checking job listing for updates**
96. **Searching**
   1. [emplois.ca.indeed.com](https://emplois.ca.indeed.com/viewjob?jk=b2fe654853345e35)
   2. [ca.indeed.com](https://ca.indeed.com/q-biology-teacher-l-scarborough%2C-on-jobs.html)
97. **Searching for genetics-related roles**
98. **Checking pay for Biology Expert (SME) position**
99. **Exploring additional job options**
100. **Searching for additional SME roles**
101. **Searching**
   1. [job-boards.eu.greenhouse.io](https://job-boards.eu.greenhouse.io/agency/jobs/4654209101)
102. **Refining job search options**
103. **Reviewing DataAnnotation and other job options**
104. **Verifying Prolific's job listings**
105. **Searching**
   1. [www.indeed.com](https://www.indeed.com/viewjob?jk=2aa94b3ad8f99837)
   2. [www.prolific.com](https://www.prolific.com/ai-services)
   3. [www.glassdoor.com](https://www.glassdoor.com/job-listing/ai-training-research-scientist-pst-prolific-JV_IC1147401_KO0%2C34_KE35%2C43.htm?jl=1010003208286)
   4. [lensa.com](https://lensa.com/job-v1/prolific/san-francisco-ca/management-trainee/4d482d4a4324a3065990497e17289608)
   5. [www.businessinsider.com](https://www.businessinsider.com/handshake-ceo-ai-training-evolving-generalists-to-stem-experts-pay-2025-7)
106. **Confirming Prolific job listings for California**
107. **Searching**
   1. [www.indeed.com](https://www.indeed.com/viewjob?jk=4536c8c34f85a227)
108. **Confirming Prolific and additional job opportunities**
109. **Evaluating job options for user**
110. **Finalizing report structure and job listing format**
111. **Planning report structure and ranking**
112. **Handling entity wrapping for companies and locations**
113. **Deciding whether to wrap California as an entity**
114. **Clarifying qualifications and entity wrapping**
115. **Clarifying qualifications and ranking roles**
116. **Clarifying options for DataAnnotation and roles**
117. **Finalizing report structure and details**
118. **Considering jobs to include in the report**
119. **Finalizing the report content and structure**
120. **Adding disclaimers and preparing the final report**
121. **Searching**
   1. [linkedin.com](https://www.linkedin.com/jobs/view/evaluation-specialist-at-mercor-4370131146)
   2. [reddit.com](https://www.reddit.com/r/outlier_ai/comments/1pl2doa/not_accepting_from_ca/)
   3. [dataannotation.tech](https://www.dataannotation.tech/)
   4. [mercor.com](https://work.mercor.com/jobs/list_AAABmX3sSTcTTHLn6OFKiqiw/ai-evaluation-safety-specialist)
   5. [indeed.com](https://www.indeed.com/q-dataannotation-l-san-francisco-bay-area%2C-ca-jobs.html)
   6. [workable.com](https://apply.workable.com/toloka-ai/j/30A5E80FBC)
   7. [alignerr.com](https://www.alignerr.com/faqs)
   8. [codingjobboard.com](https://www.codingjobboard.com/job/backend-engineering-specialist-at-utor-usa/9480)
   9. [forbes.com](https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/)
   10. [foundit.in](https://www.foundit.in/job/statistical-data-analyst-remote-mercor-india-38502249)
   11. [glassdoor.com](https://www.glassdoor.com/Job/remote-1099-California-SRCH_KO0%2C11_IL.12%2C22_IS2280.htm)
   12. [clarksonlawfirm.com](https://clarksonlawfirm.com/scale-ai-misclassifies-workers/)
   13. [facebook.com](https://www.facebook.com/groups/1404116417142065/posts/1627086464845058/)
   14. [talent.com](https://www.talent.com/view?id=4d69adeab827)
   15. [people.com](https://people.com/youngest-self-made-billionaires-mercor-co-founders-criticized-allegedly-changing-worker-pay-11849188)
   16. [cisco.com](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/dx/series/admin/1025/DX00_BK_CB112361_00_cisco-dx-series-ag-1025.epub)
   17. [mindrift.ai](https://mindrift.ai/)
   18. [th-wildau.de](https://www.th-wildau.de/files/HRZ/dokumente/voip/Cisco-Unified-IP-Telefone-7975G-7971G-GE-7970G-7965G-und-7945G-2018.pdf)
   19. [ziprecruiter.com](https://www.ziprecruiter.com/Jobs/Remote-Science-Communication/-in-Los-Angeles%2CCA)
   20. [ihirerealestate.com](https://www.ihirerealestate.com/jobs/view/509676328)
   21. [remote.com](https://remote.com/jobs/invisible-technologies-c1bcklvo/training-and-development-specialist-ai-trainer-j18cvg3s)
   22. [outlier.ai](https://outlier.ai/)
   23. [aicpa-cima.com](https://mycareer.aicpa-cima.com/job/14220695/accounts-payable-specialist-brex-super-user/)
   24. [thehomebase.ai](https://www.thehomebase.ai/companies/mindrift)
   25. [glassdoor.ca](https://www.glassdoor.ca/job-listing/ai-model-evaluator-hr-and-business-operations-yo-it-consulting-JV_KO0%2C45_KE46%2C62.htm?jl=1010043318714)
   26. [cazvid.com](https://share.cazvid.com/cazvid3.0/videos/opp/68fa218321f4537a51e0001b/68fa218321f4537a51e0000f)
   27. [sec.gov](https://www.sec.gov/Archives/edgar/data/2085091/000162828026004270/robinhoodventuresfundi-nx2.htm)
   28. [toloka.ai](https://toloka.ai/careers)
   29. [huggingface.co](https://huggingface.co/datasets/mercor/APEX-v1-extended)
   30. [prolific.com](https://www.prolific.com/resources/5-alternatives-to-scale-ai-for-data-labeling)
   31. [berkeleyca.gov](https://berkeleyca.gov/sites/default/files/2022-04/04-C-787-Bancroft-Phase-I-and-II-2020-Part3-TheLab-Phase3.pdf)
   32. [simplify.jobs](https://simplify.jobs/c/Mercor)
   33. [businessinsider.com](https://www.businessinsider.com/pay-cuts-poaching-pivoting-inside-scale-ai-meta-2025-12)
   34. [studysmarter.co.uk](https://talents.studysmarter.co.uk/companies/mercor/farm-labor-contractor-11614175/)
   35. [weekday.works](https://jobs.weekday.works/mercor-conversational-ai-quality-evaluator---remote)
   36. [telehealthnursenetwork.com](https://www.telehealthnursenetwork.com/jobs)
   37. [wikipedia.org](https://en.wikipedia.org/wiki/Scale_AI)
   38. [trustpilot.com](https://www.trustpilot.com/review/dataannotation.tech)
   39. [remote.co](https://remote.co/job-details/audio-specialist-ai-trainer-3309fd6f-73e5-49de-9b90-d557bc520c5d)
   40. [theregister.com](https://www.theregister.com/2025/01/24/scale_ai_outlier_sued_over/)
   41. [time.com](https://time.com/6962608/data-annotation-legit-tech-jobs-ai/)
   42. [jobgether.com](https://jobgether.com/offer/69a04af97f0cfae7f11e2b4e-freelance-senior-consultant---ex-mbb-mckinsey-bcg-bain)
   43. [cwa-union.org](https://cwa-union.org/ghost-workers-ai-machine)
   44. [classaction.org](https://www.classaction.org/media/schuster-et-al-v-scale-ai-inc-et-al.pdf)
122. **Generated report on Remote RLHF and AI Alignment Roles Accepting California Applicants**