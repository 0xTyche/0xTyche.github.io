---
layout: post
title: "wintermute-challenge-2026 题解"
date: 2026-08-20
classification: "crypto"
priority: "High"
status: "📅 Upcoming"
notion_id: "3c237231-b8a5-8000-b852-d422c2258ea7"
---


## 00 - Warmup


问题：该问题是为了确认答题者的环境配置（RPC）等设置是否正确。


该测试会在区块高度 21895252 处分叉以太坊主网，并向你的地址发放 10 个 ETH。请编写代码，`test_Solution()`确保你的地址至少持有 1 个 WETH。


请用以下方式核实：


```plain text
python alpha.py check 00
```


解题思路：
该题仅为测试答题环境是否正确，所以取一个 eth 即可。


```solidity
function test_Solution() public {
        vm.startBroadcast(user);
        // Your solution goes here.
        IWETH(WETH).deposit{value: 1 ether}();
        vm.stopBroadcast();
        checkSolve();
    }
```


## **01 - Out of Nowhere**


问题：你正要下班离开办公室,忽然注意到有一笔 [150 万美元的转账](https://etherscan.io/tx/0xe7b8d46c3f3e5f727cb42c9dfe7fc36855ab5092cf160e4c8812a2a27a84350b) 打给了其中一个流动性提供方(LP)。但这笔钱的来源是什么?

https://etherscan.io/tx/0xe7b8d46c3f3e5f727cb42c9dfe7fc36855ab5092cf160e4c8812a2a27a84350b


解题思路：

1. 请注意我们要查找的是这个资金的来源，
2. 首先打开 etherscan发现是 跨链桥 Allbridge: Bridge
3. 但不够清晰，到 arkm 上检查 2026年01月28日 17:56:59 这个哈希，实际就是由 Allbridge: Bridge 跨链桥跨到了 0xEc5f2EFa1A13c81179dDb0f0d4385e99E275994b 这个地址（这个地址就是题目所说的流动性提供方）

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d1c875c3-bb05-46e0-8238-b11345dae992/e49228e0-d238-4e0e-abb6-320755247e19/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WTKIKJD%2F20260916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260916T072341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQCNRoMT3ALTYis6V9GPzqTCo%2BMIDAq%2BTl8V0hym2g9kGgIhAJchjGvE7Np2xKCgtl%2Fwxmuf7UL3xbVUvG%2FER0MjwIP2Kv8DCBAQABoMNjM3NDIzMTgzODA1IgzMVMZa%2FUr6gox%2FF6cq3ANZBWCdvraNAO%2BFPlsyFsAtJDO2ABU2IWG2G4roqRSrGKxAqE3GoQoeG%2BP%2Fgl9Nbu%2Ba5c8XLbitGdspyr9OYd1QVjOq5tjlyJIFe%2Bh2nVHgF4%2FrydflZpf82icbJLGPIeMzF2IaBoLBLmWbvq7dLky2Dxqfn5F1HPuPagdmQuY2kBFJdoVxIlhKcx9Ax86uDQun3nJ0bVLC%2BEbNY0%2FREBtUvvdxvsF8oS6Sqk3o5OUcGGTMkfq4dG3JWrjUucXlqdwWfEA0uqhYHzomZBg0zm5h9oZ4X9a63rGpU%2BkdJI9ElAXZkZpbHutuBPcgzYlJK10SkfK8kQMwZsswBqyGQnBhezQwPIxYlj09AIRG5ZfMHblvGZoamZEOmtN7rqBU33LELGUsPaCwcl%2FL5aXXX7Rv6zLxNwN3%2BbWVgXjjMyiRjlD36FVX1%2BE1jiORw%2FPU7JGKR%2FMLzeoUwceU0aHav9iKVgn7hCY0NK1PthkXFCi97%2FrqQ9Z%2B%2B625TgULVWqKO5Iv1CmUjRySRkXEO7UQagSRK4SWC6d75JjJN9BW9EX6LO%2FU%2FzYU%2FQQ301c3GlGQ%2FVqh6y7kTGfPKg1omAW98rC4UiaPPLeCMYgkexeUsgCFjBUdxCSKTm%2BknkjllTC4%2FKjVBjqkAfCRiZC3eK%2FGIykJPQ9N%2B%2FNsf9A5xoTCyqES4jcSLq5uQMkp%2B1my046wiYSre98IYgAAjVNupcxM3GSFphstJRcw2qcKn9esAYvHR204ltKC6PFfufThgwTCSlSC0%2FTMlyMdN4ebojq3A%2FZf6I5yVCwZjrHj7154S0QOyKBUKsw2hj%2BGDKNyiJfUBsPUae6LyoGNVel0ENGE2LH83LOoS1KCYd0d&X-Amz-Signature=101fbe0a7d4c5c3957d69583f85cb313d8b1fad369e601a2c02d00cd03a52943&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. 所以我接下来去找去跨链浏览器 [https://next.allbridge.io/explorer?page=1](https://next.allbridge.io/explorer?page=1)
2. 结果在浏览器中搜索目的地址没有找到，可能该浏览器能够查询的时间范围是有限的或者是该兑换路径被下架了，也有可能是
3. 于是我使用 sentio 查询 call trace

```go
[Receiver] Allbridge: Bridge.Received(recipient=[Sender]0xEc5f2EFa1A13c81179dDb0f0d4385e99E275994b,token=USDC,amount=1,498,500,000,000,lockId=0x000000000000000000000000000000000159fa4cd496a40b6531521bb9138a06,source=0x53544b5a）
```

1. source = 0x53544b5a 经过查询这个是 Stacks 链
2. 工作到这一步，发现我们只能知道

```go
lock—id:0x000000000000000000000000000000000159fa4cd496a40b6531521bb9138a06
```

1. 那么能不能直接查 lock-id 在 stacks 中找到源哈希呢？发现不行

以下是我查询 claude 给出的原因：【该条不完全正确，见补充1】


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d1c875c3-bb05-46e0-8238-b11345dae992/63e7a1ed-1d8e-42ac-ac51-8de7c74ef3d5/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WTKIKJD%2F20260916%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260916T072341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQCNRoMT3ALTYis6V9GPzqTCo%2BMIDAq%2BTl8V0hym2g9kGgIhAJchjGvE7Np2xKCgtl%2Fwxmuf7UL3xbVUvG%2FER0MjwIP2Kv8DCBAQABoMNjM3NDIzMTgzODA1IgzMVMZa%2FUr6gox%2FF6cq3ANZBWCdvraNAO%2BFPlsyFsAtJDO2ABU2IWG2G4roqRSrGKxAqE3GoQoeG%2BP%2Fgl9Nbu%2Ba5c8XLbitGdspyr9OYd1QVjOq5tjlyJIFe%2Bh2nVHgF4%2FrydflZpf82icbJLGPIeMzF2IaBoLBLmWbvq7dLky2Dxqfn5F1HPuPagdmQuY2kBFJdoVxIlhKcx9Ax86uDQun3nJ0bVLC%2BEbNY0%2FREBtUvvdxvsF8oS6Sqk3o5OUcGGTMkfq4dG3JWrjUucXlqdwWfEA0uqhYHzomZBg0zm5h9oZ4X9a63rGpU%2BkdJI9ElAXZkZpbHutuBPcgzYlJK10SkfK8kQMwZsswBqyGQnBhezQwPIxYlj09AIRG5ZfMHblvGZoamZEOmtN7rqBU33LELGUsPaCwcl%2FL5aXXX7Rv6zLxNwN3%2BbWVgXjjMyiRjlD36FVX1%2BE1jiORw%2FPU7JGKR%2FMLzeoUwceU0aHav9iKVgn7hCY0NK1PthkXFCi97%2FrqQ9Z%2B%2B625TgULVWqKO5Iv1CmUjRySRkXEO7UQagSRK4SWC6d75JjJN9BW9EX6LO%2FU%2FzYU%2FQQ301c3GlGQ%2FVqh6y7kTGfPKg1omAW98rC4UiaPPLeCMYgkexeUsgCFjBUdxCSKTm%2BknkjllTC4%2FKjVBjqkAfCRiZC3eK%2FGIykJPQ9N%2B%2FNsf9A5xoTCyqES4jcSLq5uQMkp%2B1my046wiYSre98IYgAAjVNupcxM3GSFphstJRcw2qcKn9esAYvHR204ltKC6PFfufThgwTCSlSC0%2FTMlyMdN4ebojq3A%2FZf6I5yVCwZjrHj7154S0QOyKBUKsw2hj%2BGDKNyiJfUBsPUae6LyoGNVel0ENGE2LH83LOoS1KCYd0d&X-Amz-Signature=d3447ac715b76f509f9ce5e660fbc7ae9fb9b88747b1e2c408a47abd7e05b17c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. 那就考虑去 stacks 那一端的跨链桥去找 跨链桥合约，然后找时间戳附近的跨链交易，1.5M usd的金额+时间戳应该是比较容易找到的
2. 搜索路径：

已知跨链桥，走其API查询其在stacks上的部署：
[https://allbridgeapi.net/token-info#:~:text=%22STKZ%22%3A%20%7B%0A%20%20%20%20%22confirmations%22%3A%202,aewbtc.aeWBTC.png%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%20%20%7D%2C](https://allbridgeapi.net/token-info#:~:text=%22STKZ%22%3A%20%7B%0A%20%20%20%20%22confirmations%22%3A%202,aewbtc.aeWBTC.png%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%20%20%7D%2C)


```go
STKZ:
  SP3Y2ZSH8P7D50B0VBTSX11S7XSG24M1VB9YFQA4K.token-abr
  SP3Y2ZSH8P7D50B0VBTSX11S7XSG24M1VB9YFQA4K.token-aeusdc
  SP3Y2ZSH8P7D50B0VBTSX11S7XSG24M1VB9YFQA4K.token-aewbtc
```


刚好发现部署者地址：SP3Y2ZSH8P7D50B0VBTSX11S7XSG24M1VB9YFQA4K


可以直接假设该部署者部署的跨链合约也是我们要找的 allbridge stacks到eth的跨链桥，当然也可能是其他地址。


关键在于:aeUSDC 是**包装币**,桥必须能 mint/burn 它。**这个授权关系一定写在代币合约里**,和谁部署的没关系。


读 `token-aeusdc` 的源码(182 行):


```solidity
(define-data-var contract-owner principal contract-caller)

;; mint（124 行）和 burn（145 行）都有这一句：
(asserts! (is-eq contract-caller (var-get contract-owner)) ERR-NOT-AUTHORIZED)

;; 文件最后一行（182）：
(set-contract-owner .bridge)
```


代币合约自己声明了谁能 mint/burn。


源码里是部署时的初始值，set-contract-owner 可以后续改，所以再查运行时当前值:


get-contract-owner()
→ 0x070616fc2fe628b1da502c1b5eb3d08727ee6022503b5a06627269646765


手工解码这个 Clarity 值：`(ok` + `contract principal` + 版本字节 `0x16` + hash160 + 名称长度 6 + `"bridge"`，再做 c32check 编码:


```solidity
SP3Y2ZSH8P7D50B0VBTSX11S7XSG24M1VB9YFQA4K.bridge
```


Stacks 桥合约 = `SP3Y2ZSH8P7D50B0VBTSX11S7XSG24M1VB9YFQA4K.bridge`。 用 Hiro API 按 offset 二分查找到 2026-01-28，找 `lock-id` 相同的那笔 [https://explorer.hiro.so/txid/0x36f2d5c245d08de980d0d23e4bd23b088312ce9e4b9845b4fd71930f52aab8fc?chain=mainnet](https://explorer.hiro.so/txid/0x36f2d5c245d08de980d0d23e4bd23b088312ce9e4b9845b4fd71930f52aab8fc?chain=mainnet)


**补充1：**


合约自己维护了一个 lock-id 索引，`get-lock` 是 read-only 的：


```solidity
get-lock(0x0159fa4cd496a40b6531521bb9138a06)
  amount       = 1,498,500          （系统精度，已扣费净额）
  destination  = "ETH"
  recipient    = 0xec5f2efa…5994b
  sender       = SP388WPTVQMET2Z7M3ANQ6VRR8AATBF8VDPH0RRF9
  token-source = "ETH" + 以太坊 USDC 地址
```
