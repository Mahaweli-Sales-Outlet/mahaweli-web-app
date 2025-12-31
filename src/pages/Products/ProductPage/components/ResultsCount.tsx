interface ResultsCountProps {
  count: number;
  category: string;
}

export default function ResultsCount({ count, category }: ResultsCountProps) {
  return (
    <div className="mb-4 sm:mb-6 px-1">
      <p className="text-xs sm:text-sm md:text-base text-gray-600">
        Showing{" "}
        <span className="font-semibold text-gray-900">{count}</span>{" "}
        products
        {category && <span className="ml-1">in {category}</span>}
      </p>
    </div>
  );
}
