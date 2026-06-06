function TreeNode({ node }) {
  if (!node) return null;

  const isPrime = node.type === "prime";

  return (
    <div className="flex flex-col items-center">
      <div
        className={[
          "flex min-h-12 min-w-12 items-center justify-center border px-4 py-3 text-center",
          isPrime
            ? "border-[#3a3a3a] bg-black text-white"
            : "border-white bg-white text-black",
          "font-mono text-[12px] uppercase tracking-[2px]",
        ].join(" ")}
      >
        {node.value}
      </div>

      {(node.left || node.right) && (
        <div className="mt-5 flex flex-col items-center">
          <div className="h-6 w-px bg-[#262626]" />
          <div className="h-px w-32 bg-[#262626] sm:w-44" />

          <div className="grid w-44 grid-cols-2 gap-8 pt-5 sm:w-64">
            <TreeNode node={node.left} />
            <TreeNode node={node.right} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function FactorTree({ title, tree, lines = [] }) {
  return (
    <article className="border border-[#262626] bg-[#0d0d0d]">
      <div className="border-b border-[#262626] p-6 sm:p-8">
        <p className="caption text-[#999999]">Visual Structure</p>

        <h3 className="display-md mt-4 break-words text-white">{title}</h3>
      </div>

      <div className="no-scrollbar overflow-x-auto p-5 sm:p-8">
        <div className="flex min-w-max justify-center">
          <TreeNode node={tree} />
        </div>
      </div>

      <div className="border-t border-[#262626] p-6 sm:p-8">
        <p className="caption text-[#999999]">Terminal Output</p>

        <pre className="mt-5 overflow-x-auto border border-[#262626] bg-black p-5 font-mono text-xs leading-6 tracking-[1px] text-[#cccccc]">
{lines.join("\n")}
        </pre>
      </div>
    </article>
  );
}