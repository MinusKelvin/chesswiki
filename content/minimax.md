---
title: Minimax
---

**Minimax** is the decision-making principle of minimizing the maximum possible loss, which in adversarial, deterministic, perfect-information, zero-sum games such as Chess is the {% include link to="https://en.wikipedia.org/wiki/Nash_equilibrium" text="Nash Equilibrium" %} (optimal play).
Additionally, the zero-sum property allows for a simplification called [negamax](#negamax).

# Algorithm

The basic algorithm is a depth-first search involving two functions, one for the minimizing player (`min_player`) and one for the maximizing player (`max_player`).
They differ only in whether they are looking for the move which minimizes the value or maximizes the value.
Here, values are absolute ("win for white"), not relative ("win for current player").

```py
def min_player(state):
    if state.is_terminal():
        return state.terminal_value()
    best = INF
    for move in state.generate_moves():
        next_state = state.play_move(move)
        value = max_player(next_state)
        best = min(best, value)
    return best

def max_player(state):
    if state.is_terminal():
        return state.terminal_value()
    best = -INF
    for move in state.generate_moves():
        next_state = state.play_move(move)
        value = min_player(next_state)
        best = max(best, value)
    return best
```

## Theoretical Properties

For adversarial, deterministic, perfect-information, zero-sum, finite games such as Chess, the algorithm produces optimal play.

The minimax algorithm has a time complexity of $$O(b^d)$$ and a space complexity of either $$O(bd)$$ or $$O(d)$$ depending on implementation, where $$b$$ is the maximum branching factor and $$d$$ is the maximum depth of any line of play.

Minimax is not optimally efficient; it searches more nodes than is necessary to guarantee the result.
For this reason, {% include link to="content/alpha-beta.md" lowercase=true %} is preferred.

# Negamax

In zero-sum games, the value of a position according to one player is equal to the negation of the value of the position to the other player, i.e. a position which is a win for white is a loss for black.
This allows the two search functions of minimax to be simplified into one search function which maximizes the player-relative value (not the absolute value, as in minimax).
The negation of the returned value flips the perspective of the score from the opponent to the current player.

```py
def negamax(state):
    if state.is_terminal():
        return state.player_relative_terminal_value()
    best = -INF
    for move in state.generate_moves():
        next_state = state.play_move(move)
        value = -negamax(next_state)
        best = max(best, value)
    return best
```

## Derivation

1\. Replace the `min` function using `min(a, b) == -max(-a, -b)`.

```py
def min_player(state):
    if state.is_terminal():
        return state.terminal_value()
    best = INF
    for move in state.generate_moves():
        next_state = state.play_move(move)
        value = max_player(next_state)
        best = -max(-best, -value)
    return best
```

2\. Negate the `best` variable.

```py
def min_player(state):
    if state.is_terminal():
        return state.terminal_value()
    best = -INF
    for move in state.generate_moves():
        next_state = state.play_move(move)
        value = max_player(next_state)
        best = max(best, -value)
    return -best
```

3\. Negate the return values of `min_player` and negate the result of calls to `min_player`.

```py
def min_player(state):
    if state.is_terminal():
        return -state.terminal_value()
    best = -INF
    for move in state.generate_moves():
        next_state = state.play_move(move)
        value = -max_player(next_state)
        best = max(best, value)
    return best

def max_player(state):
    if state.is_terminal():
        return state.terminal_value()
    best = -INF
    for move in state.generate_moves():
        next_state = state.play_move(move)
        value = -min_player(next_state)
        best = max(best, value)
    return best
```

4\. Replacing the absolute `state.terminal_value` function with a player-relative one results in identical functions.

```py
def negamax(state):
    if state.is_terminal():
        return state.player_relative_terminal_value()
    best = -INF
    for move in state.generate_moves():
        next_state = state.play_move(move)
        value = -negamax(next_state)
        best = max(best, value)
    return best
```

# See Also

- {% include link to="content/alpha-beta.md" %}
- {% include link to="content/iterative-deepening.md" %}
