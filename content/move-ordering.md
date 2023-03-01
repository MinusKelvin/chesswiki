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

# Heuristics

Heuristics are used to guess which moves are more likely to cause a cutoff.

## General ordering

The most important move ordering heuristic comes from the transposition table: the best move in a previous search of the position is likely to remain the best move in the current search.
After that, 

- Move from the {% include link to="content/transposition-table.md" %}
- Good captures
- Quiets
- Bad captures

The classification of captures as good or bad is typically done through {% include link to="content/static-exchange-evaluation.md" lowercase=true %} (SEE).
In engines which do not use SEE, it is typical for all captures to be ordered before quiets.

## Ordering captures

- {% include link to="content/mvv-lva.md" %}
- {% include link to="content/static-exchange-evaluation.md" %}

## Ordering quiets

- {% include link to="content/history-heuristic.md" %}
- {% include link to="content/killer-move.md" %}
- {% include link to="content/counter-move.md" %}

# See Also

- {% include link to="content/alpha-beta.md" %}
