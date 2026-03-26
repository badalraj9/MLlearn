import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "shap-lime",
  title: "SHAP & LIME",
  description: "Post-hoc explanation methods for any model.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "SHAP and LIME are post-hoc explanation methods. They try to explain why a trained model made a particular prediction without changing the model itself.",
          "LIME works by perturbing the input around one example and fitting a simple local surrogate model, often linear, that approximates the original model in that neighborhood. SHAP uses ideas from cooperative game theory to assign each feature a contribution value.",
          "The key caution is that these methods explain the model, not necessarily the underlying world. If the model relies on a shortcut feature, the explanation may be faithful to the model but still misleading from a domain perspective."
        ],
        keyIdeas: [
          "LIME explains predictions locally using a simple surrogate model.",
          "SHAP attributes a contribution value to each feature based on marginal impact.",
          "Local explanations can differ across nearby examples if the model is unstable.",
          "Interpretability tools are only useful when paired with domain knowledge and validation."
        ],
        equations: [
          "\\[ g(z) \\approx f(x) \\quad \\text{for perturbed samples } z \\text{ near } x \\]",
          "\\[ \\hat{y} \\approx \\phi_0 + \\sum_{j=1}^{M} \\phi_j z_j \\]",
          "\\[ f(x) = \\phi_0 + \\sum_{j=1}^{M} \\phi_j \\]"
        ],
        references: [
          "Ribeiro, Singh, Guestrin (2016) - Why Should I Trust You?: Explaining the Predictions of Any Classifier",
          "Lundberg & Lee (2017) - A Unified Approach to Interpreting Model Predictions"
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In applied work, SHAP and LIME are used for debugging, stakeholder communication, and error analysis. They can reveal when a model overweights spurious proxies, ignores obviously relevant signals, or behaves differently across subgroups.",
          "Choice of background distribution and perturbation scheme matters. In tabular data, naive perturbations can create unrealistic samples; in text or images, the masking strategy strongly affects the explanation.",
          "A good workflow is to combine local explanations with global summaries such as feature importance distributions, dependence plots, and counterfactual checks."
        ],
        keyIdeas: [
          "Explanation quality depends on the perturbation process and the surrogate assumptions.",
          "Correlated features can make attribution unstable or difficult to interpret.",
          "Global summaries over many local explanations are often more useful than a single explanation.",
          "Interpretability should be part of model validation, especially in regulated domains."
        ],
        equations: [
          "\\[ \\xi(x) = \\arg\\min_{g \\in G} L(f, g, \\pi_x) + \\Omega(g) \\]",
          "\\[ \\phi_j = \\sum_{S \\subseteq F \\setminus \\{j\\}} \\frac{|S|!(M-|S|-1)!}{M!} [v(S \\cup \\{j\\}) - v(S)] \\]",
          "\\[ v(S) = \\mathbb{E}[f(X) \\mid X_S = x_S] \\]"
        ],
        references: [
          "Molnar - Interpretable Machine Learning",
          "Slack et al. (2020) - Fooling LIME and SHAP"
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced interpretability work asks deeper questions than feature ranking: are the explanations stable, causally meaningful, and robust to small input changes or retraining. In many systems, that answer is only partly yes.",
          "There is an active distinction between faithfulness and usefulness. A technically faithful explanation may still be hard for humans to act on, while a simple explanation that users like may be an inaccurate summary of the model.",
          "For high-stakes settings, post-hoc explanations are often combined with model simplification, monotonic constraints, causal features, or inherently interpretable models to reduce the gap between explanation and reality."
        ],
        keyIdeas: [
          "Stability under retraining and perturbation is a core diagnostic for explanations.",
          "Feature attribution does not by itself establish causality.",
          "Counterfactual explanations complement attribution by asking what must change to alter a decision.",
          "Interpretability is strongest when it is aligned with domain mechanisms, not just visualization."
        ],
        equations: [
          "\\[ \\Delta_{\\text{stab}} = \\| \\phi(x; f_1) - \\phi(x; f_2) \\| \\]",
          "\\[ x' = \\arg\\min_{z} \\; d(z, x) \\quad \\text{s.t.} \\quad f(z) \\neq f(x) \\]",
          "\\[ \\text{Faithfulness} \\approx \\mathrm{corr}(\\phi_j, \\Delta f_{-j}) \\]"
        ],
        references: [
          "Doshi-Velez & Kim (2017) - Towards a Rigorous Science of Interpretable Machine Learning",
          "Guidotti et al. (2018) - A Survey of Methods for Explaining Black Box Models"
        ],
      },
    },
  ],
};

export default chapter;
