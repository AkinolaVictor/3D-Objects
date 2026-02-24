import { delayer, meshes } from '@/utils/exports'
import React, { useEffect, useRef, useState } from 'react'
import SelectRange from './selectRange'

interface Props {
    changer: any,
    setIntensity?: any,
    setPointLt?: any,
    setWireframe?:any,
    wireframe?:any,
    setMenu?:any,
    which:string,
    menu?: boolean
}

function Overlay(props: Props) {
    const {changer, setIntensity, setPointLt, which, setWireframe, wireframe, setMenu, menu} = props
    const [values_1, setValues_1] = useState([10])
    const [values_2, setValues_2] = useState([100])
    const working = useRef(null)
    const timeout = useRef(null)

    useEffect(()=>{
        delayer({
            working, 
            timeout,
            time: 60,
            func: ()=>{
                setIntensity(()=>{
                    return values_1[0]/100
                })

                setPointLt(()=>{
                    return values_2[0]
                })
            }
        })
    }, [values_1, values_2])

    function control_overlay(){
        const over = document.querySelector(".overlay_container")
        if(menu){
            over?.classList.remove("hidden")
        } else {
            over?.classList.add("hidden")
        }
    }

    useEffect(()=>{
        control_overlay()
    }, [menu])

    return (
        // <div className='absolute z-10 top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 w-auto h-auto overlay_container'>
        // <div className={`absolute z-10 top-5 right-5 w-auto h-auto ${!menu?"block":"hidden"} overlay_container`}>
        <div onClick={(e)=>{e.stopPropagation();}} className={`absolute z-10 top-5 right-5 w-auto h-auto overlay_container hidden`}>
            <div className='bg-[#2f3e46] text-white w-full max-w-70 h-auto min-h-40 rounded-2xl p-3 text-[13px]'>
                <div className='w-full flex justify-between items-center py-3  '>
                    <p className='mx-au font-bold'>Control Panel</p>
                    <div onClick={()=>setMenu(false)} className='ml-auto w-7 h-7 cursor-pointer bg-white rounded-full flex justify-center items-center'>
                        <img src="close.png" alt="" className='w-2.5 h-auto'/>
                    </div>
                </div>

                <p className='mb-2'>3D Objects</p>

                <div className='bg-[#354f52] text-white rounded-xl py-4 px-1 flex flex-wrap justify-around items-start cursor-pointer'>
                    {
                        meshes.map((item, index)=>{
                            return (
                                <div key={index} onClick={()=>{changer(item.name)}} className={`p-1.5 ${which===item.name?"bg-[#343a40]":""} rounded-[5px] flex flex-col justify-center items-center`}>
                                    <img src={item.image} alt="" className='rounded-xl w-13 h-13 mb-3'/>
                                    <p>{item.name}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <p className='mt-5 mb-2 '>Environment Light ({values_1}%)</p>
                <div className='bg-[#354f52] rounded-xl py-5 px-3 mb-5'>
                    <SelectRange 
                        values={values_1}
                        setValues={setValues_1}
                    />
                </div>

                <p className='mt-5 mb-2 '>Pointed Light ({values_2})</p>
                <div className='bg-[#354f52] rounded-xl py-5 px-3 mb-2'>
                    <SelectRange 
                        values={values_2}
                        setValues={setValues_2}
                        min={1}
                        max={1000}
                    />
                </div>


                <div onClick={()=>{setWireframe(!wireframe)}} className='flex justify-between items-center py-2'>
                    <p>Enable Wireframe</p>
                    <div className='w-6 h-6 bg-white rounded-md flex justify-center items-center'>
                        <img src={"check.png"} alt="" className={`w-4 h-auto ${wireframe?"opacity-100":"opacity-0"}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overlay
