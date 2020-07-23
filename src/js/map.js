ymaps.ready(init);    
function init(){ 
    var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10
    });

    var coords = [
        [55.75, 37.50],
        [55.32216911184813,38.67462917402046]
    ];

    var myCollection = new ymaps.GeoObjectCollection({}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/pin.svg',
        iconImageSize: [33, 40],
        iconImageOffset: [-3, -42]
    });


    for (var i = 0; i < coords.length; i++) {
        myCollection.add(new ymaps.Placemark(coords[i]));
    }

    myMap.geoObjects.add(myCollection);



    var centerAndZoom = ymaps.util.bounds.getCenterAndZoom(
        myCollection.getBounds(),
        [ $(window).width(), $("#map").height() ],
        myMap.options.get('projection')
    );  


    myMap.setCenter(centerAndZoom.center, (centerAndZoom.zoom));


    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl')
    myMap.controls.remove('typeSelector')
    myMap.controls.remove('fullscreenControl')
    myMap.controls.remove('rulerControl')


    $(window).resize(function() {
        if($(window).width() < 768){
            myMap.behaviors.disable('scrollZoom'); 
        }else{
            myMap.behaviors.enable('scrollZoom');
        } 
    });
}