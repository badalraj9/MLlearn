import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "bias-variance-tradeoff",
  title: "Bias-Variance Tradeoff",
  description: "Decomposing generalization error into bias and variance.",
  prerequisites: ["loss-functions", "empirical-risk-minimization"],
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "The bias-variance tradeoff explains why two models can fail for opposite reasons. One model may be too rigid to capture the pattern in the data, while another may be so flexible that it chases random noise.",
          "Bias is the error from systematic underfitting. Variance is the error from being too sensitive to the particular training sample you happened to draw. The best model class usually balances these two pressures.",
          "This is why more complexity is not automatically better. A model can fit the training set more closely while becoming less reliable on new data.",
        ],
        keyIdeas: [
          "High bias means the model is too simple or too constrained.",
          "High variance means the model changes too much across datasets.",
          "Test error often first falls and then rises as complexity increases.",
          "Generalization depends on both approximation quality and stability.",
        ],
        equations: [
          "\\[ \\mathbb{E}[(y - \\hat{f}(x))^2] = \\text{Bias}^2 + \\text{Variance} + \\sigma^2 \\]",
          "\\[ \\text{Bias}(x) = \\mathbb{E}[\\hat{f}(x)] - f(x) \\]",
          "\\[ \\text{Var}(x) = \\mathbb{E}[(\\hat{f}(x) - \\mathbb{E}[\\hat{f}(x)])^2] \\]",
        ],
        ahaInsights: [
          "Overfitting is not 'fitting too well'. It is fitting unstable details that do not repeat on new data.",
          "A more expressive model can reduce bias and increase variance at the same time.",
        ],
        equationSteps: [
          {
            latex: "\\[ y = f(x) + \\epsilon \\]",
            explanation: "Assume the observed target equals the true function plus irreducible noise.",
          },
          {
            latex: "\\[ y - \\hat{f}(x) = f(x) - \\hat{f}(x) + \\epsilon \\]",
            explanation: "Subtract the estimator from both sides.",
          },
          {
            latex: "\\[ \\mathbb{E}[(y - \\hat{f}(x))^2] = \\mathbb{E}[(f(x) - \\hat{f}(x))^2] + \\sigma^2 \\]",
            explanation: "Expand the square and use the fact that the noise has zero mean and variance sigma squared.",
          },
          {
            latex: "\\[ \\mathbb{E}[(f(x) - \\hat{f}(x))^2] = \\text{Bias}^2 + \\text{Variance} \\]",
            explanation: "Split estimator error into a systematic part and a sample-dependent part.",
          },
        ],
        quiz: [
          {
            id: "bv-foundation-1",
            question: "Which failure mode is associated with a model that is too simple to capture the pattern in the data?",
            options: ["High bias", "High variance", "Low noise", "Low capacity collapse"],
            correctIndex: 0,
            explanation: "High bias means the model systematically misses important structure.",
          },
          {
            id: "bv-foundation-2",
            question: "Which component of prediction error cannot be removed even with a perfect model class?",
            options: ["Irreducible noise", "Bias", "Variance", "Regularization"],
            correctIndex: 0,
            explanation: "The noise term reflects randomness in the data-generating process itself.",
          },
        ],
        references: [
          "Hastie, Tibshirani, Friedman - The Elements of Statistical Learning",
          "Bishop - Pattern Recognition and Machine Learning",
        ],
      },
      playground: {
        type: "slider",
        graphFn: "(10/(c+1)) + 0.15*c*c",
        sliders: [
          { id: "c", label: "Model complexity", min: 0, max: 10, step: 0.1, default: 3 },
        ],
        xRange: [0, 10],
        yRange: [0, 12],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In practice, bias and variance show up in familiar model choices. A shallow linear model may have too much bias for a nonlinear task, while a very deep flexible model may have high variance if data is limited or regularization is weak.",
          "Regularization, data augmentation, early stopping, and ensembling all affect this balance. Some techniques primarily reduce variance, some reduce effective bias, and some shift both at once.",
          "A useful operational view is to compare train error and validation error. Large train error suggests bias; a wide train-validation gap suggests variance.",
        ],
        keyIdeas: [
          "Training error and validation error together provide rough diagnostics for bias versus variance.",
          "Regularization methods often reduce variance by constraining flexibility.",
          "More data usually helps variance more than bias.",
          "Feature engineering and richer models are common ways to reduce bias.",
        ],
        equations: [
          "\\[ \\text{generalization gap} = \\hat{R}_{train}(f) - \\hat{R}_{val}(f) \\]",
          "\\[ \\min_f \\hat{R}(f) + \\lambda \\Omega(f) \\]",
          "\\[ \\hat{f}_{ensemble}(x) = \\frac{1}{M} \\sum_{m=1}^{M} \\hat{f}_m(x) \\]",
        ],
        ahaInsights: [
          "Regularization is often a variance-management tool, not just a training heuristic.",
          "More data cannot fix a badly biased model class, but it can make a high-variance model much more usable.",
        ],
        quiz: [
          {
            id: "bv-applied-1",
            question: "If train error is low but validation error is much worse, what is the most likely issue?",
            options: ["High variance", "High bias", "Low capacity", "No noise in the data"],
            correctIndex: 0,
            explanation: "A big train-validation gap is the classic sign of variance-driven overfitting.",
          },
        ],
        references: [
          "Goodfellow, Bengio, Courville - Deep Learning, Chapter 5",
          "Domingos (2012) - A Few Useful Things to Know About Machine Learning",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Modern deep learning complicates the classical picture. Overparameterized models can interpolate the training data and still generalize well, which means the old textbook curve is not the whole story.",
          "That does not make bias and variance irrelevant. It means the decomposition still teaches an essential lesson, but it must be combined with newer ideas about implicit regularization, optimization bias, and double descent.",
          "The right advanced takeaway is that bias-variance is a foundational lens, not a complete theory of modern generalization.",
        ],
        keyIdeas: [
          "The classical tradeoff remains useful but is incomplete for deep learning.",
          "Interpolation does not necessarily imply disastrous generalization.",
          "Implicit regularization changes which high-capacity solutions are actually found.",
          "Double descent extends the classical story rather than simply replacing it.",
        ],
        equations: [
          "\\[ \\text{test error may decrease again beyond interpolation threshold} \\]",
          "\\[ \\hat{f} = \\arg\\min_{f \\in \\mathcal{F}} \\hat{R}(f) \\quad \\text{subject to optimization bias} \\]",
          "\\[ \\text{classical bias-variance} + \\text{implicit bias} \\Rightarrow \\text{modern picture} \\]",
        ],
        quiz: [
          {
            id: "bv-advanced-1",
            question: "What is the best summary of the role of bias-variance in modern deep learning?",
            options: [
              "It is still useful, but it is not a complete explanation of generalization",
              "It is completely obsolete",
              "It exactly predicts all deep learning behavior",
              "It applies only to unsupervised learning",
            ],
            correctIndex: 0,
            explanation: "The classical decomposition remains pedagogically valuable, but modern generalization needs additional ideas.",
          },
        ],
        references: [
          "Belkin et al. (2019) - Reconciling Modern Machine Learning Practice and the Bias-Variance Tradeoff",
          "Nakkiran et al. (2021) - Deep Double Descent",
        ],
      },
    },
  ],
};

export default chapter;
