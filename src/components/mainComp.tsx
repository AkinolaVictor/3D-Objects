import React, { useEffect, useRef, useState } from 'react'
import { initializer } from './init'
import { delayer } from '@/utils/exports'
import Overlay from './overlay'
// import * as Three from "three";

interface Props {}

function MainComp(props: Props) {
    const {} = props
    const canvasElem = useRef(null)
    const working = useRef(null)
    const timeout = useRef(null)
    // const [which, setWhich] = useState("Sphere")
    // const [which, setWhich] = useState("Torus")
    const [which, setWhich] = useState("Torus")
    const [intensity, setIntensity] = useState(0.1)
    const [pointLt, setPointLt] = useState(100)
    const [reload, setReload] = useState(1)
    const [wireframe, setWireframe] = useState(false)
    const [menu, setMenu] = useState(false)

    function increase_light(){
        setIntensity((prev)=>{
            if(prev>0.9) return 0.1
            return prev + 0.1
        })

        delayer({
            working, 
            timeout,
            time: 100,
            func: ()=>{
                setReload(prev=>prev+1)
            }
        })
    }

    function quick_reminder(){
        delayer({
            working, 
            timeout,
            time: 60,
            func: ()=>{
                setReload(prev=>prev+1)
            }
        })
    }

    function switch_object(which:string){
        setWhich(which)
        quick_reminder()
    }

    useEffect(()=>{
        quick_reminder()
        console.log({wireframe})
    }, [intensity, pointLt, wireframe, intensity, which])

    useEffect(()=>{
        return initializer({canvas: canvasElem.current, which, intensity, pointLt, wireframe})
    }, [reload, intensity, pointLt, wireframe, intensity, which])
    
    return (
        <div className='w-screen h-screen text-white relative'>
            <canvas ref={canvasElem} className="webgl absolute top-0 left-0 z-1"></canvas>
            <nav className='text-white z-2 relative px-4 py-5 flex justify-between'>
                {/* <a onClick={increase_light} href="/" className='font-bold no-underline'>Spapes</a> */}
                <p onClick={increase_light} className='font-bold no-underline'>Objects</p>
                <ul className='flex gap-3 list-none'>
                    {/* <li onClick={()=>{switch_object("Sphere")}}>Sphere</li> */}
                    {/* <li onClick={()=>{switch_object("TorusKnot")}}>T_K</li> */}
                    <li onClick={()=>{setMenu(!menu)}}>Menu</li>
                </ul>
            </nav>
            <h1 className='absolute left-1/2 top-4/5 z-2 -translate-x-1/2 -translate-y-4/5 text-[20px]'>Give it a spin</h1>
            {
                menu?
                <Overlay 
                    changer={switch_object} 
                    setIntensity={setIntensity} 
                    setPointLt={setPointLt}
                    wireframe={wireframe}
                    setWireframe={setWireframe}
                    which={which}
                />:
                null
            }
        </div>
    )
}

export default MainComp
