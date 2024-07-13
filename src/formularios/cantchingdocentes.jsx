import { db } from "../firebase/config";
import { collection,addDoc } from "firebase/firestore";

export const enviarDatosDocentes = (data) =>{ 
    localStorage.removeItem('cachedData');
    const IDLOGIN=11; // IDLOGIN ES EL ID QUE CAPTURA EL LOGIN QUE ES LA POSICION EN EL ARREGLO DE DATOS GENERALES
    const ids=[String(IDLOGIN),'infAdd'];
    const usersDocentesref= collection(db,"dataDocentes",...ids);
    addDoc(usersDocentesref,data);
    //onsole.log(registrosExistente);
/*

    for (let index = 0; index < registrosExistente.length; index++) {
         registrosExistente[index].investigacion=[];
        
    }

*/

    alert('Informacion enviada');


}