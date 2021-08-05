import React, { useEffect, useState } from 'react';

import employeeServices from '../Mainresources/services/Employee';

function Edit(props){

  const [ id, setId ] = useState(null);
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState(null);
  const [ city, setCity ] = useState(null);
  const [ address, setAddress ] = useState(null);
  const [ phone, setPhone ] = useState(null);
  const [ rol, setRol ] = useState(null);
  const [gender, setGender] = useState(null);
  const [image, setImagefile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [ selectedRol , setSelectRol ] = useState(null);
  const [ listRol, setListRol ] = useState([]);

  useEffect(()=>{

    async function fetchDataEmployee(){
      let id = props.match.params.id;
      const res = await employeeServices.get(id);

      if (res.success) {
        console.log(res);
        const data = res.data
        setId(data.id)
        setName(data.name_lastname)
        setEmail(data.email)
        setCity(data.city)
        setAddress(data.direction)
        setPhone(data.phone)
        setRol(data.rol)
        setGender(data.gender)
        setImageUrl(data.img_file)
        setSelectRol(data.role.rol_name)
      }
      else {
        alert(res.message)
      }
    }
    fetchDataEmployee();

    async function fetchDataRol(){
      const res = await employeeServices.list();
      setListRol(res.data)
    }
    fetchDataRol();

  },[]);

  const changeFile = (e) =>{
    const file = e.target.files[0];
    setImagefile(file);
    var reader = new FileReader();

        reader.onload = function (e) {
            setImageUrl( e.target.result);
        }

        reader.readAsDataURL(file);
    console.log(e.target.files[0]);
  }

  const updateEmployee = async () => {

    const data = {
      id, name, email, city, address, phone, rol , gender, image
    }
    let formData = new FormData();
    for (const key in data) {
     formData.append(key, data[key]);
    }
    const res = await employeeServices.update(formData);

    if (res.success) {
      alert(res.message)
    }
    else {
      alert(res.message)
    }

  }


  return (
    <div>
      <h4>Edit </h4>
      <hr/>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="firstName">Name</label>
          <input type="text" class="form-control" value={name}
          onChange={(event)=>setName(event.target.value)} />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="email">Email</label>
          <input type="email" class="form-control" placeholder="you@example.com"
          value={email} onChange={(event)=>setEmail(event.target.value)}/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="phone">City {city}</label>
          <select id="inputState" class="form-control" value={city}
          onChange={(event)=>setCity(event.target.value)} >
             <option selected>Choose...</option>
             <option value="New York">New York</option>
             <option value="London">London</option>
             <option value="Madrid">Madrid</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="address">Address</label>
          <input type="text" class="form-control" placeholder="1234 Main St"
          value={address} onChange={(event)=>setAddress(event.target.value)}/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="address">Phone </label>
          <input type="text" class="form-control" placeholder="123467890"  value={phone}
          onChange={(event)=>setPhone(event.target.value)}/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="phone">Rol</label>
          <select id="inputState" class="form-control" value={rol}
          onChange={(event)=>setRol(event.target.value)}>
             {
               listRol.map((itemselect)=>{
                 return(
                   <option value={itemselect.rol_id}>{itemselect.rol_name}</option>
                 )
               })
             }
          </select>
        </div>
      </div>

      {gender ? <><label for="phone">Gender</label>
      <div class="form-check">
  <input class="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="male"
  onChange={(event)=>setGender(event.target.value)} defaultChecked={gender == 'male'? true : false} />Male
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="gender" id="flexRadioDefault2" value="female"
  onChange={(event)=>setGender(event.target.value)} defaultChecked={gender == 'female'? true: false}/>
  <label class="form-check-label" for="flexRadioDefault2">
  Female
  </label>
</div></> : ''}

<label class="form-label mt-2" for="customFile">Upload file</label>

<input type="file"  class="form-control" id="customFile" 
onChange={changeFile}/>

              <div>
                  <img src={imageUrl}/>
               </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <button onClick={()=>updateEmployee()}
          class="btn btn-primary btn-block" type="submit">Save</button>
        </div>
      </div>
    </div>
  )

}

export default Edit;
