import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import couple1 from "../../Assets/images/couple1.jpg";
import couple2 from "../../Assets/images/couple2.jpg";
import couple3 from "../../Assets/images/couple3.jpg";
import couple4 from "../../Assets/images/couple4.jpg";
import couple5 from "../../Assets/images/couple5.jpg";
import couple6 from "../../Assets/images/couple6.jpg";
import StoryCard from "./storyCard";
import './successStoryCarousel.css'
import { useEffect } from "react";
export default function SuccessStoryCarousel() {
 
  const arrowStyles = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 40,
    height: 40,
    cursor: "pointer",
    borderRadius: "50%",
    padding: 10,

    color: "white",
    backgroundColor: "#1F2937",
    opacity: 0.9,
  };

  const storyData=`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`
  const data = [
    { id: "1", name: "Abhinav & Shristi", story: storyData, img: couple1 },
    { id: "2", name: "Abhinav & Shristi", story: storyData, img: couple2 },
    {id:'3',name:'Abhinav & Shristi',story:storyData,img:couple3},
     {id:'4',name:'Abhinav & Shristi',story:storyData,img:couple4},
     {id:'5',name:'Abhinav & Shristi',story:storyData,img:couple5},
     {id:'6',name:'Abhinav & Shristi',story:storyData,img:couple6}
  ];
 const [incrementArray,setIncrementArray]=useState()
const [i,setI]=useState(3)
useEffect(()=>{
  setIncrementArray([data[i-1],data[i-2],data[i]])
},[])
  
  return (
    <div className="successStoryCarousel">
    
      <div className="arrowButton" onClick={()=>{if(i==3){
        setI(data.length-1)
      }else{setI(i-1)}}}>{`<`}</div>
      {incrementArray &&incrementArray.map((user, index) => (
          <StoryCard key={user.id} user={user} />
        ))}
           <div className="arrowButton" onClick={()=>{if(i==data.length-1){setI(3)}else{setI(i+1)}}}>{`>`}</div>
    </div>
  );
}
