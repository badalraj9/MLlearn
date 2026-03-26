import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "pruning",
  title: "Pruning",
  description: "Removing unnecessary parameters from trained models.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Pruning removes unnecessary weights or structures from a model to reduce size and speed up inference.",
          "Unstructured pruning removes individual weights, while structured pruning removes channels, filters, or blocks.",
          "Pruning is often followed by fine-tuning to recover accuracy.",
        ],
        keyIdeas: [
          "Magnitude pruning removes small weights",
          "Structured pruning yields real hardware speedups",
          "Iterative pruning outperforms one-shot pruning",
          "Sparsity can reduce memory and compute",
          "Pruning can act as regularization",
          "Fine-tuning is critical after pruning",
        ],
        equations: [
          "\\[ W' = W \\odot M \\quad (M \\in \\{0,1\\}) \\]",
          "\\[ \\text{Sparsity} = 1 - \\frac{\\|M\\|_0}{\\text{total weights}} \\]",
          "\\[ \\mathcal{L} = \\mathcal{L}_{task} + \\lambda \\|W\\|_1 \\]",
        ],
        references: [
          "Han et al. (2015) - Learning Both Weights and Connections",
          "Frankle and Carbin (2019) - The Lottery Ticket Hypothesis",
          "Gale et al. (2019) - State of Sparsity in Deep Learning",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Structured pruning removes entire filters or channels to reduce compute, which maps better to hardware.",
          "Importance scores can be based on weight magnitude, gradients, or second-order approximations.",
          "Pruning schedules control when and how aggressively parameters are removed.",
        ],
        keyIdeas: [
          "Channel pruning reduces FLOPs in conv layers",
          "Second-order methods estimate sensitivity to removal",
          "Global pruning allows cross-layer tradeoffs",
          "Layer-wise pruning can preserve stability",
          "Sparsity patterns affect kernel efficiency",
          "Pruning can be combined with quantization",
        ],
        equations: [
          "\\[ \\Delta \\mathcal{L} \\approx \\tfrac{1}{2} w_i^2 H_{ii} \\]",
          "\\[ \\text{FLOPs} \\propto \\sum_l k_l^2 c_{in} c_{out} h w \\]",
          "\\[ s_t = s_{final} + (s_{init} - s_{final}) (1 - t/T)^3 \\]",
        ],
        references: [
          "Molchanov et al. (2019) - Importance Estimation for Pruning",
          "Li et al. (2017) - Pruning Filters for Efficient ConvNets",
          "Zhu and Gupta (2017) - To Prune, or Not to Prune",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Sparse training learns sparse networks from the start, reducing training cost and memory.",
          "Dynamic sparse training updates the sparsity pattern during training to preserve accuracy.",
          "Hardware support determines whether sparsity translates into real speedups.",
        ],
        keyIdeas: [
          "Dynamic sparsity adapts masks during training",
          "Lottery ticket subnetworks can match dense accuracy",
          "Sparse matrix formats affect runtime performance",
          "Structured sparsity is easier to accelerate",
          "Gradient sparsity can reduce communication cost",
          "Pruning can impact calibration and robustness",
        ],
        equations: [
          "\\[ M_{t+1} = \\text{update}(M_t, \\nabla W) \\]",
          "\\[ \\text{Density} = 1 - \\text{Sparsity} \\]",
          "\\[ \\text{Speedup} \\le \\frac{1}{1-\\text{Sparsity}} \\]",
        ],
        references: [
          "Evci et al. (2020) - Rigging the Lottery",
          "Gale et al. (2019) - State of Sparsity in Deep Learning",
          "Nvidia - Structured Sparsity in Ampere GPUs",
        ],
      },
    },
  ],
};

export default chapter;
