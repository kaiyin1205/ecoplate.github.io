/* Website template by freewebsitetemplates.com */
window.onload = function () {
    // 手機選單邏輯
    var getNavi = document.getElementById('menu');
    document.getElementById('mobile-navigation').onclick = function () {
        var a = getNavi.getAttribute('style');
        if (a) {
            getNavi.removeAttribute('style');
            document.getElementById('mobile-navigation').style.backgroundImage = 'url(images/mobile/mobile-menu.png)';
        } else {
            getNavi.style.display = 'block';
            document.getElementById('mobile-navigation').style.backgroundImage = 'url(images/mobile/mobile-close.png)';
        }
    };
    var getElm = getNavi.getElementsByTagName("LI");
    for (var i = 0; i < getElm.length; i++) {
        if (getElm[i].children.length > 1) {
            var smenu = document.createElement("span");
            smenu.setAttribute("class", "mobile-submenu");
            smenu.setAttribute("OnClick", "submenu(" + i + ")");
            getElm[i].appendChild(smenu);
        }
    }
    submenu = function (i) {
        var sub = getElm[i].children[1];
        var b = sub.getAttribute('style');
        if (b) {
            sub.removeAttribute('style');
            getElm[i].lastChild.style.backgroundImage = 'url(images/mobile/mobile-expand.png)';
            getElm[i].lastChild.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        } else {
            sub.style.display = 'block';
            getElm[i].lastChild.style.backgroundImage = 'url(images/mobile/mobile-collapse.png)';
            getElm[i].lastChild.style.backgroundColor = 'rgba(248, 98, 130, 0.8)';
        }
    };

    // 地圖初始化邏輯
    if (document.getElementById('map')) { // 確保 map 元素存在
        if (typeof map === 'undefined') { // 確保 map 尚未初始化
            var map = L.map('map').setView([23.6978, 120.9605], 8); // 台灣中心

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // 添加標記
            var locations = [
                { name: "Taipei Love Meal Center", lat: 25.0330, lng: 121.5654 },
                { name: "Kaohsiung Love Meal Spot", lat: 22.6273, lng: 120.3014 },
                { name: "Taichung Kindness Kitchen", lat: 24.1477, lng: 120.6736 }
            ];

            locations.forEach(function (location) {
                L.marker([location.lat, location.lng])
                    .addTo(map)
                    .bindPopup('<b>' + location.name + '</b>');
            });

            // 解決地圖渲染問題
            setTimeout(function () {
                map.invalidateSize();
            }, 500);
        } else {
            console.warn("Map is already initialized!");
        }
    }
};
