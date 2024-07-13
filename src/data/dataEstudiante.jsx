import dataEstudiantes from './dataestudiantesP.json';
import App from '../App';
import { useState ,useEffect} from 'react';
import React from 'react';
function DataEstud() {
    const [ arregloDatos , setArregloDatos ] = useState( [] );
    const getDatos=()=>{
        return new Promise(
            (resolve,reject)=>{
                resolve(dataEstudiantes);
            }
        )
    }

    useEffect(
        ()=>{
            getDatos().then(
                (respuesta)=>{
                    setArregloDatos(respuesta);
                }

            )
        }
    )

    return(
        
    
        <App nombre={'Hola'}/>
       
        
    );
    
    
}

export default DataEstud;

/*

            <App nombre={
                arregloDatos.filter(registro=>
                    registro.id===1
                ).map(registro=>
                    `${registro.nombre} ${registro.apellido}`
                )
            }/>
*/