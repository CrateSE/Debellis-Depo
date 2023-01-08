//Import neccesary libraries
import './style.css';
import * as THREE from "./build/three.module.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Importing animations for text

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

//Creating scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

//Renderer Preset

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//Shape Geometry Defition

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0x3d61ba,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

//Light Addition
//Collectively I will always need the these basics in a Three.JS Project
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 12, 20);

//Could have added ambient light and changed mesh settings to make it solid, but I personally like the transparency and geometry of it.

//Added helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

//Added moveable controls (Omitted for a reason)
// const controls = new OrbitControls(camera, renderer.domElement);

//Animation Loop (Game Loop)

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.1;

  renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function finish() {
  onWindowResize();
  animate();
}
finish();