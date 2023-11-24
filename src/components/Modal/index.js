import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const WModal = ({ show, handleClose, handleCreateProduct, loading }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDesc] = useState("");


  const handleSave = () => {
    const data = { name, price, stock, description };
    handleCreateProduct(data);
    setName("");
    setPrice("");
    setStock("");
    setDesc("");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Name"
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Price"
                type='number'
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Stock"
                value={stock}
                type='Number'
                onChange={e => setStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder='Description'
                value={description}
                onChange={e => setDesc(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='prodBtn'
            onClick={handleSave}
            disabled={loading}
          >
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WModal;
