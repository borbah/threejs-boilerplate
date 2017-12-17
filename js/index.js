'use strict';

(function () {

    "use strict";

    var HEIGHT = void 0,
        WIDTH = void 0;

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 10000);
    var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    function handleWindowResize() {
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }

    // light variables
    var hemisphereLight = void 0,
        ambientLight = void 0;

    function createLights() {
        hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        ambientLight = new THREE.AmbientLight(0xdc8874, .5);

        scene.add(hemisphereLight, ambientLight);
    }

    var Box = function Box() {
        var geom = new THREE.BoxGeometry(50, 50, 50);
        var mat = new THREE.MeshPhongMaterial({
            color: 0xf25346,
            opacity: .5,
            shading: THREE.FlatShading
        });
        this.mesh = new THREE.Mesh(geom, mat);
    };

    var box = void 0;

    function createBox() {
        box = new Box();
        box.mesh.position.set(0, 0, 0);
        scene.add(box.mesh);
    }

    function initScene() {
        camera.position.set(0, 0, 170);
        createLights();
        createBox();
        render();
    }

    function render() {
        box.mesh.rotation.x += 0.01;
        box.mesh.rotation.y += 0.02;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    window.onload = initScene;
    window.addEventListener('resize', handleWindowResize, false);

    return {
        scene: scene
    };
})();