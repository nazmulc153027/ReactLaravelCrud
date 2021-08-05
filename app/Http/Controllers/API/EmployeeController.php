<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Employee; 

class EmployeeController extends Controller
{
  public function list_role(){ 
    $data = Role::get();

    $response['data'] = $data;
    $response['succes'] = true;
    return $response;
  }


    public function create(Request $request){
      try {
        
        $imageName = $request->file('image')->store('public/UserImages');
        $imageName = str_replace('public', '/storage', $imageName);
        //$imageName = (explode('/', $imageName ))[2] ; 
        $insert['name_lastname'] = $request['name'];
        $insert['email'] = $request['email'];
        $insert['city'] = $request['city'];
        $insert['direction'] = $request['address'];
        $insert['phone'] = $request['phone'];
        $insert['rol'] = $request['rol'];
        $insert['gender'] = $request['gender'];
        $insert['img_file'] = $imageName;


        Employee::insert($insert);

        $response['message'] = "Save succesful";
        $response['succes'] = true;

      } catch (\Exception $e) {
        $response['message'] = $e->getMessage();
        $response['succes'] = true;
      }
       
      return $response;
    }
  //Read data from database
    public function list(){

      try {

        $data = Employee::with("role")->get();
        $response['data'] = $data;
        $response['success'] = true;

      } catch (\Exception $e) {
        $response['message'] = $e->getMessage();
        $response['success'] = false;
      }
      return $response;

    }

//Edit data
public function get($id){

  try {

    $data = Employee::with("role")->find($id);

    if ($data) {
      $response['data'] = $data;
      $response['message'] = "Load successful";
      $response['success'] = true;
    }
    else {
      $response['message'] = "Not found data id => $id";
      $response['success'] = false;
    }

  } catch (\Exception $e) {
    $response['message'] = $e->getMessage();
    $response['success'] = false;
  }
  return $response;
}

//Update data
public function update(Request $request,$id){
  try {
    //--to upload image in database--//
    if ($request->hasFile('image')) {
      $imageName = $request->file('image')->store('public/UserImages');
      //dd($imageName);
      $imageName = str_replace('public', '/storage', $imageName);

    } 
   
    
    $data['name_lastname'] = $request['name'];
    $data['email'] = $request['email'];
    $data['city'] = $request['city'];
    $data['direction'] = $request['address'];
    $data['phone'] = $request['phone'];
    $data['rol'] = $request['rol'];
    $data['gender'] = $request['gender'];
    $data['img_file'] = $imageName;

    Employee::where("id",$id)->update($data);

    $response['message'] = "Updated successful";
    $response['success'] = true;

  } 
  catch (\Exception $e) {
    $response['message'] = $e->getMessage();
    $response['success'] = false;
  }

  // $response = $imageName;
  return $response;

}

//Delete Data
public function delete($id){
  // dd($id);
  try {
    $res = Employee::where("id",$id)->delete();
    $response['res'] = $res;
    $response['message'] = "Deleted successful";
    $response['success'] = true; 
  } catch (\Exception $e) {
    $response['message'] = $e->getMessage();
    $response['success'] = false;
  }

  return $response;
}


}

