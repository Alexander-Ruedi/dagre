export enum ExpenseIncomeDataType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

export const getDisplayedNameForExpenseIncomeDataType = (expenseIncomeDataType: ExpenseIncomeDataType) => {
  switch (expenseIncomeDataType) {
    case ExpenseIncomeDataType.EXPENSE:
      return "Expense";
    case ExpenseIncomeDataType.INCOME:
      return "Income";
    default: {
      const _exhaustiveCheck: never = expenseIncomeDataType;
      return _exhaustiveCheck;
    }
  }
};

export const getDisplayedNameForMultipleExpenseIncomeDataTypes = (expenseIncomeDataArrayTypes?: Array<ExpenseIncomeDataType>) => {
  const isExpense = expenseIncomeDataArrayTypes && expenseIncomeDataArrayTypes.indexOf(ExpenseIncomeDataType.EXPENSE) !== -1;
  const isIncome = expenseIncomeDataArrayTypes && expenseIncomeDataArrayTypes.indexOf(ExpenseIncomeDataType.INCOME) !== -1;

  if (isExpense && isIncome) {
    return "Mixed";
  } else if (isExpense) {
    return "Expense";
  } else if (isIncome) {
    return "Income";
  } else {
    return "";
  }
};
