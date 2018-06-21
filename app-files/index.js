/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var APP_DATA = {
  scenes: [
    {
      id: "0-ss",
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
    autorotateEnabled: true,
    fullscreenButton: false,
    viewControlButtons: false
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

  // Create scenes.
  var scenes = data.scenes.map(function(data) {
    var urlPrefix = "tiles";
    var source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
      { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" }
    );
    var geometry = new Marzipano.CubeGeometry(data.levels);

    // var limiter = Marzipano.RectilinearView.limit.traditional(
    //   data.faceSize,
    //   (100 * Math.PI) / 180,
    //   (120 * Math.PI) / 180
    // );
    var view = new Marzipano.RectilinearView();

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view
    });

    // // Create link hotspots.
    // data.linkHotspots.forEach(function(hotspot) {
    //   var element = createLinkHotspotElement(hotspot);
    //   scene
    //     .hotspotContainer()
    //     .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    // });

    // // Create info hotspots.
    // data.infoHotspots.forEach(function(hotspot) {
    //   var element = createInfoHotspotElement(hotspot);
    //   scene
    //     .hotspotContainer()
    //     .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    // });

    return {
      data: data,
      scene: scene,
      view: view
    };
  });



})();
