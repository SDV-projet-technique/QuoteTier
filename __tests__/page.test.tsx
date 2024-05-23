import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../src/app/page";

describe("Page", () => {
  it("renders the page", () => {
    render(<Page />);
  });
  it("gets the header element", () => {
    render(<Page />);
    waitFor(() => {
      const headerElement = screen.getByRole("heading");
      expect(headerElement).toBeInTheDocument();
    });
  });
  it("gets the footer element", () => {
    render(<Page />);
    waitFor(() => {
      const footerElement = screen.getByRole("contentinfo");
      expect(footerElement).toBeInTheDocument();
    });
  });
});
