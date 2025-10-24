let body = $response.body;
try {
    let obj = JSON.parse(body);
    let url = $request.url;

    // Vivo rule/get.do
    if (url.includes('/rule/get.do') && obj.data && Array.isArray(obj.data) && obj.data.length > 0) {
        let userData = obj.data[0];
        userData.cstatus = "1";
        userData.pstatus = "y1";
        let now = Date.now();
        userData.ctime = now;
        userData.ptime = now;
        console.log("Vivo updated: cstatus=1, pstatus=y1");
    } 
    // Buding get_user_config
    else if (url.includes('/get_user_config') && obj.result && obj.result.user_type !== undefined) {
        let result = obj.result;
        result.user_type = 2;
        result.vip_storage = 20480;
        result.renewal_status = 1;
        result.subscribe_plan_validity = 36500;
        result.subscribe_plan_name = "终身会员";
        let future = Math.floor(Date.now() + (365 * 24 * 60 * 60 * 1000 * 100));
        result.end_time = future;
        result.next_pay_time = future;
        console.log("Buding updated: user_type=2, vip_storage=20480");
    } 
    // Buding paid_modules
    else if (url.includes('/paid_modules') && obj.result && Array.isArray(obj.result)) {
        obj.result.forEach(item => {
            item.usage_limit = -1;
            if (item.vip_storage_limit !== null) {
                item.storage_limit = item.vip_storage_limit;
            }
        });
        console.log("Buding modules updated: usage_limit=-1");
    }

    body = JSON.stringify(obj, null, 2);
} catch (e) {
    console.log("Script error: " + e);
}
$done({body});
