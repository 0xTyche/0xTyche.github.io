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

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d1c875c3-bb05-46e0-8238-b11345dae992/e49228e0-d238-4e0e-abb6-320755247e19/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OMTTYBY%2F20261025%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20261025T072227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICaYe4SAy9a7uJSXUoOQAHEUKiTPagTG%2BlYJBgGTKYkcAiAl%2FwHZ47V8etpT1VoJfjjSxZ%2BwhkAh47y2rmjFdrxQqyqIBAi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMk%2BRDxM38riS3cZm0KtwDhT5D3hI23sWWgaMnuI3sQbgNQuBP7n0hhZqGayytTs%2FSwEtTB%2BbzUvqFc4paPEfiRv5sSS5bVfHhI8tn4G8VRkLgD3W9UXdnDat5dS1D9JgskUNv%2Fm13htDkNK1EokdmAT%2Bv%2FO7XOHCaCaoQHJRxNjofacd2PgWYwVFy%2FHHmVTywbb6HE4Yx2%2Bjns2dYkpXO8L8bNeAU9EefwM3lcFcsrbwneMk4mkOlYJ3ab5wOb0X00jqQhVSJyuyxmkadSs0VbpS5NlyfHQsl27i45jN7cP6VJMeIAXn%2BwkdCltM23IxUN22Ym3%2BsTXAHq8BZJID47Fu6hbfZ48hRiUbwS2G2oOb8XAHhzDo6QM%2BA9tAeVoV618SlF%2FUM3r4TN%2FwAAitJbrVOHHs5YdThzPDRxD8r5u5KRwGgme8Ca%2BnJfkBMmztXeb1%2B01dWoaAXcPMdwwJnh0lGLLL0DCoZWrhHMh%2B3FEfagANj7hnkxLcLNufee0zImtTTS2ZNdOIag%2FYC9bHdeZ%2BU9Hy76YETHx0QsSiQ%2B3qzo6yzkGfJ5Z5NvWI%2BVGqT6nnRDcNO9rd6QEoiTgeZYutgdOBM01P4zt2gRqramCeUvPjBkYPJFOq1bDJdBYmP9YM8IQd7koOaIQ4w%2BLP21gY6pgGtH29%2BZo%2FvkW5VZyLB0ouj9YwamKDsJpJswru9ReSVsBaguteSqBepPS49%2F43mTjWBTjG%2FbnNb45KH22M37erEWlkf3NrpYxGJgNdO%2BWisq3p7f3a0JuQPegHKJeMTWdYTvbPRS2dV1cg54GZ4341NmsE235s%2FrVIbdDqC0HgqtpWCRxMStdjlpJbP9pIQE3XXAExlNGxp8YcN%2FawY%2BdVVgLGaO6td&X-Amz-Signature=5cbe56083c2074a52f9d259153944f64a6e736f963ab511e30299d78519efeac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d1c875c3-bb05-46e0-8238-b11345dae992/63e7a1ed-1d8e-42ac-ac51-8de7c74ef3d5/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OMTTYBY%2F20261025%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20261025T072227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICaYe4SAy9a7uJSXUoOQAHEUKiTPagTG%2BlYJBgGTKYkcAiAl%2FwHZ47V8etpT1VoJfjjSxZ%2BwhkAh47y2rmjFdrxQqyqIBAi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMk%2BRDxM38riS3cZm0KtwDhT5D3hI23sWWgaMnuI3sQbgNQuBP7n0hhZqGayytTs%2FSwEtTB%2BbzUvqFc4paPEfiRv5sSS5bVfHhI8tn4G8VRkLgD3W9UXdnDat5dS1D9JgskUNv%2Fm13htDkNK1EokdmAT%2Bv%2FO7XOHCaCaoQHJRxNjofacd2PgWYwVFy%2FHHmVTywbb6HE4Yx2%2Bjns2dYkpXO8L8bNeAU9EefwM3lcFcsrbwneMk4mkOlYJ3ab5wOb0X00jqQhVSJyuyxmkadSs0VbpS5NlyfHQsl27i45jN7cP6VJMeIAXn%2BwkdCltM23IxUN22Ym3%2BsTXAHq8BZJID47Fu6hbfZ48hRiUbwS2G2oOb8XAHhzDo6QM%2BA9tAeVoV618SlF%2FUM3r4TN%2FwAAitJbrVOHHs5YdThzPDRxD8r5u5KRwGgme8Ca%2BnJfkBMmztXeb1%2B01dWoaAXcPMdwwJnh0lGLLL0DCoZWrhHMh%2B3FEfagANj7hnkxLcLNufee0zImtTTS2ZNdOIag%2FYC9bHdeZ%2BU9Hy76YETHx0QsSiQ%2B3qzo6yzkGfJ5Z5NvWI%2BVGqT6nnRDcNO9rd6QEoiTgeZYutgdOBM01P4zt2gRqramCeUvPjBkYPJFOq1bDJdBYmP9YM8IQd7koOaIQ4w%2BLP21gY6pgGtH29%2BZo%2FvkW5VZyLB0ouj9YwamKDsJpJswru9ReSVsBaguteSqBepPS49%2F43mTjWBTjG%2FbnNb45KH22M37erEWlkf3NrpYxGJgNdO%2BWisq3p7f3a0JuQPegHKJeMTWdYTvbPRS2dV1cg54GZ4341NmsE235s%2FrVIbdDqC0HgqtpWCRxMStdjlpJbP9pIQE3XXAExlNGxp8YcN%2FawY%2BdVVgLGaO6td&X-Amz-Signature=61cda42cf6e9e2b95b79f64896258b1ea2c7643b08c00668b544947237928743&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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
