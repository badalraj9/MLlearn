import type { Module } from "@/types";

export const modules: Module[] = [
  {
    id: "math",
    title: "Mathematical Foundations",
    description:
      "Linear algebra, calculus, probability, and optimization essentials for ML.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "Build comfort with notation and intuition.",
        chapters: [
          {
            id: "vectors",
            title: "Vectors & Spaces",
            description: "Geometry, notation, and intuition.",
            topics: [
              {
                id: "vector-basics",
                title: "Vector Basics",
                summary: "Magnitude, direction, and coordinates.",
                assessmentPrompt: "Explain vector magnitude and direction with a simple example.",
                content: {
                  intro: [
                    "Linear algebra begins with scalars and vectors as ordered arrays of numbers.",
                    "A vector can be seen as a point in space, with each element giving a coordinate.",
                  ],
                  keyIdeas: [
                    "Vectors are written as columns and indexed by position (x1, x2, ...).",
                    "Vectors live in R^n; the dimension is the number of elements.",
                    "You can select subsets of elements by index sets.",
                  ],
                  equations: ["x = [x1, x2, ... , xn]^T"],
                  references: ["ml/linear_algebra.html (Deep Learning Book, Ch.2)"],
                },
              },
              {
                id: "basis",
                title: "Bases & Span",
                summary: "How vectors build spaces.",
                assessmentPrompt: "Describe what it means for vectors to span a space.",
                content: {
                  intro: [
                    "A set of vectors spans a space if every point can be expressed as a linear combination.",
                    "Span tells you which points are reachable by mixing the vectors.",
                  ],
                  keyIdeas: [
                    "Linear combinations are sums of scaled vectors.",
                    "The column space of a matrix is the span of its columns.",
                    "If columns are redundant, the span does not grow.",
                  ],
                  equations: ["Ax = sum_i x_i * A_:,i"],
                  references: ["ml/linear_algebra.html (Sec 2.4)"],
                },
              },
              {
                id: "linear-combo",
                title: "Linear Combinations",
                summary: "Mixing vectors to form new ones.",
                assessmentPrompt: "Solve a small linear combination problem.",
                content: {
                  intro: [
                    "Linear combinations are the core way vectors form new vectors.",
                    "They are the foundation for span and linear dependence.",
                  ],
                  keyIdeas: [
                    "A vector is dependent if it can be formed by others.",
                    "Independent vectors add new directions to the span.",
                  ],
                  equations: ["sum_i c_i * v^(i)"],
                  references: ["ml/linear_algebra.html (Sec 2.4)"],
                },
              },
            ],
          },
          {
            id: "matrices",
            title: "Matrices",
            description: "Transformations and structure.",
            topics: [
              {
                id: "matrix-mult",
                title: "Matrix Multiplication",
                summary: "Composing transformations.",
                assessmentPrompt: "Explain why order matters in matrix multiplication.",
                content: {
                  intro: [
                    "Matrix multiplication composes linear transformations.",
                    "It is defined by dot products between rows and columns.",
                  ],
                  keyIdeas: [
                    "AB is defined only when columns(A) = rows(B).",
                    "Matrix multiplication is associative and distributive.",
                    "It is not commutative: AB != BA in general.",
                  ],
                  equations: ["C_ij = sum_k A_ik * B_kj"],
                  references: ["ml/linear_algebra.html (Sec 2.2)"],
                },
              },
              {
                id: "determinant",
                title: "Determinant",
                summary: "Area/volume scaling.",
                assessmentPrompt: "Interpret determinant as a geometric scaling factor.",
                content: {
                  intro: [
                    "The determinant measures how a matrix scales volume.",
                    "Det(A)=0 means space collapses in at least one direction.",
                  ],
                  keyIdeas: [
                    "Determinant equals the product of eigenvalues.",
                    "Det(A)=1 preserves volume.",
                  ],
                  equations: ["det(A) = product_i lambda_i"],
                  references: ["ml/linear_algebra.html (Sec 2.11)"],
                },
              },
            ],
          },
          {
            id: "probability",
            title: "Probability Basics",
            description: "Uncertainty, distributions, and expectation.",
            topics: [
              {
                id: "random-variables",
                title: "Random Variables",
                summary: "States and uncertainty.",
                assessmentPrompt: "Explain the difference between a random variable and its values.",
                content: {
                  intro: [
                    "Random variables describe uncertain quantities.",
                    "They become meaningful only with a probability distribution.",
                  ],
                  keyIdeas: [
                    "Variables can be discrete or continuous.",
                    "Notation distinguishes variable x from a value x.",
                  ],
                  references: ["ml/prob.html (Sec 3.2)"],
                },
              },
              {
                id: "distributions",
                title: "Distributions",
                summary: "PMF vs PDF and normalization.",
                assessmentPrompt: "Describe the difference between PMFs and PDFs.",
                content: {
                  intro: [
                    "Discrete variables use PMFs; continuous variables use PDFs.",
                    "PDFs integrate to 1; PMFs sum to 1.",
                  ],
                  keyIdeas: [
                    "PMF gives probability of exact states.",
                    "PDF gives density; probability is area under the curve.",
                  ],
                  references: ["ml/prob.html (Sec 3.3)"],
                },
              },
              {
                id: "conditional-prob",
                title: "Conditional Probability",
                summary: "Reasoning with evidence.",
                assessmentPrompt: "Write the formula for conditional probability.",
                content: {
                  intro: [
                    "Conditional probability models beliefs given evidence.",
                    "It connects joint and marginal probabilities.",
                  ],
                  keyIdeas: [
                    "P(y|x) = P(x,y) / P(x) when P(x) > 0.",
                    "Do not confuse conditional probability with intervention.",
                  ],
                  equations: ["P(y|x) = P(x,y) / P(x)"],
                  references: ["ml/prob.html (Sec 3.5)"],
                },
              },
              {
                id: "expectation",
                title: "Expectation & Variance",
                summary: "Average behavior and spread.",
                assessmentPrompt: "Explain how expectation is computed for discrete variables.",
                content: {
                  intro: [
                    "Expectation is the average of a function under a distribution.",
                    "Variance measures spread around the expectation.",
                  ],
                  keyIdeas: [
                    "Expectations are linear.",
                    "Variance captures how values deviate from the mean.",
                  ],
                  equations: ["E[f(x)] = sum_x P(x) f(x)"],
                  references: ["ml/prob.html (Sec 3.8)"],
                },
              },
            ],
          },
          {
            id: "numerical",
            title: "Numerical Computation",
            description: "Stability and conditioning.",
            topics: [
              {
                id: "overflow-underflow",
                title: "Overflow & Underflow",
                summary: "Why numeric stability matters.",
                assessmentPrompt: "Give an example of a function sensitive to overflow.",
                content: {
                  intro: [
                    "Real numbers are approximated on computers, which introduces error.",
                    "Underflow and overflow can turn valid computations into NaN.",
                  ],
                  keyIdeas: [
                    "Softmax must be stabilized by subtracting max(x).",
                    "Rounding error compounds across operations.",
                  ],
                  references: ["ml/numerical.html (Sec 4.1)"],
                },
              },
              {
                id: "conditioning",
                title: "Poor Conditioning",
                summary: "Error amplification in linear systems.",
                assessmentPrompt: "Explain why a large condition number is bad.",
                content: {
                  intro: [
                    "Poorly conditioned systems amplify small input errors.",
                    "Condition number relates to eigenvalue ratios.",
                  ],
                  keyIdeas: [
                    "Large max/min eigenvalue ratios imply sensitivity.",
                    "Numerical inversion becomes unreliable.",
                  ],
                  equations: ["cond(A) = max |lambda_i| / min |lambda_i|"],
                  references: ["ml/numerical.html (Sec 4.2)"],
                },
              },
            ],
          },
          {
            id: "optimization",
            title: "Optimization Basics",
            description: "Gradients, minima, and constraints.",
            topics: [
              {
                id: "gradient-descent",
                title: "Gradient Descent",
                summary: "Following the slope downhill.",
                assessmentPrompt: "Why does the negative gradient reduce the objective?",
                content: {
                  intro: [
                    "Gradients point uphill; moving opposite reduces the objective.",
                    "Gradient descent uses small steps to reach low values.",
                  ],
                  keyIdeas: [
                    "Critical points have zero gradient.",
                    "Learning rate controls step size.",
                  ],
                  equations: ["x' = x - eta * grad f(x)"],
                  references: ["ml/numerical.html (Sec 4.3)"],
                },
              },
              {
                id: "constraints",
                title: "Constrained Optimization",
                summary: "Feasible regions and Lagrangians.",
                assessmentPrompt: "Describe what a feasible point is.",
                content: {
                  intro: [
                    "Constraints restrict the set of allowed solutions.",
                    "Lagrangians convert constrained problems to unconstrained ones.",
                  ],
                  keyIdeas: [
                    "Feasible points satisfy all constraints.",
                    "KKT conditions characterize optimal points.",
                  ],
                  references: ["ml/numerical.html (Sec 4.4)"],
                },
              },
            ],
          },
        ],
      },
      {
        id: "apprentice",
        title: "Apprentice",
        description: "Formalize core definitions and proofs.",
        chapters: [
          {
            id: "eigen",
            title: "Eigen Concepts",
            description: "Eigenvectors and eigenvalues.",
            topics: [
              {
                id: "eigen-meaning",
                title: "Eigenvectors Intuition",
                summary: "Invariant directions.",
                assessmentPrompt: "Describe how eigenvectors behave under transformation.",
                content: {
                  intro: [
                    "Eigenvectors point in directions that a matrix only scales.",
                    "Eigenvalues tell how much scaling occurs.",
                  ],
                  keyIdeas: [
                    "Symmetric matrices have real eigenvalues.",
                    "Positive eigenvalues imply positive definite behavior.",
                  ],
                  references: ["ml/linear_algebra.html (Sec 2.7)"],
                },
              },
              {
                id: "eigen-calc",
                title: "Computing Eigenvalues",
                summary: "Characteristic polynomial basics.",
                assessmentPrompt: "Solve a 2x2 eigenvalue example.",
                content: {
                  intro: [
                    "Eigenvalues solve det(A - lambda I) = 0.",
                    "They describe scaling along eigenvectors.",
                  ],
                  keyIdeas: [
                    "Matrix is singular iff some eigenvalue is zero.",
                    "Eigen decomposition helps analyze quadratic forms.",
                  ],
                  equations: ["det(A - lambda I) = 0"],
                  references: ["ml/linear_algebra.html (Sec 2.7)"],
                },
              },
            ],
          },
          {
            id: "svd",
            title: "SVD & Pseudoinverse",
            description: "Factorization and least-squares.",
            topics: [
              {
                id: "svd-basics",
                title: "SVD Basics",
                summary: "U D V^T factorization.",
                assessmentPrompt: "State the SVD factorization of a matrix.",
                content: {
                  intro: [
                    "Every real matrix can be factorized into U D V^T.",
                    "Singular values generalize eigenvalues to non-square matrices.",
                  ],
                  keyIdeas: [
                    "Left/right singular vectors are eigenvectors of AA^T and A^T A.",
                    "SVD explains how matrices stretch space.",
                  ],
                  equations: ["A = U D V^T"],
                  references: ["ml/linear_algebra.html (Sec 2.8)"],
                },
              },
              {
                id: "pseudoinverse",
                title: "Pseudoinverse",
                summary: "Solving least squares.",
                assessmentPrompt: "When is the pseudoinverse used?",
                content: {
                  intro: [
                    "The pseudoinverse solves least-squares when A is not square.",
                    "It yields the minimum-norm solution.",
                  ],
                  keyIdeas: [
                    "Defined from SVD: A+ = V D+ U^T.",
                    "Gives closest solution when exact solution does not exist.",
                  ],
                  equations: ["A+ = V D+ U^T"],
                  references: ["ml/linear_algebra.html (Sec 2.9)", "ml/math-deep.pdf"],
                },
              },
            ],
          },
        ],
      },
    
      {
        id: "practitioner",
        title: "Practitioner",
        description: "Coming soon.",
        chapters: [
          {
            id: "practitioner-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "practitioner-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "specialist",
        title: "Specialist",
        description: "Coming soon.",
        chapters: [
          {
            id: "specialist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "specialist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "strategist",
        title: "Strategist",
        description: "Coming soon.",
        chapters: [
          {
            id: "strategist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "strategist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "expert",
        title: "Expert",
        description: "Coming soon.",
        chapters: [
          {
            id: "expert-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "expert-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "visionary",
        title: "Visionary",
        description: "Coming soon.",
        chapters: [
          {
            id: "visionary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "visionary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "luminary",
        title: "Luminary",
        description: "Coming soon.",
        chapters: [
          {
            id: "luminary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "luminary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
],
  },
  {
    id: "ml-theory",
    title: "ML Theory",
    description: "Bias-variance, generalization, and learning dynamics.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "High-level intuition for learning.",
        chapters: [
          {
            id: "bias-variance",
            title: "Bias-Variance",
            description: "Trade-offs in modeling.",
            topics: [
              {
                id: "bias",
                title: "Understanding Bias",
                summary: "Systematic error sources.",
                assessmentPrompt: "Give an example of a high-bias model.",
                content: {
                  intro: [
                    "Bias is systematic error introduced by oversimplified models.",
                  ],
                  keyIdeas: [
                    "High bias underfits training data.",
                    "Bias-variance tradeoff shapes generalization.",
                  ],
                  references: ["ml/ml.html", "ml/o'really hands on machine learning.pdf"],
                },
              },
              {
                id: "variance",
                title: "Understanding Variance",
                summary: "Sensitivity to data.",
                assessmentPrompt: "Explain why high variance hurts generalization.",
                content: {
                  intro: [
                    "Variance reflects how sensitive a model is to training data.",
                  ],
                  keyIdeas: [
                    "High variance overfits and generalizes poorly.",
                    "Regularization reduces variance at the cost of bias.",
                  ],
                  references: ["ml/regularization.html", "ml/o'really hands on machine learning.pdf"],
                },
              },
            ],
          },
          {
            id: "generalization",
            title: "Generalization",
            description: "Why models succeed or fail outside training data.",
            topics: [
              {
                id: "train-test",
                title: "Train vs Test",
                summary: "Why we evaluate on unseen data.",
                assessmentPrompt: "Explain why test performance matters more than training loss.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "overfitting",
                title: "Overfitting",
                summary: "When models memorize instead of learn.",
                assessmentPrompt: "Describe a symptom of overfitting.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "regularization-intro",
                title: "Regularization",
                summary: "Controlling model complexity.",
                assessmentPrompt: "Give one example of regularization.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
          {
            id: "representations",
            title: "Representations",
            description: "Features, factors, and learned structure.",
            topics: [
              {
                id: "feature-learning",
                title: "Feature Learning",
                summary: "From raw data to useful representations.",
                assessmentPrompt: "Why is representation learning useful?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "linear-factors",
                title: "Linear Factors",
                summary: "Factor models and decompositions.",
                assessmentPrompt: "Describe a simple linear factor model.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
      {
        id: "apprentice",
        title: "Apprentice",
        description: "Formalize the theory behind learning.",
        chapters: [
          {
            id: "theory-foundations",
            title: "Theory Foundations",
            description: "Losses, risks, and bounds.",
            topics: [
              {
                id: "loss-functions",
                title: "Loss Functions",
                summary: "Defining objectives.",
                assessmentPrompt: "Name two common loss functions.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "risk-minimization",
                title: "Risk Minimization",
                summary: "Expected vs empirical risk.",
                assessmentPrompt: "Explain empirical risk minimization.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "generalization-bounds",
                title: "Generalization Bounds",
                summary: "Why training error is not enough.",
                assessmentPrompt: "What does a generalization bound provide?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
    
      {
        id: "practitioner",
        title: "Practitioner",
        description: "Coming soon.",
        chapters: [
          {
            id: "practitioner-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "practitioner-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "specialist",
        title: "Specialist",
        description: "Coming soon.",
        chapters: [
          {
            id: "specialist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "specialist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "strategist",
        title: "Strategist",
        description: "Coming soon.",
        chapters: [
          {
            id: "strategist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "strategist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "expert",
        title: "Expert",
        description: "Coming soon.",
        chapters: [
          {
            id: "expert-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "expert-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "visionary",
        title: "Visionary",
        description: "Coming soon.",
        chapters: [
          {
            id: "visionary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "visionary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "luminary",
        title: "Luminary",
        description: "Coming soon.",
        chapters: [
          {
            id: "luminary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "luminary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
],
  },
  {
    id: "algorithms",
    title: "Algorithms",
    description: "Classic ML algorithms and their math foundations.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "Start with linear models.",
        chapters: [
          {
            id: "regression",
            title: "Regression",
            description: "Least squares and gradients.",
            topics: [
              {
                id: "linear-regression",
                title: "Linear Regression",
                summary: "Fit a line to data.",
                assessmentPrompt: "Derive the loss for a linear regression model.",
                content: {
                  intro: [
                    "Linear regression models a linear relationship between inputs and targets.",
                  ],
                  keyIdeas: [
                    "Least squares is the common objective.",
                    "Gradients provide the learning direction.",
                  ],
                  references: ["ml/ml.html", "ml/o'really hands on machine learning.pdf"],
                },
              },
              {
                id: "gradient-descent",
                title: "Gradient Descent",
                summary: "Optimization fundamentals.",
                assessmentPrompt: "Explain why gradients indicate steepest ascent.",
                content: {
                  intro: [
                    "Gradient descent is the workhorse optimizer for many ML algorithms.",
                  ],
                  keyIdeas: [
                    "Learning rate controls step size.",
                    "Iterative updates converge to low-loss regions.",
                  ],
                  references: ["ml/optimization.html", "ml/o'really hands on machine learning.pdf"],
                },
              },
            ],
          },
          {
            id: "classification",
            title: "Classification",
            description: "Decision boundaries and probabilistic models.",
            topics: [
              {
                id: "logistic-regression",
                title: "Logistic Regression",
                summary: "Linear classification with probabilities.",
                assessmentPrompt: "Why do we use a sigmoid in logistic regression?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "softmax",
                title: "Softmax Regression",
                summary: "Multi-class classification.",
                assessmentPrompt: "What does softmax output represent?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
          {
            id: "unsupervised",
            title: "Unsupervised Learning",
            description: "Clustering and dimensionality reduction.",
            topics: [
              {
                id: "kmeans",
                title: "K-Means",
                summary: "Partitioning data into clusters.",
                assessmentPrompt: "Explain the k-means update step.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "pca",
                title: "PCA",
                summary: "Dimensionality reduction via variance.",
                assessmentPrompt: "What does PCA maximize?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
      {
        id: "apprentice",
        title: "Apprentice",
        description: "Stronger algorithms and theory.",
        chapters: [
          {
            id: "trees",
            title: "Trees & Ensembles",
            description: "Nonlinear learners.",
            topics: [
              {
                id: "decision-trees",
                title: "Decision Trees",
                summary: "Rule-based splits.",
                assessmentPrompt: "What criterion is used to split nodes?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "random-forests",
                title: "Random Forests",
                summary: "Bagging decision trees.",
                assessmentPrompt: "Why does bagging help?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
    
      {
        id: "practitioner",
        title: "Practitioner",
        description: "Coming soon.",
        chapters: [
          {
            id: "practitioner-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "practitioner-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "specialist",
        title: "Specialist",
        description: "Coming soon.",
        chapters: [
          {
            id: "specialist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "specialist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "strategist",
        title: "Strategist",
        description: "Coming soon.",
        chapters: [
          {
            id: "strategist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "strategist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "expert",
        title: "Expert",
        description: "Coming soon.",
        chapters: [
          {
            id: "expert-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "expert-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "visionary",
        title: "Visionary",
        description: "Coming soon.",
        chapters: [
          {
            id: "visionary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "visionary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "luminary",
        title: "Luminary",
        description: "Coming soon.",
        chapters: [
          {
            id: "luminary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "luminary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
],
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Neural networks, CNNs, RNNs, and autoencoders.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "Core neural network building blocks.",
        chapters: [
          {
            id: "mlp",
            title: "Multilayer Perceptrons",
            description: "Feedforward networks.",
            topics: [
              {
                id: "perceptron",
                title: "Perceptron",
                summary: "Single-layer neural units.",
                assessmentPrompt: "What does a perceptron compute?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "backprop",
                title: "Backpropagation",
                summary: "Gradient flow through networks.",
                assessmentPrompt: "Why is backprop efficient?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
          {
            id: "convnets",
            title: "Convolutional Networks",
            description: "Spatial feature extraction.",
            topics: [
              {
                id: "convolutions",
                title: "Convolutions",
                summary: "Local receptive fields.",
                assessmentPrompt: "Why use convolution instead of dense layers?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "pooling",
                title: "Pooling",
                summary: "Downsampling for invariance.",
                assessmentPrompt: "What does pooling achieve?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
          {
            id: "rnn",
            title: "Recurrent Networks",
            description: "Sequence modeling.",
            topics: [
              {
                id: "rnn-basics",
                title: "RNN Basics",
                summary: "Hidden state over time.",
                assessmentPrompt: "How does an RNN handle sequences?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "lstm",
                title: "LSTM & GRU",
                summary: "Gated recurrent units.",
                assessmentPrompt: "What problem do gates solve?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
          {
            id: "autoencoders",
            title: "Autoencoders",
            description: "Representation learning.",
            topics: [
              {
                id: "ae-basics",
                title: "Autoencoder Basics",
                summary: "Encoder-decoder structure.",
                assessmentPrompt: "What is the goal of an autoencoder?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "denoising",
                title: "Denoising Autoencoders",
                summary: "Robust representations.",
                assessmentPrompt: "Why add noise to inputs?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
    
      {
        id: "apprentice",
        title: "Apprentice",
        description: "Coming soon.",
        chapters: [
          {
            id: "apprentice-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "apprentice-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "practitioner",
        title: "Practitioner",
        description: "Coming soon.",
        chapters: [
          {
            id: "practitioner-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "practitioner-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "specialist",
        title: "Specialist",
        description: "Coming soon.",
        chapters: [
          {
            id: "specialist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "specialist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "strategist",
        title: "Strategist",
        description: "Coming soon.",
        chapters: [
          {
            id: "strategist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "strategist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "expert",
        title: "Expert",
        description: "Coming soon.",
        chapters: [
          {
            id: "expert-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "expert-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "visionary",
        title: "Visionary",
        description: "Coming soon.",
        chapters: [
          {
            id: "visionary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "visionary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "luminary",
        title: "Luminary",
        description: "Coming soon.",
        chapters: [
          {
            id: "luminary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "luminary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
],
  },
  {
    id: "generative",
    title: "Generative Models",
    description: "Probabilistic modeling and sampling.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "Build intuition for probabilistic models.",
        chapters: [
          {
            id: "graphical-models",
            title: "Graphical Models",
            description: "Structured probability.",
            topics: [
              {
                id: "bayesian-nets",
                title: "Bayesian Networks",
                summary: "Directed graphical models.",
                assessmentPrompt: "What does an edge represent in a Bayesian net?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "markov-random-fields",
                title: "Markov Random Fields",
                summary: "Undirected models.",
                assessmentPrompt: "How do MRFs encode dependencies?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
          {
            id: "inference",
            title: "Inference",
            description: "Estimating hidden variables.",
            topics: [
              {
                id: "exact-inference",
                title: "Exact Inference",
                summary: "Summation and marginalization.",
                assessmentPrompt: "What makes exact inference hard?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "variational",
                title: "Variational Inference",
                summary: "Optimization-based approximation.",
                assessmentPrompt: "What does VI optimize?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
          {
            id: "monte-carlo",
            title: "Monte Carlo",
            description: "Sampling methods.",
            topics: [
              {
                id: "mc-estimation",
                title: "Monte Carlo Estimation",
                summary: "Sampling to approximate expectations.",
                assessmentPrompt: "Why does sampling approximate expectations?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "mcmc",
                title: "MCMC",
                summary: "Markov chain sampling.",
                assessmentPrompt: "What is the purpose of a Markov chain?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
          {
            id: "partition",
            title: "Partition Functions",
            description: "Normalization in energy models.",
            topics: [
              {
                id: "partition-basics",
                title: "Partition Function",
                summary: "Normalizing constants.",
                assessmentPrompt: "Why is the partition function hard to compute?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
          {
            id: "generative-models",
            title: "Generative Families",
            description: "Model classes and objectives.",
            topics: [
              {
                id: "vae",
                title: "Variational Autoencoders",
                summary: "Latent variable models.",
                assessmentPrompt: "What is the ELBO used for?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "gan",
                title: "GANs",
                summary: "Adversarial training.",
                assessmentPrompt: "What do the generator and discriminator do?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
    
      {
        id: "apprentice",
        title: "Apprentice",
        description: "Coming soon.",
        chapters: [
          {
            id: "apprentice-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "apprentice-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "practitioner",
        title: "Practitioner",
        description: "Coming soon.",
        chapters: [
          {
            id: "practitioner-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "practitioner-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "specialist",
        title: "Specialist",
        description: "Coming soon.",
        chapters: [
          {
            id: "specialist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "specialist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "strategist",
        title: "Strategist",
        description: "Coming soon.",
        chapters: [
          {
            id: "strategist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "strategist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "expert",
        title: "Expert",
        description: "Coming soon.",
        chapters: [
          {
            id: "expert-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "expert-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "visionary",
        title: "Visionary",
        description: "Coming soon.",
        chapters: [
          {
            id: "visionary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "visionary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "luminary",
        title: "Luminary",
        description: "Coming soon.",
        chapters: [
          {
            id: "luminary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "luminary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
],
  },
  {
    id: "applications",
    title: "Applications",
    description: "Use cases and real-world deployments.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "Where ML gets used.",
        chapters: [
          {
            id: "application-areas",
            title: "Application Areas",
            description: "Vision, language, and beyond.",
            topics: [
              {
                id: "vision",
                title: "Computer Vision",
                summary: "Image understanding.",
                assessmentPrompt: "Give one common vision task.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "nlp",
                title: "Natural Language",
                summary: "Text understanding.",
                assessmentPrompt: "Give one common NLP task.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
              {
                id: "recommendation",
                title: "Recommendation",
                summary: "Ranking and personalization.",
                assessmentPrompt: "What is collaborative filtering?",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
    
      {
        id: "apprentice",
        title: "Apprentice",
        description: "Coming soon.",
        chapters: [
          {
            id: "apprentice-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "apprentice-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "practitioner",
        title: "Practitioner",
        description: "Coming soon.",
        chapters: [
          {
            id: "practitioner-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "practitioner-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "specialist",
        title: "Specialist",
        description: "Coming soon.",
        chapters: [
          {
            id: "specialist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "specialist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "strategist",
        title: "Strategist",
        description: "Coming soon.",
        chapters: [
          {
            id: "strategist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "strategist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "expert",
        title: "Expert",
        description: "Coming soon.",
        chapters: [
          {
            id: "expert-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "expert-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "visionary",
        title: "Visionary",
        description: "Coming soon.",
        chapters: [
          {
            id: "visionary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "visionary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "luminary",
        title: "Luminary",
        description: "Coming soon.",
        chapters: [
          {
            id: "luminary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "luminary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
],
  },
  {
    id: "research",
    title: "Research Papers",
    description: "Deconstruct papers with structured guidance.",
    levels: [
      {
        id: "explorer",
        title: "Explorer",
        description: "Learn how to read papers.",
        chapters: [
          {
            id: "reading",
            title: "Paper Reading",
            description: "Abstract to method flow.",
            topics: [
              {
                id: "paper-anatomy",
                title: "Paper Anatomy",
                summary: "What each section does.",
                assessmentPrompt: "Summarize the purpose of a paper's method section.",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
    
      {
        id: "apprentice",
        title: "Apprentice",
        description: "Coming soon.",
        chapters: [
          {
            id: "apprentice-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "apprentice-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "practitioner",
        title: "Practitioner",
        description: "Coming soon.",
        chapters: [
          {
            id: "practitioner-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "practitioner-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "specialist",
        title: "Specialist",
        description: "Coming soon.",
        chapters: [
          {
            id: "specialist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "specialist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "strategist",
        title: "Strategist",
        description: "Coming soon.",
        chapters: [
          {
            id: "strategist-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "strategist-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "expert",
        title: "Expert",
        description: "Coming soon.",
        chapters: [
          {
            id: "expert-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "expert-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "visionary",
        title: "Visionary",
        description: "Coming soon.",
        chapters: [
          {
            id: "visionary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "visionary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },

      {
        id: "luminary",
        title: "Luminary",
        description: "Coming soon.",
        chapters: [
          {
            id: "luminary-chapter-1",
            title: "Coming Soon",
            description: "Placeholder chapter.",
            topics: [
              {
                id: "luminary-topic-1",
                title: "Placeholder Topic",
                summary: "",
                assessmentPrompt: "",
                content: {
                  intro: [],
                  keyIdeas: [],
                  equations: [],
                  references: [],
                },
              },
            ],
          },
        ],
      },
],
  },
];
