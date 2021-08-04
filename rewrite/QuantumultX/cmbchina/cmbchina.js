/*
招商银行信用卡微信公众号：“领积分 - 🎁签到领积分” 获取 Cookie

[task_local]
8 0 * * * https://cdn.jsdelivr.net/gh/finch-ift/Profiles@main/rewrite/QuantumultX/cmbchina/cmbchina.js

[rewrite_local]
https://weclub\.xyk\.cmbchina.com/SCRMCustomActivityFront/checkin-plus/request/get-home-data\.json\?activityCode=checkinPlus url script-request-header https://cdn.jsdelivr.net/gh/finch-ift/Profiles@main/rewrite/QuantumultX/cmbchina/cmbchina.js

[mitm]
hostname = weclub.xyk.cmbchina.com
*/

const checkinURL = `https://weclub.xyk.cmbchina.com/SCRMCustomActivityFront/checkin-plus/request/checkin.json`;
const cookieKey = 'iNotificatioin_cmbchina_cookieKey';
const headers = {
    'Accept' : `application/json, text/plain, */*`,
    'Origin' : `https://weclub.xyk.cmbchina.com`,
    'Accept-Encoding' : `gzip, deflate, br`,
    'Content-Type' : `application/json;charset=utf-8`,
    'Host' : `weclub.xyk.cmbchina.com`,
    'Connection' : `keep-alive`,
    'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.9(0x1800092d) NetType/WIFI Language/zh_CN`,
    'Referer' : `https://weclub.xyk.cmbchina.com/SCRMCustomActivityFront/checkin-plus/home?activityCode=checkinPlus`,
    'Accept-Language' : `zh-cn`
    };
const body = `{"activityCode":"checkinPlus"}`;

let isGetCookie = typeof $request !== 'undefined';

if (isGetCookie) {
    // 获取 Cookie
    if ($request.headers['Cookie']) {
        var cookie = $request.headers['Cookie'];
        var userAgent = $request.headers['User-Agent'];
        $prefs.setValueForKey(cookie, cookieKey);
        $prefs.setValueForKey(userAgent, userAgentKey);
        $notify("成功获取招商银行信用卡 cookie 🎉", "", "请禁用该脚本")
    }
    $done({});
} else {
    // 签到
    var request = {
        url: checkinURL,
        method: 'POST',
        headers: headers,
        body: body
    };

    $task.fetch(request).then(response => {
        const result = JSON.parse(response.body);
        if (result.respCode == 1000) {
            $notify("招商银行信用卡", "", "签到成功，获得 " + result.data.awardValue + " 积分🎁");
        } else if (result.respCode == 1452) {
            $notify("招商银行信用卡", "", "签到失败，请获取 cookie");
        } else if (result.respCode == 'custom_8500') {
            $notify("招商银行信用卡", "", "签到失败，" + result.respMsg);
        } else {
            $notify("招商银行信用卡", "", "签到失败，请查看日志");
            console.log(response.body)
        }
    }, reason => {
        $notify("招商银行信用卡", "", reason.error)
    });
}
