import { getMesh } from "@/utils/exports";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initializer({canvas, which, intensity, pointLt, wireframe}){
    const {innerWidth, innerHeight, requestAnimationFrame, addEventListener, devicePixelRatio} = window
    const aspectRatio = innerWidth/innerHeight
    const scene = new THREE.Scene()
    const mesh = getMesh({which, wireframe})
    scene.add(mesh)
    // const light = new THREE.PointLight(0xffffff, 1, 100)
    // const light = new THREE.PointLight("white", 100)
    // const light = new THREE.PointLight("0xffffff", pointLt)
    const light = new THREE.PointLight("0xffffff", pointLt)
    light.position.set(0, 10, 10)
    // light.intensity = 1.15

    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, intensity));

    const camera = new THREE.PerspectiveCamera(
        60,
        innerWidth/innerHeight,
        0.1,
        50
    )

    camera.position.z = 20 // sphere

    // const canvas = document.querySelector(".webgl")
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
    renderer.setSize(innerWidth, innerHeight)
    renderer.render(scene, camera)
    const max_pixel_ratio = Math.min(devicePixelRatio, 2)
    renderer.setPixelRatio(max_pixel_ratio)

    const controls = new OrbitControls(camera, canvas)
    controls.autoRotate = true
    controls.autoRotateSpeed = 3
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableZoom = false
    // controls.maxZoom = 2  // for orthographic camera
    // controls.minZoom = 0.5  // for orthographic camera
    // controls.minDistance = 5
    // controls.maxDistance = 10


    addEventListener("resize", ()=>{
        camera.aspect = aspectRatio
        camera.updateProjectionMatrix()
        renderer.setSize(innerWidth, innerHeight)
    })

    function animate(){
        controls.update()
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }

    animate()

    // const tl = gsap.timeline({defaults: {duration: 2}})
    // tl.fromTo(mesh.scale, {z:0, y:0, x:0}, {z:1, y:1, x:1})
    // tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
    // tl.fromTo(".title", {opacity: 0}, {opacity: 1})

    let mousedown = false
    let rgb = []
    
    addEventListener("pointerdown", ()=> mousedown=true)
    addEventListener("pointerup", ()=> mousedown=false)
    addEventListener("pointermove", (e)=>{
        const moderator = ()=>{ 
            const halfway = 100*Math.random() + e.clientX*Math.random() + 100*Math.random()
            return halfway>255?255:halfway
        }

        if(mousedown){
            rgb = [
                Math.round((e.clientX/innerWidth)*255),
                Math.round((e.clientY/innerHeight)*255),
                150,
            ]

            const newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
            gsap.to(mesh.material.color, {
                r: newColor.r,
                g: newColor.g,
                b: newColor.b
            })
        }
    })

    return ()=>{
        controls.dispose()
        renderer.dispose()
    }
}

// what is the equivalent of the three mouse events below for touch devices
// "mousedown", "mouseup", "mousemove"