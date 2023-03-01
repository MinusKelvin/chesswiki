---
title: Alpha-Beta
---

**Alpha-beta** pruning is an improvement over the basic minimax algorithm which produces the same result but performs substantially less work.
It does this by tracking the best value each player is assured of in alternative lines of play.
If a move is to provide a better value than what the opponent will allow, then the line has been *refuted* and there is no need to search the remaining moves.
Because of this, alpha-beta benefits greatly from good {% include link to="content/move-ordering.md" lowercase=true %} heuristics.

# Description

Alpha-beta is a recursive algorithm which augments the `min_player` and `max_player` functions from minimax with the additional parameters `alpha` and `beta`.
These parameters represent the best values that the maximizing and minimizing players are known to have in some other line of play, respectively.
When searching the root node of the game tree with alpha-beta, `alpha` and `beta` start at `-INF` and `+INF` respectively.

```py
def alpha_beta_max_player(state, alpha, beta):
    best = -INF
    for move in state.generate_moves():
        next_state = state.play(move)
        value = alpha_beta_min_player(next_state, alpha, beta)
        best = max(best, value)
        alpha = max(alpha, value)
        if value >= beta:
            break
    return best

def alpha_beta_min_player(state, alpha, beta):
    best = INF
    for move in state.generate_moves():
        next_state = state.play(move)
        value = alpha_beta_max_player(next_state, alpha, beta)
        best = min(best, value)
        beta = min(beta, value)
        if value <= alpha:
            break
    return best
```

If we find a move which is better than `alpha`/`beta`, we set `alpha`/`beta` to it (line 7/18) as that player is assured that they can get that value by playing that move.
However, if we find a move which is so good that its value exceeds `beta`/`alpha` (line 8/19), then the opponent would have preferred to play a different move earlier in the game.
Therefore, the opponent will not enter this line of play and we can stop searching it (line 8/20).
This is called a *beta-cutoff* or an *alpha-cutoff*, and the move which caused the cutoff is the *refutation*.

Contrary to the above explanation, a cutoff occurs not only when a move's value exceeds `beta`/`alpha` but also when it matches it exactly.
In this case, it does not matter to the opponent which line of play they enter.
Therefore, we can arbitrarily break this tie in favor of the already-searched alternative line of play, resulting in the same claim as before: the opponent would have preferred to play a different move earlier in the game, so we can stop searching this line of play.

Unlike minimax, the value returned by alpha-beta is not necessarily the true minimax value if the true value lies outside the range bounded by `alpha` and `beta`.
If the true minimax value of the position is denoted by `v` and the return value of the alpha-beta search function is denoted by `ret`, then:

- If `alpha < v < beta`, then `ret == v`; alpha-beta returns the true value
- If `v <= alpha`, then `v <= ret <= alpha`; alpha-beta returns an upper bound on the true value
- If `v >= beta`, then `beta <= ret <= v`; alpha-beta returns a lower bound on the true value

## Negamax alpha-beta

In zero-sum games such as chess, we can use the fact that the value of a position to a player is precisely the negation of the value of that position to their opponent to implement the minimizing player's search function in terms of the maximizing player's search function:

```py
def alpha_beta_min_player(state, alpha, beta):
    return -alpha_beta_max_player(state, -beta, -alpha)
```

This is often not written as a separate function but instead inlined directly into the search:

```py
def alpha_beta_negamax(state, alpha, beta):
    best = -INF
    for move in state.generate_moves():
        next_state = state.play(move)
        value = -alpha_beta_negamax(next_state, -beta, -alpha)
        best = max(best, value)
        alpha = max(alpha, value)
        if value >= beta:
            break
    return best
```

# See Also

- {% include link to="content/move-ordering.md" %}
