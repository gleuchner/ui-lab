
// 3D code partially grabbed from http://dev.opera.com/articles/view/porting-3d-graphics-to-the-web-webgl-intro-part-2/
const remote = require('electron').remote;

document.addEventListener('DOMContentLoaded', function() {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var FLOOR = 0;

    var container;

    var camera, scene;
    var webglRenderer;

    var currentObject;

    var mouseX = 0, mouseY = 0;
    var mousemoveX = 0, mousemoveY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );

    initButons();

    init();
    animate();

    function init() {
        container = document.createElement( 'div' );
        document.body.appendChild( container );

        // camera
        camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 1000 );
        camera.position.z = 200;

        //scene
        scene = new THREE.Scene();

        var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
        var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
        var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

        scene.add(skybox);


        var dLight = new THREE.DirectionalLight(0xffffff);
        dLight.position.set(200, 50, 400);
        scene.add(dLight);

        var pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(0, 100, 200);
        pointLight.intensity = 1;
        scene.add(pointLight);

        // renderer
        webglRenderer = new THREE.WebGLRenderer();
        webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        webglRenderer.domElement.style.position = "relative";
        container.appendChild( webglRenderer.domElement );

        createScene( );
    }

    function initButons() {
        var button = document.getElementById('cube-button');
        if (button)
        {
            button.addEventListener('click', ()=>{
                addObject(new THREE.CubeGeometry(100, 100, 100));
                currentObject.rotation.set(90, 90, 90);
            });
        }

        var sphereButton = document.getElementById('sphere-button');
        if (sphereButton)
        {
            sphereButton.addEventListener('click', ()=>{
                addObject(new THREE.SphereGeometry(50, 16, 16));
            });
        }

    }

    function addObject(geometry)
    {
        if (currentObject)
        {
            scene.remove(currentObject);
        }

        // create the sphere's material
        const material = new THREE.MeshLambertMaterial({ color: 0x1ec876 });

        var object = new THREE.Mesh(geometry, material);
        object.scale.set( 1, 1, 1 );
        object.position.set( 0, 0, 0 );

        // Finally, add the sphere to the scene.
        scene.add(object);
        currentObject = object;
    }


    function createScene( ) {
        addObject(new THREE.SphereGeometry(50, 16, 16));
    }

    function onDocumentMouseWheel(event) {
        camera.position.z -= event.wheelDelta/120*3;
    }


    function animate() {
        requestAnimationFrame( animate );
        render();
    }

    function render() {
        webglRenderer.render( scene, camera );
    }

});

