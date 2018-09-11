import * as THREE from "three";

import React from "react";
import React3 from "react-three-renderer";
import ObjectModel from 'react-three-renderer-objects';
import truck from "../../assets/Monster_truck.obj";

class DemoScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        cameraPosition: new THREE.Vector3(0, 0, 10),
        groupRotation: new THREE.Euler(0, 0, 0),
        scene: {},
        lineCounter:0,
        obstructionCounter:0,
        planeRotation: new THREE.Euler(),
        whiteLineMovement: new THREE.Vector3(.13,3,2),
        carMovement: new THREE.Vector3(0,-.5,8),
        obstructionPosition1: new THREE.Vector3(.1,2,2),
        obstructionPosition2: new THREE.Vector3(.2,3,2),
        sky: new THREE.Vector3(-.5,7,0),
        // obstructionRotation: new THREE.Euler(2,3.135),
        obstructionRotation: new THREE.Euler(0,0,0),
        playerWidth: .2,
        playerHeight: .2,
        playerDepth: .3,
        collisionCount: 0,
      }
    }

  componentDidMount() {
    const { scene } = this.refs;
    this.setState({ scene })
  }

  detectCollision = () =>{
    let objX = this.state.obstructionPosition1.x
    let objY = this.state.obstructionPosition1.y
    let playerX = this.state.carMovement.x
    let playerY = this.state.carMovement.y

    // if we're just using the test box
    let disWidth = this.state.playerWidth + 0.05

    // if we're using the big boi car
    // let disWidth = this.state.playerWidth + 0.2

    if (objX > playerX-disWidth && objX < playerX+disWidth && objY > playerY && objY < playerY+this.state.playerHeight) {
      let i = 0
        console.log("this is our counter", i)
        console.log("COLLISION HAPPENED, this is our state", this.state.collisionCount);
        console.log("----------");
      if (i < 1){
        ++i
      this.setState({collisionCount: this.state.collisionCount +1}, () => setTimeout(this.emptyFunction,500))
      }
    }
  }

  emptyFunction = () => {
    console.log('empty function ran')
  }

  _onAnimate = () => {
    this.detectCollision()
    this.setState({
      lineCounter: this.state.lineCounter + .1,
      obstructionCounter: this.state.obstructionCounter + .1,
      whiteLineMovement: new THREE.Vector3(
        this.state.whiteLineMovement.x = .13,
        this.state.whiteLineMovement.y - .1,
        this.state.whiteLineMovement.z + .1
      ),
      obstructionPosition1: new THREE.Vector3(
        this.state.obstructionPosition1.x + .01,
        this.state.obstructionPosition1.y - .1,
        this.state.obstructionPosition1.z + .1
      ),

      obstructionRotation: new THREE.Euler(
        this.state.obstructionRotation.x + 0,
        this.state.obstructionRotation.y + 0.2,
        0),

      obstructionPosition2: new THREE.Vector3(
        this.state.obstructionPosition2.x - .01,
        this.state.obstructionPosition2.y - .1,
        this.state.obstructionPosition2.z + .1
      ),
      // obstructionRotation: new THREE.Euler(
      //   this.state.obstructionRotation.x + .1
      // )
    }, () => this.resetter())
  }

  resetter = () =>{
     Math.floor(this.state.lineCounter) === 5.0 ? this.setState({lineCounter:0, whiteLineMovement: new THREE.Vector3(.13,3, 2)}) : null
     Math.floor(this.state.obstructionCounter) === 10.0 ? this.setState({obstructionCounter:0, obstructionPosition1: new THREE.Vector3(this.makeObstruction(), 3, 4)}) : null

     Math.floor(this.state.obstructionCounter) === 5.0 ? this.setState({obstructionPosition2: new THREE.Vector3(this.makeNegObstruction(), 3, 4)}) : null
   }
   // return num > 1.25 ? console.log('too big') :  console.log(num)


   // makeObstruction = () => {

   makeObstruction = () => {
     let num = Math.random() / 4
     return num
    }
    makeNegObstruction = () => {
      let num = Math.random() / (4 * -1)
      return num
     }

  moveCar = (e) => {
    // console.log('x:', this.state.carMovement.x, 'y:', this.state.carMovement.y)

    if (e.key === 'ArrowLeft') {
      this.setState({
        carMovement: new THREE.Vector3(
          this.state.carMovement.x - .05,
          this.state.carMovement.y = this.state.carMovement.y,
          this.state.carMovement.z = this.state.carMovement.z
          )
      })
    }else if (e.key === 'ArrowRight') {
      this.setState({
        carMovement: new THREE.Vector3(
          this.state.carMovement.x + .05,
          this.state.carMovement.y = this.state.carMovement.y,
          this.state.carMovement.z = this.state.carMovement.z
          )
      })
    }else if (e.key === 'ArrowUp') {
      this.setState({
        carMovement: new THREE.Vector3(
          this.state.carMovement.x = this.state.carMovement.x,
          this.state.carMovement.y + .05,
          this.state.carMovement.z - .05
          )
      })
    }else if (e.key === 'ArrowDown') {
      this.setState({
        carMovement: new THREE.Vector3(
          this.state.carMovement.x = this.state.carMovement.x,
          this.state.carMovement.y - .05,
          this.state.carMovement.z + .05
          )
      })
    }
  }

  canvasRef = (canvas) =>{
    canvas.addEventListener("keydown", e => this.moveCar(e));
      canvas.tabIndex = 1; // not sure what this means. Got it from ToxicFork, the dev for React-Three-Renderer
  }

  render() {

    let width = window.innerWidth;
    let height = window.innerHeight;

    return (
      <React3
        mainCamera="camera"
        antialias
        shadowMapEnabled
        width={width}
        height={height}
        alpha={true}
        onAnimate={this._onAnimate}
        canvasRef={this.canvasRef}
      >
        <scene ref="scene">
          <perspectiveCamera
            key={`perspectiveCamera`}
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.state.cameraPosition}
            lookAt={new THREE.Vector3(0, 0, 0)}
          />

          <mesh rotation={new THREE.Euler(2,3.135)} >
            <planeGeometry width={8} height={120} widthSegments={300} heightSegments={300}/>
            <meshBasicMaterial color={'grey'}/>
          </mesh>

          <mesh position={this.state.sky}>
            <planeGeometry width={50} height={4} widthSegments={200} heightSegments={200}/>
            <meshBasicMaterial color={'blue'}/>
          </mesh>

          <mesh rotation={new THREE.Euler(2,3.135)} position={this.state.whiteLineMovement} >
            <planeGeometry width={.2} height={3}/>
            <meshBasicMaterial color={'white'}/>
          </mesh>

          <mesh rotation={this.state.obstructionRotation} position={this.state.obstructionPosition1}>
            <boxGeometry width={this.state.playerWidth} height={this.state.playerHeight} depth={this.state.playerDepth}/>
            <meshBasicMaterial color={'red'}/>
          </mesh>

          <mesh rotation={new THREE.Euler(2,3.135)} position={this.state.obstructionPosition2}>
            <boxGeometry width={.2} height={.2} depth={.3}/>
            <meshBasicMaterial color={'orange'}/>
          </mesh>

          <group>
            <spotLight
              key={`Light 1`}
              color={0xffffff}
              position={new THREE.Vector3(0, 300, 0)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              castShadow
              penumbra={2}
              intensity={0.2}
              shadowMapWidth={10240}
              shadowMapHeight={10240}
            />

            <directionalLight
              key={`Light 2`}
              color={0xffffff}
              position={new THREE.Vector3(0, 500, 100)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.5}
            />

            <spotLight
              key={`Light 3`}
              color={0xffffff}
              position={new THREE.Vector3(0, 100, 2000)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.35}
            />

            <spotLight
              key={`Light 4`}
              color={0xffffff}
              position={new THREE.Vector3(-500, 0, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.1}
            />

            <spotLight
              key={`Light 5`}
              color={0xffffff}
              position={new THREE.Vector3(500, 0, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.1}
            />

            <spotLight
              key={`Light 6`}
              color={0xffd0b1}
              position={new THREE.Vector3(-500, 450, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.375}
            />

            <spotLight
              key={`Light 7`}
              color={0x80ecff}
              position={new THREE.Vector3(500, 450, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.375}
            />
          </group>

          <mesh rotation={new THREE.Euler(2,3.135)} position={this.state.carMovement}>
            <boxGeometry width={this.state.playerWidth} height={this.state.playerHeight} depth={this.state.playerDepth}/>
            <meshBasicMaterial />
          </mesh>

          {/* <group name="exampleGroup" rotation={new THREE.Euler(.5, 59.7, 0)} position={this.state.carMovement}>
            <ObjectModel
              name="exampleObject"
              model={truck}
              // material color={'black'}
              scene={this.state.scene}
              scale={new THREE.Vector3(.1, .1, .1)}
              group="exampleGroup"
            />
          </group> */}

          {/* <group name="sofa" rotation={new THREE.Euler(.5, 59.7, 0)} position={this.state.obstructionPosition1}>
            <ObjectModel
              name="exampleObject"
              model={sofa}
              material={sofaMaterial}
              scene={this.state.scene}
              scale={new THREE.Vector3(.1, .1, .1)}
              group="sofa"
            />
          </group> */}
        </scene>
      </React3>
    );
  }
}

export default DemoScene;
