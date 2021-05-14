import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Interaction } from 'three.interaction';
import * as dat from 'dat.gui'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()
/**
 ****  HOME PAGE ****
 **/
function home(){
//-- CANVAS --//
const canvas = document.querySelector('canvas.webgl')

//-- SCENE --//
const scene = new THREE.Scene()

//-- TEXTURE --//
const textureLoader = new THREE.TextureLoader()
const cross = textureLoader.load('./textures/particles/close.png')

//-- OBJECT SPHERE PARTICULES --//
const geometry = new THREE.SphereBufferGeometry(1, 32, 32)
const geometryMaterial = new THREE.PointsMaterial({
    size: 0.015,
    sizeAttenuation: true,
    color: '#007175',
})
//-- PARTICULES DECOR --//
const particulesDecor = new THREE.BufferGeometry;
const particulesCnt = 2000;
const particulesMaterial = new THREE.PointsMaterial({
    size: 0.016,
    map: cross,
    transparent: true
})

//-- PARTICULES POSITION --//
const posArray = new Float32Array(particulesCnt * 3)
for(let i = 0; i < particulesCnt * 3; i++){
    posArray[i] = (Math.random() -0.5) * (Math.random() *5)
}
particulesDecor.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

//-- POINTS --//
const sphere = new THREE.Points(geometry, geometryMaterial)
const particulesMesh = new THREE.Points(particulesDecor, particulesMaterial)
scene.add(sphere, particulesMesh)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#000000'))

//-- MOUSE --//

document.addEventListener('mousemove', animateParticules)
let mouseX = 0
let mouseY = 0

function animateParticules(event){
    mouseY = event.clientY
    mouseX = event.clientX
}

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    if(mouseX > 0){
        particulesMesh.rotation.x = -mouseY *(elapsedTime * 0.00008)
        particulesMesh.rotation.y = mouseX *(elapsedTime * 0.00008)
    }
    sphere.rotation.y = .5 * elapsedTime *0.8
    sphere.position.y = 0.7
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
}
/**
 ****  STUDIO PAGE ****
 **/

