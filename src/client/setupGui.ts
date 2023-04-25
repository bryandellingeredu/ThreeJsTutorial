import * as THREE from 'three';
import { GUI } from 'dat.gui';

export const setupGUI = (cube: THREE.Mesh, camera: THREE.PerspectiveCamera) => {
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

};