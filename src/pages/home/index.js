import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import WModal from '../../components/Modal';

import AuthContext from '../../context/authContext';
import { getProduct, updateProduct, createProduct } from '../../services/api';

import "./styles.scss";

const SortComp = ({ handleSortChange }) => {
  return (
    <Form.Select className='w-25 float-end' onChange={handleSortChange}>
      <option>Sort</option>
      <option value="name_asc">Name ASC</option>
      <option value="name_desc">Name DESC</option>
      <option value="description_asc">Description ASC</option>
      <option value="description_desc">Description DESC</option>
      <option value="price_asc">Price ASC</option>
      <option value="price_desc">Price DESC</option>
      <option value="stock_asc">Stock ASC</option>
      <option value="stock_desc">Stock DESC</option>
    </Form.Select>
  );
}

const HomePage = () => {
  const [searchStr, setSearchStr] = useState("");
  const [productList, setProductList] = useState([]);
  const [sortData, setSortData] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, userEmail } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchProduct();
  }, [searchStr, sortData]);

  useEffect(() => {
    if (!isAuthenticated && !userEmail) {
      navigate("/login");
    }
  }, [isAuthenticated, userEmail, navigate]);

  const getTransactionQueryParams = () => {
    const queryParams = {};
    if (searchStr) {
      queryParams["search"] = searchStr;
    } else if (sortData) {
      queryParams["sort"] = sortData;
    }
    return queryParams;
  };

  const fetchProduct = async () => {
    const urlParams = getTransactionQueryParams();
    const products = await getProduct(urlParams);
    const {results, selected} = products.data;
    let updatedList = updateSelectedStatus(results, selected);
    setProductList(updatedList);
  };

  const updateSelected = async (id, val) => {
    await updateProduct(id, {"selected": val});
    await fetchProduct();
  };

  const handleSearch = (e) => {
    let search = e.target.value;
    setSearchStr(search);
  };

  const handleCheckboxChange = (id, val) => {
    updateSelected(id, val);
  };
  
  const handleSortChange = async (e) => {
    setSearchStr("")
    const selectedValue = e.target.value;
    setSortData(selectedValue);
  };

  const handleCreateProduct = async data => {
    setIsLoading(true);
    const resp = await createProduct(data);
    if (resp.status !== 201) {
      alert("Error occured");
    }
    setIsLoading(false);
  }

  const updateSelectedStatus = (list = [], selectedIds = []) => {
    return list.map(obj => ({
      ...obj,
      selected: Array.isArray(selectedIds) && selectedIds.includes(obj.id),
    }));
  }

  return (
    <div className='mt-5'>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                placeholder="Search"
                onChange={e => handleSearch(e)}
                value={searchStr}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col><SortComp handleSortChange={handleSortChange}/></Col>
      </Row>
      <Table striped bordered hover responsive className='mt-2'>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>description</th>
            <th>price</th>
            <th>stock</th>
            <th>select</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Form.Check
                  checked={product.selected}
                  onChange={(e) => handleCheckboxChange(product.id, !product.selected)}
                  className="productCheckbox"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Card.Footer className="py-4">
        {productList.length === 0 && <p className="text-center text-muted">No data to show</p>}
        <Button className="float-end prodBtn" onClick={handleShow}>Add a Product</Button>
      </Card.Footer>
      <WModal
        show={show}
        handleClose={handleClose}
        handleCreateProduct={handleCreateProduct}
        loading={isLoading}
      />
    </div>
  );
};

export default HomePage;
