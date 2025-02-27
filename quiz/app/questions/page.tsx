import { Suspense } from "react";
import DocsPage from "./questions";
const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DocsPage />
    </Suspense>
  );
};

export default Home;
