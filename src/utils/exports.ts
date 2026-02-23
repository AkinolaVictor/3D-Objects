import * as THREE from "three";
const color = "#00ff83"
const roughness = 0
const wireframe = !true
// const emissive = 0x00ff00
const emissive = color
const emissiveIntensity = 1.5
export const meshes = [
    {
        name: "Sphere",
        mesh: ({wireframe}: {wireframe?:boolean})=>{
            const geometry = new THREE.SphereGeometry(3, 64, 64)
            const material = new THREE.MeshStandardMaterial({color,roughness, wireframe, 
                // emissive, emissiveIntensity
            })
            return new THREE.Mesh(geometry, material)
        }
    },
    {
        name: "TorusKnot",
        mesh: ({wireframe}: {wireframe?:boolean})=>{
            const geometry = new THREE.TorusKnotGeometry( 2, 0.8, 104, 12 );
            const material = new THREE.MeshStandardMaterial( { color, roughness, wireframe} );
            return new THREE.Mesh(geometry, material)
        }
    },
    {
        name: "Torus",
        mesh: ({wireframe}: {wireframe?:boolean})=>{
            const geometry = new THREE.TorusGeometry( 3, 1.2, 16, 100 );
            const material = new THREE.MeshStandardMaterial( { color, roughness, wireframe } );
            return new THREE.Mesh(geometry, material)
        }
    },
    {
        name: "Capsule",
        mesh: ({wireframe}: {wireframe?:boolean})=>{
            const geometry = new THREE.CapsuleGeometry( 3, 3, 40, 40, 20 );
            const material = new THREE.MeshStandardMaterial( { color, roughness, wireframe } );
            return new THREE.Mesh(geometry, material)
        }
    },


    {
        name: "Octahedron",
        mesh: ({wireframe}: {wireframe?:boolean})=>{
            const geometry = new THREE.OctahedronGeometry(4);
            const material = new THREE.MeshStandardMaterial( { color, roughness, wireframe } );
            return new THREE.Mesh(geometry, material)
        }
    },
    {
        name: "Cone",
        mesh: ({wireframe}: {wireframe?:boolean})=>{
            const geometry = new THREE.ConeGeometry( 4, 7, 32 );
            const material = new THREE.MeshStandardMaterial( { color, roughness, wireframe } );
            return new THREE.Mesh(geometry, material)
        }
    },
]

export function getMesh({which, wireframe}: {which?:string, wireframe?: boolean}) {
    for(let i=0; i<meshes.length; i++){
        if(meshes[i].name === which){
            return meshes[i].mesh({wireframe})
        }
    }
    return meshes[0].mesh()
}

export function delayer(props: {working:any, timeout:any, time:number, func:any}){
    const {working, timeout, time, func} = props

    if(working.current){
        clearTimeout(timeout.current)
        working.current = false
    }
    
    working.current = true
    
    timeout.current = setTimeout(() => {
        if(func) func()
        working.current = false
    }, time||500);
}


// https://threejs-journey.com/lessons/geometries#the-different-built-in-geometries