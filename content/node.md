---
title: Node
---

A node is a vertex in a game tree, and are often categorized based on a number of properties.

# Game Tree Topology

- The **Root node** is the node at the start state of the search.
- **Leaf nodes** are nodes which are not explored, but which instead have a value immediately returned, such as at terminal nodes or when reaching depth 0 in a {% include link to="redirect/depth-limited.md" lowercase=true %}.
- **Terminal nodes** are a kind of leaf node which is an end state of the game, such as when a player is in checkmate or when the fifty-move rule is triggered.
- **Interior nodes** are nodes which are not leaf nodes. These nodes are explored further by the search.
- **Sibling nodes** are nodes which share the same parent node.

# Depth-related Terms

These terms relate to {% include link to="redirect/depth-limited.md" text="depth-limited searches" %}.

- **Horizon nodes** are leaf nodes with depth 0, and so are leaf nodes (in the absence of ).
- **Frontier nodes** are interior nodes searched with depth 1.
- **Pre-Frontier nodes** are interior nodes searched with depth 2.
- **Quiescent nodes** are nodes with depth at or below 0 which are searched as part of {% include link to="content/quiescence-search.md" lowercase=true %}.

# Alpha-Beta Search

These terms relate to {% include link to="content/alpha-beta.md" lowercase=true %} search frameworks.

- **PV nodes** (sometimes referred to as **Type 1**) are interior nodes where a move is found with a value that exceeds alpha but not beta. In {% include link to="content/pvs.md" lowercase=true %}, this refers to any node searched with a nonempty window.
- **Cut nodes** (sometimes referred to as **Type 2**) are interior nodes where a move is found with a value that exceeds beta.
- **All nodes** (sometimes referred to as **Type 3**) are interior nodes where no move is found with a value that exceeds alpha.

# See Also

- {% include link to="content/alpha-beta.md" %}
- {% include link to="content/pvs.md" %}
- {% include link to="content/quiescence-search.md" %}
