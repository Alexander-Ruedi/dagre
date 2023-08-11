export default function UnderConstructionPage({ pageName }: { pageName?: string }) {
  return (
    <div className="flex flex-col space-y-3 p-3">
      <h5 className="font-bold">{pageName ? pageName : "Page under construction"}</h5>
      <div>This page will be implemented soon!</div>
    </div>
  );
}
