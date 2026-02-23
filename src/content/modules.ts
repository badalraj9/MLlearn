import type { Module } from "@/types";

export const modules: Module[] = [
  {
    "id": "math",
    "title": "Mathematical Foundations",
    "description": "Linear algebra, calculus, probability, and optimization essentials.",
    "levels": [
      {
        "id": "explorer",
        "title": "Explorer",
        "description": "Basic notation and concepts.",
        "chapters": [
          {
            "id": "scalars-vectors",
            "title": "Scalars & Vectors",
            "description": "The building blocks of linear algebra.",
            "topics": [
              {
                "id": "scalars",
                "title": "Scalars",
                "summary": "Single numbers vs arrays.",
                "assessmentPrompt": "Explain the core concept of Scalars and its significance.",
                "content": {
                  "intro": [
                    "2.1 Scalars, V ectors, Matrices and T ensors The study of linear algebra inv olv es several typesof mathematical objects: \u2022 Scalars : A scalar is just a single num ber, in contrast to mostof the other objects studied in linear algebra, which are usually arra ysof multiple num bers.",
                    "We write scalars in italics.",
                    "We usually giv e scalars lowercase variable names."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "A = \u03bb v \ue03e , but we are usually concerned with right eigenvectors",
                    "C = A + B where C i,j = A i,j + B i,j"
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              },
              {
                "id": "vectors",
                "title": "Vectors",
                "summary": "Ordered arrays of numbers.",
                "assessmentPrompt": "Explain the core concept of Vectors and its significance.",
                "content": {
                  "intro": [
                    "\u2022 V ectors : A vector is an array of numbers.",
                    "T ypically we give vectors lo wercase names in bold typeface, suchas x .",
                    "The elementsof the vector are identified by writing its name in italic typeface, with a subscript."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "n = b 1 (2",
                    "z = \u03b1 x + (1 \u2212 \u03b1 ) y (2"
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              },
              {
                "id": "matrices",
                "title": "Matrices",
                "summary": "2D arrays of numbers.",
                "assessmentPrompt": "Explain the core concept of Matrices and its significance.",
                "content": {
                  "intro": [
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 ).",
                    "\u2022 Matrices : A matrix is a 2-D array of numbers, so each element is identified by t w o indices instead of justone.",
                    "If a real-valued matrix A has a heightof m and a width of n , then we sa y that A \u2208 R m \u00d7 n ."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "n = b 1 (2",
                    "A = \u03bb v \ue03e , but we are usually concerned with right eigenvectors"
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              },
              {
                "id": "tensors",
                "title": "Tensors",
                "summary": "Arrays with >2 axes.",
                "assessmentPrompt": "Explain the core concept of Tensors and its significance.",
                "content": {
                  "intro": [
                    "In the general case, an array of numbers arranged on a regular grid with a variable number of axes is known as a tensor.",
                    "We denote a tensor named \u201cA\u201d with this typeface: A ."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              }
            ]
          },
          {
            "id": "prob-basics",
            "title": "Probability Basics",
            "description": "Dealing with uncertainty.",
            "topics": [
              {
                "id": "random-vars",
                "title": "Random Variables",
                "summary": "Variables with uncertain values.",
                "assessmentPrompt": "Explain the core concept of Random Variables and its significance.",
                "content": {
                  "intro": [
                    "3.2 Random V ariables A random variable is a variable that can take on different values randomly .",
                    "We typically denote the random variable itself with a lo wercase letter in plain t yp eface, and the values it can tak e on with lowercase script letters.",
                    "F or example, x 1 and x 2 are b oth possible values that the random variable x can take on."
                  ],
                  "keyIdeas": [
                    "We typically denote the random variable itself with a lo wercase letter in plain t yp eface, and the values it can tak e on with lowercase script letters.",
                    "Note that these states are not necessarily the integers; they can also just be named states that are not considered to hav e any numerical value.",
                    "We typically denote probability mass functions with a capital P ."
                  ],
                  "equations": [
                    "j = Co v( x i , x j )",
                    "x = x, y = y ) = p ( x = x ) p ( y = y )"
                  ],
                  "references": [
                    "_prob.txt"
                  ]
                }
              },
              {
                "id": "distributions",
                "title": "Distributions",
                "summary": "How likely states are.",
                "assessmentPrompt": "Explain the core concept of Distributions and its significance.",
                "content": {
                  "intro": [
                    "While probability theory allows us to make uncertain statements and toreason in the presence of uncertain t y , information theory enables us to quantify the amoun tof uncertain t y in a probability distribution.",
                    "On itsown, a random variable is just a descriptionof the states that are possible; it must be coupled with a probability distribution that sp eci\ufb01eshow lik ely eac h of these states are.",
                    "3.3 Probability Distributions A probability distribution is a descriptionof ho w likely a random variable or setof random variables is to take on each ofits possible states."
                  ],
                  "keyIdeas": [
                    "We typically denote the random variable itself with a lo wercase letter in plain t yp eface, and the values it can tak e on with lowercase script letters.",
                    "Note that these states are not necessarily the integers; they can also just be named states that are not considered to hav e any numerical value.",
                    "We typically denote probability mass functions with a capital P ."
                  ],
                  "equations": [
                    "i =1 \u03b4 ( x \u2212 x ( i ) ) (3",
                    "x = x i ) = \ue058 i 1 k = k k"
                  ],
                  "references": [
                    "_prob.txt"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "apprentice",
        "title": "Apprentice",
        "description": "Operations and transformations.",
        "chapters": [
          {
            "id": "matrix-ops",
            "title": "Matrix Operations",
            "description": "Multiplying and manipulating matrices.",
            "topics": [
              {
                "id": "transpose",
                "title": "Transpose",
                "summary": "Flipping matrices.",
                "assessmentPrompt": "Explain the core concept of Transpose and its significance.",
                "content": {
                  "intro": [
                    "One imp ortantoperationon matrices is the transpose .",
                    "The transpose of a matrix is the mirror image of the matrix across a diagonal line, called the main diagonal , running do wn and to the righ t, starting from its upp er left corner.",
                    "We denote the transpose of a matrix A as A \ue03e , and it is de\ufb01ned such that ( A \ue03e ) i,j = A j,i ."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "y = \ue010 x \ue03e y \ue011 \ue03e = y \ue03e x",
                    "A = A \ue03e"
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              },
              {
                "id": "matrix-product",
                "title": "Matrix Product",
                "summary": "Composing linear maps.",
                "assessmentPrompt": "Explain the core concept of Matrix Product and its significance.",
                "content": {
                  "intro": [
                    "If eac h element is in R , and the vector has n elements, then the vector lies in the set formed by taking the Cartesian productof R n times, denoted as R n .",
                    "2.2 Multiplying Matrices and V ectors One of the most imp ortantoperations inv olving matrices is multiplicationof tw o matrices.",
                    "The matrix productof matrices A and B is a third matrix C ."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "n = b 1 (2",
                    "y = y \ue03e x"
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              },
              {
                "id": "identity-inverse",
                "title": "Identity & Inverse",
                "summary": "Reversing transformations.",
                "assessmentPrompt": "Explain the core concept of Identity & Inverse and its significance.",
                "content": {
                  "intro": [
                    "(2.29) F or square matrices, the left inv erse and righ t inverse are equal.",
                    "LINEAR ALGEBRA so orthogonal matrices are of interest because their inverse is very cheap to compute.",
                    "2.9 The Mo ore-P enrose Pseudoinverse Matrix inversion is not de\ufb01ned for matrices that are not square."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "p = \ue020 \ue058 i | x i | p \ue021 1 p (2",
                    "x = A + y with minimal Euclidean norm || x || 2 among all possible solutions"
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              }
            ]
          },
          {
            "id": "prob-rules",
            "title": "Probability Rules",
            "description": "Calculus of probability.",
            "topics": [
              {
                "id": "marginal",
                "title": "Marginal Probability",
                "summary": "Probability of a subset of variables.",
                "assessmentPrompt": "Explain the core concept of Marginal Probability and its significance.",
                "content": {
                  "intro": [
                    "3.4 Marginal Probability Sometimes we kno w the probability distributionov er a setof variables and we w an t to know the probability distributionov er just a subsetof them.",
                    "The probability distributionov er the subset is known as the marginal probability distribution.",
                    "We can \ufb01nd P ( x ) with the sum rule : \u2200 x \u2208 x , P ( x = x ) = \ue058 y P ( x = x, y = y ) ."
                  ],
                  "keyIdeas": [
                    "We typically denote the random variable itself with a lo wercase letter in plain t yp eface, and the values it can tak e on with lowercase script letters.",
                    "Note that these states are not necessarily the integers; they can also just be named states that are not considered to hav e any numerical value.",
                    "We typically denote probability mass functions with a capital P ."
                  ],
                  "equations": [
                    "x = x ) = \ue058 y P ( x = x, y = y )"
                  ],
                  "references": [
                    "_prob.txt"
                  ]
                }
              },
              {
                "id": "conditional",
                "title": "Conditional Probability",
                "summary": "Probability given evidence.",
                "assessmentPrompt": "Explain the core concept of Conditional Probability and its significance.",
                "content": {
                  "intro": [
                    "F or example, if we w an t to compute the probability that a play er will win a p oker game given that she has a certain setof cards, we use exactly the same formulas as when we compute the probability that a patient has a disease given that she has certain symptoms.",
                    "Probability theory provides a setof formal rules for determining the likelihood of a proposition being true given the likelihood of other prop ositions.",
                    "A probability density function p ( x ) do es not give the probability of a specific state directly; instead the probability of landing inside an in\ufb01nitesimal region with v olume \u03b4 x is given by p ( x ) \u03b4 x ."
                  ],
                  "keyIdeas": [
                    "We typically denote the random variable itself with a lo wercase letter in plain t yp eface, and the values it can tak e on with lowercase script letters.",
                    "Note that these states are not necessarily the integers; they can also just be named states that are not considered to hav e any numerical value.",
                    "We typically denote probability mass functions with a capital P ."
                  ],
                  "equations": [
                    "y = y giv en x = x as P ( y = y | x = x )",
                    "x = x )"
                  ],
                  "references": [
                    "_prob.txt"
                  ]
                }
              },
              {
                "id": "chain-rule",
                "title": "Chain Rule",
                "summary": "Decomposing joint distributions.",
                "assessmentPrompt": "Explain the core concept of Chain Rule and its significance.",
                "content": {
                  "intro": [
                    "3.6 The Chain Rule of Conditional Probabilities An y joint probability distributionov er many random variables may be decomp osed into conditional distributionsover only one variable: P ( x (1) , .",
                    "(3.6) Thisobserv ation is known as the c hain rule , or product rule , of probability .",
                    "3.7 Indep endence and Conditional Indep endence T worandom variables x and y are indep enden t if their probability distribution can be expressed as a productof tw ofactors, one involving only x and one involving only y: \u2200 x \u2208 x , y \u2208 y , p ( x = x, y = y ) = p ( x = x ) p ( y = y ) ."
                  ],
                  "keyIdeas": [
                    "We typically denote the random variable itself with a lo wercase letter in plain t yp eface, and the values it can tak e on with lowercase script letters.",
                    "Note that these states are not necessarily the integers; they can also just be named states that are not considered to hav e any numerical value.",
                    "We typically denote probability mass functions with a capital P ."
                  ],
                  "equations": [
                    "i =2 P ( x ( i ) | x (1) ,",
                    "x = x, y = y ) = p ( x = x ) p ( y = y )"
                  ],
                  "references": [
                    "_prob.txt"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "practitioner",
        "title": "Practitioner",
        "description": "Factorizations and Metrics.",
        "chapters": [
          {
            "id": "eigendecomp",
            "title": "Eigendecomposition",
            "description": "Analyzing matrices via eigenvectors.",
            "topics": [
              {
                "id": "eigenvectors",
                "title": "Eigenvectors & Eigenvalues",
                "summary": "Invariant directions of transformation.",
                "assessmentPrompt": "Explain the core concept of Eigenvectors & Eigenvalues and its significance.",
                "content": {
                  "intro": [
                    "(One can also \ufb01nd a left eigen vector suc h that v \ue03e A = \u03bb v \ue03e , but we are usually concerned with right eigenvectors.) If v is an eigenvector of A , then so is any rescaled vector s v for s \u2208 R , s \ue036 = 0 .",
                    "F or this reason, we usually lo ok only for unit eigenvectors.",
                    "Supp ose that a matrix A has n linearly indep endent eigenvectors { v (1) , ."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "A = \u03bb v \ue03e , but we are usually concerned with right eigenvectors",
                    "Ax = 0 \u21d2 x ="
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              },
              {
                "id": "real-symmetric",
                "title": "Real Symmetric Matrices",
                "summary": "Decomposition of symmetric matrices.",
                "assessmentPrompt": "Explain the core concept of Real Symmetric Matrices and its significance.",
                "content": {
                  "intro": [
                    "A symmetric matrix is any matrix that is equal to itsown transpose: A = A \ue03e .",
                    "(2.35) Symmetric matricesoften arise when the entries are generated by some functionof t w o argumen ts that do es not dep end on the order of the arguments.",
                    "F or example, if A is a matrix of distance measuremen ts, with A i,j giving the distance from point ito point j , then A i,j = A j,i because distance functions are symmetric."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "A = A \ue03e",
                    "A = U D V \ue03e"
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              }
            ]
          },
          {
            "id": "info-theory",
            "title": "Information Theory",
            "description": "Quantifying information.",
            "topics": [
              {
                "id": "entropy",
                "title": "Shannon Entropy",
                "summary": "Measure of uncertainty.",
                "assessmentPrompt": "Explain the core concept of Shannon Entropy and its significance.",
                "content": {
                  "intro": [
                    "This topic covers Shannon Entropy, focusing on entropy, uncertainty."
                  ],
                  "keyIdeas": [
                    "We typically denote the random variable itself with a lo wercase letter in plain t yp eface, and the values it can tak e on with lowercase script letters.",
                    "Note that these states are not necessarily the integers; they can also just be named states that are not considered to hav e any numerical value.",
                    "We typically denote probability mass functions with a capital P ."
                  ],
                  "equations": [],
                  "references": [
                    "_prob.txt"
                  ]
                }
              },
              {
                "id": "kl-div",
                "title": "KL Divergence",
                "summary": "Difference between distributions.",
                "assessmentPrompt": "Explain the core concept of KL Divergence and its significance.",
                "content": {
                  "intro": [
                    "If we hav e two separate probability distributions P ( x ) and Q ( x ) ov er the same random variable x , we can measure ho w di\ufb00erent these two distributions are using the Kullbac k-Leibler (KL) divergence : D KL ( P \ue06b Q ) = E x \u223c P \ue014 log P ( x ) Q ( x ) \ue015 = E x \u223c P [log P ( x ) \u2212 log Q ( x )] .",
                    "Because the KL divergence is non-negative and measures the di\ufb00erence bet ween two distributions, it isoften conceptualized as measuring some sortof distance bet ween these distributions.",
                    "A quantit y that is closely related to the KL divergence is the cross-en trop y H ( P , Q ) = H ( P ) + D KL ( P \ue06b Q ) , whic h is similar to the KL div ergence but lacking the term on the left: H ( P , Q ) = \u2212 E x \u223c P log Q ( x ) ."
                  ],
                  "keyIdeas": [
                    "We typically denote the random variable itself with a lo wercase letter in plain t yp eface, and the values it can tak e on with lowercase script letters.",
                    "Note that these states are not necessarily the integers; they can also just be named states that are not considered to hav e any numerical value.",
                    "We typically denote probability mass functions with a capital P ."
                  ],
                  "equations": [],
                  "references": [
                    "_prob.txt"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "specialist",
        "title": "Specialist",
        "description": "Advanced Decomposition and Stability.",
        "chapters": [
          {
            "id": "svd-moore",
            "title": "SVD & Pseudoinverse",
            "description": "Generalizing inversion.",
            "topics": [
              {
                "id": "svd",
                "title": "Singular Value Decomposition",
                "summary": "Factorizing any matrix.",
                "assessmentPrompt": "Explain the core concept of Singular Value Decomposition and its significance.",
                "content": {
                  "intro": [
                    "The singular value decomp osition (SVD) provides another wa y tofactorize a matrix, into singular vectors and singular values .",
                    "The SVD enables us to discover some of the same kind of information as the eigendecomp osition reveals; ho wev er, the SVD is more generally applicable.",
                    "Every real matrix has a singular value decomp osition, but the same is not true of the eigen value decomp osition."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "Ax = 0 \u21d2 x = 0",
                    "A = U D V \ue03e"
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              },
              {
                "id": "pseudoinverse",
                "title": "Moore-Penrose Pseudoinverse",
                "summary": "Inverting non-square matrices.",
                "assessmentPrompt": "Explain the core concept of Moore-Penrose Pseudoinverse and its significance.",
                "content": {
                  "intro": [
                    "2.9 The Mo ore-P enrose Pseudoinverse Matrix inversion is not de\ufb01ned for matrices that are not square.",
                    "When A has more columns than rows, then solving a linear equation using the pseudoinverse providesone of the many possible solutions."
                  ],
                  "keyIdeas": [
                    "Y et because linear algebra is a form of continuous rather than discrete mathematics, man y computer scien tists ha v e little experience with it.",
                    "We therefore precede our introduction to deep learning with a focused presentationof the key linear algebra prerequisites.",
                    "If you hav e previous experience with these concepts but need a detailed reference sheet toreview key formulas, we recommend The Matrix Co okbook ( Petersen and P edersen , 2006 )."
                  ],
                  "equations": [
                    "x = A + y with minimal Euclidean norm || x || 2 among all possible solutions",
                    "Ax = y (2"
                  ],
                  "references": [
                    "_linear_algebra.txt"
                  ]
                }
              }
            ]
          },
          {
            "id": "num-stability",
            "title": "Numerical Stability",
            "description": "Computing with finite precision.",
            "topics": [
              {
                "id": "overflow",
                "title": "Overflow & Underflow",
                "summary": "Limits of floating point.",
                "assessmentPrompt": "Explain the core concept of Overflow & Underflow and its significance.",
                "content": {
                  "intro": [
                    "This topic covers Overflow & Underflow, focusing on overflow, underflow."
                  ],
                  "keyIdeas": [
                    "F unctions that change rapidly when their inputs are p erturbed sligh tly can be problematic for scienti\ufb01c computation because rounding errors in the inputs can result in large changes in the output.",
                    "We often denote the value that minimizesor maximizes a function with a sup erscript \u2217 .",
                    "The derivative of this function is denoted as f \ue030 ( x ) or as dy dx ."
                  ],
                  "equations": [],
                  "references": [
                    "_numerical.txt"
                  ]
                }
              },
              {
                "id": "conditioning",
                "title": "Conditioning",
                "summary": "Sensitivity to input changes.",
                "assessmentPrompt": "Explain the core concept of Conditioning and its significance.",
                "content": {
                  "intro": [
                    "4.2 P o or Conditioning Conditioning refers to ho w rapidly a function changes with resp ect to small changes in its inputs.",
                    "When A \u2208 R n \u00d7 n has an eigen value decomp osition, its condition number is max i,j \ue00c \ue00c \ue00c \ue00c \u03bb i \u03bb j \ue00c \ue00c \ue00c \ue00c .",
                    "The condition number of the Hessian at this point measures ho w muc h the second derivatives di\ufb00er from each other."
                  ],
                  "keyIdeas": [
                    "F unctions that change rapidly when their inputs are p erturbed sligh tly can be problematic for scienti\ufb01c computation because rounding errors in the inputs can result in large changes in the output.",
                    "We often denote the value that minimizesor maximizes a function with a sup erscript \u2217 .",
                    "The derivative of this function is denoted as f \ue030 ( x ) or as dy dx ."
                  ],
                  "equations": [],
                  "references": [
                    "_numerical.txt"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "expert",
        "title": "Expert",
        "description": "Optimization Foundations.",
        "chapters": [
          {
            "id": "grad-based",
            "title": "Gradient-Based Optimization",
            "description": "Minimizing functions.",
            "topics": [
              {
                "id": "gradient-descent",
                "title": "Gradient Descent",
                "summary": "Following the slope.",
                "assessmentPrompt": "Explain the core concept of Gradient Descent and its significance.",
                "content": {
                  "intro": [
                    "Since f \ue030 ( x ) = 0, gradient descent halts here.",
                    "f ( x ) = 1 2 x 2 f \ue030 ( x ) = x Figure 4.1: Gradient descent.",
                    "An illustrationof how the gradient descent algorithm uses the deriv ativesof a function tofollo w the function do wnhill to a minim um."
                  ],
                  "keyIdeas": [
                    "F unctions that change rapidly when their inputs are p erturbed sligh tly can be problematic for scienti\ufb01c computation because rounding errors in the inputs can result in large changes in the output.",
                    "We often denote the value that minimizesor maximizes a function with a sup erscript \u2217 .",
                    "The derivative of this function is denoted as f \ue030 ( x ) or as dy dx ."
                  ],
                  "equations": [
                    "y = f ( x ) , where b oth x and y are re"
                  ],
                  "references": [
                    "_numerical.txt"
                  ]
                }
              },
              {
                "id": "jacobian-hessian",
                "title": "Jacobian & Hessian",
                "summary": "Higher order derivatives.",
                "assessmentPrompt": "Explain the core concept of Jacobian & Hessian and its significance.",
                "content": {
                  "intro": [
                    "4.3.1 Bey ond the Gradien t: Jacobian and Hessian Matrices Sometimes we need to \ufb01nd all the partial deriv ativesof a function whose input and output are b oth vectors.",
                    "The matrix containing all suc h partial deriv atives is kno wn as a Jacobian matrix .",
                    "Sp eci\ufb01cally , if we ha v e a function f : R m \u2192 R n , then the Jacobian matrix J \u2208 R n \u00d7 m of f is de\ufb01ned such that J i,j = \u2202 \u2202 x j f ( x ) i ."
                  ],
                  "keyIdeas": [
                    "F unctions that change rapidly when their inputs are p erturbed sligh tly can be problematic for scienti\ufb01c computation because rounding errors in the inputs can result in large changes in the output.",
                    "We often denote the value that minimizesor maximizes a function with a sup erscript \u2217 .",
                    "The derivative of this function is denoted as f \ue030 ( x ) or as dy dx ."
                  ],
                  "equations": [
                    "j = \u2202 \u2202 x j f ( x ) i",
                    "j = H j,i , so the Hessian matrix is sym"
                  ],
                  "references": [
                    "_numerical.txt"
                  ]
                }
              }
            ]
          },
          {
            "id": "constrained",
            "title": "Constrained Optimization",
            "description": "Optimization with rules.",
            "topics": [
              {
                "id": "kkt",
                "title": "KKT Conditions",
                "summary": "Generalized Lagrange multipliers.",
                "assessmentPrompt": "Explain the core concept of KKT Conditions and its significance.",
                "content": {
                  "intro": [
                    "The Karush\u2013Kuhn\u2013T uc k er (KKT) approac h 1 pro vides a very general so- lution to constrained optimization.",
                    "With the KKT approac h, we introduce a new function called the generalized Lagrangianor generalized Lagrange function .",
                    "We introduce new variables \u03bb i and \u03b1 j for each constraint, these are called the KKT multipliers."
                  ],
                  "keyIdeas": [
                    "F unctions that change rapidly when their inputs are p erturbed sligh tly can be problematic for scienti\ufb01c computation because rounding errors in the inputs can result in large changes in the output.",
                    "We often denote the value that minimizesor maximizes a function with a sup erscript \u2217 .",
                    "The derivative of this function is denoted as f \ue030 ( x ) or as dy dx ."
                  ],
                  "equations": [
                    "S = { x | \u2200 i, g ( i ) ( x ) = 0 and \u2200 j, h ( j ) ( x ) \u2264 0 }",
                    "S = { x |"
                  ],
                  "references": [
                    "_numerical.txt"
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "ml-theory",
    "title": "ML Theory",
    "description": "Generalization, Capacity, and Bias-Variance.",
    "levels": [
      {
        "id": "explorer",
        "title": "Explorer",
        "description": "What is learning?",
        "chapters": [
          {
            "id": "learning-algs",
            "title": "Learning Algorithms",
            "description": "Defining the task.",
            "topics": [
              {
                "id": "task-t",
                "title": "The Task T",
                "summary": "How ML tasks are defined.",
                "assessmentPrompt": "Explain the core concept of The Task T and its significance.",
                "content": {
                  "intro": [
                    "Mitchell (1997) provides a succinct de\ufb01nition: \u201cA computer program is said to learn from experience E with respect to some classof tasks T and performance measure P , ifits performance at tasks in T , as measured by P , improves with experience E .\u201d One can imagine a wide variety of experiences E , tasks T , and performance measures P , and we donot attempt in this book toformally de\ufb01ne what may be used for each of these entities.",
                    "Instead, in the following sections, we provide intuitive descriptions and examplesof the di\ufb00erent kindsof tasks, performance measures, and experiences that can be used to construct machine learning algorithms.",
                    "5.1.1 The Task, T Machine learning enables us to tackle tasks that are too di\ufb03cult to solve with \ufb01xed programs written and designed by human beings."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "y = f ( x ), the model assigns an input described by vector x to a category identi\ufb01ed by numeric",
                    "y = x 1 in all cases"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              },
              {
                "id": "performance-p",
                "title": "Performance Measure P",
                "summary": "Evaluating success.",
                "assessmentPrompt": "Explain the core concept of Performance Measure P and its significance.",
                "content": {
                  "intro": [
                    "Mitchell (1997) provides a succinct de\ufb01nition: \u201cA computer program is said to learn from experience E with respect to some classof tasks T and performance measure P , ifits performance at tasks in T , as measured by P , improves with experience E .\u201d One can imagine a wide variety of experiences E , tasks T , and performance measures P , and we donot attempt in this book toformally de\ufb01ne what may be used for each of these entities.",
                    "Instead, in the following sections, we provide intuitive descriptions and examplesof the di\ufb00erent kindsof tasks, performance measures, and experiences that can be used to construct machine learning algorithms.",
                    "An example is a collectionof features that have been quantitatively measured from some objector event that we want the machine learning system to process."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "test = 1 m \ue058 i ( \u02c6 y (test) \u2212 y (test) ) 2 i",
                    "ML = arg max \u03b8 E x\u223c\u02c6p data log p model (x; \u03b8)"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              },
              {
                "id": "experience-e",
                "title": "Experience E",
                "summary": "Learning from data.",
                "assessmentPrompt": "Explain the core concept of Experience E and its significance.",
                "content": {
                  "intro": [
                    "We describe how to combine various algorithm components, suchas anoptimization algorithm, a cost function, a model, and a dataset, to build a machine learning algorithm.",
                    "Mitchell (1997) provides a succinct de\ufb01nition: \u201cA computer program is said to learn from experience E with respect to some classof tasks T and performance measure P , ifits performance at tasks in T , as measured by P , improves with experience E .\u201d One can imagine a wide variety of experiences E , tasks T , and performance measures P , and we donot attempt in this book toformally de\ufb01ne what may be used for each of these entities.",
                    "Instead, in the following sections, we provide intuitive descriptions and examplesof the di\ufb00erent kindsof tasks, performance measures, and experiences that can be used to construct machine learning algorithms."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "train = 0 (5",
                    "i = A(D\\D i ) for z (j)"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "apprentice",
        "title": "Apprentice",
        "description": "Generalization.",
        "chapters": [
          {
            "id": "generalization",
            "title": "Generalization & Capacity",
            "description": "Performing well on new data.",
            "topics": [
              {
                "id": "train-test",
                "title": "Train & Test Error",
                "summary": "Generalization gap.",
                "assessmentPrompt": "Explain the core concept of Train & Test Error and its significance.",
                "content": {
                  "intro": [
                    "Typically, when training a machine learning model, we have access to a training set; we can compute some error measure on the training set, called the training error ; and we reduce this training error.",
                    "What separates machine learning from optimization is that we want the generalization error , also called the test error , to be low as well.",
                    "Inour linear regression example, we trained the model by minimizing the training error, 1 m (train) ||X (train) w \u2212 y (train) || 2 2 , (5.14) 108 CHAPTER 5."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [],
                  "references": [
                    "ml.html"
                  ]
                }
              },
              {
                "id": "capacity",
                "title": "Model Capacity",
                "summary": "Ability to fit functions.",
                "assessmentPrompt": "Explain the core concept of Model Capacity and its significance.",
                "content": {
                  "intro": [
                    "5.2 Capacity, Over\ufb01tting and Under\ufb01tting The central challenge in machine learning is thatour algorithm must perform well on new, previously unseen inputs\u2014not just those on which our model was trained.",
                    "We can control whether a model is more likely to over\ufb01tor under\ufb01t by altering its capacity .",
                    "Informally, a model\u2019s capacity is its ability to \ufb01t a wide variety of functions."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "y = 1 and c i = 0 for all other valuesof i",
                    "y = b + w 1 x + w 2 x"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              },
              {
                "id": "overfitting",
                "title": "Overfitting & Underfitting",
                "summary": "The central challenge.",
                "assessmentPrompt": "Explain the core concept of Overfitting & Underfitting and its significance.",
                "content": {
                  "intro": [
                    "This topic covers Overfitting & Underfitting, focusing on overfitting, underfitting."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [],
                  "references": [
                    "ml.html"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "practitioner",
        "title": "Practitioner",
        "description": "Hyperparameters and Estimators.",
        "chapters": [
          {
            "id": "hyperparams",
            "title": "Hyperparameters",
            "description": "Tuning the model.",
            "topics": [
              {
                "id": "validation",
                "title": "Validation Sets",
                "summary": "Selecting settings.",
                "assessmentPrompt": "Explain the core concept of Validation Sets and its significance.",
                "content": {
                  "intro": [
                    "Most machine learning algorithms have settings called hyperparameters, which must be determined outside the learning algorithm itself; we discusshow to set these using additional data.",
                    "5.3 Hyperparameters and Validation Sets Most machine learning algorithms have hyperparameters, settings that we can use to control the algorithm\u2019s behavior.",
                    "The valuesof hyperparameters are not adapted by the learning algorithm itself (though we can design a nested learning procedure in which one learning algorithm learns the best hyperparameters for another learning algorithm)."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [],
                  "references": [
                    "ml.html"
                  ]
                }
              },
              {
                "id": "cross-val",
                "title": "Cross-Validation",
                "summary": "Robust evaluation.",
                "assessmentPrompt": "Explain the core concept of Cross-Validation and its significance.",
                "content": {
                  "intro": [
                    "MACHINE LEARNING BASICS 5.3.1 Cross-Validation Dividing the dataset into a \ufb01xed training set and a \ufb01xed test set can be problematic ifit results in the test set being small.",
                    "The most commonof these is the k -fold cross-validation procedure, shown in algorithm 5.1, in which a partitionof the dataset is formed by splitting it into k nonoverlapping subsets.",
                    "MACHINE LEARNING BASICS Algorithm 5.1 The k -fold cross-validation algorithm."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "MSE = E[( \u02c6 \u03b8 m \u2212 \u03b8) 2 ] (5"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              }
            ]
          },
          {
            "id": "estimators",
            "title": "Estimators",
            "description": "Statistical view of learning.",
            "topics": [
              {
                "id": "bias-est",
                "title": "Bias of Estimator",
                "summary": "Systematic error.",
                "assessmentPrompt": "Explain the core concept of Bias of Estimator and its significance.",
                "content": {
                  "intro": [
                    "Machine learning is essentially a form of applied statistics with increased emphasison the use of computers to statistically estimate complicated functions and a decreased emphasison proving con\ufb01dence intervals around these functions; we therefore present the two central approaches to statistics: frequentistestimators and Bayesian inference.",
                    "Instead of adding the bias parameter b , one can continue to use the model with only weights but augment x with anextra entry that is always set to 1.",
                    "The weight corresponding to the extra 1 entry plays the role of the bias parameter."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "ML = arg max \u03b8 P (Y | X; \u03b8)",
                    "i = A(D\\D i ) for z (j) in D i do e j = L(f i , z (j) ) end for end for Return e (i"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              },
              {
                "id": "variance-est",
                "title": "Variance of Estimator",
                "summary": "Sensitivity to data.",
                "assessmentPrompt": "Explain the core concept of Variance of Estimator and its significance.",
                "content": {
                  "intro": [
                    "One problem is that no unbiased estimatorsof the variance of suchaverage error estimators exist (Bengio and Grandvalet, 2004), but approximations are typically used.",
                    "5.4 Estimators, Bias and Variance The \ufb01eld of statistics gives us many tools to achieve the machine learning goal of solving a task notonly on the training set but also to generalize.",
                    "Foundational concepts suchas parameter estimation, bias and variance are useful toformally characterize notionsof generalization, under\ufb01tting and over\ufb01tting."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "0 = diag(\u03bb 0 )",
                    "X = U\u03a3W \ue03e"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "specialist",
        "title": "Specialist",
        "description": "Maximum Likelihood.",
        "chapters": [
          {
            "id": "mle",
            "title": "Maximum Likelihood Estimation",
            "description": "The standard training recipe.",
            "topics": [
              {
                "id": "mle-principle",
                "title": "MLE Principle",
                "summary": "Maximizing data probability.",
                "assessmentPrompt": "Explain the core concept of MLE Principle and its significance.",
                "content": {
                  "intro": [
                    "5.5 Maximum Likelihood Estimation We have seen some de\ufb01nitionsof common estimators and analyzed their properties.",
                    "The most common such principle is the maximum likelihood principle.",
                    "The maximum likelihood estimator for \u03b8 is then de\ufb01ned as \u03b8 ML = arg max \u03b8 p model (X; \u03b8), (5.56) = arg max \u03b8 m \ue059 i=1 p model (x (i) ; \u03b8)."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "ML = arg max \u03b8 m \ue058 i=1 log P (y (i) | x (i) ; \u03b8)",
                    "X = {x (1) ,"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              },
              {
                "id": "log-likelihood",
                "title": "Log-Likelihood",
                "summary": "Numerical stability and optimization.",
                "assessmentPrompt": "Explain the core concept of Log-Likelihood and its significance.",
                "content": {
                  "intro": [
                    "This is a broad category and subsumes the transcription and translation tasks described above, as well as many other tasks.",
                    "In this case, w i is the coe\ufb03cient that we multiply by feature x i before summing up the contributions from all the features.",
                    "If we are allowed to make some assumptions about how the training and test set are collected, then we can make some progress."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "ML = arg max \u03b8 m \ue058 i=1 log P (y (i) | x (i) ; \u03b8)",
                    "y = f ( x ) + \ue00f , where \ue00f stands for the partof y that is not predictable from x"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              },
              {
                "id": "kl-mle",
                "title": "MLE & KL Divergence",
                "summary": "Equivalence to minimizing KL.",
                "assessmentPrompt": "Explain the core concept of MLE & KL Divergence and its significance.",
                "content": {
                  "intro": [
                    "(5.59) One way to interpret maximum likelihood estimation is to view it as minimizing the dissimilarity between the empirical distribution \u02c6p data , de\ufb01ned by the training set and the model distribution, with the degree of dissimilarity between the two measured by the KL divergence.",
                    "The KL divergence is given by D KL (\u02c6p data \ue06bp model ) = E x\u223c\u02c6p data [log \u02c6p data (x) \u2212 log p model (x)] .",
                    "This means when we train the model to minimize the KL divergence, we need only minimize \u2212 E x\u223c\u02c6p data [log p model (x)] , (5.61) which isof course the same as the maximization in equation 5.59."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "ML = arg max \u03b8 E x\u223c\u02c6p data log p model (x; \u03b8)"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "expert",
        "title": "Expert",
        "description": "Bayesian Methods & Regularization.",
        "chapters": [
          {
            "id": "bayesian",
            "title": "Bayesian Statistics",
            "description": "Learning with priors.",
            "topics": [
              {
                "id": "priors",
                "title": "Priors & Posteriors",
                "summary": "Encoding beliefs.",
                "assessmentPrompt": "Explain the core concept of Priors & Posteriors and its significance.",
                "content": {
                  "intro": [
                    "Before observing the data, we representour knowledge of \u03b8 using the prior probability distribution , p ( \u03b8 ) (sometimes referred to as simply \u201cthe prior\u201d).",
                    "Generally, the machine learning practitioner selects a prior distribution that is quite broad (i.e., with high entropy) tore\ufb02ect a high degree of uncertainty in the value of \u03b8 before observing any data.",
                    "For example, one might assume a priorithat \u03b8 lies in some \ufb01nite range or volume, with a uniform distribution."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "m = \ue000 X \ue03e X + \u039b \u22121 0 \ue001 \u22121 and \u00b5 m = \u039b m \ue000 X \ue03e y + \u039b \u22121 0 \u00b5 0 \ue001",
                    "0 = diag(\u03bb 0 )"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              },
              {
                "id": "map",
                "title": "MAP Estimation",
                "summary": "Point estimates with priors.",
                "assessmentPrompt": "Explain the core concept of MAP Estimation and its significance.",
                "content": {
                  "intro": [
                    "To solve the classification task, the learning algorithm only has to de\ufb01ne a single function mapping from a vector input to a categorical output.",
                    "One example is parsing\u2014mapping a natural language sentence into a tree that describes its grammatical structure by tagging nodesof the trees as being verbs, nouns, adverbs, and so on.",
                    "In this model \u02c6y = w \ue03e x + b, (5.13) so the mapping from parameters to predictions is still a linear function but the mapping from features to predictions is now an a\ufb03ne function."
                  ],
                  "keyIdeas": [
                    "This chapter provides a brief course in the most important general principles that are applied throughout the restof the book.",
                    "From a scienti\ufb01c and philosophical pointof view, machine learning is interesting because developing our understanding ofit entails developing our understanding of the principles that underlie intelligence.",
                    "This kind of situation arises frequently in medical diagnosis, because many kindsof medical tests are expensive or invasive."
                  ],
                  "equations": [
                    "X = {x (1) ,",
                    "ML = arg max \u03b8 p model (X; \u03b8), (5"
                  ],
                  "references": [
                    "ml.html"
                  ]
                }
              }
            ]
          },
          {
            "id": "regularization-adv",
            "title": "Regularization Strategies",
            "description": "Controlling complexity.",
            "topics": [
              {
                "id": "weight-decay",
                "title": "Parameter Norm Penalties",
                "summary": "L2 and L1 regularization.",
                "assessmentPrompt": "Explain the core concept of Parameter Norm Penalties and its significance.",
                "content": {
                  "intro": [
                    "Because it can be expensive to search for the correct value of multiple hyperparameters, it is still reasonable to use the same weight decay at all layers just toreduce the size of search space.",
                    "REGULARIZATION FOR DEEP LEARNING 7.1.1 L 2 Parameter Regularization We have already seen, in section 5.2.2, one of the simplest and most common kindsof parameter norm penalty: the L 2 parameter norm penalty commonly known as weight decay .",
                    "We can gain some insight into the behavior of weight decay regularization by studying the gradientof the regularized objective function."
                  ],
                  "keyIdeas": [
                    "We denote the regularized objective function by \u02dc J: \u02dc J(\u03b8; X, y) = J(\u03b8; X, y) + \u03b1\u2126(\u03b8), (7.1) where \u03b1 \u2208 [0 , \u221e ) is a hyperparameter that weights the relative contributionof the norm penalty term, \u2126, relative to the standard objective function J .",
                    "Before delving into the regularization behavior of di\ufb00erent norms, we note that for neural networks, we typically choose to use a parameter norm penalty \u2126 that penalizesonly the weightsof the a\ufb03ne transformation at each layer and leaves the biases unregularized.",
                    "We therefore use the vector w to indicate all the weights that should be a\ufb00ected by a norm penalty, while the vector \u03b8 denotes all the parameters, including both w and the unregularized parameters."
                  ],
                  "equations": [
                    "H = Q\u039bQ \ue03e",
                    "w = (H + \u03b1I) \u22121 Hw \u2217 (7"
                  ],
                  "references": [
                    "regularization.html"
                  ]
                }
              },
              {
                "id": "dropout",
                "title": "Dropout",
                "summary": "Stochastic regularization.",
                "assessmentPrompt": "Explain the core concept of Dropout and its significance.",
                "content": {
                  "intro": [
                    "Other formsof regularization, known asensemble methods, combine multiple hypotheses that explain the training data.",
                    "Dropout, a powerful regularization strategy that will be described in section 7.12, can be seen as a processof constructing new inputs by multiplying by noise.",
                    "Noise applied to the hidden units is such an important topic that it merits itsown separate discussion; the dropout algorithm described in section 7.12 is the main developmentof that approach."
                  ],
                  "keyIdeas": [
                    "We denote the regularized objective function by \u02dc J: \u02dc J(\u03b8; X, y) = J(\u03b8; X, y) + \u03b1\u2126(\u03b8), (7.1) where \u03b1 \u2208 [0 , \u221e ) is a hyperparameter that weights the relative contributionof the norm penalty term, \u2126, relative to the standard objective function J .",
                    "Before delving into the regularization behavior of di\ufb00erent norms, we note that for neural networks, we typically choose to use a parameter norm penalty \u2126 that penalizesonly the weightsof the a\ufb03ne transformation at each layer and leaves the biases unregularized.",
                    "We therefore use the vector w to indicate all the weights that should be a\ufb00ected by a norm penalty, while the vector \u03b8 denotes all the parameters, including both w and the unregularized parameters."
                  ],
                  "equations": [
                    "c = v , the mean squared error reduces to v , so the model averaging does nothelp at all",
                    "y = y | v) = softmax \ue010 W \ue03e v + b \ue011 y"
                  ],
                  "references": [
                    "regularization.html"
                  ]
                }
              },
              {
                "id": "early-stopping",
                "title": "Early Stopping",
                "summary": "Preventing overfitting.",
                "assessmentPrompt": "Explain the core concept of Early Stopping and its significance.",
                "content": {
                  "intro": [
                    "7.8 Early Stopping When training large models with sufficient representational capacity to over\ufb01t the task, we oftenobserve that training error decreases steadily over time, but 241 CHAPTER 7.",
                    "REGULARIZATION FOR DEEP LEARNING 0 50 100 150 200 250 Time (epochs) 0.00 0.05 0.10 0.15 0.20 Loss (negative log-likelihood) Training set loss Validation set loss Figure 7.3: Learning curves showing how the negative log-likelihood loss changesover time (indicated as number of training iterationsover the dataset, or epochs ).",
                    "This procedure is speci\ufb01ed more formally in algorithm 7.1. This strategy is known as early stopping ."
                  ],
                  "keyIdeas": [
                    "We denote the regularized objective function by \u02dc J: \u02dc J(\u03b8; X, y) = J(\u03b8; X, y) + \u03b1\u2126(\u03b8), (7.1) where \u03b1 \u2208 [0 , \u221e ) is a hyperparameter that weights the relative contributionof the norm penalty term, \u2126, relative to the standard objective function J .",
                    "Before delving into the regularization behavior of di\ufb00erent norms, we note that for neural networks, we typically choose to use a parameter norm penalty \u2126 that penalizesonly the weightsof the a\ufb03ne transformation at each layer and leaves the biases unregularized.",
                    "We therefore use the vector w to indicate all the weights that should be a\ufb00ected by a norm penalty, while the vector \u03b8 denotes all the parameters, including both w and the unregularized parameters."
                  ],
                  "equations": [],
                  "references": [
                    "regularization.html"
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "deep-learning",
    "title": "Deep Learning",
    "description": "Neural Networks: Architectures and Algorithms.",
    "levels": [
      {
        "id": "explorer",
        "title": "Explorer",
        "description": "Neural Network Basics.",
        "chapters": [
          {
            "id": "mlp",
            "title": "Deep Feedforward Networks",
            "description": "The multilayer perceptron.",
            "topics": [
              {
                "id": "ff-model",
                "title": "Feedforward Model",
                "summary": "Mapping inputs to outputs.",
                "assessmentPrompt": "Explain the core concept of Feedforward Model and its significance.",
                "content": {
                  "intro": [
                    "Chapter 6 Deep Feedforward Networks Deep feedforward networks , also called feedforward neural networks , or multilayer perceptrons (MLPs), are the quintessential deep learning models.",
                    "The goal of a feedforward network is to approximate some function f \u2217 .",
                    "A feedforward network de\ufb01nes a mapping y = f ( x ; \u03b8 ) and learns the value of the parameters \u03b8 that result in the best function approximation."
                  ],
                  "keyIdeas": [
                    "These models are called feedforward because information \ufb02ows through the function being evaluated from x , through the intermediate computations used to de\ufb01ne f , and \ufb01nally to the output y .",
                    "They form the basisof many important commercial applications.",
                    "Feedforward neural networks are called networks because they are typically represented by composing together many di\ufb00erent functions."
                  ],
                  "equations": [
                    "dx = dz dy dy dx",
                    "j = z iterms will roughly cancel"
                  ],
                  "references": [
                    "mlp.html"
                  ]
                }
              },
              {
                "id": "activations",
                "title": "Activation Functions",
                "summary": "Non-linearity.",
                "assessmentPrompt": "Explain the core concept of Activation Functions and its significance.",
                "content": {
                  "intro": [
                    "Each unit resembles a neuron in the sense that it receives input from many other units and computes itsown activation value.",
                    "Feedforward networks have introduced the conceptof a hidden layer, and this requires us to choose the activation functions that will be used to compute the hidden layer values.",
                    "Most neural networks do so using an a\ufb03ne transformation controlled by learned parameters, followed by a \ufb01xed nonlinear function called an activation function."
                  ],
                  "keyIdeas": [
                    "These models are called feedforward because information \ufb02ows through the function being evaluated from x , through the intermediate computations used to de\ufb01ne f , and \ufb01nally to the output y .",
                    "They form the basisof many important commercial applications.",
                    "Feedforward neural networks are called networks because they are typically represented by composing together many di\ufb00erent functions."
                  ],
                  "equations": [
                    "H = max{ 0 , XW (1) }",
                    "z = w \ue03e h + b"
                  ],
                  "references": [
                    "mlp.html"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "apprentice",
        "title": "Apprentice",
        "description": "Training Networks.",
        "chapters": [
          {
            "id": "backprop",
            "title": "Backpropagation",
            "description": "Computing gradients.",
            "topics": [
              {
                "id": "chain-rule-bp",
                "title": "Chain Rule in Graphs",
                "summary": "Flow of derivatives.",
                "assessmentPrompt": "Explain the core concept of Chain Rule in Graphs and its significance.",
                "content": {
                  "intro": [
                    "We review these basicsof gradient-based learning, then proceed to confront some of the design decisions that are unique tofeedforward networks.",
                    "Learning in deep neural networks requires computing the gradientsof complicated functions.",
                    "We present the back-propagation algorithm and its modern generalizations, which can be used to e\ufb03ciently compute these gradients."
                  ],
                  "keyIdeas": [
                    "These models are called feedforward because information \ufb02ows through the function being evaluated from x , through the intermediate computations used to de\ufb01ne f , and \ufb01nally to the output y .",
                    "They form the basisof many important commercial applications.",
                    "Feedforward neural networks are called networks because they are typically represented by composing together many di\ufb00erent functions."
                  ],
                  "equations": [
                    "H = max{ 0 , XW (1) }",
                    "J = \u2207 \u02c6 y L( \u02c6 y, y) for k = l, l \u2212 1,"
                  ],
                  "references": [
                    "mlp.html"
                  ]
                }
              },
              {
                "id": "backprop-alg",
                "title": "Backpropagation Algorithm",
                "summary": "Recursive computation.",
                "assessmentPrompt": "Explain the core concept of Backpropagation Algorithm and its significance.",
                "content": {
                  "intro": [
                    "The learning algorithm must decide how to use those layers to produce the desired output, but the training data donot say what each individual layer should do.",
                    "Instead, the learning algorithm must decide how to use these layers to best implement an approximationof f \u2217 .",
                    "Equivalently, we can apply the kernel trick described in section 5.7.2, to obtain a nonlinear learning algorithm based on implicitly applying the \u03c6 mapping."
                  ],
                  "keyIdeas": [
                    "These models are called feedforward because information \ufb02ows through the function being evaluated from x , through the intermediate computations used to de\ufb01ne f , and \ufb01nally to the output y .",
                    "They form the basisof many important commercial applications.",
                    "Feedforward neural networks are called networks because they are typically represented by composing together many di\ufb00erent functions."
                  ],
                  "equations": [
                    "y = f \u2217 ( x ) that we want to learn",
                    "y = f ( x ; \u03b8 ), and our learning algorithm will adapt the parameters \u03b8 to make f as similar as possible"
                  ],
                  "references": [
                    "mlp.html"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "practitioner",
        "title": "Practitioner",
        "description": "Specialized Architectures.",
        "chapters": [
          {
            "id": "convnets",
            "title": "Convolutional Networks",
            "description": "Processing grid data.",
            "topics": [
              {
                "id": "convolution",
                "title": "Convolution Operation",
                "summary": "Spatial filtering.",
                "assessmentPrompt": "Explain the core concept of Convolution Operation and its significance.",
                "content": {
                  "intro": [
                    "Chapter 9 Convolutional Networks Convolutional networks (LeCun, 1989), also known as convolutional neural networks , or CNNs, are a specialized kind of neural network for processing data that has a known grid-like topology.",
                    "Convolutional networks have been tremendously successful in practical applications.",
                    "The name \u201cconvolutional neural network\u201d indicates that the network employs a mathematical operation called convolution ."
                  ],
                  "keyIdeas": [
                    "The convolutionoperation is typically denoted with an asterisk: s(t) = (x \u2217 w)(t).",
                    "Because each elementof the input and kernel must be explicitly stored separately, we usually assume that these functions are zero everywhere but in the \ufb01nite setof points for which we store the values.",
                    "(9.5) Usually the latter formula is more straightforward to implement in a machine learning library, because there is less variation in the range of valid valuesof m and n."
                  ],
                  "equations": [
                    "R = h(K, H, s)",
                    "280 = 178 , 640 entries"
                  ],
                  "references": [
                    "convnets.html"
                  ]
                }
              },
              {
                "id": "pooling",
                "title": "Pooling",
                "summary": "Invariance and reduction.",
                "assessmentPrompt": "Explain the core concept of Pooling and its significance.",
                "content": {
                  "intro": [
                    "We then describe anoperation called pooling , which almost all convolutional networks employ.",
                    "This e\ufb00ect increases if the network includes architectural features like strided convolution (\ufb01gure 9.12) or pooling (section 9.3).",
                    "We discuss this further in section 9.7. 9.3 Pooling A typical layer of a convolutional network consistsof three stages (see \ufb01gure 9.7)."
                  ],
                  "keyIdeas": [
                    "The convolutionoperation is typically denoted with an asterisk: s(t) = (x \u2217 w)(t).",
                    "Because each elementof the input and kernel must be explicitly stored separately, we usually assume that these functions are zero everywhere but in the \ufb01nite setof points for which we store the values.",
                    "(9.5) Usually the latter formula is more straightforward to implement in a machine learning library, because there is less variation in the range of valid valuesof m and n."
                  ],
                  "equations": [
                    "k = c(K, V, s) i,j,k = \ue058 l,m,n \ue002 V l,(j\u22121)\u00d7s+m,(k\u22121)\u00d7s+n K i,l,m,n \ue003"
                  ],
                  "references": [
                    "convnets.html"
                  ]
                }
              }
            ]
          },
          {
            "id": "rnns",
            "title": "Recurrent Networks",
            "description": "Processing sequences.",
            "topics": [
              {
                "id": "rnn-unfolding",
                "title": "Unfolding Computation",
                "summary": "Time as depth.",
                "assessmentPrompt": "Explain the core concept of Unfolding Computation and its significance.",
                "content": {
                  "intro": [
                    "This recurrent formulation results in the sharing of parameters through a very deep computational graph.",
                    "This chapter extends the idea of a computational graph to include cycles.",
                    "Such computational graphs allow us to de\ufb01ne recurrent neural networks."
                  ],
                  "keyIdeas": [
                    "Such sharing is particularly important when a speci\ufb01c piece of information canoccur at multiple positions within the sequence.",
                    "Equation 10.1 is recurrent because the de\ufb01nitionof s at time t refers back to the same de\ufb01nition at time t \u2212 1.",
                    "Regardlessof the sequence length, the learned model always has the same input size, because it is speci\ufb01ed in termsof transition from one state to another state, rather than speci\ufb01ed in termsof a variable-length history of states."
                  ],
                  "equations": [
                    "Y = {y (1) ,",
                    "t=1 P (y (t) | y (t\u22121) , y (t\u22122) ,"
                  ],
                  "references": [
                    "rnn.html"
                  ]
                }
              },
              {
                "id": "teacher-forcing",
                "title": "Teacher Forcing",
                "summary": "Training technique.",
                "assessmentPrompt": "Explain the core concept of Teacher Forcing and its significance.",
                "content": {
                  "intro": [
                    "If we had separate parameters for each value of the time index, we could not generalize to sequence lengths not seen during training, nor share statistical strength across di\ufb00erent sequence lengths and across di\ufb00erent positions in time.",
                    "Depending on the training criterion, this summary might selectively keep some aspectsof the past sequence with more precision thanother aspects.",
                    "Learning a single shared model allows generalization to sequence lengths that did not appear in the training set, and enables the model to be estimated with far fewer training examples than would be required without parameter sharing."
                  ],
                  "keyIdeas": [
                    "Such sharing is particularly important when a speci\ufb01c piece of information canoccur at multiple positions within the sequence.",
                    "Equation 10.1 is recurrent because the de\ufb01nitionof s at time t refers back to the same de\ufb01nition at time t \u2212 1.",
                    "Regardlessof the sequence length, the learned model always has the same input size, because it is speci\ufb01ed in termsof transition from one state to another state, rather than speci\ufb01ed in termsof a variable-length history of states."
                  ],
                  "equations": [
                    "L = \ue058 t \ue058 i \ue020 \u2202L \u2202h (t) i \ue021 \u2207 W (t) h (t) i (10",
                    "t = 2, the model is trained to maximize the conditional probability of y (2) given both the x sequence s"
                  ],
                  "references": [
                    "rnn.html"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "specialist",
        "title": "Specialist",
        "description": "Advanced Optimization.",
        "chapters": [
          {
            "id": "optimization-algo",
            "title": "Optimization Algorithms",
            "description": "Beyond SGD.",
            "topics": [
              {
                "id": "momentum",
                "title": "Momentum",
                "summary": "Accelerating learning.",
                "assessmentPrompt": "Explain the core concept of Momentum and its significance.",
                "content": {
                  "intro": [
                    "OPTIMIZA TION FOR TRAINING DEEP MODELS \u2212 30 \u2212 20 \u2212 10 0 10 20 \u2212 30 \u2212 20 \u2212 10 0 10 20 Figure 8.5: Momentum aims primarily to solve tw o problems: p o or conditioning of the Hessian matrix and variance in the sto chastic gradient.",
                    "Here, we illustrate how momentum overcomes the \ufb01rstof these tw o problems.",
                    "The red path cutting across the con tours indicates the path followed by the momentum learning rule as it minimizes this function."
                  ],
                  "keyIdeas": [
                    "Because this problem is so important and so expensive, a specialized setof optimization techniques hav e been developed for solving it.",
                    "This is because ev en when the exp ected 0-1 loss is zero, one can improv e the robustnessof the classifier by further pushing the classes apart from each other, obtaining a more con\ufb01dent and reliable classifier, thus extracting more information from the training data than would hav e been possible by simply minimizing the a v erage 0-1 losson the training set.",
                    "A very important di\ufb00erence betweenoptimization in general and optimization as we use it for training algorithms is that training algorithms donot usually halt at a lo cal minim um."
                  ],
                  "equations": [
                    "i =1 L \ue010 f ( x ( i ) ; \u03b8 + \u03b1 v ) , y ( i ) \ue011 \ue023 , (8",
                    "i =1 L ( f ( x ( i ) ; \u03b8 ) , y ( i ) ) \ue001"
                  ],
                  "references": [
                    "_optimization.txt"
                  ]
                }
              },
              {
                "id": "adaptive-rates",
                "title": "Adaptive Learning Rates",
                "summary": "Per-parameter rates.",
                "assessmentPrompt": "Explain the core concept of Adaptive Learning Rates and its significance.",
                "content": {
                  "intro": [
                    "AdaGrad performs well for some but not all deep learning models.",
                    "8.5.2 RMSProp The RMSProp algorithm ( Hinton , 2012 ) mo di\ufb01es AdaGrad to perform better in the nonconv ex setting by changing the gradient accumulation into an exponentially weigh ted moving a v erage.",
                    "AdaGrad is designed to conv erge rapidly when applied to a conv ex function."
                  ],
                  "keyIdeas": [
                    "Because this problem is so important and so expensive, a specialized setof optimization techniques hav e been developed for solving it.",
                    "This is because ev en when the exp ected 0-1 loss is zero, one can improv e the robustnessof the classifier by further pushing the classes apart from each other, obtaining a more con\ufb01dent and reliable classifier, thus extracting more information from the training data than would hav e been possible by simply minimizing the a v erage 0-1 losson the training set.",
                    "A very important di\ufb00erence betweenoptimization in general and optimization as we use it for training algorithms is that training algorithms donot usually halt at a lo cal minim um."
                  ],
                  "equations": [
                    "r = 0 while stopping criterion not met do Sample a minibatch of m examples from the training set { x (1)",
                    "r = 0 while stopping criterion not met do Sample a minibatch of m examples from the train"
                  ],
                  "references": [
                    "_optimization.txt"
                  ]
                }
              }
            ]
          },
          {
            "id": "normalization",
            "title": "Batch Normalization",
            "description": "Stabilizing training.",
            "topics": [
              {
                "id": "batch-norm",
                "title": "Batch Normalization",
                "summary": "Normalizing layer inputs.",
                "assessmentPrompt": "Explain the core concept of Batch Normalization and its significance.",
                "content": {
                  "intro": [
                    "There are a few situations where we ma y set some biases tononzero values: \u2022 If a bias is for anoutput unit, then it isoften bene\ufb01cial to initialize the bias to obtain the righ t marginal statisticsof the output.",
                    "This justi\ufb01es setting the bias to the inverse of the activation function applied to the marginal statisticsof the output in the training set.",
                    "Batch normalization can be applied to any inputor hidden la y er in a network."
                  ],
                  "keyIdeas": [
                    "Because this problem is so important and so expensive, a specialized setof optimization techniques hav e been developed for solving it.",
                    "This is because ev en when the exp ected 0-1 loss is zero, one can improv e the robustnessof the classifier by further pushing the classes apart from each other, obtaining a more con\ufb01dent and reliable classifier, thus extracting more information from the training data than would hav e been possible by simply minimizing the a v erage 0-1 losson the training set.",
                    "A very important di\ufb00erence betweenoptimization in general and optimization as we use it for training algorithms is that training algorithms donot usually halt at a lo cal minim um."
                  ],
                  "equations": [
                    "y = w l \u02c6 h l \u2212 1"
                  ],
                  "references": [
                    "_optimization.txt"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "expert",
        "title": "Expert",
        "description": "Modern RNNs and Architecture Design.",
        "chapters": [
          {
            "id": "gated-rnns",
            "title": "Gated RNNs",
            "description": "LSTMs and GRUs.",
            "topics": [
              {
                "id": "lstm",
                "title": "Long Short-Term Memory",
                "summary": "Gated cells for long dependencies.",
                "assessmentPrompt": "Explain the core concept of Long Short-Term Memory and its significance.",
                "content": {
                  "intro": [
                    "One way to mitigate this problem is to train with both teacher-forced inputs and free-running inputs, for example by predicting the correct target a number of steps in the future through the unfolded recurrentoutput-to-input paths.",
                    "Another approach (Bengio et al., 2015b) to mitigate the gap between the inputs seen at training time and the inputs seen at test time randomly chooses to use generated valuesor actual data values as input.",
                    "(10.19) We can then iterate backward in time to back-propagate gradients through time, from t = \u03c4 \u2212 1 down to t = 1, noting that h (t) (for t < \u03c4 ) has as descendents both o (t) and h (t+1) ."
                  ],
                  "keyIdeas": [
                    "Such sharing is particularly important when a speci\ufb01c piece of information canoccur at multiple positions within the sequence.",
                    "Equation 10.1 is recurrent because the de\ufb01nitionof s at time t refers back to the same de\ufb01nition at time t \u2212 1.",
                    "Regardlessof the sequence length, the learned model always has the same input size, because it is speci\ufb01ed in termsof transition from one state to another state, rather than speci\ufb01ed in termsof a variable-length history of states."
                  ],
                  "equations": [
                    "i = \u03c3 \uf8eb \uf8ed b r i + \ue058 j U r i,j x (t) j + \ue058 j W r i,j h (t) j \uf8f6 \uf8f8",
                    "i = f (t) is (t\u22121) i + g (t) i \u03c3 \uf8eb \uf8ed b i + \ue058 j U i,j x (t) j + \ue058 j W i,j h (t\u22121) j \uf8f6 \uf8f8 , (10"
                  ],
                  "references": [
                    "rnn.html"
                  ]
                }
              },
              {
                "id": "gru",
                "title": "Gated Recurrent Unit",
                "summary": "Simplified gating.",
                "assessmentPrompt": "Explain the core concept of Gated Recurrent Unit and its significance.",
                "content": {
                  "intro": [
                    "Each member of the output is produced using the same update rule applied to the previousoutputs.",
                    "Then, for each time step from t = 1 to t = \u03c4, we apply the following update equations: a (t) = b + W h (t\u22121) + Ux (t) , (10.8) h (t) = tanh(a (t) ), (10.9) o (t) = c + V h (t) , (10.10) \u02c6 y (t) = softmax(o (t) ), (10.11) where the parameters are the bias vectors b and c along with the weight matrices U , V and W , respectively, for input-to-hidden, hidden-to-output and hidden- to-hidden connections.",
                    "This approach requires adding anextra input to the recurrent update at each time step so that the recurrent update is aware of whether it is near the end of the generated sequence."
                  ],
                  "keyIdeas": [
                    "Such sharing is particularly important when a speci\ufb01c piece of information canoccur at multiple positions within the sequence.",
                    "Equation 10.1 is recurrent because the de\ufb01nitionof s at time t refers back to the same de\ufb01nition at time t \u2212 1.",
                    "Regardlessof the sequence length, the learned model always has the same input size, because it is speci\ufb01ed in termsof transition from one state to another state, rather than speci\ufb01ed in termsof a variable-length history of states."
                  ],
                  "equations": [
                    "i = \u03c3 \uf8eb \uf8ed b r i + \ue058 j U r i,j x (t) j + \ue058 j W r i,j h (t) j \uf8f6 \uf8f8",
                    "i = f (t) is (t\u22121) i + g (t) i \u03c3 \uf8eb \uf8ed b i + \ue058 j U i,j x (t) j + \ue058 j W i,j h (t\u22121) j \uf8f6 \uf8f8 , (10"
                  ],
                  "references": [
                    "rnn.html"
                  ]
                }
              }
            ]
          },
          {
            "id": "optimization-challenges",
            "title": "Optimization Challenges",
            "description": "Why training is hard.",
            "topics": [
              {
                "id": "vanishing-grad",
                "title": "Vanishing & Exploding Gradients",
                "summary": "Instability in deep nets.",
                "assessmentPrompt": "Explain the core concept of Vanishing & Exploding Gradients and its significance.",
                "content": {
                  "intro": [
                    "This topic covers Vanishing & Exploding Gradients, focusing on vanishing, exploding."
                  ],
                  "keyIdeas": [
                    "Because this problem is so important and so expensive, a specialized setof optimization techniques hav e been developed for solving it.",
                    "This is because ev en when the exp ected 0-1 loss is zero, one can improv e the robustnessof the classifier by further pushing the classes apart from each other, obtaining a more con\ufb01dent and reliable classifier, thus extracting more information from the training data than would hav e been possible by simply minimizing the a v erage 0-1 losson the training set.",
                    "A very important di\ufb00erence betweenoptimization in general and optimization as we use it for training algorithms is that training algorithms donot usually halt at a lo cal minim um."
                  ],
                  "equations": [],
                  "references": [
                    "_optimization.txt"
                  ]
                }
              },
              {
                "id": "saddle-points",
                "title": "Saddle Points",
                "summary": "Non-convex surfaces.",
                "assessmentPrompt": "Explain the core concept of Saddle Points and its significance.",
                "content": {
                  "intro": [
                    "Some p oin ts around a saddle point hav e greater cost than the saddle point, while others hav e a lo wer cost.",
                    "At a saddle point, the Hessian matrix has both positive and negative eigen values.",
                    "We can think of a saddle point as being a lo cal minim um along one cross-sectionof the cost function and a lo cal maxim um along another cross-section."
                  ],
                  "keyIdeas": [
                    "Because this problem is so important and so expensive, a specialized setof optimization techniques hav e been developed for solving it.",
                    "This is because ev en when the exp ected 0-1 loss is zero, one can improv e the robustnessof the classifier by further pushing the classes apart from each other, obtaining a more con\ufb01dent and reliable classifier, thus extracting more information from the training data than would hav e been possible by simply minimizing the a v erage 0-1 losson the training set.",
                    "A very important di\ufb00erence betweenoptimization in general and optimization as we use it for training algorithms is that training algorithms donot usually halt at a lo cal minim um."
                  ],
                  "equations": [],
                  "references": [
                    "_optimization.txt"
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "generative",
    "title": "Generative Models",
    "description": "Modeling data distributions and sampling.",
    "levels": [
      {
        "id": "practitioner",
        "title": "Practitioner",
        "description": "Basics of Generative Models.",
        "chapters": [
          {
            "id": "boltzmann",
            "title": "Boltzmann Machines",
            "description": "Energy-based models.",
            "topics": [
              {
                "id": "rbm",
                "title": "Restricted Boltzmann Machines",
                "summary": "Building blocks of DBNs.",
                "assessmentPrompt": "Explain the core concept of Restricted Boltzmann Machines and its significance.",
                "content": {
                  "intro": [
                    "The Boltzmann machine is an energy-based model (section 16.2.4), 651 CHAPTER 20.",
                    "DEEP GENERATIVE MODELS meaning we de\ufb01ne the joint probability distribution using an energy function: P (x) = exp (\u2212E(x)) Z , (20.1) where E ( x ) is the energy function, and Z is the partition function that ensures that \ue050 x P (x) = 1.",
                    "The energy functionof the Boltzmann machine is given by E(x) = \u2212x \ue03e Ux \u2212 b \ue03e x, (20.2) where U is the \u201cweight\u201d matrix of model parameters and b is the vector of bias parameters."
                  ],
                  "keyIdeas": [
                    "(20.16) 20.2.2 Training Restricted Boltzmann Machines Because the RBM admits e\ufb03cient evaluation and di\ufb00erentiationof \u02dc P ( v ) and e\ufb03cient MCMC sampling in the form of block Gibbs sampling, it can readily be trained with any of the techniques described in chapter 18 for training models that have intractable partition functions.",
                    "Compared to other undirected models used in deep learning, the RBM is relatively straightforward to train because we can compute P ( h | v ) 656 CHAPTER 20.",
                    "Today, deep belief networks have mostly fallenoutof favor and are rarely used, even compared to other unsupervised or generative learning algorithms, but they are still deservedly recognized for their important role in deep learning history."
                  ],
                  "equations": [
                    "i = W k,i",
                    "Z = \ue058 v \ue058 h exp {\u2212E(v, h)}"
                  ],
                  "references": [
                    "generative_models.html"
                  ]
                }
              },
              {
                "id": "dbn",
                "title": "Deep Belief Networks",
                "summary": "Stacking RBMs.",
                "assessmentPrompt": "Explain the core concept of Deep Belief Networks and its significance.",
                "content": {
                  "intro": [
                    "Typically every visible unit is connected to every hidden unit, but it is possible to construct sparsely connected RBMs suchas convolutional RBMs. (b) A deep belief network is a hybrid graphical model involving both directed and undirected connections.",
                    "All the local conditional probability distributions needed by the deep belief network are copied directly from the local conditional probability distributionsofits constituent RBMs. Alternatively, we could alsorepresent the deep belief network with a completely undirected graph, but itwould need intralayer connections to capture the dependencies between parents.",
                    "20.3 Deep Belief Networks Deep belief networks (DBNs) were one of the \ufb01rst nonconvolutional models to successfully admit training of deep architectures (Hinton et al., 2006; Hinton, 2007b)."
                  ],
                  "keyIdeas": [
                    "(20.16) 20.2.2 Training Restricted Boltzmann Machines Because the RBM admits e\ufb03cient evaluation and di\ufb00erentiationof \u02dc P ( v ) and e\ufb03cient MCMC sampling in the form of block Gibbs sampling, it can readily be trained with any of the techniques described in chapter 18 for training models that have intractable partition functions.",
                    "Compared to other undirected models used in deep learning, the RBM is relatively straightforward to train because we can compute P ( h | v ) 656 CHAPTER 20.",
                    "Today, deep belief networks have mostly fallenoutof favor and are rarely used, even compared to other unsupervised or generative learning algorithms, but they are still deservedly recognized for their important role in deep learning history."
                  ],
                  "equations": [],
                  "references": [
                    "generative_models.html"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "specialist",
        "title": "Specialist",
        "description": "Autoencoders and VAEs.",
        "chapters": [
          {
            "id": "autoencoders",
            "title": "Autoencoders",
            "description": "Learning representations.",
            "topics": [
              {
                "id": "undercomplete",
                "title": "Undercomplete Autoencoders",
                "summary": "Compression.",
                "assessmentPrompt": "Explain the core concept of Undercomplete Autoencoders and its significance.",
                "content": {
                  "intro": [
                    "14.1 Undercomplete Autoencoders Copying the input to the output may sound useless, but we are typically not interested in the outputof the decoder.",
                    "An autoencoder whose code dimension is less than the input dimension is called undercomplete .",
                    "Learning an undercomplete representation forces the autoencoder to capture the most salient featuresof the training data."
                  ],
                  "keyIdeas": [
                    "Because the model is forced to prioritize whichaspectsof the input should be copied, itoften learns useful propertiesof the data.",
                    "Their encodings are naturally useful because the models were trained to approximately maximize the probability of the training data rather than to copy the input to the output.",
                    "This view is described in section 5.6. Regularized autoencoders defy such an interpretation because the regularizer dependson the data and is therefore by de\ufb01nition not a prior in the formal sense of the word."
                  ],
                  "equations": [],
                  "references": [
                    "autoencoders.html"
                  ]
                }
              },
              {
                "id": "regularized-ae",
                "title": "Regularized Autoencoders",
                "summary": "Robust features.",
                "assessmentPrompt": "Explain the core concept of Regularized Autoencoders and its significance.",
                "content": {
                  "intro": [
                    "14.2.1 Sparse Autoencoders A sparse autoencoder is simply an autoencoder whose training criterion involves a sparsity penalty \u2126( h ) on the code layer h , in addition to the reconstruction error: L(x, g(f(x))) + \u2126(h), (14.2) where g ( h ) is the decoder output, and typically we have h = f ( x ), the encoder output.",
                    "Sparse autoencoders are typically used to learn features for another task, suchas classification.",
                    "An autoencoder that has been regularized to be sparse must respond to unique statistical featuresof the dataset it has been trained on, rather than simply acting as an identity function."
                  ],
                  "keyIdeas": [
                    "Because the model is forced to prioritize whichaspectsof the input should be copied, itoften learns useful propertiesof the data.",
                    "Their encodings are naturally useful because the models were trained to approximately maximize the probability of the training data rather than to copy the input to the output.",
                    "This view is described in section 5.6. Regularized autoencoders defy such an interpretation because the regularizer dependson the data and is therefore by de\ufb01nition not a prior in the formal sense of the word."
                  ],
                  "equations": [
                    "h = f( \u02dc x)), (14",
                    "L = \u2212log p decoder ( x | h = f ( \u02dc x )), where \u02dc x is a corrupted versionof the data example x , obtaine"
                  ],
                  "references": [
                    "autoencoders.html"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "id": "expert",
        "title": "Expert",
        "description": "Advanced Sampling.",
        "chapters": [
          {
            "id": "monte-carlo",
            "title": "Monte Carlo Methods",
            "description": "Approximate inference.",
            "topics": [
              {
                "id": "mcmc",
                "title": "Markov Chain Monte Carlo",
                "summary": "Sampling from complex distributions.",
                "assessmentPrompt": "Explain the core concept of Markov Chain Monte Carlo and its significance.",
                "content": {
                  "intro": [
                    "That is the approach of Monte Carlo Markov chains (section 17.3).",
                    "17.3 Markov Chain Monte Carlo Methods In many cases, we wish to use a Monte Carlo technique but there is no tractable method for drawing exact samples from the distribution p model ( x ) or from a good (low variance) importance sampling distribution q ( x ).",
                    "In these cases, we introduce a mathematical tool called a Markov chainto approximately sample from p model ( x )."
                  ],
                  "keyIdeas": [
                    "17.1 Sampling and Monte Carlo Methods Many important technologies used to accomplish machine learning goals are based on drawing samples from some probability distribution and using these samples toform a Monte Carlo estimate of some desired quantity.",
                    "17.2 Importance Sampling An important step in the decompositionof the integrand (or summand) used by the Monte Carlo method in equation 17.2 is deciding which partof the integrand should play the role of probability p ( x ) and which partof the integrand should play the role of the quantity f ( x ) whose expected value (under that probability distribution) is to be estimated.",
                    "There is no unique decomposition because p ( x ) f ( x ) can always be rewritten as p(x)f(x) = q(x) p(x)f(x) q(x) , (17.8) where we now sample from q and average pf q ."
                  ],
                  "equations": [
                    "x = i) = v i",
                    "j = T (x \ue030 = i | x ="
                  ],
                  "references": [
                    "monte_carlo.html"
                  ]
                }
              },
              {
                "id": "gibbs",
                "title": "Gibbs Sampling",
                "summary": "Alternating updates.",
                "assessmentPrompt": "Explain the core concept of Gibbs Sampling and its significance.",
                "content": {
                  "intro": [
                    "17.4 Gibbs Sampling Sofar we have described how to draw samples from a distribution q ( x ) by repeatedly updating x \u2190 x \ue030 \u223c T ( x \ue030 | x ).",
                    "A conceptually simple and e\ufb00ective approach to building a Markov chain that samples from p model ( x ) is to use Gibbs sampling , in which sampling from T ( x \ue030 | x ) is accomplished by selecting one variable x i and sampling it from p model conditioned on its neighbors in the undirected graph G de\ufb01ning the structure of the energy-based model.",
                    "We can also sample several variables at the same time as long as they are conditionally independent given all their neighbors."
                  ],
                  "keyIdeas": [
                    "17.1 Sampling and Monte Carlo Methods Many important technologies used to accomplish machine learning goals are based on drawing samples from some probability distribution and using these samples toform a Monte Carlo estimate of some desired quantity.",
                    "17.2 Importance Sampling An important step in the decompositionof the integrand (or summand) used by the Monte Carlo method in equation 17.2 is deciding which partof the integrand should play the role of probability p ( x ) and which partof the integrand should play the role of the quantity f ( x ) whose expected value (under that probability distribution) is to be estimated.",
                    "There is no unique decomposition because p ( x ) f ( x ) can always be rewritten as p(x)f(x) = q(x) p(x)f(x) q(x) , (17.8) where we now sample from q and average pf q ."
                  ],
                  "equations": [
                    "a = \u2212 1, the probability of assigning b to be \u2212 1 is close to 1",
                    "b = 1 | a = 1) = \u03c3 ( w )"
                  ],
                  "references": [
                    "monte_carlo.html"
                  ]
                }
              }
            ]
          },
          {
            "id": "partition",
            "title": "Partition Function",
            "description": "Dealing with normalization.",
            "topics": [
              {
                "id": "partition-func",
                "title": "The Partition Function",
                "summary": "Intractable normalization.",
                "assessmentPrompt": "Explain the core concept of The Partition Function and its significance.",
                "content": {
                  "intro": [
                    "Chapter 18 Confronting the Partition Function In section 16.2.2 we saw that many probabilistic models (commonly known as undi- rected graphical models) are de\ufb01ned by an unnormalized probability distribution \u02dcp ( x ; \u03b8 ).",
                    "We must normalize \u02dcp by dividing by a partition function Z ( \u03b8 ) to obtain a valid probability distribution: p(x; \u03b8) = 1 Z(\u03b8) \u02dcp(x; \u03b8).",
                    "(18.1) The partition function is an integral (for continuous variables) or sum (for discrete variables) over the unnormalized probability of all states: \ue05a \u02dcp(x)dx (18.2) or \ue058 x \u02dcp(x)."
                  ],
                  "keyIdeas": [
                    "Because the negative phase involves drawing samples from the model\u2019s distri- bution, we can think ofit as \ufb01nding points that the model believes in strongly.",
                    "Because the negative phase acts toreduce the probability of those points, they are generally considered torepresent the model\u2019s incorrect beliefs about the world.",
                    "This approach is presented as algorithm 18.2. Obtaining samples from the data distribution is free, because they are already available in the dataset."
                  ],
                  "equations": [
                    "FUNCTION = \u03c3 \ue012 \u2212log p noise (x) p model (x) \ue013 (18",
                    "k=1 \u02dcp"
                  ],
                  "references": [
                    "partition.html"
                  ]
                }
              },
              {
                "id": "cd",
                "title": "Contrastive Divergence",
                "summary": "Approximating gradients.",
                "assessmentPrompt": "Explain the core concept of Contrastive Divergence and its significance.",
                "content": {
                  "intro": [
                    "In this case, we can interpret the positive phase as pushing downon the energy of training examples and the negative phase as pushing up on the energy of samples drawn from the model, as illustrated in \ufb01gure 18.1. 18.2 Stochastic Maximum Likelihood and Contrastive Divergence The naive way of implementing equation 18.15 is to compute it by burning in a setof Markov chains from a random initialization every time the gradient is needed.",
                    "CONFRONTING THE PARTITION FUNCTION Algorithm 18.2 The contrastive divergence algorithm, using gradient ascent as the optimization procedure Set \ue00f, the step size, to a small positive number.",
                    "The contrastive divergence (CD, or CD- k to indicate CD with k Gibbs steps) algorithm initializes the Markov chain at each step with samples from the data distribution (Hinton, 2000, 2010)."
                  ],
                  "keyIdeas": [
                    "Because the negative phase involves drawing samples from the model\u2019s distri- bution, we can think ofit as \ufb01nding points that the model believes in strongly.",
                    "Because the negative phase acts toreduce the probability of those points, they are generally considered torepresent the model\u2019s incorrect beliefs about the world.",
                    "This approach is presented as algorithm 18.2. Obtaining samples from the data distribution is free, because they are already available in the dataset."
                  ],
                  "equations": [
                    "i=1 \u2207 \u03b8 log \u02dcp( \u02dc x (i) ; \u03b8)",
                    "i = 1 to k dofor j = 1 to m do \u02dc x (j) \u2190 gibbs_update( \u02dc x (j) )"
                  ],
                  "references": [
                    "partition.html"
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
