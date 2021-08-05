//import React, { Component } from 'react';
//import { event } from 'jquery';
import React, {useEffect,useState} from 'react';
import employeeServices from '../Mainresources/services/Employee';

function Form(){
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [rol, setRol] = useState(null);
  const [gender, setGender] = useState(null);
  const [image, setImagefile] = useState(null);
  const [listRol, setListRol] = useState([]);

  useEffect(() => { 
    async function fetchDataRol() {
      // load data from API
      const res = await employeeServices.list();
      console.log(res.data)
      setListRol(res.data)
    }
    fetchDataRol();

  },[]);
  const saveEmployee = async () => {

    const data = {
      name, email, city, address, phone, rol, gender, image
    }
   console.log(data);
   let formData = new FormData();
   for (const key in data) {
    formData.append(key, data[key]);
   }
    // data.map((value, key)=>{
     
    // })
    const res = await employeeServices.save(formData);

    if (res.success) {
      alert(res.message)
    }
    else {
      alert(res.message)
    }
  }
  
  return(
    <div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="firstName">Name employee</label>
          <input type="text" class="form-control" placeholder="Name" 
          onChange={(event)=>setName(event.target.value)}/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="email">Email</label>
          <input type="email" class="form-control" placeholder="you@example.com" 
          onChange={(event)=>setEmail(event.target.value)}/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="phone">City </label>
          <select id="inputState" class="form-control" onChange={(event)=> setCity(event.target.value)}>
             <option selected>Choose...</option>
             <option value="London">London</option>
             <option value="Madrid">Madrid</option>
             <option value="New York">New York</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="address">Address</label>
          <input type="text" class="form-control" placeholder="1234 Main St"
          onChange={(event)=>setAddress(event.target.value)} />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="phone">Phone </label>
          <input type="text" class="form-control" placeholder="123467890"
          onChange={(event)=>setPhone(event.target.value)} />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
					<label for="phone">Rol </label>
					<select id="inputState" class="form-control" onChange={(event)=> setRol(event.target.value)}>
             <option selected>Choose...</option>
             {
               listRol.map((item)=>{
                 return(
                   <option value={item.rol_id}>{item.rol_name}</option>
                 )
               })
             }
          </select>
        </div>
      </div>
      
      <label for="phone">Gender</label>
      <div class="form-check">
  <input class="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="male"
  onChange={(event)=>setGender(event.target.value)} />
  
 
    Male
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="gender" id="flexRadioDefault2" value="female"
  onChange={(event)=>setGender(event.target.value)}/>
  <label class="form-check-label" for="flexRadioDefault2">
  Female
  </label>
</div>

<label class="form-label mt-2" for="customFile">Upload file</label>
<input type="file" class="form-control" id="customFile" 
onChange={(event)=>setImagefile(event.target.files[0])}/>

      <div class="row mt-3">
        <div class="col-md-6 mb-3">
          <button class="btn btn-primary btn-block" type="submit"
          onClick={()=>saveEmployee()}>Save 2</button>
        </div>
      </div>
    </div>
  )
}

export default Form;
