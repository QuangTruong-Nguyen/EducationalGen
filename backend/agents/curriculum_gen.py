from pydantic_ai import Agent, RunContext
from .pydantic_models.curriculum import CurriculumDeps, CurriculumResult
import os

os.environ["GEMINI_API_KEY"] = "API"

curriculum_gen_agent = Agent(
    'google-gla:gemini-2.0-flash',
    deps_type=CurriculumDeps,
    result_type = CurriculumResult
)


@curriculum_gen_agent.system_prompt
def system_prompt(ctx: RunContext) -> str:

    
    return f""" 

    You are a Curriculum Expert. Your primary mission is to distill a focused course curriculum from the provided materials.

    **Context:**
    - Course Objectives: `{ctx.deps.objective}`
    - Book's Table of Contents: `{ctx.deps.table_content}`

    **Core Task:**

    1. **Strategic Selection (Crucial Step):** 
    * Thoroughly analyze the `Course Objectives`. 
    * Scrutinize the `Book's Table of Contents`. 
    * Identify and select *ONLY* the chapters, sections, or specific topics from the `Book's Table of Contents` that *directly and demonstrably support* the achievements of the `Course Objectives`. 
    * **Explicit Exclusion:** You *must not* simply reproduce the entire table of contents. Actively filter out and discard any content from the table of contents that is not *essential* or *directly relevant* to the stated `Course Objectives`. The goal is precision and relevance, not a full reiteration of the book's ToC.


    3. **Output Specification:** 
    * The final output *must* be formatted as a `CurriculumResult` object. 
    * Return *only* this `CurriculumResult` object. No extra text, greetings, or explanations should precede or follow it.
    """

# table_content = """
# I ArtificialIntelligence
#     1 Introduction 19
#     1.1 WhatIsAI? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
#     1.2 TheFoundationsofArtificialIntelligence. . . . . . . . . . . . . . . . . . 23
#     1.3 TheHistoryofArtificialIntelligence . . . . . . . . . . . . . . . . . . . . 35
#     1.4 TheStateoftheArt . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 45
#     1.5 RisksandBenefitsofAI . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
#     Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 52
#     BibliographicalandHistoricalNotes . . . . . . . . . . . . . . . . . . . . . . . . 53
#     2 IntelligentAgents 54
#     2.1 AgentsandEnvironments . . . . . . . . . . . . . . . . . . . . . . . . . . 54
#     2.2 GoodBehavior:TheConceptofRationality . . . . . . . . . . . . . . . . 57
#     2.3 TheNatureofEnvironments. . . . . . . . . . . . . . . . . . . . . . . . . 60
#     2.4 TheStructureofAgents . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
#     Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 78
#     BibliographicalandHistoricalNotes . . . . . . . . . . . . . . . . . . . . . . . . 78
# """ 



