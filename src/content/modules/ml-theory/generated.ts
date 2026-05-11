import type { Chapter } from "@/types";

type Group =
  | "supervised"
  | "unsupervised"
  | "semi"
  | "pac"
  | "srm"
  | "reg"
  | "dropout"
  | "implicit"
  | "lossgeo"
  | "complexity"
  | "dimensionality"
  | "nfl"
  | "optgen"
  | "calibration"
  | "uncertainty"
  | "robustness"
  | "adversarial";

interface Spec {
  id: string;
  title: string;
  description: string;
  group: Group;
}

interface Template {
  focus: string;
  foundation: string;
  applied: string;
  advanced: string;
  keyIdeas: [string, string, string, string];
  equations: [string, string, string];
  references: [string, string];
}

const templates: Record<Group, Template> = {
  supervised: {
    focus: "the formal supervised learning setup",
    foundation: "These chapters explain how a learning problem is defined through data, tasks, losses, and empirical performance.",
    applied: "The practical question is how formal definitions translate into actual model selection and evaluation.",
    advanced: "The advanced view links supervised learning assumptions to generalization behavior and optimization choices.",
    keyIdeas: [
      "A supervised task is defined by inputs, targets, and a performance measure.",
      "Loss functions encode what kinds of errors matter.",
      "Empirical risk is only a proxy for population risk.",
      "Bias and variance explain why fitting the training set is not enough.",
    ],
    equations: [
      "\\[ R(f) = \\mathbb{E}_{(x,y) \\sim \\mathcal{D}} [\\ell(f(x), y)] \\]",
      "\\[ \\hat{R}_n(f) = \\frac{1}{n} \\sum_{i=1}^{n} \\ell(f(x_i), y_i) \\]",
      "\\[ \\mathbb{E}[(y-\\hat{f}(x))^2] = \\text{Bias}^2 + \\text{Var} + \\sigma^2 \\]",
    ],
    references: [
      "Mitchell - Machine Learning",
      "Hastie, Tibshirani, Friedman - The Elements of Statistical Learning",
    ],
  },
  unsupervised: {
    focus: "structure discovery without labels",
    foundation: "These chapters explain how unsupervised learning seeks regularities in data without explicit target outputs.",
    applied: "The practical challenge is choosing objectives that reflect useful structure rather than arbitrary geometry.",
    advanced: "The advanced view asks when unsupervised objectives preserve information relevant to downstream tasks.",
    keyIdeas: [
      "Unsupervised objectives try to capture structure, density, or geometry.",
      "Clustering, density estimation, and dimensionality reduction optimize different notions of structure.",
      "Objective choice strongly affects what the model discovers.",
      "Evaluation is harder because there may be no single ground-truth target.",
    ],
    equations: [
      "\\[ \\min_{C, \\mu} \\sum_i \\|x_i - \\mu_{c_i}\\|^2 \\]",
      "\\[ \\hat{p}(x) \\approx p(x) \\]",
      "\\[ \\max_{U_k} \\mathrm{Var}(U_k^T x) \\]",
    ],
    references: [
      "Bishop - Pattern Recognition and Machine Learning",
      "Murphy - Probabilistic Machine Learning",
    ],
  },
  semi: {
    focus: "using labeled and unlabeled data together",
    foundation: "These chapters explain why unlabeled data can help when smoothness, low-density separation, or manifold assumptions hold.",
    applied: "The practical question is how to use consistency constraints and pseudo-labels without reinforcing model mistakes.",
    advanced: "The advanced view studies when semi-supervised assumptions are justified and when they fail under shift.",
    keyIdeas: [
      "Semi-supervised learning relies on assumptions about data geometry.",
      "Consistency regularization encourages stable predictions under perturbation.",
      "Pseudo-labeling can help or amplify confirmation bias.",
      "The unlabeled pool matters only if it matches the task distribution.",
    ],
    equations: [
      "\\[ L = L_{sup} + \\lambda L_{unsup} \\]",
      "\\[ f(x) \\approx f(x + \\delta) \\]",
      "\\[ \\hat{y} = \\arg\\max_c p(c \\mid x) \\]",
    ],
    references: [
      "Zhu (2005) - Semi-Supervised Learning Literature Survey",
      "Chapelle, Scholkopf, Zien - Semi-Supervised Learning",
    ],
  },
  pac: {
    focus: "sample-efficient learnability guarantees",
    foundation: "These chapters explain Probably Approximately Correct learning as an epsilon-delta framework for generalization.",
    applied: "The practical question is how many examples are needed relative to hypothesis class complexity.",
    advanced: "The advanced view connects PAC guarantees to capacity measures such as VC dimension and data-dependent complexity.",
    keyIdeas: [
      "PAC learning formalizes approximate correctness with high probability.",
      "Sample complexity depends on accuracy, confidence, and class complexity.",
      "VC dimension measures the expressive power of hypothesis classes.",
      "Generalization guarantees weaken as the class becomes more flexible.",
    ],
    equations: [
      "\\[ \\Pr(R(h) \\leq \\epsilon) \\geq 1 - \\delta \\]",
      "\\[ n = O\\left(\\frac{VC(H) + \\log(1/\\delta)}{\\epsilon}\\right) \\]",
      "\\[ VC(H) = d \\]",
    ],
    references: [
      "Shalev-Shwartz & Ben-David - Understanding Machine Learning",
      "Mohri, Rostamizadeh, Talwalkar - Foundations of Machine Learning",
    ],
  },
  srm: {
    focus: "balancing fit against model complexity",
    foundation: "These chapters explain structural risk minimization as the search for models that fit data without becoming unnecessarily complex.",
    applied: "The practical story is about penalties, validation criteria, and selecting among competing model classes.",
    advanced: "The advanced view links complexity control to MDL, information criteria, and modern capacity theory.",
    keyIdeas: [
      "Empirical fit alone does not imply good generalization.",
      "Complexity penalties discourage overly flexible solutions.",
      "Model selection criteria approximate the tradeoff between fit and complexity.",
      "The right penalty depends on the hypothesis class and data regime.",
    ],
    equations: [
      "\\[ \\min_f \\hat{R}_n(f) + \\lambda \\Omega(f) \\]",
      "\\[ \\text{AIC} = 2k - 2 \\log \\hat{L} \\]",
      "\\[ \\text{BIC} = k \\log n - 2 \\log \\hat{L} \\]",
    ],
    references: [
      "Vapnik - Statistical Learning Theory",
      "Burnham & Anderson - Model Selection and Multimodel Inference",
    ],
  },
  reg: {
    focus: "explicit regularization and prior structure",
    foundation: "These chapters explain how penalties such as L1 and L2 shape the solutions a model can express.",
    applied: "The practical question is how different penalties affect sparsity, shrinkage, and correlated features.",
    advanced: "The advanced view connects optimization penalties to Bayesian priors and path geometry.",
    keyIdeas: [
      "L2 shrinks parameters smoothly while L1 encourages sparsity.",
      "Elastic Net mixes sparsity with stability under correlation.",
      "Regularization changes the feasible set and the learned solution.",
      "Many explicit penalties admit a Bayesian interpretation.",
    ],
    equations: [
      "\\[ \\min_w \\hat{R}(w) + \\lambda \\|w\\|_2^2 \\]",
      "\\[ \\min_w \\hat{R}(w) + \\lambda \\|w\\|_1 \\]",
      "\\[ \\min_w \\hat{R}(w) + \\lambda_1 \\|w\\|_1 + \\lambda_2 \\|w\\|_2^2 \\]",
    ],
    references: [
      "Tibshirani (1996) - Regression Shrinkage and Selection via the Lasso",
      "Zou & Hastie (2005) - Regularization and Variable Selection via the Elastic Net",
    ],
  },
  dropout: {
    focus: "stochastic subnetworks and uncertainty from dropout",
    foundation: "These chapters explain dropout as random masking during training and why that can act like an ensemble-style regularizer.",
    applied: "The practical view uses dropout for robustness and sometimes for approximate uncertainty estimation at inference.",
    advanced: "The advanced view connects dropout to Bayesian approximation and prediction variance.",
    keyIdeas: [
      "Dropout randomly removes units during training.",
      "This discourages brittle co-adaptation between features.",
      "At test time, repeated dropout passes can estimate uncertainty.",
      "Dropout behaves differently from explicit weight penalties.",
    ],
    equations: [
      "\\[ h' = m \\odot h, \\quad m_j \\sim \\mathrm{Bernoulli}(1-p) \\]",
      "\\[ \\hat{y} = \\frac{1}{T} \\sum_{t=1}^{T} f_{m_t}(x) \\]",
      "\\[ \\mathrm{Var}(f_{m_t}(x)) \\]",
    ],
    references: [
      "Srivastava et al. (2014) - Dropout: A Simple Way to Prevent Neural Networks from Overfitting",
      "Gal & Ghahramani (2016) - Dropout as a Bayesian Approximation",
    ],
  },
  implicit: {
    focus: "implicit regularization from optimization dynamics",
    foundation: "These chapters explain why SGD often prefers certain kinds of solutions even without explicit penalties.",
    applied: "The practical story is about how learning rate, noise, and batch structure shape the minima that training reaches.",
    advanced: "The advanced view links stochastic optimization to flatness, exploration, and solution bias in overparameterized models.",
    keyIdeas: [
      "Optimization algorithms induce preferences beyond the explicit objective.",
      "Mini-batch noise changes which regions of parameter space are explored.",
      "Learning rate acts like a structural bias on solutions.",
      "Flatness is often used as a proxy for robustness or generalization.",
    ],
    equations: [
      "\\[ w_{t+1} = w_t - \\eta \\nabla \\hat{R}_B(w_t) \\]",
      "\\[ \\nabla \\hat{R}_B(w) = \\nabla \\hat{R}(w) + \\xi \\]",
      "\\[ \\text{sharpness}(w) = \\max_{\\|\\epsilon\\| \\leq \\rho} \\hat{R}(w + \\epsilon) - \\hat{R}(w) \\]",
    ],
    references: [
      "Keskar et al. (2017) - On Large-Batch Training for Deep Learning",
      "Neyshabur et al. (2017) - Exploring Generalization in Deep Learning",
    ],
  },
  lossgeo: {
    focus: "non-convex optimization landscapes",
    foundation: "These chapters explain why neural network loss surfaces contain many critical points and why local geometry matters.",
    applied: "The practical question is how to diagnose minima, saddles, and connectivity between solutions.",
    advanced: "The advanced view studies whether geometry measures really predict generalization or just correlate with training setup.",
    keyIdeas: [
      "High-dimensional losses contain many saddle points and broad valleys.",
      "Visualization techniques reveal only low-dimensional slices of the landscape.",
      "Different solutions can be connected by low-loss paths.",
      "Local curvature affects optimization stability and robustness.",
    ],
    equations: [
      "\\[ \\nabla L(w) = 0 \\]",
      "\\[ H(w) = \\nabla^2 L(w) \\]",
      "\\[ \\gamma(t) : [0,1] \\to \\mathbb{R}^d, \\quad L(\\gamma(t)) \\text{ low for all } t \\]",
    ],
    references: [
      "Goodfellow et al. (2015) - Qualitatively Characterizing Neural Network Optimization Problems",
      "Garipov et al. (2018) - Loss Surfaces, Mode Connectivity, and Fast Ensembling",
    ],
  },
  complexity: {
    focus: "capacity measures and modern generalization theory",
    foundation: "These chapters explain how model complexity affects learnability and why classical and modern capacity views sometimes disagree.",
    applied: "The practical story is about using complexity ideas to reason about model size, data needs, and overfitting risk.",
    advanced: "The advanced view compares VC-style theory, Rademacher complexity, and phenomena like double descent.",
    keyIdeas: [
      "Capacity measures quantify how flexibly a model class can fit data.",
      "VC dimension is classical but not always informative for deep networks.",
      "Rademacher complexity depends on both data and function class.",
      "Double descent shows that larger models can generalize better after interpolation.",
    ],
    equations: [
      "\\[ VC(H) = d \\]",
      "\\[ \\mathfrak{R}_n(H) = \\mathbb{E}_\\sigma \\left[ \\sup_{h \\in H} \\frac{1}{n} \\sum_{i=1}^{n} \\sigma_i h(x_i) \\right] \\]",
      "\\[ R(h) \\leq \\hat{R}(h) + O(\\mathfrak{R}_n(H)) \\]",
    ],
    references: [
      "Bartlett & Mendelson (2002) - Rademacher and Gaussian Complexities",
      "Belkin et al. (2019) - Reconciling Modern Machine Learning Practice and the Bias-Variance Tradeoff",
    ],
  },
  dimensionality: {
    focus: "high-dimensional geometry and concentration effects",
    foundation: "These chapters explain why high-dimensional spaces behave counterintuitively and why naive geometric intuition often fails.",
    applied: "The practical question is how concentration affects nearest neighbors, distances, and data representations.",
    advanced: "The advanced view studies when high dimension hurts and when it creates exploitable structure.",
    keyIdeas: [
      "Volume concentrates near boundaries in high dimensions.",
      "Pairwise distances become less informative as dimension grows.",
      "Some high-dimensional structure can still help linear separation and representation learning.",
      "Dimensionality effects depend on data geometry, not just ambient dimension.",
    ],
    equations: [
      "\\[ \\frac{\\|x_i - x_j\\|_{max} - \\|x_i - x_j\\|_{min}}{\\|x_i - x_j\\|_{min}} \\to 0 \\]",
      "\\[ \\mathbb{P}(\\|X\\| \\approx \\mathbb{E}\\|X\\|) \\text{ increases with concentration} \\]",
      "\\[ d \\uparrow \\Rightarrow \\text{surface-volume effects dominate} \\]",
    ],
    references: [
      "Vershynin - High-Dimensional Probability",
      "Aggarwal, Hinneburg, Keim (2001) - On the Surprising Behavior of Distance Metrics in High Dimensional Space",
    ],
  },
  nfl: {
    focus: "problem dependence of learning algorithms",
    foundation: "These chapters explain that no learning algorithm wins uniformly over all possible tasks.",
    applied: "The practical implication is that inductive bias and domain assumptions are necessary, not optional.",
    advanced: "The advanced view clarifies which assumptions break the theorem's symmetry and enable real progress.",
    keyIdeas: [
      "No-free-lunch results average over all possible target functions.",
      "Performance gains require assumptions about the problem family.",
      "Inductive bias is what makes learning feasible in practice.",
      "Algorithm comparisons only make sense relative to a task distribution.",
    ],
    equations: [
      "\\[ \\mathbb{E}_{f} [\\mathrm{Perf}(A_1, f)] = \\mathbb{E}_{f} [\\mathrm{Perf}(A_2, f)] \\]",
      "\\[ \\text{bias} + \\text{assumptions} \\Rightarrow \\text{advantage on restricted tasks} \\]",
      "\\[ \\text{uniform superiority is impossible without restriction} \\]",
    ],
    references: [
      "Wolpert (1996) - The Lack of A Priori Distinctions Between Learning Algorithms",
      "Wolpert & Macready (1997) - No Free Lunch Theorems for Optimization",
    ],
  },
  optgen: {
    focus: "how optimization choices affect generalization",
    foundation: "These chapters explain why training procedures can influence the quality of the final solution beyond fitting the data.",
    applied: "The practical story is about early stopping, sharpness-aware objectives, and overparameterized training behavior.",
    advanced: "The advanced view studies whether optimization geometry truly causes generalization gains or mainly tracks other factors.",
    keyIdeas: [
      "Optimization and generalization are linked through the solutions that training reaches.",
      "Early stopping can regularize by halting before overfitting grows.",
      "Sharpness-aware objectives prefer flatter neighborhoods.",
      "Overparameterized models can still generalize under the right implicit biases.",
    ],
    equations: [
      "\\[ w^* = \\arg\\min_w \\max_{\\|\\epsilon\\| \\leq \\rho} L(w + \\epsilon) \\]",
      "\\[ w_{t+1} = w_t - \\eta \\nabla L(w_t) \\]",
      "\\[ t_{stop} < t_{fit-all-noise} \\]",
    ],
    references: [
      "Foret et al. (2021) - Sharpness-Aware Minimization",
      "Prechelt (1998) - Early Stopping - But When?",
    ],
  },
  calibration: {
    focus: "matching predicted confidence to empirical frequency",
    foundation: "These chapters explain why a model can be accurate yet poorly calibrated.",
    applied: "The practical question is how to diagnose and repair miscalibrated probabilities after training.",
    advanced: "The advanced view studies calibration under shift, multiclass settings, and selective prediction.",
    keyIdeas: [
      "Calibration asks whether confidence scores correspond to observed frequencies.",
      "Reliability diagrams visualize miscalibration.",
      "Temperature scaling and Platt scaling are common post-hoc fixes.",
      "Calibration quality matters for thresholded decisions and risk-sensitive systems.",
    ],
    equations: [
      "\\[ \\mathbb{P}(Y=1 \\mid \\hat{P}=p) = p \\]",
      "\\[ \\text{ECE} = \\sum_m \\frac{|B_m|}{N} |\\mathrm{acc}(B_m) - \\mathrm{conf}(B_m)| \\]",
      "\\[ p_i = \\text{softmax}(z_i / T) \\]",
    ],
    references: [
      "Guo et al. (2017) - On Calibration of Modern Neural Networks",
      "Platt (1999) - Probabilistic Outputs for Support Vector Machines",
    ],
  },
  uncertainty: {
    focus: "epistemic, aleatoric, and predictive uncertainty",
    foundation: "These chapters explain different sources of uncertainty and why confidence alone is not enough.",
    applied: "The practical story is about ensembles, Bayesian approximations, and conformal guarantees.",
    advanced: "The advanced view studies what uncertainty estimates remain valid under shift and finite data.",
    keyIdeas: [
      "Aleatoric uncertainty comes from data noise.",
      "Epistemic uncertainty comes from limited knowledge about the model.",
      "Ensembles often outperform single-model uncertainty heuristics.",
      "Conformal methods provide finite-sample coverage guarantees under assumptions.",
    ],
    equations: [
      "\\[ \\mathrm{Var}(Y \\mid X) = \\mathbb{E}[\\mathrm{Var}(Y \\mid X, \\theta)] + \\mathrm{Var}(\\mathbb{E}[Y \\mid X, \\theta]) \\]",
      "\\[ \\hat{y} = \\frac{1}{M} \\sum_{m=1}^{M} f_m(x) \\]",
      "\\[ \\mathbb{P}(Y \\in C(X)) \\geq 1 - \\alpha \\]",
    ],
    references: [
      "Kendall & Gal (2017) - What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?",
      "Angelopoulos & Bates (2023) - Conformal Prediction: A Gentle Introduction",
    ],
  },
  robustness: {
    focus: "stability under distribution shift and worst-case evaluation",
    foundation: "These chapters explain why models that fit the training distribution can fail badly on shifted or atypical inputs.",
    applied: "The practical question is how to detect shift, bound risk, and design systems that degrade gracefully.",
    advanced: "The advanced view studies distributional robustness, certified guarantees, and out-of-distribution detection limits.",
    keyIdeas: [
      "Generalization under shift is different from i.i.d. test accuracy.",
      "Worst-case objectives trade nominal performance for stability.",
      "Certified defenses provide formal guarantees under restricted threat models.",
      "OOD detection tries to identify inputs unlike the training distribution.",
    ],
    equations: [
      "\\[ \\sup_{Q \\in \\mathcal{U}(P)} \\mathbb{E}_{Q}[\\ell(f(x), y)] \\]",
      "\\[ \\mathrm{risk}_{rob} = \\mathbb{E}[\\max_{\\delta \\in \\Delta} \\ell(f(x + \\delta), y)] \\]",
      "\\[ s(x) < \\tau \\Rightarrow \\text{reject as OOD} \\]",
    ],
    references: [
      "Sinha, Namkoong, Duchi (2018) - Certifying Some Distributional Robustness with Principled Adversarial Training",
      "Hendrycks & Gimpel (2017) - A Baseline for Detecting Misclassified and Out-of-Distribution Examples",
    ],
  },
  adversarial: {
    focus: "attacks, defenses, and robustness-accuracy tradeoffs",
    foundation: "These chapters explain how tiny perturbations can cause large prediction changes in high-dimensional models.",
    applied: "The practical story is about attack taxonomies, adversarial training, and the limits of empirical robustness.",
    advanced: "The advanced view studies why robust features differ from standard features and why robustness often costs clean accuracy.",
    keyIdeas: [
      "Adversarial examples exploit local sensitivity of models.",
      "Different attacks optimize different threat models and norms.",
      "Adversarial training is the dominant empirical defense.",
      "Robustness and standard accuracy often pull in different directions.",
    ],
    equations: [
      "\\[ x' = x + \\epsilon \\, \\mathrm{sign}(\\nabla_x \\ell(f(x), y)) \\]",
      "\\[ \\min_\\theta \\mathbb{E}_{(x,y)} [\\max_{\\delta \\in \\Delta} \\ell(f_\\theta(x + \\delta), y)] \\]",
      "\\[ \\text{robust accuracy} \\leq \\text{clean accuracy in many regimes} \\]",
    ],
    references: [
      "Szegedy et al. (2013) - Intriguing Properties of Neural Networks",
      "Madry et al. (2017) - Towards Deep Learning Models Resistant to Adversarial Attacks",
    ],
  },
};

