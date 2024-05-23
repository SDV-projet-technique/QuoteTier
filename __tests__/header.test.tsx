import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("has three links in the header", () => {
    render(<Header />);
    waitFor(() => {
      const linkElements = screen.getAllByRole("link");
      expect(linkElements.length).toBe(3);
    });
  });
  it("has a logo", () => {
    render(<Header />);
    waitFor(() => {
      const logoElement = screen.getByRole("img");
      expect(logoElement).toBeInTheDocument();
    });
  });
});
