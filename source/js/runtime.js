var now = new Date();

let createtime = () => {

    // 当前时间
    now.setTime(now.getTime() + 1000);

    // 网站诞生时间
    const wbt = new Date("6/4/2025 18:00:00");

    let days = (now - wbt) / 1e3 / 60 / 60 / 24,

        dnum = Math.floor(days),
        hours = (now - wbt) / 1e3 / 60 / 60 - 24 * dnum,
        hnum = Math.floor(hours);

    1 == String(hnum).length && (hnum = "0" + hnum);
    let minutes = (now - wbt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
        mnum = Math.floor(minutes);
    1 == String(mnum).length && (mnum = "0" + mnum);

    let seconds = (now - wbt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
        snum = Math.round(seconds);
    1 == String(snum).length && (snum = "0" + snum);

    let currentTimeHtml = "";
    (currentTimeHtml = `<div style="font-size:13px;font-weight:bold">本站已运行 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> </div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}

// 设置重复执行函数，周期1000ms
setInterval(() => {
    createtime();
}, 1000);