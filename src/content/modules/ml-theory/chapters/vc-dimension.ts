import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "vc-dimension",
  title: "VC Dimension",
  description: "Measuring hypothesis class capacity.",
  prerequisites: ["pac-definition"],
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "VC dimension measures the expressive power of a hypothesis class by asking how many points it can shatter. To shatter a set means the model class can realize every possible labeling of those points.",
          "That idea matters because it converts a vague notion of model flexibility into a concrete combinatorial quantity. A class with larger VC dimension can fit more labeling patterns and therefore needs more data to generalize safely.",
          "The core examples are intuitive: a threshold on the line has VC dimension 1, intervals on the line have VC dimension 2, and linear separators in d dimensions have VC dimension d+1.",
        ],
        keyIdeas: [
          "A set is shattered if every binary labeling can be represented by the hypothesis class.",
          "VC dimension is the size of the largest set that can be shattered.",
          "Higher VC dimension usually means greater expressive power and greater overfitting risk.",
          "VC dimension is a property of the hypothesis class, not a trained model instance.",
        ],
        equations: [
          "\\[ VC(H) = \\max\\{m : \\exists S, |S|=m, \\; H \\text{ shatters } S\\} \\]",
          "\\[ |\\{(h(x_1), \\dots, h(x_m)) : h \\in H\\}| = 2^m \\quad \\text{for shattering} \\]",
          "\\[ VC(\\text{linear separators in } \\mathbb{R}^d) = d+1 \\]",
        ],
        ahaInsights: [
          "VC dimension does not ask whether a model can fit one dataset. It asks whether the class can fit every labeling of some dataset.",
          "Capacity is about the richness of possible decisions, not about parameter count alone.",
        ],
        equationSteps: [
          {
            latex: "\\[ S = \\{x_1, \\dots, x_m\\} \\]",
            explanation: "Choose a set of m input points.",
          },
          {
            latex: "\\[ y \\in \\{0,1\\}^m \\]",
            explanation: "Consider all possible binary labelings of those points.",
          },
          {
            latex: "\\[ \\forall y, \\exists h \\in H \\text{ such that } h(x_i)=y_i \\]",
            explanation: "If the class can realize every labeling, then it shatters the set.",
          },
          {
            latex: "\\[ VC(H) = \\text{largest } m \\text{ for which such a set exists} \\]",
            explanation: "The VC dimension is the maximum size of a shattered set.",
          },
        ],
        quiz: [
          {
            id: "vc-foundation-1",
            question: "What does it mean for a hypothesis class to shatter a set of points?",
            options: [
              "It can realize every possible binary labeling of those points",
              "It can classify the points perfectly for one labeling only",
              "It minimizes the training loss to zero",
              "It has more parameters than points",
            ],
            correctIndex: 0,
            explanation: "Shattering requires covering all binary label assignments, not just one.",
          },
          {
            id: "vc-foundation-2",
            question: "What is the VC dimension of thresholds on the real line?",
            options: ["1", "2", "3", "Infinite"],
            correctIndex: 0,
            explanation: "A single threshold can shatter one point but not two arbitrary points under every labeling.",
          },
        ],
        references: [
          "Shalev-Shwartz & Ben-David - Understanding Machine Learning",
          "Mohri, Rostamizadeh, Talwalkar - Foundations of Machine Learning",
        ],
      },
      playground: {
        type: "slider",
        graphFn: "d + 1",
        sliders: [
          { id: "d", label: "Input dimension", min: 1, max: 20, step: 1, default: 2 },
        ],
        xRange: [0, 20],
        yRange: [0, 25],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "VC dimension matters because it enters sample complexity and generalization bounds. If a class is too expressive relative to the amount of data, empirical risk minimization can fit random labels and still say nothing useful about future performance.",
          "In practice, VC dimension is easiest to use as a conceptual tool rather than a direct engineering number. It explains why flexible classes need more data and why structural restrictions can improve generalization.",
          "It also clarifies why simple models can still be powerful when the problem structure matches their inductive bias. Capacity should be compared to the task, not maximized blindly.",
        ],
        keyIdeas: [
          "Generalization bounds worsen as VC dimension grows.",
          "Sample complexity scales with both target accuracy and class capacity.",
          "Restricting the hypothesis class can improve reliability on finite datasets.",
          "VC dimension is most useful for reasoning about learnability, not for micro-tuning architecture choices.",
        ],
        equations: [
          "\\[ R(h) \\leq \\hat{R}(h) + O\\left(\\sqrt{\\frac{VC(H) \\log n + \\log(1/\\delta)}{n}}\\right) \\]",
          "\\[ n = O\\left(\\frac{VC(H) + \\log(1/\\delta)}{\\epsilon}\\right) \\]",
          "\\[ \\text{larger capacity} \\Rightarrow \\text{more data required for the same guarantee} \\]",
        ],
        ahaInsights: [
          "VC dimension does not tell you which model will win in practice, but it does tell you why unconstrained flexibility is dangerous with limited data.",
          "The point of capacity control is not to make the model weak. It is to make learning statistically possible.",
        ],
        quiz: [
          {
            id: "vc-applied-1",
            question: "Why does higher VC dimension usually require more data?",
            options: [
              "Because a richer class can fit more label patterns and is harder to constrain statistically",
              "Because large VC dimension increases irreducible noise",
              "Because it forces non-differentiable losses",
              "Because it reduces the number of classes",
            ],
            correctIndex: 0,
            explanation: "More expressive classes need more evidence before we can trust that good training performance reflects real structure.",
          },
        ],
        references: [
          "Vapnik - Statistical Learning Theory",
          "Anthony & Bartlett - Neural Network Learning: Theoretical Foundations",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The advanced story is that VC dimension is foundational but not sufficient for modern deep learning. Deep networks can have enormous or even vacuous classical capacity bounds, yet still generalize well in practice.",
          "That does not mean VC theory was wrong. It means it answers a broad worst-case question, while modern practice often depends on optimization bias, data geometry, margins, and implicit regularization that classical VC dimension does not capture well.",
          "So the right stance is neither to worship VC dimension nor to discard it. It remains one of the clearest entry points into why learning theory must care about capacity at all.",
        ],
        keyIdeas: [
          "VC dimension gives worst-case capacity control, not a complete theory of deep learning.",
          "Modern models often require finer tools such as margins, norms, compression, or data-dependent complexity.",
          "Classical shattering arguments remain foundational for understanding learnability.",
          "VC theory is strongest as a conceptual base layer for more refined bounds.",
        ],
        equations: [
          "\\[ VC(H) \\text{ can be large while practical generalization is still good} \\]",
          "\\[ R(h) \\leq \\hat{R}(h) + \\text{capacity term} \\]",
          "\\[ \\text{modern bounds often replace } VC(H) \\text{ with data-dependent quantities} \\]",
        ],
        quiz: [
          {
            id: "vc-advanced-1",
            question: "Why is VC dimension not the full story for modern deep networks?",
            options: [
              "Because it is a worst-case capacity measure and misses many data-dependent and optimization-dependent effects",
              "Because it applies only to unsupervised learning",
              "Because it cannot be defined for binary classification",
              "Because it ignores labels entirely",
            ],
            correctIndex: 0,
            explanation: "VC dimension is foundational, but deep learning behavior depends on additional structure beyond worst-case shattering capacity.",
          },
        ],
        references: [
          "Vapnik - Statistical Learning Theory",
          "Neyshabur, Bhojanapalli, McAllester, Srebro (2017) - Exploring Generalization in Deep Learning",
          "Bartlett, Foster, Telgarsky (2017) - Spectrally-Normalized Margin Bounds for Neural Networks",
        ],
      },
    },
  ],
};

export default chapter;
