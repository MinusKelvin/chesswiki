---
title: Alpha-Beta
---

**Alpha-beta** ($$\alpha \beta$$) pruning is an improvement over the basic {% include link to="content/minimax.md" lowercase=true %} algorithm which produces the same result but performs substantially less work.
It works by tracking the best value each player is assured of in alternative lines of play.
If a move is to provide a better value than what the opponent will allow, then the line has been *refuted* and there is no need to search the remaining moves.
Because of this, alpha-beta benefits greatly from good {% include link to="content/move-ordering.md" lowercase=true %} heuristics.

# Algorithm

Alpha-beta is a minimax search which is augmented with the additional parameters `alpha` ($$\alpha$$) and `beta` ($$\beta$$).
These parameters represent the best values that the maximizing and minimizing players are known to have in some other line of play, respectively.
When searching the root node of the game tree with alpha-beta, `alpha` and `beta` start at $$- \infty$$ and $$+ \infty$$ respectively.
In a {% include link to="redirect/negamax.md" lowercase=true %} framework, the algorithm is implemented as:

```py
def negamax_alpha_beta(state, alpha, beta):
    if state.is_terminal():
        return state.player_relative_terminal_value()
    best = -INF
    for move in state.generate_moves():
        next_state = state.play(move)
        value = -negamax_alpha_beta(next_state, -beta, -alpha)
        best = max(best, value)
        alpha = max(alpha, value)
        if value >= beta:
            break
    return best
```

Note that the recursive negamax call passes in `-beta` as alpha for the opponent and `-alpha` as beta for the opponent.
This performs the required perspective flip for the search window.
In a plain minimax framework, alpha and beta are passed as-is instead.

When a move which is better than `alpha` is found, `alpha` is set to the move's value (line 7) as the player is assured that they can get that value by playing that move.
However, when a move is found which is so good that its value exceeds `beta` (line 8), then the opponent would have preferred to play a different move earlier in the game.
Therefore, the opponent will not enter this line of play, and no further moves need to be searched.
This is called a *beta-cutoff*.

Contrary to the above explanation, a cutoff occurs not only when a move's value exceeds `beta` but also when it matches it exactly.
In this case, it does not matter to the opponent which line of play they enter.
This tie can be arbitrarily broken in favor of the already-searched alternative line of play, resulting in the same claim as before: the opponent would have preferred to play a different move earlier in the game, and no further moves need to be searched.

## Theoretical Properties

The value returned by alpha-beta is not necessarily the true minimax value if the true value lies outside the range bounded by $$\alpha$$ and $$\beta$$.
If the true minimax value of the position is denoted by $$v$$ and the return value of the alpha-beta search function is denoted by $$r$$, then:

- If $$\alpha < v < \beta$$, then $$r = v$$; alpha-beta returns the true value
- If $$v \le \alpha$$, then $$v \le r \le \alpha$$; alpha-beta returns an upper bound on the true value (termed *fail-low*)
- If $$v \ge \beta$$, then $$\beta \le r \le v$$; alpha-beta returns a lower bound on the true value (termed *fail-high*)

Alpha-beta has a worst-case time complexity of $$O(b^d)$$, but a best-case time complexity of $$O(\sqrt{b^d}) = O(b^{d/2})$$ with perfect {% include link to="content/move-ordering.md" lowercase=true %}.
The space complexity is either $$O(bd)$$ or $$O(d)$$ depending on implementation.

Alpha-beta is optimally efficient; there exists no algorithm guaranteed to return the minimax value which searches fewer nodes than alpha-beta with perfect move ordering.

# See Also

- {% include link to="content/move-ordering.md" %}
- {% include link to="content/iterative-deepening.md" %}