function deepScene(){
//-- CANVAS --//
const canvas = document.querySelector('canvas.webglStudio')

//-- SCENE --//
const scene = new THREE.Scene()

//-- DRACO LOADER --//
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')

//var textureLoader = new THREE.TextureLoader();
//var texture = textureLoader.load( './models/scene/peau.png' );
//texture.normalscale.set(0.05, 0.05)
//texture.flipY = false;
//var model = gltf.scene;
//model.traverse ( ( o ) => {
//  if ( o.isMesh ) {
//    // note: for a multi-material mesh, `o.material` may be an array,
//    // in which case you'd need to set `.map` on each value.
//    o.material.map = texture;
//  }
//} );
//const material = new THREE.MeshToonMaterial()
//-- GLTF SCENE LOADER --//
const gltfLoader = new GLTFLoader()
gltfLoader.load(
    './models/scene/teset1.gltf',
    (gltf)=>{
       
        gltf.scene.scale.set(0.05 , 0.05 , 0.05)
        scene.add(gltf.scene)
    }
)


//-- GLTF WHITE SHARK --//
const sharkLoader = new GLTFLoader()
sharkLoader.load(
    './models/scene/Shark1.gltf',
    (shark)=>{
        var model = shark.scene;
        model.traverse ( ( o ) => {
            if ( o.isMesh ) {
              // note: for a multi-material mesh, `o.material` may be an array,
              // in which case you'd need to set `.map` on each value.
              //o.material.wireframe = true;
              o.material.wireframe = true
            }
        });
        model.position.set(-8, -38, 23);
        model.rotation.y = -30
        shark.scene.scale.set(0.8 , 0.8 , 0.8);
        scene.add(model)
    }
)
//-- GLTF HAMMER SHARK --//
const hammerLoader = new GLTFLoader()
hammerLoader.load(
    './models/scene/hammer.gltf',
    (shark)=>{
        var model = shark.scene;
        model.traverse ( ( o ) => {
            if ( o.isMesh ) {
              // note: for a multi-material mesh, `o.material` may be an array,
              // in which case you'd need to set `.map` on each value.
              //o.material.wireframe = true;
              o.material.wireframe = true
            }
        });
        model.position.set(-8, -10, -135);
        model.rotation.y = 45
        shark.scene.scale.set(1.4 , 1.4 , 1.4);
        scene.add(model)
    }
)
//-- GLTF FISH GLOBE --//
const globeLoader = new GLTFLoader()
globeLoader.load(
    './models/scene/blobe.gltf',
    (blobe)=>{
        var model = blobe.scene;
        model.traverse ( ( o ) => {
            if ( o.isMesh ) {
              // note: for a multi-material mesh, `o.material` may be an array,
              // in which case you'd need to set `.map` on each value.
              //o.material.wireframe = true;
              o.material.wireframe = true
            }
        });
        model.position.set(-12, -3, -170);
        model.rotation.x = 30
        blobe.scene.scale.set(0.2 , 0.2, 0.2);
        scene.add(model)
    }
)


//-- GLTF FISH GLOBE --//
const butfshLoader = new GLTFLoader()
butfshLoader.load(
    './models/scene/butflysh.gltf',
    (blobe)=>{
        var model = blobe.scene;
        model.traverse ( ( o ) => {
            if ( o.isMesh ) {
              // note: for a multi-material mesh, `o.material` may be an array,
              // in which case you'd need to set `.map` on each value.
              //o.material.wireframe = true;
              o.material.wireframe = true
            }
        });
        model.position.set(12, -3, -170);
        blobe.scene.scale.set(0.08 , 0.08, 0.08);
        scene.add(model)
    }
)

//-- GLTF FISH GLOBE --//
const walletLoader = new GLTFLoader()
walletLoader.load(
    './models/scene/wallet.gltf',
    (blobe)=>{
        var model = blobe.scene;
        model.traverse ( ( o ) => {
            if ( o.isMesh ) {
              // note: for a multi-material mesh, `o.material` may be an array,
              // in which case you'd need to set `.map` on each value.
              //o.material.wireframe = true;
              o.material.wireframe = true
            }
        });
        model.position.set(15, 10, 23);
        model.rotation.x = 60 
        blobe.scene.scale.set(0.003 , 0.003, 0.003);
        scene.add(model)
    }
)
//-- GLTF DOLPHIN --//
const dolphinLoader = new GLTFLoader()
dolphinLoader.load(
    './models/scene/dolphin.gltf',
    (blobe)=>{
        var model = blobe.scene;
        model.traverse ( ( o ) => {
            if ( o.isMesh ) {
              // note: for a multi-material mesh, `o.material` may be an array,
              // in which case you'd need to set `.map` on each value.
              //o.material.wireframe = true;
              o.material.wireframe = true
            }
        });
        model.position.set(15, -3, -145);
        model.rotation.y = 30
        blobe.scene.scale.set(0.03 , 0.03, 0.03);
        scene.add(model)
    }
)
//-- GLTF WHALLE SHARK --//
const wharkLoader = new GLTFLoader()
wharkLoader.load(
    './models/scene/whark.gltf',
    (shark)=>{
        var model = shark.scene;
        model.traverse ( ( o ) => {
            if ( o.isMesh ) {
              // note: for a multi-material mesh, `o.material` may be an array,
              // in which case you'd need to set `.map` on each value.
              //o.material.wireframe = true;
              o.material.wireframe = true
            }
        });
        model.position.set(-16, -15, -70);
        model.rotation.y = -60
        shark.scene.scale.set(1.5 ,1.5 , 1.5);
        scene.add(model)
    }
)
//-- GLTF RAY MANTA --//


const rayLoader = new GLTFLoader()
rayLoader.load(
    './models/scene/ray.gltf',
   (shark)=>{
        var model = shark.scene;
        model.traverse ( ( o ) => {
            if ( o.isMesh ) {
              // note: for a multi-material mesh, `o.material` may be an array,
              // in which case you'd need to set `.map` on each value.
              //o.material.wireframe = true;
              o.material.wireframe = true
            }
        });
        model.position.set(-16, -15, -105);
        model.rotation.x = 30
        shark.scene.scale.set(1.2 ,1.2 , 1.2);
        scene.add(model)
    }
)

//-- GLTF ABYSSE --//
const abysseLoader = new GLTFLoader()
abysseLoader.load(
    './models/scene/abysse.gltf',
    (shark)=>{
        var model = shark.scene;
        model.traverse ( ( o ) => {
            if ( o.isMesh ) {
              // note: for a multi-material mesh, `o.material` may be an array,
              // in which case you'd need to set `.map` on each value.
              //o.material.wireframe = true;
              o.material.wireframe = true
            }
        });
        model.position.set(0, -75, 155);
        model.rotation.y = 180
        //model.position.y = Math.sin(elapsedTime * 0.3) * 1.5
        shark.scene.scale.set(0.02 ,0.02 , 0.02);
        scene.add(model)
    }
)


//**
//* Textures
//*/
//const textureLoader = new THREE.TextureLoader()
//const particulesTexture = textureLoader.load('./textures/particles/2.png')
//
///**
// * particules
// */
//
////geometry
//const particulesGeometry = new THREE.BufferGeometry()
//const count = 2500
//
//const positions = new Float32Array(count * 3)
////const colors = new Float32Array(count *3 )
//
//for(let i = 0; i < count *3; i++)
//{
//    positions[i] = (Math.random() -0.5) * 10
//    //colors[i] = Math.random()
//}
//particulesGeometry.setAttribute(
//    'position',
//    new THREE.BufferAttribute(positions, 3)
//)
////particulesGeometry.setAttribute(
////    'color',
////    new THREE.BufferAttribute(colors, 3)
////)
//
////material
//const particulesMaterial = new THREE.PointsMaterial()
//particulesMaterial.size = 0.1
//particulesMaterial.sizeAttenuation = true
//particulesMaterial.color = new THREE.Color('#00bfff')
//particulesMaterial.map = particulesTexture
//particulesMaterial.transparent = true
//particulesMaterial.alphaMap = particulesTexture
////   particulesMaterial.alphaTest =0.001
////   particulesMaterial.depthTest = false
//particulesMaterial.depthWrite = false
////particulesMaterial.blending = THREE.AdditiveBlending
////particulesMaterial.vertexColors = true
//
////points
//const particules = new THREE.Points(particulesGeometry, particulesMaterial)
//scene.add(particules)
/**
 * Floor
 */
//const floor = new THREE.Mesh(
//new THREE.PlaneGeometry(10, 10),
//    new THREE.MeshStandardMaterial({
//        color: '#444444',
//        metalness: 0,
//        roughness: 0.5
//    })
//)
//floor.receiveShadow = true
//floor.rotation.x = - Math.PI * 0.5
//scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    tick()

})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height , 0.1, 15000)
camera.position.set(2, 5, -200)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

