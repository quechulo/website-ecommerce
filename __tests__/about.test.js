import AboutPage from "@/pages/onas";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";


describe("About page", () => {
    it("renders about page", () => {
      render(<AboutPage />);

      const helloTxt = screen.getByText("Witamy w naszym sklepie Buy Stuff", { exact: false });
      expect(helloTxt).toBeInTheDocument();
      // check if all components are rendered
    //   expect(screen.getByText("Witamy"))
    });
  });