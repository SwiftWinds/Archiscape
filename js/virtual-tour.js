const virtualTourViewer = `
<script type="module">
    import * as THREE from "./build/three.module.js";
    import { TrackballControls } from "./jsm/controls/TrackballControls.js";
    import { PCDLoader } from "./jsm/loaders/PCDLoader.js";
    var container;
    var camera, controls, scene, renderer;
    init();
    animate();
    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      camera = new THREE.PerspectiveCamera(
        15,
        window.innerWidth / window.innerHeight,
        0.01,
        40
      );
      camera.position.x = -13;
      camera.position.z = 14;
      camera.position.y = 12;
      camera.up.set(0, 0, 1);
      scene.add(camera);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      var loader = new PCDLoader();
      loader.load(
        "copy_of_fragment.pcd",
        function (mesh) {
          scene.add(mesh);
        },
        function (points) {
          scene.add(points);
          var center = points.geometry.boundingSphere.center;
          controls.target.set(center.x, center.y, center.z);
          controls.update();
        }
      );
      container = document.createElement("div");
      document.body.appendChild(container);
      container.appendChild(renderer.domElement);
      controls = new TrackballControls(camera, renderer.domElement);
      controls.rotateSpeed = 2.0;
      controls.zoomSpeed = 0.3;
      controls.panSpeed = 0.2;
      controls.staticMoving = true;
      controls.minDistance = 0.3;
      controls.maxDistance = 0.3 * 100;
      window.addEventListener("resize", onWindowResize, false);
      window.addEventListener("keypress", keyboard);
      new Promise((res) => setTimeout(res, 1500)).then(() => {
        const points = scene.getObjectByName("copy_of_fragment.pcd");
        points.material.size *= 40;
        points.material.needsUpdate = true;
      });
    }
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      controls.handleResize();
    }
    function keyboard(ev) {
      var points = scene.getObjectByName("copy_of_fragment.pcd");
      switch (ev.key || String.fromCharCode(ev.keyCode || ev.charCode)) {
        case "+":
          console.log(camera);
          points.material.size *= 1.2;
          points.material.needsUpdate = true;
          console.log("+++");
          break;
        case "-":
          points.material.size /= 1.2;
          points.material.needsUpdate = true;
          break;
        case "c":
          points.material.color.setHex(Math.random() * 0xffffff);
          points.material.needsUpdate = true;
          break;
      }
    }
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
</script>`;

$('#exampleInputFile').on("change", () => {
  $('.after-upload').show();
  $('body').append(virtualTourViewer);
});