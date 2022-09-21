let obj = JSON.parse($response.body);
obj = {
    "success": 1,
    "message": null,
    "data": {
        "user": {
            "id": 900000,
            "promotion_days": 999,
            "checkin_days": 0,
            "want_watch_count": 0,
            "promotion_code": "s8rvea",
            "vip_expired_at": "2099-09-09T22:16:31.000+08:00",
            "username": "IOS16",
            "share_url": "https://jav3.app/?source=s8rvea",
            "last_checkin_at": null,
            "promote_users_count": 999,
            "email": "7777777@qq.com",
            "is_vip": true,
            "watched_count": 0
        },
        "banner_type": "payment"
    },
    "action": null
}
    ;

$done({ body: JSON.stringify(obj) });