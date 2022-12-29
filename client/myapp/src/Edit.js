import { useEffect } from 'react'
import {useState}  from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Edit.css'




function Edit() {
  // const[id,setId]=useState(0)
  const navi=useNavigate()
  const {id} = useParams()
  const [name,setname] =useState('')
  const [email,setemail] =useState('')
  const [password,setpassword] =useState('')
  const [post,setpost]=useState('')

  // const [getdata,setgetdata]=useState('')


  // useEffect(()=>{
//     setId(localStorage.getItem('id'))
//     setId(localStorage.getItem('name'))
//     setId(localStorage.getItem('edit'))
//     setId(localStorage.getItem('password'))
//     setId(localStorage.getItem('post'))
// },[])

    useEffect(()=>{
        axios.get(`http://localhost:3001/${id}`).then((res)=>{
            // setgetdata(res.data)
            setname(res.data.name)
            setemail(res.data.email)
            setpassword(res.data.password)
            setpost(res.data.path)
            
        })
    },[id])

    // console.log(name)
    // console.log(email)
    // console.log(password)
    // console.log(post)
    
  const changename=(e)=>{
    setname(e.target.value)
  }
  const changeemail=(e)=>{
    setemail(e.target.value)
  }
  const changepassword=(e)=>{
    setpassword(e.target.value)
  }
  const changepost=(e)=>{
    setpost(e.target.files[0])
  }
 
    const change=(e)=>{
      e.preventDefault();
    const formData=new FormData()
    formData.append('name',name) 
    formData.append('email',email) 
    formData.append('password',password) 
    formData.append('file',post)


    axios.put(`http://localhost:3001/${id}`,formData).then(()=>{
      navi('/')
    })
    

   }

  return (
    <div id='edit'>
         <form onSubmit={change}>
        
        <TextField value={name} id="outlined-basic"type='text' label="Name" variant="outlined"onChange={changename}  /><br/><br/>
        <TextField value={email} id="outlined-basic"type='text' label="Email" variant="outlined"onChange={changeemail} /><br/><br/>
        <TextField value={password} id="outlined-basic"type='text' label="Password" variant="outlined"onChange={changepassword} /><br/><br/>
        <input type='file' onChange={changepost} ></input><br></br>
        <Button sx={{marginTop:3,marginLeft:8}}type='submit'variant="contained" color="success">submit</Button>

        </form>


        {/* <form >
        <input type='file'onChange={(e)=>setupdate(e.target.files[0])}>select file</input>
        <button  onClick={()=>edit(data._id) }>submit</button>
        </form> */}
    </div>
  )
}

export default Edit;