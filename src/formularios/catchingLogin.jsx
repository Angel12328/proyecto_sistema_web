export const EnviarLogin = (data) =>{ 
    
    //var dataJSON=JSON.parse(data)
    


    alert('Desea enviar esta informacion?');
    localStorage.setItem('login.json',JSON.stringify(data));


}