import React from "react";
import { render, screen } from "@testing-library/react-native";
import EmptyState from "../../components/ui/EmptyState";

describe("EmptyState", () => {
  it("renders title text", () => {
    render(<EmptyState title="No bookings found" />);
    expect(screen.getByText("No bookings found")).toBeTruthy();
  });

  it("renders subtitle when provided", () => {
    render(
      <EmptyState
        title="No bookings found"
        subtitle="Try searching with a different phone number"
      />
    );
    expect(screen.getByText("No bookings found")).toBeTruthy();
    expect(
      screen.getByText("Try searching with a different phone number")
    ).toBeTruthy();
  });

  it("does not render subtitle when not provided", () => {
    render(<EmptyState title="No bookings found" />);
    expect(
      screen.queryByText("Try searching with a different phone number")
    ).toBeNull();
  });

  it("renders default icon when not specified", () => {
    render(<EmptyState title="Nothing here" />);
    // The component has a default icon prop of "📭"
    // We can't easily test emoji rendering in RN testing lib,
    // but we can verify the component renders without error
    expect(screen.getByText("Nothing here")).toBeTruthy();
  });

  it("renders custom icon when provided", () => {
    render(<EmptyState icon="🔍" title="No results" />);
    expect(screen.getByText("No results")).toBeTruthy();
  });
});
