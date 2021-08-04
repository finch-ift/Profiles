const $ = new compatibility();

!(async () => {
	const cmb_checkin =
		"cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=003595&cmb_app_trans_parms_start=here&appflag=0&shorturl=https%3a%2f%2ft.cmbchina.com%2fyaIrYn";
	$.notify("招商银行-签到", "", "点击跳转去做签到任务啦", cmb_checkin);
})().finally(() => $done());

function compatibility() {
	_isQuanX = typeof $task != "undefined";
	_isLoon = typeof $loon != "undefined";
	_isSurge = typeof $httpClient != "undefined" && !_isLoon;
	this.read = (key) => {
		if (_isQuanX) return $prefs.valueForKey(key);
		if (_isLoon) return $persistentStore.read(key);
	};
	this.notify = (title, subtitle, message, url) => {
		if (_isLoon) $notification.post(title, subtitle, message, url);
		if (_isQuanX) $notify(title, subtitle, message, { "open-url": url });
		if (_isSurge) $notification.post(title, subtitle, message, { url: url });
	};
}
