ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    center: [53.34064882519488, 83.70733622509766],
    zoom: 6,
    controls: []
  });
  
  (myPlacemark = new ymaps.Placemark(
    [52.56587006924087, 85.22005682373013],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/mdi_map-marker-check-outline.svg",
      iconImageSize: [70, 73],
      iconImageOffset: [-33, -69],
    }
  )),
    (myPlacemar1 = new ymaps.Placemark(
      [51.55008129835597,81.210047058104],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "img/mdi_map-marker-check-outline.svg",
        iconImageSize: [70, 73],
        iconImageOffset: [-33, -69],
      }
    ));
  myMap.geoObjects.add(myPlacemark).add(myPlacemar1);
}