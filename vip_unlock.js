let obj = JSON.parse($response.body);

if ($request.url.includes('/rule/get.do')) {
  obj = {"code":200,"data":[{"cstatus":"1","ctime":Date.now(),"mid":"A553","pstatus":"y1","ptime":Date.now(),"reportFrequency":"200000"}],"msg":""};
} else if ($request.url.includes('/get_user_config')) {
  obj = {"code":0,"cost_time":"90 ms","msg":"ok","result":{"avatar":"https://www.budingscan.com/ai_painting_no_auth/img?id=7d084d3f-a867-4e81-b39b-bf02e9b3a637.jpg","email":"","end_time":"2013017600","icode":"","invitation_code":"Q6JFC5","nationCode":"86","next_pay_price":null,"next_pay_time":"2013017600","nickname":"夕影血薇","oral":1,"phone":"XXXXXX","renewal_status":1,"subscribe_pay_type":0,"subscribe_plan_name":"终身会员","subscribe_plan_validity":36500,"sync_type":3,"total_storage":288358400,"uid":"c22f7d0ca75711ed8b19b49691e04e00","used_storage":0,"user_type":2,"vip_storage":20480},"sid":"907a9c76-b10c-11f0-bcef-b49691e0d748","ver":"prd"};
}

$done({body: JSON.stringify(obj)});
