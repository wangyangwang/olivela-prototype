var APP_DATA = {
  scenes: [
    {
      id: "2-ss",
      name: "ss",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true
        },
        {
          tileSize: 512,
          size: 512
        }
      ],
      faceSize: 341.5,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966
      },
      linkHotspots: [],
      infoHotspots: []
    }
  ],
  name: "Project Title",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: true
  }
};

(function() {
  var data = APP_DATA;
  var Marzipano = window.Marzipano;

  var panoElement = document.getElementById("pano");
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  var levels = [{
    "tileSize": 256,
    "size": 256,
    "fallbackOnly": true
  },
  {
    "tileSize": 512,
    "size": 512
  },
  {
    "tileSize": 512,
    "size": 1024
  }];

  // var levels = APP_DATA.levels;

  var geometry = new Marzipano.CubeGeometry(levels);
  var source = Marzipano.ImageUrlSource.fromString(
    "tiles/2-ss/{z}/{f}/{y}/{x}.jpg"
  );
  
  var limiter = Marzipano.RectilinearView.limit.traditional(1024, 120*Math.PI/300);

  
  var view = new Marzipano.RectilinearView({
    yaw: 90 * Math.PI/180,
    pitch: -30 * Math.PI/180,
    fov: 90 * Math.PI/180
  },limiter);

  var scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view
  });



  ////

  var element = document.getElementById("spot");
  var position = { yaw: Math.PI / 4, pitch: Math.PI / 8 };
  scene.hotspotContainer().createHotspot(element, position);

  var toScene01Button = document.getElementById("to-scene1");
  var toScene02Button = document.getElementById("to-scene2");


  scene.switchTo({
    transitionDuration: 1000
  });


})();
