import React from "react";
import { render, screen } from "@testing-library/react-native";
import Badge from "../../components/ui/Badge";

describe("Badge", () => {
  it("renders 'Confirmed' label for confirmed status", () => {
    render(<Badge status="confirmed" />);
    expect(screen.getByText("Confirmed")).toBeTruthy();
  });

  it("renders 'Cancelled' label for cancelled status", () => {
    render(<Badge status="cancelled" />);
    expect(screen.getByText("Cancelled")).toBeTruthy();
  });

  it("renders 'Completed' label for completed status", () => {
    render(<Badge status="completed" />);
    expect(screen.getByText("Completed")).toBeTruthy();
  });

  it("renders 'No Show' label for no-show status", () => {
    render(<Badge status="no-show" />);
    expect(screen.getByText("No Show")).toBeTruthy();
  });
});
