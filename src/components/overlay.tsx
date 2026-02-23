import { delayer, meshes } from '@/utils/exports'
import React, { useEffect, useRef, useState } from 'react'
import SelectRange from './selectRange'

interface Props {
    changer: any,
    setIntensity?: any,
    setPointLt?: any,
    setWireframe?:any,
    wireframe?:any,
    which:string,
}

function Overlay(props: Props) {
    const {changer, setIntensity, setPointLt, which, setWireframe, wireframe} = props
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

    return (
        // <div className='absolute z-10 top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 w-auto h-auto'>
        <div className='absolute z-10 top-12.5 left-12.5 w-auto h-auto'>
            <div className='bg-[#2f3e46] text-white w-full max-w-70 h-auto min-h-40 rounded-2xl p-3 text-[13px]'>
                <div className='w-full flex justify-between items-center py-3  '>
                    <p className='mx-au font-bold'>Control Panel</p>
                    <div className='ml-auto'>
                        <p>X</p>
                    </div>
                </div>

                <p className='mb-2'>3D Objects</p>
                
                <div className='bg-[#354f52] text-white rounded-xl py-4 px-1 flex flex-wrap justify-around items-start'>
                    {
                        meshes.map((item, index)=>{
                            return (
                                <div key={index} onClick={()=>{changer(item.name)}} className={`p-1.5 ${which===item.name?"bg-[#343a40]":""} rounded-[5px] flex flex-col justify-center items-center`}>
                                    <img src="/brown.png" alt="" className='rounded-xl w-13 h-13 mb-3'/>
                                    <p>{item.name}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <p className='mt-5 mb-2 '>Ambient Light Intensity ({values_1}%)</p>
                <div className='bg-[#354f52] rounded-xl py-5 px-3 mb-5'>
                    <SelectRange 
                        values={values_1}
                        setValues={setValues_1}
                    />
                </div>

                <p className='mt-5 mb-2 '>Pointed Light Intensity ({values_2})</p>
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
                    <div className='w-6 h-6 rounded-2 bg-[#84a98c] rounded-xl flex justify-center items-center'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overlay
