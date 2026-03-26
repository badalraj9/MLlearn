import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "cv-projects",
  title: "Computer Vision Projects",
  description: "Practical image classification, detection, and segmentation.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Computer vision projects turn images into structured predictions. The main families are classification, where the model assigns one label to the whole image, detection, where it localizes objects with boxes, and segmentation, where it predicts a label for each pixel.",
          "The hard part is not only fitting a model but defining the prediction target clearly. A pet classifier, a pedestrian detector, and a tumor segmenter all see images, but they require different labels, metrics, and data pipelines.",
          "A useful mental model is that vision systems build invariances. Good models learn to ignore lighting changes, small translations, and background clutter while preserving the geometry and texture cues that matter for the task."
        ],
        keyIdeas: [
          "Classification predicts one label per image, detection predicts boxes plus labels, and segmentation predicts dense masks.",
          "Dataset quality often matters more than architecture novelty in small and medium-sized vision projects.",
          "Augmentation helps models learn invariances that are likely to appear at inference time.",
          "Evaluation should match the task: accuracy for classification, mAP for detection, and IoU or Dice for segmentation."
        ],
        equations: [
          "\\[ \\text{Accuracy} = \\frac{\\text{correct predictions}}{\\text{total predictions}} \\]",
          "\\[ \\text{IoU}(A, B) = \\frac{|A \\cap B|}{|A \\cup B|} \\]",
          "\\[ \\text{Dice} = \\frac{2|A \\cap B|}{|A| + |B|} \\]"
        ],
        references: [
          "Goodfellow, Bengio, Courville - Deep Learning, Chapter 9",
          "Howard & Gugger - Deep Learning for Coders, computer vision chapters"
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "A practical vision workflow starts with label design, train-validation-test splits, and careful image normalization. If classes are imbalanced or labels are noisy, the model will expose those weaknesses immediately.",
          "Transfer learning is usually the right default. Fine-tuning a pretrained backbone like ResNet, EfficientNet, or ViT often beats training from scratch unless you have a very large in-domain dataset.",
          "For deployment, the full system matters: resizing strategy, confidence thresholds, post-processing, and latency budgets can affect outcomes more than a small gain in benchmark accuracy."
        ],
        keyIdeas: [
          "Pretrained encoders reduce data requirements and speed up convergence.",
          "Object detection pipelines balance classification loss, localization loss, and non-maximum suppression.",
          "Segmentation models often need tiling, class weighting, or patch sampling for large medical or satellite images.",
          "Error analysis should separate failures from blur, occlusion, class confusion, and annotation mistakes."
        ],
        equations: [
          "\\[ L_{\\text{det}} = L_{\\text{cls}} + \\lambda L_{\\text{box}} \\]",
          "\\[ \\text{mAP} = \\frac{1}{K} \\sum_{k=1}^{K} AP_k \\]",
          "\\[ \\hat{y} = \\arg\\max_c \\, p(c \\mid x) \\]"
        ],
        references: [
          "Ren et al. (2015) - Faster R-CNN",
          "He et al. (2017) - Mask R-CNN",
          "Dosovitskiy et al. (2020) - An Image is Worth 16x16 Words"
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced vision projects combine representation learning, weak supervision, and multimodal grounding. Modern systems may use self-supervised pretraining, detection transformers, and text-image alignment rather than a single supervised CNN.",
          "Distribution shift is a central challenge. A model trained on clean daytime images can fail badly in rain, at night, or on data from a different camera, so robustness and calibration must be treated as first-class project goals.",
          "At scale, vision engineering becomes a continual-learning problem: datasets evolve, annotation policies drift, and active learning or human review loops become necessary to keep performance stable."
        ],
        keyIdeas: [
          "Self-supervised pretraining can learn strong visual features before labels are introduced.",
          "Transformer-based detectors replace hand-designed anchors with set prediction and bipartite matching.",
          "Open-vocabulary and multimodal vision systems use text embeddings to generalize beyond fixed label sets.",
          "Calibration, fairness, and domain adaptation matter in safety-critical deployments."
        ],
        equations: [
          "\\[ L_{\\text{set}} = \\sum_i \\ell(y_i, \\hat{y}_{\\sigma(i)}) \\quad \\text{with Hungarian matching } \\sigma \\]",
          "\\[ p_{\\tau}(y \\mid x) = \\text{softmax}(z / \\tau) \\]",
          "\\[ \\min_f \\; \\mathbb{E}_{(x,y) \\sim P_{\\text{source}}}[\\ell(f(x), y)] + \\gamma \\, D(P_{\\text{source}}, P_{\\text{target}}) \\]"
        ],
        references: [
          "Carion et al. (2020) - End-to-End Object Detection with Transformers",
          "Radford et al. (2021) - Learning Transferable Visual Models From Natural Language Supervision",
          "Wang & Deng (2018) - Deep Visual Domain Adaptation: A Survey"
        ],
      },
    },
  ],
};

export default chapter;
