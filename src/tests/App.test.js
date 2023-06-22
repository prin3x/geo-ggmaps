import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../App";
import GeoMaps from "../components/GeoMaps";
import { setupJestCanvasMock } from 'jest-canvas-mock';
import '@testing-library/jest-dom'
import ErrorLocation from "../components/ErrorLocation";


describe("App", () => {

  beforeEach(() => {
    jest.resetAllMocks();
    setupJestCanvasMock();
  });

  test("renders loading on initialize", () => {
    render(<App />);
    const loading = screen.getByTestId(/loading-comp/i);
    expect(loading).toBeInTheDocument();
  });

  test("renders geo maps", () => {
    render(<GeoMaps />);
    const geoMap = screen.getByTestId(/geo-maps/i);
    const marker = screen.getByTestId(/marker/i);
    expect(geoMap).toBeInTheDocument();
    expect(marker).toBeInTheDocument();
  });

  test("renders error comp", () => {
    render(<ErrorLocation />);
    const error = screen.getByTestId(/error-container/i);
    expect(error).toBeInTheDocument();
  });
});

