import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function SeriesAreaChart({
  data,
  xKey,
  areaKeys,
  colors,
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-100">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {areaKeys.map((key) => (
                <linearGradient
                  key={key}
                  id={`${key}Gradient`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={colors[key]}
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="100%"
                    stopColor={colors[key]}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip cursor={{ opacity: 0.1 }} />

            {areaKeys.map((key) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[key]}
                fill={`url(#${key}Gradient)`}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-3 text-sm w-full">
        {areaKeys.map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[key] }}
            />
            <span>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
