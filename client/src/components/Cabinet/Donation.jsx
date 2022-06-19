import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDonationsByUserId } from "../../actions/donations";

import DonationCountIcon from '../../images/donationCnt.svg';
import ProjectCountIcon from '../../images/projectCnt.svg';
import TotalAmountIcon from '../../images/totalAmount.svg';

import './styles/donation.scss';

const Donation = () => {
    const [searchParams] = useSearchParams();
    const {donations} = useSelector((state)=> state.posts);
    const [type, setType] = useState('monhty');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(()=>{
        if(profile && profile.user){
            let type = searchParams.get('type');
            if(type && (type === 'permanent' || type==='monthly')){
                dispatch(getDonationsByUserId(profile.user.id));
                setType(type);
            }else{
                navigate(-1);
            }
        }
    }, [searchParams, profile]);

    const [fields, setFields] = useState({projectCnt: 0, donationsCnt: 0, totalAmount: 0});

    useEffect(()=>{
        if(donations){
            const projects = new Set();
            let total = 0;
            let cnt = 0;
            for (let index = 0; index < donations.length; index++) {
                const donation = donations[index];
                if(donation.type === type){
                    projects.add(donation.fond.id);
                    total += donation.amount;
                    cnt++;
                }
            }

            setFields({projectCnt: projects.size, donationsCnt: cnt, totalAmount: total});
        }
    }, [donations]);

    return (
        <div id="donation">
            <h1>{type === 'monthly' ? 'Ай сайындық' : 'Бір реттік'} қайырымдылық</h1>
            
            <Row className="fields" xs={1} md={3}>
                <Col>
                    <div className="field">
                        <div>
                            <p>Жобалар</p>
                            <span>{fields.projectCnt}</span>
                        </div>
                        <div className="icon">
                            <Image src={ProjectCountIcon} />
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="field">
                        <div>
                            <p>Садақалар</p>
                            <span>{fields.donationsCnt}</span>
                        </div>
                        <div className="icon">
                            <Image src={DonationCountIcon} />
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="field">
                        <div>
                            <p>Жалпы сома</p>
                            <span>{fields.totalAmount} ₸</span>
                        </div>
                        <div className="icon">
                            <Image src={TotalAmountIcon} />
                        </div>
                    </div>
                </Col>
            </Row>

            <h3>Садақалар</h3>            

            <div className="donations">
                {fields.donationsCnt > 0 ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Ұйым</th>
                                <th>Сома</th>
                                <th>Күн</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation) => donation.type === type && (
                                <tr>
                                    <td>{donation.fond.title}</td>
                                    <td>{donation.amount} ₸</td>
                                    {type === 'monthly' ? (
                                        <td>Әр айдын {moment(donation.date).format('DD')} күні</td>
                                    ) : (
                                        <td>{moment(donation.date).format('HH.mm DD.MM.YYYY')}</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p className="p-5 text-center">Сізде ай сайынғы қайырымдылықтар жоқ</p>
                )}
            </div>

        </div>
    )
}

export default Donation;