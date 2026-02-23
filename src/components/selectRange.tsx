import React, { useState } from 'react'
import { Range } from "react-range";

interface Props {
    values:any, 
    setValues: any,
    min?: number,
    max?: number
}

function SelectRange(props: Props) {
    const {values, setValues, min, max} = props
    // console.log(values)
    return (
        <Range
            label="Select your value"
            step={0.1}
            min={min || 1}
            max={max || 100}
            values={values}
            onChange={(values) => setValues(values)}        
            renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#00b4d8",
                        borderRadius: "100px"
                    }}
                >
                    {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    key={props.key}
                    style={{
                        ...props.style,
                        height: "17px",
                        width: "17px",
                        borderRadius: "20px",
                        backgroundColor: "white",
                    }}
                />
            )}
    />
    )
}

export default SelectRange
