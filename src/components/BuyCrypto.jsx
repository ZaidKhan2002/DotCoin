import React, { useEffect, useState, useContext } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Affix, Alert } from 'antd'
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/cryptoApi'
import { AddTransaction } from './AddTransaction';

import { Globalcontext } from '../Hooks/GlobalState'



const BuyCrypto = ({simplified}) => {
    const [container, setContainer] = useState(null);
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('');

    const [transaction, setTransaction] = useState(() => {
        // get from localstorage
        const savedTransaction = localStorage.getItem('transaction');
        // if stored
        if (savedTransaction) {
          return JSON.parse(savedTransaction);
        } else {
          return [];
        }
      });

      const { addTransaction } = useContext(Globalcontext);

      const cryptoBuying = props => {
          console.log("Testing buying", props.slice(4))
        const newTransaction = {
        //   id: Math.floor(Math.random() * 10000000),
          id: props.price,
          text: props.name,
          amount: props.price
        }
        addTransaction(newTransaction);
        setTransaction([
          ...transaction,
          newTransaction
        ])
    
        //clear state for next transaction 
        // setText('')
        // setAmount()
      }

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filteredData);

    }, [cryptosList, searchTerm]);

    if(isFetching) return <Loader />;


    return (
        <>  
            {!simplified && (
            <div className="search-crypto">
                <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            )}

<div className="scrollable-container overflow-y-hidden" ref={setContainer}>
      <div className="background">
        <Affix target={() => container}>
        <Row gutter ={[32,32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={{pathname: `/crypto/${currency.id}`,
                        state: {
                            currency
                        }
                    }}>
                        </Link>
                        <Card 
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className="crypto-image" src={currency.iconUrl} />}
                            hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                                <button onClick={() => cryptoBuying(millify(currency.price))} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Buy</button>
                            </Card>
                    </Col>
                ))}
            </Row>
        </Affix>
      </div>
    </div>
        </>
    )
}

export default BuyCrypto
