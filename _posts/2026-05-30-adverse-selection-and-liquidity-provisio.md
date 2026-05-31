---
layout: post
title: "Adverse Selection and Liquidity Provision"
date: 2026-05-30
classification: "Quant"
notion_id: "37037231-b8a5-80ab-97fa-d71b1dd72605"
---


来源：[https://zhuanlan.zhihu.com/p/521397355](https://zhuanlan.zhihu.com/p/521397355)


**Kyle Model** 给你的是一个简洁的"输入→输出"映射：观察订单流 y，代入 p = p₀ + λy，就得到价格。它的预测是**连续的、线性的、向量式的**。


**Glosten–Milgrom Model** 给你的是一个**贝叶斯信念更新机制**：每一笔成交都让你更新对"真实价格 V"的后验估计。它的预测是**离散的、序贯的、概率式的**——每来一笔交易，你就对未来价格的信念做一次修正。


GM 模型的核心是这两个等式：


$a=E[V∣下一笔是买单],b=E[V∣下一笔是卖单]$


把它倒过来用，对预测者来说就是：

> **如果我看到一笔买单成交，就把对 V 的后验向上调；看到卖单就向下调。**

实操上你维护一个对"公允价格 V"的后验分布。每次成交按贝叶斯公式更新：


$P(V = V^+ \mid \text{buy}) = \frac{P(\text{buy} \mid V^+) \cdot P(V^+)}{P(\text{buy})}$
