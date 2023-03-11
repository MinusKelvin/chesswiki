---
title: Move Ordering
---
Move ordering has a large impact on the efficiency of an {% include link to="content/alpha-beta.md" lowercase=true %} search.
If the refutation is the last move searched, then alpha-beta will search the same number of nodes as minimax.
However, if a refutation is searched before any other moves, then alpha-beta can eliminate all of the sibling subtrees and complete very quickly.

# Impact on search

Consider a game with a fixed branching factor of 10.
The following table shows how many leaf nodes minimax, a typical randomly-ordered alpha-beta search, and a perfectly-ordered alpha-beta search would search respectively.

Depth | Minimax        | Random order  | Savings | Perfect order | Savings
-----:| --------------:| ------------: | -------:| -------------:| ------:
    1 |             10 |            10 |      0% |            10 | 0%
    2 |            100 |            50 |     50% |            19 | 81%
    3 |          1,000 |           389 |     61% |           109 | 89%
    4 |         10,000 |         2,123 |     79% |           199 | 98%
    5 |        100,000 |        10,991 |     89% |         1,099 | 98.9%
    6 |      1,000,000 |        60,206 |     94% |         1,999 | 99.8%
    7 |     10,000,000 |       331,315 |   96.7% |        10,999 | 99.89%
    8 |    100,000,000 |     1,504,449 |   98.5% |        19,999 | 99.98%
    9 |  1,000,000,000 |     9,194,464 |   99.1% |       109,999 | 99.989%
   10 | 10,000,000,000 |    39,397,559 |   99.6% |       199,999 | 99.998%

Even with random move ordering, alpha-beta searches a fraction of the nodes minimax does!

# Heuristics

Heuristics are used to guess which moves are more likely to cause a cutoff.

## General ordering

The most important move ordering heuristic is the {% include link to="redirect/hash-move.md" lowercase=true %}.
The best move from a previous search of the position (in an {% include link to="content/iterated-deepening.md" lowercase=true %} framework) is retrieved from the transposition table and ordered first.
The best move of the previous search is very likely (~90%) to remain the best move in the next search.

After that, moves are typically grouped according to move type, for example, ordering captures before non-captures or moves which give check before moves which do not give check.
Techniques such as {% include link to="content/static-exchange-evaluation.md" lowercase=true %} (SEE) may be used to refine these groupings, such as distinguishing between captures that appear to lose material.

An example of how moves might be ordered in a Chess engine is:

1. Move from the transposition table
2. Captures
3. Queen promotions
4. Quiets
5. Underpromotions

## Ordering captures

These techniques are often used to order capturing moves, and are sometimes combined to resolve ties.

- {% include link to="content/mvv-lva.md" %}
- {% include link to="content/static-exchange-evaluation.md" %}
- {% include link to="redirect/capture-history.md" %}

## Ordering quiets

These techniques are often used to order quiet moves.

- {% include link to="content/history-heuristic.md" %}
- {% include link to="content/killer-move.md" %}
- {% include link to="content/counter-move.md" %}
- {% include link to="redirect/continuation-history.md" %}

# See Also

- {% include link to="content/alpha-beta.md" %}
