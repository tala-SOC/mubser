import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = document.getElementById("mubsir-3d");

if (!container) {
    console.error("MUBSIR 3D container not found");
} else {

    // =========================
    // SCENE
    // =========================

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.set(0, 0.15, 5.5);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.setClearColor(0x000000, 0);

    renderer.shadowMap.enabled = true;

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);


    // =========================
    // LIGHTING
    // =========================

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        2.2
    );

    scene.add(ambientLight);


    const blueLight = new THREE.PointLight(
        0x2878ff,
        20,
        10
    );

    blueLight.position.set(3, 2, 4);

    scene.add(blueLight);


    const cyanLight = new THREE.PointLight(
        0x00d9ff,
        12,
        8
    );

    cyanLight.position.set(-3, 0, 3);

    scene.add(cyanLight);


    const topLight = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    topLight.position.set(0, 5, 5);

    scene.add(topLight);


    // =========================
    // MATERIALS
    // =========================

    const frameMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x080a0e,
        metalness: 0.65,
        roughness: 0.25,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15
    });


    const lensMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x182532,
        metalness: 0.2,
        roughness: 0.08,
        transmission: 0.15,
        transparent: true,
        opacity: 0.72,
        clearcoat: 1
    });


    const detailMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x10151c,
        metalness: 0.8,
        roughness: 0.2
    });


    const sensorMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x00d9ff,
        emissive: 0x00d9ff,
        emissiveIntensity: 3,
        metalness: 0.5,
        roughness: 0.2
    });


    // =========================
    // GLASSES GROUP
    // =========================

    const glasses = new THREE.Group();

    scene.add(glasses);


    // =========================
    // ROUNDED BOX FUNCTION
    // =========================

    function createBox(
        width,
        height,
        depth,
        x,
        y,
        z,
        material,
        bevel = 0.08
    ) {

        const geometry = new THREE.BoxGeometry(
            width,
            height,
            depth
        );

        const mesh = new THREE.Mesh(
            geometry,
            material
        );

        mesh.position.set(x, y, z);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        glasses.add(mesh);

        return mesh;
    }


    // =========================
    // LENS SHAPE
    // =========================

    function createLens(x) {

        const shape = new THREE.Shape();

        shape.moveTo(-0.95, 0.35);

        shape.quadraticCurveTo(
            -0.85,
            0.58,
            -0.45,
            0.58
        );

        shape.quadraticCurveTo(
            0,
            0.58,
            0.78,
            0.42
        );

        shape.quadraticCurveTo(
            0.98,
            0.32,
            0.92,
            -0.22
        );

        shape.quadraticCurveTo(
            0.85,
            -0.63,
            0.35,
            -0.72
        );

        shape.quadraticCurveTo(
            -0.35,
            -0.8,
            -0.75,
            -0.55
        );

        shape.quadraticCurveTo(
            -1.02,
            -0.35,
            -0.95,
            0.35
        );


        const geometry = new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 0.055,
                bevelEnabled: true,
                bevelThickness: 0.035,
                bevelSize: 0.035,
                bevelSegments: 3
            }
        );

        const lens = new THREE.Mesh(
            geometry,
            lensMaterial
        );

        lens.scale.set(
            0.88,
            0.88,
            1
        );

        lens.position.set(
            x,
            0,
            0.18
        );

        glasses.add(lens);

        return lens;
    }


    // =========================
    // LENSES
    // =========================

    createLens(-0.98);
    createLens(0.98);


    // =========================
    // OUTER FRAME
    // =========================

    createBox(
        1.95,
        0.16,
        0.25,
        -0.98,
        0.43,
        0.15,
        frameMaterial
    );

    createBox(
        1.95,
        0.16,
        0.25,
        0.98,
        0.43,
        0.15,
        frameMaterial
    );


    createBox(
        1.9,
        0.15,
        0.25,
        -0.98,
        -0.48,
        0.15,
        frameMaterial
    );

    createBox(
        1.9,
        0.15,
        0.25,
        0.98,
        -0.48,
        0.15,
        frameMaterial
    );


    // =========================
    // NOSE BRIDGE
    // =========================

    createBox(
        0.42,
        0.16,
        0.3,
        0,
        0.05,
        0.12,
        frameMaterial
    );


    createBox(
        0.25,
        0.22,
        0.28,
        0,
        -0.15,
        0.12,
        frameMaterial
    );


    // =========================
    // TEMPLE ARMS
    // =========================

    const leftTemple = createBox(
        2.7,
        0.27,
        0.34,
        -1.55,
        0.08,
        -0.18,
        frameMaterial
    );

    leftTemple.rotation.z = -0.02;


    const rightTemple = createBox(
        2.7,
        0.27,
        0.34,
        1.55,
        0.08,
        -0.18,
        frameMaterial
    );

    rightTemple.rotation.z = 0.02;


    // =========================
    // EARPIECE ENDS
    // =========================

    createBox(
        0.45,
        0.22,
        0.35,
        -2.85,
        0.03,
        -0.2,
        frameMaterial
    );

    createBox(
        0.45,
        0.22,
        0.35,
        2.85,
        0.03,
        -0.2,
        frameMaterial
    );


    // =========================
    // SIDE AI SENSORS
    // =========================

    const sensorGeometry =
        new THREE.CylinderGeometry(
            0.13,
            0.13,
            0.08,
            32
        );


    const sensorLeft = new THREE.Mesh(
        sensorGeometry,
        sensorMaterial
    );

    sensorLeft.rotation.x = Math.PI / 2;

    sensorLeft.position.set(
        -1.82,
        0.15,
        0.36
    );

    glasses.add(sensorLeft);


    const sensorRight = new THREE.Mesh(
        sensorGeometry,
        sensorMaterial
    );

    sensorRight.rotation.x = Math.PI / 2;

    sensorRight.position.set(
        1.82,
        0.15,
        0.36
    );

    glasses.add(sensorRight);


    // =========================
    // SMALL AI DETAILS
    // =========================

    createBox(
        0.5,
        0.045,
        0.04,
        -1.15,
        -0.13,
        0.37,
        sensorMaterial
    );

    createBox(
        0.5,
        0.045,
        0.04,
        1.15,
        -0.13,
        0.37,
        sensorMaterial
    );


    // =========================
    // POSITION
    // =========================

    glasses.rotation.y = -0.25;
    glasses.rotation.x = 0.05;

    glasses.scale.set(
        1.15,
        1.15,
        1.15
    );


    // =========================
    // MOUSE ROTATION
    // =========================

    let targetX = -0.25;
    let targetY = 0.05;

    container.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                container.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width;

            const y =
                (event.clientY - rect.top)
                / rect.height;

            targetY = (x - 0.5) * 0.9;

            targetX = (y - 0.5) * 0.35;
        }
    );


    container.addEventListener(
        "mouseleave",
        () => {

            targetY = -0.25;
            targetX = 0.05;

        }
    );


    // =========================
    // TOUCH SUPPORT
    // =========================

    let touchStartX = 0;

    container.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    container.addEventListener(
        "touchmove",
        (event) => {

            const currentX =
                event.touches[0].clientX;

            const difference =
                currentX - touchStartX;

            targetY += difference * 0.008;

            touchStartX = currentX;

        },
        { passive: true }
    );


    // =========================
    // ANIMATION
    // =========================

    const clock = new THREE.Clock();

    function animate() {

        requestAnimationFrame(animate);

        const elapsed =
            clock.getElapsedTime();


        // smooth rotation

        glasses.rotation.y +=
            (targetY - glasses.rotation.y) * 0.06;

        glasses.rotation.x +=
            (targetX - glasses.rotation.x) * 0.06;


        // subtle floating

        glasses.position.y =
            Math.sin(elapsed * 1.2) * 0.07;


        // sensor glow

        sensorMaterial.emissiveIntensity =
            2.5 +
            Math.sin(elapsed * 3) * 0.7;


        renderer.render(
            scene,
            camera
        );
    }

    animate();


    // =========================
    // RESPONSIVE
    // =========================

    function resize() {

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height
        );
    }

    window.addEventListener(
        "resize",
        resize
    );

}