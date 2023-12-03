import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export function Ring() {

  const gltf = useLoader(GLTFLoader, "models/halo_ring/scene.gltf");
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  const [roughness, normal] = useLoader(TextureLoader, [
    "textures/roughness.png",
    "textures/normal.png",
]);


  const itemsRef = useRef([]);
  let alpha=0;
  useFrame((state) => {
    alpha+=0.01;
    const thita= 2*Math.PI/itemsRef.current.length;

    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      const angle= thita*i;
      let z = (i - 5) * 2.5;
      mesh.position.set(40*Math.cos(angle), 0, 40*Math.sin(angle));
      // mesh.lookAt(0, 0, 0);
      mesh.rotation.set(0,-angle,alpha);
      let dist = Math.abs(z);
      // scale down the rings
      // mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);
      // illuminate lights alternatively
      let color = new Color();
      color.setHSL((i % 2) /1.5, 1, 0.3);
      mesh.material.color = color;
      mesh.material.emissive = color;
    }
  }
  );

  return (
    <>
      {[0, 0, 0, 0, 0].map((v, i) => (
        <mesh
        castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          >e
          <torusGeometry args={[20, 1.5, 16, 20]} />
 
          <meshStandardMaterial roughness={0.6} metalness={0.5} flatShading={true} roughnessMap={roughness} normalMap={normal}/>
        </mesh>
      ))}
    </>
  );
}













//second part 

// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import { Color, TextureLoader } from "three";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// export function Ring() {
//   const gltf = useLoader(GLTFLoader, "models/halo_ring/scene.gltf");
//   gltf.scene.scale.set(0.1, 0.1, 0.1);
//   const [roughness, normal] = useLoader(TextureLoader, [
//     "textures/roughness.png",
//     "textures/normal.png",
//   ]);

//   const itemsRef = useRef([]);
//   let alpha = 0;
//   useFrame((state) => {
//     alpha += 0.01;
//     const thita = (2 * Math.PI) / itemsRef.current.length;

//     for (let i = 0; i < itemsRef.current.length; i++) {
//       let mesh = itemsRef.current[i];
//       const angle = thita * i;
//       let z = (i - 7)*3.5 ;
//       mesh.position.set(40 * Math.cos(angle), 0, 40 * Math.sin(angle));
//       mesh.rotation.set(0, -angle, alpha);
//     }
//   });

//   return (
//     <>
//       {[0, 0,0,0,0,0,0].map((v, i) => (
//         <mesh
//           castShadow
//           receiveShadow
//           position={[0, 0, 0]}
//           key={i}
//           ref={(el) => (itemsRef.current[i] = el)}
//         >
//           <primitive object={gltf.scene.clone()} />
//         </mesh>
//       ))}
//     </>
//   );
// }

