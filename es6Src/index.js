(function () {

    "use strict";

    let HEIGHT, WIDTH;

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 10000);
    const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true, alpha: true});
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
    let hemisphereLight, ambientLight;

    function createLights() {
        hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        ambientLight = new THREE.AmbientLight(0xdc8874, .5);

        scene.add(hemisphereLight, ambientLight);
    }

    const Box = function() {
        const geom = new THREE.BoxGeometry(50,50,50);
        const mat = new THREE.MeshPhongMaterial({
            color: 0xf25346,
            opacity:.5,
            shading:THREE.FlatShading,
        });
        this.mesh = new THREE.Mesh(geom,mat);
    }

    let box;

    function createBox() {
        box = new Box();
        box.mesh.position.set(0,0,0);
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
    }
})();