function buildChapter(spec: Spec): Chapter {
  const template = templates[spec.group];

  return {
    id: spec.id,
    title: spec.title,
    description: spec.description,
    levels: [
      {
        tier: 1,
        title: "Foundation",
        cost: 0,
        content: {
          intro: [
            `${spec.title} covers ${spec.description.toLowerCase()}`,
            template.foundation,
            `The main foundation goal is to understand ${template.focus} before getting lost in proof details.`,
          ],
          keyIdeas: template.keyIdeas,
          equations: template.equations,
          references: template.references,
        },
      },
      {
        tier: 2,
        title: "Applied",
        cost: 50,
        content: {
          intro: [
            `In applied work, ${spec.title.toLowerCase()} shapes how you pick models, losses, evaluation metrics, or regularization strategies.`,
            template.applied,
            `You should be able to connect ${spec.title.toLowerCase()} to real design tradeoffs rather than treating it as only a theorem.`,
          ],
          keyIdeas: template.keyIdeas,
          equations: template.equations,
          references: template.references,
        },
      },
      {
        tier: 3,
        title: "Advanced",
        cost: 100,
        content: {
          intro: [
            `At an advanced level, ${spec.title.toLowerCase()} belongs to a larger theoretical picture about learnability, optimization, and robustness.`,
            template.advanced,
            `This is where assumptions, counterexamples, and asymptotic arguments start to matter.`,
          ],
          keyIdeas: template.keyIdeas,
          equations: template.equations,
          references: template.references,
        },
      },
    ],
  };
}

