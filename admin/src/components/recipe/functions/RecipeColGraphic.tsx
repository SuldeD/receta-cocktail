/* eslint-disable @typescript-eslint/no-explicit-any */
import { CocktailType } from "@/src/util/Types";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

interface GraphicPropType {
  recipes: CocktailType[];
}
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
export default function RecipeColGraphic({ recipes }: GraphicPropType) {
  const [chartData, setChartData] = useState<any>();

  const countedByCol: Record<string, number> = recipes.reduce(
    (count: Record<string, number>, recipe) => {
      const { collection_id } = recipe;
      if (count[collection_id]) {
        count[collection_id]++;
      } else {
        count[collection_id] = 1;
      }
      return count;
    },
    {}
  );

  useEffect(() => {
    const colNames = Object.keys(countedByCol);
    const colNumbers = Object.values(countedByCol);

    setChartData({
      labels: colNames,
      datasets: [
        {
          label: "Recipes by collection",
          data: colNumbers,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [countedByCol, recipes]);

  return (
    <div className="w-1/2 flex flex-col items-center">
      <div className="mb-[30px] text-[teal] text-[24px]">Recipe chart</div>
      {chartData && (
        <PolarArea
          data={chartData}
          style={{ width: "100%", height: "500px" }}
        />
      )}
    </div>
  );
}
