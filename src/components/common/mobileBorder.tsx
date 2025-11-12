"use client";
import React from "react";
import styled from "styled-components";

const MobileBorder = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <div className="dots_border"></div>
        <span className="text_button">Terms & Conditions</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    --border_radius: 90px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: var(--border_radius);
    background: white;
    cursor: pointer;
    overflow: hidden;
    font-size: 0.85rem;
    font-weight: 500;
    z-index: 1;
  }

  .button::before {
    content: "";
    position: absolute;
    inset: 2px;
    background: white;
    border-radius: var(--border_radius);
    z-index: 1;
  }

  /* Smooth visible movement border */
  .dots_border {
    position: absolute;
    inset: 0;
    border-radius: var(--border_radius);
    padding: 2px;
    background: linear-gradient(90deg, gray 40%, red 50%, gray 60%);
    background-size: 200% 200%;
    animation: moveBorder 3s linear infinite;
    z-index: 0;
  }

  @keyframes moveBorder {
    100% {
      background-position: 0% 50%;
    }
    0% {
      background-position: 200% 100%;
    }
  }

  .text_button {
    position: relative;
    z-index: 2;
    white-space: nowrap;
    color: black;
  }
`;

export default MobileBorder;
