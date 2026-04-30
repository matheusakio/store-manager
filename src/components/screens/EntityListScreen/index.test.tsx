import React from "react";
import { render } from "@testing-library/react-native";
import { EntityListScreen } from "./index";
import { Text } from "react-native";

type Item = { id: string; name: string };

describe("EntityListScreen", () => {
  const items: Item[] = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
  ];

  it("renders list with data", () => {
    const { getByText } = render(
      <EntityListScreen
        data={items}
        isLoading={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    );
    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
  });

  it("shows loading state", () => {
    const { getByText } = render(
      <EntityListScreen
        data={[]}
        isLoading
        keyExtractor={() => "1"}
        renderItem={() => <Text>Item</Text>}
      />
    );
    expect(getByText("Carregando...")).toBeTruthy();
  });

  it("shows error state", () => {
    const { getByText } = render(
      <EntityListScreen
        data={[]}
        isLoading={false}
        error="Error occurred"
        keyExtractor={() => "1"}
        renderItem={() => null}
      />
    );
    expect(getByText("Ocorreu um erro")).toBeTruthy();
  });

  it("renders ListHeaderComponent", () => {
    const { getByText } = render(
      <EntityListScreen
        data={items}
        isLoading={false}
        keyExtractor={(item: Item) => item.id}
        renderItem={({ item }: { item: Item }) => <Text>{item.name}</Text>}
        ListHeaderComponent={<Text>Header</Text>}
      />
    );
    expect(getByText("Header")).toBeTruthy();
  });

  it("renders ListEmptyComponent when data is empty", () => {
    const { getByText } = render(
      <EntityListScreen
        data={[]}
        isLoading={false}
        keyExtractor={() => "1"}
        renderItem={() => null}
        ListEmptyComponent={<Text>No items</Text>}
      />
    );
    expect(getByText("No items")).toBeTruthy();
  });
});
