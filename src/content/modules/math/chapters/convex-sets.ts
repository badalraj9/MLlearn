import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "convex-sets",
  title: "Convex Sets",
  description:
    "The geometry of convex regions and their fundamental role in optimization.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A convex set is a region where you can travel in a straight line between any two points and never leave the region. Imagine a circle: draw any two points inside it, connect them with a line, and the entire line stays inside the circle. Now imagine a crescent moon shape: you can find two points inside where the connecting line passes outside the shape. Circles are convex; crescents are not.",
          "The formal definition captures this intuition: a set C is convex if for any two points x, y in C, the entire line segment λx + (1-λ)y is also in C for all λ between 0 and 1. This formula is just saying 'the point partway between x and y'—when λ = 0.5, you get the midpoint. The set is convex if every such intermediate point belongs to the set.",
          "Why does this matter? In optimization, the 'feasible region'—all points satisfying your constraints—is often a convex set. If you're minimizing a convex function over a convex set, you have a convex optimization problem with all the nice properties: local minima are global, efficient algorithms exist, and theory guarantees convergence. Much of modern optimization theory is about recognizing and exploiting convexity.",
        ],
        keyIdeas: [
          "A set is convex if the line between any two points stays inside the set",
          "Circles, squares, and triangles are convex; stars and crescents are not",
          "The feasible region of constraints in optimization is often a convex set",
          "Convex sets + convex functions = tractable optimization problems",
          "The entire field of convex optimization rests on convex set geometry",
        ],
        equations: [
          "\\[ C \\text{ is convex} \\iff \\forall x, y \\in C, \\forall \\lambda \\in [0,1] : \\lambda x + (1-\\lambda)y \\in C \\]",
          "\\[ \\text{Line segment: } [x, y] = \\{\\lambda x + (1-\\lambda)y : \\lambda \\in [0,1]\\} \\]",
        ],
        references: [
          "3Blue1Brown - Essence of Linear Algebra",
          "StatQuest - Support Vector Machines",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Several fundamental shapes are convex. Hyperplanes {x : aᵀx = b} and halfspaces {x : aᵀx ≤ b} are convex. Polyhedra—intersections of halfspaces—are convex. Norm balls {x : ‖x‖ ≤ r} are convex for any norm. The probability simplex {p : pᵢ ≥ 0, Σpᵢ = 1} is convex. The set of positive semidefinite matrices S₊ⁿ is convex. These building blocks appear throughout machine learning as constraint sets.",
          "Operations preserving convexity let us build complex convex sets from simple ones. The intersection of convex sets is convex—this is why polyhedra (intersections of halfspaces) are convex. Affine transformations preserve convexity: if C is convex, then {Ax + b : x ∈ C} is convex. The Minkowski sum A + B = {a + b : a ∈ A, b ∈ B} of convex sets is convex. However, unions generally do not preserve convexity.",
          "The convex hull conv(S) is the smallest convex set containing S—equivalently, the set of all convex combinations of points in S. Any point in the convex hull can be written as Σλᵢxᵢ with λᵢ ≥ 0 and Σλᵢ = 1. The convex hull of a finite set of points is a polytope. In machine learning, the convex hull of data points defines the region of achievable predictions for linear models.",
          "The separating hyperplane theorem is fundamental: if C and D are disjoint convex sets, there exists a hyperplane that separates them. Strict separation requires additional conditions (e.g., one set compact, one closed). This theorem underlies support vector machines, duality theory, and proofs of optimality conditions. If x* is optimal, there exists a supporting hyperplane at x* that separates the feasible region from the sublevel sets.",
        ],
        keyIdeas: [
          "Halfspaces, polyhedra, norm balls, and the probability simplex are all convex",
          "Intersection and affine transformations preserve convexity",
          "Convex hull: smallest convex set containing given points",
          "Separating hyperplane theorem: disjoint convex sets can be separated",
          "SVM finds the maximum-margin separating hyperplane between classes",
          "Supporting hyperplanes at optimal points characterize solutions",
        ],
        equations: [
          "\\[ \\text{Halfspace: } \\{x : a^T x \\leq b\\} \\quad \\text{Polyhedron: } \\{x : Ax \\leq b\\} \\]",
          "\\[ \\text{conv}(S) = \\left\\{ \\sum_{i=1}^k \\lambda_i x_i : x_i \\in S, \\lambda_i \\geq 0, \\sum \\lambda_i = 1 \\right\\} \\]",
          "\\[ \\text{Separation: } \\exists a, b : a^T x \\leq b \\; \\forall x \\in C, \\quad a^T y \\geq b \\; \\forall y \\in D \\]",
        ],
        references: [
          "Boyd & Vandenberghe - Convex Optimization, Chapter 2",
          "Rockafellar - Convex Analysis, Chapter 1",
          "Bertsekas - Convex Optimization Theory",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "The support function h_C(y) = sup{x ∈ C : yᵀx} provides a dual representation of convex sets. For compact convex C, the set is uniquely determined by its support function: C = ∩_{‖y‖=1} {x : yᵀx ≤ h_C(y)}. The support function is convex and positively homogeneous. This dual representation is crucial in robust optimization, where uncertainty sets are specified via support functions.",
          "Projection onto convex sets P_C(x) = argmin_{y ∈ C} ‖y - x‖ is a fundamental operation. The projection exists and is unique for closed convex sets. Key property: x - P_C(x) defines a separating hyperplane between x and C. Projected gradient descent alternates between gradient steps and projections, enabling optimization over convex constraints. The convergence rate depends on the 'condition number' of the constraint set.",
          "Polar sets C° = {y : yᵀx ≤ 1 for all x ∈ C} provide a notion of duality for convex sets. The polar of a norm ball is the unit ball of the dual norm. The bipolar theorem states that (C°)° = C for closed convex sets containing the origin. This connects to the notion of dual norms in regularized optimization: L1 regularization projects onto the L∞ ball in the dual.",
          "Convex relaxations approximate non-convex problems with convex ones. Boolean variables x ∈ {0,1} become continuous x ∈ [0,1]; rank constraints become nuclear norm constraints. The tightest convex relaxation is the convex hull of the feasible set. Semidefinite programming relaxations have revolutionized combinatorial optimization, achieving near-optimal solutions for MAXCUT, sensor localization, and phase retrieval.",
          "Self-concordant barriers enable interior point methods with provable polynomial-time complexity. A ν-self-concordant barrier F for C satisfies certain differential inequalities; Newton's method on F achieves O(√n log(1/ε)) iteration complexity. The universal barrier has parameter ν = n; the log-barrier for polyhedra {Ax ≤ b} is m-self-concordant. This theory explains why interior point methods converge so efficiently on convex problems.",
        ],
        keyIdeas: [
          "Support function h_C(y) = sup{x∈C : yᵀx} gives dual set representation",
          "Projection onto convex sets is unique and defines separating hyperplanes",
          "Polar sets C° provide set duality; bipolar theorem: (C°)° = C",
          "Convex relaxations approximate non-convex problems with tractable ones",
          "Self-concordant barriers enable polynomial-time interior point methods",
          "Semidefinite relaxations solve combinatorial problems via convex optimization",
        ],
        equations: [
          "\\[ h_C(y) = \\sup_{x \\in C} y^T x \\quad \\text{(Support function)} \\]",
          "\\[ P_C(x) = \\arg\\min_{y \\in C} \\|y - x\\|^2 \\quad \\text{(Projection)} \\]",
          "\\[ C^\\circ = \\{y : y^T x \\leq 1, \\forall x \\in C\\} \\quad \\text{(Polar set)} \\]",
          "\\[ \\nu\\text{-barrier: } |D^3 F(x)[h, h, h]| \\leq 2(D^2 F(x)[h, h])^{3/2} \\]",
        ],
        references: [
          "Rockafellar - Convex Analysis, Chapters 13-14",
          "Nesterov & Nemirovski - Interior-Point Polynomial Algorithms",
          "arXiv:1303.2285 - Convex Relaxations in Combinatorial Optimization",
          "Luo, Sturm & Zhang - Duality and Self-Concordant Barriers",
        ],
      },
    },
  ],
};

export default chapter;
