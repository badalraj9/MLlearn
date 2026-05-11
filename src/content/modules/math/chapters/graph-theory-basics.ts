import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "graph-theory-basics",
  title: "Graph Theory Basics",
  description:
    "Nodes, edges, and the fundamental properties of graph structures.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "A graph is a collection of dots connected by lines—except mathematicians call them 'nodes' (or vertices) and 'edges.' Social networks are graphs: each person is a node, friendships are edges. Road maps are graphs: cities are nodes, roads are edges. The internet is a graph: webpages are nodes, hyperlinks are edges. Graphs are the universal language for representing relationships and connections.",
          "The degree of a node is how many edges touch it—your number of friends in a social network. Nodes with high degree are 'hubs' or 'influencers.' A path is a sequence of edges connecting two nodes—the route from one city to another. The shortest path is often what we care about: the fastest route, the fewest hops between computers. A cycle is a path that returns to its starting point without repeating edges.",
          "Graphs come in many flavors. Undirected graphs have edges that go both ways (friendship); directed graphs have arrows (followers, citations). Weighted graphs assign values to edges (distance, cost). Connected graphs have paths between every pair of nodes; disconnected graphs have isolated components. Trees are connected graphs with no cycles—like organizational hierarchies or file systems. Understanding which type of graph you have determines what questions you can answer.",
        ],
        keyIdeas: [
          "Nodes (vertices) represent entities; edges represent relationships",
          "Degree = number of edges connected to a node",
          "Paths connect nodes through sequences of edges; cycles return to the start",
          "Directed vs undirected: do edges have direction?",
          "Trees: connected graphs with no cycles; hierarchical structure",
        ],
        equations: [
          "\\[ G = (V, E) \\quad \\text{where } V \\text{ = vertices, } E \\text{ = edges} \\]",
          "\\[ \\deg(v) = \\text{number of edges incident to } v \\]",
          "\\[ \\text{Path: } v_0 \\to v_1 \\to \\cdots \\to v_k \\]",
        ],
        references: [
          "3Blue1Brown - Graph Theory",
          "Khan Academy - Graph representations",
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Graphs can be represented in code using adjacency matrices or adjacency lists. An adjacency matrix A is an n×n matrix where A[i,j] = 1 if there's an edge from i to j, else 0. This enables O(1) edge lookups but uses O(n²) space—inefficient for sparse graphs. Adjacency lists store each node's neighbors as a list, using O(n + m) space for n nodes and m edges, making them preferred for most applications.",
          "Breadth-first search (BFS) explores graphs layer by layer from a source node, finding shortest paths in unweighted graphs. Depth-first search (DFS) explores as far as possible along each branch before backtracking, useful for detecting cycles and topological sorting. Both run in O(n + m) time and form the foundation for countless graph algorithms. BFS uses a queue; DFS uses a stack (or recursion).",
          "Important graph properties include connectivity (can every node reach every other?), bipartiteness (can nodes be colored with two colors such that no same-colored nodes are adjacent?), and degree distribution (how many nodes have degree k?). These properties determine algorithm choices: bipartite graphs enable efficient matching algorithms; degree distribution affects random walk mixing times.",
          "Common applications: PageRank uses the graph structure of web links to rank pages—each link is a 'vote' for importance. Community detection finds clusters of densely connected nodes. Shortest path algorithms (Dijkstra, A*) power GPS navigation. Maximum flow algorithms optimize network throughput. Recommender systems use bipartite user-item graphs to suggest products.",
        ],
        keyIdeas: [
          "Adjacency matrix: O(1) lookup, O(n²) space; adjacency list: O(n+m) space",
          "BFS finds shortest paths in unweighted graphs; DFS detects cycles",
          "Both BFS and DFS run in O(n + m) time",
          "Bipartite graphs: two-colorable, no odd cycles",
          "PageRank: links as votes, foundational for search engines",
          "Community detection finds clusters; shortest path powers navigation",
        ],
        equations: [
          "\\[ A_{ij} = \\begin{cases} 1 & \\text{if edge } (i,j) \\in E \\\\\\ 0 & \\text{otherwise} \\end{cases} \\]",
          "\\[ \\text{BFS/DFS: } O(|V| + |E|) \\text{ time complexity} \\]",
          "\\[ \\text{PageRank: } PR(p) = \\frac{1-d}{N} + d \\sum_{q \\to p} \\frac{PR(q)}{\\deg(q)} \\]",
        ],
        references: [
          "Cormen et al. - Introduction to Algorithms, Chapters 22-26",
          "Easley & Kleinberg - Networks, Crowds, and Markets",
          "Newman - Networks: An Introduction",
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Spectral graph theory connects graph structure to linear algebra through the eigenvalues and eigenvectors of graph matrices. The graph Laplacian L = D - A (where D is the degree matrix) has eigenvalues 0 = λ₁ ≤ λ₂ ≤ ... ≤ λₙ. The second-smallest eigenvalue λ₂ ('algebraic connectivity' or 'Fiedler value') measures how well-connected the graph is: larger λ₂ means better connectivity. The Fiedler vector (corresponding eigenvector) enables spectral clustering.",
          "Random graph models provide null hypotheses for network analysis. The Erdős-Rényi model G(n,p) creates n nodes with each edge present independently with probability p. The degree distribution is binomial (approximately Poisson for sparse graphs). The Barabási-Albert model generates scale-free networks via preferential attachment: new nodes connect to existing nodes with probability proportional to degree ('rich get richer'), producing power-law degree distributions P(k) ∝ k⁻³ common in real networks.",
          "Graph Neural Networks (GNNs) extend deep learning to graph-structured data. The key operation is message passing: each node aggregates information from neighbors, then updates its representation. Mathematically: h_v^(l+1) = σ( Σ_{u∈N(v)} W h_u^(l) ), where N(v) denotes neighbors of v. This permutation-equivariant operation respects graph symmetries. Popular architectures include Graph Convolutional Networks (GCN), Graph Attention Networks (GAT), and Message Passing Neural Networks (MPNN).",
          "Expander graphs are sparse but highly connected—graphs that 'look random' despite being deterministic. Their expansion property h(G) = min_{S⊂V, |S|≤n/2} |∂S|/|S| measures the minimum edge boundary relative to subset size. Expanders have applications in error-correcting codes, pseudorandomness, and Markov chain mixing. The Cheeger inequality relates expansion to the spectral gap: h(G)²/2 ≤ λ₂ ≤ 2h(G).",
          "The theory of graph limits (graphons) studies sequences of dense graphs as n → ∞. A graphon is a symmetric measurable function W: [0,1]² → [0,1] that captures the limiting edge density structure. This framework enables rigorous analysis of graphons as 'limit objects' and connects to property testing and random graph theory. For sparse graphs, the theory requires additional machinery (graphingons).",
        ],
        keyIdeas: [
          "Graph Laplacian L = D - A; eigenvalue λ₂ measures connectivity (spectral gap)",
          "Fiedler vector enables spectral clustering and graph partitioning",
          "Erdős-Rényi: random edges; Barabási-Albert: preferential attachment (power law)",
          "GNNs use message passing: aggregate neighbor info, update node representations",
          "Expander graphs: sparse but highly connected; Cheeger inequality bounds spectral gap",
          "Graph limits (graphons) describe asymptotic structure of dense graph sequences",
        ],
        equations: [
          "\\[ L = D - A, \\quad \\text{eigenvalues: } 0 = \\lambda_1 \\leq \\lambda_2 \\leq \\cdots \\leq \\lambda_n \\]",
          "\\[ h(G)^2 / 2 \\leq \\lambda_2 \\leq 2h(G) \\quad \\text{(Cheeger inequality)} \\]",
          "\\[ h_v^{(l+1)} = \\sigma\\left( \\sum_{u \\in \\mathcal{N}(v)} W h_u^{(l)} \\right) \\quad \\text{(GCN layer)} \\]",
          "\\[ P(k) \\propto k^{-\\gamma} \\quad \\text{(Scale-free degree distribution)} \\]",
        ],
        references: [
          "Chung - Spectral Graph Theory",
          "Newman - Networks: An Introduction, Chapters 12-17",
          "Hamilton et al. - Inductive Representation Learning on Large Graphs (GCN)",
          "Lovász - Large Networks and Graph Limits",
        ],
      },
    },
  ],
};

export default chapter;
