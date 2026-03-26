import json

deep_research = {
    "id": "deep-research",
    "title": "Deep Learning Research",
    "description": "Advanced topics in deep learning research: autoencoders, representation learning, and generative models.",
    "levels": [
      {
        "id": "foundations",
        "title": "Research Foundations",
        "description": "Core algorithms for representation and unsupervised learning.",
        "chapters": [
          {
            "id": "autoencoders",
            "title": "Autoencoders",
            "description": "Neural networks trained to copy their input to their output.",
            "topics": [
              {
                "id": "undercomplete",
                "title": "Undercomplete Autoencoders",
                "summary": "Learning a compressed representation.",
                "assessmentPrompt": "Explain the purpose of an undercomplete autoencoder.",
                "content": {
                  "intro": [
                    "An autoencoder is a neural network that is trained to attempt to copy its input to its output.",
                    "Internally, it has a hidden layer h that describes a code used to represent the input.",
                    "The network may be viewed as consisting of two parts: an encoder function h = f(x) and a decoder that produces a reconstruction r = g(h)."
                  ],
                  "keyIdeas": [
                    "By penalizing the network according to the reconstruction error, the model learns the most important attributes of the training data.",
                    "If the hidden code h has smaller dimension than the input x, the autoencoder is called undercomplete."
                  ],
                  "equations": [
                    "L(x, g(f(x)))"
                  ],
                  "references": ["autoencoders.html"]
                }
              },
              {
                "id": "regularized",
                "title": "Regularized Autoencoders",
                "summary": "Autoencoders with sparsity or robustness constraints.",
                "assessmentPrompt": "How do regularized autoencoders prevent overfitting?",
                "content": {
                  "intro": [
                    "Regularized autoencoders use a loss function that encourages the model to have other properties besides the ability to copy its input to its output.",
                    "These include sparsity of the representation, smallness of the derivative of the representation, and robustness to noise or to missing inputs."
                  ],
                  "keyIdeas": [
                    "A sparse autoencoder is simply an autoencoder whose training criterion involves a sparsity penalty on the code layer h.",
                    "Denoising autoencoders (DAE) minimize the reconstruction error from a corrupted version of the input."
                  ],
                  "equations": [
                    "L(x, g(f(\\tilde{x})))"
                  ],
                  "references": ["autoencoders.html"]
                }
              }
            ]
          },
          {
            "id": "representation",
            "title": "Representation Learning",
            "description": "Learning features and abstractions from data.",
            "topics": [
              {
                "id": "greedy-layer-wise",
                "title": "Greedy Layer-Wise Unsupervised Pretraining",
                "summary": "Training deep networks one layer at a time.",
                "assessmentPrompt": "What is the motivation behind greedy layer-wise unsupervised pretraining?",
                "content": {
                  "intro": [
                    "Unsupervised pretraining consists of training each layer of a deep network using an unsupervised learning criterion.",
                    "Each layer is trained to produce a representation of the output of the previous layer."
                  ],
                  "keyIdeas": [
                    "This approach was initially used to overcome the difficulties of training deep neural networks from random initialization.",
                    "It acts as a regularizer, initializing the parameters in a region of parameter space that corresponds to better generalization."
                  ],
                  "equations": [],
                  "references": ["representation.html"]
                }
              },
              {
                "id": "transfer-learning",
                "title": "Transfer Learning",
                "summary": "Applying knowledge from one task to another.",
                "assessmentPrompt": "Explain the concept of transfer learning.",
                "content": {
                  "intro": [
                    "Transfer learning and domain adaptation refer to the situation where what has been learned in one setting is exploited to improve generalization in another setting.",
                    "In deep learning, transfer learning is often achieved by initializing a network with weights pretrained on a large dataset."
                  ],
                  "keyIdeas": [
                    "The lower layers of a deep network often learn general features (like edges in images) that are useful across many tasks.",
                    "Fine-tuning allows adapting these general features to the specific target domain."
                  ],
                  "equations": [],
                  "references": ["representation.html"]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "probabilistic",
        "title": "Probabilistic Models",
        "description": "Graphical models and approximate inference.",
        "chapters": [
          {
            "id": "graphical-models",
            "title": "Structured Probabilistic Models",
            "description": "Describing probability distributions with graphs.",
            "topics": [
              {
                "id": "directed-models",
                "title": "Directed Graphical Models",
                "summary": "Belief networks and causal relationships.",
                "assessmentPrompt": "What does a directed edge signify in a Bayesian network?",
                "content": {
                  "intro": [
                    "Directed graphical models, also known as Bayesian networks or belief networks, are probabilistic graphical models using a directed acyclic graph (DAG) to map out conditional dependencies.",
                    "They provide a compact representation for joint probability distributions."
                  ],
                  "keyIdeas": [
                    "Each variable is independent of its non-descendants given its parents in the graph.",
                    "They are particularly useful for representing causal relationships between variables."
                  ],
                  "equations": [
                    "p(x) = \\prod_i p(x_i | Pa(x_i))"
                  ],
                  "references": ["graphical_models.html"]
                }
              },
              {
                 "id": "undirected-models",
                "title": "Undirected Graphical Models",
                "summary": "Markov random fields.",
                "assessmentPrompt": "How do undirected graphical models represent the joint probability?",
                "content": {
                  "intro": [
                   "Undirected graphical models, or Markov Random Fields (MRFs), use an undirected graph to model dependencies.",
                   "They are used when the relationships between variables are symmetric and do not have a clear causal direction, such as neighboring pixels in an image."
                  ],
                  "keyIdeas": [
                   "The joint probability is defined as a product of clique potentials over the maximal cliques of the graph, normalized by a partition function Z.",
                   "Computing Z is often computationally intractable, which motivates the need for approximate inference methods."
                  ],
                  "equations": [
                   "p(x) = \\frac{1}{Z} \\prod_C \\psi_C(x_C)"
                  ],
                  "references": ["graphical_models.html"]
                }
              }
            ]
          },
          {
            "id": "inference",
            "title": "Approximate Inference",
            "description": "Dealing with intractable posterior distributions.",
            "topics": [
              {
                "id": "variational-inference",
                "title": "Variational Inference",
                "summary": "Optimization-based approximation.",
                "assessmentPrompt": "Describe the core idea of Variational Inference.",
                "content": {
                  "intro": [
                   "Variational inference approaches the problem of intractable inference by casting it as an optimization problem.",
                   "We define a family of simpler, tractable distributions q and try to find the member of this family that is closest to the true posterior p."
                  ],
                  "keyIdeas": [
                   "The closeness is typically measured using the Kullback-Leibler (KL) divergence.",
                   "Minimizing the KL divergence is equivalent to maximizing the Evidence Lower Bound (ELBO)."
                  ],
                  "equations": [
                   "\\text{ELBO} = \\mathbb{E}_{q}[\\log p(x,z)] - \\mathbb{E}_{q}[\\log q(z)]"
                  ],
                  "references": ["inference.html"]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "generative",
        "title": "Generative Models",
        "description": "Models that learn to generate new data samples.",
        "chapters": [
          {
            "id": "gans",
            "title": "Generative Adversarial Networks",
            "description": "Adversarial training for generative modeling.",
            "topics": [
              {
                "id": "gan-framework",
                "title": "The GAN Framework",
                "summary": "Generator vs. Discriminator.",
                "assessmentPrompt": "Describe the minimax game played by the generator and discriminator in a GAN.",
                "content": {
                  "intro": [
                    "Generative Adversarial Networks (GANs) are based on a game theoretic scenario in which the generator network must compete against an adversary.",
                    "The generator network directly produces samples, while its adversary, the discriminator network, attempts to distinguish between samples drawn from the training data and samples drawn from the generator."
                  ],
                  "keyIdeas": [
                    "The discriminator is trained to maximize the probability of assigning the correct label to both training examples and generated examples.",
                    "The generator is trained to minimize the log-probability of the discriminator being correct."
                  ],
                  "equations": [
                    "\\min_G \\max_D V(D, G) = \\mathbb{E}_{x \\sim p_{data}}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z}[\\log(1 - D(G(z)))]"
                  ],
                  "references": ["generative_models.html"]
                }
              }
            ]
          },
          {
            "id": "vaes",
            "title": "Variational Autoencoders",
            "description": "Probabilistic spin on autoencoders.",
            "topics": [
              {
                "id": "vae-framework",
                "title": "The VAE Framework",
                "summary": "Variational lower bound and latent variables.",
                "assessmentPrompt": "How does a Variational Autoencoder differ from a standard autoencoder?",
                "content": {
                  "intro": [
                    "The Variational Autoencoder (VAE) is a directed model that uses a learned approximate inference model.",
                    "Instead of deterministically encoding an input to a single point, a VAE encodes it as a distribution over the latent space."
                  ],
                  "keyIdeas": [
                    "The model is trained by maximizing the variational lower bound (ELBO) on the log-likelihood of the data.",
                    "The reparameterization trick allows backpropagation through the stochastic sampling process."
                  ],
                  "equations": [
                    "\\mathcal{L}(\\theta, \\phi; x) = \\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)] - D_{KL}(q_\\phi(z|x) || p(z))"
                  ],
                  "references": ["generative_models.html"]
                }
              }
            ]
          }
        ]
      }
    ]
}

applied_ml = {
    "id": "applied-ml",
    "title": "Applied Machine Learning",
    "description": "Practical hands-on machine learning projects and techniques.",
    "levels": [
      {
        "id": "fundamentals",
        "title": "ML Fundamentals",
        "description": "End-to-End Projects and Classification.",
        "chapters": [
          {
            "id": "end-to-end",
            "title": "End-to-End ML Project",
            "description": "Walking through a real-world machine learning pipeline.",
            "topics": [
              {
                "id": "data-prep",
                "title": "Data Preparation",
                "summary": "Cleaning and scaling data.",
                "assessmentPrompt": "Why is feature scaling important before training models?",
                "content": {
                  "intro": [
                    "It's crucial to prepare the data for Machine Learning algorithms.",
                    "You should write functions for this purpose, which will allow you to reproduce these transformations easily on any dataset."
                  ],
                  "keyIdeas": [
                    "Data cleaning involves handling missing features, for instance by imputing the median value.",
                    "Feature scaling methods like Standardization and Min-Max scaling ensure all features have a similar scale, which is essential for algorithms like SVMs and Gradient Descent."
                  ],
                  "equations": [
                    "x_{scaled} = \\frac{x - \\mu}{\\sigma}"
                  ],
                  "references": ["o'really hands on machine learning.pdf"]
                }
              },
              {
                "id": "model-eval",
                "title": "Model Evaluation & Tuning",
                "summary": "Cross-validation and Grid Search.",
                "assessmentPrompt": "What is the purpose of Grid Search?",
                "content": {
                  "intro": [
                    "Once you have a shortlist of promising models, you need to fine-tune them.",
                    "You can evaluate your models using techniques like cross-validation to get robust estimates of performance on unseen data."
                  ],
                  "keyIdeas": [
                    "Grid Search is used to systematically evaluate all possible combinations of hyperparameters.",
                    "Randomized Search is often preferred when the hyperparameter search space is large."
                  ],
                  "equations": [],
                  "references": ["o'really hands on machine learning.pdf"]
                }
              }
            ]
          },
          {
            "id": "classification",
            "title": "Classification",
            "description": "Binary and Multiclass classification systems.",
            "topics": [
              {
                "id": "performance-metrics",
                "title": "Performance Measures",
                "summary": "Precision, Recall, and ROC.",
                "assessmentPrompt": "Explain the difference between Precision and Recall.",
                "content": {
                  "intro": [
                   "Evaluating a classifier is often significantly trickier than evaluating a regressor, due to the nuances of false positives and false negatives.",
                   "Accuracy is generally not the preferred performance measure for classifiers, especially dealing with skewed datasets."
                  ],
                  "keyIdeas": [
                   "Precision is the accuracy of the positive predictions.",
                   "Recall (or sensitivity) is the ratio of positive instances that are correctly detected by the classifier.",
                   "The F1 score is the harmonic mean of precision and recall."
                  ],
                  "equations": [
                   "Precision = \\frac{TP}{TP + FP}",
                   "Recall = \\frac{TP}{TP + FN}"
                  ],
                  "references": ["o'really hands on machine learning.pdf"]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "ensembles",
        "title": "Decision Trees & Ensembles",
        "description": "Building powerful models with Random Forests.",
        "chapters": [
          {
            "id": "random-forests",
            "title": "Random Forests",
            "description": "Aggregating predictions of many trees.",
            "topics": [
              {
                 "id": "bagging",
                "title": "Bagging and Pasting",
                "summary": "Training predictors on different random subsets.",
                "assessmentPrompt": "What is the main benefit of ensemble bagging?",
                "content": {
                  "intro": [
                   "One way to get a diverse set of classifiers is to use the same training algorithm for every predictor, but to train them on different random subsets of the training set.",
                   "When sampling is performed with replacement, it is called bagging. When sampling without replacement, it is called pasting."
                  ],
                  "keyIdeas": [
                   "By aggregating the predictions of all predictors, the ensemble often achieves a similar bias but a lower variance than a single predictor.",
                   "Random Forests further inject randomness by searching for the best feature among a random subset of features when splitting a node."
                  ],
                  "equations": [],
                  "references": ["o'really hands on machine learning.pdf"]
                }
              }
            ]
          }
        ]
      }
    ]
}


def add_modules_to_file():
    filepath = 'src/content/modules.ts'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the closing bracket of the modules array
    import re
    match = re.search(r'\n\];\s*$', content)
    if not match:
        print("Could not find end of modules array.")
        return

    end_index = match.start()
    
    # Check if they are already there to prevent duplication
    if "deep-research" in content or "applied-ml" in content:
        print("Modules already exist!")
        return
        
    # Serialize to formatted JSON with indentation
    m1 = json.dumps(deep_research, indent=4)
    m2 = json.dumps(applied_ml, indent=4)
    
    # We need to correct the indentation of the JSON string to match the file
    # We can just prefix with "  ,"
    append_str = f",\n{m1},\n{m2}"
    
    # Replace the \n in the string with \n  to fix indentation
    append_str = append_str.replace('\n', '\n  ')
    
    new_content = content[:end_index] + append_str + "\n];\n"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Successfully added new modules.")

if __name__ == '__main__':
    add_modules_to_file()
