import React, { Component } from 'react';
import {Collapsible, CollapsibleItem, Row, Input, Col, Button, Icon} from 'react-materialize';
import 'whatwg-fetch';

class HomeSearch extends Component {

    constructor(){
        super();
        this.state = {
            addressString: '',
            searchResponse: {},
            hasTowel: false,
            hasChangingStation: false,
            hasMirror: false,
            hasTampons: false,
            isAccessable: false,
            minRate: 0
        };

        this.onTextboxChangeSearch = this.onTextboxChangeSearch.bind(this);
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
        this.onMinRateChange = this.onMinRateChange.bind(this);
        

        this.searchLoos = this.searchLoos.bind(this);
    }

    searchLoos() {
        // Grab state
        const {
            addressString,
            isAccessable,
            hasChangingStation,
            hasTowel,
            hasMirror,
            hasTampons,
            minRate
        } = this.state;

        let searchTerms = "";

        if(!addressString){
            return null;
        }else{
            searchTerms += addressString.trim();
        }
        // if(isAccessable){
        //     searchTerms += "&isAccessable=true";
        // }
        // if(hasChangingStation){
        //     searchTerms += "&hasChangingStation=true";
        // }
        // if(hasTowel){
        //     searchTerms += "&hasTowel=true";
        // }
        // if(hasMirror){
        //     searchTerms += "&hasMirror=true";
        // }
        // if(hasTampons){
        //     searchTerms += "&hasTampons=true";
        // }
        // if(minRate > 0){
        //     searchTerms += "&minRate=" + minRate;
        // }
        
        console.log(searchTerms);
        // Get request to backend
        fetch('/search/location?input=' + searchTerms, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            searchTerms: searchTerms,
          }),
        }).then(res => {
            console.log('Response: ', res);
          });
    }

    onTextboxChangeSearch(event) {
        this.setState({
            searchTerms: event.target.value,
        });
    }

    onCheckBoxChange(event) {
        console.log(event.target.name)
        let input = event.target.name;
        if(input == 'isAccessable'){
            this.setState({
                isAccessable: event.target.value
            });
        }
        if(input == 'hasTowel'){
            this.setState({
                hasTowel: event.target.value
            });
        }
        if(input == 'hasMirror'){
            this.setState({
                hasMirror: event.target.value
            });
        }
        if(input == 'hasTampons'){
            this.setState({
                hasTampons: event.target.value
            });
        }
        if(input == 'hasChangingStation'){
            this.setState({
                hasChangingStation: event.target.value
            });
        }
    }

    onMinRateChange(event, val){
        event.preventDefault();
        if(this.minRate == val){
            val--
        }
        this.setState({
            minRate: val
        })
        console.log(this.minRate);
        console.log('val ' + val)
    }

    render(){

        const {
            searchTerms
          } = this.state;

        return(
            <div>
                <Row className='clearfix'>
                    <Col offset='s2' s={8}>                                            
                        <Input type="text" ref="location" placeholder="Enter a Location or Point of Interest" value={searchTerms} onChange={this.onTextboxChangeSearch} s={12} />
                        <Button style={{  background: '#80deea' }} type="submit" waves="purple" onClick={this.searchLoos} >Search</Button>                                            
                    </Col>
                </Row>
                <Row>
                    <Collapsible>
                        <CollapsibleItem icon='more_vert' header='Advanced search'>
                            <Row>
                                <Input 
                                name='hasTowel' 
                                type='checkbox' 
                                value={this.hasTowel} 
                                label='Has Towel' 
                                onChange={this.onCheckBoxChange} 
                                />
                                <Input 
                                name='hasChangingStation' 
                                type='checkbox' 
                                value={this.hasChangingStation} 
                                label='Has Changing Station' 
                                onChange={this.onCheckBoxChange} 
                                />
                                <Input 
                                name='hasMirror' 
                                type='checkbox' 
                                value={this.hasMirror} 
                                label='Has Mirror' 
                                onChange={this.onCheckBoxChange} 
                                />
                                <Input 
                                name='hasTampons' 
                                type='checkbox' 
                                value={this.hasTampons} 
                                label='Has Tampons' 
                                onChange={this.onCheckBoxChange} 
                                />
                                <Input 
                                name='isAccessable' 
                                type='checkbox' 
                                value={this.isAccessable} 
                                label='Is handicap accessable' 
                                onChange={this.onCheckBoxChange} 
                                />
                            </Row>
                            <Row>
                                {/* there has to be some kind of for loop for this but its 3am so i don't care
                                    i'll fix it in post */}
                                {
                                    (this.state.minRate > 0) ? (
                                        <a href="#" onClick={(e) => this.onMinRateChange(e, 1)}><Icon small >star</Icon></a>
                                    ) : (<a href="#" onClick={(e) => this.onMinRateChange(e, 1)}><Icon small >star_border</Icon></a>)
                                }
                                {
                                    (this.state.minRate > 1) ? (
                                        <a href="#" onClick={(e) => this.onMinRateChange(e, 2)}><Icon small >star</Icon></a>
                                    ) : (<a href="#" onClick={(e) => this.onMinRateChange(e, 2)}><Icon small >star_border</Icon></a>)
                                }
                                {
                                    (this.state.minRate > 2) ? (
                                        <a href="#" onClick={(e) => this.onMinRateChange(e, 3)}><Icon small >star</Icon></a>
                                    ) : (<a href="#" onClick={(e) => this.onMinRateChange(e, 3)}><Icon small >star_border</Icon></a>)
                                }
                                {
                                    (this.state.minRate > 3) ? (
                                        <a href="#" onClick={(e) => this.onMinRateChange(e, 4)}><Icon small >star</Icon></a>
                                    ) : (<a href="#" onClick={(e) => this.onMinRateChange(e, 4)}><Icon small >star_border</Icon></a>)
                                }
                                {
                                    (this.state.minRate > 4) ? (
                                        <a href="#" onClick={(e) => this.onMinRateChange(e, 5)}><Icon small >star</Icon></a>
                                    ) : (<a href="#" onClick={(e) => this.onMinRateChange(e, 5)}><Icon small >star_border</Icon></a>)
                                }
                                
                            </Row>
                        </CollapsibleItem>
                    </Collapsible>
                </Row>
            </div>
        );
    }

}

export default HomeSearch