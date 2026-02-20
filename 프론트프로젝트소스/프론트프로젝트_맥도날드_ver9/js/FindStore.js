const itemList = document.querySelectorAll(".iconList li")
const imgList = document.querySelectorAll(".iconList li img")
// 아이콘 박스를 눌렀을때 해당 아이콘 박스의 배경색과 이미지를 색반전으로 토글함
itemList.forEach((item, index) => {
    item.addEventListener("click", e => {
        const computedStyle = getComputedStyle(item);
        const bgColor = computedStyle.backgroundColor;
        let imgName = imgList[index].src
        let whiteList = imgName.substring(0, imgName.length-4)
        let blackList = imgName.substring(0, imgName.length-12)
        if (bgColor === "rgb(0, 0, 0)") { 
            item.style.backgroundColor = "white";
            item.style.color = "black";
            imgList[index].src = blackList + ".png";
        } else {
            item.style.backgroundColor = "black";
            item.style.color = "white";
            imgList[index].src = whiteList + "_reverse.png";
        }
    });
});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 2 // 지도의 확대 레벨 
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {

    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px; border:none;">저 여기에 있어요!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
        const btnLoc = document.querySelector(".btnLoc")
        btnLoc.addEventListener("click", () => {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon)
            map.setCenter(locPosition);
        })

    });

} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = 'geolocation을 사용할수 없어요..'

    displayMarker(locPosition, message);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable
    });

    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}