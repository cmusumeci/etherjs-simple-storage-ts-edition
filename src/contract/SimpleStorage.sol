// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8; // specify version soldity

contract SimpleStorage { // define contract
    uint256 public number; // declare variable


    function store(uint256 _number) public virtual { // with virtual is possibile override store fn
            number = _number;
        }


   function retrieve() public view returns (uint256){
    return number; 
   }


    mapping(string=>uint256) public ageOfPerson; //   obj [key: string]:value
   
    
    struct People { // similar js obj 
        uint256 age;
        string name;
    }


    People[] public people; // array of People 

   

   function addPeople(string memory _name,uint256 _age)public{
       people.push(People({name:_name,age:_age})); // array of Person Obj
       ageOfPerson[_name] = _age; // [key: string]:value
   }
  
}


 