
import './App.css';
import { useState ,useEffect} from 'react'
import axios from 'axios'
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useNavigate} from 'react-router-dom';



function App() {
  const [name, setname] =useState('')
  const [email, setemail] =useState('')
  const [password, setpassword] =useState('')

  const [post, setpost] = useState('')
  const [getdata, setGetdata] = useState([])
 
  const navi=useNavigate()

    const changename=(e)=>{
      setname(e.target.value)
    }
    const changeemail=(e)=>{
      setemail(e.target.value)
    }
    const changepassword=(e)=>{
      setpassword(e.target.value)
    }
    const target=(e)=>{
    setpost(e.target.files[0])
     }
  const del=(id)=>{
    axios.delete(`http://localhost:3001/${id}`).then(()=>chavalue())
    alert('Deleted')
       }
  
  
    const send=(e)=>{
      e.preventDefault();

    const file= new FormData()
    file.append('file',post)
    file.append('name',name)
    file.append('email',email)
    file.append('password',password)

    axios.post('http://localhost:3001',file)
  }

   
    useEffect(()=>{
      axios.get('http://localhost:3001').then((res)=>{
        console.log(res.data);
        setGetdata(res.data)
    })
    },[])
    
    const chavalue=()=>{
   axios.get('http://localhost:3001').then((res)=>{
    // console.log(res.data);
     })
     }

    

      
      const editdata=(id)=>{
        
       navi(`/edit/${id}`)
      }
 

  const serverhost= 'http://localhost:3001'
  return (
    <div >
      <div id='forminput'>
      <h1>login Form</h1>
      <form onSubmit={send}>
        
        <TextField id="outlined-basic"type='text' label="Name" variant="outlined"onChange={changename} /><br></br>
        <TextField sx={{marginTop:2}}id="outlined-basic"type='text' label="Email" variant="outlined"onChange={changeemail} /><br></br>
        <TextField sx={{marginTop:2}}id="outlined-basic"type='text' label="Password" variant="outlined"onChange={changepassword} /><br></br>
        <input type='file' placeholder='choose file' onChange={target}></input><br></br>
        <Button sx={{marginTop:3,marginLeft:8}}type='submit'variant="contained" color="success">submit</Button>

        </form>
        </div>


      {/* <input type='text' placeholder='name' onChange={changename}></input><br></br>
      <input type='email' placeholder='Email'onChange={changeemail}></input><br></br>
      <input type='password' placeholder='password'onChange={changepassword}></input><br></br>
      <input type='file' placeholder='choose file' onChange={target}></input><br></br>
      <button type='submit'>post</button>
      </form> */}

      {/* {
      getdata.map((data,index)=>(
      <figure key={index}>
        <img src={serverhost+data.path} alt='.....'></img>
        <button onClick={()=>del(data._id) }>Delete</button><br></br>
        <button >Edit<input type='file' onChange={(e)=>setupdate(e.target.files[0])}></input></button>
        <button  onClick={()=>edit(data._id) }>submit</button><br></br>

        </figure>)
      )
      } */}
      <div id ='table'>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>password</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
          {getdata.map((data)=>
        <TableBody>

            <TableCell>{data.name}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.password}</TableCell>
            <TableCell><img src={serverhost+ '/' +data.path} alt='.....' style={{width:"50px",height:"50px"}}></img></TableCell>
            <TableCell><button onClick={()=>editdata(data._id)}>Edit</button></TableCell>
            <TableCell><button onClick={()=>del(data._id)}>Delete</button></TableCell>
        </TableBody>
        
        )}
        </Table>
        </div>
    </div>
  );
      
      
      
}

export default App;
