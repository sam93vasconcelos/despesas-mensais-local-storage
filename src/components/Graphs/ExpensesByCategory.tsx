import { useStore } from "@/hooks/useStore";
import { Pie } from "@ant-design/charts";
import React from "react";

const ExpensesByCategory = () => {
  const [data, setData] = React.useState<
    { type: string | undefined; value: number }[]
  >([]);

  const { expenses, categories } = useStore();

  function getData() {
    const data: { type: string | undefined; value: number }[] = [];

    expenses.forEach((expense) => {
      const category = categories.find(
        (category) => category.id === expense.categoryId
      );
      if (category) {
        if (data.find((item) => item.type === category.name)) {
          data.find((item) => item.type === category.name)!.value +=
            expense.value;
        } else {
          data.push({
            type: category.name,
            value: expense.value,
          });
        }
      }
    });

    return data;
  }

  React.useEffect(() => {
    setData(getData());
  }, []);
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};

export default ExpensesByCategory;
