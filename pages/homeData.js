import React, { Suspense } from "react";
import styles from "../styles/Cards.module.css";
import styles2 from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import { Model } from "../model/Model";


const HomeData = () => {
  
  return (
    <div className={styles.cardsContainer} id="dasda">
      <Canvas
        //camera={{ position: [0, 0, 20], fov: 15, near: 10, far: 1000 }}
        shadows={true}
        camera={{ fov: 60, near: 2, far: 5000 }}
        dpr={[1, 1.5]}
        gl={{ alpha: false, antialias: true }}
        onCreated={({ gl, events }) => {
          gl.setClearColor("#fffbd7");

          gl.toneMappingExposure = 0.5;
          gl.toneMappingWhitePoint = 0.5;
        }}
        resize={2}
        className={styles2.canvas}
        style={{ width: "700px", height: "800px" }}
      >
        <Suspense fallback={null}>
          <Model
            modelPath="./model/scene.gltf"
            positionX={0}
            positionY={-1}
            positionZ={0}
            scale={200}
          />
        </Suspense>
      </Canvas>

      <div className={styles2.homeTitle}>
        <h1 className={styles2.homeTitleH1}>
          Help <br />
          animals <br />
          find <br />
          friends
        </h1>
      </div>
    </div>
  );
};

export default HomeData;

/*
export async function getStaticProps() {
  const product_res = await fetch(`${API_URL}/products/`)
  const products = await product_res.json()

  return {
    props: {
        products
    }
  }
}

*/