//-- SPLINECURVE --//
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2, 5, -200),
    new THREE.Vector3(2, 5, -180),
    new THREE.Vector3(2, -2, -170),
    new THREE.Vector3(2, -2, -155),
    new THREE.Vector3(2, -5, -155),
    new THREE.Vector3(2, -5, -145),
    new THREE.Vector3(2, -9, -145),
    new THREE.Vector3(2, -10, -125),
    new THREE.Vector3(2, -18, -123),
    new THREE.Vector3(2, -20, -112),
    new THREE.Vector3(0, -20, -110),
    new THREE.Vector3(0, -20, -100),
    new THREE.Vector3(-1, -20, -90),
    new THREE.Vector3(0, -20, -25),
    new THREE.Vector3(0, -23, -20),
    new THREE.Vector3(0, -23, 5),
    new THREE.Vector3(0, -33, 5),
    new THREE.Vector3(0, -33, 15),
    new THREE.Vector3(0, -40, 15),
    new THREE.Vector3(0, -40, 33),
    new THREE.Vector3(0, -37, 38),
    new THREE.Vector3(0, -37, 42),
    new THREE.Vector3(0, -40, 46),
    new THREE.Vector3(0, -40, 60),
    new THREE.Vector3(1, -40, 70),
    new THREE.Vector3(0, -40, 90),
    new THREE.Vector3(1, -40, 110),
    new THREE.Vector3(1, -40, 120),
    new THREE.Vector3(2, -40, 130),
    new THREE.Vector3(3, -40, 140),
    
]);
const curvePoints = curve.getPoints(5000)
const curveGeometry = new THREE.BufferGeometry().setFromPoints( curvePoints );
const curveMaterial = new THREE.LineBasicMaterial( { color : 0xff0000 } );

const splineObject = new THREE.Line( curveGeometry, curveMaterial);
scene.add(splineObject);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#3987c9'))

/**
 * Animate
 */
//const clock = new THREE.Clock();
//
//function updateCamera(){
//    const time = clock.getElapsedTime();
//    const looptime = 20;
//    const t = (time % looptime)/ looptime;
//    const t2 =((time + 0.1) % looptime) / looptime;
//    
//    console.log(splineObject);
//    const pos = splineObject.geometry.parameters.path.getPointAt(t);
//    const pos2 = splineObject.geometry.parameters.path.getPointAt(t2);
//    
//    camera.position.copy(pos);
//    camera.lookAt(pos2);
//}
const tick = () =>
{
     // update particules
     //particules.position.z = elapsedTime * 0.05
    // Update controls
    controls.update()
    
    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);

    //updateCamera();
}
tick()
let start = document.querySelector('.start');
start.addEventListener("click", function(){
    updateCamera()
    
})


}

home()
let studio = document.querySelector('.element--on');
let boutonStudio = document.querySelector('.bouton')
boutonStudio.addEventListener("click", function(){
    studio.classList.add('element--off')
    studio.classList.remove('element--on')
    if(studio.classList.contains('element--on')== true){
        home()
    }else{
        deepScene()
    }

});