table_content="""
1.1 WhatIsAI? 2... 2... ee 19
1.2. The Foundations of Artificial Intelligence... 2.2... 0 .0....000.. 23
1.3. The History of Artificial Intelligence .................0.. 35
14 TheStateofthe Art 2... 2... 00.22.0000. 00000..000. 45
1.5 Risksand Benefitsof AIT... ........20. 0.2.0. 0002.00004 49
Summary 2... 52
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 53
Intelligent Agents 54
2.1 Agentsand Environments .... 2.2.2.2... ... 0.00 0000004 34
2.2. Good Behavior: The Concept of Rationality ..............0.. 37
2.3. The Nature of Environments... ...............2...0200.4 60
2.4 The Structureof Agents... 2... 0.2.2.2... . 2.000020 .00008.4 65
Summary 2... 78
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 78
Solving Problems by Searching 81
3.1 Problem-Solving Agents... 2... 0.0.0.0... .. 000200004 81
3.2. Example Problems... .........0.... 2.000000 0 02000 G 84
3.3. Search Algorithms... 2... 0. ee es 89
3.4 Uninformed Search Strategies... 2 ee ee 94
3.5 Informed (Heuristic) Search Strategies .. 2... 02. ee ee 102
3.6 Heuristic Functions ..... 2.2... 0.0.0.0 000002 ee ee eee 115
Summary 2... 122
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 124
Search in Complex Environments 128
4.1. Local Search and Optimization Problems .................. 128
4.2 Local Search in Continuous Spaces... 2... 2... ee ee ee 137
4.3. Search with Nondeterministic Actions ................... 140
4.4 — Search in Partially Observable Environments ................ 144
4.5 Online Search Agents and Unknown Environments ............ 152
Summary 2... 159
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 160
Constraint Satisfaction Problems 164
5.1 Defining Constraint Satisfaction Problems ................. 164
5.2 Constraint Propagation: InferenceinCSPs ................. 169
6.4 Monte Carlo Tree Search .. 2... 0... ....0.. 2.000200 004
10 Knowledge Representation 332
10.1 Ontological Engineering... 2... 2... ee 332
10.2 Categories and Objects .. 2... 0.0... 0.000.000.0000 2000084 335
10.3 Events 2... ee 340
10.4 Mental Objects and Modal Logic ...............2....00. 344
10.5 Reasoning Systems for Categories ..................00.4 347
10.6 Reasoning with Default Information .................... 351
Summary 2... 355
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 356
11 Automated Planning 362
11.1 Definition of Classical Planning... .................0.4. 362
11.2 Algorithms for Classical Planning... 2... 2... ...0.0......0.0.4. 366
11.3. Heuristics for Planning ............. 0.2.0.0. 0000004 371
11.4 Hierarchical Planning .............0. 0.2... 0002-200 004 374
11.5 Planning and Acting in Nondeterministic Domains ............. 383
11.6 Time, Schedules, and Resources... .....0.00.0.0 0.00.00 000084 392
11.7. Analysis of Planning Approaches ..................-.04.4 396
Summary 2... 397
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 398
12 Quantifying Uncertainty 403
12.1 Acting under Uncertainty ............... 0.0.0.0. 2...00.4 403
12.2 Basic Probability Notation. ..........0...0.....0.0.2...00.4 406
12.3 Inference Using Full Joint Distributions... .............0.. 413
12.4 Independence .......2..... 0... 0000000000200 008 415
12.5. Bayes’ Rule andIts Use... 2... 2... 2... ee ee 417
12.6 Naive Bayes Models... 2.2... ee ee ee 420
12.7 The Wumpus World Revisited... 2... .....0...0...2.2...00. 422
Summary 2... 425
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 426
13 Probabilistic Reasoning 430
13.1 Representing Knowledge in an Uncertain Domain ............. 430
13.2 The Semantics of Bayesian Networks... ................4. 432
13.3 Exact Inference in Bayesian Networks ..................4. 445
13.4 Approximate Inference for Bayesian Networks .............2.. 453
13.5 Causal Networks. 2... ee 467
Summary 2... 471
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 472
14 Probabilistic Reasoning over Time 479
14.1. Time and Uncertainty .............. 0.0.0.0. 002...000. 479
14.2 Inference in Temporal Models... ......0.....0..0.2....004 483
16.2 AlgorithmsforMDPs .............. 0.2.0. 00 0000004
16.3. Bandit Problems ...........0.... 0.00000 00 00000045
17.3. Cooperative Game Theory... ..........0.. 0.00 0000004
19.1 Forms of Learning... .......0.... 0.00.00 000000004
19.2 Supervised Learning... 2... 2... 2. ee ee 671
19.3. Learning Decision Trees... 2... ee ee 675
19.4 Model Selection and Optimization ..................... 683
19.5 The Theory of Learning .... 2... .....0. 0.2... 00 02.20.0004 690
19.6 Linear Regression and Classification .................... 694
19.7. Nonparametric Models ............0..0.. 00000000004 704
19.8 Ensemble Leaming ............... 0000.00 0000004 714
19.9 Developing Machine Learning Systems ................... 722
Summary 2... 732
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 733
Knowledge in Learning 739
20.1 A Logical Formulation of Learning ..................0.. 739
20.2. Knowledge in Learning ............0.... 0.0000 20000.4 747
20.3. Explanation-Based Leaming .................0.2..-04.4 750
20.4 Learning Using Relevance Information ................... 754
20.5 Inductive Logic Programming. ................02-0-004 758
Summary 2... 767
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 768
Learning Probabilistic Models 772
21.1 Statistical Learning 2... 2... 2 ee ee 7712
21.2 Learning with Complete Data. ............2........0.. 715
21.3 Learning with Hidden Variables: The EM Algorithm. ........... 788
Summary 2... 797
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 798
Deep Learning 801
22.1 Simple Feedforward Networks ................02.-0-004 802
22.2 Computation Graphs for Deep Learning .................. 807
22.3 Convolutional Networks... 2... 0... ee 811
22.4 Learning Algorithms... ............ 0.2.0.0 0000004 816
22.5 Generalization... 2... ee ee 819
22.6 Recurrent Neural Networks ..........0.... 0.000 0-00004 823
22.7 Unsupervised Learning and Transfer Learning ............... 826
22.8 Applications... . 2... 2. ee 833
Summary 2... 835
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 836
Reinforcement Learning 840
23.1 Learning from Rewards .. 2... 2... . 2.2.20... 0 000000000084 840
23.2 Passive Reinforcement Learning ..................-04. 842
23.3 Active Reinforcement Learning ................2...2.00. 848
23.4 Generalization in Reinforcement Leaming ................. 854
23.5 PolicySearch 2... 0. ee 861
23.6 Apprenticeship and Inverse Reinforcement Learning... ......... 863
24.1 Language Models .........0.0 0... 0.00000 00 00000045
26.8 Humansand Robots ............... 0.2.00 0000000045
26.10 Application Domains .............. 0... 0.000200 0084
27.66 The3D World .. 2... 0.00002... 0000000000000 000. 1008
27.7 Using Computer Vision .. 2... 0... 2. ee ee 1013
Summary 2... 1026
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 1027
28 Philosophy, Ethics, and Safety of AI 1032
28.1 The Limitsof AI... . 2.0.2.0... 0.000000 0000000084 1032
28.2 Can Machines Really Think? .................2.....0.. 1035
28.3. The EthicsofAI.. 2... 0... 000.200.0000 0000200084 1037
Summary 2... 1056
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 1057
29 The Future of AI 1063
29.1 AIlComponents ...........0 0... 0.00000 0b eee eee 1063
29.2 Al Architectures... 2... 2 ee 1069
A Mathematical Background 1074
A.1 Complexity Analysis and OQ Notation .........0........0.. 1074
A.2 Vectors, Matrices, and Linear Algebra... 2... ee ee 1076
A.3. Probability Distributions... 2... 2... 2... ee ee 1078
Bibliographical and Historical Notes .. 2... 2. .0.0.0...0.00002.2020004 1080
B_ Notes on Languages and Algorithms 1081
B.1 Defining Languages with Backus-Naur Form (BNF)............ 1081
B.2 Describing Algorithms with Pseudocode .................. 1082
B.3. Online Supplemental Material... 2.2... ......0.0.0.2....0.. 1083
"""