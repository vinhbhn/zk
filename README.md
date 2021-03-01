## Features

- Use ETH/USDT/DAI/USDC/LINK token to purchase membership monthly.
- Based on zkSync Checkout.
- Using Chainlink price feeds.
- Confirm tx then set user to membership. (1/2)

## Todos

- Performance optimized application.

## Caution

- Zksync doesn't support Gnosis Safe.

## Docs

[zkSync Checkout](https://www.notion.so/zkSync-Checkout-docs-2bffd6f169e746d0b51873e4127992a6)

[zkSync API](https://zksync.io/api/v0.1.html#transaction-details)

# Problem

- Hiện tại, an toàn nhất là tx được xác nhận (block confirm), nhưng theo quan sát ngoài thời gian đưa proof để chứng thực khoảng 10 phút (khoảng thời gian giữa lúc block được accept cho đến khi verified), thì thời gian block commited đến khi được accept là khá lâu (hiện tại ~ 1 tiếng), vì vậy không thể đợi kịp cho đến khi tx được xác nhận mới set lên thành viên trả phí cho người dùng được.

- Cách triển khai hiện tại là sau khi client(ứng dụng) put tx vào block (success == true && failReason == null) thì mình sẽ đối chiếu xem server có nhận được tx chưa, nếu đúng với các điều kiện đưa thì set người dùng lên thành viên trả phí luôn.

- bản zkSync này phát triển bởi nhóm MatterLabs, vẫn còn là bản beta, nên server sẽ có đôi lúc downtime để sửa lỗi, hoặc thêm tính năng mới,...

- zksync này hỗ trợ tốt hơn nếu user account có sẵn token trên L2 của zk. (đỡ mất phí và thời gian chờ put balance từ L1 qua L2).
