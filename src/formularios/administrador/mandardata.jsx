import datosEstudiantes from '../../data/dataestudiantes.json';
//import Form from 'react-bootstrap/Form';
import { useState ,useEffect} from 'react';
const [ arregloDatos , setArregloDatos ] = useState( [] );

//let stop=false;

const getDatos=()=>{
    return new Promise(
        (resolve,reject)=>{
            resolve(datosEstudiantes);
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



    let accionEjecutada = false;

    // Verificar si la acción aún no se ha ejecutado y si el arreglo de datos tiene elementos
    if (!accionEjecutada && arregloDatos.length > 0) {
        // Mapear sobre el arreglo de datos
        arregloDatos.map((registro) => {
            // Crear el nuevo registro
            var registro_ = {
                id: registro.id
            };

            // Obtener los registros existentes del localStorage
            var registrosExistente = JSON.parse(localStorage.getItem('infoEstudiante.json')) || [];

            // Agregar el nuevo registro al arreglo existente
            registrosExistente.push(registro_);

            // Actualizar los registros en el localStorage
            localStorage.setItem('infoEstudiante.json', JSON.stringify(registrosExistente));
        });

        // Establecer la variable de control en true para indicar que la acción se ha ejecutado
        accionEjecutada = true;
    }

