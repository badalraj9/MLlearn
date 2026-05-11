import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "recommender-systems",
  title: "Recommender Systems",
  description: "Collaborative filtering and content-based recommendations.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Recommender systems predict which users will prefer which items. The core signal comes either from user-item interactions, such as clicks and ratings, or from metadata about users and items.",
          "A useful beginner picture is the user-item matrix. Most entries are missing, and the system tries to infer which missing entries are likely to be high. This is why recommendations are often framed as matrix completion or ranking problems.",
          "Unlike ordinary classification, the objective is personalized ordering. The system is not only asking whether an item is good, but whether it is good for this user at this moment."
        ],
        keyIdeas: [
          "Collaborative filtering learns from patterns in user-item interactions.",
          "Content-based systems use item or user features to generalize to cold-start cases.",
          "Ranking quality matters more than raw score accuracy in many product settings.",
          "Feedback can be explicit, like ratings, or implicit, like views, clicks, and watch time."
        ],
        equations: [
          "\\[ \\hat{r}_{ui} = p_u^T q_i \\]",
          "\\[ R \\approx P Q^T \\]",
          "\\[ \\text{HitRate@K} = \\frac{1}{N} \\sum_{u=1}^{N} \\mathbf{1}[\\text{relevant item in top-}K] \\]"
        ],
        references: [
          "Ricci, Rokach, Shapira - Recommender Systems Handbook",
          "Koren, Bell, Volinsky (2009) - Matrix Factorization Techniques for Recommender Systems"
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "In practice, recommender systems are pipelines with candidate generation, filtering, and ranking stages. The first stage narrows millions of items to a manageable set; the second predicts the best ordering for the current context.",
          "Implicit feedback is common but tricky. A skipped video is not necessarily a disliked video, so training data is biased by exposure, position, and prior recommendations.",
          "Offline metrics are useful for iteration, but online behavior is the real test. A model can improve AUC offline while hurting long-term engagement if it over-focuses on short-term clicks."
        ],
        keyIdeas: [
          "Two-tower encoders are common for large-scale candidate retrieval.",
          "Negative sampling strategy affects what the model learns about ranking.",
          "Features such as recency, popularity, and context often matter alongside embeddings.",
          "A-B tests must watch for diversity, novelty, and ecosystem effects, not just CTR."
        ],
        equations: [
          "\\[ s(u, i) = f_u(x_u)^T f_i(x_i) \\]",
          "\\[ L_{\\text{BPR}} = -\\log \\sigma(\\hat{r}_{u,i^+} - \\hat{r}_{u,i^-}) \\]",
          "\\[ \\text{NDCG@K} = \\frac{1}{\\mathrm{IDCG@K}} \\sum_{j=1}^{K} \\frac{2^{rel_j} - 1}{\\log_2(j + 1)} \\]"
        ],
        references: [
          "Covington, Adams, Sargin (2016) - Deep Neural Networks for YouTube Recommendations",
          "Rendle et al. (2009) - BPR: Bayesian Personalized Ranking from Implicit Feedback"
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced recommendation is a sequential decision problem. The system affects what users see, which changes future data, which then changes the model. This creates feedback loops that standard supervised learning does not capture well.",
          "Modern research focuses on causal recommendation, slate optimization, long-term value, and fairness to creators or items. Optimizing only immediate clicks can collapse diversity and hurt both users and the broader platform.",
          "The most capable systems integrate graph structure, session dynamics, and uncertainty. They model not just preference, but exposure, drift, and the economic tradeoffs of who gets recommended."
        ],
        keyIdeas: [
          "Exposure bias means observed interactions are shaped by previous recommendations.",
          "Sequential and session-based models capture evolving short-term intent.",
          "Causal methods attempt to separate preference from exposure artifacts.",
          "Multi-objective recommendation balances relevance, diversity, novelty, and business goals."
        ],
        equations: [
          "\\[ \\mathbb{E}[Y \\mid do(E = 1)] \\neq \\mathbb{E}[Y \\mid E = 1] \\]",
          "\\[ \\max_\\pi \\; \\mathbb{E}\\left[ \\sum_{t=1}^{T} \\gamma^{t-1} r_t \\right] \\]",
          "\\[ p(i_t \\mid u, i_{<t}, c_t) \\]"
        ],
        references: [
          "Joachims, Swaminathan, Schnabel (2017) - Unbiased Learning-to-Rank with Biased Feedback",
          "Quadrana et al. (2018) - Sequence-Aware Recommender Systems"
        ],
      },
    },
  ],
};

export default chapter;
