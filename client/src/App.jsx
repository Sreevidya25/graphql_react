/* eslint-disable no-unused-vars */

import { useState } from 'react';
import './App.css'
import  { useQuery, useMutation, gql } from '@apollo/client';

const GET_USERS = gql`
query GetUsers {
getUsers{
id
name
age
isMarried
}
}`;

const GET_USER_BY_ID = gql`
query GetUserById($id: ID!) {
getUserById(id: $id){
id
name
age
isMarried
}
}`;

const CREATE_USER = gql`
mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
createUser(name: $name, age: $age, isMarried: $isMarried){
name
}
}`;

function App() {

  const [newUser, setNewUser] = useState({});

  const {data: getUsersData, error: getUsersError, loading: getUsersLoading} = useQuery(GET_USERS);
  const {data: getUserByIdData, error: getUserByIdError, loading: getUserByIdLoading} = useQuery(GET_USER_BY_ID,{
    variables: {id: "2"}
  });

  const {createUser} = useMutation(CREATE_USER);
  
  if(getUsersLoading) return <p>Data loading....</p>

  if(getUsersError) return <p>Error: {getUsersError.message}</p>

  const handleCreateUser = async () => {
    createUser({variables: {name: newUser.name, age: Number(newUser.age), isMarried: false}})
    console.log(newUser)
  }
  
  return (
    <>

    <div>
      <input placeholder='Name...' onChange={(e) => setNewUser((prev) => ({...prev, name: e.target.value}))}/>
      <input placeholder='Age...' type="Number" onChange={(e) => setNewUser((prev) => ({...prev, age: e.target.value}))}/>
      <button onClick={handleCreateUser}>Create User</button>
    </div>

      <div>
        {
          getUserByIdLoading ? <p>Loading User...</p>
          :
          <>
          <h1>Choosen User: </h1>
        <p>{getUserByIdData.getUserById.name}</p>
        <p>{getUserByIdData.getUserById.age}</p>
          </>
          
        }
        
      </div>
      
      <h1>Users</h1>
      <div>
        {""}
        {getUsersData.getUsers.map((user) => (
          <div>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is this user married: {user.isMarried ? "Yes" : "No"}</p>
          </div>
    ))}
    {""}
    </div>
    </>
  )
}

export default App
