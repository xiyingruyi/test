/*
脚本描述: DUtils API 响应修改，用于模拟会员有效状态。
原作者: NobyDa (脚本逻辑参考)
目标域名: api-d.dutils.com

***************************
Quantumult X:

[rewrite_local]
^https:\/\/api-d\.dutils\.com\/api\/v1\/rule\/get\.do url script-response-body dutils_Rule.js

[mitm]
hostname = api-d.dutils.com

***************************
Surge4 or Loon:

[Script]
http-response https:\/\/api-d\.dutils\.com\/api\/v1\/rule\/get\.do requires-body=1,max-size=0,script-path=dutils_Rule.js

[MITM]
hostname = api-d.dutils.com

***************************
Quantumult:  
// 注意：Quantumult的simple-response需要Base64编码的完整HTTP响应。
// 鉴于API响应结构未知，此部分请自行调试或使用 REWRITE 配合 JS 脚本。
// 此处仅提供 MITM 和 REWRITE 示例。

[REWRITE]
https:\/\/api-d\.dutils\.com\/api\/v1\/rule\/get\.do url script-response-body dutils_Rule.js

[MITM]
hostname = api-d.dutils.com

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
