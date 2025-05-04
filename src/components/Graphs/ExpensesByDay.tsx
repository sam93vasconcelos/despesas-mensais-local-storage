import { useStore } from "@/hooks/useStore";
import { Bar } from "@ant-design/charts";
import React from "react";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const ExpensesByDay = () => {
  const { expenses } = useStore();
  const [data, setData] = React.useState<
    {
      date: string;
      value: number;
    }[]
  >([]);

  React.useEffect(() => {
    // Agrupa despesas por dia
    const grouped: Record<string, number> = {};
    expenses.forEach((expense) => {
      const date = expense.dueDate;
      if (grouped[date]) {
        grouped[date] += expense.value;
      } else {
        grouped[date] = expense.value;
      }
    });
    // Transforma em array para o gráfico e formata a data
    const chartData = Object.entries(grouped).map(([date, value]) => ({
      date: formatDate(date),
      value,
    }));
    // Ordena por data (precisa converter de volta para Date para ordenar corretamente)
    chartData.sort((a, b) => {
      const [da, ma, ya] = a.date.split("/");
      const [db, mb, yb] = b.date.split("/");
      return (
        new Date(`${ya}-${ma}-${da}`).getTime() -
        new Date(`${yb}-${mb}-${db}`).getTime()
      );
    });
    setData(chartData);
  }, []);

  const config = {
    data,
    xField: "date",
    yField: "value",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      date: { alias: "Data" },
      value: { alias: "Despesa" },
    },
  };

  return <Bar {...config} />;
};

export default ExpensesByDay;
