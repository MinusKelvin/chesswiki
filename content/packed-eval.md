---
title: Packed Evaluation
---

**Packed eval** is an optimization used with phased {% include link to="content/hce.md" lowercase=true %}, allowing both the midgame and endgame evaluation values to be manipulated in parallel.
Specifically, it is a form of {% include link to="https://en.wikipedia.org/wiki/Single_instruction,_multiple_data" text="SIMD" %} which utilizes general purpose registers and instructions rather than the dedicated SIMD hardware which often requires vendor-specific intrinsics to use.
This can simplify the handcrafted evaluation function by deduplicating expressions which apply the same operation to both the midgame and endgame evaluation values.
Additionally, performance is improved as only one operation needs to be performed instead of two in these instances.

# Algorithm

The following algorithm is shown in C rather than the standard Python because `unpack_mg` would require more complex logic to correct the sign of the result.

```c
int32_t pack(int16_t mg, int16_t eg) {
    return ((int32_t) eg << 16) + (int32_t) mg;
}

int16_t unpack_mg(int32_t packed) {
    return (int16_t) packed;
}

int16_t unpack_eg(int32_t packed) {
    return (int16_t) ((packed + 0x8000) >> 16);
}
```

Packed evaluation values can be added and subtracted with other packed evaluation values, or be multiplied by an integer.
Division does not work with packed evaluation values.

# Explanation

We will first examine the unsigned case, where the midgame and endgame evaluation values $$m$$ and $$e$$ are both non-negative values less than $$2^{16}$$.
The packed value $$p$$ is given by $$p = e \times 2^{16} + m$$.
We can then get the equations for extracting the midgame and endgame evaluation values from the packed value.
If we take this equation modulo $$2^{16}$$, the $$e$$ term becomes zero and the $$m$$ term is untouched, resulting in the equation $$m = p \bmod 2^{16}$$.
If we perform a flooring division by $$2^{16}$$ on both sides of this equation, the $$m$$ term becomes zero and the factor of $$2^{16}$$ in the $$e$$ term is eliminated, resulting in the equation $$e = \lfloor p / 2^{16} \rfloor$$.

Adding two packed values $$p_1 = e_1 \times 2^{16} + m_1$$ and $$p_2 = e_2 \times 2^{16} + m_2$$ results in the contained values being added together: $$p_1 + p_2 = (e_1 + e_2) \times 2^{16} + (m_1 + m_2)$$.
This is a valid packed evaluation value so long as $$e_1 + e_2$$ and $$m_1 + m_2$$ remain in the required range.
Likewise for subtraction.
Multiplying a packed value $$p = e \times 2^{16} + m$$ by an integer $$c$$ results in both of the contained values being multiplied by $$c$$: $$pc = ec \times 2^{16} + mc$$.
Division of a packed value $$p = e \times 2^{16} + m$$ by an integer $$c$$, however, does not work in general as if $$e$$ is not a multiple of $$c$$ then the midgame component of the packed value will be corrupted.

Consider now the signed case, where the constituent values are in the interval $$[-2^{15}, 2^{15})$$, keeping the packed value as $$p = e \times 2^{16} + m$$.
Since we keep the same form as in the unsigned case, adding, subtracting, and multiplying will behave in the same way as in the unsigned case.
Since multiplication by a power of two is equivalent to a bitshift left by the exponent, the code for the packing function is `p = (e << 16) + m`.
If we apply the same operations to this equation as before, we do not quite get equations for extracting the midgame and endgame evaluation values, requiring minor adjustments.

If we take the packing equation modulo $$2^{16}$$ as before, the $$e$$ term becomes zero and we get $$p \bmod 2^{16} = m \bmod 2^{16}$$, which when $$m < 0$$ gives us $$m + 2^{16}$$.
We can correct this case with an adjustment function that subtracts $$2^{16}$$ from its argument whenever its argument is $$\ge 2^{15}$$, resulting in $$m = \textrm{adjust}(p \bmod 2^{16})$$.
For our choice of the range of the constituent values, the adjustment function is the same as interpreting the value as a 16-bit two's complement integer.
Since modulo by a power of two can be implemented using a bitmask, the code for the extraction function is `m = (int16_t) (p & 0xFFFF)`, or simply `m = (int16_t) p` since the cast implies the mask.

If we perform a flooring division by $$2^{16}$$ on both sides of the packing equation as before, we are left with $$\lfloor p / 2^{16} \rfloor = e + \lfloor m / 2^{16} \rfloor$$.
In this case, the $$m$$ term is $$-1$$ when $$m < 0$$.
If we add $$2^{15}$$ before applying the flooring division, the $$m$$ term becomes $$\lfloor (m + 2^{15}) / 2^{16} \rfloor$$, which is always zero.
This results in the equation $$e = \lfloor (p + 2^{15}) / 2^{16} \rfloor$$.
Since flooring division by a power of two is equivalent to an arithmetic bitshift right by the exponent, the code for the extraction function is `e = (p + 0x8000) >> 16`.
