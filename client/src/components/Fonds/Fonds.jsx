import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFonds, searchFonds } from '../../actions/fonds';

import { Spinner, Row, Col, Container, Form, Button } from "react-bootstrap";

import '../../styles/fonds.scss';

import FondCard from "./FondCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";

const categories = ['Барлығына','Ересектерге','Балаларға','Әйелдерге','Жануарлар','Қоғамға','Жасөспірімдерге','Қарттарға','Отбасыларға','Экологияға']
const locations = ["Алматы", "Нұр-Сұлтан", "Шымкент", "Ақтөбе", "Қарағанды", "Тараз", "Павлодап", "Семей", "Өскемен", "Қызылорда", "Орал", "Қостанай", "Атырау", "Петропавл", "Ақтау", "Көкшетау", "Талдықорған"];

const formInitial = {search: '', location: ''};

const Fonds = () => {
    const [searchParams] = useSearchParams();
    const { fonds, isLoading } = useSelector((state) => state.posts)
    const [ formData, setFormData ] = useState(formInitial);
    const [ selectedCat, setSelectedCat ] = useState([]);

    const dispatch = useDispatch();

    const search = (e) =>{
        e.preventDefault();

        if(formData.search || formData.location || selectedCat.length>0)
            dispatch(searchFonds(formData.search, formData.location, selectedCat.join(',')));
        else
            dispatch(getFonds());
    }
    const chooseCategory = (e) =>{
        // e.preventDefault();
        if(e.target.checked){
            setSelectedCat([...selectedCat, e.target.value]);
        }else{
            setSelectedCat(selectedCat.filter((item) => item !== e.target.value));   
        }
    }
    const queryChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        if(searchParams && searchParams.get('search')){
            console.log(searchParams.get('search'))
            setFormData({...formData, search: searchParams.get('search')});
            dispatch(searchFonds(searchParams.get('search'), '', ''));
        }
    }, [searchParams]);

    useEffect(() => {
        if(!searchParams || !searchParams.get('search'))
            dispatch(getFonds());
    }, [dispatch]);

    return (
        <Container id="fonds">
            <h1>Тексерілген қорды таңдаңыз</h1>
            <p>Біз бүкіл Қазақстан бойынша {isLoading ? (<span>...</span>) : fonds.length} қайырымдылық ұйымының жұмысын қолдаймыз.</p>

            <div>
                <Form onSubmit={search}>
                    <div className="d-flex mb-3">
                        <div className="search">
                            <Form.Control type="text" value={formData.search} onChange={queryChange} placeholder="Қордың аты..." name="search"/>
                            <Button type="submit">
                                <FontAwesomeIcon icon={['fas', 'magnifying-glass']} size="lg" />
                            </Button>
                        </div>
                        <div className="filterBtn" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('filter').classList.toggle('active');
                        }} >Сүзу</div>
                    </div>
                    <div id="filter">
                        <Row>
                            <Col xs={12} md={4}>
                                <p>Кімге?</p>
                            </Col>
                            <Col xs={12} md={8} className="check-options">
                                {categories.map((category, key) => (
                                    <Col xs={12} md={6} key={key}>
                                        <Form.Check type="checkbox" value={category} id={`check${category}`} label={category} onChange={chooseCategory} />
                                    </Col>
                                ))}
                            </Col>
                        </Row>
                        <hr />
                        <Form.Group>
                            <Row>
                                <Col xs={12} md={4}>
                                    <Form.Label>Қай облыс/аймақ</Form.Label>
                                </Col>
                                <Col xs={12} md={8}>
                                    <Form.Select name="location" onChange={queryChange} >
                                        <option value="">Барлық</option>
                                        {locations.map((location, key) => (
                                            <option key={key} value={location}>{location}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
                        <div className="text-center">
                            <Button type="submit">Сүзу</Button>
                        </div>
                    </div>
                </Form>



            </div>

           
            <div className="fonds mt-3 mb-3">
                {(isLoading || !fonds) ? (
                    <div className="text-center p-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                    </div>
                ) : ((!!fonds && fonds.length>0) ? (
                    <>
                        <Row xs={1} md={2} lg={3}>
                            {fonds.map((fond) => (
                                <Col key={fond.id}>
                                    <FondCard fond={fond}/>
                                </Col>
                            ))}
                        </Row>
                    </>
                    ):(
                        <>
                            <div className="text-center p-5">
                                Қорлар жоқ
                            </div>
                        </>
                    ))
                }
            </div>
        </Container>
    );
};

export default Fonds;