/*
脚本描述: vivo VCode API 响应修改，用于模拟会员有效状态。
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
// 基于抓包结果，模拟 VIP 会员状态
obj = {
  "code": 200,
  "data": [{
    "cstatus": "1",
    "ctime": Date.now(),
    "mid": "A553",
    "pstatus": "y1",
    "ptime": Date.now(),
    "reportFrequency": "200000"
  }],
  "msg": ""
};

$done({body: JSON.stringify(obj)});
