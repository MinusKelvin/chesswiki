---
title: Iterated Deepening
---

**Iterated deepening** is a technique in which [depth-limited searches](#depth-limited-search) are performed at successively greater depths.
This introduces non-terminal leaf nodes to the search, which are assigned a value using an evaluation function.
In Chess engines, this is used to transform the underlying depth-first search algorithm into an anytime algorithm, which quickly obtains an estimate of the value and uses the remaining time to refine the estimate.

# Algorithm

```py
def iterated_deepening(state):
    depth = 1
    while not should_stop():
        value = depth_limited_search(state, depth)
        depth += 1
    return value
```

The `depth_limited_search` function is a depth-limited form of any depth-first search strategy, such as {% include link to="content/alpha-beta.md" lowercase=true %}.

## Theoretical Properties

The time complexity of an iterated deepening search to depth $$d$$ is $$O(b^d)$$ (where $$b$$ is the maximum branching factor of the search), the same as the time complexity of a depth-limited search to depth $$d$$.
While the work done by a depth $$d$$ iterative deepening search can be characterized as $$b^1 + b^2 + \cdots + b^{d-1} + b^d$$, the $$b^d$$ term dominates the others, resulting in the same asymptotic time complexity.

# Depth-limited Search

Any existing depth-first search algorithm can be altered into a depth-limited search through the addition of a depth limiting parameter typically called `depth` which decreases by one every recursive call and a conditional which returns an estimate of a node's value when `depth` is zero.
For example, a depth-limited version of basic {% include link to="redirect/negamax.md" lowercase=true %} would look like:

```py
def depth_limited_negamax(state, depth):
    if state.is_terminal():
        return state.player_relative_terminal_value()
    if depth == 0:
        return state.player_relative_evaluation()
    best = -INF
    for move in state.generate_moves():
        next_state = state.play_move(move)
        value = -negamax(next_state, depth - 1)
        best = max(best, value)
    return best
```

# Advantages of Iterated Deepening

Counterintuitively, in sophisticated alpha-beta searches it is often faster to perform iterated deepening to some depth $$d$$ than to simply run a depth-limited search to depth $$d$$.
This is due to the use of dynamic {% include link to="content/move-ordering.md" lowercase=true %} techniques which benefit from the searches of the previous iterations.

TODO: perform experiment

# See Also

- {% include link to="content/time-management.md" %}
