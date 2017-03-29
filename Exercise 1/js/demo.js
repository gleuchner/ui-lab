
// 3D code partially grabbed from http://dev.opera.com/articles/view/porting-3d-graphics-to-the-web-webgl-intro-part-2/

document.addEventListener('DOMContentLoaded', function() {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var FLOOR = 0;

    var container;

    var camera, scene;
    var webglRenderer;

    var zmesh, geometry;

    var mouseX = 0, mouseY = 0;
    var mousemoveX = 0, mousemoveY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );

    var closeEl = initCloseBtn();

    init();
    animate();

    function init() {
        container = document.createElement( 'div' );
        document.body.appendChild( container );

        // camera
        camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
        camera.position.z = 75;

        //scene
        scene = new THREE.Scene();

        // lights
        var ambient = new THREE.AmbientLight( 0xffffff );
        scene.add( ambient );

        // more lights
        var directionalLight = new THREE.DirectionalLight( 0xffeedd );
        directionalLight.position.set( 0, -70, 100 ).normalize();
        scene.add( directionalLight );

        // renderer
        webglRenderer = new THREE.WebGLRenderer();
        webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        webglRenderer.domElement.style.position = "relative";
        container.appendChild( webglRenderer.domElement );

        createScene();

    }

    function initCloseBtn() {
        var closeEl = document.querySelector(".close");
        if (closeEl) {
            closeEl.addEventListener('click', function() {
                window.close();
            });
        };
        return closeEl;
    }

    function createScene( ) {
        // create the sphere's material
        const sphereMaterial =
            new THREE.MeshPhongMaterial(
                {
                    color: 0xCC0000
                });

        // Set up the sphere vars
        const RADIUS = 20;
        const SEGMENTS = 16;
        const RINGS = 16;

        // Create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
        const sphere = new THREE.Mesh(

            new THREE.SphereGeometry(
                RADIUS,
                SEGMENTS,
                RINGS),

        sphereMaterial);
        sphere.scale.set( 1, 1, 1 );
        sphere.position.set( 0, 0, 0 );

        // Finally, add the sphere to the scene.
        scene.add(sphere);
    }

    function onDocumentMouseDown(event) {
        if (event.target == closeEl) return; // it should deliver click to close button

        document.body.requestPointerLock =
            document.body.requestPointerLock ||
            document.body.mozRequestPointerLock ||
            document.body.webkitRequestPointerLock;
        document.body.requestPointerLock();
    }

    function onDocumentMouseUp(event) {
        document.exitPointerLock =
            document.exitPointerLock ||
            document.mozExitPointerLock ||
            document.webkitExitPointerLock;
        document.exitPointerLock();
    }

    function onDocumentMouseWheel(event) {
        camera.position.z -= event.wheelDelta/120*3;
    }

    function onDocumentMouseMove(event) {
        mouseX = ( event.clientX - windowHalfX );
        mouseY = ( event.clientY - windowHalfY );
        document.pointerLockElement =
            document.pointerLockElement ||
            document.mozPointerLockElement ||
            document.webkitPointerLockElement;
        if (document.pointerLockElement) {
            mousemoveX += event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            mousemoveY += event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        }
    }

    function animate() {
        requestAnimationFrame( animate );
        render();
    }

    function render() {

        if (zmesh) {
            zmesh.rotation.set(-(mouseY + mousemoveY)/windowHalfY + 0,
                -(mouseX + mousemoveX)/windowHalfX, 0);
        }
        webglRenderer.render( scene, camera );
    }

});

