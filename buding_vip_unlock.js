let body = $response.body;
try {
    let obj = JSON.parse(body);
    
    // 1. Vivo /rule/get.do（修改 cstatus/pstatus）
    if ($request.url.includes('/rule/get.do') && obj.data && Array.isArray(obj.data) && obj.data.length > 0) {
        console.log("修改 Vivo cstatus 为 VIP");
        let userData = obj.data[0];
        userData.cstatus = "1";  // 字符串 "1"（匹配原类型 "0"）
        userData.pstatus = "y1";  // 付费确认
        let now = Date.now();  // 当前 ms 时间戳
        userData.ctime = now;
        userData.ptime = now;
        console.log("Vivo 修改后: cstatus=" + userData.cstatus + ", pstatus=" + userData.pstatus);
    } 
    
    // 2. Buding /get_user_config（修改 user_type 等）
    else if ($request.url.includes('/get_user_config') && obj.result && obj.result.user_type !== undefined) {
        console.log("修改 Buding 用户 config 为 VIP");
        let result = obj.result;
        result.user_type = 1;  // VIP 类型（-1 → 1，基于常见逆向；若无效试 2）
        result.vip_storage = 20480;  // 20GB
        result.renewal_status = 1;  // 续费开启
        result.subscribe_plan_validity = 36500;  // 100年
        result.subscribe_plan_name = "终身会员";
        let future = Math.floor(Date.now() + (365 * 24 * 60 * 60 * 1000 * 100));  // 100年 ms 时间戳
        result.end_time = future;
        result.next_pay_time = future;
        console.log("Buding 修改后: user_type=" + result.user_type + ", vip_storage=" + result.vip_storage);
    } 
    
    // 3. Buding /paid_modules（修改 usage_limit 为 VIP 值）
    else if ($request.url.includes('/paid_modules') && obj.result && Array.isArray(obj.result)) {
        console.log("修改 Buding 模块为 VIP 无限");
        obj.result.forEach(function(item) {
            item.usage_limit = -1;  // 无限次（VIP 值）
            if (item.vip_storage_limit !== null && item.vip_storage_limit !== undefined) {
                item.storage_limit = item.vip_storage_limit;  // 升级存储
            }
        });
        console.log("模块修改完成，usage_limit 全设为 -1");
    }
    
    body = JSON.stringify(obj, null, 2);  // 美化 JSON 输出
} catch (error) {
    console.log("JSON 解析错误: " + error);
}

$done({ body });
