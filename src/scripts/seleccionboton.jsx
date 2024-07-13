import React, { useState } from 'react';
const MostrarForm=()=>{
    const [verform,setverfom]=useState(false);
    const handleClick =()=>{
        setverfom(!verform);
    }
}
export default MostrarForm;

