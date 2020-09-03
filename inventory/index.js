import {Component} from 'react'
import {Container, Row, Card, Button, ButtonGroup} from 'react-bootstrap'
import {IconContext} from 'react-icons'
import {FaCartPlus, FaShareAlt} from 'react-icons/fa'
import {GoThreeBars} from 'react-icons/go'
import styles from '../styles/ProductItem.module.scss'

export default class Inventory extends Component{
  
  fetchNew(){
    var inventoryList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // fetch().then() fetch API data of inventory 

    return inventoryList.map((data, index) => <ProductItem item={data} key={index}/>)
  }

  fetchMens(){
    var inventoryList = [];
    // fetch().then() fetch API data of inventory 
    
    return inventoryList.map((data, index) => <ProductItem item={data} key={index}/>)
  }
  
  fetchWomens(){
    var inventoryList = [];
    // fetch().then() fetch API data of inventory 
    
    return inventoryList.map((data, index) => <ProductItem item={data} key={index}/>)
  }
  
  fetchKids(){
    var inventoryList = [];
    // fetch().then() fetch API data of inventory 
    
    return inventoryList.map((data, index) => <ProductItem item={data} key={index}/>)
  }
  
  render(){
    return(
      <Container>
        <Row sm={6}>
          {this.fetchNew()}
        </Row>
      </Container>
    )
  }
}

function ProductItem(props){
  return (
    <Card className={`border-0 m-4 text-center`}>
      <Card.Img className={`${styles.img} mx-auto`}variant="top" src="#" alt="Item" />
      <Card.Body>
        <Card.Title>Name</Card.Title>
        <Card.Text><em>Price</em></Card.Text>
        <ButtonGroup>
          <IconContext.Provider value={{size: "1em", color: "black"}}>
            <Button variant="primary" className="text-left border-0"><FaCartPlus /></Button>
            <Button variant="primary" className="text-left border-0"><GoThreeBars /></Button>
            <Button variant="primary" className="text-left border-0"><FaShareAlt /></Button>
          </IconContext.Provider>
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
}

