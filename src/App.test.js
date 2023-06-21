import { render, screen } from "@testing-library/react";
import App from "./App";
import GeoMaps from "./components/GeoMaps";

describe("App", () => {
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
});

