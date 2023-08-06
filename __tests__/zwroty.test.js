import ComplaintPage from "@/pages/zwroty";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";


describe("About page", () => {
    it("renders about page", () => {
      render(<ComplaintPage />);

      const pageText = screen.getByText("Zwroty w naszym sklepie", { exact: false });
      expect(pageText).toBeInTheDocument();
      // check if all components are rendered
    //   expect(screen.getByText("Witamy"))
    });
  });