const specs: Spec[] = [
  { id: "task-performance-experience", title: "Task, Performance & Experience", description: "Mitchell's definition: T, P, E components of learning.", group: "supervised" },
  { id: "loss-functions", title: "Loss Functions", description: "Measuring prediction error: MSE, cross-entropy, hinge loss.", group: "supervised" },
  { id: "empirical-risk-minimization", title: "Empirical Risk Minimization", description: "Minimizing average loss over training data.", group: "supervised" },
  { id: "bias-variance-tradeoff", title: "Bias-Variance Tradeoff", description: "Decomposing generalization error into bias and variance.", group: "supervised" },
  { id: "clustering-objectives", title: "Clustering Objectives", description: "K-means, spectral clustering, and their loss landscapes.", group: "unsupervised" },
  { id: "density-estimation", title: "Density Estimation", description: "Modeling the underlying data distribution.", group: "unsupervised" },
  { id: "dimensionality-reduction-theory", title: "Dimensionality Reduction Theory", description: "PCA, manifold learning, and information preservation.", group: "unsupervised" },
  { id: "consistency-regularization", title: "Consistency Regularization", description: "Enforcing stable predictions under perturbation.", group: "semi" },
  { id: "pseudo-labeling", title: "Pseudo-Labeling", description: "Using model predictions as training targets.", group: "semi" },
  { id: "manifold-assumptions", title: "Manifold Assumptions", description: "Smoothness and cluster assumptions in semi-supervised methods.", group: "semi" },
  { id: "pac-definition", title: "PAC Definition & Bounds", description: "Formal definition: epsilon-delta guarantees on learning.", group: "pac" },
  { id: "sample-complexity", title: "Sample Complexity", description: "How many examples are needed to learn?", group: "pac" },
  { id: "vc-dimension", title: "VC Dimension", description: "Measuring hypothesis class capacity.", group: "pac" },
  { id: "complexity-penalties", title: "Complexity Penalties", description: "Adding structure-based penalties to risk minimization.", group: "srm" },
  { id: "model-selection-theory", title: "Model Selection Theory", description: "AIC, BIC, and MDL principles.", group: "srm" },
  { id: "l1-l2-regularization", title: "L1 & L2 Regularization", description: "Lasso vs Ridge and their geometric interpretations.", group: "reg" },
  { id: "elastic-net", title: "Elastic Net", description: "Combining L1 and L2 for grouped sparsity.", group: "reg" },
  { id: "regularization-as-prior", title: "Regularization as Prior", description: "Bayesian interpretation of regularization terms.", group: "reg" },
  { id: "dropout-as-ensemble", title: "Dropout as Ensemble", description: "Dropout approximates exponentially many sub-networks.", group: "dropout" },
  { id: "monte-carlo-dropout", title: "Monte Carlo Dropout", description: "Using dropout at inference for uncertainty estimation.", group: "dropout" },
  { id: "sgd-flat-minima", title: "SGD & Flat Minima", description: "Why SGD finds wide, generalizable minima.", group: "implicit" },
  { id: "learning-rate-implicit-reg", title: "Learning Rate as Implicit Regularizer", description: "How step size controls solution complexity.", group: "implicit" },
  { id: "noise-driven-exploration", title: "Noise-Driven Exploration", description: "Mini-batch noise as implicit regularization.", group: "implicit" },
  { id: "saddle-points-local-minima", title: "Saddle Points & Local Minima", description: "Critical points in non-convex optimization.", group: "lossgeo" },
  { id: "mode-connectivity", title: "Mode Connectivity", description: "Paths between solutions in parameter space.", group: "lossgeo" },
  { id: "loss-landscape-visualization", title: "Loss Landscape Visualization", description: "Techniques for visualizing high-dimensional surfaces.", group: "lossgeo" },
  { id: "vc-theory", title: "VC Theory", description: "Shattering, growth functions, and generalization bounds.", group: "complexity" },
  { id: "rademacher-complexity", title: "Rademacher Complexity", description: "Data-dependent measures of model capacity.", group: "complexity" },
  { id: "double-descent", title: "Double Descent", description: "The modern understanding of over-parameterization.", group: "complexity" },
  { id: "volume-concentration", title: "Volume Concentration", description: "How volume concentrates near surfaces in high dimensions.", group: "dimensionality" },
  { id: "distance-concentration", title: "Distance Concentration", description: "All points become equidistant in high dimensions.", group: "dimensionality" },
  { id: "blessing-of-dimensionality", title: "Blessing of Dimensionality", description: "When high dimensions actually help.", group: "dimensionality" },
  { id: "nfl-formal-statement", title: "Formal Statement", description: "The theorem and its proof sketch.", group: "nfl" },
  { id: "nfl-practical-implications", title: "Practical Implications", description: "What NFL means for algorithm selection.", group: "nfl" },
  { id: "sharpness-aware-minimization", title: "Sharpness-Aware Minimization", description: "Optimizing for flat loss regions.", group: "optgen" },
  { id: "early-stopping-theory", title: "Early Stopping as Regularization", description: "Why stopping early prevents overfitting.", group: "optgen" },
  { id: "overparameterization-generalization", title: "Overparameterization & Generalization", description: "Why more parameters can still generalize.", group: "optgen" },
  { id: "calibration-curves", title: "Calibration Curves", description: "Reliability diagrams and expected calibration error.", group: "calibration" },
  { id: "temperature-scaling", title: "Temperature Scaling", description: "Post-hoc calibration via softmax temperature.", group: "calibration" },
  { id: "platt-scaling", title: "Platt Scaling", description: "Logistic regression on model outputs for calibration.", group: "calibration" },
  { id: "aleatoric-vs-epistemic", title: "Aleatoric vs Epistemic Uncertainty", description: "Data noise vs model uncertainty.", group: "uncertainty" },
  { id: "bayesian-neural-networks", title: "Bayesian Neural Networks", description: "Placing distributions over weights.", group: "uncertainty" },
  { id: "ensemble-uncertainty", title: "Ensemble Uncertainty", description: "Using prediction disagreement across models.", group: "uncertainty" },
  { id: "conformal-prediction", title: "Conformal Prediction", description: "Distribution-free prediction intervals.", group: "uncertainty" },
  { id: "distributional-robustness", title: "Distributional Robustness", description: "Worst-case performance over distribution shifts.", group: "robustness" },
  { id: "certified-defenses", title: "Certified Defenses", description: "Provable robustness guarantees.", group: "robustness" },
  { id: "out-of-distribution-detection", title: "Out-of-Distribution Detection", description: "Identifying inputs that differ from training data.", group: "robustness" },
  { id: "adversarial-examples", title: "Adversarial Examples", description: "Small perturbations that fool classifiers.", group: "adversarial" },
  { id: "attack-taxonomy", title: "Attack Taxonomy", description: "FGSM, PGD, C&W, and other attack methods.", group: "adversarial" },
  { id: "adversarial-training", title: "Adversarial Training", description: "Training on adversarial examples for robustness.", group: "adversarial" },
  { id: "robustness-accuracy-tradeoff", title: "Robustness-Accuracy Tradeoff", description: "Why robustness often reduces accuracy.", group: "adversarial" },
];

export const mlTheoryChapters: Record<string, Chapter> = Object.fromEntries(
  specs.map((spec) => [spec.id, buildChapter(spec)]),
);
