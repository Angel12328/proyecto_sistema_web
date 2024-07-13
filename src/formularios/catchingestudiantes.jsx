// la variable enviarDatos recibe una función anonima
import { db } from "../firebase/config";
import { collection,addDoc } from "firebase/firestore";
export const enviarDatos = async (data) =>{ 
    localStorage.removeItem('cachedData');
    //console.log(data.depatamentoResidencia)
    //var dataJSON_=JSON.stringify(data);
    //var dataJSON=JSON.parse(dataJSON_);
    //console.log(dataJSON.depatamentoResidencia);
    alert('Informacion Enviada');


    const IDLOGIN=11; // IDLOGIN ES EL ID QUE CAPTURA EL LOGIN QUE ES LA POSICION EN EL ARREGLO DE DATOS GENERALES
    const ids=[String(IDLOGIN),'infAdd'];
    const usersEstudiantesref= collection(db,"dataEstudiantes",...ids);
    addDoc(usersEstudiantesref,data);
    //usersEstudiantesref.set(data);
    //const db = firebase.firestore();
    //const collectionRef = db.collection("dataEstudiantes");

    //await collectionRef.collection("dataEstudiantes").doc("4").set(data);

    //var dataJSON_=JSON.stringify(data);
    //var dataJSON=JSON.parse(dataJSON_);
/*

    var registro_={
        depatamentoResidencia: data.depatamentoResidencia,
        telefono: data.telefono,
        orientacion: data.orientacion
    }
*/

/*

    var registrosExistente = JSON.parse(localStorage.getItem('pruebaestudiantes.json'));
    //console.log(registrosExistente);
    registrosExistente[1].depatamentoResidencia=data.depatamentoResidencia;
    registrosExistente[1].telefono= data.telefono;
    registrosExistente[1].orientacion= data.orientacion;
    //onsole.log(registrosExistente);
    alert('Desea enviar esta informacion?');
    localStorage.setItem('pruebaestudiantes.json',JSON.stringify(registrosExistente));


*/





        
    //const dataJSON=JSON.stringify(data);
    //localStorage.setItem('infoEstudiante.json',dataJSON);// pasa la busqueda a un archivo local de navegador tipo JSON
    //console.log('Datos enviados correctamente y guardados en el almacenamiento local con el nombre:', 'infoEstudiante.json' );


}
/* 
                            arregloDatos.length>0 && (stop===true)&&
                            arregloDatos.map((registro)=>{
                                var registro_={
                                    id: registro.id,
                                    experiencia: []
                                }
                                var registrosExistente = JSON.parse(localStorage.getItem('infoEstudiante.json')) || [];
                                registrosExistente.push(registro_);
                                localStorage.setItem('infoEstudiante.json',JSON.stringify(registrosExistente));
                                stop=false;
                            })

*/
/* 

    var dato=localStorage.getItem('numerocuenta.json');
    var datoJSON=JSON.parse(dato);
    var numCuenta=datoJSON.numeroCuenta;
    var intnumCuenta = parseInt(numCuenta)
    console.log(intnumCuenta);

*/

/*


function  catchear(){
    var capt= document.getElementById("buscarestud").value;
    console.log(capt);
}

export default catchear;

*/