/*
  脚本作用：布丁扫描 - 尝试模拟高级用户/会员状态解锁功能 (20G)
  目标域名：www.budingscan.com
*/

let obj = JSON.parse($response.body);

if (obj.result && obj.code === 0) {
    let result = obj.result;

    // 设置一个极远的过期时间戳 (2099-12-31 23:59:59 的毫秒时间戳)
    const maxTimestamp = 4102444799000; 

    // 1. 设置高级会员相关状态
    result.end_time = maxTimestamp;           // 永久会员过期时间
    result.renewal_status = 1;                // 续费状态设为 1 (已订阅)
    result.subscribe_plan_name = "Premium User (Lifetime)"; // 会员计划名称
    result.subscribe_plan_validity = 1;       // 订阅计划设为 1 (有效)
    result.user_type = 1;                     // 用户类型设为 1 (会员)

    // 2. 解锁存储空间，设置为 20 GB 对应的字节数
    // 20 GB = 21474836480 字节
    result.vip_storage = 21474836480; 
    
    // 3. 可选：清除付费相关字段
    result.next_pay_price = null;
    result.next_pay_time = null;
    result.subscribe_pay_type = 1; 

    // 保证 code 还是成功
    obj.code = 0; 
}

$done({body: JSON.stringify(obj)});
