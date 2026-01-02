import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";

/**
 * Generate distinct, light gradients
 */
const generateDistinctGradients = (count) => {
  const baseHue = Math.floor(Math.random() * 360);

  return Array.from({ length: count }, (_, i) => {
    const hue = (baseHue + (360 / count) * i) % 360;
    return {
      from: `hsl(${hue}, 65%, 70%)`, // darker than before
      to: `hsl(${hue}, 65%, 58%)`, // deeper end
    };
  });
};

/**
 * SVG-safe gradient id
 */
const getGradientId = (name) =>
  `gradient-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

export default function DonutChart({ data, totalValue, text }) {
  /**
   * Map each item → unique gradient
   */
  const gradients = useMemo(() => {
    const autoGradients = generateDistinctGradients(data.length);
    return data.reduce((acc, item, idx) => {
      acc[item.name] = autoGradients[idx];
      return acc;
    }, {});
  }, [data]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-100 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Gradients */}
            <defs>
              {data.map((item) => {
                const id = getGradientId(item.name);
                return (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={gradients[item.name].from} />
                    <stop offset="100%" stopColor={gradients[item.name].to} />
                  </linearGradient>
                );
              })}
            </defs>

            <Tooltip
              contentStyle={{
                background: "white",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />

            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((item) => {
                const id = getGradientId(item.name);
                return <Cell key={item.name} fill={`url(#${id})`} />;
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        {totalValue !== undefined && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-3xl font-semibold">{totalValue}%</p>
            <p className="text-sm text-gray-600 dark:text-[#FBFBF5]">{text}</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 text-sm w-full">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: gradients[item.name].to,
              }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
