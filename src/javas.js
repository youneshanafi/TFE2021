const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
let   clock = new THREE.Clock();

const normal = new THREE.Vector3();
const position = new THREE.Vector3();
const lookAt = new THREE.Vector3();


let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFCFF);
document.getElementById("canvas").appendChild(renderer.domElement);


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});




let controls = new  THREE.OrbitControls(camera,renderer.domElement);


const  curve = new THREE.Curves.GrannyKnot();
const geometry = new THREE.TubeBufferGeometry( curve, 100, 2, 8, true );
const  material = new  THREE.MeshBasicMaterial({
     color:0x000000,
     wireframe: true,
     side:THREE.DoubleSide,
})

const  tube = new THREE.Mesh(geometry,material);
scene.add(tube);

const geometry1 = new THREE.BoxBufferGeometry( 1, 1, 2 );
const  material1 = new  THREE.MeshBasicMaterial({
     color:0x333333,
     side:THREE.DoubleSide,
})

const cameraTarget = new THREE.Object3D;
const lookTarget = new THREE.Object3D;
const cameraTargetlook = new THREE.Mesh(geometry1,material1);
scene.add(cameraTargetlook);

function updateCamera() {
  
   const time = clock.getElapsedTime();
   const  looptime = 20;
   const t = (time % looptime)/ looptime;
   const  t2 = ((time +0.1)% looptime) / looptime;
  const  t3 = ((time +0.101)% looptime) / looptime;
  const  pos = tube.geometry.parameters.path.getPointAt(t);
  const  pos2 =   tube.geometry.parameters.path.getPointAt(t2);
  const  pos3 =   tube.geometry.parameters.path.getPointAt(t3);
  camera.position.set(pos.x, pos.y +4, pos.z);
  cameraTarget.position.set(pos2.x, pos2.y +4, pos2.z);
  cameraTargetlook.position.set(pos2.x, pos2.y +3, pos2.z);
  lookTarget.position.set(pos3.x, pos3.y +3, pos3.z);

  camera.lookAt(cameraTarget.position);
  
cameraTargetlook.lookAt(lookTarget.position);
  cameraTargetlook.rotateOnAxis( new THREE.Vector3(0,1,0), Math.PI * -0.5);
};

const animate = function () {
     requestAnimationFrame( animate );
     updateCamera();

     renderer.render( scene, camera );
};

animate();
