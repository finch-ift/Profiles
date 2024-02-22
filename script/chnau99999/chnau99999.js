/**
 * 监控汇率变化
 * @author: Peng-YM
 * 更新地址：https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/exchange.js
 * 配置方法：
 * 1. 设置基准货币，默认人民币(CNY)。
 * 2. 设置保留几位小数。
 * @update ：YangZhaocool 
 */

const base = "CNY"; // 基准货币，可以改成其他币种
const digits = 2; // 保留几位有效数字

const $ = API("exchange");
const currencyNames = {
    CNY: ["人民币", "🇨🇳"],
    USD: ["美元", "🇺🇸"],
    HKD: ["港币", "🇭🇰"],
    JPY: ["日元", "🇯🇵"],
    EUR: ["欧元", "🇪🇺"],
    GBP: ["英镑", "🇬🇧"],
};


$.http.get({
    url: "https://api.exchangerate-api.com/v4/latest/CNY"
})
    .then((response) => {
        const data = JSON.parse(response.body);
        const source = currencyNames[base];

        const info = Object.keys(currencyNames).reduce((accumulator, key) => {
            let line = "";
            if (key !== base && data.rates.hasOwnProperty(key)) {
                const rate = parseFloat(data.rates[key]);
                const target = currencyNames[key];
                if (rate > 1) {
                    line = `${target[1]} 1${source[0]}兑${roundNumber(rate, digits)}${
                        target[0]
                    }\n`;
                } else {
                    line = `${target[1]} 1${target[0]}兑${roundNumber(1 / rate, digits)}${
                        source[0]
                    }\n`;
                }
            }
            return accumulator + line;
        }, "");
        $.notify(
            `[今日汇率] 基准：${source[1]} ${source[0]}`,
            `⏰ 更新时间：${data.date}`,
            `📈 汇率情况：\n${info}`
        );
    })
    .then(() => $.done());

function roundNumber(num, scale) {
    if (!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + scale) + "e-" + scale);
    } else {
        let arr = ("" + num).split("e");
        let sig = "";
        if (+arr[1] + scale > 0) {
            sig = "+";
        }
        return +(
            Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) +
            "e-" +
            scale
        );
    }
}