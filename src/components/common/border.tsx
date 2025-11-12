"use client";
import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button px-6 py-0.5 2xl:px-16 2xl:py-2">
        <span className="border-glow" />
        <span className="text_button text-xs xl:text-sm">
          Terms & Conditions
        </span>
      </button>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  .button {
    --dark-bg: #0a0a0a; /* Darker background for better contrast */
    --border_radius: 90px;

    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: var(--border_radius);
    overflow: hidden;
    background: var(--dark-bg);
    z-index: 1;
    isolation: isolate;
    transition: transform 0.2s ease;
  }

  /* Neon moving border with dark mode optimized colors */
  .border-glow {
    position: absolute;
    inset: -2px;
    border-radius: var(--border_radius);
    background: linear-gradient(
      120deg,
      #0a0a0a,
      /* Dark gray/black */ #2d1b69,
      /* Deep purple */ #006680,
      /* Deep cyan/teal */ #2d1b69,
      /* Deep purple */ #8a0044 /* Deep magenta */
    );
    background-size: 300% 300%;
    animation: gradientMove 4s linear infinite;
    z-index: -1;
    filter: blur(3px) brightness(0.8);
    opacity: 0.7;
  }

  @keyframes gradientMove {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .text_button {
    position: relative;
    z-index: 2;
    color: #f8f9fa;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-shadow: 0 0 8px rgba(0, 225, 255, 0.3);
  }

  /* Hover effects */
  .button:hover {
    transform: scale(1.02);
  }

  /* Active state */
  .button:active {
    transform: scale(0.98);
  }
`;

export default Button;
