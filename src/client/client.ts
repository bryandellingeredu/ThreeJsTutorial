import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube")
const cameraFolder = gui.addFolder("Camera")
cubeFolder.open()
cameraFolder.open()

const rotationHelper = {
    x: cube.rotation.x,
    y: cube.rotation.y,
    z: cube.rotation.z,
  };

  const cameraPositionHelper = {
    z: camera.position.z,
  };


  const onChange = (axis: 'x' | 'y' | 'z') => (value: number) => {
    cube.rotation[axis] = value;
  };

  const onCameraPositionChange = (axis: 'z') => (value: number) => {
    camera.position[axis] = value;
  };

  cubeFolder.add(rotationHelper, 'x', 0, Math.PI * 2).onChange(onChange('x'));
  cubeFolder.add(rotationHelper, 'y', 0, Math.PI * 2).onChange(onChange('y'));
  cubeFolder.add(rotationHelper, 'z', 0, Math.PI * 2).onChange(onChange('z'));

  cameraFolder.add(cameraPositionHelper, 'z', 0, 20).onChange(onCameraPositionChange('z'));


function animate() {
    requestAnimationFrame(animate)

    //cube.rotation.x += 0.01
    //cube.rotation.y += 0.01

    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()