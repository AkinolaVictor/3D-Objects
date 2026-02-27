import React, { useEffect, useRef, useState } from 'react'
import { initializer } from './init'
import { delayer } from '@/utils/exports'
import Overlay from './overlay'
import Head from 'next/head'
// import * as Three from "three";

interface Props {}

function MainComp(props: Props) {
    const {} = props
    const canvasElem = useRef(null)
    const working = useRef(null)
    const timeout = useRef(null)
    const [which, setWhich] = useState("Torus")
    const [intensity, setIntensity] = useState(0.1)
    const [pointLt, setPointLt] = useState(100)
    const [reload, setReload] = useState(1)
    const [wireframe, setWireframe] = useState(false)
    const [menu, setMenu] = useState(false)
    const [colorChanges, setColorChanges] = useState(true)
    const [zp, setZp] = useState(false)

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
    }, [intensity, pointLt, wireframe, intensity, which, colorChanges, zp])

    useEffect(()=>{
        return initializer({canvas: canvasElem.current, which, intensity, pointLt, wireframe, colorChanges, zp})
    }, [reload, intensity, pointLt, wireframe, intensity, which, colorChanges, zp])
    
    return (
        <div onClick={()=>{setMenu(false)}} className='w-screen h-screen text-white relative'>
            <Head>
                <title>3D Objects</title>
                <meta name="description" content="A basic preview of 3d objects with simple controls" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <canvas ref={canvasElem} className="webgl absolute top-0 left-0 z-1"></canvas>
            <nav className='text-white z-2 relative px-4 py-5 flex justify-between'>
                {/* <a onClick={increase_light} href="/" className='font-bold no-underline'>Spapes</a> */}
                <p onClick={increase_light} className='font-bold no-underline'>3D Objects</p>
                <div onClick={(e)=>{setMenu(true); e.stopPropagation()}} className='flex text-black cursor-pointer justify-center items-center bg-white rounded-[100px] w-10 h-10'>
                    {/* <li>Menu</li> */}
                    {/* <p>Cl</p> */}
                    <img src="menu.png" alt="" className='w-5.5 h-auto'/>
                </div>
            </nav>
            {/* <h1 className='absolute left-1/2 top-4/5 z-2 -translate-x-1/2 -translate-y-4/5 text-[20px]'>Give it a spin</h1> */}
            
            <Overlay 
                changer={switch_object} 
                setIntensity={setIntensity} 
                setPointLt={setPointLt}
                wireframe={wireframe}
                setWireframe={setWireframe}
                which={which}
                setMenu={setMenu}
                menu={menu}
                colorChanges={colorChanges}
                setColorChanges={setColorChanges}
                zp={zp}
                setZp={setZp}
            />
        </div>
    )
}

export default MainComp
