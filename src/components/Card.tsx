import React from "react";
import type { cardProps } from "../types/images";
import styled from "styled-components";
import icon from '../assets/rightArrow.png';

const CardDiv = styled.div`
  width: 23%;
  height: 250px;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(85, 105, 1350, 0.1);
  background-color: #ffffff;
  padding-bottom: 16px;
  margin-right: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 60%;
  }
`;

const Image = styled.img`
    width: 100%;
    height: 50%;
    border-radius: 8px;
    margin: 0;
    margin-bottom: 16px;
`;

const CardTitle = styled.h1`
    color: #000000;
    font-family: "Open-Sans";
    font-size: 16px;
    margin-top: 0px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 16px;
    display: inline-block;
`;

const UpdateTime = styled.span`
    color: #64748B;
    font-family: "Open-Sans";
    font-size: 11px;
    margin-left: 8px;
    margin-right: 8px;
`;

const CardText = styled.span`
    color: #000000;
    font-size: 12px;
    font-family: Inter;
    margin-left: 8px;
    margin-right: 8px;
    display: inline-block;
`;

const Icon = styled.img`
    height: 24px;
    width: 24px;
`;

const Link = styled.a`
    margin-left: auto;
    margin-right: 8px;
    margin-top: 8px;
`;

const ColumnContainer = styled.span`
    display: flex;
    flex-direction: column;
`;

const RowContainer = styled.span`
    display: flex;
    flex-direction: row;
`;

const Card = React.forwardRef<HTMLImageElement, cardProps>(({ url, id }, ref) => {

    return (
        <CardDiv>
            <Image ref={ref} src={url} alt={id} />
            <RowContainer>
                <ColumnContainer>
                    <UpdateTime>Updated 22 hours ago</UpdateTime>
                    <CardTitle>Some Title</CardTitle>
                </ColumnContainer>
                <Link href={url} target="_blank"><Icon src="rightArrow.png" /></Link>
            </RowContainer>
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas non nibh in justo porttitor viverra.
                Nulla commodo...
            </CardText>
        </CardDiv>

    )
});

export default Card;
