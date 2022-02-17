import React from "react";
import styled from "styled-components";
import profile from "../assets/profile.png";
import { Rating } from "@material-ui/lab";

const RevCard = styled.div`
  flex: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border: 1px solid #a0a09c;
  width: 18vmax;
  height: 8vmax;
  display: flex;
  flex-direction: column;

  align-items: center;
  margin: 1vmax;
  padding: 3vmax;
  & > h4 {
    color: #eb04b1;
    font-weight: 600;
  }
`;

const Image = styled.img`
  width: 3vmax;
`;
const Comment = styled.span`
  color: #3b3b38;
  font-size: 13px;
  font-weight: 300;
`;
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    size: "large",
    readOnly: true,
    precision: 0.5,
  };

  return (
    <RevCard>
      <Image src={profile} alt="User" />
      <h4>{review.name}</h4>
      <Rating {...options} />
      <Comment>{review.comment}</Comment>
    </RevCard>
  );
};

export default ReviewCard;
