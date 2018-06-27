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
  var view = new Marzipano.RectilinearView({
    yaw: 90 * Math.PI/180,
    pitch: -30 * Math.PI/180,
    fov: 90 * Math.PI/180
  });

  var scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view
  });

  //////scene 02

  //get video assets
  var asset = new VideoAsset();
  var video = document.createElement('video');
  video.src = 'http://www.marzipano.net/media/video/mercedes-f1-1280x640.mp4';
  video.crossOrigin = 'anonymous';
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  // Prevent the video from going full screen on iOS.
  video.playsInline = true;
  video.webkitPlaysInline = true;
  //play video and apply it to the source
  video.play();
  asset.setVideo(video);
  var source2 = new Marzipano.SingleAssetSource(asset);
  //.....
  var limiter = Marzipano.RectilinearView.limit.vfov(90*Math.PI/180, 90*Math.PI/180);
  var geometry2 = new Marzipano.EquirectGeometry([ { width: 1 } ]);
  var view2 = new Marzipano.RectilinearView({ fov: Math.PI/2 }, limiter);


  var scene2 = viewer.createScene({
    source: source2,
    geometry: geometry2,
    view: view2
  });

  ////

  var element = document.getElementById("spot");
  var position = { yaw: Math.PI / 4, pitch: Math.PI / 8 };
  scene.hotspotContainer().createHotspot(element, position);

  var toScene01Button = document.getElementById("to-scene1");
  var toScene02Button = document.getElementById("to-scene2");

  // toScene01Button.addEventListener("click", function() {

  // });

  // toScene02Button.addEventListener("click", function() {
  //   scene2.switchTo({
  //     transitionDuration: 1000
  //   });
  // });


  scene.switchTo({
    transitionDuration: 1000
  });


})();
