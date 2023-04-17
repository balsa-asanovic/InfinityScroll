import { useEffect, useState, useRef, useCallback } from "react";
import Head from "next/head";
import styled from "styled-components";

import { fetchImages } from "../api/client";
import useImages from "../hooks/useImages";

import type { NextPage } from "next";
import type { Image } from "../types/images";
import Card from "../components/Card";


const PageContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding-left: 20px;
  background-color: #fff6f3;
`;

const ListContainer = styled.div`
  width: 100%;
  max-width: 1200px; 
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  background-color: #f3f4f6;

  @media (max-width: 768px) {
    flex-direction: column;
    align-content: center;
  }
`;

const Title = styled.h1`
  color: #000000;
  font-size: 24px;
  font-family: "Open-Sans";
`;

const Image = styled.img`
  width: 23%;
  height: 20%;
  margin-bottom: 20px;
`;

const LoadButton = styled.button`
  display: inline-block;
  width: auto;
  margin: 0 auto;
  font-family: "Open Sans";
  font-size: 14px;
  color: #000000;
  padding: 12px 64px;
  border: solid 1px rgb(100, 116, 139, 0.2);
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 12px 16px rgb(136, 136, 136, 0.04), 0px 4px 6px rgb(136, 136, 136, 0.02);
`;

const Index: NextPage = () => {
  const [offset, setOffset] = useState(0);
  const {
    isLoading,
    isError,
    error,
    results,
    hasNextBatch
  } = useImages(offset);

  const intObserver = useRef<IntersectionObserver>();
  const lastImageRef = useCallback((image: HTMLImageElement) => {
    if (isLoading) return;

    if (intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver(posts => {
      if (posts[0].isIntersecting && hasNextBatch) {
        setOffset(prev => prev + 20)
      }
    })

    if (image) intObserver.current.observe(image)
  }, [isLoading, hasNextBatch]);

  if (isError) return <div>Error: {error?.message}</div>


  return (
    <PageContainer>
      <Head>
        <title>Scroller Task</title>
      </Head>

      <Title>Locations</Title>
      <ListContainer>
        {results.map((image, index) => {
          if (results.length === index + 1) {
            return <Card ref={lastImageRef} key={index} url={image.url} id={image.id} />;
          }
          return <Card key={index} url={image.url} id={image.id} />;
        })}
      </ListContainer>
      <LoadButton onClick={() => setOffset(prev => prev + 20)} disabled={isLoading === true || hasNextBatch === false}>Load More</LoadButton>
    </PageContainer>
  );
};

export default Index;
