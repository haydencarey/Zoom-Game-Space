import { MeshStandardMaterial } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createMaterials() {
    const body = new MeshStandardMaterial({
      color: 'firebrick',
      flatShading: true,
    });
  
    const detail = new MeshStandardMaterial({
      color: 'darkslategray',
      flatShading: true,
    });

    const wood = new MeshStandardMaterial({
      color: 'white',
      flatShading: true,
    });

    const metal = new MeshStandardMaterial({
      color: 'black',
      flatShading: true,
    });

    const bubble = new MeshStandardMaterial({
      color: 'grey',
      flatShading: true,
    });
  
    return { body, bubble, detail, wood, metal };
  }

export { createMaterials }