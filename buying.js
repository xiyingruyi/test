/*
脚本功能：微白扫描 VIP 解锁（仅限个人测试学习）
结合 Vivo /rule/get.do 和 Buding /get_user_config，模拟终身 VIP 会员
[rewrite_local]
# Vivo 会员验证
^https?:\/\/vcode-api\.vivo\.com\.cn\/api\/v1\/rule\/get\.do url script-response-body buding_vip_unlock.js

# Buding 用户配置
^https?:\/\/www\.budingscan\.com\/server\/get_user_config url script-response-body buding_vip_unlock.js

# 可选：Buding 模块列表（文件1）
^https?:\/\/www\.budingscan\.com\/server\/payment\/plan\/modules url script-response-body buding_vip_unlock.js

# 可选：Buding 订阅计划（文件2）
^https?:\/\/www\.budingscan\.com\/server\/payment\/plans url script-response-body buding_vip_unlock.js

[mitm]
hostname = vcode-api.vivo.com.cn, www.budingscan.com
*/

let body = $response.body;
try {
    let obj = JSON.parse(body);
    
    // 1. Vivo /rule/get.do（修改 cstatus/pstatus）
    if ($request.url.includes('/rule/get.do') && obj.data && Array.isArray(obj.data) && obj.data.length > 0) {
        console.log("修改 Vivo cstatus 为 VIP");
        let userData = obj.data[0];
        userData.cstatus = 1;  // 会员状态解锁
        userData.pstatus = "y1";  // 付费确认
        let now = Date.now();  // 当前 ms
        userData.ctime = now;
        userData.ptime = now;
    } 
    
    // 2. Buding /get_user_config（修改 user_type 等）
    else if ($request.url.includes('/get_user_config') && obj.result && obj.result.user_type !== undefined) {
        console.log("修改 Buding 用户 config 为 VIP");
        let result = obj.result;
        result.user_type = 2;  // VIP 类型
        result.vip_storage = 20480;  // 20GB
        result.renewal_status = 1;  // 续费开启
        result.subscribe_plan_validity = 36500;  // 100年
        result.subscribe_plan_name = "终身会员";
        let future = Math.floor(Date.now() + (365 * 24 * 60 * 60 * 1000 * 100));  // 100年 ms
        result.end_time = future;
        result.next_pay_time = future;
    } 
    
    // 可选：Buding 模块列表（有 module 数组）
    else if (obj.result && Array.isArray(obj.result) && obj.result[0] && obj.result[0].module !== undefined) {
        console.log("修改模块为无限");
        obj.result.forEach(item => {
            item.usage_limit = -1;
            if (item.vip_storage_limit !== null) item.storage_limit = item.vip_storage_limit;
        });
    } 
    
    // 可选：Buding 订阅计划（有 plan_id 数组）
    else if (obj.result && Array.isArray(obj.result) && obj.result[0] && obj.result[0].plan_id !== undefined) {
        console.log("修改计划为免费");
        obj.result.forEach(item => {
            item.price = "0";
            item.desc += " (测试免费)";
            if (item.rich_text) item.rich_text += " → 免费";
        });
    }
    
    body = JSON.stringify(obj, null, 2);  // 美化输出
} catch (error) {
    console.log("JSON 错误: " + error);
}

$done({ body });
