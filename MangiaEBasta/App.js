import React, { useState } from "react";
import { RefreshProvider } from "./model/RefreshContext";
import Init from "./components/Init";

export default function App() {
  const [initialRefresh] = useState(false);
  return (
    <RefreshProvider initialRefresh={initialRefresh}>
      <Init />
    </RefreshProvider>
  );
}
