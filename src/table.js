import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function Tabledataa() {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [id, setId] = useState("")
    const [flag, setFlag] = useState(false)
    const [showdel, setShowdel] = useState(false);
    const handleClosedel = () => setShowdel(false);
    const handleShowdel = () => setShowdel(true);
    const [showdata, setShowdata] = useState(false);
    const handleClosedata = () => setShowdata(false);
    const handleShowdata = () => setShowdata(true);

    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        phone: "",
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchdata = () => {
        fetch("http://localhost:2407/findData")
            .then(response => response.json())
            .then(records => setData(records.adddata))
            .catch(err => console.log(err))
    }

    const viewTask = (id) => {
        setShow(true)
        axios.get(`http://localhost:2407/findDataById/${id}`).then((res) => {
            setFirstName(res.data.adddata.firstname)
            setLastName(res.data.adddata.lastname)
            setPassword(res.data.adddata.password)
            setEmail(res.data.adddata.email)
            setPhone(res.data.adddata.phone)
            setId(res.data.adddata._id)
        })
    }

    const deldata = (id) => {
        console.log(id)
        setShowdata(false)
        axios.delete(`http://localhost:2407/deleteData/${id}`)
            .then(response => {

                fetchdata()
            })
            .catch(err => console.log(err))
    }

    const updateData = () => {
        console.log(id)

        axios.put(`http://localhost:2407/updateData/${id}`, { firstname, lastname, password, email, phone })
            .then(res => {
                console.log(res.data.adddata)
                const { firstname, lastname, password, email, phone } = res.data.adddata;
                setFormValues({ firstname, lastname, password, email, phone });
                setFlag(!flag)
                setShow(false)
            })
            .catch(err => console.log(err))
    }

    const editdata = () => {
        // console.log(id)
        setShowdel(false)
        axios.post("http://localhost:2407/insertData", { firstname, lastname, password, email, phone })
            .then(response => {

                fetchdata()
            })
            .catch(err => console.log(err))

    }


    useEffect(() => {
        fetchdata()
    }, [flag])

    // useEffect(() => {
    //     editdata()
    // }, [])

    return (
        <div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicFirstname">
                            <Form.Label>FIRSTNAME</Form.Label>
                            <Form.Control type="text" placeholder="Firstname" value={firstname} onChange={e => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastname">
                            <Form.Label>LASTNAME</Form.Label>
                            <Form.Control type="text" placeholder="lastname" value={lastname} onChange={e => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>PASSWORD</Form.Label>
                            <Form.Control type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>EMAIL</Form.Label>
                            <Form.Control type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>PHONE</Form.Label>
                            <Form.Control type="number" placeholder="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={updateData}>
                            Save Changes{console.log(formValues)}
                        </Button>
                    </Form>

                </Modal.Body>
            </Modal>
            <Table striped bordered hover >
                <thead>
                    <tr >
                        <th >FIRSTNAME</th>
                        <th >LASTNAME</th>
                        <th >PASSWORD</th>
                        <th >EMAIL</th>
                        <th >PHONE</th>
                        <th >ACTION</th>

                    </tr>
                </thead>
                {data.map((ele) => {
                    return (
                        <tbody>
                            <tr>
                                <td >{ele.firstname}</td>
                                <td >{ele.lastname}</td>
                                <td >{ele.password}</td>
                                <td >{ele.email}</td>
                                <td >{ele.phone}</td>
                                <td >
                                        <Modal show={showdata} onHide={handleClosedata}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Delete Confirmation</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to delete {ele.firstname}????</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClosedata}>
                                                    NO
                                                </Button>
                                                <Button variant="primary" onClick={() => deldata(ele._id)}>
                                                    YES
                                                </Button>
                                            </Modal.Footer>
                                            </Modal>
                                    <button type="button" class="btn btn-success" onClick={handleShowdata} >
                                            &times;
                                            </button>
                                    <button type="button" class="btn btn-primary" onClick={() => viewTask(ele._id)}>EDIT</button>
                                </td>

                            </tr>
                        </tbody>

                    )
                })}

            </Table>
            <br></br>
            <Button variant="secondary" onClick={handleShowdel}>ADD DATA</Button>{' '}
            <Modal show={showdel} onHide={handleClosedel}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert New Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicFirstname">
                            <Form.Label>FIRSTNAME</Form.Label>
                            <Form.Control type="text" placeholder="Firstname" value={firstname} onChange={e => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastname">
                            <Form.Label>LASTNAME</Form.Label>
                            <Form.Control type="text" placeholder="lastname" value={lastname} onChange={e => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>PASSWORD</Form.Label>
                            <Form.Control type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>EMAIL</Form.Label>
                            <Form.Control type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>PHONE</Form.Label>
                            <Form.Control type="number" placeholder="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={editdata}>
                            Add Data
                        </Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Tabledataa
