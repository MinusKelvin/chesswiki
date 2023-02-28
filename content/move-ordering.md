---
title: Move Ordering
---
Move ordering has a large impact on the efficiency of an [alpha-beta]({% link content/alpha-beta.md %}) search.
If the refutation is the last move searched, then alpha-beta will search the same number of nodes as minimax.
However, if a refutation is searched before any other moves, then alpha-beta can eliminate all of the sibling subtrees and complete very quickly.

Consider a game with a fixed branching factor of 10.
The following table shows how many leaf nodes minimax, a typical randomly-ordered alpha-beta search, and a perfectly-ordered alpha-beta search would search respectively.

Depth | Minimax        | Random order  | Savings | Perfect order | Savings
-----:| --------------:| ------------: | -------:| -------------:| ------:
    1 |             10 |            10 |      0% |            10 | 0%
    2 |            100 |            51 |     49% |            19 | 81%
    3 |          1,000 |           396 |     60% |           109 | 89%
    4 |         10,000 |         2,115 |     79% |           199 | 98%
    5 |        100,000 |        10,599 |     89% |         1,099 | 98.9%
    6 |      1,000,000 |        56,972 |     94% |         1,999 | 99.8%
    7 |     10,000,000 |       330,620 |   96.7% |        10,999 | 99.89%
    8 |    100,000,000 |     1,466,597 |   98.5% |        19,999 | 99.98%
    9 |  1,000,000,000 |     9,502,838 |   99.0% |       109,999 | 99.989%
   10 | 10,000,000,000 |    39,127,044 |   99.6% |       199,999 | 99.998%

Many heuristic techniques exist to try and ensure the refutation (if any) is searched first.