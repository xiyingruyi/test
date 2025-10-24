/*
脚本描述: vivo VCode API 响应修改，用于模拟有效状态或特定规则。
原作者: NobyDa (脚本逻辑参考)
目标域名: vcode-api.vivo.com.cn

***************************
Quantumult X:

[rewrite_local]
^https:\/\/vcode-api\.vivo\.com\.cn\/api\/v1\/rule\/get\.do url script-response-body vivo_Vcode_Rule.js

[mitm]
hostname = vcode-api.vivo.com.cn

***************************
Surge4 or Loon:

[Script]
http-response https:\/\/vcode-api\.vivo\.com\.cn\/api\/v1\/rule\/get\.do requires-body=1,max-size=0,script-path=vivo_Vcode_Rule.js

[MITM]
hostname = vcode-api.vivo.com.cn

***************************
Quantumult:  
// 注意：Quantumult的simple-response需要Base64编码的完整HTTP响应。
// 鉴于API响应结构未知，此部分请自行调试或使用 REWRITE 配合 JS 脚本。
// 此处仅提供 MITM 和 REWRITE 示例。

[REWRITE]
https:\/\/vcode-api\.vivo\.com\.cn\/api\/v1\/rule\/get\.do url script-response-body vivo_Vcode_Rule.js

[MITM]
hostname = vcode-api.vivo.com.cn

**************************/
let obj = JSON.parse($response.body);

// 构造一个模拟成功的响应体
// 这里的结构是假设的，您可能需要根据实际抓包结果调整 `data` 中的内容
obj = {
  "code": 0,         // 假设 0 表示成功
  "message": "success",
  "data": {
    "rule_id": 99999,
    "start_time": "2024-01-01 00:00:00",
    "end_time": "2099-12-31 23:59:59", // 设定一个很远的过期时间
    "status": 1, // 假设 1 表示有效
    "is_vip_rule": true
  }
};

$done({body: JSON.stringify(obj)});
